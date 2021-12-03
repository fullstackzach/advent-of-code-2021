// https://adventofcode.com/2021/day/2

function parseIntoArrays(commandsText) {
  const commandsArr = commandsText.split(/\n/) // split each line into its own array
  const commands = commandsArr.map((command) => {
    const values = command.split(' ') // split the "direction" and the "distance"
    return { direction: values[0], distance: +values[1] } // return it this way so we can coerce the distance into a number, store values as array
  })
  return commands
}

function moveTheShip(parsedCommands) {
  const finalLocation = parsedCommands.reduce(
    (position, command) => {
      const { horizontal, depth } = position
      if (command.direction === 'up') {
        return { horizontal, depth: depth - command.distance }
      }
      if (command.direction === 'down') {
        return { horizontal, depth: depth + command.distance }
      }
      if (command.direction === 'forward') {
        return { horizontal: horizontal + command.distance, depth }
      }
      return position
    },
    { horizontal: 0, depth: 0 } // starting position
  )
  return finalLocation
}

function calcMultiply({ horizontal, depth }) {
  return horizontal * depth
}

export { parseIntoArrays, moveTheShip, calcMultiply }
