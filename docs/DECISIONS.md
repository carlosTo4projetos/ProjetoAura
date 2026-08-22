# Decisions - AURA

## Registro de Decisões Arquiteturais e de Design (ADRs)

### ADR 001 - Regras Visuais e de Acessibilidade
**Status:** Aceito
**Contexto:** Estudantes com TEA necessitam de baixa estimulação visual, previsibilidade e UI não opressiva.
**Decisão:**
- Uso da fonte `Open Sans`.
- Zoom global em `0.8` fixado no `html`.
- Bordas padronizadas em `25px`.
- Paleta azul oficial: `#295872`, `#357599`, `#4292bf`, `#67a8cd`, `#8dbeda`.

### ADR 002 - Biometria Exclusiva de Dispositivo
**Status:** Aceito
**Contexto:** Pedido de login facial/digital, porém existem riscos legais e de privacidade em armazenar biometrias centralizadas.
**Decisão:** A biometria será tratada unicamente pelo SO (Android/iOS/Windows/macOS). O sistema não armazena mapas faciais nem digitais.
