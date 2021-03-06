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

goHomeButton.addEventListener("click", () => {
    dungeon.started = false
    townCanvas.style.display = "inline"
    dungeonCanvas.style.display = "none"
    completeLevel.style.display = `none`
    level++

    enemies.forEach((enemy) => {
        enemy.dead = false
        enemy.health = enemy.maxHealth = 50 + (level * 4)
        enemy.attack_damage = 5 + (level * 4)
    })

    getHighestLevel()
    setHighestLevel()
})

nextLevelButton.addEventListener("click", () => {

    completeLevel.style.display = `none`

    slimeEnemy.position = {
        x: 600,
        y: 300,
    }
    snakeEnemy.position = {
        x: 600,
        y: 400,
    }
    axolotEnemy.position = {
        x: 600,
        y: 500,
    }
    bambooEnemy.position = {
        x: 600,
        y: 600,
    }

    beastEnemy.position = {
        x: 600,
        y: 700,
    }

    enemies.forEach((enemy) => {
        enemy.dead = false
        enemy.health = enemy.maxHealth = 50 + (level * 4)
        enemy.attack_damage = 5 + (level * 4)
    })

    level++

    getHighestLevel()
    setHighestLevel()
})

upgradeDamageButton.addEventListener("click", () => {
    status.style.color = "white"
    status.style.textAlign = "center"
    if (stats.points < 5) status.innerHTML = "Not Enought Points"
    else {
        stats.attack += 5
        stats.points -= 5
        status.innerHTML = "Damage Upgraded"
    }

    setTimeout(() => {
        status.innerHTML = ""
    }, 1000)

})
upgradeHealthButton.addEventListener("click", () => {
    status.style.color = "white"
    status.style.textAlign = "center"
    if (stats.points < 5) status.innerHTML = "Not Enought Points"
    else {
        if (stats.maxWidth < 200) {
            stats.maxWidth += 50
        }
        stats.health += 50
        stats.maxHealth += 50
        stats.points -= 5
        status.innerHTML = "Health Upgraded"
    }

    setTimeout(() => {
        status.innerHTML = ""
    }, 1000)

})

restartButton.addEventListener("click", () => {
    dungeon.started = false
    stats.health = 100
    pause = false
    loop()
    gameOverWindow.style.display = "none"
    townCanvas.style.display = "inline"
    dungeonCanvas.style.display = "none"

    enemies.forEach((enemy) => {
        enemy.health = enemy.maxHealth
    })

    getHighestLevel()
    setHighestLevel()
})