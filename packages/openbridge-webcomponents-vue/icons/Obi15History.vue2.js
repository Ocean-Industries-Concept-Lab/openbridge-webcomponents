import{defineComponent as u,reactive as f,useSlots as d,withDirectives as m,openBlock as v,createBlock as _,h}from"vue";import{assignSlotNodes as y}from"@lit-labs/vue-utils/wrapper-utils.js";import"@oicl/openbridge-webcomponents/dist/icons/icon-15-history.js";const b=u({__name:"Obi15History",props:{useCssColor:{type:Boolean}},setup(i){const e=i,n=f({}),p={created(t){for(const o in e)n[o]=t[o]}};let r=!1;const l=d(),a=()=>{const o={};for(const s in e){const c=e[s];(c!==void 0||r)&&(o[s]=c??n[s])}return r=!0,h("obi-15-history",o,y(l))};return(t,o)=>m((v(),_(a,null,null,512)),[[p]])}});export{b as default};
//# sourceMappingURL=Obi15History.vue2.js.map
