// DECLAERE HTML CONSTANTS
const btnStartGame = document.getElementById("enter-game");
const pageWelcome = document.getElementById("welcome-screen");
const pageGame = document.getElementById("game");

const cube = document.querySelector('.cube');
const btnRoll = document.getElementById("roll-dice");
const btnEnd = document.getElementById("end-turn");
const btnReset = document.getElementById("reset");
const playerOneScoreDisplay = document.getElementById("player-one-score");
const playerTwoScoreDisplay = document.getElementById("player-two-score");

// DECLARE GLOBAL VARIABLES
// KEY:VALUE PAIRS EQUAL TO THE DICE LAYOUT
const diceSides = {
    0: "show-front",
    1: "show-top",
    2: "show-left",
    3: "show-right",
    4: "show-bottom",
    5: "show-top"
}

let currentClass = '';
const keys = Object.keys(diceSides);

// GAME VARIABLES
let playerOneScore = 0;
let playerTwoScore = 0;

let playerOneTurn = true;
let playerOneBust = false;

let playerTwoTurn = false;
let playerTwoBust = false;

let lock = false;

// SET INITIAL FACE OF THE DICE, SO THAT IT DOES NOT REFRESH WHEN THE GAME IS STARTED
const setInitial = () => {

    cube.classList.add(diceSides[keys[0]]);
}

// CODE TO CHANGE THE DISPLAYED SIDE OF DICE
const changeSide = () => {
    // GET NUMBER OF SIDES
    const length = keys.length;

    // DECLARE LOCAL VARIABLES
    let num = 0;
    let side = "";

    // GET RANDOM SIDE NUMBER, AND RESPECTIVE SIDE FROM KEY:VALUE PAIR
    num = Math.floor(Math.random() * length);
    side = diceSides[keys[num]];

    // INCREMENT NUMBER BY ONE, SO THAT IT MATCHES THE NUMBER DISPLAYED ON DICE
    num += 1;

    // PREPARE TO CHANGE DICE SIDE
    let showClass = side;

    // REMOVE CURRENT DISPLAYING SIDE
    if (currentClass) {
        cube.classList.remove(currentClass);
    }

    // ADD NEW DISPLAYING SIDE AND LOG THE NEW SIDE FOR NEXT ROLL TO BE ABLE TO REMOVE IT AGAIN
    cube.classList.add(showClass);
    currentClass = showClass;

    // SEND NUMBER ROLLED TO FUNCTION TO INCREMENT SCORE
    addScore(num);

    console.log(num);
    console.log(side);
}

// GAME LOGIC FUNCTION
const checkWinner = () => {
    if (playerOneScore > playerTwoScore) {
        alert("Player one wins!");
    } else if (playerOneScore < playerTwoScore) {
        alert("Player two wins!");
    } else {
        alert("It's a draw!");
    }
    if (confirm("Would you like to play again?")) {
        resetGame();
    }
}
const resetGame = () => {
    // RESET P1'S VARIABLES
    playerOneScore = 0;
    playerOneScoreDisplay.textContent = playerOneScore;
    playerOneTurn = true;
    playerOneBust = false;

    // RESET P2'S VARIABLES
    playerTwoScore = 0;
    playerTwoScoreDisplay.textContent = playerTwoScore;
    playerTwoTurn = false;
    playerTwoBust = false;

}

// END PLAYER ONE'S TURN
const endTurn = () => {
    if (playerOneTurn) {
        switch (lock) {
            case true:
                // Locking Player 1
                playerOneBust = true;
                if (playerTwoBust) {
                    // Game is OVER
                    alert("Both players are bust! Checking winner!");
                    checkWinner();
                } else {
                    // Player 2 is still active.
                    alert("Player 1 is bust, handing over to player 2.")
                    playerOneTurn = false;
                    playerTwoTurn = true;
                }
                break;
            case false:
                // Do Something Else
                if (playerTwoBust) {
                    // Cannot Switch, Prompt to End Game instead
                    if (confirm("Other player is bust! Do you want to end the game instead?")) {
                        checkWinner();
                    }
                } else {
                    // Switch to player two
                    alert("Ending player 1's turn, handing over to player 1.");
                    playerOneTurn = false;
                    playerTwoTurn = true;
                }
        }
    } else if (playerTwoTurn) {
        switch (lock) {

            case true:

                // Locking Player 2
                playerTwoBust = true;
                if (playerOneBust) {
                    // Game is OVER
                    alert("Both players are bust! Checking winner!");
                    checkWinner();
                } else {
                    // Player 1 is still active.
                    alert("Player 2 is bust, handing over to player 1.")
                    playerOneTurn = true;
                    playerTwoTurn = false;
                }
                break;
            case false:
                // Do Something Else
                if (playerOneBust) {
                    // Cannot Switch, Prompt to End Game instead
                    if (confirm("Other player is bust! Do you want to end the game instead?")) {
                        checkWinner();
                    }
                } else {
                    // Switch to player two
                    alert("Ending player 2's turn, handing over to player 1.");
                    playerOneTurn = true;
                    playerTwoTurn = false;

                }
        }
    }
    // RESET LOCK
    lock = false;
}

const addScore = (num) => {
    // CHECK IF PLAYER ROLLS A 1, ALLOW GAME TO CONTINUE IF THEY DO NOT
    if (num != 1) {

        // CHECK IF IT IS PLAYER ONE'S TURN, INCREMENT P1'S SCORE IF IT IS, AND OUTPUT TO SCREEN
        // OTHERWISE, INCREMENT P2'S SCORE AND OUTPUT IT TO SCREEN
        if (playerOneTurn) {
            playerOneScore += num;
            playerOneScoreDisplay.textContent = playerOneScore;
        } else if (playerTwoTurn) {
            playerTwoScore += num;
            playerTwoScoreDisplay.textContent = playerTwoScore;
        } else {
            console.log("Eveyone is bust [addScore]")
            checkWinner();
        }
    } else {
        // CHECK IF IT IS PLAYER ONE'S TURN, LOCK P1'S SCORE IF IT IS, AND OUTPUT TO SCREEN WITH A MESSAGE
        // THEN END TURN
        // OTHERWISE, LOCK P2'S SCORE AND OUTPUT IT TO SCREEN WITH MESSAGE
        // THEN EVALUATE WINNER
        if (playerOneTurn) {
            console.log("P1 Rolled 1, Locking Score [addScore]");
            lock = true;
            endTurn();
        } else if (playerTwoTurn) {
            console.log("P2 Rolled 1, Locking Score [addScore]");
            lock = true;
            endTurn();
        }
    }

}

// set initial side
setInitial();

btnStartGame.addEventListener("click", () => {
    pageWelcome.style.display = "none";
    pageGame.style.display = "flex";
})

btnRoll.addEventListener("click", changeSide);
btnEnd.addEventListener("click", endTurn);
btnReset.addEventListener("click", resetGame);