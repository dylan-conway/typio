
/*
    Typ.io

    Currently a pixel type racing game.

    Author: Dylan Conway
*/

import style from '../main.css';

// Import images.
import terminalFont16URL from '../images/terminalFont16.png';
import terminalFontOneURL from '../images/terminalFontOne.png';
import terminalFontTwoURL from '../images/terminalFontTwo.png';
import terminalFontThreeURL from '../images/terminalFontThree.png';
import terminalFontGoURL from '../images/terminalFontGo.png';
import terminalFontTypioURL from '../images/terminalFontTypio16.png';
import terminalFontStartButton16URL from '../images/terminalFontStartButton16.png';

// Add the favicon.
import faviconImg from '../images/favicon.ico';
(function(){
    let link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = faviconImg;
    document.getElementsByTagName('head')[0].appendChild(link);
})();

import Objects from './objects.js';
import homeImage from '../images/terminalFontHome16.png';
import gitHubImage from '../images/terminalFontGitHub16.png';



// There is this offset due to the fact the the index
// starts at 32 but the index for the image starts
// at 0.
let CIO = 32;

let testString = 'This is a test of typio typing. Wow you are so fast!';

// Images.
let oneImg = new Image();
oneImg.src = terminalFontOneURL;
let twoImg = new Image();
twoImg.src = terminalFontTwoURL;
let threeImg = new Image();
threeImg.src = terminalFontThreeURL;
let goImg = new Image();
goImg.src = terminalFontGoURL;
let typioImg = new Image();
typioImg.src = terminalFontTypioURL;
let startButtonImg = new Image();
startButtonImg.src = terminalFontStartButton16URL;
let fontImg = new Image();
fontImg.src = terminalFont16URL;

// Character width and height.
let CW, CH;

// Canvas and the context.
let canvas, ctx;

// The game and player object.
let g, p;

window.onload = () => {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    document.getElementById('homeimage').src = homeImage;
    document.getElementById('githubimage').src = gitHubImage;
    

    CW = CH = 16;
    
    // Set the width and height.
    canvas.width = 48 * CW;
    canvas.height = 42 * (CH + (CH / 4));

    // Make the game object and pass through
    // the canvas width and height.
    g = new Game(canvas.width, canvas.height);

    // Make player.
    p = new Player();
    
    // Click event.
    canvas.addEventListener("click", (e) => {
        g.click(e.offsetX, e.offsetY, ctx);
    });

    window.addEventListener("keypress", (event) => {
        if(g.canType){
            // Pass the event code to the game draw method.
            if(event.which == 32 && event.target == document.body){
                // If the key is space bar, then draw the space but
                // prevent the scroll down.
                g.draw(ctx, event.which);
                event.preventDefault();
            }else{
                g.draw(ctx, event.which);
            }
        }
    });

    window.addEventListener("keydown", (event) => {
        let key = event.which;
        if(g.canType){
            if(key == 8){
                g.backspace();
            }
        }
    });
}

class Game{
    constructor(width, height){
        this.width = width;
        this.height = height;
        this.canType = false;
        this.objects;
        this.posX;
        this.posY;
        this.init();
    }

    init(){
        // Make the classes.
        this.objects = new Objects();
        // Set the x and y coordinates.
        this.posX = CW * 6;
        // this.posY = CH * 3 + (CH / 4);
        this.posY = CH * 6 - (CH / 4);

        // Add the start button.
        this.objects.addButton(new StartButton());

        // Call the initial draw.
        this.draw(ctx, 1000);
    }
    
    draw(ctx, keycode){
        // Refresh the canvas.
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, this.width, this.height);

        // Draw blue lines.
        ctx.fillStyle = 'cornflowerblue';
        for(let i = 0; i < canvas.height / (CH + (CH / 4)); i ++){
            ctx.fillRect(0, (i * (CH + (CH / 4))) + (CH * 3), canvas.width, 2);
        }

        // Draw the top gray bar.
        ctx.fillStyle = 'gray';
        ctx.fillRect(0, 0, this.width, (CH * 2) - (CH / 4) + 2);

        // Draw Typio at the top.
        ctx.drawImage(typioImg, CW * 1, CH / 4);
        ctx.fillStyle = 'black';
        ctx.fillRect(CW * 1 + 2, CH * 1 + 6, CW * 6 - 2, 2);

        // Check correctness of key stroke.
        if(keycode != 1000){
            // If the character entered is the last key, first
            // check to see if the key has already been typed.
            if(p.textIndex >= p.text.length - 1){
                if(this.objects.letters[p.text.length - 1].typed == 0){
                    // If the key has not been typed, go ahead and
                    // type it
                    this.posX += CW;
                    if(this.posX == this.width - (CW * 6)){
                        this.posX = CW * 6;
                        this.posY += CH + (CH / 4);
                    }
                    if(p.text.charCodeAt(p.textIndex) == keycode){
                        this.objects.letters[p.textIndex].typed = 1;
                    }else{
                        this.objects.letters[p.textIndex].typed = 2;
                    }

                    p.textIndex ++;

                    // Now after putting in the last character, check
                    // to see if the text is complete. If it is
                    // complete, reset the game. If not do nothing.
                    if(this.checkCorrectness()){
                        // Essentially reset game for now.
                        this.canType = false;
                        this.objects.letters = [];
                        this.objects.buttons[0].clickable = true;
                        // Reset x and y position.
                        this.posX = CW * 6;
                        this.posY = CH * 6 - (CH / 4);
                        p.textIndex = 0;
                    }
                }
            }else{
                this.posX += CW;
                if(this.posX == this.width - (CW * 6)){
                    this.posX = CW * 6;
                    this.posY += CH + (CH / 4);
                }
                if(p.text.charCodeAt(p.textIndex) == keycode){
                    this.objects.letters[p.textIndex].typed = 1;
                }else{
                    this.objects.letters[p.textIndex].typed = 2;
                }
                p.textIndex ++;
            }
        }

