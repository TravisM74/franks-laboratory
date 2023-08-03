export class UI {
    constructor(game){
        this.game = game;
        this.fontSize = 25;
        this.fontFamily = 'Bangers';
        this.color = 'white' ;
    }
    draw(context){
        context.save();
        context.fillStyle = this.color;
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.shadowColor = 'black'; 
        context.font = this.fontSize + 'px ' + this.fontFamily;
        //score
        context.fillText('Score :' + this.game.score , 20 , 40)
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
                message1 = 'Most Wondrous!';
                message2 = 'well done' + this.gaame.score;
            } else {
                message1 = 'Wreaked !';
                message2 =  'Scored '+ this.game.score+ ', you needed '+ this.game.winningScore + ', Try again !!' ;
            }
            context.font = '100px '+ this.fontFamily;
            context.fillText(message1, this.game.width * 0.5, this.game.height * 0.5 - 20);
            context.font = '30px '+ this.fontFamily;
            context.fillText(message2, this.game.width * 0.5, this.game.height * 0.5 + 20);
        }
        //ammo
        if(this.game.player.powerUp){
            context.fillStyle = '#ffffbd'
        }
        for (let i = 0; i < this.game.ammo ; i++){
            context.fillRect(20 + 10 * i, 50, 5 , 20);
        }
        
        context.restore();
    }
}