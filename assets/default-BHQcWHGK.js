import{p as A,i as Z,c as r,r as se,a as C,g as le,s as F,o as K,b as ue,d as L,f as ie,m as re,e as X,h as ce,u as ve,j as b,k as de,l as pe,n as me,q as fe,t as ye,w as D}from"./index-CYBQkbqv.js";import{u as ge,m as U,a as W,b as he,c as be,d as xe}from"./tag-BMenB028.js";const B=Symbol.for("vuetify:layout"),Ie=Symbol.for("vuetify:layout-item"),N=1e3,we=A({overlaps:{type:Array,default:()=>[]},fullHeight:Boolean},"layout");function Se(){const e=Z(B);if(!e)throw new Error("[Vuetify] Could not find injected layout");return{getLayoutItem:e.getLayoutItem,mainRect:e.mainRect,mainStyles:e.mainStyles}}const _e=(e,c,n,s)=>{let l={top:0,left:0,right:0,bottom:0};const v=[{id:"",layer:{...l}}];for(const u of e){const d=c.get(u),y=n.get(u),h=s.get(u);if(!d||!y||!h)continue;const x={...l,[d.value]:parseInt(l[d.value],10)+(h.value?parseInt(y.value,10):0)};v.push({id:u,layer:x}),l=x}return v};function ze(e){const c=Z(B,null),n=r(()=>c?c.rootZIndex.value-100:N),s=se([]),l=C(new Map),v=C(new Map),u=C(new Map),d=C(new Map),y=C(new Map),{resizeRef:h,contentRect:x}=ge(),Y=r(()=>{const o=new Map,p=e.overlaps??[];for(const t of p.filter(i=>i.includes(":"))){const[i,a]=t.split(":");if(!s.value.includes(i)||!s.value.includes(a))continue;const m=l.get(i),g=l.get(a),_=v.get(i),z=v.get(a);!m||!g||!_||!z||(o.set(a,{position:m.value,amount:parseInt(_.value,10)}),o.set(i,{position:g.value,amount:-parseInt(z.value,10)}))}return o}),I=r(()=>{const o=[...new Set([...u.values()].map(t=>t.value))].sort((t,i)=>t-i),p=[];for(const t of o){const i=s.value.filter(a=>{var m;return((m=u.get(a))==null?void 0:m.value)===t});p.push(...i)}return _e(p,l,v,d)}),O=r(()=>!Array.from(y.values()).some(o=>o.value)),w=r(()=>I.value[I.value.length-1].layer),G=r(()=>({"--v-layout-left":L(w.value.left),"--v-layout-right":L(w.value.right),"--v-layout-top":L(w.value.top),"--v-layout-bottom":L(w.value.bottom),...O.value?void 0:{transition:"none"}})),S=r(()=>I.value.slice(1).map((o,p)=>{let{id:t}=o;const{layer:i}=I.value[p],a=v.get(t),m=l.get(t);return{id:t,...i,size:Number(a.value),position:m.value}})),T=o=>S.value.find(p=>p.id===o),R=le("createLayout"),H=F(!1);K(()=>{H.value=!0}),ue(B,{register:(o,p)=>{let{id:t,order:i,position:a,layoutSize:m,elementSize:g,active:_,disableTransitions:z,absolute:ee}=p;u.set(t,i),l.set(t,a),v.set(t,m),d.set(t,_),z&&y.set(t,z);const E=ie(Ie,R==null?void 0:R.vnode).indexOf(o);E>-1?s.value.splice(E,0,t):s.value.push(t);const j=r(()=>S.value.findIndex($=>$.id===t)),V=r(()=>n.value+I.value.length*2-j.value*2),te=r(()=>{const $=a.value==="left"||a.value==="right",M=a.value==="right",ne=a.value==="bottom",P=g.value??m.value,ae=P===0?"%":"px",q={[a.value]:0,zIndex:V.value,transform:`translate${$?"X":"Y"}(${(_.value?0:-(P===0?100:P))*(M||ne?-1:1)}${ae})`,position:ee.value||n.value!==N?"absolute":"fixed",...O.value?void 0:{transition:"none"}};if(!H.value)return q;const f=S.value[j.value];if(!f)throw new Error(`[Vuetify] Could not find layout item "${t}"`);const k=Y.value.get(t);return k&&(f[k.position]+=k.amount),{...q,height:$?`calc(100% - ${f.top}px - ${f.bottom}px)`:g.value?`${g.value}px`:void 0,left:M?void 0:`${f.left}px`,right:M?`${f.right}px`:void 0,top:a.value!=="bottom"?`${f.top}px`:void 0,bottom:a.value!=="top"?`${f.bottom}px`:void 0,width:$?g.value?`${g.value}px`:void 0:`calc(100% - ${f.left}px - ${f.right}px)`}}),oe=r(()=>({zIndex:V.value-1}));return{layoutItemStyles:te,layoutItemScrimStyles:oe,zIndex:V}},unregister:o=>{u.delete(o),l.delete(o),v.delete(o),d.delete(o),y.delete(o),s.value=s.value.filter(p=>p!==o)},mainRect:w,mainStyles:G,getLayoutItem:T,items:S,layoutRect:x,rootZIndex:n});const J=r(()=>["v-layout",{"v-layout--full-height":e.fullHeight}]),Q=r(()=>({zIndex:c?n.value:void 0,position:c?"relative":void 0,overflow:c?"hidden":void 0}));return{layoutClasses:J,layoutStyles:Q,getLayoutItem:T,items:S,layoutRect:x,layoutRef:h}}const $e=A({...U(),...we({fullHeight:!0}),...re()},"VApp"),Ce=X()({name:"VApp",props:$e(),setup(e,c){let{slots:n}=c;const s=ce(e),{layoutClasses:l,getLayoutItem:v,items:u,layoutRef:d}=ze(e),{rtlClasses:y}=ve();return W(()=>{var h;return b("div",{ref:d,class:["v-application",s.themeClasses.value,l.value,y.value,e.class],style:[e.style]},[b("div",{class:"v-application__wrap"},[(h=n.default)==null?void 0:h.call(n)])])}),{getLayoutItem:v,items:u,theme:s}}});function Le(){const e=F(!1);return K(()=>{window.requestAnimationFrame(()=>{e.value=!0})}),{ssrBootStyles:r(()=>e.value?void 0:{transition:"none !important"}),isBooted:de(e)}}const Re=A({scrollable:Boolean,...U(),...he(),...be({tag:"main"})},"VMain"),Ve=X()({name:"VMain",props:Re(),setup(e,c){let{slots:n}=c;const{dimensionStyles:s}=xe(e),{mainStyles:l}=Se(),{ssrBootStyles:v}=Le();return W(()=>b(e.tag,{class:["v-main",{"v-main--scrollable":e.scrollable},e.class],style:[l.value,v.value,s.value,e.style]},{default:()=>{var u,d;return[e.scrollable?b("div",{class:"v-main__scroller"},[(u=n.default)==null?void 0:u.call(n)]):(d=n.default)==null?void 0:d.call(n)]}})),{}}}),Be=pe({__name:"default",setup(e){return(c,n)=>{const s=fe("router-view");return ye(),me(Ce,null,{default:D(()=>[b(Ve,null,{default:D(()=>[b(s)]),_:1})]),_:1})}}});export{Be as default};