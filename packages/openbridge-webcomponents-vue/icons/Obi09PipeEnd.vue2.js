import{defineComponent as u,reactive as d,useSlots as f,withDirectives as m,openBlock as v,createBlock as _,h}from"vue";import{assignSlotNodes as P}from"@lit-labs/vue-utils/wrapper-utils.js";import"@oicl/openbridge-webcomponents/dist/icons/icon-09-pipe-end.js";const k=u({__name:"Obi09PipeEnd",props:{useCssColor:{type:Boolean}},setup(p){const o=p,n=d({}),i={created(t){for(const e in o)n[e]=t[e]}};let r=!1;const l=f(),a=()=>{const e={};for(const s in o){const c=o[s];(c!==void 0||r)&&(e[s]=c??n[s])}return r=!0,h("obi-09-pipe-end",e,P(l))};return(t,e)=>m((v(),_(a,null,null,512)),[[i]])}});export{k as default};
//# sourceMappingURL=Obi09PipeEnd.vue2.js.map
