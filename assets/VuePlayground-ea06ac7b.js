import{g as _,h as g,i as m,s,j as f,v as y,k as R,l as a,C as h,_ as r}from"./app-a09c4eb3.js";const w=e=>JSON.parse(decodeURIComponent(e));var V=_({name:"VuePlayground",props:{title:{type:String,default:""},files:{type:String,required:!0},settings:{type:String,default:"{}"}},setup(e){const u=g(),i=m(!0),t=s(),l=s(),n=s(),o=f(()=>y({},u,w(e.settings))),d=async()=>{const[{ReplStore:v,Repl:p},{default:c}]=await Promise.all([r(()=>import("./vue-repl-b5136f84.js"),["assets/vue-repl-b5136f84.js","assets/app-a09c4eb3.js","assets/utils-obz1_5fQ-60357f83.js"]),r(()=>import("./codemirror-editor-989ed1c5.js"),["assets/codemirror-editor-989ed1c5.js","assets/utils-obz1_5fQ-60357f83.js","assets/app-a09c4eb3.js"])]);t.value=p,n.value=c,l.value=new v({serializedState:decodeURIComponent(e.files)}),o.value.vueVersion&&await l.value.setVueVersion(o.value.vueVersion)};return R(async()=>{await d(),i.value=!1}),()=>[a("div",{class:"vue-playground-wrapper"},[e.title?a("div",{class:"header"},decodeURIComponent(e.title)):null,a("div",{class:"repl-container"},[i.value?a(h,{class:"preview-loading",height:192}):null,t.value?a(t.value,{editor:n.value,store:l.value,autoResize:!0,...o.value,layout:"horizontal"}):null])])]}});export{V as default};
