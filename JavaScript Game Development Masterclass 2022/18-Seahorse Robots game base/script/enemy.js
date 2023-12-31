export class Enemy {
    constructor(game){
        this.game = game;
        this.x = this.game.width;
        this.speedx = Math.random() * -1.5 - 0.5;
        this.markedForDeletion = false;
        this.lives = 1;
        this.score = 1;

    }
    update(){
        this.x += this.speedx;
        if(this.x +this.width < 0) this.markedForDeletion = true;
        
    }
    draw(context){
        context.fillStyle='red';
        context.fillRect(this.x, this.y, this.width, this.height);
        context.fillStyle = 'black';
        context.font = '20px Helvetica';
        context.fillText(this.lives, this.x, this.y);

    }
}
export class Angler extends Enemy{
    constructor(game){
        super(game);
        this.width = 228 * 0.2;
        this.height = 169 * 0.2;
        this.y = Math.random() * (this.game.height * 0.9 - this.height);
        this.lives = 1;
        this.score = 1;
    }
   
}
