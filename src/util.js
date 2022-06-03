import {HSBColor, LABColor, LCHColor, RGBColor, XYZColor} from './color.js';
import {ACCURACY} from './variables';

function decimal2hex(decimal) {
    decimal = decimal.toString(16);
    return 2 <= decimal.length ? decimal : '0' + decimal;
}

function hex2decimal(hexColor) {
    if (!/^[a-fA-F0-9]+$/.test(hexColor)) throw Error('Invalid hex string: ' + hexColor);
    return parseInt(hexColor, 16);
}

function hex2rgb(hexColor) {
    let b;
    if (!/^[a-fA-F0-9]{3,8}$/.test(hexColor)) {
        throw Error('Invalid hex color string: ' + hexColor);
    }
    if (3 === hexColor.length || 4 === hexColor.length) {
        b = /^(.)(.)(.)(.)?$/
            .exec(hexColor)
            .slice(1, 5)
            .map(a => a ? a + a : 'ff');
    } else if (6 === hexColor.length || 8 === hexColor.length) {
        b = /^(..)(..)(..)(..)?$/.exec(hexColor).slice(1, 5);
        if (typeof b[3] === 'undefined') b[3] = 'ff';
    } else {
        throw Error('Invalid hex color string: ' + hexColor);
    }

    const red = hex2decimal(b[0]) / 255;
    const green = hex2decimal(b[1]) / 255;
    const blue = hex2decimal(b[2]) / 255;
    const alpha = hex2decimal(b[3]) / 255;

    return new RGBColor(red, green, blue, alpha);
}

function hsb2rgb(hsbColor) {
    const b = hsbColor.value * hsbColor.saturation;
    return hsx2rgb(hsbColor.hue, hsbColor.alpha, b, Math.max(0, hsbColor.value - b));
}

function hsx2rgb(hue, alpha, chroma, m) {
    let red = m;
    let green = m;
    let blue = m;
    const h = (hue % 360) / 60;
    const x = chroma * (1 - Math.abs((h % 2) - 1)); //second largest component of this color

    switch (Math.floor(h)) {
        case 0:
            red += chroma;
            green += x;
            break;
        case 1:
            red += x;
            green += chroma;
            break;
        case 2:
            green += chroma;
            blue += x;
            break;
        case 3:
            green += x;
            blue += chroma;
            break;
        case 4:
            red += x;
            blue += chroma;
            break;
        case 5:
            red += chroma;
            blue += x;
    }
    return new RGBColor(red, green, blue, alpha);
}

function lab2hue(a, b) {
    if (1e-4 > Math.abs(a) && 1e-4 > Math.abs(b)) return 0;
    a = (180 * Math.atan2(a, b)) / Math.PI;
    return 0 <= a ? a : a + 360;
}

function lab2lch(labColor) {
    return new LCHColor(
        labColor.lightness,
        Math.sqrt(Math.pow(labColor.a, 2) + Math.pow(labColor.b, 2)),
        (180 * Math.atan2(labColor.b, labColor.a) / Math.PI + 360) % 360,
        labColor.alpha,
    );
}

function lab2xyz(labColor) {
    let x;
    let y;
    let z;

    y = (labColor.lightness + 16) / 116;
    x = labColor.a / 500 + y;
    z = y - labColor.b / 200;

    const y2 = y ** 3;
    const x2 = x ** 3;
    const z2 = z ** 3;

    y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
    x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
    z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

    x *= 0.95047;
    y *= 1;
    z *= 1.08883;

    return new XYZColor(x, y, z, labColor.alpha);
}

function lch2lab(lchColor) {
    const hr = lchColor.hue / 360 * 2 * Math.PI;
    const a = lchColor.chroma * Math.cos(hr);
    const b = lchColor.chroma * Math.sin(hr);

    return new LABColor(lchColor.lightness, a, b, lchColor.alpha);
}

