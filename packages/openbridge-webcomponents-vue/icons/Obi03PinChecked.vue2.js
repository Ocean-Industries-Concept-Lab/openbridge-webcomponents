import{defineComponent as u,reactive as d,useSlots as f,withDirectives as m,openBlock as v,createBlock as h,h as _}from"vue";import{assignSlotNodes as k}from"@lit-labs/vue-utils/wrapper-utils.js";import"@oicl/openbridge-webcomponents/dist/icons/icon-03-pin-checked.js";const b=u({__name:"Obi03PinChecked",props:{useCssColor:{type:Boolean}},setup(i){const o=i,n=d({}),p={created(t){for(const e in o)n[e]=t[e]}};let r=!1;const l=f(),a=()=>{const e={};for(const s in o){const c=o[s];(c!==void 0||r)&&(e[s]=c??n[s])}return r=!0,_("obi-03-pin-checked",e,k(l))};return(t,e)=>m((v(),h(a,null,null,512)),[[p]])}});export{b as default};
//# sourceMappingURL=Obi03PinChecked.vue2.js.map
