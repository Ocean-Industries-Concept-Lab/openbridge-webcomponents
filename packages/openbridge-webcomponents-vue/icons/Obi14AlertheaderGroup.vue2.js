import{defineComponent as u,reactive as d,useSlots as f,withDirectives as m,openBlock as v,createBlock as h,h as _}from"vue";import{assignSlotNodes as B}from"@lit-labs/vue-utils/wrapper-utils.js";import"@oicl/openbridge-webcomponents/dist/icons/icon-14-alertheader-group.js";const g=u({__name:"Obi14AlertheaderGroup",props:{useCssColor:{type:Boolean}},setup(p){const o=p,s=d({}),l={created(t){for(const e in o)s[e]=t[e]}};let n=!1;const a=f(),i=()=>{const e={};for(const r in o){const c=o[r];(c!==void 0||n)&&(e[r]=c??s[r])}return n=!0,_("obi-14-alertheader-group",e,B(a))};return(t,e)=>m((v(),h(i,null,null,512)),[[l]])}});export{g as default};
//# sourceMappingURL=Obi14AlertheaderGroup.vue2.js.map
