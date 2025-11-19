# TaskFlow - Gerenciador de Tarefas

Aplicação moderna de gerenciamento de tarefas desenvolvida com Next.js 16, React 19, TypeScript e Tailwind CSS.

## Características

- ✅ CRUD completo de tarefas
- 🎨 Interface moderna com Tailwind CSS
- 🌙 Dark mode
- 🔍 Busca e filtros avançados
- 📊 Estatísticas em tempo real
- 🏷️ Categorias e prioridades
- 💾 Persistência com localStorage
- ♿ Acessível e responsivo
- 🧪 100% testado

## Tecnologias

- **Framework:** Next.js 16
- **UI:** React 19, Tailwind CSS v4
- **TypeScript:** Tipagem completa
- **Testes:** Jest, React Testing Library, Playwright
- **Ícones:** Lucide React

## Executar o Projeto

\`\`\`bash
# Instalar dependências
npm install

# Modo desenvolvimento
npm run dev

# Build produção
npm run build
npm start
\`\`\`

Acesse: http://localhost:3000

## Testes

### Testes Unitários (2)
- `validateTodoTitle`: Valida títulos de tarefas
- `calculateTodoStats`: Calcula estatísticas

\`\`\`bash
npm test __tests__/unit
\`\`\`

### Testes de Integração (2)
- Fluxo completo de adicionar tarefa
- Operações CRUD completas com filtros

\`\`\`bash
npm test __tests__/integration
\`\`\`

### Teste E2E (1)
- Fluxo completo do usuário com Playwright
- Testa navegação, interações e persistência

\`\`\`bash
npm run test:e2e
\`\`\`

### Executar Todos os Testes

\`\`\`bash
# Testes unitários e integração
npm test

# Testes E2E
npm run test:e2e

# Cobertura de testes
npm run test:coverage
\`\`\`

## Estrutura do Projeto

\`\`\`
taskflow/
├── app/
│   ├── layout.tsx          # Layout raiz
│   ├── page.tsx            # Página principal
│   └── globals.css         # Estilos globais
├── components/
│   ├── todo-app.tsx        # Componente principal
│   ├── todo-header.tsx     # Cabeçalho
│   ├── todo-input.tsx      # Formulário de entrada
│   ├── todo-list.tsx       # Lista de tarefas
│   ├── todo-item.tsx       # Item individual
│   ├── todo-filters.tsx    # Filtros e busca
│   ├── todo-stats.tsx      # Estatísticas
│   └── ui/                 # Componentes base (shadcn)
├── hooks/
│   ├── use-todos.ts        # Lógica de tarefas
│   └── use-theme.ts        # Gerenciamento de tema
├── types/
│   └── todo.ts             # Tipos TypeScript
├── __tests__/
│   ├── unit/               # Testes unitários
│   └── integration/        # Testes de integração
└── e2e/                    # Testes end-to-end
\`\`\`

## Deploy

Pronto para deploy na Vercel:

\`\`\`bash
vercel
\`\`\`

## Funcionalidades

### CRUD de Tarefas
- Adicionar com título, prioridade e categoria
- Marcar como concluída
- Editar inline
- Deletar tarefas

### Filtros e Busca
- Filtrar por: Todas, Ativas, Concluídas
- Filtrar por prioridade: Alta, Média, Baixa
- Busca em tempo real

### Estatísticas
- Tarefas ativas
- Tarefas concluídas
- Taxa de conclusão em %

### Design
- Dark mode persistente
- Animações suaves
- Totalmente responsivo
- Acessível (ARIA labels)

