export class Particle {
    constructor(effect, index){
        this.particleNumber = index;
        this.effect = effect;
        this.radius = Math.floor(3 + Math.random() * 8);
        if (this.particleNumber % 10 === 0){
            this.radius = 30;
        }
        
        this.reset();
        this.pSpeed = 3 ;
        this.vx = Math.random() * (2 * this.pSpeed) - this.pSpeed;
        this.vy = Math.random() * (2 * this.pSpeed) - this.pSpeed;
        this.pushX = 0;
        this.pushY = 0;
        this.friction = 0.8 ;

    }
    draw(context){
        
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0 ,Math.PI * 2);
        context.fill();
        //context.stroke();
        if(this.particleNumber % 6 === 0){
            context.save()
            context.globalAlpha = 0.4;
            context.moveTo(this.effect.mouse.x,this.effect.mouse.y);
            context.lineTo(this.x, this.y);
            context.stroke();
            context.restore()
        }
    }
    update() {
        if(this.effect.mouse.pressed){
            const dx = this.x - this.effect.mouse.x;
            const dy = this.y - this.effect.mouse.y;
            const distance = Math.hypot(dx, dy);
            const force = this.effect.mouse.radius / distance;
            if(distance < this.effect.mouse.radius){
                const angle = Math.atan2(dy,dx);
                this.pushX += Math.cos(angle) * force;
                this.pushY += Math.sin(angle) * force;
            }
        }
        this.x += (this.pushX *= this.friction) + this.vx;
        this.y += (this.pushY *= this.friction) + this.vy;
        if (this.x < this.radius){
            this.x = this.radius;
            this.vx *= -1;
        } else if (this.x > this.effect.width - this.radius){
            this.x = this.effect.width - this.radius;
            this.vx *= -1;
        }
        if (this.y < this.radius){
            this.y = this.radius;
            this.vy *= -1;
        } else if (this.y > this.effect.height - this.radius){
            this.y = this.effect.height - this.radius;
            this.vy *= -1;
        }
       
      
    }
    reset(){
        this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
        this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
    }
}