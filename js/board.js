function turnStart(){
    theTurn = document.getElementById("theTurn");
    player = theTurn.getAttribute("turn");
    theTurn.innerText = player;
    thePlayer = thePlayer = document.getElementById(player);
    // console.log(thePlayer);
    thePlayer.setAttribute("animate", "1");
}

function turnEnd(){
    console.log("end1");
    if(player === "player1"){
        thePlayer.setAttribute("animate", "0");
        theTurn.setAttribute("turn", "player2");
        turnStart();
    } else {
        thePlayer.setAttribute("animate", "0");
        theTurn.setAttribute("turn", "player1");
        turnStart();
        console.log(theTurn);
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
    start = +(thePlayer.getAttribute("step"));
    end = start+move;
    moveFunction(start, end)
}

function moveFunction(start, end) {
    start += 1;
    setTimeout(function(){
        // console.log(start);
        thePlayer.setAttribute("step", start);
        if(start < end){
            moveFunction(start, end);
        } else {
            turnEnd();
        }}, 400);

}

turnStart()