var cir1 = {
    x:10,
    y:10,
    radius:50};
var cir2 = {
    x:100,
    y:100,
    radius:150};
    
let dx = cir2.x - cir1.x;
let dy = cir2.y - cir1.y;
let distance = Math.sqrt((dx * dx) + (dy * dy));
let sumOfRadii = cir1.radius + cir2.radius;

if (distrance < sumOfRadii){
    // collision
} else if (distance === sumOfRadii){
    // touching
} else {
    // no collision
}