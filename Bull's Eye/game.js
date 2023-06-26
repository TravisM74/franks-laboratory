import {Player} from './player.js';
import {Obstacle} from './obstacle.js'
import {Egg} from './eggs.js';
import {Enemy} from './enemy.js';
import {Larva} from './larva.js';


export class Game{
    constructor(canvas){
        this.canvas = canvas
        this.width = this.canvas.width;
        this.height = this.canvas.height; 
        this.player = new Player(this);
        this.fps = 70;
        this.timer = 0;
        this.interval = 1000/this.fps;
        this.maxEggs = 10;
        this.maxEnemies = 3;
        this.eggTimer = 0;
        this.eggInterval = 1000;
        this.topMargin = 260;
        this.debug = true;
        this.numberOfObstacles = 10;
        this.mouse = {
            x: this.width * 0.5,
            y: this.height * 0.5,
            pressed: false
        }
        this.enemies = [];
        this.obstacles = [];
        this.gameObjects = [];
        this.eggs = [];
        this.hatchlings = [];
        this.particles = [];
        this.lostHatchlings = 0;
        this.safeHatchlings = 0;
        this.winningScore = 30;
        this.gameOver = false;

        //EventListeners
        canvas.addEventListener('mousedown', e => {
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
            this.mouse.pressed = true;
        });
        canvas.addEventListener('mouseup', e => {
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
            this.mouse.pressed = false;
        });
        canvas.addEventListener('mousemove', e => {
            if(this.mouse.pressed){
                this.mouse.x = e.offsetX;
                this.mouse.y = e.offsetY;
            } 
        });
        window.addEventListener('keydown', e => {
            if(e.key == 'd'){
                if(this.debug){
                    this.debug= false;
                } else {
                    this.debug = true;
                }
            } 
            if(e.key == 'r'){
                this.restart();
            } 
        });

    }
    render(context, deltaTime){
        if (this.timer > this.interval){
            // animate frame
            context.clearRect(0, 0, this.width, this.height);
            this.gameObjects = [...this.enemies, ...this.obstacles, ...this.eggs, this.player, ...this.hatchlings, ...this.particles];
            // sort by Vertical position
            this.gameObjects.sort((a,b) => {
                return a.collisionY - b.collisionY;
            });
            //draw all objects
            this.gameObjects.forEach( object => {
                object.draw(context);
                object.update(deltaTime);
            });           
            this.timer = 0;
        }
        this.timer += deltaTime;
        // add eggs  periodically
        if (!this.gameOver){
            if (this.eggTimer > this.eggInterval && this.eggs.length < this.maxEggs){
                this.eggTimer = 0;
                this.addEgg();
                //console.log(this.eggs);
            } else {
                this.eggTimer += deltaTime;
            }
        }
        this.drawStatus(context);
        this.winCheck(context);
    }

    drawStatus(context){
        //draw status text
        context.save();
        context.textAlign = 'left';
        if (this.debug){
            context.fillText('Safe  :' + this.safeHatchlings ,40 ,80);
            context.fillText('Eaten :' + this.lostHatchlings ,40 ,115);
        } else {
            context.fillText('Score  :' + this.safeHatchlings ,40 ,80);
        }
        context.restore();
        
    }

    winCheck(context){
        if(this.safeHatchlings >= this.winningScore){
            this.gameOver = true;
            context.save()
            context.fillStyle = 'rgba(0,0,0,0.5)';
            context.fillRect(0, 0, this.width, this.height);
            context.fillStyle = 'white';
            context.textAlign = 'center';
            context.shadowOffSetX = 6;
            context.shadowOfffsetY = 6;
            context.shadowColor = 'blue';
            let message1;
            let message2;
            if (this.lostHatchlings <= 5){
                message1= 'Winner ';
                message2= 'Them toads will go hungry tonight !!!';
            } else {
                message1 = 'You Lost ';
                message2 = 'Too many hatchlings got eaten...';
            }
            context.font = '130px Bangers';
            context.fillText(message1 , this.width * 0.5, this.height * 0.5);
            context.font = '40px Bangers';
            context.fillText(message2 , this.width * 0.5, this.height * 0.5 + 45 );
            context.fillText('Press R to restart' , this.width * 0.5, this.height * 0.5 + 90 );
            context.restore();
        }
    }
    checkCollision(a,b){
        const dx = a.collisionX - b.collisionX;
        const dy = a.collisionY - b.collisionY;
        const distance = Math.hypot(dy,dx);
        const sumOfRadii = a.collisionRadius + b.collisionRadius;
        return [(distance < sumOfRadii),distance,sumOfRadii,dx,dy];
    }
    addEgg(){
        this.eggs.push(new Egg(this));
    }
    addEnemy(){
        this.enemies.push(new Enemy(this));
    }
    removeGameObjects(){
        this.eggs = this.eggs.filter( e => !e.markedForDeletion);
        this.hatchlings = this.hatchlings.filter( h => !h.markedForDeletion);
        this.particles = this.particles.filter( p => !p.markedForDeletion);
        
    }
    restart(){
        this.player.restart();
        this.safeHatchlings = 0;
        this.lostHatchlings = 0;
        this.enemies = [];
        this.obstacles = [];
        this.gameObjects = [];
        this.eggs = [];
        this.hatchlings = [];
        this.particles = [];
        this.gameOver = false;
        this.mouse = {
            x: this.width * 0.5,
            y: this.height * 0.5,
            pressed: false
        }
        this.init();

    }

    init(){
        for (let i = 0; i < this.maxEnemies ; i++){
            this.addEnemy();
            console.log(this.enemies);
        }
        let attempts = 0;
        while (this.obstacles.length < this.numberOfObstacles && attempts < 500){
            let testObstacle = new Obstacle(this);
            let overlap = false;
            this.obstacles.forEach( obj => {
                const dx = testObstacle.collisionX - obj.collisionX;
                const dy = testObstacle.collisionY - obj.collisionY;
                const distance = Math.hypot(dy , dx);
                const distanceBuffer = 100;
                const sumOfRadii = testObstacle.collisionRadius + obj.collisionRadius + distanceBuffer;
                if (distance < sumOfRadii) overlap = true;
            })
            if (!overlap && this.onScreeenX(testObstacle) && this.onScreenY(testObstacle)){
                this.obstacles.push(testObstacle);
            }
            attempts++;
        }
    }
    onScreeenX(testObstacle){
        return (testObstacle.collisionX - (testObstacle.spriteWidth *.5)) > 0 && testObstacle.collisionX < this.width - testObstacle.spriteWidth;
    }
    onScreenY(testObstacle){
        const margin = testObstacle.collisionRadius * 3;
        return testObstacle.collisionY < this.height - margin && testObstacle.collisionY > this.topMargin + margin;
    }
    randomObst(){
         /*
        for (let i = 0; i < this.numberOfObstacles ; i++){
            this.obstacles.push(new Obstacle(this));
        }
        */
    }
    
}