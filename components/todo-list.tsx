'use client'

import { TodoItem } from './todo-item'
import type { Todo } from '@/types/todo'

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onUpdate: (id: string, title: string) => void
}

export function TodoList({ todos, onToggle, onDelete, onUpdate }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-12 text-center" data-testid="empty-state">
        <p className="text-muted-foreground">
          Nenhuma tarefa encontrada. Adicione uma nova!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-2" data-testid="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  )
}
