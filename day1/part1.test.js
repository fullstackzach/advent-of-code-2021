import { calcDepthIncreases } from './part1.js'
import { problemData } from './data-set.js'
import { linesToNumArray } from '../utils.js'

describe('Day 1 solution - part 1', () => {
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

  test('the large problem data set', () => {
    const depths = linesToNumArray(problemData)
    expect(calcDepthIncreases(depths)).toBe(1559)
  })
})
