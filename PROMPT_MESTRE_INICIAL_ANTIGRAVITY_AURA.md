# PROMPT MESTRE DE INICIALIZAÇÃO --- ANTIGRAVITY / AURA

Você está iniciando o desenvolvimento do:

**AURA --- Plataforma de aprendizagem adaptativa voltada à inclusão de
estudantes com TEA no ensino técnico.**

Existe um arquivo obrigatório chamado:

``` text
SKILL_AURA.md
```

Ele deve estar na raiz do projeto e contém as regras permanentes de
arquitetura, desenvolvimento, UX inclusiva, IA, segurança, privacidade,
biometria, banco de dados, testes e governança.

## ORDEM OBRIGATÓRIA

Antes de escrever qualquer código:

1.  Leia integralmente `SKILL_AURA.md`.
2.  Audite todo o diretório atual.
3.  Identifique a stack existente.
4.  Identifique o que já está funcionando.
5.  Identifique arquivos, componentes, serviços, banco, autenticação e
    integrações.
6.  Se o projeto estiver vazio, registre isso e prepare o scaffold.
7.  Crie `docs/ROADMAP.md`.
8.  Crie `docs/ARCHITECTURE.md`.
9.  Crie `docs/DECISIONS.md`.
10. Crie `docs/PHASE_STATUS.md`.
11. Só então inicie a implementação.

## REGRA FUNDAMENTAL DE EXECUÇÃO

O sistema deve ser construído por fases.

**NÃO construir tudo de uma vez.**

Fluxo:

``` text
Fase 0 — Preparação
↓
Fase 1 — Fundação
↓
Fase 2 — Identidade e autenticação
↓
Fase 3 — Banco
↓
Fase 4 — PIA
↓
Fase 5 — Conteúdo
↓
Fase 6 — Motor de adaptação
↓
Fase 7 — Experiência do estudante
↓
Fase 8 — IA pedagógica
↓
Fase 9 — Dashboard do professor
↓
Fase 10 — Analytics
↓
Fase 11 — Segurança e acessibilidade
↓
Fase 12 — Testes
↓
Fase 13 — Deploy
↓
Fase 14 — Validação final
```

### Regra de continuidade

Quando terminar uma fase:

``` text
IMPLEMENTAR
↓
TESTAR
↓
CORRIGIR
↓
VALIDAR
↓
DOCUMENTAR
↓
ATUALIZAR ROADMAP
↓
INICIAR PRÓXIMA FASE
```

Não pergunte "posso continuar?" entre fases normais.

Só interrompa se existir:

-   bloqueio técnico real;
-   decisão irreversível;
-   ação destrutiva;
-   ausência de informação indispensável.

Se houver bloqueio, explique objetivamente o problema, causa, impacto,
opções e recomendação.

## PRIMEIRO OBJETIVO FUNCIONAL

A primeira fundação do AURA deve preparar:

-   aplicação responsiva;
-   autenticação;
-   estrutura de usuários;
-   base Supabase, se esta for a stack escolhida;
-   arquitetura do PIA;
-   arquitetura do motor de adaptação;
-   suporte a smartphone, tablet e desktop.

## BIOMETRIA

A identificação facial/digital solicitada para mobile e tablet deve ser
implementada como **autenticação biométrica do dispositivo**, quando
suportada.

Fluxo:

``` text
Login
↓
Face ID / impressão digital / biometria do dispositivo
↓
Sistema operacional valida
↓
AURA recebe confirmação
↓
Sessão liberada
```

Não criar banco próprio de rostos ou impressões digitais.

Não usar câmera para diagnosticar TEA, emoção, crise ou capacidade
cognitiva.

Sempre prever fallback seguro.

## PRINCÍPIO PEDAGÓGICO

O AURA não diagnostica.

O AURA cria um:

**Perfil Individual de Aprendizagem --- PIA**

e usa:

``` text
PIA
+
conteúdo
+
atividade
+
desempenho
↓
adaptação
↓
novo desempenho
↓
aprendizado sobre a estratégia
```

A regra é:

> Não adaptar o estudante ao conteúdo. Adaptar a forma de apresentação
> do conteúdo às necessidades de aprendizagem do estudante.

## PRIMEIRO DOMÍNIO

O primeiro domínio será Administração.

Começar com:

-   Fundamentos da Administração;
-   Planejamento;
-   Organização;
-   Direção;
-   Controle;
-   Processos, atividades e tarefas;
-   Gestão de pessoas;
-   Trabalho em equipe.

Não tentar criar todas as disciplinas no MVP.

## IA

Criar a IA como camada isolada.

A IA pode:

-   explicar;
-   reformular;
-   criar exemplos;
-   criar atividades;
-   adaptar extensão;
-   adaptar linguagem;
-   analisar respostas;
-   recomendar revisão.

A IA não pode:

-   diagnosticar;
-   classificar clinicamente;
-   atribuir nível de suporte;
-   inferir emoção pela câmera;
-   interpretar biometria;
-   substituir professor ou profissional de saúde.

## MATRIZ DE ADAPTAÇÃO

Criar:

``` text
/docs/ADAPTATION_MATRIX.md
```

com:

``` text
Característica observada
↓
Impacto na aprendizagem
↓
Hipótese pedagógica
↓
Estratégia
↓
Conteúdo
↓
Atividade
↓
Interface
↓
Regra da IA
↓
Resultado observado
```

Nunca transformar automaticamente uma característica observada em
diagnóstico.

## INTERFACE

Usar a imagem de referência fornecida pelo usuário como direção visual.

A linguagem visual deve usar principalmente:

-   azul;
-   azul claro;
-   ciano suave;
-   fundos muito claros.

A interface deve ser:

-   calma;
-   limpa;
-   previsível;
-   acessível;
-   responsiva;
-   com baixa sobrecarga visual.

Evitar:

-   excesso de animações;
-   cores neon;
-   flashes;
-   excesso de informação;
-   elementos decorativos competindo com a tarefa.

## SEGURANÇA

Nunca:

-   colocar secrets no código;
-   expor API keys;
-   registrar tokens em logs;
-   enviar `.env` ao GitHub;
-   usar biometria como dado pedagógico;
-   enviar dados pessoais desnecessários à IA.

Use RLS quando houver Supabase.

## GIT

Pode organizar o trabalho com commits locais.

**Nunca executar `git push` sem autorização explícita do usuário.**

## REGRA DE CONCLUSÃO

Uma fase só é concluída quando:

-   código funciona;
-   fluxo funciona;
-   tratamento de erros existe;
-   responsividade foi verificada;
-   acessibilidade foi verificada;
-   segurança foi verificada;
-   testes foram executados;
-   documentação foi atualizada.

Não considerar "a tela apareceu" como fase concluída.

## RELATÓRIO DE CADA FASE

Ao concluir cada fase, registrar:

``` text
FASE X — CONCLUÍDA

Objetivo:
...

Implementado:
...

Arquivos criados:
...

Arquivos modificados:
...

Banco:
...

Testes:
...

Resultado:
...

Pendências:
...

Próxima fase:
...
```

Depois disso, **continue automaticamente para a próxima fase**.

# COMANDO DE INÍCIO

Comece agora.

**Primeira ação: faça a auditoria completa do diretório do projeto.**

Não comece criando telas aleatórias.

Primeiro compreenda a estrutura.

Depois construa a fundação.

Depois implemente a autenticação.

Depois o PIA.

Depois o conteúdo.

Depois o motor de adaptação.

Depois a IA.

Depois os dashboards.

Depois os testes.

Depois a validação final.

**Construa o AURA por partes e não pare entre fases normais.**
