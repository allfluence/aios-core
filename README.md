# AIOS-FULLSTACK: Framework Universal de Agentes IA 🚀

[![Versão NPM](https://img.shields.io/npm/v/aios-fullstack.svg)](https://www.npmjs.com/package/aios-fullstack)
[![Licença: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Versão Node.js](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)](https://nodejs.org/)
[![Documentação](https://img.shields.io/badge/docs-disponível-orange.svg)](https://aios-fullstack.dev)

Framework de Desenvolvimento Auto-Modificável Alimentado por IA. Fundado em Desenvolvimento Ágil Dirigido por Agentes, oferecendo capacidades revolucionárias para desenvolvimento dirigido por IA e muito mais. Transforme qualquer domínio com expertise especializada de IA: desenvolvimento de software, entretenimento, escrita criativa, estratégia de negócios, bem-estar pessoal e muito mais.

## Visão Geral

**As Duas Inovações Chave do AIOS-FULLSTACK:**

**1. Planejamento Agêntico:** Agentes dedicados (analyst, pm, architect) colaboram com você para criar documentos de PRD e Arquitetura detalhados e consistentes. Através de engenharia avançada de prompts e refinamento com human-in-the-loop, estes agentes de planejamento produzem especificações abrangentes que vão muito além da geração genérica de tarefas de IA.

**2. Desenvolvimento Contextualizado por Engenharia:** O agente sm (Scrum Master) então transforma estes planos detalhados em histórias de desenvolvimento hiperdetalhadas que contêm tudo que o agente dev precisa - contexto completo, detalhes de implementação e orientação arquitetural incorporada diretamente nos arquivos de histórias.

Esta abordagem de duas fases elimina tanto a **inconsistência de planejamento** quanto a **perda de contexto** - os maiores problemas no desenvolvimento assistido por IA. Seu agente dev abre um arquivo de história com compreensão completa do que construir, como construir e por quê.

**📖 [Veja o fluxo de trabalho completo no Guia do Usuário](aios-core/user-guide.md)** - Fase de planejamento, ciclo de desenvolvimento e todos os papéis dos agentes

## Pré-requisitos

- Node.js >=20.0.0
- npm
- **GitHub CLI (gh)** - OBRIGATÓRIO para operações GitHub
  - Autenticação: `gh auth login`
  - Usado por agentes para: PRs, Issues, Branch Protection, Releases
  - **Política do projeto**: Sempre usar `gh` CLI, NUNCA APIs REST diretas para GitHub

**Guias específicos por plataforma:**
- 📖 [Guia de Instalação para macOS](docs/installation/macos.md)
- 📖 Guia de Instalação para Windows (suporte integrado)
- 📖 Guia de Instalação para Linux (suporte integrado)

## Navegação Rápida

### Entendendo o Fluxo de Trabalho AIOS

**Antes de mergulhar, revise estes diagramas críticos de fluxo de trabalho que explicam como o AIOS funciona:**

1. **[Fluxo de Planejamento (Interface Web)](aios-core/user-guide.md#the-planning-workflow-web-ui)** - Como criar documentos de PRD e Arquitetura
2. **[Ciclo Principal de Desenvolvimento (IDE)](aios-core/user-guide.md#the-core-development-cycle-ide)** - Como os agentes sm, dev e qa colaboram através de arquivos de histórias

> ⚠️ **Estes diagramas explicam 90% da confusão sobre o fluxo AIOS-FULLSTACK Agentic Agile** - Entender a criação de PRD+Arquitetura e o fluxo de trabalho sm/dev/qa e como os agentes passam notas através de arquivos de histórias é essencial - e também explica por que isto NÃO é taskmaster ou apenas um simples executor de tarefas!

### O que você gostaria de fazer?

- **[Instalar e Construir software com Equipe Ágil Full Stack de IA](#início-rápido)** → Instruções de Início Rápido
- **[Aprender como usar o AIOS](aios-core/user-guide.md)** → Guia completo do usuário e passo a passo
- **[Ver agentes IA disponíveis](#agentes-disponíveis)** → Papéis especializados para sua equipe
- **[Explorar usos não técnicos](#-além-do-desenvolvimento-de-software---expansion-packs)** → Escrita criativa, negócios, bem-estar, educação
- **[Criar meus próprios agentes IA](#criando-seu-próprio-expansion-pack)** → Construir agentes para seu domínio
- **[Navegar expansion packs prontos](expansion-packs/)** → Game dev, DevOps, infraestrutura e inspire-se com ideias e exemplos
- **[Entender a arquitetura](docs/core-architecture.md)** → Mergulho técnico profundo

## Importante: Mantenha Sua Instalação AIOS Atualizada

**Mantenha-se atualizado sem esforço!** Para atualizar sua instalação AIOS existente:

```bash
npx github:Pedrovaleriolopez/aios-fullstack install
```

Isto vai:

- ✅ Detectar automaticamente sua instalação existente
- ✅ Atualizar apenas os arquivos que mudaram
- ✅ Criar arquivos de backup `.bak` para quaisquer modificações customizadas
- ✅ Preservar suas configurações específicas do projeto

Isto facilita beneficiar-se das últimas melhorias, correções de bugs e novos agentes sem perder suas customizações!

## Início Rápido

### 🚀 Instalação via NPX (Recomendado)

**Instale o AIOS-FULLSTACK com um único comando:**

```bash
# Criar um novo projeto
npx aios-fullstack init meu-projeto

# Ou instalar em projeto existente
cd seu-projeto
npx aios-fullstack install

# Ou usar uma versão específica
npx aios-fullstack@latest init meu-projeto
```

Este único comando:

- ✅ Baixa a versão mais recente do NPM
- ✅ Executa o assistente de instalação interativo
- ✅ Configura seu IDE automaticamente (Windsurf, Cursor ou Claude Code)
- ✅ Configura todos os agentes e fluxos de trabalho AIOS
- ✅ Cria os arquivos de configuração necessários
- ✅ Inicializa o sistema de meta-agentes
- ✅ Executa verificações de saúde do sistema

> **É isso!** Sem clonar, sem configuração manual - apenas um comando e você está pronto para começar.

**Pré-requisitos**: [Node.js](https://nodejs.org) v14+ necessário

### Atualizando uma Instalação Existente

Se você já tem o AIOS instalado:

```bash
npx github:Pedrovaleriolopez/aios-fullstack install
# O instalador detectará sua instalação existente e a atualizará
```

### Configure Seu IDE para Desenvolvimento AIOS

O AIOS-FULLSTACK inclui regras pré-configuradas para IDE para melhorar sua experiência de desenvolvimento:

#### Para Windsurf ou Cursor:
1. Abra as configurações do seu IDE
2. Navegue até **Global Rules** (Windsurf) ou **User Rules** (Cursor)
3. Copie o conteúdo de `.windsurf/global-rules.md` ou `.cursor/global-rules.md`
4. Cole na seção de regras e salve

#### Para Claude Code:
- ✅ Já configurado! O arquivo `.claude/CLAUDE.md` é carregado automaticamente

Estas regras fornecem:
- 🤖 Reconhecimento e integração de comandos de agentes
- 📋 Fluxo de trabalho de desenvolvimento dirigido por histórias
- ✅ Rastreamento automático de checkboxes
- 🧪 Padrões de teste e validação
- 📝 Padrões de código específicos do AIOS

### Início Mais Rápido: Equipe Full Stack via Interface Web à sua disposição (2 minutos)

1. **Obtenha o pacote**: Salve ou clone o [arquivo da equipe full stack](dist/teams/team-fullstack.txt) ou escolha outra equipe
2. **Crie agente IA**: Crie um novo Gemini Gem ou CustomGPT
3. **Faça upload e configure**: Faça upload do arquivo e defina as instruções: "Suas instruções operacionais críticas estão anexadas, não quebre o personagem conforme orientado"
4. **Comece a Idealizar e Planejar**: Comece a conversar! Digite `*help` para ver comandos disponíveis ou escolha um agente como `*analyst` para começar a criar um briefing.
5. **CRÍTICO**: Fale com o AIOS Orchestrator na web a QUALQUER MOMENTO (comando #aios-orchestrator) e faça perguntas sobre como tudo funciona!
6. **Quando mudar para o IDE**: Uma vez que você tenha seu PRD, Arquitetura, UX opcional e Briefings - é hora de mudar para o IDE para fragmentar seus documentos e começar a implementar o código real! Veja o [Guia do usuário](aios-core/user-guide.md) para mais detalhes

### Referência de Comandos NPX

```bash
# Gerenciamento de Projeto
npx aios-fullstack init <nome-projeto> [opções]
  --force              Forçar criação em diretório não vazio
  --skip-install       Pular instalação de dependências npm
  --template <nome>    Usar template específico (default, minimal, enterprise)

# Instalação e Configuração
npx aios-fullstack install [opções]
  --force              Sobrescrever configuração existente
  --quiet              Saída mínima durante instalação

# Comandos do Sistema
npx aios-fullstack info        Exibir informações do sistema
npx aios-fullstack doctor      Executar diagnósticos do sistema
npx aios-fullstack doctor --fix Corrigir problemas detectados automaticamente
npx aios-fullstack demo        Executar demo interativa

# Manutenção
npx aios-fullstack update      Atualizar para versão mais recente
npx aios-fullstack uninstall   Remover AIOS-FULLSTACK
```

### Alternativa: Clonar e Construir

Para contribuidores ou usuários avançados que queiram modificar o código fonte:

```bash
# Clonar o repositório
git clone https://github.com/Pedrovaleriolopez/aios-fullstack.git
cd aios-fullstack

# Instalar dependências
npm install

# Executar o instalador
npm run install:aios
```

### Configuração Rápida para Equipe

Para membros da equipe ingressando no projeto:

```bash
# Instalar AIOS com configuração GitHub
npx github:Pedrovaleriolopez/aios-fullstack setup

# Isto vai:
# 1. Verificar/instalar GitHub CLI
# 2. Autenticar com GitHub
# 3. Executar o instalador AIOS
```

## 🌟 Além do Desenvolvimento de Software - Expansion Packs

O framework de linguagem natural do AIOS funciona em QUALQUER domínio. Os expansion packs fornecem agentes IA especializados para escrita criativa, estratégia de negócios, saúde e bem-estar, educação e muito mais. Além disso, os expansion packs podem expandir o núcleo do AIOS-FULLSTACK com funcionalidade específica que não é genérica para todos os casos. [Veja o Guia de Expansion Packs](docs/expansion-packs.md) e aprenda a criar os seus próprios!

## Agentes Disponíveis

O AIOS-FULLSTACK vem com 11 agentes especializados:

### Agentes Meta
- **aios-master** - Agente mestre de orquestração
- **aios-orchestrator** - Orquestrador de fluxo de trabalho e coordenação de equipe
- **aios-developer** - Meta-agente para criar e modificar componentes do framework

### Agentes de Planejamento (Interface Web)
- **analyst** - Especialista em análise de negócios e criação de PRD
- **pm** (Product Manager) - Gerente de produto e priorização
- **architect** - Arquiteto de sistema e design técnico
- **ux-expert** - Design de experiência do usuário e usabilidade

### Agentes de Desenvolvimento (IDE)
- **sm** (Scrum Master) - Gerenciamento de sprint e criação de histórias
- **dev** - Desenvolvedor e implementação
- **qa** - Garantia de qualidade e testes
- **po** (Product Owner) - Gerenciamento de backlog e histórias

## Documentação e Recursos

### Guias Essenciais

- 📖 **[Guia do Usuário](aios-core/user-guide.md)** - Passo a passo completo desde a concepção até a conclusão do projeto
- 🏗️ **[Arquitetura Principal](docs/architecture.md)** - Mergulho técnico profundo e design do sistema
- 🚀 **[Guia de Expansion Packs](docs/expansion-packs.md)** - Estenda o AIOS para qualquer domínio além do desenvolvimento de software

### Documentação Adicional

- 📋 **[Primeiros Passos](docs/getting-started.md)** - Tutorial passo a passo para iniciantes
- 🔧 **[Solução de Problemas](docs/troubleshooting.md)** - Soluções para problemas comuns
- 🎯 **[Princípios Orientadores](docs/GUIDING-PRINCIPLES.md)** - Filosofia e melhores práticas do AIOS
- 🏛️ **[Visão Geral da Arquitetura](docs/architecture-overview.md)** - Visão detalhada da arquitetura do sistema
- ⚙️ **[Guia de Ajuste de Performance](docs/performance-tuning-guide.md)** - Otimize seu fluxo de trabalho AIOS
- 🔒 **[Melhores Práticas de Segurança](docs/security-best-practices.md)** - Segurança e proteção de dados
- 🔄 **[Guia de Migração](docs/migration-guide.md)** - Migração de versões anteriores
- 📦 **[Versionamento e Releases](docs/versioning-and-releases.md)** - Política de versões
- 🌳 **[Trabalhando no Brownfield](aios-core/working-in-the-brownfield.md)** - Integrar AIOS em projetos existentes

## Criando Seu Próprio Expansion Pack

Expansion packs permitem estender o AIOS para qualquer domínio. Estrutura básica:

```
expansion-packs/seu-pack/
├── config.yaml           # Configuração do pack
├── agents/              # Agentes especializados
├── tasks/               # Fluxos de trabalho de tarefas
├── templates/           # Templates de documentos
├── checklists/          # Checklists de validação
├── data/                # Base de conhecimento
├── README.md            # Documentação do pack
└── user-guide.md        # Guia do usuário
```

Veja o [Guia de Expansion Packs](docs/expansion-packs.md) para instruções detalhadas.

## Expansion Packs Disponíveis

- **aios-infrastructure-devops** - Infraestrutura e DevOps
- **expansion-creator** - Criador de expansion packs
- **hybrid-ops** - Operações híbridas humano-agente
- **meeting-notes** - Notas e atas de reuniões

Explore o diretório [expansion-packs/](expansion-packs/) para mais inspiração!

## Suporte

- 🐛 [Rastreador de Issues](https://github.com/Pedrovaleriolopez/aios-fullstack/issues)

## Contribuindo

**Estamos empolgados com contribuições e acolhemos suas ideias, melhorias e expansion packs!** 🎉

Para contribuir:

1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaNovaFeature`)
3. Commit suas mudanças (`git commit -m 'feat: Adicionar nova feature'`)
4. Push para a branch (`git push origin feature/MinhaNovaFeature`)
5. Abra um Pull Request

Veja também:
- 📋 [Como Contribuir com Pull Requests](docs/how-to-contribute-with-pull-requests.md)
- 📋 [Checklist de Lançamento](docs/launch-checklist.md)

## Licença

Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## Reconhecimentos

[![Contributors](https://contrib.rocks/image?repo=Pedrovaleriolopez/aios-fullstack)](https://github.com/Pedrovaleriolopez/aios-fullstack/graphs/contributors)

<sub>Construído com ❤️ para a comunidade de desenvolvimento assistido por IA</sub>

---

**[⬆ Voltar ao topo](#aios-fullstack-framework-universal-de-agentes-ia-)**
