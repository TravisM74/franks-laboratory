export class Obstacle {
    constructor(game){
        this.game = game;
        this.collisionX = Math.random() * this.game.width;
        this.collisionY = Math.random() * this.game.height;
        this. collisionRadius = 50;
        this.image = document.getElementById('obstacles');
        this.spriteHeight = 250;
        this.spriteWidth = 250;
        this.frameY = Math.floor(Math.random() * 3);
        this.frameX = Math.floor(Math.random() * 2);
        this.x = this.collisionX - (this.spriteWidth * 0.5) ;
        this.y = this.collisionY - (this.spriteHeight * 0.8);
    }
    draw(context){
        context.drawImage(this.image,this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.spriteWidth, this.spriteHeight)
        context.beginPath();
        context.arc(this.collisionX,this.collisionY,this.collisionRadius,0,Math.PI * 2);
        context.save();
        context.globalAlpha = 0.3;
        context.fill();
        context.restore();
        context.stroke();
    }
}