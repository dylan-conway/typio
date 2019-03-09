(function(){
    class Objects{
        constructor(){
            this.buttons = [];
        }

        addButton(button){
            this.buttons.push(button);
        }

        draw(){
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