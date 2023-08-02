import {InputHandler} from './inputhandler.js';
import {Player} from './player.js';
import {UI} from './UI.js';
import {Angler} from './enemy.js';

export class Game {
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.player = new Player(this);
        this.input = new InputHandler(this);
        this.ui = new UI(this);
        this.keys = [];
        this.enemies = [];
        this.maxAmmo = 20;
        this.ammo = 20;
        this.ammoTimer = 0;
        this.ammoInterval = 1000;
        this.enemyTimer = 0;
        this.enemyInterval = 1000;
        this.gameOver = false;
        this.score = 0;
        this.winningScore = 10;
        this.gameTime = 0;
        this.timeLimit = 5000;
        
        
    }
    update(deltaTime){
        if (!this.gameOver){
            this.gameTime += deltaTime;
        }
        if (this.score >= this.winningScore) this.gameOver = true;
        if (this.gameTime > this.timeLimit) this.gameOver  = true;
        this.player.update();
        if (this.ammoTimer > this.ammoInterval ){
            if (this.ammo < this.maxAmmo) this.ammo ++;
            this.ammoTimer = 0;
        } else this.ammoTimer += deltaTime;
        this.enemies.forEach(enemy => {
            enemy.update();
            if (this.checkCollision(this.player, enemy)){
                enemy.markedForDeletion = true;
            }
            this.player.projectiles.forEach( p => {
                if (this.checkCollision(p, enemy)){
                    p.markedForDeletion = true;
                    enemy.lives--;
                    if (enemy.lives <= 0){
                        enemy.markedForDeletion = true;
                        if (!this.gameOver) this.score+= enemy.score;
                    }
                }
            })
        });
        this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
        if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
            this.addEnemy();
            this.enemyTimer = 0
        } else {
            this.enemyTimer += deltaTime;
        }
        //console.log(this.gameOver);
    }
    draw(context){
        this.player.draw(context);
        this.ui.draw(context);
        this.enemies.forEach(enemy => {
            enemy.draw(context);
        });
    }
    addEnemy(){
        this.enemies.push(new Angler(this));
    }
    checkCollision(obj1, obj2){
        return ( 
            obj1.x < obj2.x + obj2.width &&
            obj1.x + obj1.width > obj2.x &&
            obj1.y < obj2.y +obj2.height &&
            obj1.y + obj1.height > obj2.y
        );
    }
}