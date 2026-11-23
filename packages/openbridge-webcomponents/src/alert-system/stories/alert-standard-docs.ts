/** The component's own docs, followed by the call each story of the file makes before it renders. */
export function componentDocsWithSetAlertStandardCall(
  componentDocs: string,
  alertStandardName: string
): string {
  return `${componentDocs}

Each story on this page calls \`setAlertStandard(${alertStandardName})\` before it renders. An application calls it once, before its first alert component renders.`;
}
