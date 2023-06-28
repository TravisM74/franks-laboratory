export class Particle {
    constructor(effect){
        this.effect = effect;
        this.radius = 15 + Math.random() *30;
        this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
        this.y = this.radius + Math.random() * (this.effect.height - this.radius *2);
        this.vx = Math.random() * 8 - 4;
        this.vy = Math.random() * 8 - 4;

    }
    draw(context){
        context.fillStyle = 'hsl('+ this.x  * 0.25 +',100%,50%)'
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0 ,Math.PI * 2);
        context.fill();
        context.stroke();
    }
    update() {
        this.x += this.vx;
        if (this.x > this.effect.width - this.radius || this.x < 0 + this.radius) this.vx *= -1;
        this.y += this.vy;
        if (this.y > this.effect.height - this.radius || this.y < 0 + this.radius) this.vy *= -1;
    }
}