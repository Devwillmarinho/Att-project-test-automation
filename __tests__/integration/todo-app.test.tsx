// TESTE DE INTEGRAÇÃO 1: Fluxo completo de adicionar tarefa
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { TodoApp } from '@/components/todo-app'

describe('TodoApp Integration - Add Task Flow', () => {
  beforeEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  it('should add a new task and display it in the list', async () => {
    render(<TodoApp />)

    // Encontrar input
    const input = screen.getByTestId('todo-input')
    const addButton = screen.getByTestId('add-button')

    // Adicionar tarefa
    fireEvent.change(input, { target: { value: 'Nova tarefa teste' } })
    fireEvent.click(addButton)

    // Verificar se a tarefa aparece na lista
    await waitFor(() => {
      expect(screen.getByText('Nova tarefa teste')).toBeInTheDocument()
    })

    // Verificar estatísticas
    expect(screen.getByTestId('active-count')).toHaveTextContent('1')
    expect(screen.getByTestId('completed-count')).toHaveTextContent('0')
  })

  it('should not add empty tasks', () => {
    render(<TodoApp />)

    const input = screen.getByTestId('todo-input')
    const addButton = screen.getByTestId('add-button')

    // Tentar adicionar tarefa vazia
    fireEvent.change(input, { target: { value: '   ' } })
    fireEvent.click(addButton)

    // Verificar que o estado vazio persiste
    expect(screen.getByTestId('empty-state')).toBeInTheDocument()
  })
})
