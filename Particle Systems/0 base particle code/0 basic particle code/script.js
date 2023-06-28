import {Particle} from './particle.js';
import {Effect} from './effect.js';

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = 'blue';

const effect = new Effect(canvas)
effect.handleParticles(ctx);

function animate(){
    
}