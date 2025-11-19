'use client'

import { useState } from 'react'
import { Plus, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Priority } from '@/types/todo'

interface TodoInputProps {
  onAdd: (title: string, priority: Priority, category: string) => void
}

export function TodoInput({ onAdd }: TodoInputProps) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')
  const [category, setCategory] = useState('Geral')
  const [isAdding, setIsAdding] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      setIsAdding(true)
      onAdd(title.trim(), priority, category)
      setTitle('')
      setPriority('medium')
      setCategory('Geral')
      setTimeout(() => setIsAdding(false), 600)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="group relative overflow-hidden rounded-2xl border-2 border-border bg-gradient-to-br from-card via-card to-violet-50/50 p-5 shadow-lg transition-all hover:shadow-2xl hover:shadow-violet-500/20 dark:to-violet-950/20"
      data-testid="todo-form"
    >
      <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-500 opacity-0 blur transition-opacity group-hover:opacity-20" />
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="todo-input" className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Sparkles className="h-4 w-4 text-violet-500" />
            Nova Tarefa
          </label>
          <Input
            id="todo-input"
            type="text"
            placeholder="O que você precisa fazer hoje?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-12 border-2 text-base transition-all focus-visible:border-violet-500 focus-visible:shadow-lg focus-visible:shadow-violet-500/20"
            data-testid="todo-input"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-1 gap-3">
            <div className="flex-1 space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Prioridade</label>
              <Select value={priority} onValueChange={(v) => setPriority(v as Priority)}>
                <SelectTrigger className="h-11 border-2 transition-all hover:border-violet-300 dark:hover:border-violet-700" data-testid="priority-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">🔥 Alta</SelectItem>
                  <SelectItem value="medium">⭐ Média</SelectItem>
                  <SelectItem value="low">🟢 Baixa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 space-y-1">
              <label className="text-xs font-medium text-muted-foreground">Categoria</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="h-11 border-2 transition-all hover:border-violet-300 dark:hover:border-violet-700" data-testid="category-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Geral">📋 Geral</SelectItem>
                  <SelectItem value="Trabalho">💼 Trabalho</SelectItem>
                  <SelectItem value="Pessoal">👤 Pessoal</SelectItem>
                  <SelectItem value="Estudos">📚 Estudos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button 
            type="submit" 
            size="lg"
            className={`h-11 gap-2 bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600 px-6 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl hover:shadow-violet-500/50 sm:self-end ${isAdding ? 'animate-bounce-subtle' : ''}`}
            data-testid="add-button"
          >
            <Plus className="h-5 w-5" />
            Adicionar
          </Button>
        </div>
      </div>
    </form>
  )
}
