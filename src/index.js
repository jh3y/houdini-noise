import { GUI } from 'https://cdn.skypack.dev/dat.gui'
;(async function () {
  if (CSS['paintWorklet'] === undefined) {
    console.info('IMporting')
    await import(
      'https://unpkg.com/css-paint-polyfill/dist/css-paint-polyfill.js'
    )
  }

  CSS.registerProperty({
    name: '--noise',
    syntax: '<number>',
    inherits: false,
    initialValue: 0,
  })

  CSS.registerProperty({
    name: '--noise-cell-size',
    syntax: '<number>',
    inherits: false,
    initialValue: 2,
  })

  CSS.paintWorklet.addModule(`/worklet.js`)

  const CONFIG = {
    SIZE: 2,
    HUE_LOWER: 0,
    HUE_UPPER: 360,
    SATURATION_LOWER: 0,
    SATURATION_UPPER: 100,
    LIGHTNESS_LOWER: 0,
    LIGHTNESS_UPPER: 100,
  }
  const WAND = document.querySelector('.wand')

  const UPDATE = () => {
    WAND.style.setProperty('--noise-cell-size', CONFIG.SIZE)
    WAND.style.setProperty(
      '--noise-hue',
      `${CONFIG.HUE_LOWER} ${CONFIG.HUE_UPPER}`
    )
    WAND.style.setProperty(
      '--noise-saturation',
      `${CONFIG.SATURATION_LOWER} ${CONFIG.SATURATION_UPPER}`
    )
    WAND.style.setProperty(
      '--noise-lightness',
      `${CONFIG.LIGHTNESS_LOWER} ${CONFIG.LIGHTNESS_UPPER}`
    )
  }

  const CONTROLLER = new GUI()
  CONTROLLER.add(CONFIG, 'SIZE', 1, 20, 1).name('Cell size').onChange(UPDATE)
  const HUE = CONTROLLER.addFolder('Hue')
  HUE.add(CONFIG, 'HUE_LOWER', 0, 360, 1).name('Lower').onChange(UPDATE)
  HUE.add(CONFIG, 'HUE_UPPER', 0, 360, 1).name('Upper').onChange(UPDATE)
  const SAT = CONTROLLER.addFolder('Saturation')
  SAT.add(CONFIG, 'SATURATION_LOWER', 0, 100, 1).name('Lower').onChange(UPDATE)
  SAT.add(CONFIG, 'SATURATION_UPPER', 0, 100, 1).name('Upper').onChange(UPDATE)
  const LIG = CONTROLLER.addFolder('Lightness')
  LIG.add(CONFIG, 'LIGHTNESS_LOWER', 0, 100, 1).name('Lower').onChange(UPDATE)
  LIG.add(CONFIG, 'LIGHTNESS_UPPER', 0, 100, 1).name('Upper').onChange(UPDATE)
})()
