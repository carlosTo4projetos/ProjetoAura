-- =============================================
-- AURA - Migration 004: Módulos e Atividades de Administração
-- Seed de conteúdo pedagógico inicial
-- Aplicar APÓS as migrations anteriores
-- =============================================

-- =============================================
-- MÓDULOS: Fundamentos da Administração
-- =============================================
DO $$
DECLARE
  v_subject_id uuid;
BEGIN
  -- Fundamentos da Administração
  SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Fundamentos da Administração' LIMIT 1;
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.modules (subject_id, title, description, order_index, complexity_level) VALUES
      (v_subject_id, 'O que é Administração?', 'Conceito e importância da Administração no dia a dia e nas organizações.', 1, 1),
      (v_subject_id, 'História da Administração', 'Evolução do pensamento administrativo ao longo do tempo.', 2, 2),
      (v_subject_id, 'Funções do Administrador', 'Planejar, organizar, dirigir e controlar: as quatro funções básicas.', 3, 2),
      (v_subject_id, 'Tipos de Organizações', 'Empresas públicas, privadas, ONGs e suas diferenças.', 4, 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- Planejamento
  SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Planejamento' LIMIT 1;
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.modules (subject_id, title, description, order_index, complexity_level) VALUES
      (v_subject_id, 'O que é Planejar?', 'Conceito de planejamento e sua importância para alcançar objetivos.', 1, 1),
      (v_subject_id, 'Tipos de Planejamento', 'Estratégico, tático e operacional: diferenças e aplicações.', 2, 2),
      (v_subject_id, 'Definindo Objetivos', 'Como criar metas claras e alcançáveis para uma organização.', 3, 2),
      (v_subject_id, 'Plano de Ação', 'Montando um plano passo a passo para realizar um objetivo.', 4, 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- Organização
  SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Organização' LIMIT 1;
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.modules (subject_id, title, description, order_index, complexity_level) VALUES
      (v_subject_id, 'Estrutura Organizacional', 'Como as empresas se organizam internamente: setores e departamentos.', 1, 1),
      (v_subject_id, 'Organograma', 'Representação visual da estrutura de uma organização.', 2, 2),
      (v_subject_id, 'Divisão do Trabalho', 'Como dividir tarefas de forma eficiente entre as pessoas.', 3, 2)
    ON CONFLICT DO NOTHING;
  END IF;

  -- Direção
  SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Direção' LIMIT 1;
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.modules (subject_id, title, description, order_index, complexity_level) VALUES
      (v_subject_id, 'O que é Liderar?', 'Conceito de liderança e diferença entre líder e chefe.', 1, 1),
      (v_subject_id, 'Comunicação nas Organizações', 'Como a comunicação impacta o funcionamento de uma equipe.', 2, 2),
      (v_subject_id, 'Motivação no Trabalho', 'O que motiva as pessoas e como isso afeta o desempenho.', 3, 2)
    ON CONFLICT DO NOTHING;
  END IF;

  -- Controle
  SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Controle' LIMIT 1;
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.modules (subject_id, title, description, order_index, complexity_level) VALUES
      (v_subject_id, 'O que é Controlar?', 'Conceito de controle e sua função na administração.', 1, 1),
      (v_subject_id, 'Indicadores de Desempenho', 'Como medir se uma organização está atingindo seus objetivos.', 2, 2),
      (v_subject_id, 'Feedback e Correção', 'Usando informações de controle para melhorar processos.', 3, 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- Processos e Tarefas
  SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Processos e Tarefas' LIMIT 1;
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.modules (subject_id, title, description, order_index, complexity_level) VALUES
      (v_subject_id, 'Processos no Dia a Dia', 'Identificando processos em situações cotidianas.', 1, 1),
      (v_subject_id, 'Mapeamento de Processos', 'Como desenhar um fluxo de processo simples.', 2, 2),
      (v_subject_id, 'Melhoria Contínua', 'Como identificar e corrigir problemas em processos.', 3, 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- Gestão de Pessoas
  SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Gestão de Pessoas' LIMIT 1;
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.modules (subject_id, title, description, order_index, complexity_level) VALUES
      (v_subject_id, 'Pessoas nas Organizações', 'A importância das pessoas para o sucesso de qualquer empresa.', 1, 1),
      (v_subject_id, 'Recrutamento e Seleção', 'Como as empresas encontram e escolhem seus colaboradores.', 2, 2),
      (v_subject_id, 'Desenvolvimento de Equipes', 'Treinamento, capacitação e crescimento profissional.', 3, 3)
    ON CONFLICT DO NOTHING;
  END IF;

  -- Trabalho em Equipe
  SELECT id INTO v_subject_id FROM public.subjects WHERE name = 'Trabalho em Equipe' LIMIT 1;
  IF v_subject_id IS NOT NULL THEN
    INSERT INTO public.modules (subject_id, title, description, order_index, complexity_level) VALUES
      (v_subject_id, 'O que é Trabalhar em Equipe?', 'Diferença entre grupo e equipe. Por que equipes funcionam melhor.', 1, 1),
      (v_subject_id, 'Papéis em uma Equipe', 'Cada pessoa tem um papel. Identificando o seu.', 2, 2),
      (v_subject_id, 'Conflitos e Soluções', 'Como lidar com divergências dentro de uma equipe.', 3, 3)
    ON CONFLICT DO NOTHING;
  END IF;
END $$;

-- =============================================
-- ATIVIDADES de exemplo: Fundamentos da Administração
-- =============================================
DO $$
DECLARE
  v_module_id uuid;
BEGIN
  -- Atividade para "O que é Administração?"
  SELECT id INTO v_module_id FROM public.modules WHERE title = 'O que é Administração?' LIMIT 1;
  IF v_module_id IS NOT NULL THEN
    INSERT INTO public.activities (module_id, title, type, content, feedback_correct, feedback_incorrect, complexity_level, order_index) VALUES
      (v_module_id, 'Conceito de Administração', 'escolha',
       '{"pergunta": "Administrar significa:", "opcoes": ["Apenas dar ordens para funcionários", "Planejar, organizar, dirigir e controlar recursos para alcançar objetivos", "Somente cuidar do dinheiro de uma empresa", "Trabalhar sozinho em todas as tarefas"], "resposta_correta": 1}'::jsonb,
       'Isso mesmo! Administrar envolve planejar, organizar, dirigir e controlar os recursos para atingir os objetivos da organização.',
       'Vamos pensar novamente. Administrar vai além de uma única atividade. Envolve quatro funções principais que trabalham juntas.',
       1, 1),

      (v_module_id, 'Administração no dia a dia', 'associacao',
       '{"pergunta": "Conecte cada situação à função administrativa correspondente:", "pares": [{"item": "Decidir as metas do mês", "par": "Planejamento"}, {"item": "Distribuir tarefas entre a equipe", "par": "Organização"}, {"item": "Motivar os funcionários", "par": "Direção"}, {"item": "Verificar se as metas foram atingidas", "par": "Controle"}]}'::jsonb,
       'Excelente! Você identificou corretamente como as funções administrativas aparecem no dia a dia.',
       'Vamos olhar cada situação com calma. Pense: essa ação está planejando algo? Organizando? Dirigindo pessoas? Ou verificando resultados?',
       2, 2),

      (v_module_id, 'Por que administrar?', 'escolha',
       '{"pergunta": "Uma padaria que não faz controle do estoque pode ter qual problema?", "opcoes": ["Vai vender mais pães", "Pode faltar ingredientes e perder vendas", "Os funcionários ficam mais motivados", "Não muda nada"], "resposta_correta": 1}'::jsonb,
       'Correto! Sem controle de estoque, a padaria pode ficar sem ingredientes e perder vendas. O controle é essencial na administração.',
       'Pense na situação prática: se ninguém sabe quanto de farinha tem no estoque, o que pode acontecer quando um cliente pedir pão?',
       1, 3);
  END IF;

  -- Atividade para "O que é Planejar?"
  SELECT id INTO v_module_id FROM public.modules WHERE title = 'O que é Planejar?' LIMIT 1;
  IF v_module_id IS NOT NULL THEN
    INSERT INTO public.activities (module_id, title, type, content, feedback_correct, feedback_incorrect, complexity_level, order_index) VALUES
      (v_module_id, 'Conceito de Planejamento', 'escolha',
       '{"pergunta": "Planejar é:", "opcoes": ["Fazer as coisas sem pensar antes", "Definir objetivos e decidir como alcançá-los", "Resolver problemas apenas quando eles aparecem", "Copiar o que outras empresas fazem"], "resposta_correta": 1}'::jsonb,
       'Perfeito! Planejar é definir onde queremos chegar e traçar o caminho para isso.',
       'Planejar tem a ver com pensar antes de agir. É decidir o que queremos alcançar e como vamos fazer isso.',
       1, 1),

      (v_module_id, 'Situação-problema: A festa', 'situacao_problema',
       '{"pergunta": "Maria quer organizar uma festa de aniversário para 30 pessoas. Ela tem R$ 500 de orçamento. Quais passos de planejamento ela deveria seguir?", "pontos_chave": ["Definir o objetivo (festa para 30 pessoas)", "Calcular custos por pessoa", "Listar o que precisa comprar", "Definir data e local", "Fazer lista de convidados"]}'::jsonb,
       'Ótima análise! Você identificou os passos essenciais do planejamento aplicados a uma situação real.',
       'Pense passo a passo: primeiro, qual é o objetivo da Maria? Depois, o que ela precisa saber para alcançar esse objetivo?',
       2, 2);
  END IF;

  -- Atividade para "O que é Liderar?"
  SELECT id INTO v_module_id FROM public.modules WHERE title = 'O que é Liderar?' LIMIT 1;
  IF v_module_id IS NOT NULL THEN
    INSERT INTO public.activities (module_id, title, type, content, feedback_correct, feedback_incorrect, complexity_level, order_index) VALUES
      (v_module_id, 'Líder vs Chefe', 'escolha',
       '{"pergunta": "Qual das atitudes abaixo é mais característica de um líder?", "opcoes": ["Dar ordens sem ouvir a equipe", "Inspirar e motivar as pessoas a darem o seu melhor", "Tomar todas as decisões sozinho", "Punir quem comete erros"], "resposta_correta": 1}'::jsonb,
       'Isso! Um líder inspira e motiva. Enquanto um chefe apenas manda, o líder caminha junto com a equipe.',
       'Pense na diferença: um chefe foca no poder e na autoridade. Um líder foca nas pessoas e na colaboração. Qual opção reflete isso?',
       1, 1);
  END IF;
END $$;
