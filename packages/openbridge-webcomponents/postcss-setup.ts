import path from 'path';
import {Plugin} from 'postcss';
import postCssMixin from 'postcss-mixins';
import postCssNesting from 'postcss-nesting';

function colors({
  style,
  state,
  psudoClass,
  visibleWrapperClass,
  otherParameters,
}: {
  style: string;
  state: string;
  psudoClass?: string;
  visibleWrapperClass?: string;
  otherParameters?: Record<string, string>;
}) {
  let selector = '&';
  if (psudoClass != null) {
    selector += `:${psudoClass}`;
  }
  if (visibleWrapperClass) {
    selector = `${selector} ${visibleWrapperClass}`;
  }
  return {
    [selector]: {
      'border-color': `var(--${style}-${state}-border-color)`,
      'background-color': `var(--${style}-${state}-background-color)`,
      ...otherParameters,
    },
  };
}

// Split the params by space and equal sign
// style=primary wrapperClass=wrapperClass => { style: "primary",  wrapperClass: "wrapperClass" }
function parseParams(params: string): {
  style: string;
  visibleWrapperClass?: string;
} {
  const paramsArray = params.split(' ');
  const paramsObject: Record<string, string> = {};
  paramsArray.forEach((param) => {
    const [key, value] = param.split('=');
    if (value === undefined) return;
    paramsObject[key] = value;
  });
  if (!paramsObject.style) {
    throw new Error('style is required');
  }
  return {
    style: paramsObject.style,
    visibleWrapperClass: paramsObject.visibleWrapperClass,
  };
}

// use mixin @mixin style=normal visibleWrapperClass=.visibleWrapperClass"
const styleMixin = (data) => {
  const params = parseParams(data.params);

  let focusVisibleWrapper = '&:focus-visible';
  if (params.visibleWrapperClass) {
    focusVisibleWrapper = `${focusVisibleWrapper} ${params.visibleWrapperClass}`;
  }

  const result = {
    '&': {
      cursor: 'pointer',
    },
    '&:focus': {
      outline: 'none',
    },
    ...colors({
      ...params,
      style: params.style,
      state: 'enabled',
      otherParameters: {
        'border-width': '1px',
        'border-style': 'solid',
        cursor: 'pointer',
      },
    }),
    [focusVisibleWrapper]: {
      'outline-color': 'hsla(211, 100%, 44%, 0.3)',
      'outline-width': '4px',
      'outline-style': 'solid',
    },
    ...colors({
      ...params,
      style: params.style,
      state: 'hover',
      psudoClass: 'hover',
    }),
    ...colors({
      ...params,
      style: params.style,
      state: 'pressed',
      psudoClass: 'active',
    }),
    ...colors({
      ...params,
      style: params.style,
      state: 'disabled',
      psudoClass: 'disabled',
      otherParameters: {
        cursor: 'not-allowed',
        color: `var(--on-${params.style}-disabled-color)`,
      },
    }),
  };
  return result;
};

const currentDir = process.cwd();

export const plugins: Plugin[] = [
  postCssMixin({
    mixinsDir: path.join(currentDir, 'src', 'mixins'),
    mixins: {
      style: styleMixin,
    },
  }),
  postCssNesting(),
];
