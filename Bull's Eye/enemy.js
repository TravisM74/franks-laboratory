export class Enemy {
    constructor(game){
        //toad eggPusher
        this.game = game;
        this.spriteWidth = 140;
        this.spriteHeight = 260;
        this.collisionRadius = 30;
        this.safeZone = 100;
        this.margin = this.collisionRadius * 2;
        this.collisionX = this.game.width + this.spriteWidth;
        this.collisionY = this.game.topMargin +this.safeZone + Math.random() * (this.game.height - (this.game.topMargin + this.margin + this.safeZone));
        this.image = document.getElementById('toad');
        this.frameX = 0;
        this.frameY = 0;
        this.spriteX = this.collisionX - (this.spriteWidth * 0.5);
        this.spriteY = this.collisionY - (this.spriteHeight * 0.62);
        this.baseSpeed = 0.5;
        this.speedVariance  = 3;
        this.speedX = this.newSpeed();
    }
    newSpeed(){
       return Math.random() * this.speedVariance + this.baseSpeed;
    }
    draw(context){
        context.drawImage(this.image,this.spriteX, this.spriteY);
        if(this.game.debug){
            //collision circle visual
            context.beginPath();
            context.arc(this.collisionX,this.collisionY,this.collisionRadius,0,Math.PI * 2);
            context.save();
            context.globalAlpha = 0.3;
            context.fill();
            context.restore();
            context.stroke();
        }
    };
    update(){
        this.collisionX -= this.speedX;
        this.spriteX = this.collisionX - (this.spriteWidth * 0.5);
        this.spriteY = this.collisionY - (this.spriteHeight * 0.86);
        if (this.spriteX + this.spriteWidth < 0 ) {
            this.collisionX = this.game.width + this.spriteWidth ;
            this.collisionY = this.game.topMargin +this.safeZone + Math.random() * (this.game.height - (this.game.topMargin + this.margin + this.safeZone));
            this.speedX =this.newSpeed();
        }
        let collisionObjects = [this.game.player, ...this.game.obstacles];
        collisionObjects.forEach( object =>{
            let [collision,distance,sumOfRadii,dx,dy] = this.game.checkCollision(this, object);
            if (collision){
                const unit_x = dx / distance;
                const unit_y = dy / distance;
                this.collisionX = object.collisionX +(sumOfRadii + 1) * unit_x;
                this.collisionY = object.collisionY +(sumOfRadii + 1) * unit_y;
            }
        });
    }
}