class Stats {
    constructor() {
        this.maxWidth = 100
        this.attack = 10
        this.x = 20
        this.y = 20
        this.maxHealth = 100
        this.health = 100
        this.height = 30
        this.points = 100
    }

    draw(context) {
        context.lineWidth = 5
        context.strokeStyle = "#333"
        context.fillStyle = "red"
        let relativeW = this.health / this.maxHealth
        context.fillRect(this.x, this.y, relativeW * this.maxWidth, this.height)
        context.strokeRect(this.x, this.y, this.maxWidth, this.height)
        context.font = "20px serif"
        context.fillStyle = "white"
        context.fillText(`Points : ${this.points}`, this.x, this.y + 50)
        context.fillText(`Damage : ${this.attack}`, this.x, this.y + 80)
        context.font = "15px serif"
        context.fillText(`Health : ${this.health}`, this.x + 10, this.y + 20)
    }
}