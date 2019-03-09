(function(){
    class Objects{
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

        draw(){
            for(let button of this.buttons){
                button.draw();
            }

            for(let letter of this.letters){
                letter.draw();
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