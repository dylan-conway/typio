/*
    Every key press will call game.draw() and pass
    through the key that was pressed.
*/

let CHARWIDTH = 30;
let CHARHEIGHT = 30;

let c = {canvas: undefined, ctx: undefined};
let m = {x: undefined, y: undefined};
let g;

window.onload = () => {
    c.canvas = document.getElementById('canvas');
    c.ctx = c.canvas.getContext('2d');
    c.canvas.width = innerWidth;
    c.canvas.height = innerHeight;

    g = new Game();

    g.objects.addButton(new StartButton(200, 200, 200, 40));

    window.addEventListener("mousemove", function(event){
        m.x = event.x;
        m.y = event.y;
    });

    window.addEventListener("click", function(){
        g.click();
    });

    // window.addEventListener('keydown', function(e){Key.onKeyDown(e);}, false);
    // window.addEventListener('keyup', function(e){Key.onKeyUp(e);}, false);

    // window.addEventListener('keydown', function(event){
    //     game.draw(String.fromCharCode(event.keyCode));
    //     game.draw(event.keyCode, Key.isDown(Key.SHIFT));
    // })

    g.draw();
}

class Game{
    constructor(){
        this.objects = new Objects();
    }

    draw(){
        c.ctx.clearRect(0, 0, c.canvas.width, c.canvas.height);

        this.objects.draw();
    }

    click(){
        this.objects.click();
    }
}

class Character{
    constructor(x, y, src, srcIndex){
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = src;
        this.srcIndex = srcIndex;
    }

    draw(){
        c.ctx.drawImage(this.image, CHARWIDTH * this.srcIndex, 0,
                        CHARWIDTH, CHARHEIGHT, this.x, this.y,
                        CHARWIDTH, CHARHEIGHT);
    }
}

class Text{
    constructor(text){
        this.text = text;
    }
}

// Input
let Key = {
    _pressed: {},
    SHIFT: 16,

    isDown: function(keyCode){
        return this._pressed[keyCode];
    },

    onKeyDown: function(e){
        this._pressed[e.keyCode] = true;
    },

    onKeyUp: function(e){
        delete this._pressed[e.keyCode];
    }
}