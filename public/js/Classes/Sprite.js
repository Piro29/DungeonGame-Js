class Sprite {
    constructor({position, image, context}) {
        this.position = position
        this.image = image
        this.context = context
    }

    draw() {
       this.context.drawImage(this.image, this.position.x, this.position.y)
    }
}