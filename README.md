# houdini-noise

A CSS Houdini Worklet to paint HSL powered background noise.

## Getting started

### 1. Load the worklet

Using CDN is the easiest way to add the library:

```js
if ('paintWorklet' in CSS) {
  CSS.paintWorklet.addModule('https://unpkg.com/houdini-noise');
}
```

#### You can use the polyfill

To add support for all moder browsers, you can load the worklet with [css-paint-polyfill](https://github.com/GoogleChromeLabs/css-paint-polyfill) fallback.

```html
<script>
  ;(async function() {
    if (CSS['paintWorklet'] === undefined)
      await import('https://unpkg.com/css-paint-polyfill')

    CSS.paintWorklet.addModule('https://unpkg.com/houdini-noise');
  })()
</script>
```

### 2. Ready to use it in your CSS!

To use **Noise** worklet you need define some custom properties with values and add the value `paint(noise)` on `background` property.

```css
.element {
  --noise: 0; /* Entry point to animate noise */
  --noise-cell-size: 1;
  --noise-hue: 330;
  --noise-saturation: 100;
  --noise-lightness: 0 80;
  background: paint(noise);
}
```

| Property | Description | Default |
| -------- | ----------- | ------------- |
| --noise | **Hack**, use this property to animate noise. Animating the property triggers a repaint. | `0` |
| --noise-cell-size | **Cell Size**, use this to define the size of noise particles in `px` | `0` |
| --noise-hue | **Hue Range**, use this to define a set hue or a hue range | `0 0` |
| --noise-saturation | **Saturation Range**, use this to define a set saturation or a saturation range | `0 0` |
| --noise-lightness | **Lightness Range**, use this to define a set lightness or a lightness range | `0 0` |

## Development
Run it locally!

```
npm i
make develop
```

## License

MIT License

Copyright (c) 2020 jh3y