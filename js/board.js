// var player = {
//     player1: {
//         step: 0,
//         life: 3,
//         status: 1,
//         character: 0
//     },
//     player2: {
//         step: 0,
//         life: 3,
//         status: 1,
//         character: 0
//     },
//     player3: {
//         step: 0,
//         life: 3,
//         status: 0,
//         character: 0
//     },
//     player4: {
//         step: 0,
//         life: 3,
//         status: 0,
//         character: 0
//     },
// };

var eventBox = [4,5,9,10,12,13,14,16,17,19,20,24,27,30,33,35,37,40,41,43,45,47,48,51,52,57,58];

function gameStart() {
    scrollTo(0,0);
    turn = "player1";
    for(let c in player){
        if(player[c].status == 1){
            p = document.getElementById(c);
            p.style.display = 'inline-block';
            p.setAttribute('character', player[c].character)
        }
    }
    document.querySelector('game').style.display = 'inline-block';
    document.querySelector('#select').style.display = 'none';
    document.getElementById("player1_life").innerText = player.player1.life;
    document.getElementById("player2_life").innerText = player.player2.life;
    document.getElementById("player3_life").innerText = player.player3.life;
    document.getElementById("player4_life").innerText = player.player4.life;
    console.log(player);
    turnStart()

}


function turnStart() {
    // document.getElementById("theTurn").innerText = turn.toLocaleUpperCase() + "\'s Turn";
    thePlayer = document.getElementById(turn);
}

function turnEnd() {
    if (turn === "player1") {
        turn = "player2";
    } else if (turn === "player2" && player.player3.status === 1) {
        turn = "player3";
    } else if (turn === "player3" && player.player4.status === 1) {
        turn = "player4";
    } else {
        turn = "player1";
    }
    setTimeout(function () {
        checkDisplay(player[turn].step, "end");
        turnStart();
    }, 700);
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
            moveCounter(dice1 + dice2, turn)
        }, 1300);
    }
}

function moveCounter(move, mover) {
    start = player[mover].step;
    end = start + move;
    moveFunction(start, end, mover)
}

function moveFunction(start, end, mover) {
    start++;
    setTimeout(function () {
        // console.log(start);
        document.querySelector("#"+mover).setAttribute("step", start);
        checkDisplay(start, "move");
        setTimeout(()=>{
            if(start == 59){
                alert(turn+" is Winner");
            }
        }, 1000)
        if (start < end) {
            moveFunction(start, end, mover);
        } else {
            player[mover].step = end;
            for (let p in player) {
                if (player[mover].step === player[p].step && mover !== p && player[mover].step != 1) {
                    battle2.innerText = p;
                    fighting = 1
                }
            }
            if (fighting == 1) {
                battle1.style.width = '0px';
                battle1.style.background = document.getElementById(mover).getAttribute("color");
                battle2.style.width = '0px';
                battle2.style.background = document.getElementById(battle2.innerText).getAttribute("color");
                document.getElementById('theBattle').style.display = 'inline-block';
                battle1.innerText = mover;
            } else if (eventBox.indexOf(player[mover].step) != -1) {
                eventFunction(mover);
            } else {
                turnEnd();
            }
        }
    }, 150);

}

function reverseCounter(back, mover) {
    var reverse = player[mover].step - back;
    if (reverse < 1) {
        reverse = 1;
    }
    moveReverse(reverse, mover);
}

function moveReverse(reverse, mover) {
    if (player[mover].step != 0) {
        player[mover].step--;
    }
    checkDisplay(start, "move");
    theLoser = document.getElementById(mover);
    setTimeout(function () {
        theLoser.setAttribute("step", player[mover].step);
        if (player[mover].step > reverse) {
            moveReverse(reverse, mover)
        } else {
            for (var p in player) {
                if (player[mover].step === player[p].step && mover !== p && player[mover].step != 1) {
                    battle1.innerText = p;
                    fighting = 1
                }
            }
            if (fighting === 1) {
                battle1.style.width = '0px';
                battle1.style.background = document.getElementById(mover).getAttribute("color");
                battle2.style.width = '0px';
                battle2.style.background = document.getElementById(battle2.innerText).getAttribute("color");
                document.getElementById('theBattle').style.display = 'inline-block';
                battle1.innerText = mover;
            }  else if (eventBox.indexOf(player[mover].step) != -1) {
                eventFunction(mover);
            } else {
                turnEnd();
            }
        }
    }, 150);
}

