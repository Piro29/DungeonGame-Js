class Slime {
    constructor({position, image}) {

        this.dead = false
        this.maxWidth = 50
        this.animation = [
            {sX: 0, sY: 3, sH: 12},
            {sX: 0, sY: 16, sH: 15},
            {sX: 0, sY: 33, sH: 14},
            {sX: 0, sY: 53, sH: 10},
        ]
        this.sW = 16
        this.w = 30
        this.h = 30

        this.position = position
        this.frame = 0
        this.maxHealth = 50
        this.health = 50
        this.attack_damage = 5
        this.changedY = 0
        this.attacking = false
        this.speed = 8
        this.healthBarHeight = 8
        this.image = image
        this.hit = false

    }

    update() {
        this.frame += frames % 80 === 0 ? 1 : 0
        if (this.frame === 3) this.frame = 0


        if (this.position.x > player.x + 25) {
            if (frames % this.speed === 0)
                this.position.x--
        } else if (this.position.x < player.x - 25) {
            if (frames % this.speed === 0)
                this.position.x++
        }
        if (this.changedY > player.y - 25) {
            if (frames % this.speed === 0)
                this.position.y--
        } else if (this.changedY < player.y + 25) {
            if (frames % this.speed === 0)
                this.position.y++
        }

    }

    drawHealth(ctx) {
        ctx.lineWidth = 2
        ctx.strokeStyle = "#333"
        ctx.fillStyle = "red"
        let relativeW = (this.health / this.maxHealth)*this.maxWidth;

       
        
        ctx.fillRect(this.position.x - 10, this.position.y - 15, relativeW, this.healthBarHeight)
        ctx.strokeRect(this.position.x - 10, this.position.y - 15, this.maxWidth, this.healthBarHeight)
    }

    draw(ctx) {
        let ene = this.animation[this.frame]
        this.changedY = this.position.y
        if(this.hit) {
            ctx.globalAlpha = 0.2
        }
        dungeonContext.drawImage(this.image, ene.sX, ene.sY, this.sW, ene.sH, this.position.x, this.changedY, this.w, this.h)

        this.drawHealth(ctx)
        this.update()
        if(this.hit) {
            ctx.globalAlpha = 1
            setTimeout(() => {
                this.hit = false
            }, 100)
        }
    }



}

class Snake extends Slime {
    constructor({position, image}) {
        super({position, image})
        this.sW = 14
        this.position = position
        this.speed = 5
        this.animation = [
            {sX: 1, sY: 2, sH: 13},
            {sX: 1, sY: 19, sH: 12},
            {sX: 1, sY: 34, sH: 13},
            {sX: 1, sY: 51, sH: 12},
        ]

    }


}

class Axolot extends Slime {
    constructor({position, image}) {
        super({position, image})
        this.sW = 14
        this.position = position
        this.speed = 3
        this.animation = [
            {sX: 1, sY: 2, sH: 13},
            {sX: 1, sY: 19, sH: 12},
            {sX: 1, sY: 34, sH: 13},
            {sX: 1, sY: 51, sH: 12},
        ]

    }


}

class Bamboo extends Slime {
    constructor({position, image}) {
        super({position, image})
        this.sW = 14
        this.position = position
        this.speed = 7
        this.animation = [
            {sX: 1, sY: 2, sH: 13},
            {sX: 1, sY: 19, sH: 12},
            {sX: 1, sY: 34, sH: 13},
            {sX: 1, sY: 51, sH: 12},
        ]

    }


}

class Beast extends Slime {
    constructor({position, image}) {
        super({position, image})
        this.sW = 14
        this.position = position
        this.speed = 7
        this.animation = [
            {sX: 1, sY: 2, sH: 13},
            {sX: 1, sY: 19, sH: 12},
            {sX: 1, sY: 34, sH: 13},
            {sX: 1, sY: 51, sH: 12},
        ]

    }


}