// DECLARE const
const canvas = document.querySelector('#canvas')
const player = document.querySelector('#player')
const enemy = document.querySelector('#enemy')
const playButton = document.querySelector('#playButton')
const gameOverText = document.querySelector('.game-over-text')
const howToText = document.querySelector('.how-to-text')
const scoreText = document.querySelector('.score-text')

// DECLARE let
// Player
// let moveUpDown = 0
let moveLeftRight = 0
// Enemy
let moveDown = 0
let randomizePosition = Math.floor(Math.random() * 300)
let moveDownSpeed = 40
let score = 0

// PLAY GAME
let gamePlaying = false

playButton.addEventListener('click', () => {
  playGame()
  gamePlaying = true
})

// Play Game if user press space bar or enter key
window.addEventListener('keydown', (event) => {
  if (!gamePlaying) {
    if (event.key === ' ' || event.key === 'Enter') {
      playGame()
      gamePlaying = true
    }
  }
})

function playGame() {
  playButton.style.display = 'none'
  howToText.style.display = 'none'

  // MOVE ENEMY
  // randomize enemy position
  enemy.style.marginLeft = randomizePosition + 'px'

  function moveEnemyDown() {
    moveDown += 10
    enemy.style.marginTop = moveDown + 'px'
    // CHECK IF ENEMY IS OUT OF CANVAS (BOTTOM)
    if (moveDown >= 400) {
      moveDown = 0
      randomizePosition = Math.floor(Math.random() * 300)
      enemy.style.marginLeft = randomizePosition + 'px'
    }
  }

  let moveEnemy = setInterval(moveEnemyDown, moveDownSpeed)

  // INCREASE ENEMY SPEED
  setInterval(() => {
    moveDownSpeed -= 2

    // max speed
    if (moveDownSpeed <= 14) {
      moveDownSpeed = 14
    }
    clearInterval(moveEnemy)
    moveEnemy = setInterval(moveEnemyDown, moveDownSpeed)
  }, 5000)

  // ARROW KEYS EVENT LISTENER
  window.addEventListener('keydown', (event) => {
    // if (event.key === 'ArrowUp') {
    //   // MOVE PLAYER UP
    //   moveUpDown += 30
    //   player.style.marginBottom = moveUpDown + 'px'

    //   // STOP PLAYER FROM GOING OUT OF CANVAS (TOP)
    //   if (moveUpDown >= 300) {
    //     moveUpDown = 300 - 30
    //   }
    // }
    if (event.key === 'ArrowRight') {
      // MOVE PLAYER RIGHT
      moveLeftRight += 30
      player.style.marginLeft = moveLeftRight + 'px'

      // STOP PLAYER FROM GOING OUT OF CANVAS (RIGHT)
      if (moveLeftRight >= 150) {
        moveLeftRight = 160 - 20
      }
    }
    // if (event.key === 'ArrowDown') {
    //   // MOVE PLAYER DOWN
    //   moveUpDown -= 30
    //   player.style.marginBottom = moveUpDown + 'px'

    //   // STOP PLAYER FROM GOING OUT OF CANVAS (BOTTOM)
    //   if (moveUpDown <= 0) {
    //     moveUpDown = 0
    //   }
    // }
    if (event.key === 'ArrowLeft') {
      // MOVE PLAYER LEFT
      moveLeftRight -= 30
      player.style.marginLeft = moveLeftRight + 'px'

      // STOP PLAYER FROM GOING OUT OF CANVAS (LEFT)
      if (moveLeftRight <= -150) {
        moveLeftRight = -150 + 20
      }
    }
  })

  // MOBILE SWIPE EVENTS
  // TOUCH HANDLER EVENTS CODE
  ;(function (d) {
    var ce = function (e, n) {
        var a = new CustomEvent(n, {
          bubbles: true,
          cancelable: true,
          detail: e.target,
        })
        e.target.dispatchEvent(a)
        a = null
        return false
      },
      nm = true,
      sp = {
        x: 0,
        y: 0,
      },
      ep = {
        x: 0,
        y: 0,
      },
      touch = {
        touchstart: function (e) {
          sp = {
            x: e.touches[0].pageX,
            y: e.touches[0].pageY,
          }
        },
        touchmove: function (e) {
          nm = false
          ep = {
            x: e.touches[0].pageX,
            y: e.touches[0].pageY,
          }
        },
        touchend: function (e) {
          if (nm) {
            ce(e, 'fc')
          } else {
            var x = ep.x - sp.x,
              xr = Math.abs(x)
            if (xr > 20) {
              ce(e, x < 0 ? 'swl' : 'swr')
            }
          }
          nm = true
        },
        touchcancel: function (e) {
          nm = false
        },
      }
    for (var a in touch) {
      d.addEventListener(a, touch[a], false)
    }
  })(document)

  // SWIPE UP
  // document.body.addEventListener(
  //   'swu',
  //   () => {
  //     // MOVE PLAYER UP
  //     moveUpDown += 80
  //     player.style.marginBottom = moveUpDown + 'px'

  //     // STOP PLAYER FROM GOING OUT OF CANVAS (TOP)
  //     if (moveUpDown >= 280) {
  //       // alert(moveUpDown);
  //       moveUpDown = 300 - 80
  //     }
  //   },
  //   false
  // )
  // SWIPE RIGHT
  document.body.addEventListener(
    'swr',
    () => {
      // MOVE PLAYER RIGHT
      moveLeftRight += 80
      player.style.marginLeft = moveLeftRight + 'px'

      // STOP PLAYER FROM GOING OUT OF CANVAS (RIGHT)
      if (moveLeftRight >= 160) {
        // alert(moveLeftRight);
        moveLeftRight = 160 - 80
      }
    },
    false
  )
  // SWIPE DOWN
  // document.body.addEventListener(
  //   'swd',
  //   () => {
  //     // MOVE PLAYER DOWN
  //     if (moveUpDown > 0) {
  //       moveUpDown -= 80
  //       player.style.marginBottom = moveUpDown + 'px'
  //       // STOP PLAYER FROM GOING OUT OF CANVAS (BOTTOM)
  //       if (moveUpDown <= -0) {
  //         moveUpDown = 0
  //       }
  //     }
  //   },
  //   false
  // )
  // SWIPE LEFT
  document.body.addEventListener(
    'swl',
    () => {
      // MOVE PLAYER LEFT
      moveLeftRight -= 80
      player.style.marginLeft = moveLeftRight + 'px'

      // STOP PLAYER FROM GOING OUT OF CANVAS (LEFT)
      if (moveLeftRight <= -150) {
        moveLeftRight = -150 + 80
      }
    },
    false
  )

  // SCORE
  let scoreInterval = setInterval(() => {
    score += 1
    scoreText.textContent = score
  }, 200)

  // GAME OVER
  setInterval(() => {
    const playerLeft = player.offsetLeft
    const enemyLeft = enemy.offsetLeft
    const playerTop = player.offsetTop
    const enemyTop = enemy.offsetTop

    distanceLeftRight = playerLeft - enemyLeft
    distanceTopBottom = playerTop - enemyTop

    if (
      distanceLeftRight <= 60 &&
      distanceLeftRight >= -10 &&
      distanceTopBottom <= 10 &&
      distanceTopBottom >= -10
    ) {
      clearInterval(scoreInterval)
      player.style.width = 0 + 'px'
      player.style.height = 0 + 'px'
      enemy.style.display = 'none'
      gameOverText.style.display = 'block'

      console.log(score)

      setTimeout(() => {
        location.reload()
      }, 3000)
    }
  }, 8)
}
