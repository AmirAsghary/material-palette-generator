import {generateAccentPalette, generateDarkPalette, generateLightPalette, RGBColor} from "../src/index";

const eightDigitsHex = '#32CD3266';
const sixDigitsHex = '#ce1b1b';
const threeDigitsHex = '#ce1';
const hexWithoutPound = 'ce1b1b';
const rgbColor = new RGBColor(0.4, 0.6, 0.2);

function generatorTestBuilder(name: string, generator: CallableFunction) {
  describe(name, () => {
    it('Length is 10', () => {
      expect(generator(sixDigitsHex)).toHaveLength(10);
    });
    it('Accepts 3 digit hex', () => {
      expect(generator(threeDigitsHex)).toBeTruthy();
    });
    it('Accepts hex without the # symbol', () => {
      expect(generator(hexWithoutPound)).toBeTruthy();
    });
    it('Accepts 8 digit hex', () => {
      expect(generator(eightDigitsHex)).toBeTruthy();
    });
    it('Accepts RGBColor', () => {
      expect(generator(rgbColor)).toBeTruthy();
    });
  });
}

const generatorTests: [string, CallableFunction][] = [
  [
    'Generate accent palette',
    generateAccentPalette
  ],
  [
    'Generate light palette',
    generateLightPalette
  ],
  [
    'Generate dark palette',
    generateDarkPalette
  ]
];

generatorTests.forEach(item => generatorTestBuilder(...item));