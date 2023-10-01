import type { NormalizedOutputOptions, OutputBundle } from 'rollup';

interface PluginOptions {
  banner?: string;
  footer?: string;
}

interface PluginReturnType {
  name: string;
  enforce: 'pre' | 'post';
  generateBundle: (options: NormalizedOutputOptions, bundle: OutputBundle, isWrite: boolean) => void | Promise<void>;
}

function bannerInjection(pluginOptions?: PluginOptions): PluginReturnType {
  const name = 'banner-injection';

  return {
    name,
    enforce: 'post',
    generateBundle(options, bundle) {
      const banner = pluginOptions?.banner || options.banner || '';
      const footer = pluginOptions?.footer || options.footer || '';

      for (const module of Object.values(bundle)) {
        if (module.type === 'chunk') {
          module.code = banner + module.code + footer;
        }
      }
    },
  };
}

export default bannerInjection;
