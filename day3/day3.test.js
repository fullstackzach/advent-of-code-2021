import {
  parse,
  calcGammaBits,
  flipBits,
  binaryStringToBase10,
  part1solution,
  mostCommon,
} from './day3.js'

describe('parse data', () => {
  test('example data should parse correctly', () => {
    const example = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`

    expect(parse(example)).toStrictEqual([
      '00100',
      '11110',
      '10110',
      '10111',
      '10101',
      '01111',
      '00111',
      '11100',
      '10000',
      '11001',
      '00010',
      '01010',
    ])
  })
})

describe('calcGammaBits', () => {
  test('calculates example data correctly', () => {
    const example = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`

    expect(calcGammaBits(parse(example))).toBe('10110')
  })
})

describe('flipBits', () => {
  test('flips 10010 to 01101', () => {
    expect(flipBits('10010')).toBe('01101')
  })
})

describe('binaryStringToBase10', () => {
  test('10110 returns 22', () => {
    expect(binaryStringToBase10('10110')).toEqual(22)
  })

  test('01001 returns 9', () => {
    expect(binaryStringToBase10('01001')).toEqual(9)
  })
})

describe('Part 1 solution', () => {
  test('part1solution() returns 2743844', () => {
    expect(part1solution()).toEqual(2743844)
  })
})

describe('Part 2 - mostCommon', () => {
  test('given 1s most common, mostCommon should return 1', () => {
    const exampleData = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`
    expect(mostCommon(parse(exampleData), 0)).toEqual(1)
  })

  test('given a tie, mostCommon should return -1', () => {
    const exampleData = `00100
11110
10110
10111
00101
01111
00111
11100
10000
11001
00010
01010`
    expect(mostCommon(parse(exampleData), 0)).toEqual(-1)
  })

  test('given 0s most common, mostCommon should return 0', () => {
    const exampleData = `00100
11110
10110
00111
00101
01111
00111
11100
10000
11001
00010
01010`
    expect(mostCommon(parse(exampleData), 0)).toEqual(0)
  })
})
