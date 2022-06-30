const townCanvas = document.getElementById("town")
const townContext = townCanvas.getContext("2d")

const upgradeWindow = document.querySelector(".upgradeWindow")
const gameOverWindow = document.querySelector(".gameOver")
const completeLevel = document.querySelector(".completeLevel")
const upgradeDamage = document.querySelector(".upgradeDamage")
const upgradeHealth = document.querySelector(".upgradeHealth")
const startWindow = document.querySelector(".startGame")
const status = document.querySelector(".done p")

const upgradeDamageButton = document.querySelector(".upgradeDamage button")
const upgradeHealthButton = document.querySelector(".upgradeHealth button")
const startButton = document.querySelector(".startBtn button")
const restartButton = document.querySelector(".restartBtn button")

const goHomeButton = document.querySelector(".goHome button")
const nextLevelButton = document.querySelector(".nextLevel button")

const dungeonCanvas = document.getElementById("dungeon")
const dungeonContext = dungeonCanvas.getContext("2d")

const width = 1024
const height = 576
let frames = 0

dungeonCanvas.width = width
dungeonCanvas.height = height
dungeonCanvas.style.display = "none"


townCanvas.width = width
townCanvas.height = height


const townImage = new Image()
townImage.src = "img/Town.png"

const foreImage = new Image()
foreImage.src = "img/foreground.png"

const playerImage = new Image()
playerImage.src = "img/character/character_0.png"

const dungeonImage = new Image()
dungeonImage.src = "img/fixeddungeon.png"

const enemyImage = new Image()
enemyImage.src = "img/Slime2.png"

const snakeImage = new Image()
snakeImage.src = "img/Snake2.png"

const axolotImage = new Image()
axolotImage.src = "img/Axolot.png"

const bambooImage = new Image()
bambooImage.src = "img/Bamboo.png"

const beastImage = new Image()
beastImage.src = "img/Beast.png"

const townAudio = new Audio()
townAudio.src = "sound/townSound.mp3"

const swordAudio = new Audio()
swordAudio.src = "sound/sword.wav"

//upgrade window properties
const upgradeWindowWidth = townCanvas.width / 2
const upgradeWindowHeight = townCanvas.height / 2
const x = upgradeWindowWidth - upgradeWindowWidth / 2
const y = upgradeWindowHeight - upgradeWindowHeight / 2


//intial position of slime
const slimePosition = {
    x: 600,
    y: 300,
}

//intial position of snake
const snakePosition = {
    x: 600,
    y: 400,
}

const axolotPosition = {
    x: 600,
    y: 500,
}

const bambooPosition = {
    x: 600,
    y: 600,
}

const beastPosition = {
    x: 600,
    y: 700,
}

//intial position of player
let direction = "down"

let pause = false
let highestLevel = 0
let level = 1

//offset of the town map and dungeon map
const offset = {
    x: -725,
    y: -650
}


const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    },
    space: {
        pressed: false
    }
}

//inside dungeon or not
const dungeon = {
    started: false
}

//upgrade shop displayed or not
const upgrade = {
    started: false
}


let enemies = []

//for town boundary
const boundaries = []

//for the dungeon wall collision
const wallBoundaries = []

//for the dungeon entrance
const battleZone = []

//for the upgrade shop
const upgradeZone = []

//for town map
const town = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: townImage,
    context: townContext
})

//for dungeon map
const dungeon_map = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: dungeonImage,
    context: dungeonContext
})




const foreground = {
    position: {
        x: -293,
        y: -506
    },
    draw: function () {
        townContext.drawImage(foreImage, this.position.x, this.position.y)
    }

}

//style the windows
upgradeWindow.style.width = `${upgradeWindowWidth}px`
upgradeWindow.style.height = `${upgradeWindowHeight}px`
upgradeWindow.style.left = `${x}px`
upgradeWindow.style.top = `${y}px`
upgradeWindow.style.backgroundColor = `brown`
upgradeWindow.style.position = `absolute`

startWindow.style.width = `${upgradeWindowWidth}px`
startWindow.style.height = `${upgradeWindowHeight}px`
startWindow.style.left = `${x}px`
startWindow.style.top = `${y}px`
startWindow.style.backgroundColor = `brown`
startWindow.style.position = `absolute`

completeLevel.style.width = `${upgradeWindowWidth}px`
completeLevel.style.height = `${upgradeWindowHeight}px`
completeLevel.style.left = `${x}px`
completeLevel.style.top = `${y}px`
completeLevel.style.backgroundColor = `brown`
completeLevel.style.position = `absolute`
startWindow.style.position = `absolute`

gameOverWindow.style.width = `${upgradeWindowWidth}px`
gameOverWindow.style.height = `${upgradeWindowHeight}px`
gameOverWindow.style.left = `${x}px`
gameOverWindow.style.top = `${y}px`
gameOverWindow.style.backgroundColor = `brown`
gameOverWindow.style.position = `absolute`

const URL = "http://localhost:5000/highLevel"

let hit = false