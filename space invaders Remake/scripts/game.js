import {Player} from './player.js';
import {Projectile} from './projectile.js';
import {Wave} from './wave.js';
export class Game {
    constructor (canvas){
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.player = new Player(this);
        this.keys = [];
        this.projectilesPool = [];
        this.score = 0;
        this.gameOver = false;
        
        this.numberOfProjectiles = 10;
        this.createProjectiles();
        this.fired = false;
       
        this.columns = 2;
        this.rows = 2;
        this.enemySize = 60;

        this.waves = [];
        this.waves.push(new Wave(this));
        this.waveCount = 1;

        this.spriteTimer = 0;
        this.spriteInterval = 250;
        this.spriteUpdate = false;
       
        //eventListener
        window.addEventListener('keydown', (e) =>{
            if (this.keys.indexOf(e.key) === -1) this.keys.push(e.key);
            if (e.key === ' ' && !this.fired) {
                this.player.shoot();
                this.fired = true;
            }
            if (e.key === 'r' && this.gameOver) this.restart();
        });
        window.addEventListener('keyup', (e) =>{
            const index = this.keys.indexOf(e.key);
            if (index > -1) this.keys.splice(index,1);
            if (e.key === ' ' ) {
                this.fired = false;
            }
        });
    }
    render(context,deltaTime){
        //spriteTiming
        if(this.spriteTimer > this.spriteInterval){
            this.spriteUpdate = true;
            this.spriteTimer = 0;
        } else {
            this.spriteUpdate = false;
            this.spriteTimer += deltaTime;
        }
        
        this.projectilesPool.forEach(p => {
            p.update();
            p.draw(context);
        });
        this.drawStatusText(context);
        this.player.draw(context);
        this.player.update();
        
        this.waves.forEach(w => {
            w.render(context,deltaTime);
            if (w.enemies.length < 1 && !w.nextWaveTrigger && !this.gameOver){
                this.newWave();
                this.waveCount++;
                w.nextWaveTrigger = true;
            }
        });
    }
    //create projectile object pool
    createProjectiles(){
        for (let i = 0 ; i < this.numberOfProjectiles; i++){
            this.projectilesPool.push(new Projectile());
        }
    }
    // get free projectile object from pool
    getProjectile(){
        for(let i = 0; i < this.projectilesPool.length; i++){
            if (this.projectilesPool[i].free) return this.projectilesPool[i];
        }
    }
    // Collision Detection between 2 rectangles
    checkCollision(a,b){
        return (
            a.x < b.x + b.width &&
            a.x + a.width > b.x &&
            a.y < b.y + b.height &&
            a.y + a.height > b.y
        )
    }

    drawStatusText(context){
        context.save();
        context.shadowOffsetX = 3;
        context.shadowOffsetY = 3;
        context.shadowColor = 'black';
        context.fillText('Score : ' + this.score, 20 , 40);
        context.fillText('Wave : ' + this.waveCount, 20 , 80); 
        for (let i = 0; i < this.player.maxLives ; i++){
            context.strokeRect(20 + 20 * i, 100, 10, 15)
        }
        for (let i = 0; i < this.player.lives ; i++){
            context.fillRect(20 + 20 * i, 100, 10, 15)
        }
        if (this.gameOver){
            context.textAlign = 'center';
            context.font = '100px Impact';
            context.fillText('Game Over', this.width * 0.5, this.height * 0.5);
            context.font = '20px Impact';
            context.fillText('press R to restart', this.width * 0.5, this.height * 0.5 +50);
        }
        context.restore();
    }
    newWave(){
        if ( this.columns < 7){
              this.columns++;
        } else {
            this.rows++;
            this.columns = 2; 
        }
       
        if (this.player.lives < this.player.maxLives)  this.player.lives++;
        this.waves.push(new Wave(this));
    }
    restart(){
        this.player.restart();
        this.columns = 2;
        this.rows = 2;
        this.waves = [];
        this.waves.push(new Wave(this));
        this.waveCount = 1;
        this.score = 0;
        this.gameOver = false;
    }

}