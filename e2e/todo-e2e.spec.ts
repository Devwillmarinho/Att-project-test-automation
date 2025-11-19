// TESTE E2E: Fluxo completo do usuário
import { test, expect } from '@playwright/test'

test.describe('TaskFlow E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() => localStorage.clear())
  })

  test('should complete full user workflow', async ({ page }) => {
    // Verificar título da página
    await expect(page).toHaveTitle(/TaskFlow/)

    // Verificar cabeçalho
    await expect(page.getByText('TaskFlow')).toBeVisible()

    // Adicionar primeira tarefa
    const input = page.getByTestId('todo-input')
    const addButton = page.getByTestId('add-button')

    await input.fill('Comprar leite')
    await addButton.click()

    await expect(page.getByText('Comprar leite')).toBeVisible()

    // Adicionar segunda tarefa
    await input.fill('Estudar testes')
    await addButton.click()

    await expect(page.getByText('Estudar testes')).toBeVisible()

    // Verificar estatísticas
    await expect(page.getByTestId('active-count')).toHaveText('2')
    await expect(page.getByTestId('completed-count')).toHaveText('0')

    // Marcar primeira tarefa como concluída
    const checkboxes = page.getByTestId('todo-checkbox')
    await checkboxes.first().click()

    await expect(page.getByTestId('completed-count')).toHaveText('1')
    await expect(page.getByTestId('completion-rate')).toHaveText('50%')

    // Testar busca
    const searchInput = page.getByTestId('search-input')
    await searchInput.fill('leite')

    const todoItems = page.getByTestId('todo-item')
    await expect(todoItems).toHaveCount(1)

    // Limpar busca
    await searchInput.clear()

    // Testar filtros
    await page.getByTestId('filter-completed').click()
    await expect(todoItems).toHaveCount(1)

    await page.getByTestId('filter-active').click()
    await expect(todoItems).toHaveCount(1)

    // Editar tarefa
    const editButton = page.getByTestId('edit-button').first()
    await editButton.click()

    const editInput = page.getByTestId('edit-input')
    await editInput.clear()
    await editInput.fill('Estudar testes automatizados')

    const saveButton = page.getByTestId('save-edit')
    await saveButton.click()

    await expect(page.getByText('Estudar testes automatizados')).toBeVisible()

    // Deletar tarefa
    await page.getByTestId('filter-all').click()
    const deleteButtons = page.getByTestId('delete-button')
    await deleteButtons.first().click()

    await expect(todoItems).toHaveCount(1)

    // Testar tema dark mode
    const themeToggle = page.getByTestId('theme-toggle')
    await themeToggle.click()

    const html = page.locator('html')
    await expect(html).toHaveClass(/dark/)

    // Limpar tarefas concluídas
    await page.getByTestId('filter-all').click()
    const clearButton = page.getByTestId('clear-completed')
    await clearButton.click()

    await expect(page.getByTestId('empty-state')).toBeVisible()
  })

  test('should persist todos in localStorage', async ({ page }) => {
    // Adicionar tarefa
    const input = page.getByTestId('todo-input')
    await input.fill('Tarefa persistente')
    await page.getByTestId('add-button').click()

    // Recarregar página
    await page.reload()

    // Verificar se a tarefa ainda existe
    await expect(page.getByText('Tarefa persistente')).toBeVisible()
  })

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })

    const input = page.getByTestId('todo-input')
    await input.fill('Tarefa mobile')
    await page.getByTestId('add-button').click()

    await expect(page.getByText('Tarefa mobile')).toBeVisible()

    // Verificar que os botões de filtro são responsivos
    const filters = page.getByTestId('filter-buttons')
    await expect(filters).toBeVisible()
  })
})
