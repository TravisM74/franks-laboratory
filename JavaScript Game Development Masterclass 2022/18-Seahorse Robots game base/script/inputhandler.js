export class InputHandler {
    constructor(game){
        this.game = game;
        window.addEventListener('keydown', (e) =>{
            if ((
                (e.key === 'ArrowUp') 
                || (e.key === 'ArrowDown')
                || (e.key === 'ArrowLeft')
                || (e.key === 'ArrowRight')
                || (e.key === ' ') 
                ) && (this.game.keys.indexOf(e.key) === -1)){
                    this.game.keys.push(e.key);
                } if(e.key === (' ')){
                    this.game.player.shootTop();
                } 
                //console.log (e.key);
        });
        window.addEventListener('keyup', e => {
            if(this.game.keys.indexOf(e.key) > -1){
                this.game.keys.splice(this.game.keys.indexOf(e.key), 1);
            };
        });
    }
}