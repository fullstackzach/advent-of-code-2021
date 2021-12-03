import { calcDepthIncreases } from './1.js'

describe('Day 1 solution', () => {
  test('for the problem example', () => {
    const depths = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263]
    expect(calcDepthIncreases(depths)).toBe(7)
  })

  test('for all values equal', () => {
    const depths = [199, 199, 199, 199, 199, 199, 199, 199, 199, 199]
    expect(calcDepthIncreases(depths)).toBe(0)
  })

  test('for no depths', () => {
    const depths = []
    expect(calcDepthIncreases(depths)).toBe(0)
  })

  test('for a negative depth', () => {
    const depths = [199, -200, 208, 210, 200, 207, 240, 269, 260, 263]
    expect(calcDepthIncreases(depths)).toBe(6)
  })
})