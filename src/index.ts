import type { PluginOption } from 'vite';

interface InjectionOptions {
  banner?: string;
  footer?: string;
}

function bannerInjection(pluginOptions?: InjectionOptions): PluginOption {
  const name = 'banner-injection';

  return {
    name,
    enforce: 'post',
    generateBundle(_options, bundle) {
      const banner = pluginOptions?.banner || '';
      const footer = pluginOptions?.footer || '';

      for (const module of Object.values(bundle)) {
        if (module.type === 'chunk') {
          module.code = banner + module.code + footer;
        }
      }
    },
  };
}

export default bannerInjection;
