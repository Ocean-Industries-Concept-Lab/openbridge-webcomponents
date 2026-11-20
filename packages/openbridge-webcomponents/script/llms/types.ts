/**
 * Shapes shared by the llms.txt generator
 *
 * The manifest slice is what `generate-llms-txt.ts` reads from
 * `custom-elements.json`; it names only the fields the output uses.
 */
export type Lifecycle = 'stable' | 'beta' | 'experimental' | 'deprecated';

export type FamilyId =
  | 'components'
  | 'navigation-instruments'
  | 'bars-graphs'
  | 'building-blocks'
  | 'automation'
  | 'ar'
  | 'integration-systems'
  | 'pages';

export interface Family {
  id: FamilyId;
  title: string;
}

export interface ManifestType {
  text?: string;
}

export interface ManifestMember {
  kind?: string;
  name: string;
  description?: string;
  type?: ManifestType;
  default?: string;
  static?: boolean;
  privacy?: 'public' | 'private' | 'protected';
  inheritedFrom?: {name?: string};
}

export interface ManifestAttribute {
  name: string;
  fieldName?: string;
  description?: string;
  type?: ManifestType;
  default?: string;
}

export interface ManifestEvent {
  name: string;
  description?: string;
  type?: ManifestType;
}

export interface ManifestNamed {
  name: string;
  description?: string;
}

export interface ManifestDeclaration {
  kind: string;
  name?: string;
  tagName?: string;
  description?: string;
  summary?: string;
  lifecycle?: Lifecycle;
  deprecated?: string | boolean;
  members?: ManifestMember[];
  attributes?: ManifestAttribute[];
  events?: ManifestEvent[];
  slots?: ManifestNamed[];
  cssParts?: ManifestNamed[];
  cssProperties?: ManifestNamed[];
}

export interface ManifestModule {
  path: string;
  summary?: string;
  description?: string;
  declarations?: ManifestDeclaration[];
}

export interface Manifest {
  modules: ManifestModule[];
}

export interface ComponentEntry {
  tag: string;
  className: string;
  modulePath: string;
  family: FamilyId;
  summary: string | undefined;
  lifecycle: Lifecycle | undefined;
  deprecatedNote: string | undefined;
  description: string;
  declaration: ManifestDeclaration;
}
