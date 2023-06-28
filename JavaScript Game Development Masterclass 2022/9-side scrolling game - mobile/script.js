window.addEventListener('load',function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1000;
    canvas.height = 720;
    let enemies = [];
    let score = 0;
    let gameOver = false;
    const fullScreenButton = document.getElementById('fullScreenButton');

    class InputHandler {
        constructor(){
            this.keys = [];
            this.touchY = '';
            this.touchTreshold = 30;
            window.addEventListener('keydown', e => {
                if ((   e.key === 'ArrowDown' || 
                        e.key === 'ArrowUp' || 
                        e.key === 'ArrowLeft' || 
                        e.key === 'ArrowRight' )
                        && this.keys.indexOf(e.key) === -1) {
                    this.keys.push(e.key);
                    } else  {
                        if(e.key === 'Enter' && gameOver) restartGame();
                    }
            });
            window.addEventListener('keyup', e => {
                if (e.key === 'ArrowDown' || 
                    e.key === 'ArrowUp' || 
                    e.key === 'ArrowLeft' || 
                    e.key === 'ArrowRight' ) {
                    this.keys.splice(this.keys.indexOf(e.key),1);
                }
            });
            window.addEventListener('touchstart', e => {
                this.touchY=e.changedTouches[0].pageY;
            });
            window.addEventListener('touchmove', e => {
                const swipeDistance = e.changedTouches[0].pageY - this.touchY;
                if (swipeDistance  < -this.touchTreshold && this.keys.indexOf('swipe up') === -1) this.keys.push('swipe up');
                else if (swipeDistance > this.touchTreshold && this.keys.indexOf('swipe down') === -1) 
                {
                    this.keys.push('swipe down');
                    if (gameOver)restartGame();
                }
            }); 
            window.addEventListener('touchend', e => {

                this.keys.splice(this.keys.indexOf('swipe up'), 1);
                this.keys.splice(this.keys.indexOf('swipe down'), 1);
            });
        }
    }
    
    class Player {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 200;
            this.height = 200;
            this.x = 100;
            this.y = this.gameHeight - this.height ;
            this.image = document.getElementById('playerImage');
            this.frameX = 0;
            this.frameY = 0;
            this.speed = 0;
            this.vy = 0 ;
            this.fps = 20;
            this.frameTimer = 0;
            this.frameInterval = 1000/this.fps;
            this.jumpStrength = 17;
            this.weight = .2;
            this.maxFrame = 7;
        }
        restart(){
            this.x = 100;
            this.y = this.gameHeight - this.height ;
            this.maxFrame = 8;
            this.frameY = 0;
        }
        draw(context){ 
            // hit box visual
            context.beginPath();
            context.arc(this.x + this.width * 0.5, this.y + this.height * 0.5 +20, this.width * 0.33 ,0, Math.PI *2);
            context.stroke();
           
            context.drawImage(this.image ,this.width * this.frameX ,this.height * this.frameY ,this.width, this.height ,this.x ,this.y ,this.width ,this.height)
        }
        update(input, deltaTime, enemies){
            //circular collision detection
            enemies.forEach(enemy => {
                const dx = (enemy.x + enemy.width * 0.5 -27) - (this.x + this.width * 0.5);
                const dy = (enemy.y + enemy.height * 0.5) - (this.y + this.height  * 0.5 +20);
                const distance = Math.sqrt((dx*dx) + (dy*dy))
                if (distance < enemy.width * 0.33 + this.width * 0.33 ){
                   gameOver = true ;
                }
            })
            // sprite animation
            if(this.frameTimer > this.frameInterval){
                if (this.frameX >= this.maxFrame) this.frameX = 0;
                else this.frameX++;
                this.frameTimer = 0
            } else {
                this.frameTimer += deltaTime;
            }
            //controls
            if (input.keys.indexOf('ArrowRight') > -1){
                this.speed = 5;
            } else if (input.keys.indexOf('ArrowLeft') > -1) {
                this.speed = -5;
            } else if ((input.keys.indexOf('ArrowUp') > -1 || input.keys.indexOf('swipe up') > -1) && this.onGround()){
                this.vy -= this.jumpStrength;
            } else {
                this.speed = 0;
            }
            //horizontal movement
            this.x += this.speed;
            if (this.x < 0 ) this.x = 0 ;
            else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width;
            //Vertical movement
            this.y += this.vy;
            if (!this.onGround()){
                this.vy += this.weight;
                this.maxFrame = 5;  // change the max frames for the jump animation
                this.frameY = 1;
            } else {
                this.vy = 0;
                this.maxFrame = 8; //set to 8 frames for running
                this.frameY = 0;
            }
            if (this.y >=this.gameHeight - this.height) this.y = this.gameHeight - this.height;
        }
        onGround(){
            return this.y >= this.gameHeight - this.height;
        }
    }

    class Background {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('backgroundImage');
            this.x = 0;
            this.y = 0;
            this.width = 2400;
            this.height = 720;
            this.speed = 2;
        }
        draw(context){
            context.drawImage(this.image, this.x, this.y,this.width ,this.height);
            context.drawImage(this.image, this.x + this.width - this.speed, this.y,this.width ,this.height);
        }
        update(){
            this.x -= this.speed;
            if (this.x < 0 - this.width) this.x = 0;
        }
        restart(){
            this.x = 0;
        }
    }

    class Enemy{
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 160;
            this.height = 119;
            this.image = document.getElementById('enemyImage');
            this.x = this.gameWidth ;
            this.y = gameHeight - this.height -8;
            this.frameX = 0;
            this.maxFrame = 5;
            this.fps = 20;
            this.frameTimer = 0;
            this.frameInterval = 1000/this.fps;
            this.speed = 2.2
            this.markedForDeletion = false;
        }
        draw(context){
            
                        context.drawImage(this.image, this.frameX * this.width, 0 ,this.width ,this.height ,this.x ,this.y ,this.width, this.height);
            context.strokeStyle='white';
            //context.strokeRect(this.x ,this.y ,this.width, this.height);
            // colloisions visual
            context.beginPath();
            context.arc(this.x + this.width * 0.5 - 27 , this.y + this.height * 0.5, this.width * 0.33 , 0, Math.PI *2);
            context.stroke();
        }
        update(deltaTime){
            if (this.frameTimer > this.frameInterval){
                if (this.frameX >= this.maxFrame) this.frameX = 0;
                else this.frameX++;
                this.frameTimer = 0;
            } else {
                this.frameTimer += deltaTime;
            }
            this.x -= this.speed;
            if (this.x < 0 - this.width){
                this.markedForDeletion = true;
                score++;
            } 
            
        }
    }

   
    function handleEnemies(deltaTime){
        let randomEnemyInterval = Math.random() * 100000;
        if (enemyTimer > enemyInterval + randomEnemyInterval){
            enemies.push(new Enemy(canvas.width,canvas.height))
            enemyTimer = 0;
        } else{
            enemyTimer += deltaTime;
        }
        enemies.forEach(enemy => {
        enemy.draw(ctx);
        enemy.update(deltaTime);
      });
      enemies = enemies.filter(object => !object.markedForDeletion)
    }
   
   
    function displayStatusText(context){
        context.fillStyle ='black';
        context.font = '40px Helvetica';
        context.fillText('Score: ' + score, 24, 54);
        context.fillStyle ='white';
        context.fillText('Score: ' + score, 20, 50);
        if (gameOver){
            context.textAlign = 'center';
            context.fillStyle ='red';
            context.fillText('Game Over, Enter or swipe down to try again !!! ',canvas.width/2,200);
            context.fillStyle ='white';
            context.fillText('Game Over, Enter or swipe down to try again !!! ',canvas.width/2 +2,202);
        }
    }
    function restartGame(){
        player.restart();
        background.restart();
        enemies = [];
        score = 0;
        gameOver = false;
        animate(0);
    }

    function toggleFullScreen() {
        console.log(document.fullscreenElement);
        if (!document.fullscreenElement){
            canvas.requestFullscreen().catch(err => {
            alert(`Error, can't enable full-screen mode: ${err.message}`)
            });
        } else {
            document.exitFullScreen();
        }
    }
    
    fullScreenButton.addEventListener('click', toggleFullScreen);

    const input = new InputHandler();
    const player = new Player(canvas.width,canvas.height);
    const background = new Background(canvas.width,canvas.height);
    let lastTime = 0;
    let enemyTimer = 0;
    let enemyInterval = 1000;


    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0,0,canvas.width,canvas.height)
        background.draw(ctx);
        //background.update()
        player.draw(ctx);
        player.update(input, deltaTime, enemies);
        handleEnemies(deltaTime);
        displayStatusText(ctx);
        if (!gameOver) requestAnimationFrame(animate);
    }
    animate(0);

});