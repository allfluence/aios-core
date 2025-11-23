# Handoff: Arquitetura - Sistema de Greeting Unificado

**Data:** 2025-01-17  
**De:** Quinn (QA) + Pax (PO)  
**Para:** Aria (Architect)  
**Prioridade:** 🔴 Alta  
**Tempo Estimado:** 2-3 horas

---

## 📋 Contexto

Após análise completa do sistema de greeting e ativação de agentes, identificamos que múltiplos componentes foram desenvolvidos de forma incremental (Stories 6.1.1 até 6.1.6) mas nunca foram completamente integrados. 

**Problema Principal:** Agentes não estão usando os componentes desenvolvidos, resultando em:
- Sem detecção de contexto de sessão
- Sem adaptação de comandos baseada em workflow
- Sem atualização de session state
- Performance subótima

**Solução Proposta:** Expandir Story 6.1.4 para criar sistema unificado que integre todos os componentes de forma otimizada.

---

## 🎯 Objetivo da Análise

Solicitamos análise técnica da arquitetura proposta para validar:

1. **Estrutura técnica** - A solução proposta é arquiteturalmente sólida?
2. **Performance** - As otimizações propostas são adequadas?
3. **Integração** - A integração entre componentes está bem desenhada?
4. **Manutenibilidade** - O código será fácil de manter e evoluir?
5. **Compatibilidade** - Mantém compatibilidade com código existente?
6. **Escalabilidade** - Suporta futuras expansões?

---

## 📊 Estado Atual

### Componentes Existentes (Funcionais mas Não Integrados):

```
.aios-core/scripts/
├── greeting-builder.js              ✅ Funcional
│   - buildGreeting(agent, context)
│   - Suporta preferências (Story 6.1.4)
│   - Timeout 150ms
│   - Fallback para greeting simples
│
├── session-context-loader.js        ✅ Funcional
│   - loadContext(agentId)
│   - updateSession(agentId, name, command)
│   - formatForGreeting(agentId)
│   - Usa .aios/session-state.json
│
├── project-status-loader.js         ✅ Funcional
│   - loadProjectStatus()
│   - Cache 60 segundos
│   - Detecta branch, modified files, commits
│
├── context-detector.js               ✅ Funcional
│   - detectSessionType(conversationHistory)
│   - Fallback para arquivo de sessão
│
└── greeting-preference-manager.js   ✅ Funcional
    - getPreference()
    - setPreference(level)
    - Suporta: auto/minimal/named/archetypal
```

### Problema Atual:

