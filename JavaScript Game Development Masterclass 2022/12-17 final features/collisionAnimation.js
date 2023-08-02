export class CollisionAnimation {
    constructor(game ,x ,y){
        this.game = game;
        this.x  = x;
        this.y = y;
        this.image = document.getElementById('boom'); 
        this.sWidth = 100;
        this.sHeight = 90;
        this.sizeModifier = Math.random() + 0.5;
        this.width = this.sWidth * this.sizeModifier;
        this.height = this.sHeight * this.sizeModifier;
        this.x = x - this.width * 0.5;
        this.y = y - this.height * 0.5; 
        this.maxFrame = 4;
        this.frameX = 0;
        this.markedForDeletion = false;
        this.frameTimer = 0;
        this.frameInterval = 1000 / 15;

    }
    draw(context){
        context.drawImage(this.image, this.frameX * this.sWidth, 0 , this.sWidth, this.sHeight, this.x, this.y, this.width, this.height);
    }
    update(deltaTime){
        this.x -= this.game.speed;
         //frame animation
         if (this.frameTimer > this.frameInterval){
            this.frameX < this.maxFrame ? this.frameX++ : this.markedForDeletion = true ; 
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }
    }
}