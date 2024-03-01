export function icon2element(icon: string, slot?: string): string {
  icon = 'obi-' + icon
  return `<${icon} slot="${slot}"></${icon}>`
}