function rgb2hex(rgbColor) {
    return (
        decimal2hex(Math.round(255 * rgbColor.red)) +
        decimal2hex(Math.round(255 * rgbColor.green)) +
        decimal2hex(Math.round(255 * rgbColor.blue)) +
        (1 > rgbColor.alpha ? decimal2hex(Math.round(255 * rgbColor.alpha)) : '')
    );
}

function rgb2hsb(rgbColor) {
    const b = Math.max(rgbColor.red, rgbColor.green, rgbColor.blue);
    const c = Math.min(rgbColor.red, rgbColor.green, rgbColor.blue);
    let d = 0;
    let e = 0;

    if (b - c > ACCURACY) {
        e = (b - c) / b;
        if (b === rgbColor.red) d = (60 * (rgbColor.green - rgbColor.blue)) / (b - c);
        else if (b === rgbColor.green) d = (60 * (rgbColor.blue - rgbColor.red)) / (b - c) + 120;
        else if (b === rgbColor.blue) d = (60 * (rgbColor.red - rgbColor.green)) / (b - c) + 240;
    }

    d = Math.round(d + 360) % 360;
    return new HSBColor(d, e, b, rgbColor.alpha);
}

function rgb2lab(rgbColor) {
    const red = rgb2xyz(rgbColor.red);
    const green = rgb2xyz(rgbColor.green);
    const blue = rgb2xyz(rgbColor.blue);
    const e = 0.2126729 * red + 0.7151522 * green + 0.072175 * blue;

    return new LABColor(
        116 * xyz2lab(e) - 16,
        500 * (xyz2lab((0.4124564 * red + 0.3575761 * green + 0.1804375 * blue) / 0.95047) - xyz2lab(e)),
        200 * (xyz2lab(e) - xyz2lab((0.0193339 * red + 0.119192 * green + 0.9503041 * blue) / 1.08883)),
        rgbColor.alpha,
    );
}

function rgb2xyz(x) {
    return 0.04045 >= x ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}

function xyz2lab(t) {
    const t0 = 4 / 29;
    const t1 = 6 / 29;
    const t2 = 3 * Math.pow(t1, 2);
    const t3 = Math.pow(t1, 3);
    return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
}

function xyz2rgb(xyzColor) {
    let r;
    let g;
    let b;

    r = (xyzColor.x * 3.2404542) + (xyzColor.y * -1.5371385) + (xyzColor.z * -0.4985314);
    g = (xyzColor.x * -0.969266) + (xyzColor.y * 1.8760108) + (xyzColor.z * 0.041556);
    b = (xyzColor.x * 0.0556434) + (xyzColor.y * -0.2040259) + (xyzColor.z * 1.0572252);

    // Assume sRGB
    r = r > 0.0031308 ? 1.055 * (r ** (1.0 / 2.4)) - 0.055 : r * 12.92;
    g = g > 0.0031308 ? 1.055 * (g ** (1.0 / 2.4)) - 0.055 : g * 12.92;
    b = b > 0.0031308 ? 1.055 * (b ** (1.0 / 2.4)) - 0.055 : b * 12.92;

    r = Math.min(Math.max(0, r), 1);
    g = Math.min(Math.max(0, g), 1);
    b = Math.min(Math.max(0, b), 1);

    return new RGBColor(r, g, b, xyzColor.alpha);
}

// Function added on refactor

function hex2lab(hexColor) {
    return rgb2lab(hex2rgb(hexColor));
}

function hex2lch(hexColor) {
    return lab2lch(hex2lab(hexColor));
}

function lch2rgb(lchColor) {
    return xyz2rgb(lab2xyz(lch2lab(lchColor)));
}

// The original code includes multiple convertions ( hex => rgb => hsb => rgb ) by design
// And the color were EXPECTED to be changed/transformed after these convertions
// If we remove these code, the output would be different
function transformColor(sourceColor) {
    return hsb2rgb(rgb2hsb(hex2rgb(sourceColor)));
}

export {
    transformColor, rgb2hex, hex2lch,
    lab2hue, rgb2lab, lab2lch, lch2rgb,
    hex2lab
};