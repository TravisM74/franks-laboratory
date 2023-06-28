import {Particle} from './particle.js';
import {Effect} from './effect.js';
import {ColorConfig} from './colorConf.js'

window.addEventListener('load', e => {

    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const colorConfig = new ColorConfig(ctx,canvas);
    const effect = new Effect(canvas,ctx)
    
    let lastTime = 0
    function animate(timeStamp){
    let deltaTime = timeStamp-lastTime;
    lastTime = timeStamp;
    //console.log (deltaTime);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    effect.handleParticles(ctx,deltaTime);
    requestAnimationFrame(animate);
}
animate(0);

});