const townCanvas = document.getElementById("town")
const townContext = townCanvas.getContext("2d")

const dungeonCanvas = document.getElementById("dungeon")
const dungeonContext = dungeonCanvas.getContext("2d")

const width = 1024
const height = 576

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

const offset = {
    x: -725,
    y: -650
}

const numberOfEnemy = 5


let frames = 0
let direction = "down"

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

const boundaries = []

collisionMap.forEach((row, index) => {
    row.forEach((symbol, rowIndex) => {
        if (symbol === 1025)
            boundaries.push((new Boundary({
                position: {
                    x: rowIndex * Boundary.width + offset.x,
                    y: index * Boundary.height + offset.y
                }
            })))
    })
})

const wallBoundaries = []

wallCollisionMap.forEach((row, index) => {
    row.forEach((symbol, rowIndex) => {
        if (symbol === 1)
            wallBoundaries.push((new Boundary({
                position: {
                    x: rowIndex * Boundary.width + offset.x,
                    y: index * Boundary.height + offset.y
                }
            })))
    })
})

const battleZone = []

battleZoneMap.forEach((row, index) => {
    row.forEach((symbol, rowIndex) => {
        if (symbol === 1025)
            battleZone.push((new Boundary({
                position: {
                    x: rowIndex * Boundary.width + offset.x,
                    y: index * Boundary.height + offset.y
                }
            })))
    })
})

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
const stats = {
    maxWidth: 100,
    energy: 60,
    attack: 10,
    x: 20,
    y: 20,
    health: 100,
    height: 30,
    points: 0,


    draw: function (context) {
        context.lineWidth = 5
        context.strokeStyle = "#333"
        context.fillStyle = "red"
        context.fillRect(this.x, this.y, this.health, this.height)
        context.strokeRect(this.x, this.y, this.maxWidth, this.height)
        context.font = "20px serif"
        context.fillStyle = "black"
        context.fillText(`Points : ${this.points}`, this.x, this.y + 50)

    }
}
const enemy = {
    animation: [
        {sX: 0, sY: 3, sH: 12},
        {sX: 0, sY: 16, sH: 15},
        {sX: 0, sY: 33, sH: 14},
        {sX: 0, sY: 53, sH: 10},
    ],
    sW: 16,
    w: 30,
    h: 30,

    position: {
        x: townCanvas.width / 2,
        y: townCanvas.height / 2,
    },
    frame: 0,
    health: 100,
    attack_damage: 5,
    changedY: 0,
    attacking: false,
    draw: function (i) {
        let ene = this.animation[this.frame]
        this.changedY = this.position.y + i * 50
        dungeonContext.drawImage(enemyImage, ene.sX, ene.sY, this.sW, ene.sH, this.position.x, this.changedY, this.w, this.h)
        this.frame += frames % 80 === 0 ? 1 : 0
        if (this.frame === 2) this.frame = 0
    },
}


const movables = [
    town, ...boundaries, foreground, ...battleZone, dungeon_map, ...wallBoundaries, enemy
]

const player = {

    playerUp: [
        {sX: 8, sY: 100},
        {sX: 72, sY: 100},
        {sX: 40, sY: 99},
    ],
    playerDown: [
        {sX: 9, sY: 4},
        {sX: 73, sY: 4},
        {sX: 41, sY: 3},
    ],
    playerRight: [
        {sX: 8, sY: 67},
        {sX: 72, sY: 67},
        {sX: 40, sY: 67},
    ],
    playerLeft: [
        {sX: 10, sY: 35},
        {sX: 74, sY: 35},
        {sX: 42, sY: 35},
    ],
    attackUp: [
        {sX: 8, sY: 100},
        {sX: 133, sY: 100},
        {sX: 40, sY: 99},
    ],
    attackDown: [
        {sX: 9, sY: 4},
        {sX: 134, sY: 4},
        {sX: 41, sY: 3},
    ],
    attackRight: [
        {sX: 8, sY: 67},
        {sX: 136, sY: 67},
        {sX: 40, sY: 67},
    ],
    attackLeft: [
        {sX: 10, sY: 35},
        {sX: 133, sY: 35},
        {sX: 42, sY: 35},
    ],
    sX: 41,
    sY: 3,
    sW: 15,
    sH: 18,
    x: townCanvas.width / 2,
    y: townCanvas.height / 2,
    w: 38,
    h: 45,
    moving: false,
    attack: false,

    frame: 0,
    p: [],
    draw: function (context) {
        if (direction === "up" && this.moving) this.p = this.playerUp[this.frame]
        if (direction === "down" && this.moving) this.p = this.playerDown[this.frame]
        if (direction === "right" && this.moving) this.p = this.playerRight[this.frame]
        if (direction === "left" && this.moving) this.p = this.playerLeft[this.frame]

        context.drawImage(playerImage, this.p.sX, this.p.sY, this.sW, this.sH, this.x, this.y, this.w, this.h)

        if (!this.moving && !this.attack) return
        this.frame += frames % 40 === 0 ? 1 : 0
        if (this.frame === 2) this.frame = 0


    },
}


