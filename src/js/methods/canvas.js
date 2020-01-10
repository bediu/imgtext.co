export function canvasDraw(canvas, context, rawImage, height, width) {
    canvas.height = height;
    canvas.width = width;
    canvas.width = canvas.width;
    context.drawImage(rawImage, 0, 0, width, height);
}

export function canvasDrawRealSize(canvas, context, rawImage, height, width, imageHeight, imageWidth) {

    canvas.height = height;
    canvas.width = width;
    canvas.width = canvas.width;
    context.clearRect(0, 0, width, height);
    context.drawImage(rawImage, 0, 0, imageWidth, imageHeight);

}

export function canvasDrawDrag() {}

export function canvasPrepareTransforms(context) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    var xform = svg.createSVGMatrix();
    var savedTransforms = [];
    var save = context.save;
    var restore = context.restore;
    var translate = context.translate;
    var transform = context.transform;
    var pt = svg.createSVGPoint();

    context.save = function () {
        savedTransforms.push(xform.translate(0, 0));
        return save.call(context);
    };
    context.restore = function () {
        xform = savedTransforms.pop();
        return restore.call(context);
    };
    context.translate = function (dx, dy) {
        xform = xform.translate(dx, dy);
        return translate.call(context, dx, dy);
    };
    context.transform = function (a, b, c, d, e, f) {
        var m2 = svg.createSVGMatrix();
        m2.a = a;
        m2.b = b;
        m2.c = c;
        m2.d = d;
        m2.e = e;
        m2.f = f;
        xform = xform.multiply(m2);
        return transform.call(context, a, b, c, d, e, f);
    };
    context.transformedPoint = function (x, y) {
        pt.x = x;
        pt.y = y;
        return pt.matrixTransform(xform.inverse());
    }
}
