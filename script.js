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
    c.canvas.width = innerWidth;
    c.canvas.height = innerHeight;

    game = new Game();

    window.addEventListener('keydown', function(event){
        game.draw(String.fromCharCode(event.keyCode));
    })
}

class Game{
    constructor(){
    }

    draw(keyCode){
        c.ctx.clearRect(0, 0, c.canvas.width, c.canvas.height);
        c.ctx.font = '68px Times New Roman';
        c.ctx.fillText(keyCode, 100, 100, 100);
    }
}
