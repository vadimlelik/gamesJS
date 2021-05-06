let $start = document.querySelector('#start');
let $game = document.querySelector('#game');
let $time = document.querySelector('#time');
let $result = document.querySelector('#result');
let $timeHeader = document.querySelector('#time-header');
let $resultHeader = document.querySelector('#result-header');
let $gameTime = document.querySelector('#game-time')

let isGameStarted = false

let score = 0


$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTime)


let colors = [ '#DFFF00','#FFBF00','#FF7F50','#DE3163','#9FE2BF','#40E0D0','#6495ED','#CCCCFF']


function startGame() {
  
  score = 0 
  setGameTime()
  $gameTime.setAttribute('disabled','true')
  $timeHeader.classList.remove('hide')
  $resultHeader.classList.add('hide')
  isGameStarted = true
  $start.classList.add('hide')
  $game.style.backgroundColor = '#fff'


  let interval = setInterval(function () {
    let time = parseFloat($time.textContent)

    if (time <= 0) {

      clearInterval(interval)
      endGame()

    } else {
      $time.textContent = (time - 0.1).toFixed(1)
    }


  }, 100)

  renderBox()
}

function setGemeScore(){
  $result.textContent = score.toString()
}
function setGameTime (){
  var time = +$gameTime.value
  $time.textContent = time.toFixed(1)
}
function endGame() {
  isGameStarted = false
  setGemeScore()
  $gameTime.removeAttribute('disabled')
  $start.classList.remove('hide')
  $game.innerHTML = ''
  $game.style.backgroundColor = '#ccc'
  $timeHeader.classList.add('hide')
  $resultHeader.classList.remove('hide')
  
}

function handleBoxClick(event) {

  if(!isGameStarted){
    return
  }

  if (event.target.dataset.box) {
    score++
    renderBox()
  }

}

function renderBox() {
  $game.innerHTML = '';
  let box = document.createElement('div')
  let boxSize = getRandom(30, 100)
  let gemeSize = $game.getBoundingClientRect()
  let maxTop = gemeSize.height - boxSize
  let maxLeft = gemeSize.width - boxSize
  let randomColorIndex = getRandom(0,colors.length)

  box.style.backgroundColor = colors[randomColorIndex]

  box.style.width = box.style.height = boxSize + 'px'
  box.style.position = 'absolute'
  box.style.top = getRandom(0, maxTop) + 'px'
  box.style.left = getRandom(0, maxLeft) + 'px'
  box.style.cursor = 'pointer'

  box.setAttribute('data-box', true)

  $game.insertAdjacentElement('afterbegin', box)
}


function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}
