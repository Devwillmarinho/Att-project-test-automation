'use client'

import { useState, useEffect } from 'react'
import type { Todo, Priority } from '@/types/todo'

const STORAGE_KEY = 'taskflow-todos'

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        setTodos(JSON.parse(stored))
      } catch (error) {
        console.error('Failed to parse todos:', error)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const addTodo = (title: string, priority: Priority, category: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      priority,
      category,
      createdAt: new Date().toISOString(),
    }
    setTodos((prev) => [newTodo, ...prev])
  }

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const updateTodo = (id: string, title: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, title } : todo))
    )
  }

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed))
  }

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    clearCompleted,
  }
}
