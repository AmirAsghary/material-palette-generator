import {ACCURACY} from './variables.js';

const checkRange = (value, maxValue, label) => {
  if (isNaN(value) || 0 > value || value > maxValue)
    throw new RangeError(value + ' for ' + label + ' is not between 0 and ' + maxValue);
};

export class LABColor {
  constructor(lightness, a, b, alpha = 1) {
    this.lightness = lightness;
    this.a = a;
    this.b = b;
    this.alpha = alpha;
    checkRange(lightness, Number.MAX_VALUE, 'lightness');
    checkRange(alpha, 1, 'alpha');
  }

  // equals() is never be called
  equals(a) {
    return (
      1e-4 > Math.abs(this.lightness - a.lightness) &&
      1e-4 > Math.abs(this.a - a.a) &&
      1e-4 > Math.abs(this.b - a.b) &&
      Math.abs(this.alpha - a.alpha) < ACCURACY
    );
  }
}

export class LCHColor {
  constructor(lightness, chroma, hue, alpha = 1) {
    this.lightness = lightness;
    this.chroma = chroma;
    this.hue = hue;
    this.alpha = alpha;
    checkRange(lightness, Number.MAX_VALUE, 'lightness');
    checkRange(chroma, Number.MAX_VALUE, 'chroma');
    checkRange(hue, 360, 'hue');
    checkRange(alpha, 1, 'alpha');
  };

  // equals() is never be called
  equals(a) {
    return (
      1e-4 > Math.abs(this.lightness - a.lightness) &&
      1e-4 > Math.abs(this.chroma - a.chroma) &&
      1e-4 > Math.abs(this.hue - a.hue) &&
      Math.abs(this.alpha - a.alpha) < ACCURACY
    );
  }
}

export class RGBColor {
  constructor(red, green, blue, alpha = 1) {
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.alpha = alpha;
    checkRange(red, 1, 'red');
    checkRange(green, 1, 'green');
    checkRange(blue, 1, 'blue');
    checkRange(alpha, 1, 'alpha');
  }

  equals(rgbColor) {
    return (
      Math.abs(this.red - rgbColor.red) < ACCURACY &&
      Math.abs(this.green - rgbColor.green) < ACCURACY &&
      Math.abs(this.blue - rgbColor.blue) < ACCURACY &&
      Math.abs(this.alpha - rgbColor.alpha) < ACCURACY
    );
  }
}