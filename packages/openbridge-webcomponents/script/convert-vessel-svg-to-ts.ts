import * as fs from 'fs';
import * as path from 'path';

type ColorMapping = ReadonlyArray<{
  from: RegExp;
  to: string;
}>;

const COLOR_MAPPINGS: ColorMapping = [
  {
    from: /(fill|stroke)="#8E8E8E"/gi,
    to: '$1="var(--instrument-tick-mark-secondary-color)"',
  },
  {
    from: /(fill|stroke)="white"/gi,
    to: '$1="var(--instrument-frame-primary-color)"',
  },
  {
    from: /(fill|stroke)="#F0F0F0"/gi,
    to: '$1="var(--instrument-frame-secondary-color)"',
  },
  {
    from: /(fill|stroke)="#F7F7F7"/gi,
    to: '$1="var(--container-background-color)"',
  },
];

function ensureVectorEffectOnStrokes(svg: string): string {
  return svg.replaceAll(
    /<([a-zA-Z][\w:-]*)([^>]*?)\sstroke="([^"]+)"([^>]*?)\/?>/g,
    (
      full,
      tagName: string,
      beforeStroke: string,
      strokeValue: string,
      after: string
    ) => {
      const attrs = `${beforeStroke} stroke="${strokeValue}"${after}`;
      if (/\svector-effect="/i.test(attrs)) {
        return full;
      }

      const tagOpen = `<${tagName}${beforeStroke} vector-effect="non-scaling-stroke" stroke="${strokeValue}"${after}`;
      return full.endsWith('/>') ? `${tagOpen}/>` : `${tagOpen}>`;
    }
  );
}

function applyColorMappings(svg: string): string {
  let out = svg;
  for (const mapping of COLOR_MAPPINGS) {
    out = out.replace(mapping.from, mapping.to);
  }
  return out;
}

function toLitSvgModule(svgContent: string): string {
  const trimmed = svgContent.trim();
  return `import {svg} from 'lit';\n\nexport default svg\`${trimmed}\n\`;\n`;
}

function parseArgs(argv: string[]) {
  const args = argv.slice(2);
  const input = args.find((a) => !a.startsWith('--'));
  const outputFlagIdx = args.findIndex((a) => a === '--out' || a === '-o');
  const output =
    outputFlagIdx >= 0
      ? args[outputFlagIdx + 1]
      : input
        ? input.replace(/\.svg$/i, '.ts')
        : undefined;
  const addVectorEffect = true;

  if (!input || !output) {
    const scriptName = path.basename(argv[1] ?? 'convert-vessel-svg-to-ts');
    console.error(
      [
        'Usage:',
        `  ${scriptName} <input.svg> --out <output.ts>`,
        '',
        'Options:',
        '  --out, -o              Output path (default: input.svg -> input.ts)',
      ].join('\n')
    );
    process.exitCode = 1;
    return null;
  }

  return {input, output, addVectorEffect};
}

function main() {
  const parsed = parseArgs(process.argv);
  if (!parsed) return;

  const svgPath = path.resolve(process.cwd(), parsed.input);
  const outPath = path.resolve(process.cwd(), parsed.output);

  const originalSvg = fs.readFileSync(svgPath, 'utf-8');
  let processed = applyColorMappings(originalSvg);
  processed = ensureVectorEffectOnStrokes(processed);

  const moduleContent = toLitSvgModule(processed);
  fs.mkdirSync(path.dirname(outPath), {recursive: true});
  fs.writeFileSync(outPath, moduleContent, 'utf-8');

  console.log(`✓ Wrote ${path.relative(process.cwd(), outPath)}`);
}

main();
