
/*
    Every key press will call game.draw() and pass
    through the key that was pressed.
*/

import Objects from './objects.js';

// There is this offset due to the fact the the index
// starts at 32 but the index for the image starts
// at 0.
let CIO = 32;
// Set the correct size of the font.
// let font32 = Math.floor(innerWidth / 32);
// let font16 = Math.floor(innerWidth / 16);
// let FONT_SRC;
// let START_BUTTON_SRC;
// if(font32 > 48){
//     FONT_SRC = '../res/images/terminalFont32.png';
//     START_BUTTON_SRC = '../res/images/terminalFontStartButton32.png';
// }else if(font32 <= 48){
//     FONT_SRC = '../res/images/terminalFont16.png';
//     START_BUTTON_SRC = '../res/images/terminalFontStartButton16.png';
// }
// else if(font16 <= 48){
//     FONT_SRC = '../res/images/terminalFont8.png';
//     START_BUTTON_SRC = '../res/images/terminalFontStartButton16.png';
// }

let FONT_SRC = '../res/images/terminalFont16.png';
let START_BUTTON_SRC = '../res/images/terminalFontStartButton16.png';

// Character width and height.
let CW, CH;

// Canvas and the context.
let canvas, ctx;

// The game object.
let g;

window.onload = () => {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    if(FONT_SRC.includes('8')){
        CW = CH = 8;
    }else if(FONT_SRC.includes('16')){
        CW = CH = 16;
    }else if(FONT_SRC.includes('32')){
        CW = CH = 32;
    }
    
    // Set the width and height.
    canvas.width = 48 * CW;
    canvas.height = 42 * (CH + (CH / 4));

    // Make the game object and pass through
    // the canvas width and height.
    g = new Game(canvas.width, canvas.height);
    
    // Click event.
    canvas.addEventListener("click", (e) => {
        console.log(e.offsetX, e.offsetY);
        g.click(e.offsetX, e.offsetY, ctx);
    });

    window.addEventListener("keypress", (event) => {
        // Pass the event code to the game draw method.
        if(event.which == 32 && event.target == document.body){
            // If the key is space bar, then draw the space but
            // prevent the scroll down.
            g.draw(ctx, event.which);
            event.preventDefault();
        }else{
            g.draw(ctx, event.which);    
        }
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

        // Add the start button.
        this.objects.addButton(new StartButton());

        // Call the initial draw.
        this.draw(ctx);
    }
    
    draw(ctx, keycode){
        // Refresh the canvas.
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, this.width, this.height);

        // Draw blue lines.
        ctx.fillStyle = 'cornflowerblue';
        for(let i = 0; i < canvas.height / (CH + (CH / 4)); i ++){
            ctx.fillRect(0, (i * (CH + (CH / 4))) + (CH * 3), canvas.width, 1);
        }

        if(keycode){
            if(this.posY >= this.height / 8 * 5){
                this.scroll(-(CH + (CH / 4)));
            }
            let index = keycode - CIO;
            this.objects.addLetter(new Letter(this.posX, this.posY, index));
            
            this.posX += CW;

            if(this.posX == this.width){
                this.posX = 0;
                this.posY += CH + (CH / 4);
            }
        }

        // Draw the top gray bar.
        ctx.fillStyle = 'gray';
        ctx.fillRect(0, 0, this.width, (CH * 2) - (CH / 4));

        // Draw Typio at the top.
        this.charImg.onload = () => {
            ctx.drawImage(this.charImg, (84 - CIO) * CW, 0, CW, CH, CW * 0, CH / 2, CW, CH);
            ctx.drawImage(this.charImg, (121 - CIO) * CW, 0, CW, CH, CW * 1, CH / 2, CW, CH);
            ctx.drawImage(this.charImg, (112 - CIO) * CW, 0, CW, CH, CW * 2, CH / 2, CW, CH);
            ctx.drawImage(this.charImg, (46 - CIO) * CW, 0, CW, CH, CW * 3, CH / 2, CW, CH);
            ctx.drawImage(this.charImg, (105 - CIO) * CW, 0, CW, CH, CW * 4, CH / 2, CW, CH);
            ctx.drawImage(this.charImg, (111 - CIO) * CW, 0, CW, CH, CW * 5, CH / 2, CW, CH);
        }
        ctx.drawImage(this.charImg, (84 - CIO) * CW, 0, CW, CH, CW * 0, CH / 2, CW, CH);
        ctx.drawImage(this.charImg, (121 - CIO) * CW, 0, CW, CH, CW * 1, CH / 2, CW, CH);
        ctx.drawImage(this.charImg, (112 - CIO) * CW, 0, CW, CH, CW * 2, CH / 2, CW, CH);
        ctx.drawImage(this.charImg, (46 - CIO) * CW, 0, CW, CH, CW * 3, CH / 2, CW, CH);
        ctx.drawImage(this.charImg, (105 - CIO) * CW, 0, CW, CH, CW * 4, CH / 2, CW, CH);
        ctx.drawImage(this.charImg, (111 - CIO) * CW, 0, CW, CH, CW * 5, CH / 2, CW, CH);

        // Draw cursor/typing line.
        ctx.fillStyle = 'black';
        ctx.fillRect(this.posX + 1, this.posY - 1, 4, CH);

        // Draw letters and buttons.
        this.objects.draw(ctx);
    }

    scroll(num){
        this.posY += num;
        this.objects.scroll(num);
    }

    deleteLetter(){
        if(this.objects.letters.length){ 
            this.posX = this.objects.letters[this.objects.letters.length - 1].x;
            this.posY = this.objects.letters[this.objects.letters.length - 1].y;
            this.objects.letters.pop();
            this.draw(ctx);
        }
    }

    click(mx, my){
        this.objects.click(mx, my);
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
        // Check to see if visible.
        if(this.y + CH < CH * 2){
            this.visible = false;
        }else{
            this.visible = true;
        }
        // If visible, draw letter.
        if(this.visible){
            ctx.drawImage(
                g.charImg,
                this.index * CW,
                0,
                CW,
                CH,
                this.x,
                this.y,
                CW,
                CH
            );
        }
    }
}

class StartButton{
    constructor(){
        this.x = canvas.width - (CW * 5) - (CW / 4);
        this.y = CH / 2 - (CH / 4);
        this.width = CW * 5 + (CW / 2);
        this.height = CH + (CH / 2);
        this.image = new Image();
        this.image.src = START_BUTTON_SRC;
    }

    draw(ctx){
        // Draw background box.
        ctx.fillStyle = 'darkgray';
        ctx.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );
        // Draw image.
        this.image.onload = () => {
            ctx.drawImage(
                this.image,
                this.x + (CW / 8),
                this.y + (CH / 4)
            );
        }
        ctx.drawImage(
            this.image,
            this.x + (CW / 8),
            this.y + (CH / 4)
        );
    }

    clicked(){
        alert('clicked');
    }
}
