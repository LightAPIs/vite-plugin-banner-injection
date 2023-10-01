# vite-plugin-banner-injection

## Installation

```shell
npm install vite-plugin-banner-injection -D
```

## Usage

in `vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import BannerInjection from 'vite-plugin-banner-injection';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        banner: 'banner content',
        footer: 'footer contnet',
      },
    },
  },
  plugins: [BannerInjection()],
});
```

or 

```typescript
import { defineConfig } from 'vite';
import BannerInjection from 'vite-plugin-banner-injection';

export default defineConfig({
  plugins: [
    BannerInjection({
      banner: 'banner content',
      footer: 'footer contnet',
    }),
  ],
});
```

## License

[MIT](./LICENSE)
