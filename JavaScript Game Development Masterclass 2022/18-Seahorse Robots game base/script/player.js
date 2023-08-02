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
      
    }
    draw(context){
        context.fillStyle = 'grey';
        context.fillRect(this.x, this.y, this.width, this.height);
        this.projectiles.forEach(p => p.draw(context))
    }
    shootTop(){
        if (this.game.ammo > 0) {
            this.projectiles.push(new Projectile(this.game, this.x + this.width - 20,  this.y + 30))
            this.game.ammo--;
        }
    }
}