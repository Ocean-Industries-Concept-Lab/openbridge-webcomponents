import{defineComponent as a,reactive as f,useSlots as d,withDirectives as m,openBlock as v,createBlock as _,h}from"vue";import{assignSlotNodes as k}from"@lit-labs/vue-utils/wrapper-utils.js";import"@oicl/openbridge-webcomponents/dist/icons/icon-04-dusk.js";const P=a({__name:"Obi04Dusk",props:{useCssColor:{type:Boolean}},setup(p){const o=p,n=f({}),i={created(t){for(const e in o)n[e]=t[e]}};let r=!1;const l=d(),u=()=>{const e={};for(const s in o){const c=o[s];(c!==void 0||r)&&(e[s]=c??n[s])}return r=!0,h("obi-04-dusk",e,k(l))};return(t,e)=>m((v(),_(u,null,null,512)),[[i]])}});export{P as default};
//# sourceMappingURL=Obi04Dusk.vue2.js.map
