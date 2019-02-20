function gameStart(num){
    turn = "player1";
    player = {
        player1:{
            step: 1,
            life: 3,
            status: 1},
        player2:{
            step: 1,
            life: 3,
            status: 1},
        player3:{
            step: 1,
            life: 3,
            status: 0},
        player4:{
            step: 1,
            life: 3,
            status: 0},
    };
    if (num.innerHTML === "3 Player"){
       player.player3.status = 1;
       document.getElementById("player3").style.display = 'block';
    } else if (num.innerText === "4 Player"){
        player.player3.status = 1;
        document.getElementById("player3").style.display = 'block';
        player.player4.status = 1;
        document.getElementById("player4").style.display = 'block';
    }
    document.getElementById("selectPlayer").style.display = 'none';
    document.getElementById("game").style.display = 'block';
    theDice = document.getElementsByTagName("dice");
    for (i = 0; i<theDice.length; i++){
        theDice[i].style.display = 'inline-block'
    }
    console.log(player);
    b1 = document.getElementById('b1');
    turnStart()
}


function turnStart(){
    document.getElementById("theTurn").innerText = turn.toLocaleUpperCase()+"\'s Turn";
    thePlayer = document.getElementById(turn);
    // console.log(thePlayer);
    thePlayer.setAttribute("animate", "1");
}

function turnEnd(){
    if(turn === "player1"){
        thePlayer.setAttribute("animate", "0");
        turn = "player2";
        turnStart();
    } else if (turn === "player2" && player.player3.status === 1) {
        thePlayer.setAttribute("animate", "0");
        turn = "player3";
        turnStart();
    }  else if (turn === "player3" && player.player4.status === 1) {
        thePlayer.setAttribute("animate", "0");
        turn = "player4";
        turnStart();
    } else {
        thePlayer.setAttribute("animate", "0");
        turn = "player1";
        turnStart();
    }
}

function diceFunction() {
    dice1 = Math.floor(Math.random() * 6) + 1;
    dice2 = Math.floor(Math.random() * 6) + 1;
    theDice1 = document.getElementById("theDice1");
    theDice2 = document.getElementById("theDice2");
    theDice1.setAttribute("score", "0");
    theDice2.setAttribute("score", "0");
    setTimeout(function () {
        theDice1.setAttribute("score", dice1);
        theDice2.setAttribute("score", dice2);
        moveCounter(dice1+dice2)
    }, 1500);

}

function moveCounter(move) {
    start = player[turn].step;
    end = start+move;
    moveFunction(start, end)
}

function moveFunction(start, end) {
    start++;
    setTimeout(function(){
        // console.log(start);
        thePlayer.setAttribute("step", start);
        if(start < end){
            moveFunction(start, end);
        } else {
            player[turn].step = end;
            for(var p in player){
                if(player[turn].step === player[p].step && turn !== p){
                    document.getElementById('battle').style.display = 'inline-block';
                    b1.innerText = turn;
                    b2.innerText = p;
                    b1.setAttribute('battle','1');
                    b2.setAttribute('battle','1');
                }
            }
            turnEnd();
        }}, 400);

}

function reverseCounter() {
    var reverse = player[loser].step - 5;
    console.log(reverse);
    moveReverse(reverse);
}

function moveReverse(reverse) {
    player[loser].step --;
    theLoser = document.getElementById(loser);
    setTimeout(function () {
        theLoser.setAttribute("step", player[loser].step)
        if(player[loser].step > reverse){
            moveReverse(reverse)
        }
    }, 400);
}


var b1 = document.getElementById('b1');
var b1Bar = 0;
var b2 = document.getElementById('b2');
var b2Bar = 0;
var loser = '';
document.onkeydown = document.body.onkeykeypress = function(e)
{
    if((e.keyCode == 65 || e.keyCode == 97) && document.getElementById("b1").getAttribute("battle") == "1") {
        e = e || window.event;
        b1Bar += 8;
        if(b1Bar >= 296){
            b1.style.width = '296px';
            win.innerText = b1.innerText + " Win";
            loser = b2.innerText;
            b1.setAttribute('battle','0');
            b2.setAttribute('battle','0');
            b1Bar = 0;
            b2Bar = 0;
            setTimeout(function () {
                document.getElementById('battle').style.display = 'none';
                reverseCounter()
            }, 1500);

        } else {
            b1.style.width = b1Bar+'px';
        }


        // i.innerHTML = 'Hello';
        // document.body.style.backgroundColor = "#efeab6"
    } else if((e.keyCode == 76 || e.keyCode == 108) && document.getElementById("b2").getAttribute("battle") == "1") {
        e = e || window.event;
        b2Bar += 8;
        if(b2Bar >= 296){
            b2.style.width = '296px';
            win.innerText = b2.innerText + " Win";
            loser = b1.innerText;
            b1.setAttribute('battle','1');
            b2.setAttribute('battle','1');
            b1Bar = 0;
            b2Bar = 0;
            setTimeout(function () {
                document.getElementById('battle').style.display = 'none';
                reverseCounter()
            }, 1500);
        } else {
            b2.style.width = b2Bar+'px';
        }
        // i.innerHTML = 'Hello';
        // document.body.style.backgroundColor = "#efeab6"
    }
};
