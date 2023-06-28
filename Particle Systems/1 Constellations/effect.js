import {Particle} from './particle.js';
export class Effect {
    constructor(canvas){
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.particles = [];
        this.numberOfParticles = 300;
        this.createParticles();

    }
    createParticles(){
        for (let i = 0 ; i < this.numberOfParticles; i++){
            this.particles.push(new Particle(this));
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
        const maxDistance = 200;
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
} 