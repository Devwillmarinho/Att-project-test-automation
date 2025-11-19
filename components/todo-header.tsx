'use client'

import { Moon, Sun, Sparkles } from 'lucide-react'
import { useTheme } from '@/hooks/use-theme'
import { Button } from '@/components/ui/button'

export function TodoHeader() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="flex items-center justify-between">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 p-2 shadow-lg animate-pulse-glow">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <h1 className="bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-600 bg-clip-text text-balance text-4xl font-bold tracking-tight text-transparent sm:text-5xl animate-gradient">
            TaskFlow
          </h1>
        </div>
        <p className="text-pretty text-lg font-medium text-muted-foreground">
          Organize suas tarefas de forma inteligente
        </p>
      </div>
      
      <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        className="h-12 w-12 border-2 transition-all hover:scale-110 hover:border-violet-500 hover:bg-violet-50 hover:shadow-lg dark:hover:border-violet-400 dark:hover:bg-violet-950/50"
        data-testid="theme-toggle"
        aria-label="Alternar tema"
      >
        {theme === 'dark' ? (
          <Sun className="h-6 w-6 text-amber-500 transition-transform hover:rotate-180" />
        ) : (
          <Moon className="h-6 w-6 text-violet-600 transition-transform hover:-rotate-12" />
        )}
      </Button>
    </header>
  )
}
