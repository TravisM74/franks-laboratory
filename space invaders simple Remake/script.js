import {Game} from './scripts/game.js';

window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 800;
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'white';
    
    ctx.font = '30px Impact';

    const game = new Game(canvas);
    let lastTime = 0;
    function animate(timeStamp){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const deltaTime = timeStamp -lastTime;
        lastTime = timeStamp;
        game.render(ctx,deltaTime);
        //console.log(deltaTime);
        window.requestAnimationFrame(animate);
    };
    animate(0);
});