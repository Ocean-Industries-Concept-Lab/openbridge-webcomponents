import{defineComponent as a,reactive as u,useSlots as d,withDirectives as m,openBlock as v,createBlock as _,h}from"vue";import{assignSlotNodes as B}from"@lit-labs/vue-utils/wrapper-utils.js";import"@oicl/openbridge-webcomponents/dist/icons/icon-01-off.js";const k=a({__name:"Obi01Off",props:{useCssColor:{type:Boolean}},setup(p){const o=p,n=u({}),i={created(t){for(const e in o)n[e]=t[e]}};let r=!1;const l=d(),f=()=>{const e={};for(const s in o){const c=o[s];(c!==void 0||r)&&(e[s]=c??n[s])}return r=!0,h("obi-01-off",e,B(l))};return(t,e)=>m((v(),_(f,null,null,512)),[[i]])}});export{k as default};
//# sourceMappingURL=Obi01Off.vue2.js.map
