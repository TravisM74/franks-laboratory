import {Particle} from './particle.js';
import {Effect} from './effect.js';
import {ColorConfig} from './colorConf.js'

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colorConfig = new ColorConfig(ctx,canvas);
const effect = new Effect(canvas,ctx)


function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    effect.handleParticles(ctx);
    requestAnimationFrame(animate);
}
animate();