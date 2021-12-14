import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function getRawData() {
  try {
    const data = fs.readFileSync(path.resolve(__dirname, 'data.txt'), 'utf8')
    return data
  } catch (err) {
    console.error(err)
  }
}

class Spot {
  constructor(number) {
    this.marked = false
    this.number = Number.parseInt(number)
  }
  mark() {
    this.marked = true
  }
}

class BingoBoard {
  constructor(rawBoard) {
    this.rows = rawBoard.map((row) => {
      const rowArr = row.trim().split(/\s+/)
      return rowArr.map((number) => new Spot(number))
    })
    this.bingoed = false
  }

  checkAndMark(calledNumber) {
    // iterate through each and mark if matched
    for (const row of this.rows) {
      for (const spot of row) {
        if (spot.number === calledNumber) spot.mark()
      }
    }
    this.checkBingo()
  }

  checkBingo() {
    // any horizontal
    for (const row of this.rows) {
      if (row.every((spot) => spot.marked)) {
        this.bingoed = true
        return true
      }
    }
    // any vertical
    for (let i = 0; i < this.rows[0].length; i++) {
      let markCount = 0
      for (const row of this.rows) {
        if (row[i].marked) {
          markCount++
        }
      }

      if (markCount === this.rows.length) {
        this.bingoed = true
      }
      return true
    }
    // not winning board
    return false
  }

  calcSumOfUnmarked() {
    let sumUnmarked = 0
    for (const row of this.rows) {
      row.forEach((spot) => {
        if (!spot.marked) {
          sumUnmarked += spot.number
        }
      })
    }
    return sumUnmarked
  }
}

function initialize() {
  const data = getRawData()
  const lines = data.split('\n')

  // initialize
  let index = 0
  let callouts
  let rawBoard = []
  let boardCollection = []
  for (const line of lines) {
    if (index === 0) {
      callouts = line.split(',').map((callout) => Number.parseInt(callout))
    } else if (line === '') {
      rawBoard = []
    } else {
      rawBoard.push(line)
    }

    if (rawBoard.length === 5) {
      const bingoBoard = new BingoBoard(rawBoard)
      boardCollection.push(bingoBoard)
    }

    index++
  }
  return { callouts, boardCollection }
}

// Part 1
function fastestWinningScore() {
  let { callouts, boardCollection } = initialize()
  let winningScore
  callouts.every((callout, index) => {
    boardCollection.every((board, boardIndex) => {
      board.checkAndMark(callout)
      if (index >= 5 && board.bingoed) {
        const unmarkedSum = board.calcSumOfUnmarked()
        winningScore = callout * unmarkedSum
        console.log(
          `Bingo! Board ${boardIndex} won the game in ${
            index + 1
          } moves on the called number ${callout}! The unmarked sum was ${unmarkedSum}, for a total score of ${winningScore}`
        )
        return false // acts like a break statement in an "every"
      }
      return true
    })
    if (winningScore) return false
    return true
  })
  return winningScore
}

fastestWinningScore()

// Part 2
function guaranteedLoser() {
  let { callouts, boardCollection } = initialize()
  let losingScore

  callouts.every((callout, index) => {
    let boardsToRemove = []
    boardCollection.every((board, boardIndex) => {
      board.checkAndMark(callout)
      if (index >= 5 && board.bingoed) {
        if (boardCollection.length === 1) {
          const unmarkedSum = board.calcSumOfUnmarked()
          losingScore = callout * unmarkedSum
          console.log(
            `Bingo! found the losingest most board in the game in ${
              index + 1
            } moves on the called number ${callout}! The unmarked sum was ${unmarkedSum}, for a total score of ${losingScore}`
          )
          return false
        }
        boardsToRemove.push(boardIndex)
      }
      return true
    })

    // strategy is to remove boards from the array until only one is remaining, and once it bingos, we can calculate our score
    for (let i = boardsToRemove.length - 1; i >= 0; i--) {
      // we have to iterate backwards because splicing earlier boards will shift the position of boards further in the array
      boardCollection.splice(boardsToRemove[i], 1)
    }

    if (losingScore) return false
    return true
  })
}

guaranteedLoser()
