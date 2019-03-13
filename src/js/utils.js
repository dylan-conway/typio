export default class Utils{
    static newImage(src){
        let img = new Image();
        img.src = src;
        return img;
    }
}