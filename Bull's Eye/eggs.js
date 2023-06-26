import {Larva} from './larva.js'
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
        this.hatchTimer = 0;
        this.hatchInterval = Math.random() * 5000 + 2000;
        this.markedForDeletion = false;

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
            context.fillText(Math.floor((this.hatchInterval - this.hatchTimer) * .01),this.collisionX, this.collisionY - this.collisionRadius -50);
        }
    }
    update(deltaTime){
        
        this.spriteX = this.collisionX - (this.spriteWidth * 0.5);
        this.spriteY = this.collisionY - (this.spriteHeight * 0.62);
        // collisions
        let collisionObjects = [this.game.player, ...this.game.obstacles,...this.game.enemies];
        collisionObjects.forEach( object =>{
            let [collision,distance,sumOfRadii,dx,dy] = this.game.checkCollision(this, object);
            if (collision){
                const unit_x = dx / distance;
                const unit_y = dy / distance;
                this.collisionX = object.collisionX +(sumOfRadii + 1) * unit_x;
                this.collisionY = object.collisionY +(sumOfRadii + 1) * unit_y;
            }
        });

        //hatching 
       
        if (this.hatchTimer > this.hatchInterval){
            this.markedForDeletion = true;
            this.game.removeGameObjects();
            //console.log(this.game.eggs);
            this.game.hatchlings.push(new Larva(this.game,this.collisionX, this.collisionY))
        } else  {
            this.hatchTimer += deltaTime;
        }
    }
}