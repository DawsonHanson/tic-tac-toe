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

  const _render = function() {
    for (let x = 0; x <= 8; x++) {
      _addPiece()
      _setDataAttribute(x)
      board.appendChild(createDiv)
      gameBoard.push(_pieceFactory(x))
    }
  }

  const _addPiece = function() {
    createDiv = document.createElement('div')
    createDiv.classList.add('game-piece-box')
  }

  const _setDataAttribute = function(x) {
    createDiv.setAttribute('num', x)
    createDiv.setAttribute('state', 0)
  }

  console.log(gameBoard)
  return {init, gameBoard}

})();

gameBoardModule.init()

// --------------------------------------------------

const gameModule = (function() {

  const init = function() {
    _cacheDom()
    _bindEvents()
  }

  const _cacheDom = function() {
    pieces = document.querySelectorAll('.game-piece-box')
    start = document.getElementById('start') 
    restart = document.getElementById('restart')
    display = document.getElementById('display')
  }

  const _bindEvents = function() {
    _xoEvents()
    // _startGame()
    // _restartGame()
  }

  const _xoEvents = function() {
    pieces.forEach(piece => {
      value = 1
      piece.addEventListener('click', () => {
        currentState = piece.getAttribute('state')
        if (value == 1 && currentState != 1 && currentState != 2) {
          piece.classList.add('red')
          piece.setAttribute('state', 1)
          value = 2
        } else if (value == 2 && currentState != 1 && currentState != 2) {
          piece.classList.add('blue')
          piece.setAttribute('state', 2)
          value = 1
        } else {
          return;
        }
      })
    });
  }

  const _startGame = function() {
    // will fire _xoEvents()
  }

  const _restartGame = function() {

  }

  const _render = function() {
    // for display work
  }

  return {init}

})();

gameModule.init()