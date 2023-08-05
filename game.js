const getRandomIndex = (arrayToChooseFrom) => {
    return Math.floor(Math.random() * arrayToChooseFrom.length)
}
const weclomeMessage =
    'Welcome Challenger!\n' +
    'In this game you are going to play against me, Bob.\n' +
    'I am a bot well trained to play rock-paper-scissors and ready to beat you. ' +
    'I recommend you to open the browser console to keep up with the game.\n' +
    'Type "start" to start an all out game of 5 rounds against me, the mighty Bob!'

const getBobMessage = () => {
    const bobMessages = [
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
    return bobMessages[getRandomIndex(bobMessages)];
}

const getErrorMessage = () => {
    const errorMessages = [
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
    return errorMessages[getRandomIndex(errorMessages)];
}

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

const bobChoice = () => {
    return choices[getRandomIndex(choices)]
};

const validatePlayerInput = () => {
    const input = prompt("Rock, Paper, Scissors. 1, 2, 3! I choose:")
    let validity;
    if (input !== null && choices.includes(input.toLowerCase().trim())) {
        validity = true
    } else if (input === null) {
        validity = null
    }
    else {
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
        return selection.input.toLowerCase().trim()
    } else if (selection.validity === null) {
        const confirmCancelation = confirm("If you really want to cancel the game and admit you're a coward click okay. Or cancel your cancelation and let's keep going!")
        if (confirmCancelation) {
            return selection.input
        }
        else {
            return playerChoice()
        }
    }
    else {
        alert(getErrorMessage())
        return playerChoice()
    }
}

const playRound = (playerSelection, bobSelection) => {
    let message;
    let winner;
    if ((playerSelection === "rock" && bobSelection === "paper") ||
        (playerSelection === "paper" && bobSelection === "scissors") ||
        (playerSelection === "scissors" && bobSelection === "rock")) {

        message = "You lose!" + ` ${bobSelection.toUpperCase()} ${emojis[bobSelection]} beats ${playerSelection.toUpperCase()} ${emojis[playerSelection]}`,
            winner = "bob"

    } else if ((playerSelection === "rock" && bobSelection === "scissors") ||
        (playerSelection === "paper" && bobSelection === "rock") ||
        (playerSelection === "scissors" && bobSelection === "paper")) {

        message = "You win!" + ` ${playerSelection.toUpperCase()} ${emojis[playerSelection]} beats ${bobSelection.toUpperCase()} ${emojis[bobSelection]}`,
            winner = "player"

    } else {
        message = "It's a tie" + ` You both chose ${playerSelection.toUpperCase()} ${emojis[playerSelection]}`,
            winner = null

    }
    return {
        playerSelection: graphics[playerSelection],
        bobSelection: graphics[bobSelection],
        message: message,
        winner: winner
    }
}

const logRound = (roundResults, roundNumber) => {
    console.log(`Round: ${roundNumber}`)
    console.log("You Chose:")
    console.log(roundResults.playerSelection)
    console.log("Bob Chose:")
    console.log(roundResults.bobSelection)
    console.log(roundResults.message)
    return roundResults
}

const endGame = (score) => {
    let finalMessage

    if (score.player > score.bob) {
        finalMessage = "You WIN!!!🎉🎉🎉"
    } else if (score.bob > score.player) {
        finalMessage = "You LOSE!!!😭😭😭"
    } else {
        finalMessage = "It's a tie! 😑🫠😵‍💫"
    }
    return `
        Game over. Final score is: 
        Player: ${score.player}
        bob: ${score.bob}
        ${finalMessage}
    `
}

const game = () => {
    score = {
        player: 0,
        bob: 0
    }

    for (let i = 0; i < 5; i++) {
        const bobSelection = bobChoice()
        const playerSelection = playerChoice()
        if (playerSelection === null) {
            break
        }
        const roundResults = playRound(playerSelection, bobSelection)
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
            Bob: ${score.bob}
            `
        } else if (roundResults.winner === "bob") {
            roundNumber = i + 1
            score.bob++
            logRound(roundResults, roundNumber)
            alertMessage = `
            Round: ${roundNumber}
            ${roundResults.message}
            The current score is:
            Player: ${score.player}
            Bob: ${score.bob}
            `
        } else {
            roundNumber = i + 1
            logRound(roundResults, roundNumber)
            alertMessage = `
            Round: ${roundNumber}
            ${roundResults.message}
            The current score is:
            Player: ${score.player}
            Bob: ${score.bob}
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

const checkValidityToStart = (message) => {
    let input = prompt(message);
    let validity;
    if (input !== null && (input.trim().toLowerCase() === 'start')) {
        validity = true
    } else if (input === null) {
        validity = null
    }
    else {
        validity = false
    }
    return validity;
}

const startGame = () => {
    let validity = checkValidityToStart(weclomeMessage);

    if (validity) {
        alert("Starting game!\nOpen your console and wait for the game to start")
        setTimeout(() => { game() }, 3000)
    } else if (validity === null) {
        const startCancelation = confirm("If you really want to cancel the game and admit you're a coward click okay. Or cancel your cancelation and let's keep going!")
        if (startCancelation) {
            return
        } else {
            return startGame();
        }
    } else {
        alert(getBobMessage());
        return startGame();
    }
}

startGame();
