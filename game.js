const choices = ['rock', 'paper', 'scissors']
const graphics = {
    rock: `    
        _______
    ---'   ____)
          (_____)
          (_____)
          (____)
    ---.__(___)`,
    paper: `     
         _______
    ---'    ____)____
               ______)
              _______)
             _______)
    ---.__________)`,
    scissors: `   
        _______
    ---'   ____)____
              ______)
           __________)
          (____)
    ---.__(___)`
}

const emojis = {
    rock: "👊",
    paper: "✋",
    scissors: "✌️"

}

const computerChoice = () => {
    const choice = Math.floor(Math.random() * 3)
    return choices[choice]
};

function getErrorMessage() {
    const error_messages = [
        "Hey there! Remember, it's 'rock,' 'paper,' or 'scissors.' Let's not keep me waiting!",
        "Oi! I'm eager to start. Just type 'rock,' 'paper,' or 'scissors' to play.",
        "Don't leave me hanging. Choose 'rock,' 'paper,' or 'scissors' to begin!",
        "The game is on. Input 'rock,' 'paper,' or 'scissors' and let's go!",
        "I'm ready for action. Your move: 'rock,' 'paper,' or 'scissors'?",
        "Listen up! Type 'rock,' 'paper,' or 'scissors' and let's get this show on the road.",
        "Alright, let's play fair. Just say 'rock,' 'paper,' or 'scissors' to join the game.",
        "I'm waiting... 'rock,' 'paper,' or 'scissors' — take your pick and let's play!",
        "Attention, please! It's 'rock,' 'paper,' or 'scissors' time. Don't keep me waiting!",
        "Seriously? It's as easy as 'rock,' 'paper,' or 'scissors.' Give it a try already!"
    ]
    const random_index = Math.floor(Math.random() * error_messages.length);
    return error_messages[random_index];
}

const validatePlayerInput = () => {
    const input = prompt("Rock, Paper, Scissors. 1, 2, 3! I choose:")
    let validity;
    if (input !== null && choices.includes(input.toLowerCase())) {
        validity = true
    } else {
        validity = false
    }

    return {
        validity: validity,
        input: input
    }
}

const playerChoice = () => {
    const selection = validatePlayerInput()
    if (selection.validity) {
        return selection.input.toLowerCase()
    } else {
        alert(getErrorMessage())
        return playerChoice()
    }
}


const playRound = (playerSelection, computerSelection) => {

    let message;
    let winner;
    if ((playerSelection === "rock" && computerSelection === "paper") ||
        (playerSelection === "paper" && computerSelection === "scissors") ||
        (playerSelection === "scissors" && computerSelection === "rock")) {

        message = "You lose!" + ` ${computerSelection.toUpperCase()} ${emojis[computerSelection]} beats ${playerSelection.toUpperCase()} ${emojis[playerSelection]}`,
            winner = "computer"

    } else if ((playerSelection === "rock" && computerSelection === "scissors") ||
        (playerSelection === "paper" && computerSelection === "rock") ||
        (playerSelection === "scissors" && computerSelection === "paper")) {

        message = "You win!" + ` ${playerSelection.toUpperCase()} ${emojis[playerSelection]} beats ${computerSelection.toUpperCase()} ${emojis[computerSelection]}`,
            winner = "player"

    } else {
        message = "It's a tie" + ` You both chose ${playerSelection.toUpperCase()} ${emojis[playerSelection]}`,
            winner = null

    }
    return {
        playerSelection: graphics[playerSelection],
        computerSelection: graphics[computerSelection],
        message: message,
        winner: winner
    }
}

const logRound = (roundResults, roundNumber) => {
    console.log(`Round: ${roundNumber}`)
    console.log("You Chose:")
    console.log(roundResults.playerSelection)
    console.log("Computer Chose:")
    console.log(roundResults.computerSelection)
    console.log(roundResults.message)
    return roundResults
}

const endGame = (score) => {
    let finalMessage

    if (score.player > score.computer) {
        finalMessage = "You WIN!!!🎉🎉🎉"
    } else if (score.computer > score.player) {
        finalMessage = "You LOSE!!!😭😭😭"
    } else {
        finalMessage = "It's a tie! 😑🫠😵‍💫"
    }
    return `
        Game over. Final score is: 
        Player: ${score.player}
        Computer: ${score.computer}
        ${finalMessage}
    `
}

const game = () => {
    score = {
        player: 0,
        computer: 0
    }

    for (let i = 0; i < 5; i++) {
        const computerSelection = computerChoice()
        const playerSelection = playerChoice()
        const roundResults = playRound(playerSelection, computerSelection)
        let alertMessage;
        let roundNumber
        if (roundResults.winner === "player") {
            roundNumber = i + 1
            score.player++
            logRound(roundResults, roundNumber)
            alertMessage = `
            Round: ${roundNumber}
            ${roundResults.message}
            The current score is:
            Player: ${score.player}
            Computer: ${score.computer}
            `
        } else if (roundResults.winner === "computer") {
            roundNumber = i + 1
            score.computer++
            logRound(roundResults, roundNumber)
            alertMessage = `
            Round: ${roundNumber}
            ${roundResults.message}
            The current score is:
            Player: ${score.player}
            Computer: ${score.computer}
            `
        } else {
            roundNumber = i + 1
            logRound(roundResults, roundNumber)
            alertMessage = `
            Round: ${roundNumber}
            ${roundResults.message}
            The current score is:
            Player: ${score.player}
            Computer: ${score.computer}
            `
        }
        if (i === 4) {
            alert(`
            Round: ${i + 1}
            ${roundResults.message}
            ${endGame(score)}
            `)
            break
        }
        alert(alertMessage)
    }

    const playAgain = confirm("Play again?")
    return playAgain ? game() : alert("Thanks for playing!")
}

const welcome_message =
    'Welcome Challenger!\n' +
    'In this game you are going to play against me, Bob.\n' +
    'I am a bot well trained to play rock-paper-scissors and ready to beat you. ' +
    'I recommend you to open the browser console to keep up with the game.\n' +
    'Type "start" to start an all out best of 5 against me, the mighty Bob!'

function getBobMessage() {
    const bob_messages = [
        'Seriously, just type "start" to begin the rock-paper-scissors duel already!',
        'I"m waiting... Type "start" if you want to take on the challenge!',
        'Come on, it"s just one word! Type "start" to start the game!',
        'Hmm, did you forget? It"s "start" to play rock-paper-scissors with me!',
        'I"m losing my patience here... Please type "start" and let"s get this going!',
        'Are you there? Type "start" to join the rock-paper-scissors duel!',
        'I"m ready for action. Now it"s your turn to type "start"!',
        'Time is ticking... Type "start" if you want to duel!',
        'I won"t give up! Keep trying and type "start" to accept the challenge!',
        'Alright, I"ll wait a little longer, but please, just type "start" to play!'
    ]
    const random_index = Math.floor(Math.random() * bob_messages.length);
    return bob_messages[random_index];
}

const checkValidityToStart = (message) => {
    let input = prompt(message);
    let validity;
    if (input === null || !input.trim() || (input.trim().toLowerCase() !== 'start')) {
        validity = false
    } else {
        validity = true
    }
    return validity;
}

const startGame = () => {
    let validity = checkValidityToStart(welcome_message);

    if (validity) {
        alert("Starting game!\nOpen your console and wait for the game to start")
        setTimeout(() => { game() }, 3000)
    } else {
        alert(getBobMessage());
        return startGame();
    }
}

startGame();
