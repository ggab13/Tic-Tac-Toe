const all = document.querySelector(".container")
const container = document.querySelector(".game--container")
const board = document.querySelector(".board")
const blocks = document.querySelectorAll(".field")
const choice = document.querySelector(".choice")
const savePlayers = document.getElementById("save")
let player1Name = document.getElementById("player1")
let player2Name = document.getElementById("player2")
let p1 = document.getElementById("p1")
let p2 = document.getElementById("p2")
let p1Score = document.getElementById("p1Score")
let p2Score = document.getElementById("p2Score")
const winningMessage = document.getElementById("winningText")
const restart = document.getElementById("restart")


const winningValues = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
]

const gameBoard = (() => {





})()


//Create Players
const playerFactory = (name, sign) => {
  let score = 0;
  const getName = () => name
  const getSign = () => sign
  const setName = (newName) => name = newName
  const addScore = () => score++;
  const getScore = () => score;

  return {
    getName,
    getSign,
    setName,
    addScore,
    getScore

  }
}


//Handling things on the interface
const gameController = (() => {
  let player1;
  let player2;
  let turn = true;
  let xList = []
  let oList = []

  savePlayers.addEventListener('click', () => {
    choice.style.display = "none";
    all.classList.add("start");
    container.style.display = "grid";

    player1 = playerFactory(player1Name.value, "x");
    player2 = playerFactory(player2Name.value, "o");
    p1.innerHTML = `<span class="pName">${player1.getName()}</span> <br>  <span class="pSign">${player1.getSign()}</span>`
    p2.innerHTML = `<span class="pName">${player2.getName()}</span> <br> <span class="pSign">${player2.getSign()}</span>`
  })

  function makeFieldsClickable() {
    blocks.forEach((field) => {

      field.addEventListener('click', clickHandler, {
        once: true

      })
    })
  }
  makeFieldsClickable();
  // Checks if won 

  function checkWinning() {
    let win = false;

    // (JSON.stringify(element) == JSON.stringify(xList)) || (JSON.stringify(element) == JSON.stringify(oList)) 
    // There is an easier option for searching items, and also this compre doesnt works if there is more elemetns in the lists
    winningValues.forEach(element => {
      if (element.every(xElement => xList.includes(xElement)) || element.every(oElement => oList.includes(oElement))) {
        win = !win;
      }
    })
    return win;
  }

  function checkDraw() {
    return Array.from(blocks).every(field => {
      return field.classList.contains(player1.getSign()) ||
        field.classList.contains(player2.getSign())
    })
  }


  function placeSign(field, currentSign) {
    field.classList.add(currentSign)
    changeTurn()
  }

  function changeTurn() {
    turn = !turn
  }

  function listHandler(sign, fieldValue) {
    if (sign == 'x') {
      xList.push(parseInt(fieldValue))
    } else {
      oList.push(parseInt(fieldValue))
    }
  }

  function clickHandler(e) {

    const field = e.target
    const currentSign = turn ? player1.getSign() : player2.getSign()
    const fieldValue = field.getAttribute('data-field')
    placeSign(field, currentSign)
    listHandler(currentSign, fieldValue)
    console.log(oList, xList)
    // Check if we won 

    if (checkWinning()) {
      winningMessage.innerHTML = `${turn ? "O" : "X" }  Wins`

      if (!turn) {
        player1.addScore()
        p1Score.innerHTML = `${player1.getScore()}`
      }
      if (turn) {
        player2.addScore()
        p2Score.innerHTML = `${player2.getScore()}`
      }

      gameEnd()
    }

    // Check if draw
    if (checkDraw() && !checkWinning()) {
      winningMessage.innerHTML = `Its a draw `
      gameEnd()
    }
  }

  function gameEnd() {
    all.style.opacity = "0.2"
    restart.classList.remove("hidden")
    restart.classList.add("visible")
    winningMessage.style.display = 'block'
    board.style.pointerEvents = "none"


  }

  function newGame() {

    blocks.forEach((field) => {
      field.classList.remove('x', 'o');
      makeFieldsClickable();
      board.style.pointerEvents = "auto"

    })
    restart.classList.remove("visible")
    restart.classList.add("hidden")

    winningMessage.style.display = 'none'
    all.style.opacity = "1"
    xList = []
    oList = []
    console.log(oList, xList)

  }
  restart.addEventListener('click', () => newGame())

})()