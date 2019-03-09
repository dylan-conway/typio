
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

    window.addEventListener("mousemove", function(event){
        m.x = event.x;
        m.y = event.y;
    });

    window.addEventListener("click", function(){
        g.click();
    });

    window.addEventListener("keypress", (event) => {
        console.log("keypress:");
        console.log(event.which);
        g.draw(event.which);
    })
}

class Game{
    constructor(){
        this.objects = new Objects();
        this.charImage = new Image();
        this.charImage.src = 'images/characters.png';
        this.posX = 300;
        this.posY = 300;
    }

    draw(keycode){
        c.ctx.clearRect(0, 0, c.canvas.width, c.canvas.height);

        if(keycode){
            c.ctx.drawImage(this.charImage, 32 * keycode + 32, 0, 32, 32, this.posX, this.posY, 32, 32);
        }
        
        this.objects.draw();
    }

    click(){
        this.objects.click();
    }
}
