import{defineComponent as u,reactive as f,useSlots as d,withDirectives as h,openBlock as m,createBlock as v,h as _}from"vue";import{assignSlotNodes as S}from"@lit-labs/vue-utils/wrapper-utils.js";import"@oicl/openbridge-webcomponents/dist/icons/icon-17-ship-sailship.js";const b=u({__name:"Obi17ShipSailship",props:{useCssColor:{type:Boolean}},setup(c){const o=c,n=f({}),p={created(s){for(const e in o)n[e]=s[e]}};let r=!1;const l=d(),a=()=>{const e={};for(const t in o){const i=o[t];(i!==void 0||r)&&(e[t]=i??n[t])}return r=!0,_("obi-17-ship-sailship",e,S(l))};return(s,e)=>h((m(),v(a,null,null,512)),[[p]])}});export{b as default};
//# sourceMappingURL=Obi17ShipSailship.vue2.js.map
