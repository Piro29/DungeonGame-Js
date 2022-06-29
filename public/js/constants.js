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

//upgrade window properties
const upgradeWindowWidth = townCanvas.width / 2
const upgradeWindowHeight = townCanvas.height / 2
const x = upgradeWindowWidth - upgradeWindowWidth / 2
const y = upgradeWindowHeight - upgradeWindowHeight / 2


const slimePosition = {
    x: 600,
    y: 300,
}


const snakePosition = {
    x: 600,
    y: 400,
}

let direction = "down"

let pause = false
let level = 0

const offset = {
    x: -725,
    y: -650
}

const numberOfEnemy = 5

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

const dungeon = {
    started: false
}
const upgrade = {
    started: false
}

let enemies = []

const boundaries = []

const wallBoundaries = []

const battleZone = []

const upgradeZone = []

const town = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: townImage,
    context: townContext
})

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