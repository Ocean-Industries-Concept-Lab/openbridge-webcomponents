import{defineComponent as u,reactive as d,useSlots as f,withDirectives as m,openBlock as v,createBlock as _,h}from"vue";import{assignSlotNodes as g}from"@lit-labs/vue-utils/wrapper-utils.js";import"@oicl/openbridge-webcomponents/dist/icons/icon-18-ais-aground.js";const b=u({__name:"Obi18AisAground",props:{useCssColor:{type:Boolean}},setup(i){const e=i,n=d({}),p={created(t){for(const o in e)n[o]=t[o]}};let r=!1;const a=f(),l=()=>{const o={};for(const s in e){const c=e[s];(c!==void 0||r)&&(o[s]=c??n[s])}return r=!0,h("obi-18-ais-aground",o,g(a))};return(t,o)=>m((v(),_(l,null,null,512)),[[p]])}});export{b as default};
//# sourceMappingURL=Obi18AisAground.vue2.js.map
