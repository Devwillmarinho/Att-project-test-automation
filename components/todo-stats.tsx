'use client'

import { CheckCircle2, Circle, TrendingUp, Target } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Todo } from '@/types/todo'

interface TodoStatsProps {
  todos: Todo[]
}

export function TodoStats({ todos }: TodoStatsProps) {
  const total = todos.length
  const completed = todos.filter((t) => t.completed).length
  const active = total - completed
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0

  const stats = [
    {
      label: 'Tarefas Ativas',
      value: active,
      icon: <Circle className="h-6 w-6" />,
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20',
      textColor: 'text-blue-600 dark:text-blue-400',
      testId: 'active-count'
    },
    {
      label: 'Concluídas',
      value: completed,
      icon: <CheckCircle2 className="h-6 w-6" />,
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20',
      textColor: 'text-emerald-600 dark:text-emerald-400',
      testId: 'completed-count'
    },
    {
      label: 'Progresso',
      value: `${completionRate}%`,
      icon: <TrendingUp className="h-6 w-6" />,
      gradient: 'from-violet-500 to-purple-500',
      bgGradient: 'from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20',
      textColor: 'text-violet-600 dark:text-violet-400',
      testId: 'completion-rate'
    },
    {
      label: 'Total',
      value: total,
      icon: <Target className="h-6 w-6" />,
      gradient: 'from-amber-500 to-orange-500',
      bgGradient: 'from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20',
      textColor: 'text-amber-600 dark:text-amber-400',
      testId: 'total-count'
    }
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-testid="todo-stats">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={cn(
            'group relative overflow-hidden rounded-xl border-2 border-border p-5 shadow-md transition-all hover:scale-105 hover:shadow-2xl',
            'bg-gradient-to-br',
            stat.bgGradient
          )}
        >
          <div className={cn(
            'absolute inset-0 -z-10 bg-gradient-to-r opacity-0 blur transition-opacity group-hover:opacity-30',
            stat.gradient
          )} />
          
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-muted-foreground">
                {stat.label}
              </p>
              <p 
                className={cn('text-4xl font-bold transition-all group-hover:scale-110', stat.textColor)}
                data-testid={stat.testId}
              >
                {stat.value}
              </p>
            </div>
            <div className={cn(
              'rounded-xl bg-gradient-to-br p-3 shadow-lg transition-all group-hover:scale-110 group-hover:rotate-12',
              stat.gradient
            )}>
              <div className="text-white">
                {stat.icon}
              </div>
            </div>
          </div>

          {stat.testId === 'completion-rate' && (
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
              <div 
                className={cn('h-full bg-gradient-to-r transition-all duration-500', stat.gradient)}
                style={{ width: `${completionRate}%` }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
