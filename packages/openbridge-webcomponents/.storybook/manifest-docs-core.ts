import type {ArgTypesEnhancer, StrictArgTypes} from 'storybook/internal/types';

export type Member = {name: string; availableWhenIf?: Record<string, unknown>};
export type Declaration = {
  kind: string;
  name?: string;
  tagName?: string;
  description?: string;
  members?: Member[];
};
export type Manifest = {
  modules: Array<{
    path: string;
    description?: string;
    declarations?: Declaration[];
  }>;
};

export function createManifestDocs(manifest: Manifest) {
  const declarations = () =>
    manifest.modules.flatMap((m) => m.declarations ?? []);
  const moduleDocs = (pathSuffix: string): string =>
    manifest.modules.find((m) => m.path.endsWith(pathSuffix))?.description ??
    '';
  const classDocs = (className: string): string =>
    declarations().find((d) => d.name === className)?.description ?? '';
  const availableWhenEnhancer: ArgTypesEnhancer = (context) => {
    const tag =
      typeof context.component === 'string' ? context.component : undefined;
    const decl = tag
      ? declarations().find((d) => d.tagName === tag)
      : undefined;
    if (!decl?.members) return context.argTypes;
    const out: StrictArgTypes = {...context.argTypes};
    for (const m of decl.members) {
      const existing = out[m.name];
      if (!m.availableWhenIf || !existing || existing.if) continue;
      out[m.name] = {
        ...existing,
        if: m.availableWhenIf as StrictArgTypes[string]['if'],
      };
    }
    return out;
  };
  return {moduleDocs, classDocs, availableWhenEnhancer};
}
