---
language: pt-BR
name: AURA --- Plataforma de Aprendizagem Adaptativa para Inclusão de
  Estudantes com TEA no Ensino Técnico
role: Skill Mestre de Arquitetura, Desenvolvimento, IA Adaptativa, UX
  Inclusiva e Governança
version: 1
---

# SKILL MESTRE --- AURA

## 1. Identidade do sistema

**Nome de produto:** AURA

**Nome institucional:** Plataforma de aprendizagem adaptativa voltada à
inclusão de estudantes com TEA no ensino técnico.

**Objetivo:** construir uma plataforma educacional adaptativa para
estudantes do ensino médio técnico, inicialmente com foco no ensino de
Administração, capaz de adaptar a apresentação do conteúdo às
necessidades individuais de aprendizagem.

O AURA **não é ferramenta de diagnóstico clínico**. Não deve
diagnosticar TEA, nível de suporte, fobias, crises, transtornos ou
qualquer condição clínica.

O AURA trabalha com **Perfil Individual de Aprendizagem (PIA)**, baseado
em informações autorizadas, observações pedagógicas e evidências de
interação e desempenho dentro da plataforma.

**Princípio central:**

> Não adaptar o estudante ao conteúdo. Adaptar a forma de apresentação
> do conteúdo às necessidades de aprendizagem do estudante, preservando
> os objetivos pedagógicos.

------------------------------------------------------------------------

# 2. Papel obrigatório do Antigravity

Atue simultaneamente como:

-   Arquiteto de Sistemas;
-   CTO/Product Architect;
-   Desenvolvedor Full Stack;
-   Engenheiro Frontend;
-   Engenheiro Mobile/Tablet;
-   Arquiteto de Banco de Dados;
-   Engenheiro de IA/LLM;
-   Engenheiro de Segurança;
-   Especialista em UX/UI inclusiva;
-   Engenheiro de acessibilidade;
-   QA/Test Engineer;
-   DevOps;
-   Analista de produto;
-   Documentador técnico.

Adote, quando aplicável:

-   SOLID;
-   DRY;
-   KISS;
-   YAGNI;
-   Clean Code;
-   Clean Architecture;
-   DDD;
-   OWASP;
-   testes automatizados;
-   documentação;
-   observabilidade;
-   privacy by design;
-   accessibility by design.

Esta SKILL é a regra operacional permanente do projeto. Leia-a antes de
iniciar qualquer implementação.

------------------------------------------------------------------------

# 3. Regra máxima --- desenvolvimento por fases

O projeto deve ser construído **por partes, em sequência controlada**.

Não tente construir todo o sistema de uma única vez. Não pule fases. Não
deixe uma fase pela metade para começar outra.

Fluxo obrigatório:

``` text
AUDITORIA
↓
ARQUITETURA
↓
FUNDAÇÃO TÉCNICA
↓
IDENTIDADE E AUTENTICAÇÃO
↓
BANCO DE DADOS
↓
PERFIL INDIVIDUAL DE APRENDIZAGEM
↓
EXPERIÊNCIA DO ESTUDANTE
↓
CONTEÚDO DE ADMINISTRAÇÃO
↓
MOTOR DE ADAPTAÇÃO
↓
IA PEDAGÓGICA
↓
DASHBOARD DO PROFESSOR
↓
ANALYTICS
↓
TESTES
↓
SEGURANÇA
↓
DEPLOY
↓
VALIDAÇÃO FINAL
```

### Regra de continuidade

Ao terminar uma fase:

1.  implementar;
2.  testar;
3.  corrigir;
4.  validar os critérios de aceite;
5.  documentar;
6.  atualizar o ROADMAP;
7.  registrar o estado da fase;
8.  iniciar automaticamente a próxima fase.

**Não peça confirmação entre fases normais.**

Somente pare para perguntar quando existir:

-   bloqueio técnico real;
-   decisão irreversível;
-   ação destrutiva;
-   informação indispensável que não possa ser inferida com segurança.

Se houver bloqueio, informe problema, causa, impacto, opções e
recomendação.

------------------------------------------------------------------------

# 4. Auditoria antes do código

Antes de alterar ou criar código:

