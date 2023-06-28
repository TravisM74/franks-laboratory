import {Particle} from './particle.js';
import {ColorConfig} from './colorConf.js';
export class Effect {
    constructor(canvas, context){
        this.context = context;
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.particles = [];
        this.numberOfParticles = 300;
        this.createParticles();

        this.mouse = {
            x: this.width * 0.5,
            y: this.height * 0.5,
            pressed: false,
            radius: 120
        }

        window.addEventListener('resize', e => {
            //console.log(e.target.window.innerWidth , e.target.window.innerHeight);
            this.resize(e.target.window.innerWidth , e.target.window.innerHeight);
        });
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
    }
    createParticles(){
        for (let i = 0 ; i < this.numberOfParticles; i++){
            this.particles.push(new Particle(this, i));
        }
    }
    handleParticles(context){
        this.connectParticles(context);
        this.particles.forEach( p => {
            p.draw(context);
            p.update();
        });
    }
    
    connectParticles(context){
        const maxDistance = 150;
        for (let a = 0; a < this.particles.length; a++){
            for(let b = a; b < this.particles.length; b++ ){
                const dx = this.particles[a].x - this.particles[b].x;
                const dy = this.particles[a].y - this.particles[b].y;
                const distance = Math.hypot(dx,dy);
                if (distance < maxDistance){
                    const opacity = 1-(distance/maxDistance);
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
        this.width = width;
        this.height = height;   
        const colorConfig = new ColorConfig(this.context, this.canvas);   
       
        this.particles.forEach(p => p.reset());

    }
} 