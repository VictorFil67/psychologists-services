import{r as a,a as M,b as h,h as z,i as A,k as G,l as H,m as I,n as J,j as l,L as N,o as F}from"./index-DIVLPSOK.js";import{u as j,g as L,r as w,q as k,o as T,a as R,b as U,F as W,P as X,L as Y}from"./usePrevios-Z4UHLTCs.js";const $=({location:e,setCount:q,countFavorites:f})=>{const[s,x]=a.useState(null),[B,y]=a.useState(!1),t=M(),o=h(z),r=h(A),m=h(G),P=h(H),g=3,u=j(s),S=u==null?void 0:u.value,E=s==null?void 0:s.value,c=j(e),d=j(f);a.useEffect(()=>{r.length===0&&P.length>0?y(!0):y(!1)},[r,P]),a.useEffect(()=>{c!==e&&t(I({favoritesPsychologists:r,favoritesShow:m,favoritesPage:o}))},[c,e,t,r,m,o,u,x]);const C=a.useCallback(()=>{const n=L(),b=w(n),i=k(b,T());(o===0||d!==f)&&R(i,p=>{const v=p.val();v.length&&t(F(v))})},[t,o,d,f]),D=a.useCallback(()=>{const n=L(),b=w(n),i=[];if(S!==E&&c===e||d!==f){const p=Object.values(s)[0].split(" ")[0],v=Object.values(s)[0].split(" ")[1],O=k(b,U(p));R(O,Q=>{Q.forEach(V=>{const K=V.val();i.push(K)}),v&&i.reverse(),t(F(i))})}},[t,s,S,E,c,e,d,f]);return a.useEffect(()=>{s?D():C()},[C,D,s]),a.useEffect(()=>{if(r.length&&c===e){const n=r.slice(o*g,o*g+g);t(J(n))}},[r,o,t,c,e]),l.jsxs(l.Fragment,{children:[B&&l.jsx(N,{}),l.jsx(W,{selectedOption:s,setSelectedOption:x}),l.jsx(X,{location:e,setCountFavorites:q}),l.jsx(Y,{location:e})]})};export{$ as default};
