export class Obstacle {
    constructor(game){
        this.game = game;
        this.collisionX = Math.random() * this.game.width;
        this.collisionY = Math.random() * this.game.height;
        this. collisionRadius = 40;
        this.image = document.getElementById('obstacles');
        this.spriteHeight = 250;
        this.spriteWidth = 250;
        this.frameX = Math.floor(Math.random() * 4);
        this.frameY = Math.floor(Math.random() * 3);
        this.spriteX = this.collisionX - (this.spriteWidth * 0.5) ;
        this.spriteY = this.collisionY - (this.spriteHeight * 0.81);
    }
    draw(context){
        context.drawImage(this.image,this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.spriteX, this.spriteY, this.spriteWidth, this.spriteHeight);
        if(this.game.debug){
            context.beginPath();
            context.arc(this.collisionX,this.collisionY,this.collisionRadius,0,Math.PI * 2);
            context.save();
            context.globalAlpha = 0.3;
            context.fill();
            context.restore();
            context.stroke();
        }
    }
}