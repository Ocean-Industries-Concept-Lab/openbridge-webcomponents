import{defineComponent as u,reactive as d,useSlots as f,withDirectives as m,openBlock as v,createBlock as _,h}from"vue";import{assignSlotNodes as B}from"@lit-labs/vue-utils/wrapper-utils.js";import"@oicl/openbridge-webcomponents/dist/icons/icon-06-ecdis-simple.js";const b=u({__name:"Obi06EcdisSimple",props:{useCssColor:{type:Boolean}},setup(i){const o=i,n=d({}),p={created(s){for(const e in o)n[e]=s[e]}};let r=!1;const l=f(),a=()=>{const e={};for(const t in o){const c=o[t];(c!==void 0||r)&&(e[t]=c??n[t])}return r=!0,h("obi-06-ecdis-simple",e,B(l))};return(s,e)=>m((v(),_(a,null,null,512)),[[p]])}});export{b as default};
//# sourceMappingURL=Obi06EcdisSimple.vue2.js.map
