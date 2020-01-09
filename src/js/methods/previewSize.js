export function calculatePreviewSize(editorHeight,
    editorWidth,
    imageHeight,
    imageWidth) {

    var previewHeight = imageHeight;
    var previewWidth = imageWidth;

    //scale for height
    if (imageHeight > editorHeight) {
        previewHeight = editorHeight;
        previewWidth = (previewHeight * imageWidth) / imageHeight;
    }
    //rescale for width
    if (previewWidth > editorWidth) {
        previewWidth = editorWidth;
        previewHeight = (previewWidth * imageHeight) / imageWidth;
    }

    return {
        h: previewHeight,
        w: previewWidth
    }

}