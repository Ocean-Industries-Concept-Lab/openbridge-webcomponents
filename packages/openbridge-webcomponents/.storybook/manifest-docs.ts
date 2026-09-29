import customElements from '../custom-elements.json';
import {createManifestDocs, type Manifest} from './manifest-docs-core.js';

export const {moduleDocs, classDocs, availableWhenEnhancer} =
  createManifestDocs(customElements as unknown as Manifest);
