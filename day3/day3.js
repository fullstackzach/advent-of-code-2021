import { diagnostics } from './data.js'

function parse(diagnosticData) {
  return diagnosticData.split(/\n/)
}

// Creates an array with 0's matching the length of the given data. eg [0,0,0,0,0]. so we can handle any kind of data set
function generateCountingArray(data) {
  return [...'0'.repeat(data.length)].map((value) => Number.parseInt(value))
}

function calcGammaBits(data) {
  const countingArray = generateCountingArray(data[0])
  const combined = data.reduce((acc, currentReading) => {
    // for each position number, add up the bits
    return acc.map(
      (value, index) => value + Number.parseInt(currentReading[index])
    )
  }, countingArray)

  const halfLength = data.length / 2
  const gammaBits = combined.map((bitCount) => (bitCount > halfLength ? 1 : 0))

  return arrayToString(gammaBits)
}

function flipBits(binaryString) {
  const flipped = [...binaryString].map((bit) =>
    Number.parseInt(bit) === 0 ? 1 : 0
  )

  return arrayToString(flipped)
}

const arrayToString = (arr) => arr.reduce((acc, str) => acc + str, '')

function binaryStringToBase10(binaryString) {
  return Number.parseInt(binaryString, 2)
}

function part1solution() {
  const parsedData = parse(diagnostics)
  const gammaBits = calcGammaBits(parsedData)
  const gammaRate = binaryStringToBase10(gammaBits)

  const epsilonBits = flipBits(gammaBits)
  const epsilonRate = binaryStringToBase10(epsilonBits)

  const answer = gammaRate * epsilonRate
  return answer
}

// Part 2 functions

function mostCommon(arr, bitIndex) {
  // return values: most common value, or -1 for a tie
  const result = arr.reduce(
    (counts, value) => {
      const { zeros, ones } = counts
      return Number.parseInt(value[bitIndex]) === 0
        ? { zeros: zeros + 1, ones }
        : { zeros, ones: ones + 1 }
    },
    { zeros: 0, ones: 0 }
  )

  const { zeros, ones } = result
  if (zeros > ones) {
    return 0
  } else if (zeros < ones) {
    return 1
  }
  return -1
}

export {
  parse,
  calcGammaBits,
  flipBits,
  binaryStringToBase10,
  part1solution,
  mostCommon,
}
