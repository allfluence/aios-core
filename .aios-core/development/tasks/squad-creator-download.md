---
task: Download Squad
responsavel: "@squad-creator"
responsavel_type: agent
atomic_layer: task
status: placeholder
sprint: 8
Entrada: |
  - name: Nome do squad para baixar
  - source: Fonte (aios-squads | synkra-api)
Saida: |
  - squad_path: Caminho do squad baixado
  - status: Sucesso ou erro
Checklist:
  - "[ ] Implementar em Sprint 8 (SQS-5)"
---

# *download-squad

> **PLACEHOLDER** - Implementation scheduled for Sprint 8 (Story SQS-5)

## Planned Functionality

Downloads a public squad from the aios-squads repository or Synkra API marketplace.

## Planned Usage

```
@squad-creator

*download-squad etl-squad
# → Downloads from github.com/SynkraAI/aios-squads

*download-squad premium-pack --source synkra-api
# → Downloads from api.synkra.dev/squads (requires auth)
```

## Planned Features

1. **Repository Source (Default)**
   - Clone from github.com/SynkraAI/aios-squads
   - Support specific versions via tags
   - Validate squad before installation

2. **Synkra API Source**
   - Download from api.synkra.dev/squads
   - Support premium/paid squads
   - Require authentication

3. **Installation**
   - Install to ./squads/{name}/
   - Run validation after download
   - Show usage instructions

## Related Story

- **SQS-5:** SquadSyncService (Sprint 8)
- **SQS-6:** Registry Integration (Sprint 8)

## Current Status

This task is a placeholder. The full implementation will be done in Sprint 8.

For now, manually clone squads from:
- https://github.com/SynkraAI/aios-squads
