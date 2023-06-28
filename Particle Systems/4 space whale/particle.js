export class Particle {
    constructor(effect){

        this.effect = effect;
        this.radius = Math.floor(1 + Math.random() * 7);
        this.reset();
        this.pSpeed = .9 ;
        this.vx = -5;
        this.vy = 0;
        this.pushX = 0;
        this.pushY = 0;
        this.friction = 0.95 ;
        this.image = document.getElementById('star');
        this.imageSize = this.radius * 10;
        this.halfImageSize =  this.imageSize * 0.5;
        this.x = this.imageSize + Math.random() * (this.effect.width + this.effect.maxDistance *2);
        this.y = this.imageSize + Math.random() * (this.effect.height - this.imageSize *2);

    }
    draw(context){
        
        context.beginPath();
        //context.arc(this.x, this.y, this.radius, 0 ,Math.PI * 2);
        context.drawImage(this.image,this.x - this.halfImageSize, this.y - this.halfImageSize, this.imageSize , this.imageSize );
        context.fill();
        //context.stroke();
    }
    update() {
        //if(this.effect.mouse.pressed){
            const dx = this.x - this.effect.whale.x;
            const dy = this.y - this.effect.whale.y;
            const distance = Math.hypot(dx, dy);
            const force = this.effect.whale.radius / distance;
            if(distance < this.effect.whale.radius){
                const angle = Math.atan2(dy,dx);
                this.pushX += Math.cos(angle) * force;
                this.pushY += Math.sin(angle) * force;
            }
        //}
        this.x += (this.pushX *= this.friction) + this.vx;
        this.y += (this.pushY *= this.friction) + this.vy;
        
        if (this.x < this.imageSize - this.effect.maxDistance){
            this.x = this.effect.width + this.imageSize +this.effect.maxDistance;  
            this.y = this.imageSize + Math.random() * (this.effect.height - this.imageSize *2);
        } 
      
    }
    reset(){
        this.x = this.imageSize + Math.random() * (this.effect.width + this.effect.maxDistance *2);
        this.y = this.imageSize + Math.random() * (this.effect.height - this.imageSize *2);
    }
}