        // Draw letters and buttons.
        this.objects.draw(ctx);

        // Draw cursor/typing line.
        if(this.canType){
            ctx.fillStyle = 'black';
            ctx.fillRect(this.posX, this.posY - 2, 2, CH + 2);
        }
    }

    drawCountDown(ctx, num){
        if(num == 3){
            ctx.drawImage(threeImg, CW * 23, CH * 20);
        }else if(num == 2){
            ctx.drawImage(twoImg, CW * 23, CH * 20);
        }else if(num == 1){
            ctx.drawImage(oneImg, CW * 23, CH * 20);
        }else if(num == 0){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(goImg, 0, 0);
        }
    }

    checkCorrectness(){
        return this.objects.checkCorrectness();
    }

    startGame(){
        this.canType = true;
        // Make sure there are no letters when
        // starting the game.
        this.objects.letters = [];
        // Update player.
        p.text = testString;
        p.textIndex = 0;
        // Populate the test to be typed.
        for(let i of testString){
            let index = i.charCodeAt(0) - CIO;
            this.objects.addLetter(new Letter(this.posX, this.posY, index));
            this.posX += CW;
            if(this.posX == this.width - (CW * 6)){
                this.posX = CW * 6;
                this.posY += CH + (CH / 4);
            }
        }
        // Reset the x and y position.
        this.posX = CW * 6;
        // this.posY = CH * 3 + (CH / 4);
        this.posY = CH * 6 - (CH / 4);
        // Then draw the letters. And pass
        // a fake keycode because no key was
        // pressed.
        this.draw(ctx, 1000);
    }

    backspace(){
        if(p.textIndex){
            p.textIndex --;
            this.objects.letters[p.textIndex].typed = 0;
            this.posX = this.objects.letters[p.textIndex].x;
            this.posY = this.objects.letters[p.textIndex].y;
        }
        
        this.draw(ctx, 1000);
    }

    click(mx, my){
        this.objects.click(mx, my);
    }
}

class Player{
    constructor(){
        this.text;
        this.textIndex;
    }
}

class Letter{
    constructor(x, y, index){
        this.x = x;
        this.y = y;
        this.index = index;
        this.typed = 0;
    }

    draw(ctx){
        // Image filter.
        if(this.typed == 1){
            // Typed correctly.
            ctx.fillStyle = 'rgba(100, 149, 237, 1)';
            ctx.fillRect(this.x, this.y - 2, CW, CH + 2);
        }else if(this.typed == 2){
            // Typed incorrectly.
            ctx.fillStyle = 'rgba(205, 92, 92, 1)';
            ctx.fillRect(this.x, this.y - 2, CW, CH + 2);
        }

        // Draw letter.
        ctx.drawImage(
            fontImg,
            this.index * CW,
            0,
            CW,
            CH,
            this.x,
            this.y,
            CW,
            CH
        );

        // Image filter.
        if(this.typed == 0){
            // Not typed.
            ctx.fillStyle = 'rgba(255, 255, 255, .5)';
            ctx.fillRect(this.x, this.y, CW, CH);
        }
    }
}

class StartButton{
    constructor(){
        this.x = canvas.width - (CW * 6) - (CW / 4) - 2;
        this.y = CH / 2 - (CH / 4) - 4;
        this.width = CW * 5 + (CW / 4);
        this.height = CH + (CH / 2);
        this.clickable = true;
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
        ctx.drawImage(
            startButtonImg,
            this.x + (CW / 8),
            this.y + (CH / 4)
        );
        // Make the button look clickable
        // or not clickable.
        if(this.clickable){
            ctx.fillStyle = 'black';
            ctx.fillRect(this.x + this.width, this.y + 2, 2, this.height);
            ctx.fillRect(this.x + 2, this.y + this.height, this.width - 2, 2)
        }else{
            ctx.fillStyle = 'rgba(255, 255, 255, .75)';
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    clicked(){
        this.clickable = false;
        g.drawCountDown(ctx, 3);
        setTimeout(()=>{g.drawCountDown(ctx, 2)}, 1000);
        setTimeout(()=>{g.drawCountDown(ctx, 1)}, 2000);
        setTimeout(()=>{g.drawCountDown(ctx, 0)}, 3000);
        setTimeout(()=>{g.startGame()}, 3500);

        // setTimeout(()=>{g.drawCountDown(ctx, 2)}, 100);
        // setTimeout(()=>{g.drawCountDown(ctx, 1)}, 200);
        // setTimeout(()=>{g.drawCountDown(ctx, 0)}, 300);
        // setTimeout(()=>{g.startGame()}, 350);
    }
}
