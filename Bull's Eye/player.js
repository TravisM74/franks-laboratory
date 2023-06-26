export class Player {
    constructor(game){
        this.game = game;
        this.collisionX = this.game.width * 0.5;
        this.collisionY = this.game.height * 0.5;
        this.collisionRadius = 30;
        this.speedX = 0;
        this.speedY = 0;
        this.dx = 0;
        this.dy = 0;
        this.speedModifer = 3;
        this.image = document.getElementById('bull');
        this.spriteWidth = 255;
        this.spriteHeight = 256;
        this.frameX = 0;
        this.frameY = 4;
        this.spriteX = this.collisionX - (this.spriteWidth * 0.5);
        this.spriteY = this.collisionY - (this.spriteHeight * 0.85);

    }
    restart(){
        this.collisionX = this.game.width * 0.5;
        this.collisionY = this.game.height * 0.5;
        this.spriteX = this.collisionX - (this.spriteWidth * 0.5);
        this.spriteY = this.collisionY - (this.spriteHeight * 0.85);
    }
    draw(context){
        context.drawImage(this.image, this.spriteWidth * this.frameX, this.spriteHeight * this.frameY, this.spriteWidth, this.spriteHeight, this.spriteX, this.spriteY, this.spriteWidth, this.spriteHeight);
        context.strokeStyle = 'white';
        context.lineWidth = 3;
        if (this.game.debug){
            context.beginPath();
            context.arc(this.collisionX,this.collisionY,this.collisionRadius,0,Math.PI * 2);
            context.save();
            context.globalAlpha = 0.3;
            context.fill();
            context.restore();
            context.stroke();
            context.beginPath();
            context.moveTo(this.collisionX, this.collisionY);
            context.lineTo(this.game.mouse.x, this.game.mouse.y);
            context.stroke();
        }

    }
    update(){
        this.dx = this.game.mouse.x - this.collisionX;
        this.dy = this.game.mouse.y - this.collisionY;
        //sprite Animation
        const angle = Math.atan2(this.dy, this.dx);
        if(angle < -2.74 || angle > 2.74) this.frameY = 6;
        else if(angle < -1.96) this.frameY = 7;
        else if(angle < -1.17) this.frameY = 0;
        else if(angle < -0.39) this.frameY = 1;
        else if(angle < 0.39) this.frameY = 2;
        else if(angle < 1.17) this.frameY = 3;
        else if(angle < 1.96) this.frameY = 4;
        else if(angle < 2.74) this.frameY = 5;
        
        const distance = Math.hypot(this.dy, this.dx);
        if (distance > this.speedModifer){
            this.speedX = this.dx / distance || 0;
            this.speedY = this.dy / distance || 0;
        } else {
            this.speedX = 0;
            this.speedY = 0;
        }
        this.collisionX += this.speedX * this.speedModifer;
        this.collisionY += this.speedY * this.speedModifer;
        this.spriteX = this.collisionX - (this.spriteWidth * 0.5) ;
        this.spriteY = this.collisionY - (this.spriteHeight * 0.85);
        //horizontal Boundries
        if (this.collisionX < this.collisionRadius) this.collisionX = this.collisionRadius;
        if (this.collisionX > this.game.width - this.collisionRadius) this.collisionX = this.game.width -this.collisionRadius;
        // vertical Boundries
        if (this.collisionY > this.game.height -this.collisionRadius) this.collisionY = this.game.height - this.collisionRadius;
        if (this.collisionY  < this.game.topMargin + this.collisionRadius) this.collisionY = this.game.topMargin + this.collisionRadius
        //collision with Obstacles
        this.game.obstacles.forEach(obj => {
           
            // [(distance < sumOfRadii),distance,sumOfRadii,dx,dy]  collisions check return values
            let [collision,distance,sumOfRadii,dx,dy] = this.game.checkCollision(this,obj);  // java script deStructuring
            if(collision){ //formular for pushing back an object from the center point of an another object
                const unit_x = dx / distance;
                const unit_y = dy / distance;
                this.collisionX = obj.collisionX + (sumOfRadii + 1) * unit_x;
                this.collisionY = obj.collisionY + (sumOfRadii + 1) * unit_y;
            }
        });
        //updating player sprite location
    }
}