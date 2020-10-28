const cardsContainer = document.getElementById('cards-container')
const prevBtn = document.getElementById('prev')
const nextBtn = document.getElementById('next')
const currentEl = document.getElementById('current')
const showBtn = document.getElementById('show')
const hideBtn = document.getElementById('hide')
const questionEl = document.getElementById('question')
const answerEl = document.getElementById('answer')
const addQuestionBtn = document.getElementById('add-question')
const clearBtn = document.getElementById('clear')
const addContainer = document.getElementById('add-container')

//keep track of current card
let currentActiveCard = 0 //which card to show

//store DOM cards
const cardsEl = [] //store DOM cards which will be in an array of elements

//store card data
const cardsData = getCardsData()

//create all cards
function createCards() {
    cardsData.forEach((data, index) => createCard(data, index)) //loop through cards and creating an array of cards
}

//create a single card in the DOM
function createCard(data, index) {
    const card = document.createElement('div')
    card.classList.add('card')

    if(index === 0) {
        card.classList.add('active')
    }

    card.innerHTML = `
    <div class="inner-card">
    <div class="inner-card-front">
    <p>
    ${data.question}
    </p>
    </div>
    <div class="inner-card-back">
    <p>
    ${data.answer}
    </p>
    </div>
    </div>
    `

card.addEventListener('click', () => card.classList.toggle('show-answer'))

//add to DOM cards
cardsEl.push(card)

cardsContainer.appendChild(card)

updateCurrentText()
}

//show number of cards
function updateCurrentText() {
    currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}` //adds 1 to it bcause index starts at 0 ???
}

//get cards from local storage
function getCardsData() {
    const cards = JSON.parse(localStorage.getItem('cards')) //localstorage keeps as string so parsing will convert to an object
    return cards === null ? [] : cards //if cards are null then return an array( null ?), otherwise just return the cards (with :)
}

//add card to local storage
function setCardsData(cards) {
    localStorage.setItem('cards', JSON.stringify(cards)) //we want to turn it into a string
    window.location.reload() //to reflect the cards data on the DOM
}

createCards()

//event listeners

//next button
nextBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card left' //targets the array that holds the active card
    currentActiveCard = currentActiveCard + 1 //if we are at 1 it will move to the next one and be 2, etc

//we need to set the index on the last card
if (currentActiveCard > cardsEl.length -1) { //our array is 0 index based
currentActiveCard = cardsEl.length -1
} 

cardsEl[currentActiveCard].className = 'card active' //set the next card to active by overwriting with class provided

updateCurrentText() //to update the card numbers
})

//prev button
prevBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card right'
    currentActiveCard = currentActiveCard -1 //sets current active card to the current but minus one (so one back)

if (currentActiveCard < 0 ) { //prevents it from going further back than 0
    currentActiveCard = 0
}
cardsEl[currentActiveCard].className = 'card active' //updates new card we just pulled to active

updateCurrentText()
})

//show add container
showBtn.addEventListener('click', addContainer.classList.add('show'))

//hide add container
hideBtn.addEventListener('click', addContainer.classList.remove('show'))

///add new card
addQuestionBtn.addEventListener('click', () => {
    const question = questionEl.value
    const answer = answerEl.value
    console.log(question, answer) //for testing input

    if(question.trim() && answer.trim()) {
        const newCard = { question, answer }

        createCard(newCard)
        questionEl.value = ''
        answerEl.value = ''

        addContainer.classList.remove('show')

        cardsData.push(newCard) //pushes new card to array
        setCardsData(cardsData) //updates local storage with cards data
    }
})

//clear cards button
clearBtn.addEventListener('click', () => {
    localStorage.clear()
    cardsContainer.innerHTML = ''
    window.location.reload()
})