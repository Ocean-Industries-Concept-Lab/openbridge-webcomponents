import{defineComponent as u,reactive as f,useSlots as d,withDirectives as m,openBlock as v,createBlock as _,h as b}from"vue";import{assignSlotNodes as h}from"@lit-labs/vue-utils/wrapper-utils.js";import"@oicl/openbridge-webcomponents/dist/icons/icon-07-erbl.js";const k=u({__name:"Obi07Erbl",props:{useCssColor:{type:Boolean}},setup(l){const o=l,n=f({}),p={created(t){for(const e in o)n[e]=t[e]}};let r=!1;const i=d(),a=()=>{const e={};for(const s in o){const c=o[s];(c!==void 0||r)&&(e[s]=c??n[s])}return r=!0,b("obi-07-erbl",e,h(i))};return(t,e)=>m((v(),_(a,null,null,512)),[[p]])}});export{k as default};
//# sourceMappingURL=Obi07Erbl.vue2.js.map
