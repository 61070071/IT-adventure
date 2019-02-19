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
    console.log(player)
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
            turnEnd();
        }}, 400);

}