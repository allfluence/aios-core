# STORY: Error Handling & Rollback

**ID:** STORY-1.9  
**Épico:** [EPIC-S1](../../../epics/epic-s1-installer-foundation.md)  
**Sprint:** 1 | **Points:** 5 | **Priority:** 🔴 Critical  
**Created:** 2025-01-19

---

## 📊 User Story

**Como** desenvolvedor,  
**Quero** que installer faça rollback automático em caso de erro,  
**Para** não deixar projeto em estado inconsistente

---

## ✅ Acceptance Criteria

- [ ] Detecta falhas críticas durante instalação
- [ ] Faz backup antes de mudanças
- [ ] Rollback automático em caso de erro
- [ ] Logs detalhados para debug (.aios-install.log)
- [ ] Mensagens de erro user-friendly
- [ ] Preserva estado anterior em caso de falha

---

## 🔧 Implementation

```javascript
class InstallTransaction {
  constructor() {
    this.backups = [];
    this.changes = [];
  }
  
  async backup(file) {
    const backupPath = `${file}.backup`;
    await fs.copy(file, backupPath);
    this.backups.push({ original: file, backup: backupPath });
  }
  
  async rollback() {
    for (const { original, backup } of this.backups.reverse()) {
      await fs.copy(backup, original);
      await fs.remove(backup);
    }
  }
}
```

---

## 📋 Tasks (5 pts = ~2 dias)

- [ ] 1.9.1: Backup system (3h)
- [ ] 1.9.2: Rollback logic (3h)
- [ ] 1.9.3: Comprehensive logging (2h)
- [ ] 1.9.4: Error messages (2h)
- [ ] 1.9.5: Recovery scenarios testing (5h)

**Total:** 15h

---

## 🔗 Dependencies

- **Depende:** [1.2] Wizard
- **Works with:** All stories (error handling layer)

---

**Criado por:** River 🌊

