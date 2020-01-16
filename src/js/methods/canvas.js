export function canvasDraw(canvas, context, rawImage, height, width) {
    canvas.height = height;
    canvas.width = width;
    canvas.width = canvas.width;
    context.drawImage(rawImage, 0, 0, width, height);
}

export function canvasFlip(canvas, side, curX, curY) {
    
    if (side === 'x') {
        if (curX === 180) {
            curX = 0;
        } else {
            curX = 180;
        }
    }
    else {
        if (curY === 180) {
            curY = 0;
        } else {
            curY = 180;
        }
    }

    canvas.style.transform = 'translateY(-50%) translateX(-50%) rotateX(' + curX + 'deg) rotateY(' + curY + 'deg)'
    
    return {
        x: curX,
        y: curY
    }

}