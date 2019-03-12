export default class Objects{
    constructor(){
        this.buttons = [];
        this.letters = [];
    }

    addButton(button){
        this.buttons.push(button);
    }

    addLetter(letter){
        this.letters.push(letter);
    }

    draw(ctx){
        for(let button of this.buttons){
            button.draw(ctx);
        }

        for(let letter of this.letters){
            letter.draw(ctx);
        }
    }

    scroll(num){
        for(let letter of this.letters){
            letter.y += num;
        }
    }

    click(mx, my){
        for(let b of this.buttons){
            if(
                mx > b.x && mx < b.x + b.width &&
                my > b.y && my < b.y + b.height
            ){
                b.clicked();    
            }
        }
    }
}