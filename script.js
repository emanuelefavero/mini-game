// DECLARE const
const canvas = document.querySelector('#canvas');
const player = document.querySelector('#player');
const enemy = document.querySelector('#enemy');
const playButton = document.querySelector('#playButton');
const gameOverText = document.querySelector('.game-over-text');
const howToText = document.querySelector('.how-to-text');
const scoreText = document.querySelector('.score-text');

// DECLARE let
// Player
let moveUpDown = 0;
let moveLeftRight = 0;
// Enemy
let moveDown = 0;
let randomizePosition = Math.floor(Math.random() * 300);
let moveDownSpeed = 100;

let score = 0;

playButton.addEventListener('click', playGame);

function playGame() {
    playButton.style.display = 'none';
    howToText.style.display = 'none';

    // MOVE ENEMY
    // randomize enemy position
    enemy.style.marginLeft = randomizePosition + 'px';

    function moveEnemyDown() {
        moveDown += 10;
        enemy.style.marginTop = moveDown + 'px';
        // CHECK IF ENEMY IS OUT OF CANVAS (BOTTOM)
        if (moveDown >= 400) {
            moveDown = 0;
            randomizePosition = Math.floor(Math.random() * 300);
            enemy.style.marginLeft = randomizePosition + 'px';
        }
    }

    let moveEnemy = setInterval(moveEnemyDown, moveDownSpeed);

    // INCREASE ENEMY speed
    setInterval(() => {
        clearInterval(moveEnemy);
        moveDownSpeed = moveDownSpeed / 1.02;
        setInterval(moveEnemyDown, moveDownSpeed);
    }, 10000);

    // ARROW KEYS EVENT LISTENER
    window.addEventListener("keydown", event => {
        if (event.keyCode === 38) {

            // MOVE PLAYER UP
            moveUpDown += 30;
            player.style.marginBottom = moveUpDown + 'px';

            // STOP PLAYER FROM GOING OUT OF CANVAS (TOP)
            if (moveUpDown >= 300) {
                moveUpDown = 300 - 30;
            }

        }
        if (event.keyCode === 39) {

            // MOVE PLAYER RIGHT
            moveLeftRight += 30;
            player.style.marginLeft = moveLeftRight + 'px';

            // STOP PLAYER FROM GOING OUT OF CANVAS (RIGHT)
            if (moveLeftRight >= 150) {
                moveLeftRight = 160 - 20;
            }

        }
        if (event.keyCode === 40) {

            // MOVE PLAYER DOWN
            moveUpDown -= 30;
            player.style.marginBottom = moveUpDown + 'px';

            // STOP PLAYER FROM GOING OUT OF CANVAS (BOTTOM)
            if (moveUpDown <= 0) {
                moveUpDown = 0;
            }
        }
        if (event.keyCode === 37) {

            // MOVE PLAYER LEFT
            moveLeftRight -= 30;
            player.style.marginLeft = moveLeftRight + 'px';

            // STOP PLAYER FROM GOING OUT OF CANVAS (LEFT)
            if (moveLeftRight <= -150) {
                moveLeftRight = -150 + 20;
            }

        }


    });

    // MOBILE SWIPE EVENTS
    // TOUCH HANDLEr EVENTS CODE
    (function(d) {
        var
            ce = function(e, n) {
                var a = document.createEvent("CustomEvent");
                a.initCustomEvent(n, true, true, e.target);
                e.target.dispatchEvent(a);
                a = null;
                return false
            },
            nm = true,
            sp = {
                x: 0,
                y: 0
            },
            ep = {
                x: 0,
                y: 0
            },
            touch = {
                touchstart: function(e) {
                    sp = {
                        x: e.touches[0].pageX,
                        y: e.touches[0].pageY
                    }
                },
                touchmove: function(e) {
                    nm = false;
                    ep = {
                        x: e.touches[0].pageX,
                        y: e.touches[0].pageY
                    }
                },
                touchend: function(e) {
                    if (nm) {
                        ce(e, 'fc')
                    } else {
                        var x = ep.x - sp.x,
                            xr = Math.abs(x),
                            y = ep.y - sp.y,
                            yr = Math.abs(y);
                        if (Math.max(xr, yr) > 20) {
                            ce(e, (xr > yr ? (x < 0 ? 'swl' : 'swr') : (y < 0 ? 'swu' : 'swd')))
                        }
                    };
                    nm = true
                },
                touchcancel: function(e) {
                    nm = false
                }
            };
        for (var a in touch) {
            d.addEventListener(a, touch[a], false);
        }
    })(document);

    // SWIPE UP
    document.body.addEventListener('swu', () => {
        // MOVE PLAYER UP
        moveUpDown += 80;
        player.style.marginBottom = moveUpDown + 'px';

        // STOP PLAYER FROM GOING OUT OF CANVAS (TOP)
        if (moveUpDown >= 280) {
            // alert(moveUpDown);
            moveUpDown = 300 - 80;
        }
    }, false);
    // SWIPE RIGHT
    document.body.addEventListener('swr', () => {
        // MOVE PLAYER RIGHT
        moveLeftRight += 80;
        player.style.marginLeft = moveLeftRight + 'px';

        // STOP PLAYER FROM GOING OUT OF CANVAS (RIGHT)
        if (moveLeftRight >= 160) {
            // alert(moveLeftRight);
            moveLeftRight = 160 - 80;
        }
    }, false);
    // SWIPE DOWN
    document.body.addEventListener('swd', () => {
        // MOVE PLAYER DOWN
        if (moveUpDown > 0) {
            moveUpDown -= 80;
            player.style.marginBottom = moveUpDown + 'px';
            // STOP PLAYER FROM GOING OUT OF CANVAS (BOTTOM)
            if (moveUpDown <= - 0) {
                moveUpDown = 0;
            }
        }
    }, false);
    // SWIPE LEFT
    document.body.addEventListener('swl', () => {
        // MOVE PLAYER LEFT
        moveLeftRight -= 80;
        player.style.marginLeft = moveLeftRight + 'px';

        // STOP PLAYER FROM GOING OUT OF CANVAS (LEFT)
        if (moveLeftRight <= -150) {
            moveLeftRight = -150 + 80;
        }
    }, false);

    // SCORE
    let scoreInterval = setInterval(() => {
        score += 1;
        scoreText.textContent = score;
    }, 200);

    // GAME OVER
    setInterval(() => {
        const playerLeft = player.offsetLeft;
        const enemyLeft = enemy.offsetLeft;
        const playerTop = player.offsetTop;
        const enemyTop = enemy.offsetTop;

        distanceLeftRight = playerLeft - enemyLeft;
        distanceTopBottom = playerTop - enemyTop;

        if (distanceLeftRight <= 60 && distanceLeftRight >= -10 && distanceTopBottom <= 10 && distanceTopBottom >= -10) {

            clearInterval(scoreInterval);
            player.style.width = 0 + 'px';
            player.style.height = 0 + 'px';
            enemy.style.display = 'none';
            gameOverText.style.display = 'block';

            console.log(score);

            setTimeout(() => {
                location.reload();
            }, 2000);
        }
    }, 8);
}
