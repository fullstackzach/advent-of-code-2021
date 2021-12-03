import { diagnostics } from './data.js'

function parse(diagnosticData) {
  return diagnosticData.split(/\n/)
}

// Creates an array with 0's matching the length of the given data. eg [0,0,0,0,0]. so we can handle any kind of data set
function generateCountingArray(data) {
  return [...'0'.repeat(data.length)].map((value) => +value)
}

function calcGammaBits(data) {
  const countingArray = generateCountingArray(data[0])
  const combined = data.reduce((acc, currentReading) => {
    // for each position number, add up the bits
    return acc.map((value, index) => value + +currentReading[index]) // + is needed before currentReading[index] to coerce it to a number
  }, countingArray)

  const halfLength = data.length / 2
  const gammaBits = combined.map((bitCount) => {
    if (bitCount > halfLength) {
      // then we know 1s are common
      return 1
    }
    return 0
  })

  return arrayToString(gammaBits)
}

function flipBits(binaryString) {
  const flipped = [...binaryString].map((bit) => {
    if (+bit === 0) {
      return 1
    }
    return 0
  })

  return arrayToString(flipped)
}

const arrayToString = (arr) => arr.reduce((acc, str) => acc + str, '')

function binaryStringToBase10(binaryString) {
  return Number.parseInt(binaryString, 2)
}

function solution(){
  const parsedData = parse(diagnostics)
  const gammaBits = calcGammaBits(parsedData)
  const gammaRate = binaryStringToBase10(gammaBits)


  const epsilonBits = flipBits(gammaBits)
  const epsilonRate = binaryStringToBase10(epsilonBits)

  const answer = gammaRate * epsilonRate
  console.log(gammaRate * epsilonRate)
  return answer
}

solution()

export { parse, calcGammaBits, flipBits, binaryStringToBase10, solution }
