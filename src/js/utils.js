export function newImage(src){
    let img = new Image();
    img.src = src;
    return img;
}

export function calculateWPM(startTime, endTime, text){
    let minutes = ((endTime - startTime) / 1000) / 60;
    return Math.round((text.length / 5) / minutes);
}