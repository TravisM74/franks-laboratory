import {InputHandler} from './inputhandler.js';
import {Player} from './player.js';
import {UI} from './UI.js';
import {Angler, Angler2, LuckyFish} from './enemy.js';
import {Background} from './background.js'
import {Particle} from './particle.js'

export class Game {
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.background = new Background(this);
        this.player = new Player(this);
        this.input = new InputHandler(this);
        this.ui = new UI(this);
        this.keys = [];
        this.enemies = [];
        this.particles = [];
        this.debug = true;
        this.maxAmmo = 20;
        this.ammo = 20;
        this.ammoTimer = 0;
        this.ammoInterval = 1000;
        this.enemyTimer = 0;
        this.enemyInterval = 1000;
        this.gameOver = false;
        this.score = 0;
        this.winningScore = 100;
        this.gameTime = 0;
        this.timeLimit = 15000;
        this.speed = 1;      
        
    }
    update(deltaTime){
        if (!this.gameOver){
            this.gameTime += deltaTime;
        }
        if (this.score >= this.winningScore) this.gameOver = true;
        if (this.gameTime > this.timeLimit) this.gameOver  = true;
        
        this.background.update();
        this.background.layer4.update();
        this.player.update(deltaTime);
        this.particles.forEach( p => p.update());
        
        if (this.ammoTimer > this.ammoInterval ){
            if (this.ammo < this.maxAmmo) this.ammo ++;
            this.ammoTimer = 0;
        } else this.ammoTimer += deltaTime;
 

        this.enemies.forEach(enemy => {
            enemy.update();
            if (this.checkCollision(this.player, enemy)){
                enemy.markedForDeletion = true;
                if (enemy.type === 'lucky') this.player.enterPowerUp();
                else {
                    if(!this.gameOver) this.score -= enemy.score;
                    for (let i = 0; i < 10; i++){
                        this.particles.push(new Particle(this, enemy.x + enemy.width * 0.5 , enemy.y + (enemy.height * 0.5)));
                    }
                }
            }
            this.player.projectiles.forEach( p => {
                if (this.checkCollision(p, enemy)){
                    p.markedForDeletion = true;
                    enemy.lives--;
                    this.particles.push(new Particle(this, p.x, p.y));
                    if (enemy.lives <= 0){
                        enemy.markedForDeletion = true;   
                        if (!this.gameOver) this.score+= enemy.score;
                        for (let i = 0; i < 10; i++){
                            this.particles.push(new Particle(this, enemy.x + enemy.width * 0.5 , enemy.y + (enemy.height * 0.5)));
                        }
                    }
                }
            })
        });

        this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
        this.particles = this.particles.filter(p => !p.markedForDeletion);
        
        if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
            this.addEnemy();
            this.enemyTimer = 0
        } else {
            this.enemyTimer += deltaTime;
        }
        //console.log(this.gameOver);
    }
    draw(context){
        this.background.draw(context);
        this.player.draw(context);
        this.particles.forEach(p => p.draw(context));
        this.ui.draw(context);
        this.enemies.forEach(enemy => {
            enemy.draw(context);
        });
        this.background.layer4.draw(context)
        console.log(this.particles);
    }
    addEnemy(){
        const randomize = Math.random();
        if (randomize < 0.4) this.enemies.push(new Angler(this));
        else if (randomize < 0.8)this.enemies.push(new Angler2(this));
        else this.enemies.push(new LuckyFish(this));
        //console.log(this.enemies)
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