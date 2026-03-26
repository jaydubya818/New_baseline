# Ecosystem Tools: RAG, Knowledge Management & Integrations

> Reference guide for tools that complement Claude Code workflows — RAG frameworks, knowledge bases, and integration skills.

## LightRAG — Graph-Based RAG Framework

Source: [HKUDS/LightRAG](https://github.com/hkuds/lightrag) (30k+ stars, EMNLP 2025)

### What It Does

RAG framework that builds knowledge graphs during document indexing rather than relying solely on vector embeddings. Entities and relationships are explicitly extracted, enabling structured graph queries alongside semantic search.

### Architecture

| Layer | Function |
| ----- | -------- |
| **Entity-Relationship Extraction** | LLM extracts entities + relationships from documents |
| **Graph Storage** | Nodes (entities) + edges (relationships) in persistent store |
| **Dual-Level Retrieval** | Graph-level (structured) + text-level (semantic) queries |
| **Mix Mode** | Both retrieval paths combined for comprehensive context |

### Storage Backends

- **KV**: JSON, PostgreSQL, Redis, MongoDB
- **Vector**: NanoVectorDB, Milvus, Chroma, Faiss, Qdrant
- **Graph**: NetworkX, Neo4j, PostgreSQL (AGE)

### When to Use

- Building a knowledge base from project documentation
- Need relationship-aware retrieval (not just similarity)
- Document collections where entities reference each other
- Requires 32B+ parameter models, 32KB+ context (64KB+ preferred)

### Quick Start

```bash
uv tool install "lightrag-hku[api]"
# Or via Docker
docker compose up
```

### Relevance to Our Repo

LightRAG isn't a Claude Code plugin, but its patterns are valuable:
1. **Graph + vector hybrid retrieval** — More accurate than vector-only RAG for codebases with interconnected entities
2. **Dual-level indexing** — Entity-level and chunk-level, similar to how our memory system indexes at different granularities
3. **Mix mode queries** — Combine structured graph traversal with semantic search for best results

---

## Obsidian Skills — Vault Management for Claude Code

Source: [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills) (17k+ stars)

### What It Provides

Agent Skills following the Agent Skills specification, compatible with Claude Code, Codex CLI, and OpenCode.

| Skill | Purpose |
| ----- | ------- |
| **obsidian-markdown** | Craft Obsidian Flavored Markdown with wikilinks, embeds, callouts, properties |
| **obsidian-bases** | Build `.base` files with views, filters, formulas, summaries |
| **json-canvas** | Develop JSON Canvas files with nodes, edges, groups, connections |
| **obsidian-cli** | Execute vault interactions for plugin/theme development |
| **defuddle** | Transform web content into clean markdown, reducing token consumption |

### Setup

```bash
# Via Claude Code plugin marketplace
/plugin marketplace add kepano/obsidian-skills
/plugin install obsidian@obsidian-skills

# Or manually — copy repo contents to .claude/ folder in your Obsidian vault
```

### Relevance to Our Repo

Useful if you use Obsidian as a knowledge base alongside this project:
- **defuddle** skill is universally useful — clean web-to-markdown conversion saves tokens
- **Obsidian Flavored Markdown** patterns (wikilinks, callouts) could enhance our docs system
- **JSON Canvas** for visual architecture diagrams stored as code

---

## Integration Patterns

### Knowledge Pipeline

For projects needing persistent knowledge beyond session memory:

```
Documents → LightRAG (graph + vector index)
    ↓
Claude Code session → claude-mem (session capture)
    ↓
Obsidian vault (long-term knowledge via obsidian-skills)
    ↓
Next session → claude-mem retrieves relevant context
```

### Tool Selection Guide

| Need | Tool | Why |
| ---- | ---- | --- |
| Session memory across Claude Code runs | claude-mem | Automatic capture + vector search |
| Knowledge base from documentation | LightRAG | Graph-aware retrieval for entity relationships |
| Long-term notes + knowledge management | Obsidian Skills | Vault management + wikilink graph |
| In-session memory | Our `.claude/memory/` system | File-based, zero dependencies |

## References

- [LightRAG](https://github.com/hkuds/lightrag) — Graph-based RAG framework
- [Obsidian Skills](https://github.com/kepano/obsidian-skills) — Agent Skills for Obsidian
- [claude-mem](https://github.com/thedotmack/claude-mem) — Persistent memory system
- [Agent Skills spec](https://github.com/anthropics/agent-skills) — Specification for cross-platform skills
