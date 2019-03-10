export default class Letter{
    constructor(x, y, index, imgSrc){
        this.x = x;
        this.y = y;
        this.index = index;
        this.image = new Image();
        this.image.src = imgSrc;
    }

    draw(ctx){
        ctx.drawImage(this.image, this.index * CW, 0, CW, CH, this.x, this.y, CW, CH);
    }
}