import{defineComponent as u,reactive as f,useSlots as d,withDirectives as m,openBlock as v,createBlock as _,h}from"vue";import{assignSlotNodes as P}from"@lit-labs/vue-utils/wrapper-utils.js";import"@oicl/openbridge-webcomponents/dist/icons/icon-02-set-point.js";const b=u({__name:"Obi02SetPoint",props:{useCssColor:{type:Boolean}},setup(i){const o=i,n=f({}),p={created(t){for(const e in o)n[e]=t[e]}};let r=!1;const l=d(),a=()=>{const e={};for(const s in o){const c=o[s];(c!==void 0||r)&&(e[s]=c??n[s])}return r=!0,h("obi-02-set-point",e,P(l))};return(t,e)=>m((v(),_(a,null,null,512)),[[p]])}});export{b as default};
//# sourceMappingURL=Obi02SetPoint.vue2.js.map
