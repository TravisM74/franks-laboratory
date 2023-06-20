export class Player{
    constructor(game){
    this.game = game;
    this.spriteWidth = 100;
    this.spriteHeight = 91.3;
    this.x = 0;
    this.y = this.game.height - this.spriteHeight;
    this.image = document.getElementById('player');
    this.frameX = 0;
    this.frameY = 0;
    this.speed = 0;
    this.maxSpeed = 10;
    this.vy = 0
    this.weight = .2;
    this.jumpStrength = 13;


    }
    update(input){
        //Horazontal movment
        this.x += this.speed;
        if (input.includes('ArrowRight')) this.speed = this.maxSpeed;
        else if (input.includes('ArrowLeft')) this.speed = -this.maxSpeed;
        else this.speed= 0;
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.spriteWidth)this.x = this.game.width - this.spriteWidth;
        //vertial Movement
        if(input.includes('ArrowUp')&& this.onGround()) this.vy = -this.jumpStrength;
        this.y += this.vy;
        if(!this.onGround()) this.vy += this.weight;
        else this.vy = 0;
        if (this.y > this.game.height - this.spriteHeight) this.y = this.game.height - this.spriteHeight;

    }
    draw(context){
        context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.spriteWidth, this.spriteHeight);
    }
    onGround(){
        return this.y >= this.game.height - this.spriteHeight;
    }
}