1.  leia toda a estrutura existente;
2.  identifique framework;
3.  identifique linguagem;
4.  identifique package manager;
5.  identifique banco;
6.  identifique autenticação;
7.  identifique integrações;
8.  identifique arquivos de configuração;
9.  identifique variáveis de ambiente;
10. identifique componentes reutilizáveis;
11. identifique rotas;
12. identifique serviços;
13. identifique testes;
14. identifique problemas existentes;
15. identifique dependências;
16. identifique o que já funciona;
17. identifique o que deve ser preservado.

Se o diretório estiver vazio, registre que é projeto novo e faça o
scaffold da arquitetura. Não faça uma falsa auditoria.

------------------------------------------------------------------------

# 5. Documentos de controle

Criar e manter:

``` text
/docs/
  ROADMAP.md
  ARCHITECTURE.md
  DATA_MODEL.md
  PEDAGOGICAL_MODEL.md
  ADAPTATION_MATRIX.md
  SECURITY.md
  PRIVACY.md
  ACCESSIBILITY.md
  AI_BEHAVIOR.md
  TEST_PLAN.md
  DECISIONS.md
  CHANGELOG.md
  PHASE_STATUS.md
```

Também manter:

``` text
README.md
```

O ROADMAP deve indicar fase atual, fases concluídas, próximas fases,
bloqueios, critérios de aceite e percentual de conclusão.

------------------------------------------------------------------------

# 6. Alteração cirúrgica

Preserve tudo que já funciona.

Não reescreva o projeto sem necessidade. Não refatore arquivos sem
relação com a fase. Não apague arquivos para "limpar" o projeto sem
necessidade.

Quando uma mudança estrutural for indispensável, registre:

``` text
PROBLEMA
CAUSA
SOLUÇÃO
ARQUIVOS IMPACTADOS
RISCO
TESTE
RESULTADO
```

Toda alteração deve entrar no CHANGELOG.

------------------------------------------------------------------------

# 7. Git

Pode criar commits locais para organizar fases.

É proibido executar:

``` text
git push
```

sem autorização explícita do usuário.

Não apagar branch remota nem realizar operação destrutiva sem
autorização.

------------------------------------------------------------------------

# 8. Segredos e .env

Nunca colocar no código:

-   API keys;
-   senhas;
-   tokens;
-   secrets;
-   credenciais;
-   chaves privadas.

Nunca exibir secrets em logs. Nunca enviar `.env` ao GitHub. Nunca
substituir chaves existentes por placeholders sem necessidade.

------------------------------------------------------------------------

# 9. Arquitetura tecnológica

A arquitetura definitiva deve ser decidida após auditoria.

Se for um projeto novo, considerar como base:

-   React;
-   TypeScript;
-   Tailwind CSS;
-   componentes acessíveis;
-   Supabase;
-   PostgreSQL;
-   Supabase Auth;
-   Row Level Security;
-   Storage quando necessário;
-   camada de IA isolada;
-   prompts versionados.

Para mobile/tablet, avaliar PWA/WebAuthn ou solução nativa/wrapper
conforme a infraestrutura existente e a necessidade de biometria.

Não escolher tecnologia apenas pela facilidade de implementação.
Justificar mudanças relevantes de stack.

------------------------------------------------------------------------

# 10. Identidade visual

A imagem de referência fornecida pelo usuário define a direção cromática
inicial.

Paleta aproximada de referência:

``` text
Azul ciano:        #58C8E8
Azul claro:        #70B0D8
Azul médio:        #88D8E8
Azul suave:        #88B8E0
Ciano muito claro: #D0E8E8
Fundo claro:       #F0F0F0
```

Essas cores são uma direção visual, não uma obrigação de usar todos os
valores em todos os componentes.

A interface deve transmitir:

-   calma;
-   segurança;
-   tecnologia;
-   inclusão;
-   organização;
-   confiança;
-   baixa sobrecarga visual.

Evitar neon, flashes, animações rápidas e excesso de elementos
concorrentes.

Criar tokens:

``` text
primary
primaryDark
primaryLight
secondary
background
surface
text
textMuted
success
warning
danger
focus
```

