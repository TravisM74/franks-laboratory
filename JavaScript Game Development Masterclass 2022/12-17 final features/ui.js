export class UI{
    constructor(game){
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Helvatica';

    }
    draw(context){
        context.save();
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowBlur = 0;
        context.shadowColor = 'white';
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
        context.fillText ('Score :' + this.game.score, 20, 50);
        context.fillText ('Time :' + ((this.game.maxTime - this.game.time) * 0.001).toFixed(1), 20, 80);

        if (this.game.gameOver){
            context.textAlign = 'center';
            context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
            context.fillText('Game Over', this.game.width * 0.5 , this.game.height * 0.5);
            if(this.game.score > 30){
                context.font = this.fontSize * 1.2 + 'px ' + this.fontFamily;
                context.fillText('Well Done you scored ' + this.game.score, this.game.width * 0.5 , this.game.height * 0.5 + 40);
            } else {
                context.font = this.fontSize * 1.2 + 'px ' + this.fontFamily;
                context.fillText('try again !!!' , this.game.width * 0.5 , this.game.height * 0.5 + 40);
            } 
        }
        context.restore()
    }
}