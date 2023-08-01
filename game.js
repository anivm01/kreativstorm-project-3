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
    if ((playerChoice === "rock" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "scissors") ||
        (playerChoice === "scissors" && computerChoice === "rock")) {
        return {
            playerChoice: graphics[playerChoice],
            computerChoice: graphics[computerChoice],
            message: "You lose!" + ` ${computerChoice.toUpperCase()} beats ${playerChoice.toUpperCase()}`,
            winner: "computer"
        }
    } else if ((playerChoice === "rock" && computerChoice === "scissors") || (playerChoice === "paper" && computerChoice === "rock") || (playerChoice === "scissors" && computerChoice === "paper")) {
        return {
            playerChoice: graphics[playerChoice],
            computerChoice: graphics[computerChoice],
            message: "You win!" + ` ${playerChoice.toUpperCase()} beats ${computerChoice.toUpperCase()}`,
            winner: "player"
        }
    } else {
        return {
            playerChoice: graphics[playerChoice],
            computerChoice: graphics[computerChoice],
            message: "It's a tie" + ` You both chose ${playerChoice.toUpperCase()}`,
            winner: null
        }
    }
}

const logRound = () => {
    const roundResults = playRound()
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
        const roundResults = logRound()
        if (roundResults.winner === "player") {
            score.player++
            if (i === 4) {
                return alert(`
                Round: ${i + 1}
                ${roundResults.message}
                ${endGame(score)}
                `)
            }
            alert(`
            Round: ${i + 1}
            ${roundResults.message}
            The current score is:
            Player: ${score.player}
            Computer: ${score.computer}
            `)
        } else if (roundResults.winner === "computer") {
            score.computer++
            if (i === 4) {
                return alert(`
                Round: ${i + 1}
                ${roundResults.message}
                ${endGame(score)}
                `)
            }
            alert(`
            Round: ${i + 1}
            ${roundResults.message}
            The current score is:
            Player: ${score.player}
            Computer: ${score.computer}
            `)
        } else {
            if (i === 4) {
                return alert(`
                Round: ${i + 1}
                ${roundResults.message}
                ${endGame(score)}
                `)
            }
            alert(`
            Round: ${i + 1}
            ${roundResults.message}
            The current score is:
            Player: ${score.player}
            Computer: ${score.computer}
            `)
        }
    }

    return
}

game()


