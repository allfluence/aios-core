# MCP API Keys Management

> **EN** | [PT](../pt/architecture/mcp-api-keys-management.md) | [ES](../es/architecture/mcp-api-keys-management.md)

---

**Version:** 1.0.0
**Last Updated:** 2026-01-26
**Status:** Official Reference

---

## Overview

This document describes best practices for managing API keys used by MCP (Model Context Protocol) servers in AIOS. Proper API key management is critical for security and operational integrity.

---

## MCP Architecture in AIOS

AIOS uses Docker MCP Toolkit as the primary MCP infrastructure:

```
┌─────────────────────────────────────────────────────────────┐
│                    MCP Architecture                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   Direct in Claude Code (~/.claude.json)                    │
│   ┌─────────────────────────────────────────────────────┐   │
│   │  playwright     → Browser automation                │   │
│   │  desktop-commander → Docker gateway operations      │   │
│   └─────────────────────────────────────────────────────┘   │
│                           │                                 │
│                           ▼                                 │
│   Inside Docker Desktop (via docker-gateway)                │
│   ┌─────────────────────────────────────────────────────┐   │
│   │  EXA           → Web search, research               │   │
│   │  Context7      → Library documentation              │   │
│   │  Apify         → Web scraping, data extraction      │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Supported MCP Servers

| MCP Server | API Key Required | Environment Variable | Location |
|------------|------------------|---------------------|----------|
| EXA | Yes | `EXA_API_KEY` | Docker MCP config.yaml |
| Context7 | No | N/A | N/A |
| Apify | Yes | `APIFY_API_TOKEN` | Docker MCP docker-mcp.yaml |
| Playwright | No | N/A | N/A |

---

## Configuration Methods

### Method 1: Docker MCP Toolkit (Primary)

Docker MCP Toolkit manages API keys through its configuration files.

**For EXA (uses apiKeys section):**

Location: `~/.docker/mcp/config.yaml`

```yaml
# ~/.docker/mcp/config.yaml
apiKeys:
  exa: "your-exa-api-key-here"
```

**For servers requiring environment variables (Apify, etc.):**

Location: `~/.docker/mcp/catalogs/docker-mcp.yaml`

```yaml
# ~/.docker/mcp/catalogs/docker-mcp.yaml
apify:
  env:
    - name: APIFY_API_TOKEN
      value: 'your-apify-token-here'  # Hardcode directly (see Known Issues)
```

### Method 2: Environment Variables

For local development or non-Docker configurations:

```bash
# ~/.zshrc or ~/.bashrc
export EXA_API_KEY="your-exa-api-key"
export APIFY_API_TOKEN="your-apify-token"
```

### Method 3: Project .env File

For project-specific configuration:

```bash
# .env (add to .gitignore!)
EXA_API_KEY=your-exa-api-key
APIFY_API_TOKEN=your-apify-token
```

---

## MCP Governance in AIOS

**IMPORTANT:** All MCP infrastructure management is handled EXCLUSIVELY by the **DevOps Agent (@devops / Gage)**.

| Operation | Agent | Command |
|-----------|-------|---------|
| Search MCP catalog | DevOps | `*search-mcp` |
| Add MCP server | DevOps | `*add-mcp` |
| List enabled MCPs | DevOps | `*list-mcps` |
| Remove MCP server | DevOps | `*remove-mcp` |
| Setup Docker MCP | DevOps | `*setup-mcp-docker` |

Other agents (Dev, Architect, etc.) are MCP **consumers**, not administrators.

---

## Security Best Practices

### DO

- Store API keys in environment variables or secure config files
- Add `.env` files to `.gitignore`
- Use different API keys for development and production
- Rotate API keys periodically (recommended every 90 days)
- Use read-only API keys when write access isn't needed
- Monitor API usage for anomalies

### DON'T

- Commit API keys to version control
- Share API keys in chat or email
- Use production keys in development
- Store keys in plain text files in shared locations
- Hardcode keys in source code

---

## Known Issues

### Docker MCP Secrets Bug (Dec 2025)

**Issue:** Docker MCP Toolkit's secrets store and template interpolation do not work properly. Credentials set via `docker mcp secret set` are NOT passed to containers.

**Symptoms:**
- `docker mcp tools ls` shows "(N prompts)" instead of "(N tools)"
- MCP server starts but fails authentication
- Verbose output shows `-e ENV_VAR` without values

**Workaround:** Edit `~/.docker/mcp/catalogs/docker-mcp.yaml` directly with hardcoded env values:

```yaml
# Instead of using secret reference
apify:
  env:
    - name: APIFY_API_TOKEN
      value: 'actual-token-value'  # Hardcode directly
```

**Affected MCPs:** Any MCP requiring authentication (Apify, Notion, Slack, etc.)

**Working MCPs:** EXA works because its key is in `~/.docker/mcp/config.yaml` under `apiKeys`

---

## Key Rotation Procedure

### Step 1: Generate New Key

1. Log into the service provider dashboard (EXA, Apify, etc.)
2. Generate a new API key
3. Record the new key securely

### Step 2: Update Configuration

```bash
# Update Docker MCP config
vim ~/.docker/mcp/config.yaml

# Or for env-based MCPs
vim ~/.docker/mcp/catalogs/docker-mcp.yaml
```

### Step 3: Verify New Key

```bash
# Restart Docker MCP (if using Docker Desktop MCP)
# Or restart Claude Code to reload configuration

# Test the connection using @devops
@devops *list-mcps
```

### Step 4: Revoke Old Key

1. Return to the service provider dashboard
2. Revoke/delete the old API key
3. Verify the old key no longer works

---

## Troubleshooting

### "Authentication failed" Error

1. Verify the API key is correct (no extra spaces)
2. Check if the key has expired
3. Verify the key has the required permissions
4. Check if rate limits were exceeded

### Keys Not Being Read

1. Restart Claude Code or your IDE
2. Verify config file syntax (YAML)
3. Check file permissions
4. For Docker MCP, check Docker Desktop is running

### MCP Tool Shows "prompts" Instead of "tools"

This indicates the secrets bug. Use the hardcoded workaround in docker-mcp.yaml.

---

## API Key Sources

| Service | Get API Key | Documentation |
|---------|-------------|---------------|
| EXA | [dashboard.exa.ai](https://dashboard.exa.ai) | [docs.exa.ai](https://docs.exa.ai) |
| Apify | [console.apify.com](https://console.apify.com) | [docs.apify.com](https://docs.apify.com) |

---

## Related Documentation

- [MCP Usage Rules](../../../.claude/rules/mcp-usage.md) - Complete MCP governance rules
- [High-Level Architecture](./high-level-architecture.md)

---

**Maintainer:** @devops (Gage)
