const path = require('path');

function colors({ style, state, psudoClass, visibleWrapperClass, otherParameters }) {
    let selector = "&";
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
            ...otherParameters
        }
    }

}

// Split the params by space and equal sign
// style=primary wrapperClass=wrapperClass => { style: "primary",  wrapperClass: "wrapperClass" }
function parseParams(params) {
    const paramsArray = params.split(" ");
    const paramsObject = {};
    paramsArray.forEach((param) => {
        const [key, value] = param.split("=");
        if (value === undefined) return;
        paramsObject[key] = value;
    });
    return paramsObject;
}

// use mixin @mixin style=normal visibleWrapperClass=.visibleWrapperClass"
const styleMixin = (data) => {
    const params = parseParams(data.params);

    let focusVisibleWrapper = "&:focus-visible";
    if (params.visibleWrapperClass) {
        focusVisibleWrapper = `${focusVisibleWrapper} ${params.visibleWrapperClass}`;
    }

    const result = {
        "&:focus": {
            outline: "none",
        },
        ...colors({
            ...params, style: params.style, state: "enabled",
            otherParameters: { cursor: "pointer", "border-width": "1px", "border-style": "solid" }
        }),
        [focusVisibleWrapper]: {
            "outline-color": "hsla(211, 100%, 44%, 0.3)",
            "outline-width": "4px",
            "outline-style": "solid"
        },
        ...colors({ ...params, style: params.style, state: "hover", psudoClass: "hover" }),
        ...colors({ ...params, style: params.style, state: "pressed", psudoClass: "active" }),
        ...colors({ ...params, style: params.style, state: "disabled", psudoClass: "disabled", otherParameters: { cursor: "not-allowed" } }),

    }
    return result;
}


module.exports = (ctx) => ({
    parser: ctx.parser ? 'sugarss' : false,
    map: ctx.env === 'development' ? ctx.map : false,
    plugins: {
        "postcss-mixins":  {
            "mixinsDir": path.join(__dirname, "src", "mixins"),
            "mixins": {
                "style": styleMixin
            }
        },
        "postcss-nesting": {},
    }
  })