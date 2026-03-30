# Workflow & Automation Tools

> Reference guide for workflow automation platforms that extend AI agent capabilities beyond Claude Code. These tools handle orchestration, scheduling, and long-running processes.

---

## n8n — Open-Source Workflow Automation

**Source:** [n8n-io/n8n](https://github.com/n8n-io/n8n) — 400+ integrations, AI nodes built-in

### What It Does

Visual workflow automation with 400+ integrations and native AI nodes. Self-hostable. The best visual builder for AI-powered automations.

### Setup

```bash
# Docker (recommended)
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n

# Or via npm
npm install -g n8n
n8n start
# → http://localhost:5678
```

### Key Features

| Feature               | Description                                   |
| --------------------- | --------------------------------------------- |
| **400+ integrations** | Slack, GitHub, Google Sheets, databases, APIs |
| **AI nodes**          | Native LLM, vector store, and agent nodes     |
| **Self-hosted**       | Full control over data and execution          |
| **Visual builder**    | Drag-and-drop workflow design                 |
| **Webhooks**          | Trigger workflows from external events        |
| **Credentials vault** | Secure API key management                     |

### Integration with New Baseline

Use n8n to automate workflows around your development process:

1. **CI/CD notifications** — GitHub PR → n8n → Slack notification with AI summary
2. **Dependency monitoring** — Weekly dep audit → n8n → create GitHub issues for vulnerabilities
3. **Documentation sync** — On merge to main → n8n → update external docs site
4. **Deployment pipeline** — PR approved → n8n → trigger deployment → notify team
5. **Bug triage** — New issue → n8n → AI classifies severity → assigns to team member

---

## Langflow — Visual Agent Pipelines

**Source:** [langflow-ai/langflow](https://github.com/langflow-ai/langflow) — 140,000+ stars

### What It Does

Visual drag-and-drop for building agent pipelines. Build complex agent workflows without writing code.

### Setup

```bash
# Via pip
pip install langflow --break-system-packages

# Run
langflow run
# → http://localhost:7860

# Or via Docker
docker run -it --rm \
  -p 7860:7860 \
  langflowai/langflow:latest
```

### Key Capabilities

- **RAG pipelines** — Build retrieval-augmented generation workflows visually
- **Multi-agent** — Chain multiple AI agents with different roles
- **Custom tools** — Define tools and connect them to agents
- **Vector stores** — Integrate with Chroma, Pinecone, Weaviate, etc.
- **Export** — Export workflows as Python code

### When to Use

- Prototyping complex AI agent architectures before coding them
- Building RAG pipelines without writing boilerplate
- Team collaboration on agent design (visual = easier to share)
- When you need to combine multiple LLMs and tools in a pipeline

### Relevance to New Baseline

Langflow complements our multi-agent patterns (`skills/multi-agent-patterns/`):

- Use Langflow to prototype agent interactions visually
- Export the proven pattern as code
- Implement in Claude Code using our agent/command system

---

## Huginn — Self-Hosted Web Agents

**Source:** [huginn/huginn](https://github.com/huginn/huginn) — Privacy-first automation

### What It Does

Self-hosted agents for monitoring, alerts, and data collection. Think IFTTT/Zapier but self-hosted with full control.

### Setup

```bash
# Docker (recommended)
docker run -d --name huginn \
  -p 3000:3000 \
  -e INVITATION_CODE=your_code \
  huginn/huginn

# → http://localhost:3000
```

### Agent Types

| Agent                | Purpose                       |
| -------------------- | ----------------------------- |
| **Website Agent**    | Monitor web pages for changes |
| **RSS Agent**        | Watch RSS feeds               |
| **Email Agent**      | Send/receive email triggers   |
| **Webhook Agent**    | Receive/send webhooks         |
| **Scheduler Agent**  | Time-based triggers           |
| **JavaScript Agent** | Custom logic                  |
| **Commander Agent**  | Execute shell commands        |

### When to Use

- Monitoring competitor sites or documentation for changes
- Self-hosted alternative to Zapier/IFTTT
- Privacy-sensitive automation (all data stays on your server)
- Long-running monitoring tasks that don't need AI intelligence

---

## DSPy — Program (Not Prompt) Foundation Models

**Source:** [stanfordnlp/dspy](https://github.com/stanfordnlp/dspy) — Stanford research

### What It Does

A framework for programmatically controlling LLMs. Instead of writing prompts, you write programs that compile to optimized prompts. For when prompting is not deterministic enough.

### Setup

```bash
pip install dspy --break-system-packages
```

### Core Concepts

```python
import dspy

# Define a signature (what the LLM should do)
class CodeReview(dspy.Signature):
    """Review code for bugs and suggest improvements."""
    code = dspy.InputField(desc="The code to review")
    review = dspy.OutputField(desc="Structured review with findings")

# Create a module
reviewer = dspy.ChainOfThought(CodeReview)

# Compile with examples for optimization
compiled_reviewer = dspy.teleprompt.BootstrapFewShot(
    metric=review_quality_metric
).compile(reviewer, trainset=examples)
```

### Key Concepts

| Concept           | Description                                             |
| ----------------- | ------------------------------------------------------- |
| **Signatures**    | Type-safe input/output definitions                      |
| **Modules**       | Composable LLM operations (ChainOfThought, ReAct, etc.) |
| **Teleprompters** | Automatic prompt optimization from examples             |
| **Assertions**    | Runtime constraints on LLM outputs                      |
| **Metrics**       | Custom evaluation functions                             |

### When to Use

- Building deterministic AI workflows where prompt variability is a problem
- Optimizing prompts systematically (not trial-and-error)
- Research-grade AI applications requiring reproducibility
- When you need type-safe LLM interactions

### Relevance to New Baseline

DSPy is a different paradigm from Claude Code's skill system. Use it when:

- Your agent skill needs to produce deterministic, structured output
- You're building a production API that wraps LLM calls
- You need to optimize prompts across hundreds of examples
- Standard prompting isn't reliable enough for your use case

---

## Temporal — Durable Workflow Engine

**Source:** [temporalio/temporal](https://github.com/temporalio/temporal)

### What It Does

Durable execution engine for long-running workflows. When your automation needs to survive crashes, retries, and timeouts. Used by Netflix, Uber, Snap, and others for mission-critical workflows.

### Setup

```bash
# Via Docker Compose
git clone https://github.com/temporalio/docker-compose.git temporal-docker
cd temporal-docker
docker compose up -d

# Web UI at http://localhost:8233
# Server at localhost:7233

# SDK (TypeScript)
npm install @temporalio/client @temporalio/worker @temporalio/workflow @temporalio/activity
```

### Key Features

| Feature               | Description                               |
| --------------------- | ----------------------------------------- |
| **Durable execution** | Workflows survive process crashes         |
| **Automatic retries** | Configurable retry policies               |
| **Timeouts**          | Activity, workflow, and schedule timeouts |
| **Versioning**        | Safe workflow code updates                |
| **Visibility**        | Full workflow execution history           |
| **Multi-language**    | Go, Java, Python, TypeScript, .NET        |

### When to Use

- Long-running deployment pipelines
- Multi-step data processing that can't lose progress
- Workflows that span minutes to days
- When you need guaranteed execution and retry logic

### Example: AI Agent Deployment Pipeline

```typescript
import { proxyActivities } from '@temporalio/workflow'

const { runTests, buildApp, deployToStaging, runE2E, deployToProd } = proxyActivities({
  startToCloseTimeout: '10m',
  retry: { maximumAttempts: 3 },
})

export async function deploymentPipeline(commit: string): Promise<void> {
  await runTests(commit)
  await buildApp(commit)
  await deployToStaging(commit)
  await runE2E(commit) // If this fails, Temporal retries automatically
  await deployToProd(commit)
}
```

---

## Tool Selection Guide

| Need                          | Tool               | Why                                      |
| ----------------------------- | ------------------ | ---------------------------------------- |
| Visual workflow automation    | n8n                | 400+ integrations, self-hosted, AI nodes |
| Visual agent pipeline design  | Langflow           | Drag-and-drop, export to code            |
| Self-hosted monitoring/alerts | Huginn             | Privacy-first, web agents                |
| Deterministic LLM programming | DSPy               | Type-safe, optimizable, reproducible     |
| Crash-proof long workflows    | Temporal           | Durable execution, retries, timeouts     |
| Quick scripts/crons           | New Baseline hooks | Already built in, zero dependencies      |

---

## References

- [n8n-io/n8n](https://github.com/n8n-io/n8n) — Workflow automation
- [langflow-ai/langflow](https://github.com/langflow-ai/langflow) — Visual agent pipelines
- [huginn/huginn](https://github.com/huginn/huginn) — Self-hosted web agents
- [stanfordnlp/dspy](https://github.com/stanfordnlp/dspy) — Programmatic LLM framework
- [temporalio/temporal](https://github.com/temporalio/temporal) — Durable workflow engine
