export function hex_to_rgba(hex) {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const a = hex.length > 6 ? Number(Number(parseInt(hex.substring(6, 8), 16) / 255).toFixed(2)) : 1;
    return [r, g, b, a];
}

export function rgba_to_hex(rgba) {
    const r = ('0' + Math.floor(rgba[0]).toString(16)).slice(-2);
    const g = ('0' + Math.floor(rgba[1]).toString(16)).slice(-2);
    const b = ('0' + Math.floor(rgba[2]).toString(16)).slice(-2);
    const a = rgba.length > 3 ? ('0' + Math.floor(rgba[3] * 255).toString(16)).slice(-2) : 'FF';
    return '#' + r + g + b + a;
}

export function hex_to_hsv(hex) {
    const _rgba = hex_to_rgba(hex);
    const red = _rgba[0] / 255;
    const green = _rgba[1] / 255;
    const blue = _rgba[2] / 255;
    var hue = 0;
    var sat = 0;
    var val = 0;
    const min = Math.min(red, green, blue);
    const max = Math.max(red, green, blue);
    if (max !== 0) {
        sat = (max - min) / max;
    }
    val = max;
    if (red >= max && min !== max) {
        hue = 60 * ((green - blue) / (max - min));
    }
    if (green >= max && min !== max) {
        hue = 60 * (2.0 + (blue - red) / (max - min));
    }
    if (blue >= max && min !== max) {
        hue = 60 * (4.0 + (red - green) / (max - min));
    }
    hue = hue < 0 ? Math.floor(hue + 360) : Math.floor(hue);
    sat = Math.floor(sat * 100);
    val = Math.floor(val * 100);
    return [hue, sat, val, _rgba[3]];
}

export function hsv_to_hex(hsv) {
    var h = hsv[0]/360;
    var s = hsv[1]/100;
    var v = hsv[2]/100;
    var a = hsv[3];
    var r, g, b, i, f, p, q, t;
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    const rgba = [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255), a];
    return rgba_to_hex(rgba);
}