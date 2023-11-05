const path = require('path');

module.exports = (ctx) => ({
    parser: ctx.parser ? 'sugarss' : false,
    map: ctx.env === 'development' ? ctx.map : false,
    plugins: {
        "postcss-mixins":  {
            "mixinsDir": path.join(__dirname, "src", "mixins")
        },
        "postcss-nesting": {},
    }
  })