export function parseNumberInput(display: string): number {
  const trimmed = display.trim();
  if (trimmed === '' || trimmed === '-' || trimmed === '+') {
    return NaN;
  }

  const normalized = trimmed.replace(',', '.');

  const n = Number(normalized);
  return Number.isFinite(n) ? n : NaN;
}

export function formatNumberForDisplay(value: number): string {
  if (Number.isNaN(value)) {
    return '';
  }
  return String(value);
}

export function valuesEqual(a: number, b: number): boolean {
  return Object.is(a, b);
}
