export class Enemy{
    constructor(game, positionX, positionY){
        this.game = game;
        this.width = this.game.enemySize;
        this.height = this.game.enemySize;
        this.x = 0;
        this.y = 0;
        this.positionX = positionX;
        this.positionY = positionY;
        this.markedForDeletion = false;
        
    }
    draw(context){
        context.strokeRect(this.x, this.y, this.width, this.height); 
    }
    update(x,y){
        this.x = x + this.positionX;
        this.y = y + this.positionY;
        // checkCollison enemies - projectiles
        this.game.projectilesPool.forEach(p => {
            if(!p.free && this.game.checkCollision(p , this) && (this.lives > 0)){
                //this.markedForDeletion = true;
                this.hit(1);
                p.reset();
            }
        });
        // collison with player 
        if(this.game.checkCollision(this, this.game.player)&& this.lives > 0){
            //this.markedForDeletion = true;
            this.lives = 0;
            this.game.score--;
            this.game.player.lives--; 
        }    
        //lose condition
        if (this.y + this.height > this.game.height || this.game.player.lives < 1) {
            this.game.gameOver= true;
        }

        //this.timer += deltaTime;
        if (this.lives < 1 ) {
            if (this.game.spriteUpdate){
                this.frameX++;
                //this.timer = 0;
            } 
            if (this.frameX > this.maxFrame){
                this.markedForDeletion = true;
                if (!this.game.gameOver)this.game.score++;
            }
        }
            
    } 

    hit(damage){
        this.lives -= damage;         
    }
}
export class Beetlemorph extends Enemy{
    constructor(game, positionX, positionY){
        super(game, positionX, positionY);
        this.image = document.getElementById('beetle');
        this.spriteWidth = 80;
        this.spriteHeight = 80;
        this.frameX = 0;
        this.frameY = Math.floor(Math.random() * 4);
        this.lives = 1;
        this.maxFrame = 2;
        this.maxLives = this.lives;
        //this.fps = 10;
        //this.interval = 1000/this.fps;
        //this.timer = 0
    }
    draw(context){
        context.drawImage(this.image, 
            this.spriteWidth * this.frameX, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight,
            this.x, this.y, this.width, this.height);
        }
        
    }