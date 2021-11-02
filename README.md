### About

This is small app that is able to parse a [Metro Retro](https://metroretro.io/) exported JSON, allowing the user do download a simple formatted version or copy it to clipboard.

Just a weekend project for me. :)

## Preview

https://metroretro-json-viewer.vallades.vercel.app

## Deployment

At this moment I'm using `Vercel` to deploy this app. To embed the version during Vercel's build step:

```
vercel --prod --build-env VERCEL_TAG=metroretro-json-viewer/prod-$(date +%Y%m%d).01
```

The current deployed version can be accessed via the browser's console:

```javascript
globalThis['metroretro-json-viewer'] >
  { version: 'metroretro-json-viewer/prod-20211102.01' };
```
