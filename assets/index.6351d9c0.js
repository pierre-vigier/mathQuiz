import{o as p,c as R,u as z,R as D,a as F,r as l,b as h,d as r,n as j,F as M,e as C,f as $,t as g,w as A,v as E,p as P,g as Y,h as q,i as K,j as Q,k as W}from"./vendor.3e48a1d4.js";const G=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const v of t.addedNodes)v.tagName==="LINK"&&v.rel==="modulepreload"&&d(v)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function d(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}};G();const J={setup(u){return(n,i)=>(p(),R(z(D)))}};var U=(u,n)=>{const i=u.__vccOpts||u;for(const[d,e]of n)i[d]=e;return i};const X=u=>(P("data-v-2f466fae"),u=u(),Y(),u),Z={id:"container"},ee={class:"topbar"},te={id:"time-container"},oe={id:"lives"},se={id:"score"},re=X(()=>r("br",null,null,-1)),ne={key:0},ae={id:"operation"},le={id:"responses"},ie=["onClick"],ue={id:"overlay"},ce={id:"message"},de=["innerHTML"],ve={setup(u){F(()=>{let o=localStorage.getItem("highScore");o&&(n.value=parseInt(o))});const n=l(0),i=l(!1),d=l(1),e=l(2),t=l([{value:1},{value:2}]),v=l(5),f=l(0),T=l("You lost"),O=l("Continue"),y=l(!1),m=700,_=l(m);let k=null;function x(){_.value>0?k=setTimeout(()=>{_.value-=1,x()},10):(I(),t.value.forEach(o=>{o.pressed=!0}),setTimeout(()=>{w()},2500))}function S(o){return Math.floor(Math.random()*o)+1}function b(){clearTimeout(k)}function w(){_.value=m,clearTimeout(k),x(),d.value=S(10),e.value=S(10);const o={value:d.value+e.value,pressed:!1,correct:!0};let s=[o],a=[-3,-2,-1,1,2,3];for(;s.length<5;){let c=S(a.length)-1;s.push({value:o.value+a[c],pressed:!1,correct:!1}),a.splice(c,1)}for(let c=s.length-1;c>0;c--){const L=Math.floor(Math.random()*(c+1));[s[c],s[L]]=[s[L],s[c]]}t.value=s}function V(){w(),v.value=5,f.value=0,y.value=!0}function B(){i.value=!1}function H(o){o.pressed||(o.pressed=!0,o.correct?(b(),_.value>m/2?f.value+=2:f.value+=1,f.value>n.value&&(n.value=f.value,localStorage.setItem("highScore",n.value)),t.value.forEach(s=>{s.pressed=!0}),setTimeout(()=>{w()},2500)):I())}function I(){v.value--,v.value===0&&(b(),t.value.forEach(o=>{o.pressed=!0}),setTimeout(()=>{i.value=!0,T.value=`You lost<br>score : ${f.value}`,y.value=!1},2500))}return(o,s)=>(p(),h("main",null,[r("div",Z,[r("div",ee,[r("div",te,[r("div",{id:"time-gauge",style:j({width:100*(_.value/m)+"%","background-color":`rgb(${55+200-200*(_.value/m)}, ${200*(_.value/m)}, 0)`})},null,4)]),r("div",oe,[(p(!0),h(M,null,C(v.value,a=>(p(),h("span",{key:a}," \u2764\uFE0F"))),128))]),r("div",se,[$(" High Score: "+g(n.value),1),re,$("Score: "+g(f.value),1)])]),y.value?(p(),h("div",ne,[r("div",ae,g(d.value)+" + "+g(e.value),1),r("div",le,[(p(!0),h(M,null,C(t.value,a=>(p(),h("div",{class:q({response:!0,correct:a.correct,pressed:a.pressed}),key:a,onClick:c=>H(a)},g(a.value),11,ie))),128))])])):(p(),h("div",{key:1,onClick:s[0]||(s[0]=a=>V())},"Click here to start"))]),A(r("div",ue,null,512),[[E,i.value]]),A(r("div",ce,[r("span",{innerHTML:T.value},null,8,de),r("div",{id:"continue",onClick:B},g(O.value),1)],512),[[E,i.value]])]))}};var pe=U(ve,[["__scopeId","data-v-2f466fae"]]);const fe=K({history:Q("/mathQuiz/"),routes:[{path:"/",name:"addition",component:pe}]}),N=W(J);N.use(fe);N.mount("#app");
