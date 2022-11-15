console.log('Test!');

const playerModule = (function() {

  let players = []

  const _playerFactory = (name, value) => {
    return {name, value}
  };

  const init = function() {
    _cacheDom()
    _bindEvents()
  }

  const _cacheDom = function() {
    button1 = document.getElementById('button1')
    button2 = document.getElementById('button2')
    player1Input = document.getElementById('player1')
    player2Input = document.getElementById('player2')
    display = document.getElementById('display')
  }

  const _bindEvents = function() {
    button1.addEventListener('click', _addPlayer1)
    button2.addEventListener('click', _addPlayer2)
  }

  const _addPlayer1 = function() {
    players.push(_playerFactory(player1Input.value, 1))
    _render(`Welcome ${player1Input.value}!`)
    console.log(players)
  }

  const _addPlayer2 = function() {
    players.push(_playerFactory(player2Input.value, 2))
    _render(`Welcome ${player2Input.value}!`)
    console.log(players)
  }

  const _render = function(text) {
    display.textContent = text
  }

  return {init, players}

})();

playerModule.init()

// -----------------------------------------------

const gameBoardModule = (function() {

  let gameBoard = []

  const _pieceFactory = function(value) {
    return {value}
  }

  const init = function() {
    _cacheDom()
    _render()
  }

  const _cacheDom = function() {
    board = document.querySelector('.game-board')
  }

  const _addPiece = function() {
    createDiv = document.createElement('div')
    createDiv.classList.add('game-piece-box')
  }

  const _setDataAttribute = function(x) {
    createDiv.setAttribute('num', x)
  }

  const _render = function() {
    for (let x = 0; x <= 8; x++) {
      _addPiece()
      _setDataAttribute(x)
      board.appendChild(createDiv)
      gameBoard.push(_pieceFactory(x))
    }
  }

  console.log(gameBoard)
  return {init, gameBoard}

})();

gameBoardModule.init()