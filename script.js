var startButton = document.querySelector(".start-button")
var alphaLetters = ["dog", "cat", "sun", "moon"]
var wordBlanks = document.querySelector(".word-blanks")
var timerElement = document.querySelector(".timer-count")
var resetButton = document.querySelector(".reset-button")
var wordsLength = 0;
var timerCount = 10;
var timer;
var win = document.querySelector(".win")
let winScore = 0
var lose = document.querySelector(".lose")
let loseScore = 0;
let chosenWords = ""
let lettersInChosenWord = []
let blankLetters = []
let winner = false



function startPlay() {
    winner = false
    timerCount = 10
    startButton.disabled = true;
    words()
    startTimer()
}

function startTimer() {
    timer = setInterval(function(){
        timerCount --
        timerElement.textContent = timerCount; 
        if (timerCount >= 0){
           if(winner && timerCount > 0){
            clearInterval(timer)
            winGame()
           }
        }
        //Lose condtion timer
        if (timerCount === 0){
            clearInterval(timer)
            lostGame()
        }
        
    },1000)
}

//Render the random words as Blank
function words(){
 chosenWords = alphaLetters[Math.floor(Math.random() * alphaLetters.length)]
 lettersInChosenWord = chosenWords.split("")
 wordsLength = lettersInChosenWord.length; 
 blankLetters = []
 for (let i = 0; i < wordsLength; i++){
    blankLetters.push('_')
 }
 wordBlanks.textContent = blankLetters.join(" ")
}

startButton.addEventListener("click", startPlay)

document.addEventListener('keydown', function(event){
    //event is the key they click
    if(timerCount === 0){
        return
    }
    let guessWord = event.key.toLowerCase()
    let alphabetCharacters = "abcdefghijklmnopqrstuvwxyz".split("");
 
    if(alphabetCharacters.includes(guessWord)){
        let letterGuessed = guessWord
        checkLetters(letterGuessed)
        checkWin()
    }
})

function checkWin(){
    if(chosenWords == blankLetters.join('')){
        winner = true
    }
}

function checkLetters(letter){
    //checking if alphaletter that user choose is in the chosenWord
    let letterInwords = false;
    for (let i = 0; i < wordsLength; i++) {
        if ( chosenWords[i] === letter) {
            letterInwords = true;
        }
    } //checking the position of the correct letter
    if(letterInwords){
        for (let j = 0; j <wordsLength; j++){
            if (chosenWords[j] === letter) {
                blankLetters[j] = letter
            }
        } 
        // Now we need to display it on HTML
        wordBlanks.textContent = blankLetters.join(" ")
    }
}

function setWins(){
  win.textContent = winScore 
  localStorage.setItem('winScore', winScore)

}

function winGame(){
    wordBlanks.textContent = "You Won" 
    winScore ++
    console.log
    setWins() 
}

function setLost(){
    lose.textContent = loseScore
    localStorage.setItem('loseScore', loseScore)
}

function lostGame() {
 wordBlanks.textContent = "You Lost" 
 loseScore ++
 setLost()
}


resetButton.addEventListener("click", resetGame)

function resetGame(){
    localStorage.clear()
    winScore = 0;
    loseScore = 0;
    win.textContent = winScore
    lose.textContent = loseScore
}