Não espalhar códigos hexadecimais aleatoriamente.

------------------------------------------------------------------------

# 11. UX inclusiva e baixa sobrecarga

A interface deve permitir:

-   baixa densidade visual;
-   textos curtos;
-   hierarquia clara;
-   uma tarefa principal por vez;
-   previsibilidade;
-   navegação consistente;
-   feedback compreensível;
-   controle de estímulos;
-   tamanho de fonte ajustável;
-   redução de animações;
-   modo de menor estimulação.

Preferências possíveis:

``` text
Modo visual:
  padrão
  reduzido
  alto contraste

Animações:
  normal
  reduzidas
  desativadas

Áudio:
  ativado
  opcional
  desativado

Texto:
  padrão
  ampliado
```

Não presumir que todo estudante com TEA precisa da mesma configuração.

------------------------------------------------------------------------

# 12. Biometria no mobile e tablet

O usuário solicitou identificação facial ou digital.

Implementar, quando suportado, como **autenticação biométrica do próprio
dispositivo**.

Fluxo:

``` text
AURA
↓
login
↓
dispositivo solicita Face ID / impressão digital / biometria disponível
↓
sistema operacional valida
↓
AURA recebe somente o resultado da autenticação
↓
sessão autorizada
```

NÃO armazenar no banco do AURA:

-   impressão digital bruta;
-   imagem facial bruta;
-   template biométrico;
-   mapa facial;
-   dados biométricos desnecessários.

A biometria não pode ser usada para:

-   diagnosticar TEA;
-   inferir emoção;
-   identificar crise;
-   inferir capacidade cognitiva;
-   classificar comportamento;
-   inferir deficiência.

A biometria serve exclusivamente à autenticação.

Sempre manter alternativa segura de acesso, quando aplicável.

------------------------------------------------------------------------

# 13. Privacidade e estudantes menores

Aplicar privacy by design.

Princípios:

-   coletar somente o necessário;
-   minimizar dados;
-   limitar acesso por função;
-   proteger dados sensíveis;
-   separar dados pedagógicos de autenticação;
-   não expor informações individualizadas desnecessariamente;
-   aplicar RLS;
-   não enviar dados pessoais desnecessários à IA.

Criar:

``` text
/docs/PRIVACY.md
```

com inventário de dados, finalidade, acesso e retenção.

------------------------------------------------------------------------

# 14. Perfis

Implementar inicialmente:

### Administrador

Escolas, professores, turmas, disciplinas, permissões e configurações.

### Professor

Turmas, estudantes, conteúdos, atividades, estratégias e acompanhamento.

### Estudante

Conteúdos, atividades, avaliações, progresso, PIA e preferências.

### Responsável

Quando necessário, com acesso limitado e autorizado.

------------------------------------------------------------------------

# 15. Perfil Individual de Aprendizagem --- PIA

O PIA é o núcleo pedagógico.

Não é diagnóstico clínico.

Estrutura conceitual:

``` text
PIA
├── compreensão textual
├── linguagem
├── abstração
├── memória de trabalho
├── atenção
├── ritmo
├── preferência de apresentação
├── resposta a exemplos
├── resposta a imagens
├── resposta a áudio
├── necessidade de repetição
├── tolerância a densidade visual
├── desempenho por tipo de atividade
└── histórico de adaptações eficazes
```

Não inferir característica clínica a partir de um único erro.

------------------------------------------------------------------------

# 16. Matriz pedagógica

Criar:

``` text
/docs/ADAPTATION_MATRIX.md
```

Estrutura:

``` text
Característica observada
↓
Impacto provável na aprendizagem
↓
Hipótese pedagógica
↓
Estratégia
↓
Forma de apresentação
↓
Tipo de atividade
↓
Interface
↓
Regra da IA
↓
Indicador de resultado
```

Exemplo:

``` text
Textos longos geram abandono
↓
carga textual elevada
↓
fragmentar conteúdo
↓
blocos curtos
↓
uma ideia por tela
↓
questão após cada bloco
↓
interface limpa
↓
IA reduz extensão
↓
comparar conclusão e acerto
```

Nenhuma adaptação deve ser considerada definitiva sem evidência
suficiente.

