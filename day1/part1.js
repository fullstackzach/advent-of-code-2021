// https://adventofcode.com/2021/day/1

function calcDepthIncreases(depthsArr) {
  const totalDepthIncreases = depthsArr.reduce(
    (increaseCount, currentDepth, index, depths) => {
      if (currentDepth > depths[index - 1]) {
        // there was an depth increase
        return ++increaseCount
      }
      // no depth increase
      return increaseCount
    },
    0
  )
  return totalDepthIncreases
}

export { calcDepthIncreases }
