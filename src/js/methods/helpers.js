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

//note: possible collisions due to math.random
export function new_uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }