
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

const computerSelection = () => {
    const choice = Math.floor(Math.random() * 3)
    return choices[choice]
};

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

const playerSelection = () => {
    const selection = validatePlayerInput()
    if (selection.validity) {
        return selection.input.toLowerCase()
    } else {
        return playerSelection()
    }
}


const playRound = () => {
    const computerChoice = computerSelection()
    const playerChoice = playerSelection()
    let message;
    let winner;
    if ((playerChoice === "rock" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "scissors") ||
        (playerChoice === "scissors" && computerChoice === "rock")) {

        message = "You lose!" + ` ${computerChoice.toUpperCase()} ${emojis[computerChoice]} beats ${playerChoice.toUpperCase()} ${emojis[playerChoice]}`,
            winner = "computer"

    } else if ((playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")) {

        message = "You win!" + ` ${playerChoice.toUpperCase()} ${emojis[playerChoice]} beats ${computerChoice.toUpperCase()} ${emojis[computerChoice]}`,
            winner = "player"

    } else {
        message = "It's a tie" + ` You both chose ${playerChoice.toUpperCase()} ${emojis[playerChoice]}`,
            winner = null

    }
    return {
        playerChoice: graphics[playerChoice],
        computerChoice: graphics[computerChoice],
        message: message,
        winner: winner
    }
}

const logRound = (roundResults, roundNumber) => {
    console.log(`Round: ${roundNumber}`)
    console.log("You Chose:")
    console.log(roundResults.playerChoice)
    console.log("Computer Chose:")
    console.log(roundResults.computerChoice)
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
        const roundResults = playRound()
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

alert("Open your console and wait for the game to start")
setTimeout(() => { game() }, 3000)


