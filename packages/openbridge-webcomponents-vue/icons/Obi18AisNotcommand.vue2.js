import{defineComponent as u,reactive as m,useSlots as d,withDirectives as f,openBlock as v,createBlock as _,h}from"vue";import{assignSlotNodes as B}from"@lit-labs/vue-utils/wrapper-utils.js";import"@oicl/openbridge-webcomponents/dist/icons/icon-18-ais-notcommand.js";const k=u({__name:"Obi18AisNotcommand",props:{useCssColor:{type:Boolean}},setup(i){const e=i,n=m({}),a={created(t){for(const o in e)n[o]=t[o]}};let r=!1;const p=d(),l=()=>{const o={};for(const s in e){const c=e[s];(c!==void 0||r)&&(o[s]=c??n[s])}return r=!0,h("obi-18-ais-notcommand",o,B(p))};return(t,o)=>f((v(),_(l,null,null,512)),[[a]])}});export{k as default};
//# sourceMappingURL=Obi18AisNotcommand.vue2.js.map
