// https://adventofcode.com/2021/day/2

function parseIntoArrays(commandsText) {
  const commandsArr = commandsText.split(/\n/) // split each line into its own array
  const commands = commandsArr.map((command) => {
    const [direction, distance] = command.split(' ') // split the "direction" and the "distance"
    return { direction, distance: Number.parseInt(distance) } // return it this way so we can coerce the distance into a number, store values as an object
  })
  return commands
}

function moveTheShipPart1(parsedCommands) {
  const finalLocation = parsedCommands.reduce(
    (position, command) => {
      const { horizontal, depth } = position
      if (command.direction === 'up') {
        return {
          horizontal,
          depth: depth - command.distance,
        }
      }
      if (command.direction === 'down') {
        return {
          horizontal,
          depth: depth + command.distance,
        }
      }
      if (command.direction === 'forward') {
        return {
          horizontal: horizontal + command.distance,
          depth,
        }
      }
      return position
    },
    { horizontal: 0, depth: 0 } // starting position
  )
  return finalLocation
}

function moveTheShipPart2(parsedCommands) {
  const finalLocation = parsedCommands.reduce(
    (position, command) => {
      const { horizontal, depth, aim } = position
      if (command.direction === 'up') {
        return {
          horizontal,
          depth,
          aim: aim - command.distance,
        }
      }
      if (command.direction === 'down') {
        return {
          horizontal,
          depth,
          aim: aim + command.distance,
        }
      }
      if (command.direction === 'forward') {
        return {
          horizontal: horizontal + command.distance,
          depth: depth + aim * command.distance,
          aim,
        }
      }
      return position
    },
    { horizontal: 0, depth: 0, aim: 0 } // starting position
  )
  return finalLocation
}

export { parseIntoArrays, moveTheShipPart1, moveTheShipPart2 }
