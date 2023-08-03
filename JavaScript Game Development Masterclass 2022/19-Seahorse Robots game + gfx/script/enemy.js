export class Enemy {
    constructor(game){
        this.game = game;
        this.x = this.game.width;
        this.speedx = Math.random() * -1.5 - 0.5;
        this.markedForDeletion = false;
        this.lives = 2;
        this.score = 2;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 37;

    }
    update(){
        this.x += this.speedx - this.game.speed;
        if(this.x +this.width < 0) this.markedForDeletion = true;
        if (this.frameX < this.maxFrame) this.frameX++;
        else this.frameX= 0;
        
    }
    draw(context){
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        if (this.game.debug) {
            context.strokeRect(this.x, this.y, this.width, this.height);
            context.font = '20px Helvetica';
            context.fillText(this.lives, this.x, this.y);
        }

    }
}
export class Angler extends Enemy{
    constructor(game){
        super(game);
        this.width = 228 ;
        this.height = 169 ;
        this.y = Math.random() * (this.game.height * 0.95 - this.height);
        this.lives = 2;
        this.score = 2;
        this.image = document.getElementById('angler1');
        this.frameY = Math.floor(Math.random() * 3);
        this.maxFrame = 37;
    }
   
}
export class Angler2 extends Enemy{
    constructor(game){
        super(game);
        this.width = 213 ;
        this.height = 165 ;
        this.y = Math.random() * (this.game.height * 0.95 - this.height);
        this.lives = 3;
        this.score = 3 ;
        this.image = document.getElementById('angler2');
        this.frameY = Math.floor(Math.random() * 2);
        this.maxFrame = 37;
    }
   
}
export class LuckyFish extends Enemy{
    constructor(game){
        super(game);
        this.width = 99 ;
        this.height = 95 ;
        this.y = Math.random() * (this.game.height * 0.95 - this.height);
        this.lives = 3;
        this.score = 15;
        this.image = document.getElementById('lucky');
        this.frameY = Math.floor(Math.random() * 2);
        this.maxFrame = 37;
        this.type='lucky';
    }
   
}
export class HiveWhale extends Enemy{
    constructor(game){
        super(game);
        this.width = 400 ;
        this.height = 227 ;
        this.y = Math.random() * (this.game.height * 0.9 - this.height);
        this.lives = 15;
        this.score = this.lives;
        this.image = document.getElementById('hivewhale');
        this.frameY = 0;
        this.maxFrame = 37;
        this.type='hive';
        this.speedX = Math.random() *-1.2 - 0.2;
    }
   
}
export class Drone extends Enemy{
    constructor(game, x, y){
        super(game);
        this.x = x;
        this.y = y;
        this.width = 115 ;
        this.height = 95 ;
        this.y = Math.random() * (this.game.height * 0.9 - this.height);
        this.lives = 3;
        this.score = this.lives;
        this.image = document.getElementById('drone');
        this.frameY = Math.floor(Math.random() * 2);
        this.maxFrame = 37;
        this.type='drone';
        this.speedX = Math.random() *-4.2 - 0.5;
    }
   
}