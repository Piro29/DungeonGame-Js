class Player {
    constructor(){
        this.playerUp = [
            {sX: 8, sY: 100},
            {sX: 72, sY: 100},
            {sX: 40, sY: 99},
        ]
        this.playerDown = [
            {sX: 9, sY: 4},
            {sX: 73, sY: 4},
            {sX: 41, sY: 3},
        ]
        this.playerRight = [
            {sX: 8, sY: 67},
            {sX: 72, sY: 67},
            {sX: 40, sY: 67},
        ]
        this.playerLeft= [
            {sX: 10, sY: 35},
            {sX: 74, sY: 35},
            {sX: 42, sY: 35},
        ]
        this.attackUp= [
            {sX: 8, sY: 100},
            {sX: 133, sY: 100},
            {sX: 40, sY: 99},
        ]
        this.attackDown = [
            {sX: 9, sY: 4},
            {sX: 134, sY: 4},
            {sX: 41, sY: 3},
        ]
        this.attackRight= [
            {sX: 8, sY: 67},
            {sX: 136, sY: 67},
            {sX: 40, sY: 67},
        ],
        this.attackLeft = [
            {sX: 10, sY: 35},
            {sX: 133, sY: 35},
            {sX: 42, sY: 35},
        ]
        this.sX= 41
        this.sY= 3
        this.sW= 15
        this.sH= 18
        this.x= townCanvas.width / 2
        this.y= townCanvas.height / 2
        this.w= 38
        this.h=45
        this.moving= false
        this.attack= false
    
        this.frame= 0
        this.p = []
    }

    update(){
        if (!this.moving && !this.attack) return
        this.frame += frames % 40 === 0 ? 1 : 0
        if (this.frame === 2) this.frame = 0
        
    }

    draw(context){

        if (direction === "up" && this.moving) this.p = this.playerUp[this.frame]
        if (direction === "down" && this.moving) this.p = this.playerDown[this.frame]
        if (direction === "right" && this.moving) this.p = this.playerRight[this.frame]
        if (direction === "left" && this.moving) this.p = this.playerLeft[this.frame]

        context.drawImage(playerImage, this.p.sX, this.p.sY, this.sW, this.sH, this.x, this.y, this.w, this.h)
         this.update()
 
    }
}