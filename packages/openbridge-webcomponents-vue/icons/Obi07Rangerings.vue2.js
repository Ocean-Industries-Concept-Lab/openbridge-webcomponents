import{defineComponent as u,reactive as f,useSlots as d,withDirectives as m,openBlock as v,createBlock as _,h as g}from"vue";import{assignSlotNodes as h}from"@lit-labs/vue-utils/wrapper-utils.js";import"@oicl/openbridge-webcomponents/dist/icons/icon-07-rangerings.js";const b=u({__name:"Obi07Rangerings",props:{useCssColor:{type:Boolean}},setup(i){const o=i,n=f({}),p={created(t){for(const e in o)n[e]=t[e]}};let r=!1;const a=d(),l=()=>{const e={};for(const s in o){const c=o[s];(c!==void 0||r)&&(e[s]=c??n[s])}return r=!0,g("obi-07-rangerings",e,h(a))};return(t,e)=>m((v(),_(l,null,null,512)),[[p]])}});export{b as default};
//# sourceMappingURL=Obi07Rangerings.vue2.js.map
