import path from 'path';
import postcssMixins from 'postcss-mixins';
import postcssNesting from 'postcss-nesting';
import postcssImport from 'postcss-import';

function colors({
  style,
  state,
  psudoClass,
  className,
  visibleWrapperClass,
  otherParameters,
}) {
  let selector = '&';
  if (psudoClass != null) {
    selector += `:${psudoClass}`;
  }
  if (className) {
    selector = `${selector}.${className}`;
  }
  if (visibleWrapperClass) {
    selector = `${selector} ${visibleWrapperClass}`;
  }
  if (state === 'hover') {
    return {
      [selector]: {
        'border-color': `color-mix(in srgb, var(--${style}-hover-border-color) calc(var(--obc-can-hover) * 100%), var(--base-border-color))`,
        'background-color': `color-mix(in srgb, var(--${style}-hover-background-color) calc(var(--obc-can-hover) * 100%), var(--base-background-color))`,
        ...otherParameters,
      },
    };
  } else {
    let extraParameters = {};
    if (['enabled', 'activated'].includes(state)) {
      extraParameters = {
        '--base-border-color': `var(--${style}-${state}-border-color)`,
        '--base-background-color': `var(--${style}-${state}-background-color)`,
      };
    }

    return {
      [selector]: {
        'border-color': `var(--${style}-${state}-border-color)`,
        'background-color': `var(--${style}-${state}-background-color)`,
        ...otherParameters,
        ...extraParameters,
      },
    };
  }
}

function parseParams(params) {
  const paramsNoNewLine = params.replaceAll('\n', '');
  const paramsArray = paramsNoNewLine.split(' ');
  const paramsObject = {};
  paramsArray.forEach((param) => {
    const [key, value] = param.split('=');
    paramsObject[key] = value || true;
  });
  if (!paramsObject.style) {
    throw new Error('style is required');
  }
  return {
    style: paramsObject.style,
    visibleWrapperClass: paramsObject.visibleWrapperClass,
    noClick: paramsObject.noClick,
  };
}

const styleMixin = (data) => {
  const params = parseParams(data.params);

  if (params.noClick) {
    return colors({
      ...params,
      style: params.style,
      state: 'enabled',
      otherParameters: {
        'border-width': '1px',
        'border-style': 'solid',
      },
    });
  }

  let focusVisibleWrapper = '&:focus-visible';
  if (params.visibleWrapperClass) {
    focusVisibleWrapper = `${focusVisibleWrapper} ${params.visibleWrapperClass}`;
  }

  const isIntegration = params.style.startsWith('integration-');
  let disabledColor = `var(--on-${params.style}-disabled-color)`;
  if (isIntegration) {
    const styleWithoutIntegration = params.style.replace('integration-', '');
    disabledColor = `var(--integration-on-${styleWithoutIntegration}-disabled-color)`;
  }

  const out = {
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
    ...colors({
      ...params,
      style: params.style,
      state: 'activated',
      className: 'activated',
    }),
    '@media (hover:hover)': {
      ...colors({
        ...params,
        style: params.style,
        state: 'hover',
        psudoClass: 'hover',
      }),
    },
    ...colors({
      ...params,
      style: params.style,
      state: 'pressed',
      psudoClass: 'active',
    }),
    [focusVisibleWrapper]: {
      'outline-color': 'var(--border-focus-color)',
      'outline-width': 'var(--global-size-spacing-border-weight-focusframe)',
      'outline-style': 'solid',
      'border-color': 'var(--container-global-color)',
      'z-index': '1',
    },
    ...colors({
      ...params,
      style: params.style,
      state: 'disabled',
      psudoClass: 'disabled',
      otherParameters: {
        cursor: 'not-allowed',
        color: disabledColor + ' !important',
      },
    }),
    ...colors({
      ...params,
      style: params.style,
      state: 'disabled',
      className: 'disabled',
      otherParameters: {
        cursor: 'not-allowed',
        color: disabledColor + ' !important',
      },
    }),
  };
  if (params.visibleWrapperClass) {
    out['&:disabled'] = {
      cursor: 'not-allowed',
    };
    out['&.disabled'] = {
      cursor: 'not-allowed',
    };
  }
  return out;
};

export default (ctx) => ({
  parser: ctx.parser ? 'sugarss' : false,
  map: ctx.env === 'development' ? ctx.map : false,
  plugins: [
    postcssImport(),
    postcssMixins({
      mixinsDir: path.join(process.cwd(), 'src', 'mixins'),
      mixins: {
        style: styleMixin,
      },
    }),
    postcssNesting(),
    {
      postcssPlugin: 'append-global-styles',
      Once(root) {
        root.prepend(`
          * {
            -webkit-tap-highlight-color: transparent;
          }
        `);
      },
    },
  ],
});
