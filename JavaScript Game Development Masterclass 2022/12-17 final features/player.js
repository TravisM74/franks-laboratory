import {Sitting} from './playerStates.js';
import {Running, Jumping, Falling, Rolling, Diving, Hit} from './playerStates.js';
import {CollisionAnimation} from './collisionAnimation.js'
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
    this.states = [new Sitting(this.game), new Running(this.game),new Jumping(this.game), new Falling(this.game), new Rolling(this.game), new Diving(this.game), new Hit(this.game)];
    
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;


    }
    update(input, deltaTime){
        this.checkCollision();
        this.currentState.handleInput(input);
        //Horazontal movment
        this.x += this.speed;
        if (input.includes('ArrowRight') && this.currentState !== this.states[6]) this.speed = this.maxSpeed;
        else if (input.includes('ArrowLeft')&& this.currentState !== this.states[6]) this.speed = -this.maxSpeed;
        else this.speed= 0;
        //Horazontal Boundaries
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.spriteWidth)this.x = this.game.width - this.spriteWidth;
        //vertial Movement
        this.y += this.vy;
        if(!this.onGround()) this.vy += this.weight;
        else this.vy = 0;
        // vwertical Boundaries
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
        //debug mode
        if (this.game.debug) {
            context.strokeRect(this.x, this.y, this.spriteWidth, this.spriteHeight);
        }
        //dame mode
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
    checkCollision(){
        this.game.enemies.forEach(e => {
            if (
                e.x < this.x + this.spriteWidth && 
                e.x + e.sWidth > this.x &&
                e.y < this.y + this.spriteHeight &&
                e.y + e.sHeight > this.y
                ) {
                    e.markedForDeletion = true;
                    this.game.collisions.push(new CollisionAnimation(this.game, e.x + e.sWidth * 0.5, e.y + e.sHeight * 0.5))
                    if (this.currentState === this.states[4] || this.currentState === this.states[5]){
                        this.game.score++;
                    } else {
                        this.setState(6, 0);
                    }
                } 
        })
    }
}