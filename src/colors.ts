import {ACCURACY} from './variables.js';

const checkRange = (value: number, maxValue: number, label: string) => {
  if (isNaN(value) || 0 > value || value > maxValue)
    throw new RangeError(value + ' for ' + label + ' is not between 0 and ' + maxValue);
};

export class LABColor {
  lightness: number;
  a: any;
  b: any;
  alpha: number;

  constructor(lightness: number, a: any, b: any, alpha = 1) {
    this.lightness = lightness;
    this.a = a;
    this.b = b;
    this.alpha = alpha;
    checkRange(lightness, Number.MAX_VALUE, 'lightness');
    checkRange(alpha, 1, 'alpha');
  }

  // equals() is never be called
  equals(a: LABColor) {
    return (
      1e-4 > Math.abs(this.lightness - a.lightness) &&
      1e-4 > Math.abs(this.a - a.a) &&
      1e-4 > Math.abs(this.b - a.b) &&
      Math.abs(this.alpha - a.alpha) < ACCURACY
    );
  }
}

export class LCHColor {
  lightness: number;
  chroma: any;
  hue: any;
  alpha: number;

  constructor(lightness: number, chroma: any, hue: any, alpha = 1) {
    this.lightness = lightness;
    this.chroma = chroma;
    this.hue = hue;
    this.alpha = alpha;
    checkRange(lightness, Number.MAX_VALUE, 'lightness');
    checkRange(chroma, Number.MAX_VALUE, 'chroma');
    checkRange(hue, 360, 'hue');
    checkRange(alpha, 1, 'alpha');
  };

  equals(a: LCHColor) {
    return (
      1e-4 > Math.abs(this.lightness - a.lightness) &&
      1e-4 > Math.abs(this.chroma - a.chroma) &&
      1e-4 > Math.abs(this.hue - a.hue) &&
      Math.abs(this.alpha - a.alpha) < ACCURACY
    );
  }
}

export class RGBColor {
  red: number;
  green: any;
  blue: any;
  alpha: number;

  constructor(red: number, green: number, blue: number, alpha = 1) {
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.alpha = alpha;
    checkRange(red, 1, 'red');
    checkRange(green, 1, 'green');
    checkRange(blue, 1, 'blue');
    checkRange(alpha, 1, 'alpha');
  }

  equals(rgbColor: RGBColor) {
    return (
      Math.abs(this.red - rgbColor.red) < ACCURACY &&
      Math.abs(this.green - rgbColor.green) < ACCURACY &&
      Math.abs(this.blue - rgbColor.blue) < ACCURACY &&
      Math.abs(this.alpha - rgbColor.alpha) < ACCURACY
    );
  }
}

export class XYZColor {
  x: any;
  y: any
  z: any
  alpha: number;

  constructor(x: any, y: any, z: any, alpha = 1) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.alpha = alpha;
  };
}