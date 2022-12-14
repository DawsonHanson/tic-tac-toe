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
    if (player1Input.value > '') {
    players.push(_playerFactory(player1Input.value, 1))
    _render(`Welcome ${player1Input.value}!`)
    button1.removeEventListener('click',_addPlayer1)
    } else {
      _render('Please add text to name field')
    }
  }

  const _addPlayer2 = function() {
    if (player2Input.value > '') {
    players.push(_playerFactory(player2Input.value, 2))
    _render(`Welcome ${player2Input.value}!`)
    button2.removeEventListener('click',_addPlayer2)
    } else {
      _render('Please add text to name field')
    }
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

  const _pieceFactory = function(num, state) {
    return {num, state}
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
      gameBoard.push(_pieceFactory(x, 0))
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

  return {init, gameBoard}

})();

gameBoardModule.init()

// --------------------------------------------------

const gameModule = (function() {

  const gBArray = gameBoardModule.gameBoard
  const pMArray = playerModule.players
  let marker = 0

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
    start.addEventListener('click', _startGame)
    restart.addEventListener('click', _restartGame)
  }

  const _startGame = function() {
    if (pMArray.length == 2) {
      _xoEvents(1)
      _render('May the odds be ever in your favor!')
      start.removeEventListener('click', _startGame)
      setTimeout(_timeOutMsg, 2000)
      marker = 1
    } else {
      _render('Please create both players')
    }
  }

  const _restartGame = function() {
    if (marker == 1) {
      pieces.forEach(piece => {
        piece.setAttribute('state', 0)
        piece.classList.remove('x-img')
        piece.classList.remove('o-img')
      })
      gBArray.forEach(element => {
        element.state = 0
      })
      _xoEvents(1)
      _render(`If at first you don't succeed, try try again!`)
      setTimeout(_timeOutMsg, 2000)
    }
  }

  const _timeOutMsg = function() {
    player1 = pMArray.findIndex((obj => obj.value == 1))
    _render(`${pMArray[player1].name}'s turn`)
  }

  const _render = function(text) {
    display.textContent = text
  }

  const _xoEvents = function(x) {
    player1 = pMArray.findIndex((obj => obj.value == 1))
    player2 = pMArray.findIndex((obj => obj.value == 2))
    pieces.forEach(piece => {
      value = x
      piece.addEventListener('click', () => {
        currentState = piece.getAttribute('state')
        currentNum = piece.getAttribute('num')
        if (value == 1 && currentState != 1 && currentState != 2) {
          piece.classList.add('x-img')
          piece.setAttribute('state', 1)
          _changeArrayState(currentNum, value)
          value = 2
          _render(`${pMArray[player2].name}'s turn`)
          _checkWinState()
        } else if (value == 2 && currentState != 1 && currentState != 2) {
          piece.classList.add('o-img')
          piece.setAttribute('state', 2)
          _changeArrayState(currentNum, value)
          value = 1
          _render(`${pMArray[player1].name}'s turn`)
          _checkWinState()
        } else {
          return;
        }
      })
    });
  }

  const _changeArrayState = function(x, y) {
    arrayItem = gBArray.findIndex((obj => obj.num == x))
    gBArray[arrayItem].state = y
  }

  const _checkWinState = function() {
    if (gBArray[0].state == 1 && gBArray[1].state == 1 && gBArray[2].state == 1
      || gBArray[3].state == 1 && gBArray[4].state == 1 && gBArray[5].state == 1
      || gBArray[6].state == 1 && gBArray[7].state == 1 && gBArray[8].state == 1
      || gBArray[0].state == 1 && gBArray[3].state == 1 && gBArray[6].state == 1
      || gBArray[1].state == 1 && gBArray[4].state == 1 && gBArray[7].state == 1
      || gBArray[2].state == 1 && gBArray[5].state == 1 && gBArray[8].state == 1
      || gBArray[0].state == 1 && gBArray[4].state == 1 && gBArray[8].state == 1
      || gBArray[2].state == 1 && gBArray[4].state == 1 && gBArray[6].state == 1){
        _render(`Congratulations ${pMArray[player1].name}, you've won!`)

    } else if (gBArray[0].state == 2 && gBArray[1].state == 2 && gBArray[2].state == 2
      || gBArray[3].state == 2 && gBArray[4].state == 2 && gBArray[5].state == 2
      || gBArray[6].state == 2 && gBArray[7].state == 2 && gBArray[8].state == 2
      || gBArray[0].state == 2 && gBArray[3].state == 2 && gBArray[6].state == 2
      || gBArray[1].state == 2 && gBArray[4].state == 2 && gBArray[7].state == 2
      || gBArray[2].state == 2 && gBArray[5].state == 2 && gBArray[8].state == 2
      || gBArray[0].state == 2 && gBArray[4].state == 2 && gBArray[8].state == 2
      || gBArray[2].state == 2 && gBArray[4].state == 2 && gBArray[6].state == 2){
        _render(`Congratulations ${pMArray[player2].name}, you've won!`)

      } else {
        return;
      }
  }

  return {init}

})();

gameModule.init()