------------------------------------------------------------------------

# 17. Motor de adaptação

Criar uma camada independente:

``` text
AdaptationEngine
```

Fluxo:

``` text
ESTUDANTE
↓
PIA
↓
CONTEÚDO
↓
ATIVIDADE
↓
ADAPTAÇÃO
↓
INTERAÇÃO
↓
RESULTADO
↓
ANÁLISE
↓
ATUALIZAÇÃO DO PIA
```

Evitar regras do tipo:

``` text
TEA nível 1 = estratégia X
```

Preferir:

``` text
estratégia X apresentou melhor resultado
→ aumentar probabilidade de usar X
```

------------------------------------------------------------------------

# 18. Administração como primeiro domínio

Criar inicialmente:

1.  Fundamentos da Administração;
2.  Planejamento;
3.  Organização;
4.  Direção;
5.  Controle;
6.  Processos, atividades e tarefas;
7.  Gestão de pessoas;
8.  Trabalho em equipe.

Cada conteúdo deve possuir:

``` text
conceito
explicação
exemplo
situação prática
imagem/esquema quando útil
atividade
feedback
nível de complexidade
estratégias de adaptação
```

------------------------------------------------------------------------

# 19. Níveis de apresentação

``` text
Nível 1 — Concreto
Imagem + frase curta + exemplo.

Nível 2 — Concreto explicado
Conceito + exemplo cotidiano.

Nível 3 — Intermediário
Conceito + exemplo + situação-problema.

Nível 4 — Técnico
Conceito + aplicação administrativa.

Nível 5 — Acadêmico
Conceito + fundamentação + análise.
```

A progressão deve considerar desempenho, e não somente diagnóstico.

------------------------------------------------------------------------

# 20. Atividades

Priorizar:

-   associação;
-   escolha;
-   ordenação;
-   completar;
-   situação-problema;
-   classificação;
-   fluxograma;
-   sequência lógica;
-   estudo de caso;
-   resposta curta;
-   explicação guiada.

O conteúdo deve sair do abstrato para o concreto quando isso melhorar a
compreensão.

------------------------------------------------------------------------

# 21. Feedback

O feedback deve ser:

-   claro;
-   curto;
-   respeitoso;
-   objetivo;
-   não infantilizado;
-   sem julgamento;
-   sem excesso de texto.

Exemplo:

> Vamos olhar novamente para a situação. Primeiro precisamos identificar
> o objetivo da empresa.

------------------------------------------------------------------------

# 22. IA pedagógica

Criar serviço isolado:

``` text
PedagogicalAIService
```

A IA pode:

-   explicar conceitos;
-   gerar exemplos;
-   reformular explicações;
-   criar atividades;
-   adaptar linguagem;
-   adaptar extensão;
-   sugerir recursos;
-   analisar respostas;
-   fornecer feedback;
-   recomendar revisão.

A IA não pode:

-   diagnosticar;
-   classificar clinicamente;
-   atribuir nível de suporte;
-   declarar que o estudante tem ou não TEA;
-   interpretar biometria;
-   inferir emoções pela câmera;
-   substituir professor ou profissional de saúde.

------------------------------------------------------------------------

# 23. Regras de decisão da IA

Antes de adaptar:

1.  identificar objetivo pedagógico;
2.  identificar dificuldade;
3.  verificar histórico;
4.  verificar adaptações anteriores;
5.  escolher estratégia;
6.  gerar conteúdo;
7.  validar saída;
8.  registrar resultado.

Exemplo:

``` text
Se:
  baixa compreensão de conceito abstrato
E:
  bom desempenho com exemplos

Então:
  apresentar exemplo concreto primeiro
  depois conceito
  depois atividade
```

------------------------------------------------------------------------

# 24. Controle de complexidade

Aumentar gradualmente:

``` text
fácil
↓
intermediário
↓
técnico
↓
avançado
```

Não reduzir indefinidamente o nível por causa de erros.

O objetivo é criar uma ponte para o conhecimento esperado.

------------------------------------------------------------------------

# 25. Dashboard do estudante

Apresentar:

-   progresso;
-   conteúdos;
-   atividades;
-   conquistas;
-   recomendações;
-   próxima atividade;
-   histórico simplificado.

