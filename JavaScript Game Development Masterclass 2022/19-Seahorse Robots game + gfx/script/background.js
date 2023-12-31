import {Layer} from './layer.js';

export class Background{
    constructor(game){
        this.game = game;
        this.image1 = document.getElementById('layer1');
        this.image2 = document.getElementById('layer2');
        this.image3 = document.getElementById('layer3');
        this.image4 = document.getElementById('layer4');
        
        this.layer1 =new Layer(this.game, this.image1, .2);
        this.layer2 =new Layer(this.game, this.image2, .4);
        this.layer3 =new Layer(this.game, this.image3, 1);
        this.layer4 =new Layer(this.game, this.image4, 1.5);
        

        this.layers = [this.layer1, this.layer2, this.layer3];
        //console.log(this.layers);
    }
    update(){
        this.layers.forEach(layer => layer.update());
        //this.layer1.update();
    }
    draw(context){
        this.layers.forEach(layer => layer.draw(context));
        //this.layer1.draw(context);
    }
}