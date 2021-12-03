function calcDepthIncreasesSliding(depthsArr) {
  const totalDepthIncreases = depthsArr.reduce(
    (increaseCount, currentDepth, index, depths) => {
      if (index < 3) {
        // we don't have enough numbers behind us yet to compare two sliding windows
        return increaseCount
      }
      const currentWindow = currentDepth + depths[index - 1] + depths[index - 2]
      const lastWindow =
        depths[index - 1] + depths[index - 2] + depths[index - 3]
      if (currentWindow > lastWindow) {
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

export { calcDepthIncreasesSliding }
