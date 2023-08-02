import {Projectile} from './projectile.js';
export class Player {
    constructor(game){
        this.game = game;
        this.width = 120;
        this.height = 190;
        this.x = 20;
        this.y = 100;
        this.speedY = 0;
        this.speedX = 0;
        this.maxSpeed = 1;
        this.projectiles = [];
        this.image = document.getElementById('player');
        this.frameX= 0;
        this.frameY= 0;
        this.maxFrame = 37;
    }
    update(){
        if (this.game.keys.includes('ArrowUp')) {
            this.y -= this.maxSpeed;
        }
        if (this.game.keys.includes('ArrowDown')) {
            this.y += this.maxSpeed;
        }
        if (this.game.keys.includes('ArrowRight')) {
            this.x += this.maxSpeed;
        }
        if (this.game.keys.includes('ArrowLeft')) {
            this.x-= this.maxSpeed;
        }
        /*
        if (this.game.keys.includes(' ')){
            this.game.player.shootTop();
        }
        */
        //projectiles
        this.projectiles.forEach( p => p.update());
        this.projectiles = this.projectiles.filter( p => !p.markedForDeletion);
      
        // sprite animation
        if(this.frameX < this.maxFrame){
            this.frameX++;
        }else {
            this.frameX = 0 ;
        }
    }
    draw(context){
        if  (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, this.frameX * this.width , this.frameY * this.height, this.width, this.height, this.x , this.y, this.width , this.height);
        this.projectiles.forEach(p => p.draw(context))
    }
    shootTop(){
        if (this.game.ammo > 0) {
            this.projectiles.push(new Projectile(this.game, this.x + this.width - 20,  this.y + 30))
            this.game.ammo--;
        }
    }
}