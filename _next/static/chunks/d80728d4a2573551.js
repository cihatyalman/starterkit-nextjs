(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,7670,e=>{"use strict";function t(){for(var e,t,r=0,a="",s=arguments.length;r<s;r++)(e=arguments[r])&&(t=function e(t){var r,a,s="";if("string"==typeof t||"number"==typeof t)s+=t;else if("object"==typeof t)if(Array.isArray(t)){var i=t.length;for(r=0;r<i;r++)t[r]&&(a=e(t[r]))&&(s&&(s+=" "),s+=a)}else for(a in t)t[a]&&(s&&(s+=" "),s+=a);return s}(e))&&(a&&(a+=" "),a+=t);return a}e.s(["clsx",()=>t])},65209,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(75157),s=e.i(19455),i=e.i(31278),o=e.i(91918);e.s(["CButton",0,({variant:e="default",type:n="button",color:l="bg-(--color-primary) hover:bg-(--color-primary-light)",loadingCtrl:c=!1,autoFocus:d=!1,disabled:u=!1,onClick:m,className:p="",asChild:f=!1,...h})=>{let[y,g]=(0,r.useState)(c);(0,r.useEffect)(()=>{g(c)},[c]);let b=async e=>{if(!f&&!y&&!u){g(!0);try{await m?.(e)}finally{g(!1)}}},v=f?o.Slot:s.Button;return(0,t.jsx)(v,{variant:e,type:n,"aria-label":h["aria-label"]??h.name?`${h.name}-Button`:"Button",autoFocus:d,disabled:u,onClick:b,className:(0,a.cn)("font-semibold transition-all","default"===e&&l,u?"opacity-70 cursor-not-allowed":"cursor-pointer",p.includes("w-")?p:`min-w-25 w-fit ${p}`),...h,children:y?(0,t.jsx)("span",{children:(0,t.jsx)(i.Loader2,{className:"inline-flex animate-spin size-5"})}):h.children})}])},5766,e=>{"use strict";let t,r;var a,s=e.i(71645);let i={data:""},o=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,n=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,c=(e,t)=>{let r="",a="",s="";for(let i in e){let o=e[i];"@"==i[0]?"i"==i[1]?r=i+" "+o+";":a+="f"==i[1]?c(o,i):i+"{"+c(o,"k"==i[1]?"":t)+"}":"object"==typeof o?a+=c(o,t?t.replace(/([^,])+/g,e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)):i):null!=o&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=c.p?c.p(i,o):i+":"+o+";")}return r+(t&&s?t+"{"+s+"}":s)+a},d={},u=e=>{if("object"==typeof e){let t="";for(let r in e)t+=r+u(e[r]);return t}return e};function m(e){let t,r,a=this||{},s=e.call?e(a.p):e;return((e,t,r,a,s)=>{var i;let m=u(e),p=d[m]||(d[m]=(e=>{let t=0,r=11;for(;t<e.length;)r=101*r+e.charCodeAt(t++)>>>0;return"go"+r})(m));if(!d[p]){let t=m!==e?e:(e=>{let t,r,a=[{}];for(;t=o.exec(e.replace(n,""));)t[4]?a.shift():t[3]?(r=t[3].replace(l," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][t[1]]=t[2].replace(l," ").trim();return a[0]})(e);d[p]=c(s?{["@keyframes "+p]:t}:t,r?"":"."+p)}let f=r&&d.g?d.g:null;return r&&(d.g=d[p]),i=d[p],f?t.data=t.data.replace(f,i):-1===t.data.indexOf(i)&&(t.data=a?i+t.data:t.data+i),p})(s.unshift?s.raw?(t=[].slice.call(arguments,1),r=a.p,s.reduce((e,a,s)=>{let i=t[s];if(i&&i.call){let e=i(r),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":c(e,""):!1===e?"":e}return e+a+(null==i?"":i)},"")):s.reduce((e,t)=>Object.assign(e,t&&t.call?t(a.p):t),{}):s,(e=>{if("object"==typeof window){let t=(e?e.querySelector("#_goober"):window._goober)||Object.assign(document.createElement("style"),{innerHTML:" ",id:"_goober"});return t.nonce=window.__nonce__,t.parentNode||(e||document.head).appendChild(t),t.firstChild}return e||i})(a.target),a.g,a.o,a.k)}m.bind({g:1});let p,f,h,y=m.bind({k:1});function g(e,t){let r=this||{};return function(){let a=arguments;function s(i,o){let n=Object.assign({},i),l=n.className||s.className;r.p=Object.assign({theme:f&&f()},n),r.o=/ *go\d+/.test(l),n.className=m.apply(r,a)+(l?" "+l:""),t&&(n.ref=o);let c=e;return e[0]&&(c=n.as||e,delete n.as),h&&c[0]&&h(n),p(c,n)}return t?t(s):s}}var b=(e,t)=>"function"==typeof e?e(t):e,v=(t=0,()=>(++t).toString()),x=()=>{if(void 0===r&&"u">typeof window){let e=matchMedia("(prefers-reduced-motion: reduce)");r=!e||e.matches}return r},w="default",C=(e,t)=>{let{toastLimit:r}=e.settings;switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,r)};case 1:return{...e,toasts:e.toasts.map(e=>e.id===t.toast.id?{...e,...t.toast}:e)};case 2:let{toast:a}=t;return C(e,{type:+!!e.toasts.find(e=>e.id===a.id),toast:a});case 3:let{toastId:s}=t;return{...e,toasts:e.toasts.map(e=>e.id===s||void 0===s?{...e,dismissed:!0,visible:!1}:e)};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter(e=>e.id!==t.toastId)};case 5:return{...e,pausedAt:t.time};case 6:let i=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map(e=>({...e,pauseDuration:e.pauseDuration+i}))}}},E=[],k={toasts:[],pausedAt:void 0,settings:{toastLimit:20}},T={},S=(e,t=w)=>{T[t]=C(T[t]||k,e),E.forEach(([e,r])=>{e===t&&r(T[t])})},j=e=>Object.keys(T).forEach(t=>S(e,t)),A=(e=w)=>t=>{S(t,e)},$={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},I=(e={},t=w)=>{let[r,a]=(0,s.useState)(T[t]||k),i=(0,s.useRef)(T[t]);(0,s.useEffect)(()=>(i.current!==T[t]&&a(T[t]),E.push([t,a]),()=>{let e=E.findIndex(([e])=>e===t);e>-1&&E.splice(e,1)}),[t]);let o=r.toasts.map(t=>{var r,a,s;return{...e,...e[t.type],...t,removeDelay:t.removeDelay||(null==(r=e[t.type])?void 0:r.removeDelay)||(null==e?void 0:e.removeDelay),duration:t.duration||(null==(a=e[t.type])?void 0:a.duration)||(null==e?void 0:e.duration)||$[t.type],style:{...e.style,...null==(s=e[t.type])?void 0:s.style,...t.style}}});return{...r,toasts:o}},N=e=>(t,r)=>{let a,s=((e,t="blank",r)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...r,id:(null==r?void 0:r.id)||v()}))(t,e,r);return A(s.toasterId||(a=s.id,Object.keys(T).find(e=>T[e].toasts.some(e=>e.id===a))))({type:2,toast:s}),s.id},O=(e,t)=>N("blank")(e,t);O.error=N("error"),O.success=N("success"),O.loading=N("loading"),O.custom=N("custom"),O.dismiss=(e,t)=>{let r={type:3,toastId:e};t?A(t)(r):j(r)},O.dismissAll=e=>O.dismiss(void 0,e),O.remove=(e,t)=>{let r={type:4,toastId:e};t?A(t)(r):j(r)},O.removeAll=e=>O.remove(void 0,e),O.promise=(e,t,r)=>{let a=O.loading(t.loading,{...r,...null==r?void 0:r.loading});return"function"==typeof e&&(e=e()),e.then(e=>{let s=t.success?b(t.success,e):void 0;return s?O.success(s,{id:a,...r,...null==r?void 0:r.success}):O.dismiss(a),e}).catch(e=>{let s=t.error?b(t.error,e):void 0;s?O.error(s,{id:a,...r,...null==r?void 0:r.error}):O.dismiss(a)}),e};var P=1e3,D=(e,t="default")=>{let{toasts:r,pausedAt:a}=I(e,t),i=(0,s.useRef)(new Map).current,o=(0,s.useCallback)((e,t=P)=>{if(i.has(e))return;let r=setTimeout(()=>{i.delete(e),n({type:4,toastId:e})},t);i.set(e,r)},[]);(0,s.useEffect)(()=>{if(a)return;let e=Date.now(),s=r.map(r=>{if(r.duration===1/0)return;let a=(r.duration||0)+r.pauseDuration-(e-r.createdAt);if(a<0){r.visible&&O.dismiss(r.id);return}return setTimeout(()=>O.dismiss(r.id,t),a)});return()=>{s.forEach(e=>e&&clearTimeout(e))}},[r,a,t]);let n=(0,s.useCallback)(A(t),[t]),l=(0,s.useCallback)(()=>{n({type:5,time:Date.now()})},[n]),c=(0,s.useCallback)((e,t)=>{n({type:1,toast:{id:e,height:t}})},[n]),d=(0,s.useCallback)(()=>{a&&n({type:6,time:Date.now()})},[a,n]),u=(0,s.useCallback)((e,t)=>{let{reverseOrder:a=!1,gutter:s=8,defaultPosition:i}=t||{},o=r.filter(t=>(t.position||i)===(e.position||i)&&t.height),n=o.findIndex(t=>t.id===e.id),l=o.filter((e,t)=>t<n&&e.visible).length;return o.filter(e=>e.visible).slice(...a?[l+1]:[0,l]).reduce((e,t)=>e+(t.height||0)+s,0)},[r]);return(0,s.useEffect)(()=>{r.forEach(e=>{if(e.dismissed)o(e.id,e.removeDelay);else{let t=i.get(e.id);t&&(clearTimeout(t),i.delete(e.id))}})},[r,o]),{toasts:r,handlers:{updateHeight:c,startPause:l,endPause:d,calculateOffset:u}}},L=y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,z=y`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,B=y`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,M=g("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${L} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${z} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${B} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,_=y`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,F=g("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${_} 1s linear infinite;
`,H=y`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,R=y`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,K=g("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${H} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${R} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,U=g("div")`
  position: absolute;
`,V=g("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,W=y`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,q=g("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${W} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,J=({toast:e})=>{let{icon:t,type:r,iconTheme:a}=e;return void 0!==t?"string"==typeof t?s.createElement(q,null,t):t:"blank"===r?null:s.createElement(V,null,s.createElement(F,{...a}),"loading"!==r&&s.createElement(U,null,"error"===r?s.createElement(M,{...a}):s.createElement(K,{...a})))},Y=g("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,Z=g("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,G=s.memo(({toast:e,position:t,style:r,children:a})=>{let i=e.height?((e,t)=>{let r=e.includes("top")?1:-1,[a,s]=x()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[`
0% {transform: translate3d(0,${-200*r}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${-150*r}%,-1px) scale(.6); opacity:0;}
`];return{animation:t?`${y(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${y(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(e.position||t||"top-center",e.visible):{opacity:0},o=s.createElement(J,{toast:e}),n=s.createElement(Z,{...e.ariaProps},b(e.message,e));return s.createElement(Y,{className:e.className,style:{...i,...r,...e.style}},"function"==typeof a?a({icon:o,message:n}):s.createElement(s.Fragment,null,o,n))});a=s.createElement,c.p=void 0,p=a,f=void 0,h=void 0;var Q=({id:e,className:t,style:r,onHeightUpdate:a,children:i})=>{let o=s.useCallback(t=>{if(t){let r=()=>{a(e,t.getBoundingClientRect().height)};r(),new MutationObserver(r).observe(t,{subtree:!0,childList:!0,characterData:!0})}},[e,a]);return s.createElement("div",{ref:o,className:t,style:r},i)},X=m`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,ee=({reverseOrder:e,position:t="top-center",toastOptions:r,gutter:a,children:i,toasterId:o,containerStyle:n,containerClassName:l})=>{let{toasts:c,handlers:d}=D(r,o);return s.createElement("div",{"data-rht-toaster":o||"",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...n},className:l,onMouseEnter:d.startPause,onMouseLeave:d.endPause},c.map(r=>{let o,n,l=r.position||t,c=d.calculateOffset(r,{reverseOrder:e,gutter:a,defaultPosition:t}),u=(o=l.includes("top"),n=l.includes("center")?{justifyContent:"center"}:l.includes("right")?{justifyContent:"flex-end"}:{},{left:0,right:0,display:"flex",position:"absolute",transition:x()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${c*(o?1:-1)}px)`,...o?{top:0}:{bottom:0},...n});return s.createElement(Q,{id:r.id,key:r.id,onHeightUpdate:d.updateHeight,className:r.visible?X:"",style:u},"custom"===r.type?b(r.message,r):i?i(r):s.createElement(G,{toast:r,position:l}))}))};e.s(["CheckmarkIcon",()=>K,"ErrorIcon",()=>M,"LoaderIcon",()=>F,"ToastBar",()=>G,"ToastIcon",()=>J,"Toaster",()=>ee,"default",()=>O,"resolveValue",()=>b,"toast",()=>O,"useToaster",()=>D,"useToasterStore",()=>I],5766)},61094,95160,e=>{"use strict";var t=e.i(43476),r=e.i(55487),a=e.i(64645);let s=function({name:e,initialData:t}){return(0,a.createSlice)({name:e,initialState:{data:t},reducers:{set(e,t){e.data=t.payload},update(e,t){e.data=(0,t.payload)(e.data)},updateUI(e){e.data=structuredClone(e.data)}}})}({name:"counter",initialData:0});e.s(["counterSlice",0,s],95160);var i=e.i(65209);e.s(["DemoRedux",0,()=>{let e=(0,r.useDispatch)(),a=(0,r.useSelector)(e=>e.counter.data),o=t=>{0===t?e(s.actions.set(0)):e(s.actions.update(e=>e+t))};return(0,t.jsxs)("div",{className:"flex flex-wrap gap-2 items-center",children:[(0,t.jsx)(i.CButton,{className:"w-10 text-xl",onClick:()=>o(-1),children:"-"}),(0,t.jsx)("p",{className:"font-bold text-lg text-center min-w-8",children:a}),(0,t.jsx)(i.CButton,{className:"w-10 text-xl",onClick:()=>o(1),children:"+"}),(0,t.jsx)(i.CButton,{onClick:()=>o(0),children:"Sıfırla"})]})}],61094)},63178,e=>{"use strict";var t=e.i(71645),r=(e,t,r,a,s,i,o,n)=>{let l=document.documentElement,c=["light","dark"];function d(t){var r;(Array.isArray(e)?e:[e]).forEach(e=>{let r="class"===e,a=r&&i?s.map(e=>i[e]||e):s;r?(l.classList.remove(...a),l.classList.add(i&&i[t]?i[t]:t)):l.setAttribute(e,t)}),r=t,n&&c.includes(r)&&(l.style.colorScheme=r)}if(a)d(a);else try{let e=localStorage.getItem(t)||r,a=o&&"system"===e?window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light":e;d(a)}catch(e){}},a=["light","dark"],s="(prefers-color-scheme: dark)",i="u"<typeof window,o=t.createContext(void 0),n={setTheme:e=>{},themes:[]},l=()=>{var e;return null!=(e=t.useContext(o))?e:n},c=e=>t.useContext(o)?t.createElement(t.Fragment,null,e.children):t.createElement(u,{...e}),d=["light","dark"],u=({forcedTheme:e,disableTransitionOnChange:r=!1,enableSystem:i=!0,enableColorScheme:n=!0,storageKey:l="theme",themes:c=d,defaultTheme:u=i?"system":"light",attribute:y="data-theme",value:g,children:b,nonce:v,scriptProps:x})=>{let[w,C]=t.useState(()=>p(l,u)),[E,k]=t.useState(()=>"system"===w?h():w),T=g?Object.values(g):c,S=t.useCallback(e=>{let t=e;if(!t)return;"system"===e&&i&&(t=h());let s=g?g[t]:t,o=r?f(v):null,l=document.documentElement,c=e=>{"class"===e?(l.classList.remove(...T),s&&l.classList.add(s)):e.startsWith("data-")&&(s?l.setAttribute(e,s):l.removeAttribute(e))};if(Array.isArray(y)?y.forEach(c):c(y),n){let e=a.includes(u)?u:null,r=a.includes(t)?t:e;l.style.colorScheme=r}null==o||o()},[v]),j=t.useCallback(e=>{let t="function"==typeof e?e(w):e;C(t);try{localStorage.setItem(l,t)}catch(e){}},[w]),A=t.useCallback(t=>{k(h(t)),"system"===w&&i&&!e&&S("system")},[w,e]);t.useEffect(()=>{let e=window.matchMedia(s);return e.addListener(A),A(e),()=>e.removeListener(A)},[A]),t.useEffect(()=>{let e=e=>{e.key===l&&(e.newValue?C(e.newValue):j(u))};return window.addEventListener("storage",e),()=>window.removeEventListener("storage",e)},[j]),t.useEffect(()=>{S(null!=e?e:w)},[e,w]);let $=t.useMemo(()=>({theme:w,setTheme:j,forcedTheme:e,resolvedTheme:"system"===w?E:w,themes:i?[...c,"system"]:c,systemTheme:i?E:void 0}),[w,j,e,E,i,c]);return t.createElement(o.Provider,{value:$},t.createElement(m,{forcedTheme:e,storageKey:l,attribute:y,enableSystem:i,enableColorScheme:n,defaultTheme:u,value:g,themes:c,nonce:v,scriptProps:x}),b)},m=t.memo(({forcedTheme:e,storageKey:a,attribute:s,enableSystem:i,enableColorScheme:o,defaultTheme:n,value:l,themes:c,nonce:d,scriptProps:u})=>{let m=JSON.stringify([s,a,n,e,c,l,i,o]).slice(1,-1);return t.createElement("script",{...u,suppressHydrationWarning:!0,nonce:"u"<typeof window?d:"",dangerouslySetInnerHTML:{__html:`(${r.toString()})(${m})`}})}),p=(e,t)=>{let r;if(!i){try{r=localStorage.getItem(e)||void 0}catch(e){}return r||t}},f=e=>{let t=document.createElement("style");return e&&t.setAttribute("nonce",e),t.appendChild(document.createTextNode("*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}")),document.head.appendChild(t),()=>{window.getComputedStyle(document.body),setTimeout(()=>{document.head.removeChild(t)},1)}},h=e=>(e||(e=window.matchMedia(s)),e.matches?"dark":"light");e.s(["ThemeProvider",()=>c,"useTheme",()=>l])},15007,e=>{"use strict";var t=e.i(43476),r=e.i(55487),a=e.i(64645);e.i(61094);var s=e.i(95160);let i=(0,a.configureStore)({reducer:{counter:s.counterSlice.reducer},middleware:e=>e({serializableCheck:!1})});function o({children:e}){return(0,t.jsx)(r.Provider,{store:i,children:e})}e.s(["ReduxProvider",()=>o],15007)},41066,e=>{"use strict";var t=e.i(43476),r=e.i(63178);function a({children:e}){return(0,t.jsx)(r.ThemeProvider,{attribute:"class",defaultTheme:"light",enableSystem:!1,disableTransitionOnChange:!0,children:e})}e.s(["ThemeProvider",()=>a])}]);