**Agentes (.aios-core/agents/*.md):**
```yaml
activation-instructions:
  - STEP 3: |
      Generate contextual greeting using inline logic:
      
      1. Detect session type:
         - If this is first message → "new" session
         - If conversation has history → "existing" session
      
      2. Build greeting components manually...
      
      3. Get project status (use Bash tool):
         - git branch --show-current
         - git status --short | wc -l
         - git log -1 --pretty=format:"%s"
      
      4. Show commands based on session type...
```

**Problemas:**
- ❌ Claude Code não tem acesso a `conversationHistory`
- ❌ Detecção sempre retorna "new"
- ❌ Não usa nenhum dos scripts desenvolvidos
- ❌ Session state nunca é atualizado

---

## 💡 Solução Proposta

### Arquitetura Unificada:

```
┌─────────────────────────────────────────────────────────┐
│           generate-greeting.js (Wrapper)                │
│  ┌──────────────────────────────────────────────────┐  │
│  │ 1. Load Agent Definition                        │  │
│  │ 2. Parallel Load Context:                       │  │
│  │    ├─ Session Context (session-context-loader)  │  │
│  │    └─ Project Status (project-status-loader)   │  │
│  │ 3. Check User Preferences                       │  │
│  │ 4. Build Unified Context Object                 │  │
│  │ 5. Call greeting-builder.buildGreeting()        │  │
│  │ 6. Return Formatted Greeting                    │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                        │
                        ▼
        ┌───────────────────────────────┐
        │   Agent STEP 3 (Updated)      │
        │                               │
        │  node generate-greeting.js    │
        │  {agent-id}                   │
        │                               │
        │  Display output               │
        └───────────────────────────────┘
```

### Implementação Proposta:

**1. Novo Wrapper Script:**

```javascript
// .aios-core/scripts/generate-greeting.js
#!/usr/bin/env node

const GreetingBuilder = require('./greeting-builder');
const SessionContextLoader = require('./session-context-loader');
const { loadProjectStatus } = require('./project-status-loader');
const AgentConfigLoader = require('./agent-config-loader');
const path = require('path');

/**
 * Unified Greeting Generator
 * 
 * Orchestrates all greeting components for optimal performance
 * and unified context management.
 * 
 * Performance Targets:
 * - With cache: <50ms
 * - Without cache: <150ms (timeout protection)
 * - Fallback: <10ms
 */
async function generateGreeting(agentId) {
  const startTime = Date.now();
  
  try {
    // 1. Load agent definition (parallel with context)
    const agentLoader = new AgentConfigLoader(agentId);
    const [agentDef, sessionContext, projectStatus] = await Promise.all([
      agentLoader.load({}),
      loadSessionContext(agentId),
      loadProjectStatus()
    ]);
    
    // 2. Build unified context
    const context = {
      sessionType: sessionContext.sessionType,
      conversationHistory: [], // Not available in Claude Code
      lastCommands: sessionContext.lastCommands || [],
      previousAgent: sessionContext.previousAgent,
      projectStatus: projectStatus,
      sessionMessage: sessionContext.message
    };
    
    // 3. Generate greeting using GreetingBuilder
    const builder = new GreetingBuilder();
    const greeting = await builder.buildGreeting(agentDef, context);
    
    const duration = Date.now() - startTime;
    if (duration > 100) {
      console.warn(`[generate-greeting] Slow generation: ${duration}ms`);
    }
    
    return greeting;
    
  } catch (error) {
    console.error('[generate-greeting] Error:', error.message);
    
    // Fallback: Simple greeting
    return generateFallbackGreeting(agentId);
  }
}

async function loadSessionContext(agentId) {
  try {
    const loader = new SessionContextLoader();
    return loader.loadContext(agentId);
  } catch (error) {
    console.warn('[generate-greeting] Session context failed:', error.message);
    return {
      sessionType: 'new',
      message: null,
      previousAgent: null,
      lastCommands: []
    };
  }
}

function generateFallbackGreeting(agentId) {
  // Minimal fallback if everything fails
  return `✅ ${agentId} Agent ready\n\nType \`*help\` to see available commands.`;
}

// CLI interface
if (require.main === module) {
  const agentId = process.argv[2];
  
  if (!agentId) {
    console.error('Usage: node generate-greeting.js <agent-id>');
    process.exit(1);
  }
  
  generateGreeting(agentId)
    .then(greeting => {
      console.log(greeting);
      process.exit(0);
    })
    .catch(error => {
      console.error('Fatal error:', error.message);
      console.log(generateFallbackGreeting(agentId));
      process.exit(1);
    });
}

module.exports = { generateGreeting };
```

**2. Atualização dos Agentes:**

```yaml
activation-instructions:
  - STEP 1: Read THIS ENTIRE FILE
  - STEP 2: Adopt the persona defined in 'agent' and 'persona' sections
  
  - STEP 3: |
      Generate greeting by executing unified greeting generator:
      
      1. Execute: node .aios-core/scripts/generate-greeting.js {agent-id}
      2. Capture the complete output
      3. Display the greeting exactly as returned
      
      If execution fails or times out:
      - Fallback to simple greeting: "{icon} {name} ready"
      - Show: "Type *help to see available commands"
      
      Do NOT modify or interpret the greeting output.
      Display it exactly as received.
  
  - STEP 4: HALT and await user input
```

**3. Session Update Hook:**

```javascript
// .aios-core/scripts/command-execution-hook.js
const SessionContextLoader = require('./session-context-loader');

/**
 * Update session state after command execution
 * 
 * Should be called after each command execution to maintain
 * accurate session context for future agent activations.
 */
function updateSessionAfterCommand(agentId, agentName, command) {
  try {
    const loader = new SessionContextLoader();
    loader.updateSession(agentId, agentName, command);
  } catch (error) {
    console.warn('[command-hook] Failed to update session:', error.message);
    // Non-blocking: Session update failure shouldn't break command execution
  }
}

module.exports = { updateSessionAfterCommand };
```

---

## 🔍 Pontos para Análise Técnica

### 1. Arquitetura e Design

**Questões:**
- ✅ O wrapper unificado é a melhor abordagem arquitetural?
- ✅ A separação de responsabilidades está clara?
- ✅ O fluxo de dados está bem definido?
- ✅ Há algum padrão arquitetural melhor que deveríamos seguir?

**Considerações:**
- Manter compatibilidade com código existente
- Facilitar testes unitários
- Permitir extensibilidade futura

### 2. Performance

**Questões:**
- ✅ As otimizações propostas (paralelização, cache) são adequadas?
- ✅ O timeout de 150ms é apropriado?
- ✅ Há gargalos potenciais não identificados?
- ✅ O fallback é rápido o suficiente?

**Métricas Esperadas:**
- Com cache: <50ms
- Sem cache: <150ms
- Fallback: <10ms

**Análise Necessária:**
- Tempo de carregamento de cada componente
- Overhead de paralelização
- Impacto do cache
- Tempo de fallback

### 3. Integração entre Componentes

**Questões:**
- ✅ A integração entre componentes está bem desenhada?
- ✅ Há dependências circulares?
- ✅ O contexto unificado está bem estruturado?
- ✅ Há pontos de falha que podem quebrar todo o sistema?

**Componentes a Integrar:**
- GreetingBuilder
- SessionContextLoader
- ProjectStatusLoader
- ContextDetector
- GreetingPreferenceManager
- AgentConfigLoader

### 4. Tratamento de Erros e Fallbacks

**Questões:**
- ✅ Os fallbacks são adequados?
- ✅ O sistema degrada graciosamente?
- ✅ Erros são tratados em todos os níveis?
- ✅ Há logging adequado para debugging?

**Cenários de Falha:**
- Node.js não disponível
- Scripts não encontrados
- Cache corrompido
- Git não configurado
- Session state inválido
- Timeout excedido

### 5. Manutenibilidade

**Questões:**
- ✅ O código será fácil de manter?
- ✅ Há documentação adequada?
- ✅ Os testes são viáveis?
- ✅ A estrutura facilita futuras expansões?

**Considerações:**
- Código limpo e bem documentado
- Testes unitários e de integração
- Documentação de arquitetura
- Guias de troubleshooting

### 6. Compatibilidade e Migração

**Questões:**
- ✅ Mantém compatibilidade com código existente?
- ✅ A migração é segura?
- ✅ Há breaking changes?
- ✅ Agentes antigos continuam funcionando?

**Cenários:**
- Agentes sem STEP 3 atualizado
- Configurações antigas
- Cache de versões anteriores
- Session state de versões antigas

### 7. Escalabilidade

**Questões:**
- ✅ Suporta adição de novos componentes?
- ✅ Suporta novos tipos de contexto?
- ✅ Suporta novos tipos de preferências?
- ✅ Performance se mantém com crescimento?

**Futuras Expansões Possíveis:**
- Novos tipos de contexto (memória, histórico, etc.)
- Novos tipos de preferências
- Novos tipos de sessão
- Integração com sistemas externos

---

## 📋 Checklist de Validação

Por favor, valide cada item:

### Arquitetura
- [ ] Estrutura proposta é arquiteturalmente sólida
- [ ] Separação de responsabilidades está clara
- [ ] Fluxo de dados está bem definido
- [ ] Padrões arquiteturais adequados

### Performance
- [ ] Otimizações propostas são adequadas
- [ ] Timeout de 150ms é apropriado
- [ ] Não há gargalos identificados
- [ ] Fallback é rápido o suficiente

### Integração
- [ ] Integração entre componentes está bem desenhada
- [ ] Não há dependências circulares
- [ ] Contexto unificado está bem estruturado
- [ ] Pontos de falha identificados e tratados

### Erros e Fallbacks
- [ ] Fallbacks são adequados
- [ ] Sistema degrada graciosamente
- [ ] Erros tratados em todos os níveis
- [ ] Logging adequado

### Manutenibilidade
- [ ] Código será fácil de manter
- [ ] Documentação adequada
- [ ] Testes viáveis
- [ ] Estrutura facilita expansões

### Compatibilidade
- [ ] Mantém compatibilidade com código existente
- [ ] Migração é segura
- [ ] Não há breaking changes
- [ ] Agentes antigos continuam funcionando

### Escalabilidade
- [ ] Suporta novos componentes
- [ ] Suporta novos tipos de contexto
- [ ] Suporta novos tipos de preferências
- [ ] Performance se mantém com crescimento

---

## 📝 Documentos de Referência

### Stories Relacionadas:
- `docs/stories/aios migration/story-6.1.1-agent-persona-definitions.md`
- `docs/stories/aios migration/story-6.1.2.4-project-status-context.md`
- `docs/stories/aios migration/story-6.1.2.5-contextual-agent-load-integration.md`
- `docs/stories/aios migration/story-6.1.4.md`
- `docs/stories/aios migration/story-6.1.6-output-formatter-implementation.md`

### Análises:
- `docs/qa/greeting-context-analysis-report.md`
- `docs/qa/comprehensive-greeting-system-analysis.md`

### Componentes Existentes:
- `.aios-core/scripts/greeting-builder.js`
- `.aios-core/scripts/session-context-loader.js`
- `.aios-core/scripts/project-status-loader.js`
- `.aios-core/scripts/context-detector.js`
- `.aios-core/scripts/greeting-preference-manager.js`

---

## 🎯 Entregáveis Esperados

Após análise, solicitamos:

1. **Relatório de Análise Técnica** com:
   - Avaliação de cada ponto acima
   - Identificação de problemas/riscos
   - Recomendações de melhorias
   - Aprovação ou sugestões de ajustes

2. **Decisões Arquiteturais** sobre:
   - Estrutura proposta (aprovar/modificar/rejeitar)
   - Mudanças necessárias
   - Riscos identificados
   - Mitigações recomendadas

3. **Próximos Passos** claros:
   - O que aprovar
   - O que modificar
   - O que rejeitar
   - Como proceder

---

## ⏱️ Timeline

**Solicitado:** Análise técnica completa  
**Prazo:** 2-3 horas  
**Após Aprovação:** Reescrita da Story 6.1.4 com implementação

---

## 📞 Contato

**Dúvidas ou esclarecimentos:**
- Quinn (QA) - Análise de problemas
- Pax (PO) - Requisitos e validação
- Aria (Architect) - Análise técnica

---

**Status:** ⏳ Aguardando Análise Técnica  
**Próxima Ação:** @architect realizar análise e aprovar/modificar proposta