let lastKey = ""

window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "w":
            keys.w.pressed = true
            lastKey = "w"
            break
        case "a":
            keys.a.pressed = true
            lastKey = "a"
            break
        case "s":
            keys.s.pressed = true
            lastKey = "s"
            break
        case "d":
            keys.d.pressed = true
            lastKey = "d"
            break
        case " ":
            keys.space.pressed = true
            lastKey = "space"
            break
    }
})

window.addEventListener("keyup", (e) => {
    switch (e.key) {
        case "w":
            keys.w.pressed = false
            break
        case "a":
            keys.a.pressed = false
            break
        case "s":
            keys.s.pressed = false
            break
        case "d":
            keys.d.pressed = false
            break
        case " ":
            keys.space.pressed = false
            break
    }
})

function isCollided(rect1, rect2) {
    return (
        rect1.x + rect1.w >= rect2.position.x &&
        rect1.x <= rect2.position.x + rect2.w &&
        rect1.y <= rect2.position.y + rect2.h &&
        rect1.y + rect1.h >= rect2.position.y
    )
}

function isEnemyNear(rect1, rect2) {
    return (
        rect1.x + rect1.w >= rect2.position.x - 16 &&
        rect1.x <= rect2.position.x + rect2.w + 16 &&
        rect1.y <= rect2.changedY + rect2.h + 16 &&
        rect1.y + rect1.h >= rect2.changedY - 16
    )
}


