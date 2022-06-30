function dungeon_function() {
    dungeon.started = true

    townCanvas.style.display = "none"
    dungeonCanvas.style.display = "inline"
    dungeon_map.draw()


    dungeonContext.font = "20px serif"
    dungeonContext.fillStyle = "white"
    dungeonContext.fillText(`Highest Level : ${highestLevel}`, 500, 60)
    dungeonContext.fillText(`Level : ${level}`, 530, 100)
    // enemies = enemies.filter(ene => !ene.dead)

    //check if all enemies are dead
    if(enemies.reduce((prev, curr) => prev && curr.dead === true, true)){
        completeLevel.style.display = `grid`
    }
    
    enemies.forEach((ene) => {
        if(!ene.dead){
            
            ene.draw(dungeonContext)
        }
    })

    enemies.forEach((enemy) => {
        enemy.attacking = false
        if (!enemy.dead) {
            if (isEnemyNear(player, enemy)) {
                enemy.attacking = true
            }
            if (enemy.attacking) {
                if (frames % 80 === 0)
                    stats.health -= enemy.attack_damage
            }
        }
    })



    //draw player in dungeon
    player.draw(dungeonContext)

    //wall collision in dungeon
    wallBoundaries.forEach(boundary => {
        boundary.draw()
    })

    //stats in dungeon
    stats.draw(dungeonContext)

    if (stats.health <= 0) {
        gameOverWindow.style.display = "block"
        pause = true


    }

    enemies.forEach((enemy) => {

        if (!enemy.dead) {

            if (enemy.health <= 0) {
                stats.points++
                enemy.attacking = false
                enemy.dead = true
            }
        }
    })

}