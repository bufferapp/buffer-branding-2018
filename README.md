# Quick start

```bash
npm install
npm run dev
```

## Production mode
```
npm start
```

Open your browser to [http://localhost:8080](http://localhost:8080)

# Browser-sync

If you want to develop with browser sync pass your site name to a bash variable
```bash
site=[site url here] npm run dev
```

[Check out our front-end guide](frontendguide.md)

# SVG Sprite usage

Simply add an svg icon to the icons folder and it will get added to the svg sprite (symbol-defs.svg). Note: if an svg is malformed it will break the sprite. We're using [svg-sprite-generator](https://github.com/frexy/svg-sprite-generator) to generate the sprite.

## Sprite usage:
```html
<svg class="team__chevron">
  <use xlink:href="/dist/symbol-defs.svg#chevron-down"></use>
</svg>
```

# Retina Display
If you'd like to send high-density images to high-density displays like Retina displays and normal-density images to normal-density displays, the correct responsive image syntax is

```html
<img srcset="cat.jpg, cat-hd.jpg 2x, cat-ultra-hd.jpg 3x alt="Cat">
```

Note: the picturefill package will polyfill this browser feature in IE11.