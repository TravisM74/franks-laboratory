export class Egg{
    constructor(game){
        this.game = game;
        this.collisionRadius = 40;
        this.margin = this.collisionRadius * 2;
        this.collisionX =this.margin + Math.random() * (this.game.width - (this.margin * 2.3 ));
        this.collisionY = this.game.topMargin + Math.random() * (this.game.height - (this.game.topMargin + this.margin));
        this.image = document.getElementById('egg');
        this.spriteWidth = 110;
        this.spriteHeight = 135;
        this.frameX = 0;
        this.frameY = 0;
        this.spriteX = this.collisionX - (this.spriteWidth * 0.5);
        this.spriteY = this.collisionY - (this.spriteHeight * 0.62);

    }
    draw(context){
        context.drawImage(this.image, this.spriteX, this.spriteY);
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
    update(){
        
    }
}