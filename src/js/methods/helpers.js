export function calculateFitSize(editorHeight,
    editorWidth,
    imageHeight,
    imageWidth) {

    var fitHeight = imageHeight;
    var fitWidth = imageWidth;

    //scale for height
    if (imageHeight > editorHeight) {
        fitHeight = editorHeight;
        fitWidth = (fitHeight * imageWidth) / imageHeight;
    }
    //rescale for width
    if (fitWidth > editorWidth) {
        fitWidth = editorWidth;
        fitHeight = (fitWidth * imageHeight) / imageWidth;
    }

    return {
        h: fitHeight,
        w: fitWidth
    }

}

export function calculateZoomSize(positive, target, curH, curW) {
    if (positive) {
        return {
            h: curH * (1 + (10 * (target - 5) / 100)),
            w: curW * (1 + (10 * (target - 5) / 100))
        }
    }
    return {
        h: curH * (1 - (10 * (5 - target) / 100)),
        w: curW * (1 - (10 * (5 - target) / 100))
    }
}

export function shouldDrag(h, w, editorH, editorW) {
    if (h > editorH || w > editorW) {
        return true;
    } 
    return false;
}