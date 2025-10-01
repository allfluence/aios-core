# Seção 2: Requisitos

**Requisitos Funcionais (FR):**

1. **FR1:** O sistema deve ser completamente renomeado de "AIOS-Method" para "AIOS-FULLSTACK", incluindo todos os artefatos, arquivos e referências internas.
2. **FR2:** O agente `aios-master` deve possuir um workflow (`setup-environment`) capaz de configurar o ambiente de desenvolvimento para Windsurf, Cursor e Claude Code, criando e atualizando os arquivos de regras.
3. **FR3 (MVP):** O sistema deve implementar uma camada de memória para prototipagem utilizando `LlamaIndex` com `SimpleVectorStore`. A persistência inicial será em sistema de arquivos local para acelerar o desenvolvimento e os testes dos agentes.
4. **FR4:** Deve existir um agente `aios-developer` (Meta-Agente) capaz de criar novos componentes do framework (agentes, tasks, workflows) e atualizar automaticamente os manifestos do sistema para manter a integridade.
5. **FR5:** Deve existir um agente `aios-langgraph-expert` capaz de criar agentes complexos baseados em LangGraph.
6. **FR6:** O agente `aios-langgraph-expert` deve ser capaz de criar pontos de intervenção humana (Human-in-the-Loop) que se integram com ClickUp e WhatsApp.
7. **FR7:** O agente `aios-langgraph-expert` deve possuir um workflow para receber um JSON de workflow do n8n, interpretá-lo e reproduzi-lo como um grafo funcional em LangGraph.
8. **(PÓS-MVP) FR8:** Migrar a camada de memória de `LlamaIndex` para a arquitetura de produção final com **Supabase**.

**Requisitos Não-Funcionais (NFR):**

1. **NFR1:** A arquitetura deve ser orientada a eventos, com o LangGraph como núcleo de orquestração.
2. **NFR2:** O sistema deve possuir observabilidade total, com integração nativa com LangSmith para tracing e telemetria para Prometheus/Grafana.
3. **NFR3:** A persistência de estado deve ser durável, utilizando o sistema de checkpointing do LangGraph para garantir a recuperação de falhas.
4. **NFR4:** A segurança deve ser implementada em múltiplas camadas, incluindo JWT, validação de workspace e RLS no Supabase.
5. **NFR5:** O sistema deve ser projetado para alta performance, com metas de latência (P99 < 5s) e throughput (1M eventos/min).

**Requisitos de Compatibilidade (CR):**

1. **CR1:** A nova arquitetura deve ser implementada como uma evolução do codebase do `AIOS-Method`, mantendo a compatibilidade com seus conceitos fundamentais.
2. **CR2:** As migrações de banco de dados no Supabase devem ser reversíveis.
3. **CR3:** A estratégia de rollback (tags Git, feature flags) deve garantir que o sistema possa ser revertido para um estado estável.
