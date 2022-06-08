import {throwIfNotInRange} from "./utils";

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
    throwIfNotInRange(lightness, Number.MAX_VALUE, 'lightness');
    throwIfNotInRange(alpha, 1, 'alpha');
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
    throwIfNotInRange(lightness, Number.MAX_VALUE, 'lightness');
    throwIfNotInRange(chroma, Number.MAX_VALUE, 'chroma');
    throwIfNotInRange(hue, 360, 'hue');
    throwIfNotInRange(alpha, 1, 'alpha');
  };
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
    throwIfNotInRange(red, 1, 'red');
    throwIfNotInRange(green, 1, 'green');
    throwIfNotInRange(blue, 1, 'blue');
    throwIfNotInRange(alpha, 1, 'alpha');
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