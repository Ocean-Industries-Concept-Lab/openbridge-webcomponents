import{defineComponent as a,reactive as u,useSlots as d,withDirectives as m,openBlock as v,createBlock as _,h}from"vue";import{assignSlotNodes as C}from"@lit-labs/vue-utils/wrapper-utils.js";import"@oicl/openbridge-webcomponents/dist/icons/icon-20-cell-off.js";const k=a({__name:"Obi20CellOff",props:{useCssColor:{type:Boolean}},setup(l){const o=l,n=u({}),p={created(t){for(const e in o)n[e]=t[e]}};let r=!1;const i=d(),f=()=>{const e={};for(const s in o){const c=o[s];(c!==void 0||r)&&(e[s]=c??n[s])}return r=!0,h("obi-20-cell-off",e,C(i))};return(t,e)=>m((v(),_(f,null,null,512)),[[p]])}});export{k as default};
//# sourceMappingURL=Obi20CellOff.vue2.js.map
