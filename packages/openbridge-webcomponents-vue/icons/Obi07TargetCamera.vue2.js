import{defineComponent as u,reactive as f,useSlots as m,withDirectives as d,openBlock as v,createBlock as _,h}from"vue";import{assignSlotNodes as C}from"@lit-labs/vue-utils/wrapper-utils.js";import"@oicl/openbridge-webcomponents/dist/icons/icon-07-target-camera.js";const b=u({__name:"Obi07TargetCamera",props:{useCssColor:{type:Boolean}},setup(a){const t=a,r=f({}),p={created(o){for(const e in t)r[e]=o[e]}};let n=!1;const i=m(),l=()=>{const e={};for(const s in t){const c=t[s];(c!==void 0||n)&&(e[s]=c??r[s])}return n=!0,h("obi-07-target-camera",e,C(i))};return(o,e)=>d((v(),_(l,null,null,512)),[[p]])}});export{b as default};
//# sourceMappingURL=Obi07TargetCamera.vue2.js.map
