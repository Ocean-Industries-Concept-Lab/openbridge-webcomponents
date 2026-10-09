import type {AcceptedPlugin} from 'postcss';

/** The PostCSS setup, as a function of the context PostCSS passes it. */
declare const config: (ctx: {
  parser?: unknown;
  env?: string;
  map?: unknown;
}) => {
  parser: string | false;
  map: unknown;
  plugins: AcceptedPlugin[];
};
export default config;