function updateLife(noob) {
    document.getElementById(noob + "_life").innerText = player[noob].life;
}

function checkDisplay(check, how) {
    if (check >= 8 && check <= 21){
        scrollTo(960, 0);
    } else if (check >= 44 && check <= 53){
        scrollTo(1100, 0)
    } else if (check >= 53 || (check >= 46 && how === "end")){
        scrollTo(1390, 0)
    } else {
        scrollTo(0,0)
    }
}


var theEvent = document.querySelector("#theEvent");
function eventFunction(eventer) {
    num = Math.floor(Math.random()*27) + 1;
    console.log(num);
    theEvent.setAttribute("event", num);
    theEvent.style.display = "inline-block";
    switch (num) {
        case 1:
            setTimeout(() => {
                moveCounter(5, eventer);
                theEvent.style.display = 'none';
            }, 3000);
            break;
        case 2:
            setTimeout(() => {
                if(player[eventer].life < 5){
                    player[eventer].life += 1;
                }
                updateLife(eventer);
                theEvent.style.display = 'none';
                turnEnd();
            }, 3000);
            break;
        case 3:
            setTimeout(() => {
                moveCounter(3, eventer);
                theEvent.style.display = 'none';
            }, 3000);
            break;
        case 4:
            setTimeout(() => {
                moveCounter(1, eventer);
                theEvent.style.display = 'none';
            }, 3000);
            break;
        case 5:
            setTimeout(() => {
                reverseCounter(5, eventer);
                theEvent.style.display = 'none';
            }, 3000);
            break;
        case 6: // เพิ่มลือด 1
            setTimeout(() =>{
                if(player[eventer].life < 5){
                    player[eventer].life += 1;
                }
                updateLife(eventer);
                theEvent.style.display = 'none';
                turnEnd();
            }, 3000);
            break;
        case 7: // เเเิ่มเลือด 3
            setTimeout(() => {
                if(player[eventer].life < 5){
                    player[eventer].life += 3;
                }
                updateLife(eventer);
                theEvent.style.display = 'none';
                turnEnd();
            }, 3000);
            break;
        case 8: // ลดเลือด 3
            setTimeout(() =>{
                if(player[eventer].life < 5){
                    player[eventer].life -= 3;
                }
                updateLife(eventer);
                theEvent.style.display = 'none';
                turnEnd();
            }, 3000);
            break;
        case 9:
            setTimeout(() => {
                if(player[eventer].life < 5){
                    player[eventer].life += 1;
                }
                updateLife(eventer);
                theEvent.style.display = 'none';
                turnEnd();
            }, 3000);
            break;
        case 10:
            setTimeout(() => {
                reverseCounter(2, eventer);
                theEvent.style.display = 'none';
            }, 3000);
            break;
        case 11:
            setTimeout(() => {
                moveCounter(3, eventer);
                theEvent.style.display = 'none';
            }, 3000);
            break;
        case 12:
            setTimeout(() => {
                reverseCounter(4, eventer);
                theEvent.style.display = 'none';
            }, 3000);
            break;
        case 13:
            setTimeout(() => {
                if(player[eventer].life < 5){
                    player[eventer].life += 1;
                }
                updateLife(eventer);
                theEvent.style.display = 'none';
                turnEnd();
            }, 3000);
            break;
        case 14:
            setTimeout(() => {
                reverseCounter(2, eventer);
                theEvent.style.display = 'none';
            }, 3000);
            break;
        case 15:
            setTimeout(() => {
                if(player[eventer].life < 5){
                    player[eventer].life -= 1;
                }
                updateLife(eventer);
                theEvent.style.display = 'none';
                turnEnd();
            }, 3000);
            break;
        case 16:
            setTimeout(() => {
                if(player[eventer].life < 5){
                    player[eventer].life -= 1;
                }
                updateLife(eventer);
                theEvent.style.display = 'none';
                turnEnd();
            }, 3000);
            break;
        case 17:
            setTimeout(() => {
                if(player[eventer].life < 5){
                    player[eventer].life -= 1;
                }
                updateLife(eventer);
                theEvent.style.display = 'none';
                turnEnd();
            }, 3000);
            break;
        case 18:
            setTimeout(() => {
                if(player[eventer].life < 5){
                    player[eventer].life -= 1;
                }
                updateLife(eventer);
                theEvent.style.display = 'none';
                turnEnd();
            }, 3000);
            break;
        case 19:
            setTimeout(() => {
                if(player[eventer].life < 5){
                    player[eventer].life += 1;
                }
                updateLife(eventer);
                theEvent.style.display = 'none';
                turnEnd();
            }, 3000);
            break;
        case 20:
            setTimeout(() => {
                if(player[eventer].life < 5){
                    player[eventer].life -= 1;
                }
                updateLife(eventer);
                theEvent.style.display = 'none';
                turnEnd();
            }, 3000);
            break;
        case 21:
            setTimeout(() => {
                moveCounter(2, eventer);
                theEvent.style.display = 'none';
            }, 3000);
            break;
        case 22:
            setTimeout(() => {
                if(player[eventer].life < 5){
                    player[eventer].life -= 1;
                }
                updateLife(eventer);
                theEvent.style.display = 'none';
                turnEnd();
            }, 3000);
            break;
        case 23:
            setTimeout(() => {
                loser = turn;
                reverseCounter(4, eventer);
                theEvent.style.display = 'none';
            }, 3000);
            break;
        case 24:
            setTimeout( () => {
                theEvent.style.display = 'none';
                turnEnd();
            }, 3000);
            break;
        case 25:
            setTimeout( () => {
                theEvent.style.display = 'none';
                turnEnd();
            }, 3000);
            break;
        case 26:
            setTimeout( () => {
                theEvent.style.display = 'none';
                turnEnd();
            }, 3000);
            break;
        case 27:
            setTimeout( () => {
                theEvent.style.display = 'none';
                turnEnd();
            }, 3000);
            break;
        default:
            break;
    }
}


