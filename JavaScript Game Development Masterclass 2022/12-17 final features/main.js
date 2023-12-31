import {Player} from "./player.js";
import {InputHandler} from "./input.js";
import {Background} from "./background.js";
import {FlyingEnemy,GroundEnemy,ClimbingEnemy} from "./enemies.js"
import {UI} from "./ui.js";
import {CollisionAnimation} from './collisionAnimation.js'

window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 500;

    class Game{
        constructor(width,height){
            this.width = width;
            this.height = height;
            this.groundMargin = 80;
            this.speed = 0;
            this.maxSpeed = 3;
            this.background = new Background(this);
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.ui = new UI(this);
            this.enemies = [];
            this.particles= [];
            this.collisions = [];
            this.enemyTimer = 0;
            this.enemyInterval = 2000;
            this.debug = false;
            this.score = 0;
            this.fontColor = 'black';
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
            this.maxParticles = 200;
            this.time = 0;
            this.maxTime = 200000;
            this.gameOver = false;

        }
        update(deltaTime){
            this.time += deltaTime;
            if (this.time > this.maxTime) this.gameOver = true;
            
            this.background.update();
            this.player.update(this.input.keys,deltaTime);
            //handle Enemies
            if (this.enemyTimer > this.enemyInterval){
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach( enemy => { 
                enemy.update(deltaTime);
                if (enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy), 1);
                
            });
            // Particles
            this.particles.forEach((p,index) => {
                p.update();
                if (p.markedForDeletion) this.particles.splice(index,1);
            });
            if (this.particles.length > this.maxParticles ){
                this.particles.length = this.maxParticles;
            }
            // collision sprites
            this.collisions.forEach((c,i) => {
                c.update(deltaTime);
                if (c.markedForDeletion) this.collisions.splice(i,1);
            });
        }
        draw(context){
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach( e => { e.draw(context)});
            this.particles.forEach((p,index) => p.draw(context));
            this.collisions.forEach((c) => c.draw(context));
            this.ui.draw(context);
        }
        addEnemy(){
            if (this.speed > 0 && Math.random() < 0.5){
                this.enemies.push(new GroundEnemy(this));
            } else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this))
            this.enemies.push(new FlyingEnemy(this));
            //console.log(this.enemies)
        }
    }
    
    const game = new Game(canvas.width, canvas.height);
    //console.log(game);
    let lastTime = 0;
    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        //console.log(deltaTime);
        if (!game.gameOver)requestAnimationFrame(animate);
        ctx.clearRect(0,0,canvas.width, canvas.height);
        game.draw(ctx);
        game.update(deltaTime);
    } 
    animate(0);
});