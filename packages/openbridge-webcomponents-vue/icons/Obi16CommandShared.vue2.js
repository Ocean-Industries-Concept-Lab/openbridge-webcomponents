import{defineComponent as d,reactive as u,useSlots as m,withDirectives as f,openBlock as v,createBlock as h,h as _}from"vue";import{assignSlotNodes as C}from"@lit-labs/vue-utils/wrapper-utils.js";import"@oicl/openbridge-webcomponents/dist/icons/icon-16-command-shared.js";const b=d({__name:"Obi16CommandShared",props:{useCssColor:{type:Boolean}},setup(a){const o=a,n=u({}),p={created(t){for(const e in o)n[e]=t[e]}};let r=!1;const i=m(),l=()=>{const e={};for(const s in o){const c=o[s];(c!==void 0||r)&&(e[s]=c??n[s])}return r=!0,_("obi-16-command-shared",e,C(i))};return(t,e)=>f((v(),h(l,null,null,512)),[[p]])}});export{b as default};
//# sourceMappingURL=Obi16CommandShared.vue2.js.map