function keyPressed() {
    player.w = 38
    player.h = 45
    player.sW = 15
    player.sH = 18
    // player.p = player.playerDown[2]
    if (direction === "up") player.p = player.playerUp[2]
    if (direction === "down") player.p = player.playerDown[2]
    if (direction === "right") player.p = player.playerRight[2]
    if (direction === "left") player.p = player.playerLeft[2]
    let moving = true
    // player.frame = 2
    player.moving = false
    player.attack = false
    if (keys.w.pressed && lastKey === "w") {
        player.moving = true
        player.p = player.playerUp[player.frame]
        direction = "up"
        // player.update("up")
        if (!dungeon.started)
            for (let i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i]
                if (isCollided(player, {
                    ...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 3
                    }
                })) {
                    moving = false
                    break
                }
            }

        if (dungeon.started) {
            for (let i = 0; i < wallBoundaries.length; i++) {
                const boundary = wallBoundaries[i]
                if (isCollided(player, {
                    ...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y + 3
                    }
                })) {
                    moving = false
                    break
                }
            }

        }
        if (!dungeon.started)

            for (let i = 0; i < battleZone.length; i++) {
                const zone = battleZone[i]
                if (isCollided(player, zone)) {
                    console.log("battle zone")
                    dungeon.started = true
                    break
                }
            }
        if (moving) {
            // player.draw("up")
            movables.forEach((movable) => {
                movable.position.y += 3
            })
        }

    } else if (keys.a.pressed && lastKey === "a") {
        player.moving = true
        player.attack = true
        player.p = player.playerLeft[player.frame]
        direction = "left"
        if (!dungeon.started)

            for (let i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i]
                if (isCollided(player, {
                    ...boundary, position: {
                        x: boundary.position.x + 3,
                        y: boundary.position.y
                    }
                })) {
                    moving = false
                    break
                }
            }
        if (dungeon.started) {
            for (let i = 0; i < wallBoundaries.length; i++) {
                const boundary = wallBoundaries[i]
                if (isCollided(player, {
                    ...boundary, position: {
                        x: boundary.position.x + 3,
                        y: boundary.position.y
                    }
                })) {
                    moving = false
                    break
                }
            }
        }
        if (moving) {
            // player.draw("left")
            movables.forEach(movable => {
                movable.position.x += 3
            })
        }

    } else if (keys.s.pressed && lastKey === "s") {
        player.moving = true
        player.p = player.playerDown[player.frame]
        direction = "down"
        if (!dungeon.started)

            for (let i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i]
                if (isCollided(player, {
                    ...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y - 3
                    }
                })) {
                    moving = false
                    break
                }
            }
        if (dungeon.started) {

            for (let i = 0; i < wallBoundaries.length; i++) {
                const boundary = wallBoundaries[i]
                if (isCollided(player, {
                    ...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y - 3
                    }
                })) {
                    moving = false
                    break
                }
            }

        }
        if (moving) {
            // player.draw("down")
            movables.forEach(movable => {
                movable.position.y -= 3
            })
        }

    } else if (keys.d.pressed && lastKey === "d") {
        player.moving = true
        player.p = player.playerRight[player.frame]
        direction = "right"
        if (!dungeon.started)

            for (let i = 0; i < boundaries.length; i++) {
                const boundary = boundaries[i]
                if (isCollided(player, {
                    ...boundary, position: {
                        x: boundary.position.x - 3,
                        y: boundary.position.y
                    }
                })) {
                    moving = false
                    break
                }
            }
        if (dungeon.started) {

            for (let i = 0; i < wallBoundaries.length; i++) {
                const boundary = wallBoundaries[i]
                if (isCollided(player, {
                    ...boundary, position: {
                        x: boundary.position.x - 3,
                        y: boundary.position.y
                    }
                })) {
                    moving = false
                    break
                }
            }
        }
        if (moving) {
            movables.forEach(movable => {
                movable.position.x -= 3
            })
        }
    } else if (keys.space.pressed && lastKey === "space") {
        player.attack = true
        if (direction === "up") {
            player.p = player.attackUp[player.frame]
            player.sW = 21
            player.sH = 18
            player.w = 50
            player.h = 50
        }
        if (direction === "down") {
            player.p = player.attackDown[player.frame]
            player.sW = 21
            player.sH = 25
            player.w = 50
            player.h = 55
        }
        if (direction === "right") {
            player.p = player.attackRight[player.frame]
            player.sW = 21
            player.sH = 24
            player.w = 50
            player.h = 60
        }
        if (direction === "left") {
            player.p = player.attackLeft[player.frame]
            player.sW = 21
            player.sH = 24
            player.w = 50
            player.h = 60
        }

    }
}


function dungeon_function() {
    townCanvas.style.display = "none"
    dungeonCanvas.style.display = "inline"
    dungeon_map.draw()
    for (let i = 0; i < numberOfEnemy; i++) {
        enemy.draw(i)
        enemy.attacking = false
        if (isEnemyNear(player, enemy)) {
            console.log("attack")
            enemy.attacking = true
            if (enemy.attacking) {
                if (frames % 80 === 0)
                    stats.health -= 1
            }
        }

        //follow player
        if(enemy.position.x > player.x + 16){
            enemy.position.x--
        }
        if(enemy.position.x < player.x - 16){
            enemy.position.x++
        }
        if(enemy.changedY > player.y + 16){
            enemy.position.y--
        }
        if(enemy.changedY < player.y - 16){
            enemy.position.y++
        }

    }
    player.draw(dungeonContext)
    // boundaries.forEach(boundary => {
    //     boundary.position.x = 0
    //     boundary.position.y = 0
    // })
    // battleZone.forEach(boundary => {
    //     boundary.position.x = 0
    //     boundary.position.y = 0
    // })
    wallBoundaries.forEach(boundary => {
        boundary.draw()
    })
    stats.draw(dungeonContext)

}

function draw() {

    if (dungeon.started) {
        dungeon_function()

    } else {
        town.draw()
        boundaries.forEach(boundary => {
            boundary.draw()
        })
        battleZone.forEach(zone => {
            zone.draw()
        })
        player.draw(townContext)
        foreground.draw()
        stats.draw(townContext)

    }


}


function update() {

    keyPressed()
}

function loop() {
    update()
    draw()
    frames++
    requestAnimationFrame(loop)
}

loop()