var battle1 = document.getElementById('battle1');
var battle1Bar = 0;
var battle2 = document.getElementById('battle2');
var battle2Bar = 0;
var fighting = 0;
var loser = '';
var winner = '';

document.body.onkeyup = function (e) {
    if (e.code === "KeyA" && fighting == 1) {
        battle1Bar += 8;
        if (battle1Bar >= 260) {
            fighting = 0;
            battle1.style.width = '256px';
            winner = document.querySelector("#"+battle1.innerText);
            loser = battle2.innerText;
            player[loser].life -= 1;
            updateLife(loser);
            battle1Bar = 0;
            battle2Bar = 0;
            battle1.style.width = '0px';
            battle2.style.width = '0px';
            winner.style.zIndex = "1";
            document.getElementById('theBattle').style.display = 'none';
            winner.setAttribute("animate", "1");
            setTimeout(function () {
                winner.setAttribute("animate", "0");
                winner.style.zIndex = "0";
                reverseCounter(5, loser)
            }, 3500);
        } else {
            battle1.style.width = battle1Bar + 'px';
        }
    } else if (e.code === "KeyL" && fighting == 1) {
        battle2Bar += 8;
        if (battle2Bar >= 260) {
            fighting = 0;
            battle2.style.width = '256px';
            winner = document.querySelector("#"+battle2.innerText);
            loser = battle1.innerText;
            player[loser].life -= 1;
            updateLife(loser);
            battle1Bar = 0;
            battle2Bar = 0;
            winner.style.zIndex = "1";
            document.getElementById('theBattle').style.display = 'none';
            winner.setAttribute("animate", "1");
            setTimeout(function () {
                winner.setAttribute("animate", "0");
                winner.style.zIndex = "0";
                reverseCounter(5, loser)
            }, 3500);
        } else {
            battle2.style.width = battle2Bar + 'px';
        }

    } else if (e.code === "Space"){
        diceFunction();
    }
};