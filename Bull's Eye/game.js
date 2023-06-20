import {Player} from './player.js';
import {Obstacle} from './obstacle.js'
export class Game{
    constructor(canvas){
        this.canvas = canvas
        this.width = this.canvas.width;
        this.height = this.canvas.height; 
        this.player = new Player(this);
        this.obstacles = [];
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

    }
    render(context){
        this.player.draw(context);
        this.player.update();
        this.obstacles.forEach( obj => {
            obj.draw(context);
        })
    }
    init(){
        /*
        for (let i = 0; i < this.numberOfObstacles ; i++){
            this.obstacles.push(new Obstacle(this));
        }
        */
        let attempts = 0;
        while (this.obstacles.length < this.numberOfObstacles && attempts < 500){
            let testObstacle = new Obstacle(this);
            let overlap = false;
            this.obstacles.forEach( obj => {
                const dx = testObstacle.collisionX - obj.collisionX;
                const dy = testObstacle.collisionY - obj.collisionY;
                const distance = Math.hypot(dy , dx);
                const sumOfRadii = testObstacle.collisionRadius + obj.collisionRadius;
                if (distance < sumOfRadii) overlap = true;
            })
            if (!overlap){
                this.obstacles.push(testObstacle)
            }
            attempts++;
        }
    }
    
}