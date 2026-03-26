#!/usr/bin/env node
/**
 * Continual learning incremental runner.
 *
 * Reads index, scans transcript dir, selects new/changed transcripts,
 * extracts learnings (with evidence), de-dupes, optionally strict mode,
 * appends deltas, updates index and summary.
 *
 * Env: CURSOR_AGENT_TRANSCRIPTS, CONTINUAL_LEARN_STRICT
 * Flags: --strict, --max-deltas-scan=N (default 200), --max-summary=N (default 50)
 */

const fs = require("fs");
const path = require("path");
const { learningsHash, learningsHashFromLegacy, deltaId } = require("./continual-learning/utils.js");
const { extractStructuredLearnings } = require("./continual-learning/extract.js");

const REPO_ROOT = path.resolve(__dirname, "..");
const STATE_DIR = path.join(REPO_ROOT, ".cursor", "hooks", "state");
const INDEX_PATH = path.join(STATE_DIR, "continual-learning-index.json");
const DELTAS_PATH = path.join(STATE_DIR, "continual-learning-deltas.ndjson");
const SUMMARY_PATH = path.join(STATE_DIR, "continual-learning-summary.md");
const SEEN_PATH = path.join(STATE_DIR, "continual-learning-seen.json");

const TRANSCRIPTS_DIR =
  process.env.CURSOR_AGENT_TRANSCRIPTS ||
  path.join(REPO_ROOT, ".cursor", "hooks", "agent-transcripts");

function parseArgs() {
  const args = process.argv.slice(2);
  let strict = process.env.CONTINUAL_LEARN_STRICT === "true";
  let maxDeltasScan = 200;
  let maxSummary = 50;
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === "--strict") {
      strict = true;
    } else if (arg === "--strict=true" || (arg.startsWith("--strict=") && arg.split("=")[1] === "true")) {
      strict = true;
    } else if (arg === "--max-deltas-scan" && args[i + 1]) {
      const v = parseInt(args[++i], 10);
      maxDeltasScan = Number.isNaN(v) ? 200 : v;
    } else if (arg.startsWith("--max-deltas-scan=")) {
      const v = parseInt(arg.split("=")[1], 10);
      maxDeltasScan = Number.isNaN(v) ? 200 : v;
    } else if (arg === "--max-summary" && args[i + 1]) {
      const v = parseInt(args[++i], 10);
      maxSummary = Number.isNaN(v) ? 50 : v;
    } else if (arg.startsWith("--max-summary=")) {
      const v = parseInt(arg.split("=")[1], 10);
      maxSummary = Number.isNaN(v) ? 50 : v;
    }
  }
  return { strict, maxDeltasScan, maxSummary };
}

function readIndex() {
  try {
    return JSON.parse(fs.readFileSync(INDEX_PATH, "utf8"));
  } catch (e) {
    if (e.code === "ENOENT") return {};
    throw e;
  }
}

function writeIndex(index) {
  fs.mkdirSync(STATE_DIR, { recursive: true });
  fs.writeFileSync(INDEX_PATH, JSON.stringify(index, null, 2) + "\n", "utf8");
}

function scanTranscripts(dir, baseDir = dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    const rel = path.relative(baseDir, full).replace(/\\/g, "/");
    if (e.isDirectory()) {
      if (e.name === "subagents") continue;
      scanTranscripts(full, baseDir, acc);
    } else if (e.name.endsWith(".jsonl")) {
      acc.push(rel);
    }
  }
  return acc.sort((a, b) => a.localeCompare(b));
}

function getMtimeMs(dir, relPath) {
  try {
    return fs.statSync(path.join(dir, relPath)).mtimeMs;
  } catch {
    return null;
  }
}

function selectToProcess(relPaths, index) {
  const toProcess = [];
  for (const rel of relPaths) {
    const mtimeMs = getMtimeMs(TRANSCRIPTS_DIR, rel);
    if (mtimeMs == null) continue;
    const indexed = index[rel];
    if (indexed == null || mtimeMs > indexed) toProcess.push({ rel, mtimeMs });
  }
  return toProcess;
}

