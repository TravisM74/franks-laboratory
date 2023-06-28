export class Particle {
    constructor(effect){
        this.effect = effect;
        this.radius = 2 + Math.random() * 5;
        this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
        this.y = this.radius + Math.random() * (this.effect.height - this.radius *2);
        this.pSpeed = 4
        this.vx = Math.random() * (2 * this.pSpeed) - this.pSpeed;
        this.vy = Math.random() * (2 * this.pSpeed) - this.pSpeed;

    }
    draw(context){
        
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0 ,Math.PI * 2);
        context.fill();
        //context.stroke();
    }
    update() {
        this.x += this.vx;
        if (this.x > this.effect.width - this.radius || this.x < 0 + this.radius) this.vx *= -1;
        this.y += this.vy;
        if (this.y > this.effect.height - this.radius || this.y < 0 + this.radius) this.vy *= -1;
    }
}