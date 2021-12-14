import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


function getRawData () {
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
    this.number = parseInt(number)
  }
  mark() {
    this.marked = true
  }
}

class BingoBoard {
  constructor(rawBoard) {
    this.rows = rawBoard.map(row => {
      const rowArr = row.trim().split(/\s+/)
      return rowArr.map(number => new Spot(number))
    })
  }

  checkAndMark(calledNumber) {
    // iterate through each and mark if matched
    for (const row of this.rows) {
      for (const spot of row) {
        if (spot.number === calledNumber) spot.mark()
      }
    }
  }

  isBingo() {
    // any horizontal
    for (const row of this.rows) {
      if (row.every(spot => spot.marked)) return true
    }
    // any vertical
    for (let i = 0; i < this.rows[0].length; i++) {
      let markCount = 0
      for (const row of this.rows) {
        if (row[i].marked) {
          markCount++
        }
      }
      if (markCount === this.rows.length) return true
    }
    // not winning board
    return false
  }

  calcSumOfUnmarked() {
    let sumUnmarked = 0
    for (const row of this.rows) {
      row.forEach(spot => {
        if (!spot.marked) {
          sumUnmarked += spot.number
        }
      })
    }
    return sumUnmarked
  }
}


const data = getRawData()
const lines = data.split('\n')

// initialize
let index = 0
let callouts
let rawBoard = []
let boardCollection = []
for (const line of lines) {
  if (index === 0) {
    callouts = line.split(',').map(callout => parseInt(callout))
  } else if (line === '')  {
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

function runTheGame () {
  let winningScore
  callouts.every((callout, index) => {
    boardCollection.every((board, boardIndex) => {
      board.checkAndMark(callout)
      if (index >= 5) {
        if (board.isBingo()){
          const unmarkedSum = board.calcSumOfUnmarked()
          winningScore = callout * unmarkedSum
          console.log(`Bingo! Board ${boardIndex} won the game in ${index+1} moves on the called number ${callout}! The unmarked sum was ${unmarkedSum}, for a total score of ${winningScore}`)
          return false; // acts like a break statement in an "every"
        }
      }
      return true;
    })
    if (winningScore) return false;
    return true;
  })
  return winningScore
}

runTheGame()
