function parse(diagnosticData) {
  return diagnosticData.split(/\n/)
}

function calcGammaBits(data) {
  const combined = data.reduce(
    (acc, currentReading) => {
      // for each position number, add up the bits
      return acc.map((value, index) => value + +currentReading[index]) // + is needed before currentReading[index] to coerce it to a number
    },
    [0, 0, 0, 0, 0]
  )

  const halfLength = data.length / 2
  const gammaBits = combined.map((bitCount) => {
    if (bitCount > halfLength) {
      // then we know 1s are common
      return 1
    }
    return 0
  })

  return gammaBits.reduce((acc, str) => acc + str, '') // convert it back to a string
}

function flipBits(binaryString) {
  const flipped = [...binaryString].map((bit) => {
    if (+bit === 0) {
      return 1
    }
    return 0
  })

  return flipped.reduce((acc, str) => acc + str, '') // convert it back to a string
}

console.log(flipBits('10010'))

export { parse, calcGammaBits, flipBits }
