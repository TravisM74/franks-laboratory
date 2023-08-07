export class Player{
    constructor(game){
        this.game = game;
        this.width = 140;
        this.height = 120;
        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = this.game.height - this.height ;
        this.speed = 5;
        this.lives = 3;
        this.maxLives = 5;
        this.image = document.getElementById('player');
        this.jetsImage = document.getElementById('player_jets');
        this.frameX = 0;
        this.maxFrame = 3;
        this.jetsFrame = 1
    }
    draw(context){
        //context.fillRect(this.x, this.y, this.width, this.height);
        if (this.game.keys.indexOf(' ')) this.frameX= 1;
        else this.frameX= 0;

        context.drawImage(this.image, this.width * this.frameX , 0, this.width, this.height, this.x, this.y, this.width, this.height);
        context.drawImage(this.jetsImage, this.width * this.jetsFrame , 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    update(){
        //horazontal movement
        if(this.game.keys.indexOf('ArrowLeft') > -1){
            this.x -= this.speed;
            this.jetsFrame = 0;
        } else if(this.game.keys.indexOf('ArrowRight') > -1) {
            this.x += this.speed;
            this.jetsFrame = 2;
        } else {
            this.jetsFrame = 1;
        }
        // horazontal boundries
        if (this.x < 0 - this.width * 0.5) this.x = 0 - this.width * 0.5;
        if (this.x > this.game.width - this.width * 0.5) this.x = this.game.width - this.width * 0.5;
        
        /*
        if (this.game.spriteUpdate) this.frameX++;
        if (this.frameX > this.maxFrame) this.frameX= 0;  
        */
    }
    shoot(){
        const projectile = this.game.getProjectile();
        if (projectile) projectile.start(this.x + this.width * 0.5, this.y);
    }
    restart(){
        this.x = this.game.width * 0.5 - this.width * 0.5;
        this.y = this.game.height - this.height ;
        this.lives = 3;
    }
}