import{defineComponent as u,reactive as f,useSlots as v,withDirectives as d,openBlock as m,createBlock as _,h}from"vue";import{assignSlotNodes as B}from"@lit-labs/vue-utils/wrapper-utils.js";import"@oicl/openbridge-webcomponents/dist/icons/icon-19-wave.js";const k=u({__name:"Obi19Wave",props:{useCssColor:{type:Boolean}},setup(p){const o=p,n=f({}),a={created(t){for(const e in o)n[e]=t[e]}};let r=!1;const i=v(),l=()=>{const e={};for(const s in o){const c=o[s];(c!==void 0||r)&&(e[s]=c??n[s])}return r=!0,h("obi-19-wave",e,B(i))};return(t,e)=>d((m(),_(l,null,null,512)),[[a]])}});export{k as default};
//# sourceMappingURL=Obi19Wave.vue2.js.map
