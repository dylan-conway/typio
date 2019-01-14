(function(){
    class Objects{
        constructor(){
            this.letters = [];
            this.texts = [];
            this.buttons = [];
        }

        addLetter(letter){
            this.letters.push(letter);
        }

        addText(text){
            this.texts.push(text);
        }

        addButton(button){
            this.buttons.push(button);
        }

        draw(){
            for(let letter of this.letters){
                letter.draw();
            }

            for(let text of this.texts){
                text.draw();
            }

            for(let button of this.buttons){
                button.draw();
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

    window.Objects = Objects;
})();