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

    click(mx, my){
        for(let b of this.buttons){
            if(
                mx > b.x && mx < b.x + b.width &&
                my > b.y && my < b.y + b.height &&
                b.clickable
            ){
                b.clicked();    
            }
        }
    }

    checkCorrectness(){
        for(let l of this.letters){
            if(l.typed == 2){
                return false;
            }
        }

        return true;
    }
}