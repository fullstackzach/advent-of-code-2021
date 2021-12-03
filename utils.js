function linesToNumArray(inputString) {
  return inputString.split(/\n/).map((t) => +t)
}

export { linesToNumArray }
