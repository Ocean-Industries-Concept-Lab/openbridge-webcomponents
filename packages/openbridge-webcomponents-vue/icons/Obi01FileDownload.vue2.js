import{defineComponent as u,reactive as d,useSlots as f,withDirectives as m,openBlock as v,createBlock as _,h}from"vue";import{assignSlotNodes as w}from"@lit-labs/vue-utils/wrapper-utils.js";import"@oicl/openbridge-webcomponents/dist/icons/icon-01-file-download.js";const P=u({__name:"Obi01FileDownload",props:{useCssColor:{type:Boolean}},setup(l){const e=l,n=d({}),i={created(t){for(const o in e)n[o]=t[o]}};let r=!1;const p=f(),a=()=>{const o={};for(const s in e){const c=e[s];(c!==void 0||r)&&(o[s]=c??n[s])}return r=!0,h("obi-01-file-download",o,w(p))};return(t,o)=>m((v(),_(a,null,null,512)),[[i]])}});export{P as default};
//# sourceMappingURL=Obi01FileDownload.vue2.js.map
