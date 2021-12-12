import { diagnostics } from './data.js'

function parse(diagnosticData) {
  return diagnosticData.split(/\n/)
}

// Creates an array with 0's matching the length of the given data. eg [0,0,0,0,0]. so we can handle any kind of data set
function generateCountingArray(data) {
  const array = []
  array.length = data.length
  array.fill(0)
  return array
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

function reduceTargetBit(data, index, targetBit) {
  return data.reduce((matchingVals, current) => {
    if (Number.parseInt(current[index]) === targetBit) {
      matchingVals.push(current)
    }
    return matchingVals
  }, [])
}

function flipAbit(bit) {
  return bit === 0 ? 1 : 0
}

function oxygenGeneratorRating(data, index = 0) {
  const result = mostCommon(data, index)
  const commonBit = result === -1 ? 1 : result

  if (data.length === 1) {
    return binaryStringToBase10(data[0])
  }

  const arr = reduceTargetBit(data, index, commonBit)

  return oxygenGeneratorRating(arr, ++index)
}

function co2scrubberRating(data, index = 0) {
  const result = mostCommon(data, index)
  const leastCommonBit = result === -1 ? 0 : flipAbit(result)

  if (data.length === 1) {
    return binaryStringToBase10(data[0])
  }

  const arr = reduceTargetBit(data, index, leastCommonBit)

  return co2scrubberRating(arr, ++index)
}

function part2solution() {
  const data = parse(diagnostics)
  const oxyRating = oxygenGeneratorRating(data)
  const co2Rating = co2scrubberRating(data)
  return oxyRating * co2Rating
}

export {
  parse,
  calcGammaBits,
  flipBits,
  binaryStringToBase10,
  part1solution,
  mostCommon,
  oxygenGeneratorRating,
  co2scrubberRating,
  part2solution,
}
