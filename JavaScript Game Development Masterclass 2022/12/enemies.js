class Enemy {
    constructor(){
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 20;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
        this.markedForDeletion = false;
        
    }
    update(deltaTime){
        //movement
        this.x -= this.speedX + this.game.speed;
        this.y += this.speedY;
        //frame animation
        if (this.frameTimer > this.frameInterval){
            this.frameX < this.maxFrame ? this.frameX++ : this.frameX = 0  ; 
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }
        //check for off screen
        if(this.x + this.sWidth < 0 ) this.markedForDeletion = true;
    }
    draw(context){
         //debug mode
         if (this.game.debug) context.strokeRect(this.x, this.y, this.sWidth, this.sHeight);
        
        context.drawImage(this.image, this.frameX * this.sWidth, 0, this.sWidth, this.sHeight, 
            this.x , this.y , this.sWidth, this.sHeight)
    }
}

export class FlyingEnemy extends Enemy{
    constructor(game){
        super();
        this.game = game;
        this.image = document.getElementById('enemyfly');
        this.sWidth = 60;
        this.sHeight = 44;
        this.maxFrame = 4;
        this.x = this.game.width + this.sWidth;
        this.y = Math.floor(Math.random() * (this.game.height * 0.6));
        this.speedX = .5 + Math.random();
        this.speedY = 0;
        this.angle = 0; 
        this.va = Math.random() * 0.1 + 0.1;

    }
    update(deltaTime){
        super.update(deltaTime);
        this.angle += this.va;
        this.y += Math.sin(this.angle);
        
    }
}

export class GroundEnemy extends Enemy{
    constructor(game){
        super();
        this.game = game;
        this.image = document.getElementById('enemyplant');
        this.maxFrame = 1;
        this.sWidth = 60;
        this.sHeight = 87;
        this.x = this.game.width;
        this.y = this.game.height - this.sHeight - this.game.groundMargin;
        this.speedX = 0;
        this.speedY = 0;

    }
}
export class ClimbingEnemy extends Enemy{
    constructor(game){
        super();
        this.game = game;
        this.image = document.getElementById('enemyspider');
        this.sWidth = 120;
        this.sHeight = 144;
        this.x = this.game.width;
        this.y = Math.random() * this.game.height * 0.5;
        this.speedX = 0;
        this.speedY = Math.random() > 0.5 ? 1 : -1;
        this.maxFrame = 5;
    }
    update(deltaTime){
        super.update(deltaTime);
        if (this.y > this.game.height - this.game.groundMargin - this.sHeight) this.speedY *= -1;
        if (this.y < -this.sHeight) this.speedY *= -1;
    }
    draw(context){
        super.draw(context);
        context.beginPath();
        context.moveTo(this.x + this.sWidth * 0.5, this.y + this.sHeight * 0.5);
        context.lineTo(this.x + this.sWidth * 0.5, 0 );
        context.stroke();
    }
}