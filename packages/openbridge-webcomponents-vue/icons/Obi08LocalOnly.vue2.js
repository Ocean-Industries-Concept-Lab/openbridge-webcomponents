import{defineComponent as u,reactive as f,useSlots as d,withDirectives as m,openBlock as v,createBlock as _,h}from"vue";import{assignSlotNodes as y}from"@lit-labs/vue-utils/wrapper-utils.js";import"@oicl/openbridge-webcomponents/dist/icons/icon-08-local-only.js";const b=u({__name:"Obi08LocalOnly",props:{useCssColor:{type:Boolean}},setup(l){const e=l,n=f({}),p={created(t){for(const o in e)n[o]=t[o]}};let r=!1;const a=d(),i=()=>{const o={};for(const s in e){const c=e[s];(c!==void 0||r)&&(o[s]=c??n[s])}return r=!0,h("obi-08-local-only",o,y(a))};return(t,o)=>m((v(),_(i,null,null,512)),[[p]])}});export{b as default};
//# sourceMappingURL=Obi08LocalOnly.vue2.js.map
