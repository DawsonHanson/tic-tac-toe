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
    console.log(playerModule.players)
  }

  const _addPlayer2 = function() {
    players.push(_playerFactory(player2Input.value, 2))
    _render(`Welcome ${player2Input.value}!`)
    console.log(playerModule.players)
  }

  const _render = function(text) {
    display.textContent = text
  }

  return {init, players}

})();

playerModule.init()