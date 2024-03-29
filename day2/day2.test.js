import { parseIntoArrays, moveTheShipPart1, moveTheShipPart2 } from './day2.js'
import { commandsStr } from './data.js'

describe('Day 2 - parseIntoArrays', () => {
  test('should parse correctly', () => {
    const commands = `forward 3
forward 3
down 9
forward 4
forward 9
up 8`

    expect(parseIntoArrays(commands)).toStrictEqual([
      { direction: 'forward', distance: 3 },
      { direction: 'forward', distance: 3 },
      { direction: 'down', distance: 9 },
      { direction: 'forward', distance: 4 },
      { direction: 'forward', distance: 9 },
      { direction: 'up', distance: 8 },
    ])
  })
})

describe('Day 2 - Part 1 - move the ship', () => {
  test('problem example', () => {
    const commands = parseIntoArrays(`forward 5
down 5
forward 8
up 3
down 8
forward 2`)

    expect(moveTheShipPart1(commands)).toStrictEqual({
      horizontal: 15,
      depth: 10,
    })
  })

  test('data set example', () => {
    const commands = parseIntoArrays(commandsStr)
    expect(moveTheShipPart1(commands)).toStrictEqual({
      horizontal: 2024,
      depth: 717,
    })
  })

  test('final answer', () => {
    const commands = parseIntoArrays(commandsStr)
    const position = moveTheShipPart1(commands)
    expect(position.horizontal * position.depth).toBe(1451208)
  })
})

describe('Day 2 - Part 2 - move the ship', () => {
  test('problem example', () => {
    const commands = parseIntoArrays(`forward 5
down 5
forward 8
up 3
down 8
forward 2`)

    const position = moveTheShipPart2(commands)
    expect(position.horizontal * position.depth).toEqual(900)
  })

  test('final answer', () => {
    const commands = parseIntoArrays(commandsStr)
    const position = moveTheShipPart2(commands)
    expect(position.horizontal * position.depth).toBe(1620141160)
  })
})
