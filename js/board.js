var player = {
    player1: {
        step: 0,
        life: 3,
        status: 1,
        character: 0
    },
    player2: {
        step: 0,
        life: 3,
        status: 1,
        character: 0
    },
    player3: {
        step: 0,
        life: 3,
        status: 0,
        character: 0
    },
    player4: {
        step: 0,
        life: 3,
        status: 0,
        character: 0
    },
};
function gameStart(num) {
    turn = "player1";
    if (num.innerHTML === "3 Player") {
        player.player3.status = 1;
        document.getElementById("player3").style.display = 'inline-block';
    } else if (num.innerText === "4 Player") {
        player.player3.status = 1;
        document.getElementById("player3").style.display = 'inline-block';
        player.player4.status = 1;
        document.getElementById("player4").style.display = 'inline-block';
    }
    document.getElementById("selectPlayer").style.display = 'none';
    document.querySelector('game').style.display = 'inline-block';
    document.getElementById("player1_life").innerText = player.player1.life;
    document.getElementById("player2_life").innerText = player.player2.life;
    document.getElementById("player3_life").innerText = player.player3.life;
    document.getElementById("player4_life").innerText = player.player4.life;
    console.log(player);
    b1 = document.getElementById('b1');
    turnStart()

}


function turnStart() {
    document.getElementById("theTurn").innerText = turn.toLocaleUpperCase() + "\'s Turn";
    thePlayer = document.getElementById(turn);
}

function turnEnd() {
    if (turn === "player1") {
        thePlayer.setAttribute("animate", "0");
        turn = "player2";
    } else if (turn === "player2" && player.player3.status === 1) {
        thePlayer.setAttribute("animate", "0");
        turn = "player3";
    } else if (turn === "player3" && player.player4.status === 1) {
        thePlayer.setAttribute("animate", "0");
        turn = "player4";
    } else {
        thePlayer.setAttribute("animate", "0");
        turn = "player1";
    }
    setTimeout(function () {
        turnStart();
    }, 1000);
}

function diceFunction() {
    if (fighting === 0) {
        dice1 = Math.floor(Math.random() * 6) + 1;
        dice2 = Math.floor(Math.random() * 6) + 1;
        theDice1 = document.getElementById("theDice1");
        theDice2 = document.getElementById("theDice2");
        theDice1.setAttribute("score", "0");
        theDice2.setAttribute("score", "0");
        setTimeout(function () {
            theDice1.setAttribute("score", dice1);
            theDice2.setAttribute("score", dice2);
            moveCounter(dice1 + dice2)
        }, 1300);
    }
}

function moveCounter(move) {
    start = player[turn].step;
    end = start + move;
    moveFunction(start, end)
}

function moveFunction(start, end) {
    start++;
    setTimeout(function () {
        // console.log(start);
        thePlayer.setAttribute("step", start);
        if (start < end) {
            moveFunction(start, end);
        } else {
            player[turn].step = end;
            for (var p in player) {
                if (player[turn].step === player[p].step && turn !== p && player[turn].step != 1) {
                    battle2.innerText = p;
                    fighting = 1
                }
            }
            if (fighting == 1) {
                battle1.style.width = '0px';
                battle1.style.background = document.getElementById(turn).getAttribute("color");
                battle2.style.width = '0px';
                battle2.style.background = document.getElementById(battle2.innerText).getAttribute("color");
                document.getElementById('theBattle').style.display = 'inline-block';
                battle1.innerText = turn;
            } else {
                turnEnd();
            }
        }
    }, 150);

}

function reverseCounter() {
    var reverse = player[loser].step - 5;
    if (reverse < 1) {
        reverse = 1;
    }
    moveReverse(reverse);
}

function moveReverse(reverse) {
    if (player[loser].step != 1) {
        player[loser].step--;
    }
    theLoser = document.getElementById(loser);
    setTimeout(function () {
        theLoser.setAttribute("step", player[loser].step);
        if (player[loser].step > reverse) {
            moveReverse(reverse)
        } else {
            for (var p in player) {
                if (player[loser].step === player[p].step && loser !== p && player[turn].step != 1) {
                    battle1.innerText = p;
                    fighting = 1
                }
            }
            if (fighting === 1) {
                battle1.style.width = '0px';
                battle1.style.background = document.getElementById(loser).getAttribute("color");
                battle2.style.width = '0px';
                battle2.style.background = document.getElementById(battle2.innerText).getAttribute("color");
                document.getElementById('theBattle').style.display = 'inline-block';
                battle1.innerText = loser;
            } else {
                turnEnd();
            }
        }
    }, 150);
}

function updateLife(noob) {
    document.getElementById(noob + "_life").innerText = player[noob].life;
}

var battle1 = document.getElementById('battle1');
var battle1Bar = 0;
var battle2 = document.getElementById('battle2');
var battle2Bar = 0;
var fighting = 0;
var loser = '';

document.body.onkeyup = function (e) {
    if (e.code === "KeyA" && fighting == 1) {
        battle1Bar += 8;
        if (battle1Bar >= 260) {
            fighting = 0;
            battle1.style.width = '256px';
            win.innerText = battle1.innerText + " Win";
            loser = battle2.innerText;
            player[loser].life -= 1;
            updateLife(loser);
            battle1Bar = 0;
            battle2Bar = 0;
            battle1.style.width = '0px';
            battle2.style.width = '0px';
            document.getElementById('theBattle').style.display = 'none';
            setTimeout(function () {
                win.style.display = 'none';
                reverseCounter()
            }, 1300);
        } else {
            battle1.style.width = battle1Bar + 'px';
        }
    } else if (e.code === "KeyL" && fighting == 1) {
        battle2Bar += 8;
        if (battle2Bar >= 260) {
            fighting = 0;
            battle2.style.width = '256px';
            win.innerText = battle2.innerText + " Win";
            loser = battle1.innerText;
            player[loser].life -= 1;
            updateLife(loser);
            battle1Bar = 0;
            battle2Bar = 0;
            document.getElementById('theBattle').style.display = 'none';
            setTimeout(function () {
                win.style.display = 'none';
                reverseCounter()
            }, 1500);
        } else {
            battle2.style.width = battle2Bar + 'px';
        }

    }
};