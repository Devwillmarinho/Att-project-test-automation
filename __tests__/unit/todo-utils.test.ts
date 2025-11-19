// TESTE UNITÁRIO 1: Validação de título de tarefa
export function validateTodoTitle(title: string): boolean {
  return title.trim().length > 0 && title.trim().length <= 200
}

describe('validateTodoTitle', () => {
  it('should return true for valid titles', () => {
    expect(validateTodoTitle('Comprar leite')).toBe(true)
    expect(validateTodoTitle('  Estudar React  ')).toBe(true)
  })

  it('should return false for empty titles', () => {
    expect(validateTodoTitle('')).toBe(false)
    expect(validateTodoTitle('   ')).toBe(false)
  })

  it('should return false for titles exceeding 200 characters', () => {
    const longTitle = 'a'.repeat(201)
    expect(validateTodoTitle(longTitle)).toBe(false)
  })
})
