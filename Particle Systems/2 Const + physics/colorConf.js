export class ColorConfig{
    constructor(context, canvas){
        this.canvas = canvas;
        this.context = context;
        const gradient = this.context.createLinearGradient(0,0,this.canvas.width,this.canvas.height);
        gradient.addColorStop(0, 'white');
        gradient.addColorStop(0.5, 'gold');
        gradient.addColorStop(1, 'orangered');
        this.context.fillStyle = gradient;
        this.context.strokeStyle = 'white';
    }
}