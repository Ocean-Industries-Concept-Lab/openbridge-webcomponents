import{defineComponent as u,reactive as f,useSlots as d,withDirectives as m,openBlock as v,createBlock as h,h as _}from"vue";import{assignSlotNodes as B}from"@lit-labs/vue-utils/wrapper-utils.js";import"@oicl/openbridge-webcomponents/dist/icons/icon-18-ais-anchor.js";const k=u({__name:"Obi18AisAnchor",props:{useCssColor:{type:Boolean}},setup(i){const e=i,n=f({}),p={created(t){for(const o in e)n[o]=t[o]}};let r=!1;const a=d(),l=()=>{const o={};for(const s in e){const c=e[s];(c!==void 0||r)&&(o[s]=c??n[s])}return r=!0,_("obi-18-ais-anchor",o,B(a))};return(t,o)=>m((v(),h(l,null,null,512)),[[p]])}});export{k as default};
//# sourceMappingURL=Obi18AisAnchor.vue2.js.map
