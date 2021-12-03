import { linesToNumArray } from './utils.js'

describe('linesToNumArray', () => {
  test('something', () => {
    expect(
      linesToNumArray(`8445
8446
8459
8460
8462
8463
8467
8460
8450
8452
8460
8462
8471
8497`)
    ).toStrictEqual([
      8445, 8446, 8459, 8460, 8462, 8463, 8467, 8460, 8450, 8452, 8460, 8462,
      8471, 8497,
    ])
  })
})
