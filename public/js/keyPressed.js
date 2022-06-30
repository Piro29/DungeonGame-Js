function keyPressed() {
    player.w = 38
    player.h = 45
    player.sW = 15
    player.sH = 18
    if (direction === "up") player.p = player.playerUp[2]
    if (direction === "down") player.p = player.playerDown[2]
    if (direction === "right") player.p = player.playerRight[2]
    if (direction === "left") player.p = player.playerLeft[2]
    let moving = true
    player.moving = false
    player.attack = false
    upgrade.started = false
    if (keys.w.pressed && lastKey === "w") {
        player.moving = true
        player.p = player.playerUp[player.frame]
        direction = "up"
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

        swordAudio.play()

        enemies.forEach((enemy)=>{
            if (isEnemyNear(player, enemy)) {
                if (frames % 40 === 0) {
                    enemy.health -= stats.attack
                }
            }
        })
        
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