function readTranscriptLines(relPath) {
  const raw = fs.readFileSync(path.join(TRANSCRIPTS_DIR, relPath), "utf8");
  return raw.split("\n").filter(Boolean);
}

function readLastDeltas(maxLines) {
  if (!fs.existsSync(DELTAS_PATH)) return [];
  const content = fs.readFileSync(DELTAS_PATH, "utf8");
  const lines = content.split("\n").filter(Boolean);
  const tail = lines.slice(-maxLines);
  return tail
    .map((line) => {
      try {
        return JSON.parse(line);
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

function isDuplicate(recentDeltas, transcriptPath, hash, id) {
  return recentDeltas.some((d) => {
    if (d.deltaId === id) return true;
    if (d.transcript !== transcriptPath) return false;
    if (d.learningsHash === hash) return true;
    if (d.learningsHash != null) return false;
    const existingHash = d.structuredLearnings?.length
      ? learningsHash(d.structuredLearnings)
      : d.learnings?.length
        ? learningsHashFromLegacy(d.learnings)
        : null;
    return existingHash === hash;
  });
}

function readSeen() {
  try {
    return JSON.parse(fs.readFileSync(SEEN_PATH, "utf8"));
  } catch (e) {
    if (e.code === "ENOENT") return {};
    throw e;
  }
}

function writeSeen(seen) {
  fs.mkdirSync(STATE_DIR, { recursive: true });
  const sorted = {};
  for (const k of Object.keys(seen).sort()) {
    const arr = Array.isArray(seen[k]) ? seen[k] : [];
    sorted[k] = [...new Set(arr)].sort();
  }
  fs.writeFileSync(SEEN_PATH, JSON.stringify(sorted, null, 2) + "\n", "utf8");
}

function processOne(rel, mtimeMs) {
  const lines = readTranscriptLines(rel);
  const { learnings, structuredLearnings } = extractStructuredLearnings(lines);
  const source = { transcriptPath: rel, lineCount: lines.length };
  const hash = learningsHash(structuredLearnings);
  const id = deltaId(rel, hash);
  return {
    rel,
    mtimeMs,
    learnings,
    structuredLearnings,
    source,
    learningsHash: hash,
    deltaId: id,
  };
}

function appendDelta(delta, opts) {
  const { strict, maxDeltasScan } = opts;
  const recentDeltas = readLastDeltas(maxDeltasScan);
  if (isDuplicate(recentDeltas, delta.rel, delta.learningsHash, delta.deltaId)) {
    return "skipped_dupe";
  }
  if (strict) {
    const seen = readSeen();
    const seenForTranscript = seen[delta.rel] || [];
    if (seenForTranscript.includes(delta.learningsHash)) {
      return "skipped_strict";
    }
    const next = [...seenForTranscript, delta.learningsHash].filter(Boolean);
    seen[delta.rel] = [...new Set(next)].sort();
    writeSeen(seen);
  }
  const line =
    JSON.stringify({
      ts: new Date().toISOString(),
      transcript: delta.rel,
      mtimeMs: delta.mtimeMs,
      learnings: delta.learnings,
      processedAt: new Date().toISOString(),
      deltaId: delta.deltaId,
      structuredLearnings: delta.structuredLearnings,
      learningsHash: delta.learningsHash,
      source: delta.source,
    }) + "\n";
  fs.mkdirSync(STATE_DIR, { recursive: true });
  fs.appendFileSync(DELTAS_PATH, line, "utf8");
  return "appended";
}

const META_TAG_ONLY = /^(?:SCOPE_RULE|DOC_GATE|TELEGRAM_COPY|SAFETY_RULE|OTHER)$/;
const TRUNCATION_PATTERN = /\.\.\.\w*\.\.\./;

function isLearningBullet(value) {
  if (typeof value !== "string" || !value.trim()) return false;
  if (TRUNCATION_PATTERN.test(value)) return false;
  const trimmed = value.trim();
  if (META_TAG_ONLY.test(trimmed)) return false;
  return true;
}

function dedupeDeltasByDeltaId(deltas) {
  const byId = new Map();
  for (const d of deltas) {
    const id = d.deltaId;
    if (id && !byId.has(id)) byId.set(id, d);
  }
  return Array.from(byId.values());
}

function assertNoDuplicateDeltaIds(deltas) {
  const ids = deltas.map((d) => d.deltaId).filter(Boolean);
  const seen = new Set();
  for (const id of ids) {
    if (seen.has(id)) {
      throw new Error(`[learn] duplicate deltaId in deltas: ${id}. Investigate processing bug.`);
    }
    seen.add(id);
  }
}

function regenerateSummary(deltas) {
  const deduped = dedupeDeltasByDeltaId(deltas);
  const newestFirst = [...deduped].reverse();
  const lines = [
    "# Continual learning summary",
    "",
    `*Last run: ${new Date().toISOString()}*`,
    "",
    "## Deltas (latest first)",
    "",
  ];
  for (const d of newestFirst) {
    const transcript = d.transcript || "";
    const did = (d.deltaId || "").slice(0, 8);
    const structured = (d.structuredLearnings || []).filter((s) => isLearningBullet(s.value));
    const legacy = (d.learnings || []).filter((b) => isLearningBullet(typeof b === "string" ? b : String(b)));
    const bullets =
      structured.length > 0
        ? structured
            .map((s) => {
              const ev = s.evidence;
              const range =
                ev && typeof ev.lineStart === "number" && typeof ev.lineEnd === "number"
                  ? `L${ev.lineStart}-L${ev.lineEnd}`
                  : "L?-L?";
              return `  - [${s.type}] ${s.value} (evidence: ${range})`;
            })
            .join("\n")
        : legacy.length > 0
          ? legacy.map((b) => `  - ${b}`).join("\n")
          : "  - (no learnings extracted)";
    lines.push(`- **${transcript}** \`${did}\``);
    lines.push(bullets);
    lines.push("");
  }
  fs.mkdirSync(STATE_DIR, { recursive: true });
  fs.writeFileSync(SUMMARY_PATH, lines.join("\n") + "\n", "utf8");
}

function main() {
  const opts = parseArgs();
  const { strict, maxDeltasScan, maxSummary } = opts;

  if (!fs.existsSync(TRANSCRIPTS_DIR)) {
    console.log("learn: no transcript dir at", TRANSCRIPTS_DIR);
    console.log("Set CURSOR_AGENT_TRANSCRIPTS or create/symlink .cursor/hooks/agent-transcripts");
    process.exit(0);
    return;
  }

  const index = readIndex();
  const relPaths = scanTranscripts(TRANSCRIPTS_DIR);
  const toProcess = selectToProcess(relPaths, index);

  let appended = 0;
  let skippedDupe = 0;
  let skippedStrict = 0;

  for (const { rel, mtimeMs } of toProcess) {
    const result = processOne(rel, mtimeMs);
    const outcome = appendDelta(result, opts);
    if (outcome === "appended") appended++;
    else if (outcome === "skipped_dupe") skippedDupe++;
    else if (outcome === "skipped_strict") skippedStrict++;
    index[rel] = mtimeMs;
  }

  const newIndex = {};
  for (const rel of relPaths) {
    const mtimeMs = getMtimeMs(TRANSCRIPTS_DIR, rel);
    if (mtimeMs != null) newIndex[rel] = mtimeMs;
  }
  writeIndex(newIndex);

  const latestDeltas = readLastDeltas(maxSummary);
  assertNoDuplicateDeltaIds(latestDeltas);
  regenerateSummary(latestDeltas);

  const skipped = skippedDupe + skippedStrict;
  const indexCount = Object.keys(newIndex).length;
  console.log("[learn] selected=%d appended=%d skipped=%d index=%d", toProcess.length, appended, skipped, indexCount);
}

main();
