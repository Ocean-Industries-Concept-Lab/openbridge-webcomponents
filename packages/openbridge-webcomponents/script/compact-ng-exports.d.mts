export interface NgPackageJson {
  exports?: Record<string, unknown>;
  [field: string]: unknown;
}

export function compactNgExports<T extends NgPackageJson>(
  packageJson: T
): {packageJson: T; collapsed: number};
