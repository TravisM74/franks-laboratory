export class Particle {
    constructor(effect){
        this.effect = effect;
        this.x = Math.random() * this.effect.width;
        this.y = Math.random() * this.effect.height;
        this.radius = 15;

    }
    draw(context){
       
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0 ,Math.PI * 2);
        context.fill();
    }
}