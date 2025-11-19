'use client'

import { Search, Sparkles, Zap, CheckCircle, AlertCircle, Circle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { FilterType } from '@/types/todo'

interface TodoFiltersProps {
  currentFilter: FilterType
  onFilterChange: (filter: FilterType) => void
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function TodoFilters({
  currentFilter,
  onFilterChange,
  searchQuery,
  onSearchChange,
}: TodoFiltersProps) {
  const filters: { value: FilterType; label: string; icon: React.ReactNode; color: string }[] = [
    { value: 'all', label: 'Todas', icon: <Sparkles className="h-4 w-4" />, color: 'from-violet-500 to-purple-500' },
    { value: 'active', label: 'Ativas', icon: <Zap className="h-4 w-4" />, color: 'from-blue-500 to-cyan-500' },
    { value: 'completed', label: 'Concluídas', icon: <CheckCircle className="h-4 w-4" />, color: 'from-emerald-500 to-teal-500' },
    { value: 'high', label: 'Alta', icon: <AlertCircle className="h-4 w-4" />, color: 'from-red-500 to-orange-500' },
    { value: 'medium', label: 'Média', icon: <Circle className="h-4 w-4" />, color: 'from-amber-500 to-yellow-500' },
    { value: 'low', label: 'Baixa', icon: <Circle className="h-4 w-4" />, color: 'from-emerald-500 to-green-500' },
  ]

  return (
    <div className="space-y-4">
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-violet-500" />
        <Input
          type="text"
          placeholder="🔍 Buscar suas tarefas..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="h-12 border-2 pl-12 text-base transition-all focus-visible:border-violet-500 focus-visible:shadow-lg focus-visible:shadow-violet-500/20"
          data-testid="search-input"
        />
      </div>

      <div className="flex flex-wrap gap-2" data-testid="filter-buttons">
        {filters.map((filter) => (
          <Button
            key={filter.value}
            variant="outline"
            size="sm"
            onClick={() => onFilterChange(filter.value)}
            data-testid={`filter-${filter.value}`}
            className={cn(
              'group relative overflow-hidden border-2 font-semibold transition-all hover:scale-105 hover:shadow-lg',
              currentFilter === filter.value
                ? `bg-gradient-to-r ${filter.color} border-transparent text-white shadow-lg hover:shadow-xl`
                : 'hover:border-violet-300 dark:hover:border-violet-700'
            )}
          >
            {currentFilter !== filter.value && (
              <div className={cn(
                'absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity group-hover:opacity-10',
                filter.color
              )} />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              {filter.icon}
              {filter.label}
            </span>
          </Button>
        ))}
      </div>
    </div>
  )
}
