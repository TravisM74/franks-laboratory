export class Whale{
    constructor(effect){
        this.effect = effect;
        this.x = this.effect.width * 0.4;
        this.y = this.effect.height * 0.6;
        this.spriteWidth= 420;
        this.spriteHeight = 284;
        this.image = document.getElementById('whale');
        this.angle = 0;
        this.va = 0.01;
        this.curve = this.effect.height * 0.2;
        this.frameX = 0;
        this.maxFrame = 37;
        this.timer = 0;
        this.fps = 30;
        this.frameLimit = 1000/this.fps;
        this.radius = this.spriteHeight * 0.7;
    }
    draw(context){
        context.save();
        context.translate(this.x, this.y);
        context.rotate(Math.cos(this.angle));
        context.drawImage(this.image,this.frameX * this.spriteWidth,0,this.spriteWidth, this.spriteHeight, 0- this.spriteWidth * 0.5, 0 - this.spriteHeight * 0.5,this.spriteWidth, this.spriteHeight);
        context.restore();
    }
    update(deltaTime){
        if (this.timer > this.frameLimit ){
            this.frameX < this.maxFrame ? this.frameX++ : this.frameX = 0;  
            this.timer = 0;
        } else {
            this.timer += deltaTime;
            //console.log(this.timer);
        }
        this.angle += this.va;
        this.y = this.effect.height * 0.5 + Math.sin(this.angle) * this.curve;
        if (this.angle > Math.PI * 2) this.angle = 0;
    }
}