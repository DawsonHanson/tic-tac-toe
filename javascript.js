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
    button1.addEventListener('click', _addPlayer1, {once: true})
    button2.addEventListener('click', _addPlayer2, {once: true})
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

  console.log(gameBoard)
  return {init, gameBoard}

})();

gameBoardModule.init()

// --------------------------------------------------

const gameModule = (function() {

  const gBArray = gameBoardModule.gameBoard
  const pMArray = playerModule.players

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
    start.addEventListener('click',_startGame)
    // _restartGame()
  }

  const _startGame = function() {
    if (pMArray.length == 2) {
      _xoEvents()
      _render('May the odds be ever in your favor')
    } else {
      _render('Please create both players')
    }
  }

  const _restartGame = function() {

  }

  const _render = function(text) {
    display.textContent = text
  }

  const _xoEvents = function() {
    pieces.forEach(piece => {
      value = 1
      piece.addEventListener('click', () => {
        currentState = piece.getAttribute('state')
        currentNum = piece.getAttribute('num')
        if (value == 1 && currentState != 1 && currentState != 2) {
          piece.classList.add('red')
          piece.setAttribute('state', 1)
          _changeArrayState(currentNum, value)
          value = 2
          _checkWinState()
        } else if (value == 2 && currentState != 1 && currentState != 2) {
          piece.classList.add('blue')
          piece.setAttribute('state', 2)
          _changeArrayState(currentNum, value)
          value = 1
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
      _winMsg(1)
    } else if (gBArray[0].state == 2 && gBArray[1].state == 2 && gBArray[2].state == 2
      || gBArray[3].state == 2 && gBArray[4].state == 2 && gBArray[5].state == 2
      || gBArray[6].state == 2 && gBArray[7].state == 2 && gBArray[8].state == 2
      || gBArray[0].state == 2 && gBArray[3].state == 2 && gBArray[6].state == 2
      || gBArray[1].state == 2 && gBArray[4].state == 2 && gBArray[7].state == 2
      || gBArray[2].state == 2 && gBArray[5].state == 2 && gBArray[8].state == 2
      || gBArray[0].state == 2 && gBArray[4].state == 2 && gBArray[8].state == 2
      || gBArray[2].state == 2 && gBArray[4].state == 2 && gBArray[6].state == 2){
      _winMsg(2)
      } else {
        return;
      }
  }

  const _winMsg = function(x) {
    arrayItem = pMArray.findIndex((obj => obj.value == x))
    _render(`Congratulations ${pMArray[arrayItem].name} you've won!`)
  }

  return {init}

})();

gameModule.init()