import type { OutputOptions, SourceMap } from 'rollup';

interface AssetInfo {
  fileName: string;
  name?: string;
  needsCodeReference: boolean;
  source: string | Uint8Array;
  type: 'asset';
}

interface ChunkInfo {
  code: string;
  dynamicImports: string[];
  exports: string[];
  facadeModuleId: string | null;
  fileName: string;
  implicitlyLoadedBefore: string[];
  imports: string[];
  importedBindings: { [imported: string]: string[] };
  isDynamicEntry: boolean;
  isEntry: boolean;
  isImplicitEntry: boolean;
  map: SourceMap | null;
  modules: {
    [id: string]: {
      renderedExports: string[];
      removedExports: string[];
      renderedLength: number;
      originalLength: number;
      code: string | null;
    };
  };
  moduleIds: string[];
  name: string;
  preliminaryFileName: string;
  referencedFiles: string[];
  type: 'chunk';
}

interface PluginOptions {
  banner?: string;
  footer?: string;
}

function bannerInjection(pluginOptions: PluginOptions) {
  const name = 'banner-injection';

  return {
    name,
    enforce: 'post',
    generateBundle(options: OutputOptions, bundle: { [fileName: string]: AssetInfo | ChunkInfo }) {
      const banner = pluginOptions.banner || options.banner || '';
      const footer = pluginOptions.footer || options.footer || '';

      for (const module of Object.values(bundle)) {
        if (module.type === 'chunk') {
          module.code = banner + module.code + footer;
        }
      }
    },
  };
}

export default bannerInjection;
