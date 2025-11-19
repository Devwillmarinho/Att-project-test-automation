// TESTE DE INTEGRAÇÃO 2: Operações CRUD completas
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { TodoApp } from '@/components/todo-app'

describe('TodoApp Integration - CRUD Operations', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  it('should perform complete CRUD operations', async () => {
    render(<TodoApp />)

    const input = screen.getByTestId('todo-input')
    const addButton = screen.getByTestId('add-button')

    // CREATE
    fireEvent.change(input, { target: { value: 'Tarefa CRUD' } })
    fireEvent.click(addButton)

    await waitFor(() => {
      expect(screen.getByText('Tarefa CRUD')).toBeInTheDocument()
    })

    // READ (verificar que está visível)
    const todoItem = screen.getByTestId('todo-item')
    expect(todoItem).toBeInTheDocument()

    // UPDATE - marcar como concluída
    const checkbox = screen.getByTestId('todo-checkbox')
    fireEvent.click(checkbox)

    await waitFor(() => {
      expect(screen.getByTestId('completed-count')).toHaveTextContent('1')
    })

    // DELETE
    const deleteButton = screen.getByTestId('delete-button')
    fireEvent.click(deleteButton)

    await waitFor(() => {
      expect(screen.queryByText('Tarefa CRUD')).not.toBeInTheDocument()
      expect(screen.getByTestId('empty-state')).toBeInTheDocument()
    })
  })

  it('should filter tasks correctly', async () => {
    render(<TodoApp />)

    const input = screen.getByTestId('todo-input')
    const addButton = screen.getByTestId('add-button')

    // Adicionar múltiplas tarefas
    fireEvent.change(input, { target: { value: 'Tarefa 1' } })
    fireEvent.click(addButton)

    fireEvent.change(input, { target: { value: 'Tarefa 2' } })
    fireEvent.click(addButton)

    // Marcar uma como concluída
    const checkboxes = screen.getAllByTestId('todo-checkbox')
    fireEvent.click(checkboxes[0])

    // Filtrar apenas ativas
    const activeFilter = screen.getByTestId('filter-active')
    fireEvent.click(activeFilter)

    await waitFor(() => {
      const items = screen.getAllByTestId('todo-item')
      expect(items).toHaveLength(1)
    })

    // Filtrar apenas concluídas
    const completedFilter = screen.getByTestId('filter-completed')
    fireEvent.click(completedFilter)

    await waitFor(() => {
      const items = screen.getAllByTestId('todo-item')
      expect(items).toHaveLength(1)
    })
  })
})
