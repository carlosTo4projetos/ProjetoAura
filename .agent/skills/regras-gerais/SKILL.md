---
name: projeto-aura-regras
description: Regras gerais do sistema Projeto Aura, design, acessibilidade e comunicação.
---

# Regras Gerais de Atuação - Projeto Aura

Sempre que interagir ou modificar o código neste projeto, siga estritamente as regras abaixo:

## 1. Comunicação e Modificação
- **Sempre responda em Português:** Toda a comunicação, explicações e respostas devem ser feitas exclusivamente em português.
- **Modificações Cirúrgicas:** Faça **somente o solicitado** e seja extremamente cirúrgico e pontual.
- **Não** modifique arquivos aleatoriamente.
- **Não** deforme layouts ou crie novos layouts do zero sem solicitação ou permissão.
- **AURA:** Mantenha o nome do projeto no title do browser sempre como "AURA".

## 2. Padrões de Layout (Zoom e Acessibilidade)
- **Zoom Global:** Utilize sempre a escala global de 80% do ProjectMind (base de fonte 12.8px com a propriedade `zoom: 0.8;` na tag `html`).
- **Design TEA (Espectro Autista níveis 1 e 2):** O design deve possuir baixa estimulação visual, alta previsibilidade, interface limpa, sem excesso de elementos e layout centralizado.
- **Cantos Arredondados:** `25px`.
- **Fonte Padrão Mínima:** `Open Sans`.

## 3. Paleta de Cores (Nova Paleta Azul Oficial)
- **REGRA ABSOLUTA:** Todo e qualquer trabalho de cores deve utilizar as cores desta paleta.
- `#295872` (Azul Mais Escuro - Textos, Destaques Fortes e Acentos)
- `#357599` (Azul Escuro - Hover de botões)
- `#4292bf` (Azul Médio - Botões principais e Ações)
- `#67a8cd` (Azul Claro - Feedbacks e detalhes visuais)
- `#8dbeda` (Azul Mais Claro - Tonalidade mais leve para fundos em gradientes)

## 4. Estrutura do Escopo do Projeto Aura
- **Login Facial:** Câmera ativada automaticamente, sem uso de botão final a longo prazo. (Atualmente pendente, não usar botão genérico).
- **Portal do Professor:** Cadastro de alunos, disciplinas e módulos de aula. Análise de relatórios de desempenho e métricas captadas pela IA.
- **Ambiente do Aluno:** Dashboard com disciplinas, sistema modular em blocos e interface acessível com controle de TTS/Volume.
- **Atividades e IA:** Feedbacks imediatos em quizzes. IA agindo como analisadora de pontos de atenção, dificuldades e sugerindo reforços aos alunos. Base relacional robusta (Supabase / Postgres).
