'use client'

import { useState, useEffect } from 'react'
import { TodoHeader } from './todo-header'
import { TodoInput } from './todo-input'
import { TodoList } from './todo-list'
import { TodoFilters } from './todo-filters'
import { TodoStats } from './todo-stats'
import { Confetti } from './confetti'
import { useTodos } from '@/hooks/use-todos'
import type { FilterType } from '@/types/todo'

export function TodoApp() {
  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    clearCompleted,
  } = useTodos()
  
  const [filter, setFilter] = useState<FilterType>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showConfetti, setShowConfetti] = useState(false)

  const filteredTodos = todos.filter((todo) => {
    const matchesFilter =
      filter === 'all' ||
      (filter === 'active' && !todo.completed) ||
      (filter === 'completed' && todo.completed) ||
      (filter === 'high' && todo.priority === 'high') ||
      (filter === 'medium' && todo.priority === 'medium') ||
      (filter === 'low' && todo.priority === 'low')

    const matchesSearch = todo.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase())

    return matchesFilter && matchesSearch
  })

  const handleToggle = (id: string) => {
    const todo = todos.find((t) => t.id === id)
    if (todo && !todo.completed) {
      setShowConfetti(true)
    }
    toggleTodo(id)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-background to-cyan-50 dark:from-violet-950/20 dark:via-background dark:to-cyan-950/20">
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      
      <div className="mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
        <TodoHeader />
        
        <div className="mt-8 space-y-6">
          <TodoInput onAdd={addTodo} />
          
          <TodoFilters
            currentFilter={filter}
            onFilterChange={setFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
          
          <TodoStats todos={todos} />
          
          <TodoList
            todos={filteredTodos}
            onToggle={handleToggle}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
          />
          
          {todos.some((t) => t.completed) && (
            <button
              onClick={clearCompleted}
              className="group relative w-full overflow-hidden rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-muted-foreground transition-all hover:scale-105 hover:border-destructive/50 hover:text-destructive hover:shadow-lg"
              data-testid="clear-completed"
            >
              <span className="relative z-10">Limpar tarefas concluídas</span>
              <div className="absolute inset-0 -z-0 bg-gradient-to-r from-destructive/0 via-destructive/10 to-destructive/0 opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
