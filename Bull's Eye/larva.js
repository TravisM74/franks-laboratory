export class Larva {
    constructor(game, x, y){
        this.game = game;
        this.collisionX = x;
        this.collisionY = y;
        this.spriteWidth = 150;
        this.spriteHeight = 150;
        this.collisionRadius = 30;
        this.image = document.getElementById('larva');
        this.frameX = 0;
        this.frameY = Math.floor(Math.random() *2);
        this.spriteX = this.collisionX - (this.spriteWidth * 0.5);
        this.spriteY = this.collisionY - (this.spriteHeight * 0.62);
        this.speedY = 1 + Math.random();
        this.markedForDeletion = false;

    }
    draw(context){
        context.drawImage(this.image, this.spriteWidth * this.frameX, this.spriteHeight * this.frameY, this.spriteWidth, this.spriteHeight, this.spriteX, this.spriteY, this.spriteWidth, this.spriteHeight);
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

    }
    update(){
        this.collisionY -= this.speedY;
        this.spriteX = this.collisionX - (this.spriteWidth * 0.5);
        this.spriteY = this.collisionY - (this.spriteHeight * 0.8); 
        //moved to saftey
        if (this.collisionY < this.game.topMargin) {
            this.markedForDeletion = true;
            this.game.removeGameObjects();
            this.game.safeHatchlings++;

        }

        //collision with objects
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
        //collision with Enemies
        this.game.enemies.forEach(enemy => {
            if (this.game.checkCollision(this, enemy)[0]){
                this.markedForDeletion = true;
                this.game.removeGameObjects();
                this.game.lostHatchlings++;
                //console.log (this.game.lostHatchlings);
            }
        });
    }
}