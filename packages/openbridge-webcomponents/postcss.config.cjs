const path = require('path');

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

// Split the params by space and equal sign
// style=primary wrapperClass=wrapperClass => { style: "primary",  wrapperClass: "wrapperClass" }
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

// use mixin @mixin style=normal visibleWrapperClass=.visibleWrapperClass noClick"
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
    [focusVisibleWrapper]: {
      'outline-color': 'var(--border-focus-color)',
      'outline-width': 'var(--global-size-spacing-border-weight-focusframe)',
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

module.exports = (ctx) => ({
  parser: ctx.parser ? 'sugarss' : false,
  map: ctx.env === 'development' ? ctx.map : false,
  plugins: {
    'postcss-mixins': {
      mixinsDir: path.join(__dirname, 'src', 'mixins'),
      mixins: {
        style: styleMixin,
      },
    },
    'postcss-nesting': {},
  },
});
