export type Priority = 'high' | 'medium' | 'low'

export type FilterType = 'all' | 'active' | 'completed' | 'high' | 'medium' | 'low'

export interface Todo {
  id: string
  title: string
  completed: boolean
  priority: Priority
  category: string
  createdAt: string
}
