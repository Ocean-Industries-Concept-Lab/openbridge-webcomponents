import{defineComponent as u,reactive as m,useSlots as f,withDirectives as d,openBlock as v,createBlock as _,h}from"vue";import{assignSlotNodes as g}from"@lit-labs/vue-utils/wrapper-utils.js";import"@oicl/openbridge-webcomponents/dist/icons/icon-14-alarm-emergency.js";const P=u({__name:"Obi14AlarmEmergency",props:{useCssColor:{type:Boolean}},setup(l){const o=l,n=m({}),a={created(t){for(const e in o)n[e]=t[e]}};let r=!1;const p=f(),i=()=>{const e={};for(const s in o){const c=o[s];(c!==void 0||r)&&(e[s]=c??n[s])}return r=!0,h("obi-14-alarm-emergency",e,g(p))};return(t,e)=>d((v(),_(i,null,null,512)),[[a]])}});export{P as default};
//# sourceMappingURL=Obi14AlarmEmergency.vue2.js.map
