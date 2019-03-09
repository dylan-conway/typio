
/*
    Every key press will call game.draw() and pass
    through the key that was pressed.
*/

let CHAR_INDEX_OFFSET = 32;
let FONT_SRC = 'images/characters32.png';

let c = {canvas: undefined, ctx: undefined};
let m = {x: undefined, y: undefined};
let g;

window.onload = () => {
    c.canvas = document.getElementById('canvas');
    c.ctx = c.canvas.getContext('2d');
    c.canvas.width = innerWidth;
    c.canvas.height = innerHeight;
    

    g = new Game();

    window.addEventListener("mousemove", function(event){
        m.x = event.x;
        m.y = event.y;
    });

    window.addEventListener("click", function(){
        g.click();
    });

    window.addEventListener("keypress", (event) => {
        console.log("keypress:");
        console.log(event.which, event.keyCode);
        g.draw(event.which);
    })
}

class Game{
    constructor(){
        this.objects = new Objects();
        this.charImg;
        this.width;
        this.height;
        this.posX;
        this.posY;
        this.charWidth;
        this.charHeight;
        this.init();
    }

    init(){
        this.charImg = new Image();
        this.charImg.src = FONT_SRC;

        if(FONT_SRC.includes('16')){
            this.charWidth = 16;
            this.charHeight = 16;
        }else if(FONT_SRC.includes('32')){
            this.charWidth = 32;
            this.charHeight = 32;
        }

        let num = Math.floor(innerWidth / this.charWidth);
        this.width = num * this.charWidth;

        num = Math.floor(innerHeight / this.charHeight);
        this.height = num * this.charHeight;

        this.posX = 0;
        this.posY = 0;
    }
    
    draw(keycode){
        c.ctx.clearRect(0, 0, c.canvas.width, c.canvas.height);
        if(keycode){
            console.log(keycode - CHAR_INDEX_OFFSET);
            // Check the boundaries of the x and y cords of where the character
            // is going to be drawn.
            if(this.posX == this.width){
                this.posX = 0
                this.posY += this.charHeight;
            }
            let index = keycode - CHAR_INDEX_OFFSET;
            this.objects.addLetter(new Letter(this.posX, this.posY, index));
            // putImage(this.charImg, index * this.charWidth, 0,
            //                                  this.charWidth, this.charHeight, this.posX, this.posY,
            //                                  this.charWidth, this.charHeight)
            
            this.posX += this.charWidth;
        }
        
        this.objects.draw();
    }

    click(){
        this.objects.click();
    }
}

class Letter{
    constructor(x, y, index){
        this.x = x;
        this.y = y;
        this.index = index;
    }

    draw(){
        putImage(g.charImg, this.index * g.charWidth, 0, g.charWidth, g.charHeight, this.x, this.y, g.charWidth, g.charHeight);
    }
}

function putImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight){
    c.ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
}