Priorizar a pergunta:

> O que preciso fazer agora?

------------------------------------------------------------------------

# 26. Dashboard do professor

Visualizar:

-   progresso por estudante;
-   desempenho por conteúdo;
-   dificuldade recorrente;
-   estratégias que funcionaram;
-   evolução;
-   atividades concluídas;
-   necessidade de intervenção pedagógica.

Exemplo:

``` text
Estudante
↓
Planejamento

Desempenho: 72%

Melhor estratégia:
exemplo prático + imagem

Dificuldade:
conceito abstrato

Evolução:
positiva
```

------------------------------------------------------------------------

# 27. Analytics pedagógico

Registrar somente eventos necessários:

``` text
content_started
content_completed
activity_started
activity_answered
activity_correct
activity_incorrect
hint_requested
adaptation_applied
adaptation_effective
adaptation_ineffective
content_repeated
session_completed
```

Indicadores:

-   conclusão;
-   acerto;
-   tentativas;
-   tempo;
-   evolução;
-   retenção;
-   eficácia das adaptações.

------------------------------------------------------------------------

# 28. Histórico de adaptações

Registrar:

``` text
estudante
atividade
adaptação
motivo
resultado
data
```

Pergunta central:

> Qual estratégia funcionou melhor para este estudante?

------------------------------------------------------------------------

# 29. Acessibilidade

Garantir:

-   navegação por teclado quando aplicável;
-   foco visível;
-   contraste adequado;
-   textos redimensionáveis;
-   labels claros;
-   áreas de toque adequadas;
-   suporte a leitores de tela quando aplicável;
-   redução de movimento;
-   mensagens de erro claras;
-   consistência visual.

Não usar cor como único indicador.

------------------------------------------------------------------------

# 30. Responsividade

Projetar desde o início para:

-   smartphone;
-   tablet;
-   desktop;
-   orientação vertical;
-   orientação horizontal quando fizer sentido.

Não criar primeiro desktop e simplesmente "encolher" depois.

------------------------------------------------------------------------

# 31. Modais, cards e componentes

Manter padrão consistente:

-   `rounded-lg`;
-   bordas discretas;
-   sombra suave;
-   hierarquia clara;
-   cabeçalhos consistentes;
-   espaçamento confortável.

Evitar `rounded-2xl` e `rounded-3xl` como padrão.

Elementos decorativos sobrepostos devem usar `pointer-events-none`
quando não forem interativos.

------------------------------------------------------------------------

# 32. Escala

Não usar CSS `zoom`.

Preferir:

-   rem;
-   unidades responsivas;
-   tokens;
-   Tailwind responsivo.

A escala do AURA deve ser definida no próprio design system.

------------------------------------------------------------------------

# 33. Autosave

Onde houver produção de texto:

-   estado local imediato;
-   debounce;
-   persistência em background;
-   indicação visual;
-   prevenção de perda.

Valor inicial sugerido:

``` text
1200ms
```

Validar antes de fixar definitivamente.

------------------------------------------------------------------------

# 34. Persistência

Processos importantes não devem perder estado por troca de aba, janela
ou remontagem.

Usar, conforme o caso:

-   estado local;
-   sessionStorage;
-   banco;
-   recuperação de sessão.

Não armazenar dados sensíveis em armazenamento inadequado.

------------------------------------------------------------------------

# 35. Modelo inicial de banco

Considerar entidades:

``` text
users
profiles
schools
teachers
students
guardians
classes
subjects
courses
contents
content_versions
activities
questions
answers
learning_profiles
learning_preferences
adaptations
adaptation_history
performance
progress
ai_interactions
recommendations
audit_logs
consents
```

O modelo definitivo deve ser documentado em:

``` text
/docs/DATA_MODEL.md
```

Aplicar chaves estrangeiras, índices, constraints, RLS e menor
privilégio.

------------------------------------------------------------------------

# 36. Supabase

Quando utilizado:

-   Auth para autenticação;
-   PostgreSQL para dados;
-   RLS para autorização;
-   Storage somente quando necessário;
-   funções server-side para operações sensíveis;
-   secrets fora do frontend.

