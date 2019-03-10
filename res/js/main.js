
/*
    Every key press will call game.draw() and pass
    through the key that was pressed.
*/

import Objects from './objects.js';

// There is this offset due to the fact the the index
// starts at 32 but the index for the image starts
// at 0.
let CHAR_INDEX_OFFSET = 32;
let FONT_SRC = '../res/images/characters32.png';
// Character width and height.
let CW, CH;

// Canvas and the context.
let canvas, ctx;
// Mouse.
let m = {x: undefined, y: undefined};
// The game object.
let g;

window.onload = () => {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    if(FONT_SRC.includes('16')){
        CW = CH = 16;
    }else if(FONT_SRC.includes('32')){
        CW = CH = 32;
    }
    
    // Find the appropriate width and height for the canvas.
    let maxDiv = Math.floor(innerWidth / CW);
    canvas.width = (maxDiv - 3) * CW;
    // maxDiv = Math.floor(innerHeight / CH);
    // canvas.height = maxDiv * CH;
    canvas.height = innerHeight;

    // Make the game object and pass through
    // the canvas width and height.
    g = new Game(canvas.width, canvas.height);
    
    // Click event.
    window.addEventListener("click", () => {
        g.click();
    });

    // Cursor position tracking.
    window.addEventListener("mousemove", (event) => {
        m.x = event.x;
        m.y = event.y;
    });

    window.addEventListener("keypress", (event) => {
        // Pass the event code to the game draw method.
        g.draw(ctx, event.which);
    });

    window.addEventListener("keydown", (event) => {
        let key = event.which;
        if(key == 8){
            g.deleteLetter();
        }
    });
}

class Game{
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.objects;
        this.charImg;
        this.posX;
        this.posY;
        this.init();
    }

    init(){
        // Make the classes.
        this.objects = new Objects();
        this.charImg = new Image();
        // Set the URL.
        this.charImg.src = FONT_SRC;
        // Set the x and y coordinates.
        this.posX = 0;
        this.posY = CH * 2;

        // Call the initial draw.
        this.draw(ctx);
    }
    
    draw(ctx, keycode){
        // Refresh the canvas.
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, this.width, this.height);

        if(keycode){
            if(this.posY >= this.height / 8 * 7){
                this.scroll(-(CH + (CH / 4)));
            }
            let index = keycode - CHAR_INDEX_OFFSET;
            this.objects.addLetter(new Letter(this.posX, this.posY, index));
            
            this.posX += CW;

            if(this.posX == this.width){
                this.posX = 0;
                this.posY += CH + (CH / 4);
            }
        }

        this.objects.draw(ctx);

        // Top bar.
        ctx.fillStyle = 'gray';
        ctx.fillRect(0, 0, this.width, CH * 2);

        this.charImg.onload = () => {
            ctx.drawImage(this.charImg, (116 - CHAR_INDEX_OFFSET) * CW, 0, CW, CH, CW * 0, CH / 2, CW, CH);
            ctx.drawImage(this.charImg, (121 - CHAR_INDEX_OFFSET) * CW, 0, CW, CH, CW * 1, CH / 2, CW, CH);
            ctx.drawImage(this.charImg, (112 - CHAR_INDEX_OFFSET) * CW, 0, CW, CH, CW * 2, CH / 2, CW, CH);
            ctx.drawImage(this.charImg, (46 - CHAR_INDEX_OFFSET) * CW, 0, CW, CH, CW * 3, CH / 2, CW, CH);
            ctx.drawImage(this.charImg, (105 - CHAR_INDEX_OFFSET) * CW, 0, CW, CH, CW * 4, CH / 2, CW, CH);
            ctx.drawImage(this.charImg, (111 - CHAR_INDEX_OFFSET) * CW, 0, CW, CH, CW * 5, CH / 2, CW, CH);
        }
        ctx.drawImage(this.charImg, (116 - CHAR_INDEX_OFFSET) * CW, 0, CW, CH, CW * 0, CH / 2, CW, CH);
        ctx.drawImage(this.charImg, (121 - CHAR_INDEX_OFFSET) * CW, 0, CW, CH, CW * 1, CH / 2, CW, CH);
        ctx.drawImage(this.charImg, (112 - CHAR_INDEX_OFFSET) * CW, 0, CW, CH, CW * 2, CH / 2, CW, CH);
        ctx.drawImage(this.charImg, (46 - CHAR_INDEX_OFFSET) * CW, 0, CW, CH, CW * 3, CH / 2, CW, CH);
        ctx.drawImage(this.charImg, (105 - CHAR_INDEX_OFFSET) * CW, 0, CW, CH, CW * 4, CH / 2, CW, CH);
        ctx.drawImage(this.charImg, (111 - CHAR_INDEX_OFFSET) * CW, 0, CW, CH, CW * 5, CH / 2, CW, CH);
        console.log(this.posX, this.posY);
    }

    scroll(num){
        this.posY += num;
        this.objects.scroll(num);
    }

    scrollUp(){

    }

    deleteLetter(){
        if(this.objects.letters.length){ 
            this.posX = this.objects.letters[this.objects.letters.length - 1].x;
            this.posY = this.objects.letters[this.objects.letters.length - 1].y;
            this.objects.letters.pop();
            this.draw(ctx);
        }
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
        this.visible = true;
    }

    draw(ctx){
        if(this.y + CH < CH * 2){
            this.visible = false;
        }else{
            this.visible = true;
        }

        if(this.visible){
            ctx.drawImage(g.charImg, this.index * CW, 0, CW, CH, this.x, this.y, CW, CH);
        }
    }
}

function putImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight){
    ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
}
