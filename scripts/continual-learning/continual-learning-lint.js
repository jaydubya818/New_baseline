#!/usr/bin/env node
/**
 * Learning lint: fails on contradictions, secret-like patterns, or invalid evidence.
 * Exit 0: OK; exit 1: one or more checks failed.
 * On failure: print only deltaId, transcript, and brief reason (no content).
 */

const fs = require("fs");
const path = require("path");

const REPO_ROOT = path.resolve(__dirname, "..");
const STATE_DIR = path.join(REPO_ROOT, ".cursor", "hooks", "state");
const DELTAS_PATH = path.join(STATE_DIR, "continual-learning-deltas.ndjson");

const TRANSCRIPTS_DIR =
  process.env.CURSOR_AGENT_TRANSCRIPTS ||
  path.join(REPO_ROOT, ".cursor", "hooks", "agent-transcripts");

const SECRET_PATTERN = /(sk-|xoxb-|ghp_|AKIA|AIza|anthropic|openai).*[A-Za-z0-9_-]{10,}/i;
const BEARER_PATTERN = /Authorization:\s*Bearer/i;

function hasSecretLike(str) {
  if (typeof str !== "string") return false;
  return SECRET_PATTERN.test(str) || BEARER_PATTERN.test(str);
}

function streamReadDeltas() {
  if (!fs.existsSync(DELTAS_PATH)) return [];
  const content = fs.readFileSync(DELTAS_PATH, "utf8");
  const lines = content.split("\n").filter(Boolean);
  const out = [];
  for (const line of lines) {
    try {
      out.push(JSON.parse(line));
    } catch {
      // skip malformed
    }
  }
  return out;
}

function runChecks() {
  const deltas = streamReadDeltas();
  const errors = [];

  for (const d of deltas) {
    const learnings = d.learnings || [];
    const structured = d.structuredLearnings || [];
    const transcript = d.transcript || "";
    const did = d.deltaId || "(no deltaId)";

    const texts = [
      ...learnings.map(String),
      ...structured.map((s) => String(s.raw || s.value || "")),
    ];
    const meetingOnly = texts.some((t) => /only\s+apps\/meeting-assistant|only modify.*meeting-assistant/i.test(t));
    const cliCockpit = texts.some((t) => {
      const s = String(t);
      return /modify\s+apps\/cli-cockpit/i.test(s) || (/\btouch\s+apps\/cli-cockpit/i.test(s) && !/do not touch/i.test(s));
    });
    if (meetingOnly && cliCockpit) {
      errors.push({ check: "contradiction", reason: "meeting-assistant-only and modify cli-cockpit in same delta", deltaId: did, transcript });
    }

    for (const t of texts) {
      if (hasSecretLike(t)) {
        errors.push({ check: "secrets", reason: "secret-like or Bearer token pattern", deltaId: did, transcript });
        break;
      }
    }

    for (const s of structured) {
      const ev = s.evidence;
      const start = ev?.lineStart;
      const end = ev?.lineEnd;
      if (
        typeof start !== "number" ||
        typeof end !== "number" ||
        !Number.isInteger(start) ||
        !Number.isInteger(end) ||
        start < 1 ||
        end < 1 ||
        start > end
      ) {
        errors.push({ check: "evidence", reason: "evidence must have 1 <= lineStart <= lineEnd (integers)", deltaId: did, transcript });
        break;
      }
    }
  }

  return { deltas: deltas.length, errors };
}

function main() {
  if (!fs.existsSync(TRANSCRIPTS_DIR) || !fs.existsSync(DELTAS_PATH)) {
    process.exit(0);
  }
  const { deltas, errors } = runChecks();
  if (errors.length > 0) {
    for (const e of errors) {
      console.error(`${e.deltaId} ${e.transcript} ${e.reason}`);
    }
    process.exit(1);
  }
  process.exit(0);
}

main();
