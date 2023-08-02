export class UI {
    constructor(game){
        this.game = game;
        this.fontSize = 25;
        this.fontFamily = 'Helvetica';
        this.color = 'white' ;
    }
    draw(context){
        context.save();
        context.fillStyle = this.color;
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'black'; 
        context.font = this.fontSize + 'px' + this.fontFamily;
        //score
        context.fillText('Score :' + this.game.score , 20 , 40)
        //ammo
        for (let i = 0; i < this.game.ammo ; i++){
            context.fillRect(20 + 10 * i, 50, 5 , 20);
        }
        //timer
        const formattedTime = (this.game.gameTime * 0.001).toFixed(1);
        context.fillText('Timer: ' + formattedTime , 20 , 100)

        // Game over message
        //console.log(this.game.gameOver);
        if (this.game.gameOver){
            context.textAlign = 'center';
            let message1;
            let message2;
            if (this.game.score >= this.game.winningScore) {
                message1 = 'You Win !';
                message2 = 'well done';
            } else {
                message1 = 'You Lose !';
                message2 = 'Try again';
            }
            context.font = '50px '+ this.fontFamily;
            context.fillText(message1, this.game.width * 0.5, this.game.height * 0.5 - 40);
            context.font = '30px '+ this.fontFamily;
            context.fillText(message2, this.game.width * 0.5, this.game.height * 0.5 + 40);
        }

        context.restore();
    }
}