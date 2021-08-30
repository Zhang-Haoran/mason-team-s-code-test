// css class for different card image
const CARD_TECHS = [
  "html5",
  "css3",
  "js",
  "sass",
  "nodejs",
  "react",
  "linkedin",
  "heroku",
  "github",
  "aws",
]

// only list out some of the properties,
// add more when needed
const game = {
  score: 0,
  level: 1,
  timer: 60,
  timerDisplay: null,
  scoreDisplay: null,
  levelDisplay: null,
  timerInterval: null,
  startButton: null,
  preSelected: null,
  currentSelecting: null,
  cardArray: [],
  cardDisplay: 0,
}
// register DOM element for further using
const DOMcontrol = {
  levelDisplay: document.querySelector(".game-stats__level--value"),
  scoreDisplay: document.querySelector(".game-stats__score--value"),
  startButton: document.querySelector(".game-stats__button"),
  timerDisplay: document.querySelector(".game-timer"),
  timeDisplayBar: document.querySelector(".game-timer__bar"),
  gameBoard: document.querySelector(".game-board"),
  gameInstruction: document.querySelector(".game-instruction"),
}

setGame()

/*******************************************
/     game process
/******************************************/
function setGame() {
  // register any element in your game object
  bindStartButton()
}

function setGameBoard() {
  // set game level based on current level
  game.levelDisplay = game.level
  // remove game instructions
  DOMcontrol.gameInstruction.remove()
  // set cards number and layout columns based on level
  const setLevel = {
    // level 1 has 4 cards
    1: {
      cardNum: 4,
      boardColumn: 2,
    },
    // level 2 has 16 cards
    2: {
      cardNum: 16,
      boardColumn: 4,
    },
    // level 3 has 36 cards
    3: {
      cardNum: 36,
      boardColumn: 6,
    },
  }
  // number of card display
  game.cardDisplay = setLevel[game.levelDisplay].cardNum
  // set game level display text
  DOMcontrol.levelDisplay.innerHTML = game.levelDisplay
  // set gameboard css to grid layout
  DOMcontrol.gameBoard.style.cssText += `
  grid-template-columns: repeat(${
    setLevel[game.levelDisplay].boardColumn
  }, 1fr)`
  // set card array
  for (let i = 0; i < game.cardDisplay / 2; i++) {
    const card = pickRandomCard()
    // add two same style card into card array
    game.cardArray.push(card)
    game.cardArray.push(card)
  }
  // reorder array element
  shuffleArray(game.cardArray)
  // set game card display
  game.cardArray.forEach((card) => (DOMcontrol.gameBoard.innerHTML += card))
  // reset timer
  game.timer = 60
  updateTimerDisplay()
}

function handleRestart() {
  // restart game
  DOMcontrol.gameBoard.innerHTML = ""
  DOMcontrol.scoreDisplay.innerHTML = 0
  resetGame()
  startGame()
}

function pickRandomCard() {
  // random cardContent
  const cardContent = CARD_TECHS[Math.floor(Math.random() * CARD_TECHS.length)]
  // html for each card element
  const cardElmentHtml = `
    <div class='card ${cardContent}'>
    <div class='card__face card__face--front'></div>
    <div class='card__face card__face--back'></div>
    </div>`
  return cardElmentHtml
}

function startGame() {
  //First time start game
  game.startButton = "End Game"
  DOMcontrol.startButton.innerHTML = "End Game"
  setGameBoard()
  bindCardClick()
}

function handleCardFlip() {
  // Two cards selected. Won't flip any more cards
  if (game.preSelected !== null && game.currentSelecting !== null) return null
  // Flip card
  this.classList.add("card--flipped")
  // record selected card for further comparison
  if (!game.preSelected) {
    game.preSelected = this
    return null
  }
  game.currentSelecting = this
  compareCard()
}

function compareCard() {
  // click same card twice. Flip it back
  if (game.preSelected === game.currentSelecting) {
    game.preSelected.classList.remove("card--flipped")
    game.currentSelecting.classList.remove("card--flipped")
    game.preSelected = null
    game.currentSelecting = null
    return null
  }
  // select two cards with same style (same class name). Calculate score
  if (game.preSelected.className === game.currentSelecting.className) {
    unBindCardClick(game.preSelected)
    unBindCardClick(game.currentSelecting)
    game.preSelected = null
    game.currentSelecting = null
    game.score += Math.pow(game.level, 2) * game.timer
    updateScore()
    // no card left
    if (!game.cardDisplay) {
      setTimeout(() => nextLevel(), 1000)
    }
    return null
  }
  // select two card with different style
  setTimeout(function () {
    game.preSelected.classList.remove("card--flipped")
    game.currentSelecting.classList.remove("card--flipped")
    game.preSelected = null
    game.currentSelecting = null
  }, 1500)
}

function nextLevel() {
  game.level++
  if (game.level === 4) handleGameOver()
  // rest game board
  game.cardArray = []
  DOMcontrol.gameBoard.innerHTML = ""
  setGameBoard()
  bindCardClick()
}

function resetGame() {
  // reset game setting
  game.score = 0
  game.level = 1
  game.timer = 60
  game.timerDisplay = null
  game.scoreDisplay = null
  game.levelDisplay = null
  game.timerInterval = null
  game.startButton = null
  game.preSelected = null
  game.currentSelecting = null
  game.cardArray = []
  game.cardDisplay = 0
}

function handleGameOver() {
  // Game over. display score
  game.startButton = "New Game"
  DOMcontrol.startButton.innerHTML = "New Game"
  alert(`Your score is: ${game.score}`)
}

function shuffleArray(array) {
  // Reorder array
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

/*******************************************
/     UI update
/******************************************/
function updateScore() {
  DOMcontrol.scoreDisplay.innerHTML = game.score
  game.cardDisplay -= 2
}

function updateTimerDisplay() {
  game.timerDisplay = game.timer
  DOMcontrol.timeDisplayBar.innerHTML = `${game.timer}s`
  //every time start next level or new game, reset time interval
  clearInterval(game.timerInterval)
  if (!game.timerDisplay) return null
  //reset bar width
  DOMcontrol.timeDisplayBar.style.width = 100 + "%"
  //every 1 second, change timerbar display
  game.timerInterval = setInterval(function () {
    game.timer -= 1
    DOMcontrol.timeDisplayBar.innerHTML = `${game.timer}s`
    DOMcontrol.timeDisplayBar.style.width = 100 * (game.timer / 60) + "%"
    if (game.timer === 0) handleGameOver()
  }, 1000)
}

/*******************************************
/     bindings
/******************************************/
function bindStartButton() {
  DOMcontrol.startButton.addEventListener("click", function () {
    // actions based on different button value
    const actions = {
      null: startGame,
      "New Game": handleRestart,
      "End Game": handleGameOver,
    }
    // conduct action
    actions[game.startButton]()
  })
}

function unBindCardClick(card) {
  card.removeEventListener("click", handleCardFlip)
}

function bindCardClick() {
  // select all card element and add event listener
  const cards = document.querySelectorAll(".card")
  cards.forEach((card) => card.addEventListener("click", handleCardFlip))
}
