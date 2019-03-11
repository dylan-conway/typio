import m from './main.js';

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

    click(){
        for(let b of this.buttons){
            if(m.x > b.x && m.x < b.x + b.width &&
               m.y > b.y && m.y < b.y + b.height){
                b.clicked();    
            }
        }
    }
}