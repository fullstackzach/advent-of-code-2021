import { calcDepthIncreasesSliding } from './part2.js'
import { linesToNumArray } from '../utils.js'
import { problemData } from './data-set'

describe('Day 1 solution - part 2', () => {
  test('for the problem example 1', () => {
    const depths = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263]
    expect(calcDepthIncreasesSliding(depths)).toBe(5)
  })
  test('for the problem example 2', () => {
    const depths = [607, 618, 618, 617, 647, 716, 769, 792]
    expect(calcDepthIncreasesSliding(depths)).toBe(5)
  })

  test('for the problem data set', () => {
    const depths = linesToNumArray(problemData)
    expect(calcDepthIncreasesSliding(depths)).toBe(1600)
  })
})
