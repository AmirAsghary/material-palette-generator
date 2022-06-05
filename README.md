[![codecov](https://codecov.io/gh/AmirAsghary/materialifier/branch/master/graph/badge.svg?token=P2MUOEK82Z)](https://codecov.io/gh/AmirAsghary/materialifier)

# Materialifier
Generates color palettes based on the Material design color system

Usage example:
```ts
import { 
    generateAccentPalette, 
    generateDarkPalette, 
    generateLightPalette,
    RGBColor
} from 'materialifier';

// You can use colors in hex form as the base color for the palette
const colors1 = generateAccentPalette('#ce1b1b');

// ... or pass in a color in RGB form:
const colors2 = generateAccentPalette(new RGBColor(0.4, 0.6, 0.2));

// An array of 10 colors will be returned, from color-50 to color-900
```

References:
[Material Color Tool](https://material.io/resources/color/#!/?view.left=0&view.right=0)

## License
Released under the [MIT License](./LICENSE)
