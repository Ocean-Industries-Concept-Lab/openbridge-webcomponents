export function icon2element(
  icon: string,
  { slot, useCssColor }: { slot?: string; useCssColor?: boolean }
): string {
  icon = 'obi-' + icon
  if (!slot) {
    return `<${icon} ${useCssColor ? 'useCssColor' : ''}></${icon}>`
  }
  return `<${icon} slot="${slot}"></${icon}>`
}
