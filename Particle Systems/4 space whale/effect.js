import {Particle} from './particle.js';
import {Whale} from './whale.js';

//import {ColorConfig} from './colorConf.js';
export class Effect {
    constructor(canvas, context){
        this.context = context;
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.particles = [];
        this.numberOfParticles = 300;
        this.maxDistance = canvas.width * 0.075;
        this.createParticles();
        this.whale = new Whale(this);
        
        window.addEventListener('resize', e => {
            //console.log(e.target.window.innerWidth , e.target.window.innerHeight);
            this.resize(e.target.window.innerWidth , e.target.window.innerHeight);
        });

        /*
        this.mouse = {
            x: 0,
            y: 0,
            pressed: false,
            radius: 200
        }
        window.addEventListener('mousemove' , e => {
            if(this.mouse.pressed){
                this.mouse.x = e.x;
                this.mouse.y = e.y;
               
            }
        });
        window.addEventListener('mousedown' , e => {
            this.mouse.pressed = true;
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });
        window.addEventListener('mouseup' , e => {this.mouse.pressed = false});
        */
    }
    createParticles(){
        for (let i = 0 ; i < this.numberOfParticles; i++){
            this.particles.push(new Particle(this));
        }
    }
    handleParticles(context, deltaTime){
        this.connectParticles(context);
        this.particles.forEach( p => {
            p.draw(context);
            p.update();
        });
        this.whale.draw(context);
        this.whale.update(deltaTime);
    }
    
    connectParticles(context){
        
        for (let a = 0; a < this.particles.length; a++){
            for(let b = a; b < this.particles.length; b++ ){
                const dx = this.particles[a].x - this.particles[b].x;
                const dy = this.particles[a].y - this.particles[b].y;
                const distance = Math.hypot(dx,dy);
                if (distance < this.maxDistance){
                    const opacity = 1-(distance/this.maxDistance);
                    context.save();
                    context.globalAlpha = opacity;
                    context.beginPath();
                    context.moveTo(this.particles[a].x, this.particles[a].y);
                    context.lineTo(this.particles[b].x, this.particles[b].y);
                    context.stroke();
                    context.restore();
                }
            } 
        }
    }
    resize(width, height){
        this.canvas.width = width;
        this.canvas.height = height;
        this.maxDistance = width * 0.075;
        this.width = width;
        this.height = height;   
        //const colorConfig = new ColorConfig(this.context, this.canvas);   
        this.whale.x = this.width * 0.4;
        this.whale.y = this.height * 0.6;
        this.whale.curve = this.height * 0.2;
        this.particles.forEach(p => p.reset());

    }
} 