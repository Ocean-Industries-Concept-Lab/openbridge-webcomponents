import{defineComponent as u,reactive as f,useSlots as d,withDirectives as m,openBlock as v,createBlock as _,h}from"vue";import{assignSlotNodes as g}from"@lit-labs/vue-utils/wrapper-utils.js";import"@oicl/openbridge-webcomponents/dist/icons/icon-12-sog.js";const S=u({__name:"Obi12Sog",props:{useCssColor:{type:Boolean}},setup(p){const e=p,n=f({}),i={created(t){for(const o in e)n[o]=t[o]}};let r=!1;const l=d(),a=()=>{const o={};for(const s in e){const c=e[s];(c!==void 0||r)&&(o[s]=c??n[s])}return r=!0,h("obi-12-sog",o,g(l))};return(t,o)=>m((v(),_(a,null,null,512)),[[i]])}});export{S as default};
//# sourceMappingURL=Obi12Sog.vue2.js.map
