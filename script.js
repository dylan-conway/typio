/*
    Every key press will call game.draw() and pass
    through the key that was pressed.
*/

let c = {canvas: undefined, ctx: undefined};
let mouse = {x: undefined, y: undefined};
let game;

window.onload = () => {
    c.canvas = document.getElementById('canvas');
    c.ctx = c.canvas.getContext('2d');

    game = new Game();


}

class Game{
    constructor(){
        this.typist;
        this.animations;
    }

    draw(){
        c.ctx.clearRect(0, 0, c.canvas.width, c.canvas.height);

    }
}