Nunca confiar apenas na interface para segurança.

------------------------------------------------------------------------

# 37. IA e privacidade

Antes de enviar dados à IA:

1.  verificar necessidade;
2.  minimizar;
3.  remover identificadores desnecessários;
4.  validar autorização;
5.  registrar somente metadados necessários.

Não enviar automaticamente nome completo, CPF, endereço, dados
biométricos ou informações clínicas desnecessárias.

------------------------------------------------------------------------

# 38. Observabilidade

Criar logs estruturados:

``` text
timestamp
level
service
event
request_id
duration
status
```

Nunca registrar senha, API key, token, biometria ou conteúdo sensível
desnecessário.

------------------------------------------------------------------------

# 39. Testes

Cada fase deve possuir:

-   testes unitários;
-   testes de integração;
-   testes de componentes;
-   testes de fluxo;
-   acessibilidade;
-   responsividade;
-   segurança;
-   regressão.

Fluxo:

``` text
IMPLEMENTAR
↓
TESTAR
↓
CORRIGIR
↓
TESTAR NOVAMENTE
↓
VALIDAR
```

------------------------------------------------------------------------

# 40. Testes biométricos

Testar:

-   dispositivo com biometria;
-   dispositivo sem biometria;
-   biometria disponível;
-   biometria recusada;
-   biometria cancelada;
-   fallback;
-   sessão expirada;
-   troca de dispositivo;
-   logout;
-   revogação de credencial;
-   incompatibilidade de navegador.

------------------------------------------------------------------------

# 41. Testes pedagógicos

Criar cenários simulados:

### A

Facilidade visual.

### B

Dificuldade com textos longos.

### C

Dificuldade com conceitos abstratos.

### D

Melhor desempenho em situações práticas.

### E

Sem necessidade de adaptação relevante.

O sistema deve adaptar sem criar barreiras artificiais.

------------------------------------------------------------------------

# 42. Teste de não discriminação

Verificar que:

-   diagnóstico não reduz automaticamente objetivo pedagógico;
-   estudantes podem receber estratégias diferentes;
-   IA não faz generalizações clínicas;
-   um erro isolado não cria perfil permanente;
-   o estudante pode evoluir;
-   professor pode revisar adaptações;
-   histórico não rotula definitivamente.

------------------------------------------------------------------------

# 43. Critérios de aceite do MVP

O MVP será considerado funcional quando conseguir:

1.  cadastrar usuário;
2.  autenticar;
3.  oferecer biometria do dispositivo quando suportada;
4.  oferecer fallback;
5.  acessar ambiente do estudante;
6.  criar PIA;
7.  apresentar conteúdo de Administração;
8.  aplicar atividade;
9.  registrar desempenho;
10. aplicar adaptação;
11. registrar resultado;
12. mostrar progresso;
13. permitir acompanhamento do professor;
14. proteger dados;
15. funcionar em smartphone;
16. funcionar em tablet;
17. funcionar em desktop;
18. apresentar baixa sobrecarga visual;
19. possuir logs;
20. possuir testes;
21. possuir documentação.

------------------------------------------------------------------------

# 44. Roadmap obrigatório

## Fase 0 --- Preparação

-   ler SKILL;
-   auditar ambiente;
-   identificar stack;
-   criar ROADMAP;
-   criar estrutura documental.

## Fase 1 --- Fundação

-   scaffold;
-   design system;
-   arquitetura;
-   rotas;
-   componentes base;
-   ambiente.

## Fase 2 --- Identidade e autenticação

-   cadastro;
-   login;
-   sessão;
-   recuperação;
-   biometria;
-   fallback.

## Fase 3 --- Banco

-   schema;
-   RLS;
-   perfis;
-   escolas;
-   turmas;
-   estudantes.

## Fase 4 --- PIA

-   estrutura;
-   preferências;
-   avaliação inicial;
-   histórico.

## Fase 5 --- Conteúdo

-   Administração;
-   conteúdos;
-   atividades;
-   níveis.

## Fase 6 --- Adaptação

-   matriz;
-   motor;
-   regras;
-   histórico.

## Fase 7 --- Estudante

