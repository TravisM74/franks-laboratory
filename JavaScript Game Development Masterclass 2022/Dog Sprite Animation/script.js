let playerState = 'run';
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change' , (event) => {
    playerState = event.target.value;
});

const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
console.log(ctx);

const CANVAS_WIDTH = canvas.width= 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src='shadow_dog.png';
const spriteWidth = 575;
const spriteHeight = 523;

let gameFrame = 0;
const staggerFrames = 8;

const spriteAnimations = [];
const animationStates = [
    {
        name: 'idle',
        frames: 7,
        
    },
    {
        name: 'jump',
        frames: 7,
        
    },
    {
        name: 'fall',
        frames: 7,
        
    },
    {
        name: 'run',
        frames: 9,
        
    },
    {
        name: 'dizzy',
        frames: 11,
        
    },
    {
        name: 'sit',
        frames: 5,
        
    },
    {
        name: 'roll',
        frames: 7,
        
    },
    {
        name: 'bite',
        frames: 7,
        
    },
    {
        name: 'ko',
        frames: 12,
        
    },
    {
        name: 'getHit',
        frames: 4,
        
    }
];
animationStates.forEach((state, index) => {
    let frames = {
       loc: [],
    }
    for (let j =  0; j < state.frames; j++) {
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x: positionX, y: positionY})
    }
    spriteAnimations[state.name] = frames;
});
console.log(spriteAnimations);

function animate(){
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    // formular for setting animation speed.
    let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].loc.length;
    let frameX = spriteWidth *position;
    let frameY =spriteAnimations[playerState].loc[position].y;
    ctx.drawImage(playerImage,frameX ,frameY ,spriteWidth,spriteHeight,0,0,spriteWidth,spriteHeight);
    gameFrame++;
    requestAnimationFrame(animate);
};

animate();

//ctx.fillRect(100,50,100,100);
//                       crop out this area                         draw on canvas here
//ctx.drawImage(Image, sourceX,sourceY,sourceWidth,sourceHeight,drawX,drawY,drawWidth,drawHeight)
/*

1st method for slowing Animation speed.

-----my variables added.
let frameNum =0;
const frameRestrict = 7;

-----Code Added in animation loop...
if (frameNum >  frameRestrict){
    if (frameX < 6) {
        frameX++;
        frameNum = 0;
    } else {
        frameX = 0;
    }
} else {
    frameNum++;
};
*/