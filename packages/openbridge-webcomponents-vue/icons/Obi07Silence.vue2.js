import{defineComponent as u,reactive as f,useSlots as d,withDirectives as m,openBlock as v,createBlock as _,h}from"vue";import{assignSlotNodes as B}from"@lit-labs/vue-utils/wrapper-utils.js";import"@oicl/openbridge-webcomponents/dist/icons/icon-07-silence.js";const b=u({__name:"Obi07Silence",props:{useCssColor:{type:Boolean}},setup(i){const o=i,n=f({}),l={created(t){for(const e in o)n[e]=t[e]}};let r=!1;const p=d(),a=()=>{const e={};for(const s in o){const c=o[s];(c!==void 0||r)&&(e[s]=c??n[s])}return r=!0,h("obi-07-silence",e,B(p))};return(t,e)=>m((v(),_(a,null,null,512)),[[l]])}});export{b as default};
//# sourceMappingURL=Obi07Silence.vue2.js.map
