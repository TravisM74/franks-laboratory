import {Sitting} from './playerStates.js';
import {Running, Jumping, Falling} from './playerStates.js';
export class Player{
    constructor(game){
    this.game = game;
    this.spriteWidth = 100;
    this.spriteHeight = 91.3;
    this.x = 0;
    this.y = this.game.height - this.spriteHeight - this.game.groundMargin;
    this.image = document.getElementById('player');
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 5;
    this.speed = 0;
    this.maxSpeed = 10;
    this.vy = 0
    this.weight = .2;
    this.jumpStrength = 12;
    this.states = [new Sitting(this), new Running(this),new Jumping(this), new Falling(this)];
    this.currentState = this.states[0];
    this.currentState.enter();
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;


    }
    update(input, deltaTime){
        this.currentState.handleInput(input);
        //Horazontal movment
        this.x += this.speed;
        if (input.includes('ArrowRight')) this.speed = this.maxSpeed;
        else if (input.includes('ArrowLeft')) this.speed = -this.maxSpeed;
        else this.speed= 0;
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.spriteWidth)this.x = this.game.width - this.spriteWidth;
        //vertial Movement
        this.y += this.vy;
        if(!this.onGround()) this.vy += this.weight;
        else this.vy = 0;
        if (this.y > this.game.height - this.spriteHeight - this.game.groundMargin) this.y = this.game.height - this.spriteHeight - this.game.groundMargin;
        // sprite animation
        if (this.frameTimer > this.frameInterval){
            this.frameX < this.maxFrame ? this.frameX++ : this.frameX = 0;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }

    }
    draw(context){
        context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.spriteWidth, this.spriteHeight);
    }
    onGround(){
        return this.y >= this.game.height - this.spriteHeight - this.game.groundMargin;
    }
    setState(state,speed){
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed * speed;
        this.currentState.enter();
    }
}