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
  return {
    [selector]: {
      'border-color': `var(--${style}-${state}-border-color)`,
      'background-color': `var(--${style}-${state}-background-color)`,
      ...otherParameters,
    },
  };
}

function parseParams(params) {
  const paramsArray = params.split(' ');
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
      state: 'activated',
      className: 'activated',
    }),
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
        color: `var(--on-${params.style}-disabled-color)`,
      },
    }),
    ...colors({
      ...params,
      style: params.style,
      state: 'disabled',
      className: 'disabled',
      otherParameters: {
        cursor: 'not-allowed',
        color: `var(--on-${params.style}-disabled-color)`,
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
