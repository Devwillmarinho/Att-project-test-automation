// TESTE UNITÁRIO 2: Cálculos de estatísticas
import type { Todo } from '@/types/todo'

export function calculateTodoStats(todos: Todo[]) {
  const total = todos.length
  const completed = todos.filter((t) => t.completed).length
  const active = total - completed
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0

  return { total, completed, active, completionRate }
}

describe('calculateTodoStats', () => {
  it('should calculate stats correctly for mixed todos', () => {
    const todos: Todo[] = [
      {
        id: '1',
        title: 'Task 1',
        completed: true,
        priority: 'high',
        category: 'Work',
        createdAt: '2024-01-01',
      },
      {
        id: '2',
        title: 'Task 2',
        completed: false,
        priority: 'medium',
        category: 'Personal',
        createdAt: '2024-01-02',
      },
      {
        id: '3',
        title: 'Task 3',
        completed: true,
        priority: 'low',
        category: 'Work',
        createdAt: '2024-01-03',
      },
    ]

    const stats = calculateTodoStats(todos)

    expect(stats.total).toBe(3)
    expect(stats.completed).toBe(2)
    expect(stats.active).toBe(1)
    expect(stats.completionRate).toBe(67)
  })

  it('should return zeros for empty array', () => {
    const stats = calculateTodoStats([])

    expect(stats.total).toBe(0)
    expect(stats.completed).toBe(0)
    expect(stats.active).toBe(0)
    expect(stats.completionRate).toBe(0)
  })

  it('should handle all completed todos', () => {
    const todos: Todo[] = [
      {
        id: '1',
        title: 'Task 1',
        completed: true,
        priority: 'high',
        category: 'Work',
        createdAt: '2024-01-01',
      },
      {
        id: '2',
        title: 'Task 2',
        completed: true,
        priority: 'medium',
        category: 'Personal',
        createdAt: '2024-01-02',
      },
    ]

    const stats = calculateTodoStats(todos)

    expect(stats.completionRate).toBe(100)
    expect(stats.active).toBe(0)
  })
})
