import { parse, calcGammaBits, flipBits, binaryStringToBase10 } from './day3.js'

describe('Day 3 - parse data', () => {
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

describe('Day 3 - calcGammaBits', () => {
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

describe('Day 3 - flipBits', () => {
  test('flips 10010 to 01101', () => {
    expect(flipBits('10010')).toBe('01101')
  })
})

describe('Day 3 - binaryStringToBase10', () => {
  test('10110 returns 22', () => {
    expect(binaryStringToBase10('10110')).toEqual(22)
  })

  test('01001 returns 9', () => {
    expect(binaryStringToBase10('01001')).toEqual(9)
  })
})