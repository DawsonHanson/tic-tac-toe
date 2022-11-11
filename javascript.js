console.log('Test!');

const playerFactory = (name) => {
  return {name}
};

(function() {

  let test = {
    players: [],

    init: function() {
      this.cacheDom()
      this.bindEvents()
    },

    cacheDom: function() {
      button1 = document.getElementById('button1')
      button2 = document.getElementById('button2')
      player1Input = document.getElementById('player1')
      player2Input = document.getElementById('player2')
      display = document.getElementById('display')
    },

    bindEvents: function() {
      button1.addEventListener('click', this.addPlayer1.bind(this))
      button2.addEventListener('click', this.addPlayer2.bind(this))
    },

    addPlayer1: function() {
      this.players.push(playerFactory(player1Input.value))
      this.render(`Welcome ${player1Input.value}!`)
      console.log(this.players)
    },

    addPlayer2: function() {
      this.players.push(playerFactory(player2Input.value))
      this.render(`Welcome ${player2Input.value}!`)
      console.log(this.players)
    },

    render: function(text) {
      display.textContent = text
    },

  };

  test.init();

})()