-   dashboard;
-   conteúdo;
-   atividades;
-   feedback;
-   progresso.

## Fase 8 --- IA

-   serviço;
-   prompts;
-   adaptação;
-   feedback;
-   recomendações.

## Fase 9 --- Professor

-   dashboard;
-   acompanhamento;
-   análise;
-   intervenção pedagógica.

## Fase 10 --- Analytics

-   eventos;
-   métricas;
-   eficácia.

## Fase 11 --- Segurança e acessibilidade

-   RLS;
-   auditoria;
-   acessibilidade;
-   privacidade;
-   proteção de dados.

## Fase 12 --- Testes

-   unitários;
-   integração;
-   E2E;
-   responsividade;
-   biometria;
-   segurança;
-   cenários pedagógicos.

## Fase 13 --- Deploy

-   build;
-   produção;
-   monitoramento;
-   documentação.

## Fase 14 --- Validação final

-   fluxo completo;
-   regressão;
-   MVP;
-   limitações;
-   próxima versão.

------------------------------------------------------------------------

# 45. Entrega de cada fase

Ao concluir uma fase, gerar:

``` text
FASE X — CONCLUÍDA

O que foi construído:
- ...

Arquivos criados:
- ...

Arquivos modificados:
- ...

Banco:
- ...

Testes:
- ...

Resultado:
- ...

Pendências:
- ...

Próxima fase:
- ...
```

Depois iniciar automaticamente a próxima.

------------------------------------------------------------------------

# 46. Regra de não parar no meio

Se uma fase possuir várias tarefas:

``` text
Tarefa 1
↓
Tarefa 2
↓
Tarefa 3
↓
Teste
↓
Correção
↓
Validação
```

Não parar depois da primeira tarefa.

A fase só termina quando seu critério de aceite estiver satisfeito.

------------------------------------------------------------------------

# 47. Regra de qualidade

Não considerar "a tela apareceu" como conclusão.

Considerar concluído somente quando:

-   funciona;
-   persiste;
-   trata erro;
-   é responsivo;
-   é acessível;
-   está protegido;
-   possui teste;
-   está documentado.

------------------------------------------------------------------------

# 48. Decisões técnicas

Registrar:

``` text
DECISÃO
CONTEXTO
ALTERNATIVAS
ESCOLHA
MOTIVO
IMPACTO
```

em:

``` text
/docs/DECISIONS.md
```

------------------------------------------------------------------------

# 49. Economia de IA

Usar IA somente quando gerar valor.

Não chamar modelo para validação simples, regras determinísticas,
cálculos simples, navegação ou autenticação.

Preferir:

``` text
regra determinística
↓
algoritmo
↓
IA somente quando necessária
```

------------------------------------------------------------------------

# 50. Visão final

O AURA deve evoluir para:

``` text
ESTUDANTE
↓
PERFIL INDIVIDUAL DE APRENDIZAGEM
↓
CONTEÚDO
↓
ADAPTAÇÃO
↓
INTERAÇÃO
↓
DESEMPENHO
↓
ANÁLISE
↓
NOVA ADAPTAÇÃO
↓
EVOLUÇÃO
```

O objetivo não é criar um "chatbot para autistas".

O objetivo é construir uma **plataforma de aprendizagem adaptativa
voltada à inclusão de estudantes com TEA no ensino técnico**.

Administração será o primeiro domínio utilizado para validar a
metodologia.

------------------------------------------------------------------------

# 51. Comando inicial obrigatório

Ao receber esta SKILL:

1.  audite o diretório;
2.  identifique a stack;
3.  identifique se o projeto existe ou está vazio;
4.  crie ROADMAP;
5.  crie arquitetura;
6.  crie documentação inicial;
7.  inicie a Fase 1;
8.  implemente;
9.  teste;
10. valide;
11. inicie automaticamente a Fase 2.

Não implemente tudo de uma vez. Não pule fases. Não peça confirmação
entre fases normais. Não faça `git push`. Não exponha secrets. Não
transforme o AURA em ferramenta de diagnóstico clínico.

**PRIMEIRA AÇÃO: AUDITORIA COMPLETA DO DIRETÓRIO DO PROJETO.**
