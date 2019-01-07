

let c = {canvas: undefined, ctx: undefined};
let mouse = {x: undefined, y: undefined};
let game;


window.onload = () => {
    c.canvas = document.getElementById('canvas');
    c.ctx = c.canvas.getContext('2d');

    game = new Game();

    gameLoop();
}

class Game{
    constructor(){
        this.typist;
        this.animations;
    }

    draw(){
        this.animations.draw();
    }
}

class Typist{
    constructor(){
        this.wpm;
        this.name;
        this.icon;
    }
}

class Text{
    
}