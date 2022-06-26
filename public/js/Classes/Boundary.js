class Boundary {

    static width = 48
    static height = 48

    constructor({position}) {
        this.position = position
        this.w = 48
        this.h = 48
    }

    draw() {
        townContext.fillStyle = "rgba(255,0,0,0)"
        townContext.fillRect(this.position.x, this.position.y, this.w, this.h)
    }
}