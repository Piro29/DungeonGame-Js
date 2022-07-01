//create stats
let stats = new Stats()

//create enemy objects
let slimeEnemy = new Slime({ image: enemyImage, position: slimePosition })
let snakeEnemy = new Snake({ image: snakeImage, position: snakePosition })
let axolotEnemy = new Axolot({ image: axolotImage, position: axolotPosition })
let bambooEnemy = new Bamboo({ image: bambooImage, position: bambooPosition })
let beastEnemy = new Beast({ image: beastImage, position: beastPosition })

//move map when player moves
const movables = [
    town, ...boundaries, foreground, ...battleZone, dungeon_map, ...wallBoundaries, slimeEnemy, snakeEnemy, ...upgradeZone, axolotEnemy, bambooEnemy, beastEnemy
]

//create player
const player = new Player()


let lastKey = ""

enemies.push(slimeEnemy)
enemies.push(snakeEnemy)
enemies.push(axolotEnemy)
enemies.push(bambooEnemy)
enemies.push(beastEnemy)



function upgrade_function() {
    upgradeWindow.style.display = `grid`
}



function draw() {

    if (dungeon.started) {
        dungeon_function()

    } else {
        town.draw()
        townAudio.play()
        boundaries.forEach(boundary => {
            boundary.draw()
        })
        battleZone.forEach(zone => {
            zone.draw()
        })
        player.draw(townContext)
        foreground.draw()
        stats.draw(townContext)
        if (stats.health < stats.maxWidth) stats.health++

    }
}


function update() {
    keyPressed()
}

function loop() {
    if (!pause) {

        update()
        draw()
        frames = requestAnimationFrame(loop)
    }

}

startButton.addEventListener("click", () => {
    loop()
    startWindow.style.display = "none"

    getHighestLevel()
    setHighestLevel()
})
