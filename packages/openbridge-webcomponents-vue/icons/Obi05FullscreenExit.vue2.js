import{defineComponent as a,reactive as f,useSlots as d,withDirectives as m,openBlock as v,createBlock as _,h}from"vue";import{assignSlotNodes as x}from"@lit-labs/vue-utils/wrapper-utils.js";import"@oicl/openbridge-webcomponents/dist/icons/icon-05-fullscreen-exit.js";const b=a({__name:"Obi05FullscreenExit",props:{useCssColor:{type:Boolean}},setup(l){const o=l,n=f({}),i={created(t){for(const e in o)n[e]=t[e]}};let r=!1;const p=d(),u=()=>{const e={};for(const s in o){const c=o[s];(c!==void 0||r)&&(e[s]=c??n[s])}return r=!0,h("obi-05-fullscreen-exit",e,x(p))};return(t,e)=>m((v(),_(u,null,null,512)),[[i]])}});export{b as default};
//# sourceMappingURL=Obi05FullscreenExit.vue2.js.map
