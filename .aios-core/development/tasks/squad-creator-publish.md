---
task: Publish Squad
responsavel: "@squad-creator"
responsavel_type: agent
atomic_layer: task
status: placeholder
sprint: 8
Entrada: |
  - name: Nome do squad para publicar
  - target: Destino (aios-squads | synkra-api)
Saida: |
  - pr_url: URL do PR criado (para aios-squads)
  - api_url: URL na API (para synkra-api)
  - status: Sucesso ou erro
Checklist:
  - "[ ] Implementar em Sprint 8 (SQS-6)"
---

# *publish-squad

> **PLACEHOLDER** - Implementation scheduled for Sprint 8 (Story SQS-6)

## Planned Functionality

Publishes a local squad to the aios-squads repository (via PR) or Synkra API marketplace.

## Planned Usage

```
@squad-creator

*publish-squad meu-squad
# → Creates PR to github.com/SynkraAI/aios-squads

*publish-squad meu-squad --target synkra-api
# → Publishes to api.synkra.dev/squads (requires auth)
```

## Planned Features

1. **Pre-publish Validation**
   - Run *validate-squad before publishing
   - Check required fields in squad.yaml
   - Verify license and author info

2. **GitHub Repository (Default)**
   - Fork aios-squads if needed
   - Copy squad to squads/{name}/
   - Create PR with description
   - Add appropriate labels

3. **Synkra API**
   - Upload to api.synkra.dev/squads
   - Support pricing configuration
   - Manage versions and updates

## Workflow

```
1. Validate squad
   ├── Run *validate-squad
   └── Ensure no errors

2. Prepare for publishing
   ├── Check license
   ├── Check author
   └── Generate changelog

3. Publish
   ├── If aios-squads → Create PR
   └── If synkra-api → Upload via API

4. Display result
   └── Show URL and next steps
```

## Related Story

- **SQS-6:** Registry Integration (Sprint 8)

## Current Status

This task is a placeholder. The full implementation will be done in Sprint 8.

For now, manually create PRs at:
- https://github.com/SynkraAI/aios-squads
