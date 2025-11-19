'use client'

import { useState } from 'react'
import { Trash2, Edit2, Check, X, Flame, Star, CircleDot } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'
import type { Todo } from '@/types/todo'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onUpdate: (id: string, title: string) => void
}

export function TodoItem({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)
  const [isShaking, setIsShaking] = useState(false)

  const handleUpdate = () => {
    if (editTitle.trim() && editTitle !== todo.title) {
      onUpdate(todo.id, editTitle.trim())
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditTitle(todo.title)
    setIsEditing(false)
  }

  const priorityStyles = {
    high: {
      border: 'border-l-4 border-l-red-500 dark:border-l-red-400',
      bg: 'bg-gradient-to-r from-red-50 to-transparent dark:from-red-950/20',
      icon: <Flame className="h-4 w-4 text-red-500 dark:text-red-400" />,
      badge: 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
    },
    medium: {
      border: 'border-l-4 border-l-amber-500 dark:border-l-amber-400',
      bg: 'bg-gradient-to-r from-amber-50 to-transparent dark:from-amber-950/20',
      icon: <Star className="h-4 w-4 text-amber-500 dark:text-amber-400" />,
      badge: 'bg-gradient-to-r from-amber-500 to-yellow-500 text-white'
    },
    low: {
      border: 'border-l-4 border-l-emerald-500 dark:border-l-emerald-400',
      bg: 'bg-gradient-to-r from-emerald-50 to-transparent dark:from-emerald-950/20',
      icon: <CircleDot className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />,
      badge: 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
    },
  }

  const handleDelete = () => {
    setIsShaking(true)
    setTimeout(() => {
      onDelete(todo.id)
    }, 500)
  }

  const style = priorityStyles[todo.priority]

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-xl border border-border bg-card p-4 shadow-md transition-all duration-300',
        'hover:scale-[1.02] hover:shadow-xl hover:shadow-violet-500/10',
        style.border,
        style.bg,
        todo.completed && 'opacity-70 scale-95',
        isShaking && 'animate-shake'
      )}
      data-testid="todo-item"
    >
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-violet-500/0 via-purple-500/0 to-cyan-500/0 opacity-0 transition-opacity group-hover:opacity-10" />
      
      <div className="flex items-center gap-3">
        <div className="transition-transform hover:scale-125">
          <Checkbox
            checked={todo.completed}
            onCheckedChange={() => onToggle(todo.id)}
            data-testid="todo-checkbox"
            aria-label={`Marcar "${todo.title}" como ${todo.completed ? 'não concluída' : 'concluída'}`}
            className="h-5 w-5"
          />
        </div>

        {isEditing ? (
          <div className="flex flex-1 items-center gap-2">
            <Input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleUpdate()
                if (e.key === 'Escape') handleCancel()
              }}
              className="h-10 border-2 border-violet-300 focus-visible:border-violet-500 dark:border-violet-700"
              autoFocus
              data-testid="edit-input"
            />
            <Button
              size="icon"
              onClick={handleUpdate}
              className="h-10 w-10 bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600"
              data-testid="save-edit"
            >
              <Check className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={handleCancel}
              className="h-10 w-10 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-950"
              data-testid="cancel-edit"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                {style.icon}
                <p
                  className={cn(
                    'text-base font-semibold text-foreground transition-all',
                    todo.completed && 'line-through opacity-60'
                  )}
                  data-testid="todo-title"
                >
                  {todo.title}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className={cn('rounded-full px-3 py-1 font-medium shadow-sm', style.badge)}>
                  {todo.category}
                </span>
                <span className="text-muted-foreground">•</span>
                <span className="font-medium text-muted-foreground">
                  {new Date(todo.createdAt).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>

            <div className="flex gap-1 opacity-0 transition-all group-hover:opacity-100">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsEditing(true)}
                className="h-9 w-9 transition-all hover:scale-110 hover:bg-violet-100 hover:text-violet-600 dark:hover:bg-violet-950"
                data-testid="edit-button"
                aria-label={`Editar "${todo.title}"`}
              >
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={handleDelete}
                className="h-9 w-9 transition-all hover:scale-110 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-950"
                data-testid="delete-button"
                aria-label={`Excluir "${todo.title}"`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
