<!--
  Tradução: PT-BR
  Original: /docs/en/guides/agent-selection-guide.md
  Última sincronização: 2026-01-26
-->

# Guia de Seleção de Agentes

> 🌐 [EN](../../guides/agent-selection-guide.md) | **PT** | [ES](../../es/guides/agent-selection-guide.md)

---

## Referência Rápida para Escolher o Agente Correto

**Última Atualização:** 2025-01-15 (Story 6.1.2.3)

---

## Árvore de Decisão Rápida

```
Precisa de pesquisa/análise? → @analyst
   ↓
Precisa de PRD/epic? → @pm
   ↓
Precisa de arquitetura? → @architect
   ↓
Precisa de banco de dados? → @data-engineer
   ↓
Precisa de stories? → @sm
   ↓
Precisa de implementação? → @dev
   ↓
Precisa de testes? → @qa
   ↓
Precisa de deploy? → @github-devops
```

---

## Referência Rápida de Agentes

| Agente | Ícone | Use Para | NÃO Use Para |
|--------|-------|----------|--------------|
| **@analyst** (Atlas) | 🔍 | Pesquisa de mercado, análise competitiva, brainstorming | Criação de PRD, arquitetura, stories |
| **@pm** (Morgan) | 📋 | PRD, epics, estratégia de produto, roadmap | Pesquisa, arquitetura, stories detalhadas |
| **@architect** (Aria) | 🏛️ | Arquitetura de sistema, design de API, stack tecnológica | Pesquisa, PRD, schema de banco de dados |
| **@data-engineer** (Dara) | 📊 | Schema de banco de dados, RLS, migrations, otimização de queries | Arquitetura de app, seleção de tecnologia de BD |
| **@sm** (River) | 🌊 | User stories, planejamento de sprint, refinamento de backlog | PRD, epics, pesquisa, implementação |
| **@dev** (Dex) | 💻 | Implementação de story, codificação, testes | Criação de story, deploy |
| **@qa** (Quinn) | 🧪 | Code review, testes, garantia de qualidade | Implementação |
| **@po** (Pax) | 🎯 | Gerenciamento de backlog, critérios de aceitação, priorização | Criação de epic, arquitetura |
| **@ux-design-expert** (Nova) | 🎨 | Design UI/UX, wireframes, design systems | Implementação |
| **@github-devops** (Gage) | ⚙️ | Git ops, criação de PR, deploy, CI/CD | Git local, implementação |
| **@aios-master** (Orion) | 👑 | Desenvolvimento do framework, orquestração multi-agente | Tarefas rotineiras (use agentes especializados) |

---

## Cenários Comuns

### "Quero construir uma nova funcionalidade"

```
1. @analyst *research - Pesquisa de mercado
2. @pm *create-prd - Requisitos de produto
3. @architect *create-architecture - Design técnico
4. @data-engineer *create-schema - Design de banco de dados
5. @sm *create-next-story - User stories
6. @dev *develop - Implementação
7. @qa *review - Verificação de qualidade
8. @github-devops *create-pr - Deploy
```

### "Preciso entender um sistema existente"

```
1. @analyst *document-project - Documentação brownfield
2. @pm *create-prd (brownfield) - Documentar como PRD
3. @architect *create-architecture (brownfield) - Arquitetura técnica
```

### "Quero otimizar o banco de dados"

```
1. @data-engineer *security-audit - Verificar RLS e schema
2. @data-engineer *analyze-performance hotpaths - Encontrar gargalos
3. @data-engineer *create-migration-plan - Planejar otimizações
4. @data-engineer *apply-migration - Aplicar mudanças
```

---

## Padrões de Delegação (Story 6.1.2.3)

### Criação de Epic/Story

- **PM cria epic** → **SM cria stories**
  ```
  @pm *create-epic         # Estrutura do epic
  @sm *create-next-story   # Stories detalhadas
  ```

### Trabalho com Banco de Dados

- **Architect seleciona BD** → **Data-engineer projeta schema**
  ```
  @architect *create-architecture  # Seleção de tecnologia de BD
  @data-engineer *create-schema    # Design do schema
  ```

### Pesquisa → Produto

- **Analyst pesquisa** → **PM cria PRD**
  ```
  @analyst *research               # Análise de mercado
  @pm *create-prd                  # Documento de produto
  ```

---

## Documentação Completa

Para limites detalhados e orientação de "NÃO use para", veja:
- `docs/analysis/agent-responsibility-matrix.md` - Definições completas de limites
- `docs/guides/command-migration-guide.md` - Mudanças de comandos e migrações

---

**Versão:** 1.0 | **Story:** 6.1.2.3
