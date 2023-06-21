import {Player} from './player.js';
import {Obstacle} from './obstacle.js'
import {Egg} from './eggs.js';

export class Game{
    constructor(canvas){
        this.canvas = canvas
        this.width = this.canvas.width;
        this.height = this.canvas.height; 
        this.player = new Player(this);
        this.fps = 70;
        this.timer = 0;
        this.interval = 1000/this.fps;
        this.obstacles = [];
        this.maxEggs = 10;
        this.eggs = [];
        this.eggTimer = 0;
        this.eggInterval = 500;
        this.topMargin = 260;
        this.debug = true;
        this.numberOfObstacles = 10;
        this.mouse = {
            x: this.width * 0.5,
            y: this.height * 0.5,
            pressed: false
        }

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
        });

    }
    render(context, deltaTime){
        if (this.timer > this.interval){
            // animate frame
            context.clearRect(0, 0, this.width, this.height);
            this.timer = 0;
            this.obstacles.forEach( obj => obj.draw(context));
            this.eggs.forEach( obj => obj.draw(context));
            this.player.draw(context);
            this.player.update();
        }
        this.timer += deltaTime;
        // add eggs  periodically
        if (this.eggTimer > this.eggInterval && this.eggs.length < this.maxEggs){
            this.eggTimer = 0;
            this.addEgg();
            console.log(this.eggs);
        } else {
            this.eggTimer += deltaTime;
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
    init(){
       
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