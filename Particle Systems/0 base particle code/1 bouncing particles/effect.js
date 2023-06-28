import {Particle} from './particle.js';
export class Effect {
    constructor(canvas){
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.particles = [];
        this.numberOfParticles = 200;
        this.createParticles();

    }
    createParticles(){
        for (let i = 0 ; i < this.numberOfParticles; i++){
            this.particles.push(new Particle(this));
        }
    }
    handleParticles(context){
        this.particles.forEach( p => {
            p.draw(context);
            p.update();
        })
    }
} 