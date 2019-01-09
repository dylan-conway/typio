/*
    Every key press will call game.draw() and pass
    through the key that was pressed.
*/

let CHARWIDTH = 30;
let CHARHEIGHT = 30;

let c = {canvas: undefined, ctx: undefined};
let mouse = {x: undefined, y: undefined};
let game;

window.onload = () => {
    c.canvas = document.getElementById('canvas');
    c.ctx = c.canvas.getContext('2d');
    c.canvas.width = innerWidth;
    c.canvas.height = innerHeight;

    game = new Game();

    let sentence = new Text('Testing.');
    for(let i = 0; i < sentence.text.length; i ++){
        console.log(sentence.text[i].charCodeAt());
    }

    window.addEventListener('keydown', function(e){Key.onKeyDown(e);}, false);
    window.addEventListener('keyup', function(e){Key.onKeyUp(e);}, false);

    window.addEventListener('keydown', function(event){
        // game.draw(String.fromCharCode(event.keyCode));
        game.draw(event.keyCode, Key.isDown(Key.SHIFT));
    })
}

class Game{
    constructor(){
        this.characters = [];
        this.code;
        this.charWidth = 30;
        this.charHeight = 30;
        this.numbersImage = new Image();
        this.numbersImage.src = 'images/numbers.png';
    }

    draw(keyCode, shift){
        c.ctx.clearRect(0, 0, c.canvas.width, c.canvas.height);

        if(this.code >= 48 && this.code <= 57){
            this.characters.push(new Character(100, 100, 'images/numbers.png', this.code - 48));
            // c.ctx.drawImage(this.numbersImage, code * this.charWidth, 0,
            //                 this.charWidth, this.charHeight, 100, 100,
            //                 this.charWidth, this.charHeight);
            for(let i = 0; i < this.characters; i ++){
                this.characters[i].draw();
            }
        }else{
            c.ctx.font = '68px Times New Roman';
            c.ctx.fillText(String.fromCharCode(this.code), 100, 100, 100);

            console.log(this, this.characters);
        }

        
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