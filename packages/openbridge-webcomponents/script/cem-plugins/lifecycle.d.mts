import type {Plugin} from '@custom-elements-manifest/analyzer';

/** The class JSDoc tag `component-lifecycle-tag` enforces, as the manifest carries it. */
export type Lifecycle = 'stable' | 'beta' | 'experimental' | 'deprecated';

export function lifecyclePlugin(): Plugin;
