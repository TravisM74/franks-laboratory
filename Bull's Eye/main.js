import {Game} from './game.js';


window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1280;
    canvas.height = 720;
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    ctx.font = '40px Helvetica';
    ctx.textAlign = 'center';
    
    const game = new Game(canvas);
    game.init();
    console.log(game);

    let lastTime = 0;
    function animate(timeStamp){
        const deltaTime  = timeStamp - lastTime ; 
        lastTime = timeStamp;
        
       
        game.render(ctx,deltaTime);

        requestAnimationFrame(animate);
    }
    animate(0);
});