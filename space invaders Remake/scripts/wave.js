import {Enemy, Beetlemorph} from './enemy.js';
export class Wave{
    constructor(game){
        this.game = game;
        this.width = this.game.columns * this.game.enemySize;
        this.height= this.game.rows * this.game.enemySize;
        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = 0 - this.height;
        this.speedX = Math.random() < 0.5 ?  1: -1;
        this.speedY = 0;
        this.enemies = [];
        this.nextWaveTrigger = false;
        this.create();
    }
    render(context,deltaTime){
        if (this.y < 0) {
            this.y += 5;
            
        }
        this.speedY = 0;
        //context.strokeRect(this.x, this.y, this.width, this.height);
        if (this.x <0 || this.x > this.game.width - this.width){
            this.speedX *= -1;
            this.speedY = this.game.enemySize;
        }
        this.x += this.speedX;
        this.y += this.speedY;
        this.enemies.forEach(e => {
            e.update(this.x, this.y, deltaTime);
            e.draw(context);
        });

        this.enemies = this.enemies.filter(e => !e.markedForDeletion)
    }
    create(){
        for (let y = 0 ; y < this.game.rows; y++){
            for (let x = 0 ;x < this.game.columns; x++){
                let enemyY = y * this.game.enemySize;
                let enemyX = x * this.game.enemySize;
                this.enemies.push(new Beetlemorph(this.game, enemyX, enemyY))
            }
        }
    }
    checkEndColumnsForEnemy(col,row){
        const isEmpty = true;
        const isEndRow = false;
        for (let i = 0; i < col; i++){
            for (let j = 0; j < row; j++){
                if (this.enemies[0]) {};
            }
        }
    }
}