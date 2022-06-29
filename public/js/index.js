

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



function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}


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


upgradeZoneMap.forEach((row, index) => {
    row.forEach((symbol, rowIndex) => {
        if (symbol === 1025)
            upgradeZone.push((new Boundary({
                position: {
                    x: rowIndex * Boundary.width + offset.x,
                    y: index * Boundary.height + offset.y
                }
            })))
    })
})

let stats = new Stats()

let slimeEnemy = new Slime({ image: enemyImage, position: slimePosition })
let snakeEnemy = new Snake({ image: snakeImage, position: snakePosition })


const movables = [
    town, ...boundaries, foreground, ...battleZone, dungeon_map, ...wallBoundaries, slimeEnemy, snakeEnemy, ...upgradeZone
]


const player = new Player()


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
        rect1.x + rect1.w >= rect2.position.x - 25 &&
        rect1.x <= rect2.position.x + rect2.w + 25 &&
        rect1.y <= rect2.position.y + rect2.h + 25 &&
        rect1.y + rect1.h >= rect2.position.y - 25
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
    upgrade.started = false
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
        if (!dungeon.started) {

            for (let i = 0; i < battleZone.length; i++) {
                const zone = battleZone[i]
                if (isCollided(player, zone)) {
                    dungeon.started = true
                    break
                }
            }
            for (let i = 0; i < upgradeZone.length; i++) {
                const zone = upgradeZone[i]
                if (isCollided(player, zone)) {
                    upgrade.started = true
                    upgrade_function()
                    break
                }
            }
            if (!upgrade.started) {
                upgradeWindow.style.display = "none"
            }


        }
        if (moving) {
            movables.forEach((movable) => {
                movable.position.y += 3
            })
        }

    } else if (keys.a.pressed && lastKey === "a") {
        player.moving = true
        player.p = player.playerLeft[player.frame]
        direction = "left"
        if (!dungeon.started) {

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
            if (!upgrade.started) {
                upgradeWindow.style.display = "none"
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
            movables.forEach(movable => {
                movable.position.x += 3
            })
        }

    } else if (keys.s.pressed && lastKey === "s") {
        player.moving = true
        player.p = player.playerDown[player.frame]
        direction = "down"
        if (!dungeon.started) {

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
            if (!upgrade.started) {
                upgradeWindow.style.display = "none"
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
            movables.forEach(movable => {
                movable.position.y -= 3
            })
        }

    } else if (keys.d.pressed && lastKey === "d") {
        player.moving = true
        player.p = player.playerRight[player.frame]
        direction = "right"
        if (!dungeon.started) {

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
            if (!upgrade.started) {
                upgradeWindow.style.display = "none"
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

        if (isEnemyNear(player, slimeEnemy)) {
            if (frames % 40 === 0) {
                slimeEnemy.health -= stats.attack
            }


        }
        if (isEnemyNear(player, snakeEnemy)) {
            if (frames % 40 === 0) {
                snakeEnemy.health -= stats.attack
            }


        }
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

enemies.push(slimeEnemy)
enemies.push(snakeEnemy)

function dungeon_function() {
    dungeon.started = true

    townCanvas.style.display = "none"
    dungeonCanvas.style.display = "inline"
    dungeon_map.draw()
    enemies = enemies.filter(ene => !ene.dead)
    if (enemies.length === 0) {
        completeLevel.style.display = `grid`

    }
    enemies.forEach(ene => {
        ene.draw(dungeonContext)
    })

    slimeEnemy.attacking = false
    snakeEnemy.attacking = false

    if (!slimeEnemy.dead) {
        if (isEnemyNear(player, slimeEnemy)) {
            slimeEnemy.attacking = true
        }
        if (slimeEnemy.attacking) {
            if (frames % 80 === 0)
                stats.health -= slimeEnemy.attack_damage
        }
    }

    if (!snakeEnemy.dead) {
        if (isEnemyNear(player, snakeEnemy)) {
            snakeEnemy.attacking = true
        }
        if (snakeEnemy.attacking) {
            if (frames % 80 === 0)
                stats.health -= snakeEnemy.attack_damage
        }
    }




    player.draw(dungeonContext)
    wallBoundaries.forEach(boundary => {
        boundary.draw()
    })
    stats.draw(dungeonContext)

    if (stats.health <= 0) {
        gameOverWindow.style.display = "block"
        pause = true
    }

    if (!slimeEnemy.dead) {

        if (slimeEnemy.health <= 0) {
            stats.points++
            slimeEnemy.attacking = false
            slimeEnemy.dead = true
        }
    }

    console.log("slime" + isEnemyNear(player, slimeEnemy));
    console.log(isEnemyNear(player, snakeEnemy));

    if (!snakeEnemy.dead) {
        if (snakeEnemy.health <= 0) {
            stats.points++
            snakeEnemy.attacking = false
            snakeEnemy.dead = true
        }
    }
}


function upgrade_function() {
    upgradeWindow.style.display = `grid`
}

goHomeButton.addEventListener("click", () => {
    dungeon.started = false
    townCanvas.style.display = "inline"
    dungeonCanvas.style.display = "none"
    completeLevel.style.display = `none`
    slimeEnemy.health = slimeEnemy.maxHealth = 50 + (level * 5)
    snakeEnemy.health = snakeEnemy.maxHealth = 50 + (level * 5)
    level++
    slimeEnemy.attack_damage = 5 + (level * 2)
    snakeEnemy.attack_damage = 5 + (level * 2)
    slimeEnemy.dead = false
    snakeEnemy.dead = false
    enemies.push(slimeEnemy)
    enemies.push(snakeEnemy)
})

nextLevelButton.addEventListener("click", () => {
    completeLevel.style.display = `none`
    slimeEnemy.dead = false
    snakeEnemy.dead = false
    enemies.push(slimeEnemy)
    enemies.push(snakeEnemy)
    slimeEnemy.health = slimeEnemy.maxHealth = 50 + (level * 2)
    snakeEnemy.health = snakeEnemy.maxHealth = 50 + (level * 2)
    slimeEnemy.attack_damage = 5 + (level * 2)
    snakeEnemy.attack_damage = 5 + (level * 2)
    level++
})

upgradeDamageButton.addEventListener("click", () => {
    status.style.color = "white"
    status.style.textAlign = "center"
    if (stats.points < 5) status.innerHTML = "Not Enought Points"
    else {
        stats.attack += 5
        stats.points -= 5
        status.innerHTML = "Upgraded"
    }

    setTimeout(() => {
        status.innerHTML = ""
    }, 1000)

})
upgradeHealthButton.addEventListener("click", () => {
})

restartButton.addEventListener("click", () => {
    dungeon.started = false
    stats.health = 100
    pause = false
    loop()
    gameOverWindow.style.display = "none"
    townCanvas.style.display = "inline"
    dungeonCanvas.style.display = "none"
    level = 1
    stats.points = 0
    stats.attack = 10
})

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
        if (stats.health !== 100) stats.health++

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
})
