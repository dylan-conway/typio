(function(){
    class StartButton{
        constructor(x, y, width, height){
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }

        draw(){
            c.ctx.fillStyle = 'black';
            c.ctx.fillRect(this.x, this.y, this.width, this.height);
            c.ctx.fillStyle = 'white';
            c.ctx.font = '30px Times New Roman';
            c.ctx.fillText('Start', this.x + 10, this.y + this.height - 10);
        }

        clicked(){
            alert('type!');
            this.delete(this);

            g.draw();
        }

        delete(self){
            let index = g.objects.buttons.indexOf(self);
            g.objects.buttons.splice(index, 1);
        }
    }

    window.StartButton = StartButton;
})();