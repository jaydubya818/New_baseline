# Infrastructure & Observability

> Reference guide for infrastructure tools, API gateways, and observability platforms that support AI-powered development workflows.

---

## FastAPI — Python Web Framework for AI

**Source:** [tiangolo/fastapi](https://github.com/tiangolo/fastapi)

### What It Does

The Python web framework for serving AI applications. Exceptional documentation, automatic OpenAPI spec generation, and Pydantic validation built in.

### Setup

```bash
pip install fastapi uvicorn --break-system-packages
```

### Quick Start

```python
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class AnalysisRequest(BaseModel):
    code: str
    language: str = "typescript"

class AnalysisResponse(BaseModel):
    findings: list[str]
    severity: str
    suggestions: list[str]

@app.post("/analyze", response_model=AnalysisResponse)
async def analyze_code(request: AnalysisRequest):
    # Your AI analysis logic here
    return AnalysisResponse(
        findings=["Unused variable on line 12"],
        severity="low",
        suggestions=["Remove unused variable"]
    )
```

```bash
uvicorn main:app --reload
# → http://localhost:8000
# → http://localhost:8000/docs (auto-generated Swagger UI)
```

### Key Features

| Feature                  | Description                               |
| ------------------------ | ----------------------------------------- |
| **Automatic validation** | Pydantic models validate all input/output |
| **OpenAPI spec**         | Auto-generated API documentation          |
| **Async native**         | Full async/await support                  |
| **Type hints**           | Full Python type hint integration         |
| **Dependency injection** | Clean dependency management               |
| **WebSocket**            | Real-time communication support           |

### When to Use with New Baseline

- **Custom MCP server backends** — Build MCP tools with FastAPI + fastmcp
- **AI microservices** — Serve AI models or agent workflows via API
- **Webhook receivers** — Handle CI/CD, GitHub, or Stripe webhooks
- **API prototyping** — Quickly prototype APIs before building in Next.js

### Note

New Baseline is primarily a Next.js (TypeScript) project. FastAPI is recommended for:

- Python-specific AI/ML services that run alongside your Next.js app
- Building custom MCP server backends
- Services that need Pydantic validation for complex data

---

## Portkey Gateway — Universal LLM Router

**Source:** [Portkey-AI/gateway](https://github.com/Portkey-AI/gateway)

### What It Does

Route requests to 250+ LLMs through a single API. Switch models without changing code. Includes caching, retries, fallbacks, and cost tracking.

### Setup

```bash
# Docker
docker run -d \
  -p 8787:8787 \
  -e PORTKEY_API_KEY=your_key \
  portkeyai/gateway

# Or npm
npm install -g @portkey-ai/gateway
portkey-gateway start
```

### Key Features

| Feature            | Description                                                     |
| ------------------ | --------------------------------------------------------------- |
| **250+ LLMs**      | Route to any provider: Anthropic, OpenAI, Google, Cohere, local |
| **Fallbacks**      | Auto-switch to backup model on failure                          |
| **Load balancing** | Distribute requests across providers                            |
| **Caching**        | Reduce costs with semantic caching                              |
| **Rate limiting**  | Per-user and per-model rate limits                              |
| **Cost tracking**  | Monitor spending across providers                               |
| **Retries**        | Automatic retry with exponential backoff                        |

### Configuration Example

```json
{
  "strategy": {
    "mode": "fallback"
  },
  "targets": [
    {
      "provider": "anthropic",
      "model": "claude-sonnet-4-20250514",
      "weight": 0.8
    },
    {
      "provider": "openai",
      "model": "gpt-4o",
      "weight": 0.2
    }
  ]
}
```

### When to Use

- **Multi-model workflows** — Our `/review --dual-model` pattern could route through Portkey
- **Cost optimization** — Track and reduce LLM spending
- **Production reliability** — Automatic fallbacks prevent downtime
- **A/B testing models** — Compare model performance on real requests

---

## OmniRoute — AI API Proxy

**Source:** [diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)

### What It Does

API proxy for 44+ AI providers. Load balancing, fallbacks, and cost optimization. Lighter-weight alternative to Portkey.

### Setup

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install && npm start
```

### Portkey vs OmniRoute

| Dimension   | Portkey Gateway           | OmniRoute                |
| ----------- | ------------------------- | ------------------------ |
| Providers   | 250+                      | 44+                      |
| Caching     | Semantic caching          | Basic caching            |
| Analytics   | Built-in dashboard        | Basic logging            |
| Self-hosted | ✅                        | ✅                       |
| Complexity  | More features, more setup | Simpler, lighter         |
| Best for    | Production, enterprise    | Prototyping, small teams |

### When to Use

- Simpler projects that need multi-provider routing without Portkey's complexity
- Quick prototypes where you want to test multiple providers
- Self-hosted setups where minimal dependencies matter

---

## lmnr — Agent Tracing & Evaluation

**Source:** [lmnr-ai/lmnr](https://github.com/lmnr-ai/lmnr)

### What It Does

Trace and evaluate agent behavior. See exactly what your agents are doing and measure whether they're doing it well. Think "Datadog for AI agents."

### Setup

```bash
# Self-hosted
docker run -d \
  -p 8080:8080 \
  ghcr.io/lmnr-ai/lmnr:latest

# SDK
pip install lmnr --break-system-packages
# or
npm install @lmnr-ai/lmnr
```

### Key Features

| Feature           | Description                                    |
| ----------------- | ---------------------------------------------- |
| **Tracing**       | Full execution traces for every agent action   |
| **Evaluation**    | Custom eval functions to measure agent quality |
| **Datasets**      | Manage test datasets for systematic evaluation |
| **Comparison**    | Side-by-side comparison of agent versions      |
| **Alerts**        | Get notified when agent quality degrades       |
| **OpenTelemetry** | Standard observability integration             |

### Integration Example (TypeScript)

```typescript
import { Laminar } from '@lmnr-ai/lmnr'

Laminar.initialize({ projectApiKey: 'your_key' })

// Wrap your agent function
const result = await Laminar.trace('code-review', async (span) => {
  span.setAttribute('file_count', files.length)

  const review = await runCodeReview(files)

  span.setAttribute('findings_count', review.findings.length)
  span.setAttribute('severity', review.maxSeverity)

  return review
})
```

### When to Use

- **Agent evaluation** — Systematically measure agent quality (pairs with our `skills/evaluation/` system)
- **Debugging agents** — Trace exactly what went wrong in a failed agent run
- **Production monitoring** — Track agent behavior in deployed systems
- **Regression detection** — Catch quality degradation after prompt/skill changes

### Integration with New Baseline

lmnr pairs with our evaluation skill (`skills/evaluation/`):

```
skills/evaluation/ → defines what to measure
lmnr → captures traces and computes metrics
    ↓
Dashboard → visualize agent quality over time
    ↓
Alerts → notify when quality drops
```

---

## Architecture: Putting It Together

For a production AI application built on New Baseline:

```
Client Request
    ↓
Next.js App (New Baseline)
    ↓
┌──────────────────────────────────┐
│  Portkey/OmniRoute Gateway       │  ← Route to best LLM
│  (fallbacks, caching, balancing) │
└──────────────────────────────────┘
    ↓
┌──────────────────┐  ┌──────────────┐
│  Claude API      │  │  OpenAI API  │  ← Multiple providers
│  (primary)       │  │  (fallback)  │
└──────────────────┘  └──────────────┘
    ↓
┌──────────────────────────────────┐
│  lmnr Tracing                    │  ← Monitor everything
│  (traces, evals, alerts)         │
└──────────────────────────────────┘
    ↓
┌──────────────────────────────────┐
│  FastAPI Microservices           │  ← Python AI services
│  (ML models, custom tools)       │
└──────────────────────────────────┘
```

---

## References

- [tiangolo/fastapi](https://github.com/tiangolo/fastapi) — Python web framework
- [Portkey-AI/gateway](https://github.com/Portkey-AI/gateway) — Universal LLM router
- [diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute) — AI API proxy
- [lmnr-ai/lmnr](https://github.com/lmnr-ai/lmnr) — Agent tracing & evaluation
