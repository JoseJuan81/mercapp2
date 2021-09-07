(this.webpackJsonpmercapp2=this.webpackJsonpmercapp2||[]).push([[0],{158:function(e,t,n){"use strict";n.r(t);var a=n(2),c=n.n(a),r=n(36),s=n.n(r),o=(n(66),function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,160)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),a(e),c(e),r(e),s(e)}))}),i=n(9),l=n(11),u=n(13),b=n(4),j=n(28),m=n(1),d=["isAuthenticated","components"],x=function(e){var t=e.isAuthenticated,n=e.components,a=Object(j.a)(e,d);return localStorage.setItem("lastpath",a.location.pathname),Object(m.jsx)(m.Fragment,{children:Object(m.jsx)(u.b,Object(b.a)(Object(b.a)({},a),{},{component:function(e){return t?Object(m.jsx)(n,Object(b.a)({},e)):Object(m.jsx)(u.a,{to:"/inicio-sesion"})}}))})},f="/inicio-sesion",p="/registro-usuario",O="/nueva-compra",h="/mis-insumos",g="/nuevo-insumo",v="/actualizar-insumo",y="/mis-compras",w=function(e){var t=e.to,n=e.title;return Object(m.jsx)(l.c,{className:" flex flex-col items-center icon-plus text-6xl text-warmGray-600 p-6 pb-3 border border-solid border-warmGray-600 rounded ",to:t,children:Object(m.jsx)("p",{className:" text-base mt-4 ",children:n})})},N=function(){return Object(m.jsx)("div",{className:" flex items-center justify-center h-full w-full overflow-scroll ",children:Object(m.jsx)(w,{to:O,title:"Nueva compra"})})},_=function(){return Object(m.jsxs)("div",{className:" menu_mobile__container grid-cols-3 ",children:[Object(m.jsx)("button",{className:"icon-search btn-icon",title:"Buscar"}),Object(m.jsx)("button",{className:"icon-filter btn-icon",title:"Filtrar"}),Object(m.jsx)(l.c,{to:O,className:" icon-plus btn-icon flex items-center justify-center ",title:"Agregar"})]})},C=function(){return Object(m.jsxs)("div",{className:"layout__page",children:[Object(m.jsx)(N,{}),Object(m.jsx)(_,{})]})},k=n(7),G=n(15),E=n.n(G),S=n(24),I="[insumos] add new one to state",P="[insumos] get all insumos",L="[insumos] set insumos from API",M="[insumos] delete insumo by id",F="[insumos] update an insumo in insumos",q=n(31);n(159),n(78);q.a.initializeApp({apiKey:"AIzaSyDWpTtEOwCLW3Ffmlf03Mqh6xqjIR5s1xM",authDomain:"mercapp2-63877.firebaseapp.com",projectId:"mercapp2-63877",storageBucket:"mercapp2-63877.appspot.com",messagingSenderId:"804004365139",appId:"1:804004365139:web:167504f95a9721db49d7a6",measurementId:"G-GS32Z3RQRS"});var A,B=q.a.firestore(),R=new q.a.auth.GoogleAuthProvider,D=n(16),z=Object(k.j)(2),U={name:"",value:0},T=function(e){var t=[];return e.forEach((function(e){t.push(Object(b.a)({id:e.id},e.data()))})),t},W=function(e,t){var n=Object(k.b)(Object(k.a)("id",e.id),t),a=Object(D.a)(t);return a.splice(n,1,e),Object(D.a)(a)},J="[loading] start",Q="[loading] end",K={loading:!1},V=function(){return{type:J}},X=function(){return{type:Q}},Y=function(e){return{type:L,payload:e}},Z=function(e){return{type:M,payload:e}},H=n(12),$=n(10),ee={data:{name:"",price:{},labels:[]},isEditing:!1},te="[new Insumo] filling form",ne="[new Insumo] reset form",ae="[update Insumo] filling form to update",ce=["id"],re=function(){return{type:ne}},se=function(e){return{type:ae,payload:e}},oe=Object(k.j)(2),ie=c.a.memo((function(e){var t=e.labels,n=e.checked;return Object(m.jsx)("ul",{className:"flex flex-wrap",children:t.map((function(e,t){return Object(m.jsx)("li",{className:"\n                            bg-white\n                            text-xs ".concat(n?"text-lime-700":"text-warmGray-800","\n                            m-1 p-1\n                        "),children:e},"".concat(e,"-").concat(t,"-").concat(Math.random))}))})})),le=c.a.memo((function(e){var t=e.title,n=e.checked;return Object(m.jsx)("dt",{className:"\n                duration-200\n                flex-auto\n                text-2xl font-medium ".concat(n?"text-lime-600":"text-warmGray-800","\n                pr-6\n            "),children:t})})),ue=c.a.memo((function(e){var t=e.currency,n=e.price;return Object(m.jsxs)("dt",{className:" text-2xl text-warmGray-500 font-light ",children:[Object(m.jsx)("small",{className:"text-xs",children:t}),Object(m.jsx)("span",{children:n})]})})),be=c.a.memo((function(e){var t=e.currency,n=e.total;return Object(m.jsxs)("dt",{className:" text-3xl text-lime-500 font-bold ",children:[Object(m.jsx)("small",{className:"text-xs font-normal mr-1",children:"total:"}),Object(m.jsx)("small",{className:"text-base font-light",children:t}),Object(m.jsx)("span",{children:n})]})})),je=c.a.memo((function(e){var t=e.setTotal,n=e.price,c=e.id,r=Object(i.b)(),s=Object(a.useState)(1),o=Object(H.a)(s,2),l=o[0],u=o[1];return Object(a.useEffect)((function(){var e=oe(l*n);t(e)}),[l,n]),Object(a.useEffect)((function(){r({type:"quantity-change",payload:{id:c,quantity:1}})}),[]),Object(m.jsxs)("div",{className:"flex mx-2",children:[Object(m.jsx)("button",{"data-jest":"minusQuantity",className:" icon-minus bg-gray-100 text-gray-500 w-12 h-12 ",onClick:function(e){e.stopPropagation();var t=Number(l)-1,n=t<0?1:t;u(n),r({type:"quantity-change",payload:{id:c,quantity:n}})}}),Object(m.jsx)("input",{className:" w-16 h-12 text-center text-xl font-medium text-warmGray-500 ",type:"number",step:1,min:0,value:l,onChange:function(e){var t=e.target.value;u(t),r({type:"quantity-change",payload:{id:c,quantity:t}})},onClick:function(e){return e.stopPropagation()}}),Object(m.jsx)("button",{"data-jest":"addQuantity",className:" icon-plus bg-lime-50 text-lime-500 w-12 h-12 ",onClick:function(e){e.stopPropagation();var t=Number(l)+1;u(t),r({type:"quantity-change",payload:{id:c,quantity:t}})}})]})})),me=c.a.memo((function(e){var t=e.id,n=Object(i.b)(),c=Object(u.g)(),r=Object(a.useState)(!1),s=Object(H.a)(r,2),o=s[0],l=s[1];return Object(m.jsxs)("div",{className:"\n                absolute right-0\n                pr-2\n                bg-warmGray-100\n                flex\n                transform ".concat(o?"translate-x-0":"translate-x-24","\n                border border-solid ").concat(o?"border-warmGray-200":"border-white","\n                rounded-l-full\n                duration-300\n            "),children:[Object(m.jsx)("button",{type:"button",className:"\n                    bg-white\n                    icon-circle-left\n                    flex items-center justify-center\n                    text-warmGray-500\n                    text-2xl\n                    transform ".concat(o?"rotate-180":"rotate-0","\n                    w-10\n                    ").concat(o?"rounded-full":"rounded-l-full","\n                    border border-solid border-warmGray-200\n                    duration-300\n                "),onClick:function(e){e.stopPropagation(),l((function(e){return!e}))}}),Object(m.jsxs)("div",{className:" grid grid-cols-2 gap-2 ",children:[Object(m.jsx)("button",{type:"button",className:" icon-pencil px-2 text-xl text-warmGray-800 ",onClick:function(e){var a;e.stopPropagation(),n((a=t,function(e,t){var n=Object(k.b)(Object(k.a)("id",a),t().insumos);e(se(n))})),c.push("".concat(v,"/").concat(t))}}),Object(m.jsx)("button",{type:"button",className:" icon-bin2 px-2 text-xl text-warmGray-800 ",onClick:function(e){e.stopPropagation(),n(function(e){return function(){var t=Object(S.a)(E.a.mark((function t(n,a){var c;return E.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return c=a().auth.uid,t.prev=1,t.next=4,B.doc("".concat(c,"/app/insumos/").concat(e)).delete();case 4:n(Z(e)),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(1),console.log("No fue posible eliminar el insumo",t.t0);case 10:case"end":return t.stop()}}),t,null,[[1,7]])})));return function(e,n){return t.apply(this,arguments)}}()}(t))}})]})]})})),de=c.a.memo((function(e){var t=e.insumo,n=t.checked,c=t.currency,r=t.labels,s=t.id,o=t.name,l=t.price,u=Object(i.b)(),b=Object(a.useState)(t.price),j=Object(H.a)(b,2),d=j[0],x=j[1];return Object(m.jsxs)("div",{className:"\n                w-full\n                duration-200\n                rounded-lg ".concat(n&&"shadow-xl","\n                border border-solid ").concat(n?"border-lime-400":"border-warmGray-300","\n            "),onClick:function(){return e=t,void u({type:"toogle",payload:Object(k.k)("checked",!e.checked,e)});var e},children:[Object(m.jsxs)("dl",{className:"flex p-2 overflow-hidden relative",children:[Object(m.jsx)("div",{className:"flex flex-auto",children:Object(m.jsx)(le,{title:o,checked:n})}),Object(m.jsx)(me,{id:s})]}),l&&c&&Object(m.jsx)("div",{className:"ml-2",children:Object(m.jsx)(ue,{currency:c,price:l,checked:n})}),r&&r.length>0&&Object(m.jsx)("div",{className:"\n                        rounded-br-lg rounded-bl-lg\n                        ".concat(n?"bg-lime-100":"bg-warmGray-100","\n                        p-1\n                    "),children:Object(m.jsx)(ie,{labels:r,checked:n})}),n&&Object(m.jsxs)("div",{className:"flex justify-between items-center py-2 pr-4",children:[Object(m.jsx)(je,{setTotal:x,price:l,id:s}),Object(m.jsx)(be,{currency:c,total:d})]})]})})),xe=function(e){var t=e.insumos;return Object(m.jsx)(m.Fragment,{children:Object(m.jsx)("div",{className:" grid gap-2 self-start w-full px-2 pb-2 ",children:t.map((function(e,t){return Object(m.jsx)(de,{insumo:e},"".concat(e,"-").concat(t))}))})})},fe=c.a.memo((function(e){var t=e.toogleShowSearch,n=e.toogleShowFilter;e.openModal;console.log("6 MENU MOVIL");return Object(m.jsxs)("div",{className:" menu_mobile__container grid-cols-5 ",children:[Object(m.jsx)("button",{className:"icon-checkmark btn-icon",title:"Seleccionar todo",onClick:function(){}}),Object(m.jsx)("button",{className:"icon-checkmark btn-icon text-warmGray-300",title:"Deseleccionar todo",onClick:function(){}}),Object(m.jsx)("button",{className:"icon-search btn-icon",title:"Buscar",onClick:t}),Object(m.jsx)("button",{className:"icon-filter btn-icon",title:"Filtrar",onClick:n}),Object(m.jsx)(l.c,{to:g,className:" icon-plus btn-icon flex items-center justify-center "})]})})),pe=function(){return Object(m.jsx)("div",{className:" h-full w-full flex flex-col items-center justify-center ",children:Object(m.jsxs)("span",{className:" flex items-center justify-center h-12 w-12 relative ",children:[Object(m.jsx)("span",{className:" animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75 "}),Object(m.jsx)("span",{className:" relative inline-flex rounded-full h-3 w-3 bg-lime-500 "})]})})},Oe=function(e){var t=e.path;return Object(m.jsx)("div",{className:" flex items-center justify-center h-full w-full overflow-scroll ",children:Object(m.jsx)(w,{to:t,title:"Nuevo insumo"})})},he=function(){var e=Object(i.b)(),t=Object(i.c)((function(e){return e})),n=t.insumos,c=t.loading.loading;return Object(a.useEffect)((function(){e(function(){var e=Object(S.a)(E.a.mark((function e(t,n){var a,c,r;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t(V()),a=n().auth.uid,e.next=4,B.collection("".concat(a,"/app/insumos")).get();case 4:c=e.sent,r=T(c),t(Y(r)),t(X());case 8:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}())}),[]),Object(m.jsx)(m.Fragment,{children:c?Object(m.jsx)(pe,{}):Object(m.jsxs)("div",{className:"layout__page",children:[Object(k.f)(n)?Object(m.jsx)(Oe,{path:g}):Object(m.jsx)(xe,{insumos:n}),Object(m.jsx)(fe,{toogleShowSearch:function(){},toogleShowFilter:function(){},openModal:function(){}})]})})},ge=function(){return Object(m.jsx)("div",{children:"nueva compra"})},ve=function(){return Object(m.jsxs)("div",{className:" menu_mobile__container grid-cols-3 ",children:[Object(m.jsx)(l.c,{to:y,className:" icon-circle-left btn-icon flex items-center justify-center ",title:"atras"}),Object(m.jsx)("button",{type:"button",className:" icon-cancel-circle btn-icon flex items-center justify-center "}),Object(m.jsx)("button",{type:"button",className:"icon-checkmark btn-icon",title:"Agregar"})]})},ye=function(){return Object(m.jsxs)("div",{className:"layout__page",children:[Object(m.jsx)(ge,{}),Object(m.jsx)(ve,{})]})},we=["error","onBlur","onChange","onFocus","value","specialClass"],Ne=c.a.memo((function(e){var t=e.error,n=e.onBlur,a=e.onChange,c=e.onFocus,r=e.value,s=e.specialClass,o=Object(j.a)(e,we),i=s?"input-form ".concat(s):"input-form";return Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)("input",Object(b.a)(Object(b.a)({},o),{},{className:i,value:r,onChange:a,onBlur:n,onFocus:c})),t&&Object(m.jsxs)("small",{className:" animate__animated animate__slideInRight text-rose-600 font-regular ml-2 ",children:[t," "]})]})})),_e=function(e){var t=e.labels,n=void 0===t?[]:t,c=e.addLabels,r=e.placeholder,s=void 0===r?"etiquetas...":r,o=e.name,i=void 0===o?"":o,l=Object(a.useRef)(),u=Object(a.useState)(""),b=Object(H.a)(u,2),j=b[0],d=b[1],x=Object(a.useState)(n),f=Object(H.a)(x,2),p=f[0],O=f[1],h=function(){O((function(e){return[j].concat(Object(D.a)(e))})),c({target:{name:i,value:[j].concat(Object(D.a)(p))}}),l.current.focus(),d("")};return Object(a.useEffect)((function(){Object(k.f)(n)&&O(n)}),[n]),Object(m.jsxs)("div",{className:"\n                flex flex-wrap\n                w-full min-h-12\n                mb-4 ".concat(p&&p.length>0&&"p-1","\n                border border-solid border-warmGray-300\n                rounded\n                overflow-hidden\n            "),children:[p&&p.length>0&&Object(m.jsx)("div",{className:" flex flex-wrap max-h-48 overflow-auto ",children:p.map((function(e,t){return Object(m.jsxs)("span",{className:"\n                                    relative\n                                    flex items-center\n                                    text-warmGray-800\n                                    ".concat(p.length>1&&"mr-2 my-1","\n                                "),children:[Object(m.jsx)("span",{className:" rounded-l bg-warmGray-100 p-2 ",children:e}),Object(m.jsx)("button",{type:"button",className:" icon-cancel-circle bg-warmGray-100 rounded-r-full p-1 text-rose-400 text-2xl ",onClick:function(e){return function(e,t){e.preventDefault(),e.stopPropagation();var n=Object(k.h)(t,p);O(n),c({target:{name:i,value:n}}),l.current.focus()}(e,t)}})]},"".concat(e,"-").concat(t))}))}),Object(m.jsxs)("div",{className:" flex-auto flex items-center justify-between ",children:[Object(m.jsx)("input",{type:"text",className:" input-form input-transparent pl-4 ",name:i,ref:l,autoComplete:"off",placeholder:s,onKeyDown:function(e){e.stopPropagation(),"Tab"===e.code&&j&&h()},onChange:function(e){var t=e.target;d(t.value)},value:j}),j&&Object(m.jsx)("button",{className:" icon-plus px-2 py-2 mr-2 text-lime-500 bg-warmGray-100 rounded ",onClick:function(e){e.preventDefault(),e.stopPropagation(),h()}})]})]})},Ce=function(){var e=Object(u.g)(),t=Object(i.c)((function(e){return e.newInsumo})).isEditing,n=Object(i.b)();return Object(m.jsxs)("div",{className:" grid grid-cols-3 h-16 ",children:[Object(m.jsx)(l.c,{to:h,className:" icon-circle-left btn-icon flex items-center justify-center ",title:"atras"}),Object(m.jsx)("button",{type:"button",className:" icon-cancel-circle btn-icon flex items-center justify-center ",onClick:function(){n(re())}}),Object(m.jsx)("button",{type:"button",className:"icon-checkmark btn-icon",title:"Agregar",onClick:function(){t?(n(function(){var e=Object(S.a)(E.a.mark((function e(t,n){var a,c,r,s,o;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=n(),c=a.auth.uid,r=a.newInsumo.data,s=r.id,o=Object(j.a)(r,ce),e.next=4,B.doc("".concat(c,"/app/insumos/").concat(s)).update(o);case 4:t({type:F,payload:r}),t(re());case 6:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()),e.push(h)):n(function(){var e=Object(S.a)(E.a.mark((function e(t,n){var a,c,r,s;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=n(),c=a.auth.uid,r=a.newInsumo.data,e.next=3,B.collection("".concat(c,"/app/insumos")).add(r);case 3:s=e.sent,t((o=Object(b.a)(Object(b.a)({},r),{},{id:s.id}),{type:I,payload:o})),t(re());case 6:case"end":return e.stop()}var o}),e)})));return function(t,n){return e.apply(this,arguments)}}())}})]})},ke=function(e){var t=e.name,n=e.price,a=e.onChange,c=e.addNewPrice,r=e.removePrice,s=e.showAddPrice,o=function(e){var c=e.target,r="name"===c.name,s="value"===c.name,o={name:t,value:n};r&&(o.name=c.value),s&&(o.value=Number(c.value)),a({target:{name:"price",value:o}})};return Object(m.jsxs)("div",{className:" flex items-center ",children:[Object(m.jsx)(Ne,{autoComplete:"off",type:"text",placeholder:"establecimiento",name:"name",specialClass:"flex-auto mr-4",value:t,onChange:o}),Object(m.jsx)(Ne,{autoComplete:"off",type:"number",placeholder:"precio",name:"value",specialClass:"w-20",value:n,onChange:o}),s?Object(m.jsx)("button",{type:"button",className:" icon-plus py-2 px-3 ml-4 text-warmGray-800 text-2xl bg-warmGray-100 ",onClick:c}):Object(m.jsx)("button",{type:"button",className:" icon-minus py-2 px-3 ml-4 text-warmGray-800 text-2xl bg-warmGray-100 ",onClick:r})]})},Ge=function(){var e=new URLSearchParams(Object(u.h)()),t=Object(a.useState)(!1),n=Object(H.a)(t,2),c=n[0],r=n[1],s=Object(i.c)((function(e){return e})).newInsumo.data,o=s.name,l=s.labels,j=function(e){return Object(k.f)(e)?[U]:Object.keys(e).map((function(t){return{name:t,value:z(e[t])}}))}(s.price),d=Object(a.useState)(j),x=Object(H.a)(d,2),f=x[0],p=x[1],O=Object(i.b)(),h=function(e){var t=e.target;O(function(e){var t,n=e.name,a=e.value;return"price"===n?{type:te,payload:Object($.a)({},n,(t=a,t.reduce((function(e,t){var n=t.name,a=t.value,c=Object(b.a)({},e);return c[n.toLowerCase().trim()]=a,c}),{})))}:{type:te,payload:Object($.a)({},n,a)}}(t))},g=function(){p((function(e){return[].concat(Object(D.a)(e),[U])}))};return Object(a.useEffect)((function(){var t,n=function(e,t){var n=e.replace(t,"").split("/"),a=Object(H.a)(n,2);return a[0],a[1]}(e.get("pathname"),v);r(!!n),n&&Object(k.f)(o)&&O((t=n,function(){var e=Object(S.a)(E.a.mark((function e(n,a){var c,r,s,o;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n(V()),c=a(),r=c.auth.uid,e.prev=2,e.next=5,B.doc("".concat(r,"/app/insumos/").concat(t)).get();case 5:s=e.sent,o=s.data(),n(se(Object(b.a)({id:s.id},o))),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(2),console.log("Error al obtener data del insumo",e.t0);case 13:return e.prev=13,n(X()),e.finish(13);case 16:case"end":return e.stop()}}),e,null,[[2,10,13,16]])})));return function(t,n){return e.apply(this,arguments)}}()))}),[]),Object(m.jsxs)("form",{className:" mx-1 px-3 bg-white rounded-t-2xl w-full max-h-5/6 overflow-auto ",children:[Object(m.jsx)("h1",{className:" font-light text-3xl pl-2 py-6 sticky top-0 z-30 bg-white ",children:c?"Actualizar Insumo":"Nuevo Insumo"}),Object(m.jsx)("fieldset",{className:"mb-4",children:Object(m.jsxs)("label",{children:[Object(m.jsx)("small",{className:" text-warmGray-500 ml-2 ",children:"Nombre insumo"}),Object(m.jsx)(Ne,{autoComplete:"off",type:"text",placeholder:"nombre",name:"name",value:o,onChange:h})]})}),Object(m.jsx)("fieldset",{children:Object(m.jsxs)("label",{children:[Object(m.jsx)("small",{className:" text-warmGray-500 ml-2 ",children:"Precio"}),f.map((function(e,t){return Object(m.jsx)("fieldset",{className:" animate__animated animate__faster animate__slideInLeft mb-4 ",children:Object(m.jsx)(ke,{price:e.value,name:e.name,onChange:function(e){return function(e,t){var n=Object(D.a)(f);n.splice(t,1,e.value),h({target:{name:"price",value:n}}),p(Object(D.a)(n))}(e.target,t)},addNewPrice:g,removePrice:function(){return e=t,void p((function(t){return Object(D.a)(Object(k.h)(e,Object(D.a)(t)))}));var e},showAddPrice:f.length-1===t})},"".concat(e,"-").concat(t))}))]})}),Object(m.jsx)("fieldset",{className:"mb-4",children:Object(m.jsxs)("label",{children:[Object(m.jsx)("small",{className:" text-warmGray-500 ml-2 ",children:"Etiquetas"}),Object(m.jsx)(_e,{labels:l,name:"labels",addLabels:h})]})}),Object(m.jsx)("fieldset",{children:Object(m.jsx)(Ce,{})})]})},Ee=function(){var e=Object(i.c)((function(e){return e})).loading.loading;return Object(m.jsx)("div",{className:" animate__animated animate__bounceInUp animate__faster fixed top-0 left-0 z-20 w-full h-full bg-black bg-opacity-70 flex items-end justify-center ",children:e?Object(m.jsx)(pe,{}):Object(m.jsx)(Ge,{})})},Se=function(){return Object(m.jsx)("div",{className:"layout__page",children:Object(m.jsx)(Ee,{})})},Ie="[auth]::login",Pe="[auth]::logout",Le=function(e,t){var n=JSON.stringify(t);localStorage.setItem(e,n)},Me="[mercapp2]::user-data",Fe=function(e){return{type:Ie,payload:e}},qe=function(){return function(e){var t;t=Me,localStorage.removeItem(t),e({type:Pe})}},Ae=function(e){var t=e.showMenu,n=e.handleShowMenu,c=Object(i.c)((function(e){return e.auth})),r=Object(i.b)();Object(a.useEffect)((function(){var e=document.querySelector("ul").classList;t?(e.add("block"),e.remove("hidden"),e.remove("animate__fadeOutRightBig"),e.add("animate__fadeInRightBig")):(e.remove("animate__fadeInRightBig"),e.add("animate__fadeOutRightBig"))}),[t]);return Object(m.jsxs)("ul",{className:"\n                hidden\n                fixed top-0 -right-3 z-50\n                bg-white\n                border-2 border-solid border-warmGray-300 rounded\n                w-full h-screen\n                mt-1\n                shadow\n                animate__animated\n            ",children:[Object(m.jsxs)("li",{className:" flex flex-col pl-4 pr-6 py-4 mb-3 ",children:[Object(m.jsxs)("div",{className:" flex items-center justify-between ",children:[Object(m.jsx)("img",{className:" rounded-full w-16 h-16 ",src:c.avatar,alt:"imagen del usuario"}),Object(m.jsx)("button",{className:" icon-cancel-circle text-5xl text-warmGray-700 ",type:"button",onClick:n})]}),Object(m.jsx)("span",{className:" text-center text-warmGray-500 mt-4 ",children:c.name})]}),Object(m.jsx)("li",{className:" border-t border-solid border-warmGray-300 pl-4 ",children:Object(m.jsxs)(l.c,{className:" text-base text-warmGray-400 flex items-center w-full ",activeClassName:" text-warmGray-800 font-regular ",to:y,children:[Object(m.jsx)("span",{className:"icon-home"}),Object(m.jsx)("p",{className:" flex-auto whitespace-nowrap px-4 py-4 ",children:"Mis compras"})]})}),Object(m.jsx)("li",{children:Object(m.jsx)(l.c,{className:" font-light text-base text-warmGray-400 ",activeClassName:" text-warmGray-800 font-regular ",to:h,children:Object(m.jsx)("p",{className:" whitespace-nowrap px-4 py-4 border-t border-b border-solid border-warmGray-300 ",children:"Mis insumos"})})}),Object(m.jsx)("li",{className:" whitespace-nowrap fixed bottom-0 w-full ",children:Object(m.jsx)("button",{className:" px-4 py-4 w-full bg-warmGray-100 text-warmGray-800 font-regular text-xl ",onClick:function(){r(qe())},children:"Cerrar sesion"})})]})},Be=(A={},Object($.a)(A,h,"Mis Insumos"),Object($.a)(A,y,"Mis Compras"),A),Re=function(){var e=Object(u.h)().pathname,t=Object(a.useState)(""),n=Object(H.a)(t,2),c=n[0],r=n[1],s=Object(a.useState)(!1),o=Object(H.a)(s,2),i=o[0],l=o[1],b=function(e){"button"===e.target.type&&l((function(e){return!e}))};return Object(a.useEffect)((function(){r(Be[e]||null)}),[e]),Object(m.jsxs)("div",{className:" px-3 h-16 border-b border-solid border-warmGray-200 flex items-center justify-between sticky top-0 z-10 w-full bg-white ",children:[Object(m.jsx)("h1",{className:" font-medium text-lime-500 text-base ",children:"MercApp2"}),c&&Object(m.jsx)("h1",{className:" animate__animated animate__fadeInUp animate__delay-2s text-xl font-light ",children:c}),Object(m.jsxs)("div",{className:" flex items-center ",children:[Object(m.jsx)("button",{type:"button",className:" icon-menu py-2 px-3 text-base text-warmGray-800 bg-warmGray-100 ",onClick:b}),Object(m.jsx)(Ae,{showMenu:i,handleShowMenu:b})]})]})},De=function(){return Object(m.jsxs)("div",{className:"w-screen h-screen",children:[Object(m.jsx)(Re,{}),Object(m.jsx)("div",{className:"layout__container",children:Object(m.jsxs)(u.d,{children:[Object(m.jsx)(u.b,{exact:!0,path:y,children:Object(m.jsx)(C,{})}),Object(m.jsx)(u.b,{exact:!0,path:h,children:Object(m.jsx)(he,{})}),Object(m.jsx)(u.b,{exact:!0,path:O,children:Object(m.jsx)(ye,{})}),Object(m.jsx)(u.b,{exact:!0,path:g,children:Object(m.jsx)(Se,{})}),Object(m.jsx)(u.b,{exact:!0,path:"".concat(v,"/:id"),children:Object(m.jsx)(Se,{})}),Object(m.jsx)(u.a,{to:y})]})})]})},ze=n(25),Ue=n.n(ze),Te=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=Object(a.useState)(e),c=Object(H.a)(n,2),r=c[0],s=c[1],o=Object(a.useState)(!0),i=Object(H.a)(o,2),l=i[0],u=i[1],j=function(e){var t=e.target;s(Object(b.a)(Object(b.a)({},r),{},Object($.a)({},t.name,t.value)))},m=function(){s(e)};return Object(a.useEffect)((function(){if(Object(k.f)(t))u(!1);else{var e=Object(k.l)(k.e,Object(k.g)((function(e){return Object(k.f)(Object(k.d)(e,r))}),t));u(e)}}),[r,t]),{formState:r,handleInputChange:j,resetForm:m,invalidForm:l}},We={email:"",name:"",password:"",password2:""},Je=function(){var e=Object(i.b)(),t=Te(Object(b.a)({},We)),n=t.formState,c=t.handleInputChange,r=Object(a.useState)(Object(b.a)(Object(b.a)({},We),{},{noErrors:!1})),s=Object(H.a)(r,2),o=s[0],u=s[1],j=n.email,d=n.name,x=n.password,p=n.password2,O=function(){var e=Object(b.a)(Object(b.a)({},We),{},{noErrors:!0});Ue.a.isLength(d,{min:4})||(e=Object(b.a)(Object(b.a)({},e),{},{noErrors:!1,name:"El nombre debe tener mas de 4 caracteres"})),Object(k.f)(d)&&(e=Object(b.a)(Object(b.a)({},e),{},{noErrors:!1,name:"El nombre es requerido"})),Ue.a.isEmail(j)||(e=Object(b.a)(Object(b.a)({},e),{},{noErrors:!1,email:"El correo es invalido"})),Object(k.f)(j)&&(e=Object(b.a)(Object(b.a)({},e),{},{noErrors:!1,email:"El correo es requerido"})),Ue.a.isLength(x,{min:6,max:16})||(e=Object(b.a)(Object(b.a)({},e),{},{noErrors:!1,password:"La contrasena debe tener entre 6 y 16 caracteres"})),Object(k.f)(x)&&(e=Object(b.a)(Object(b.a)({},e),{},{noErrors:!1,password:"La contrasena es requerida"})),x!==p&&(e=Object(b.a)(Object(b.a)({},e),{},{noErrors:!1,password2:"Las contrasenas no son iguales"})),u(Object(b.a)({},e))};return Object(m.jsxs)("div",{className:" flex flex-col items-center justify-center h-screen px-2 mx-auto max-w-xl ",children:[Object(m.jsx)("h2",{className:" font-medium text-xl text-warmGray-600 mb-4 ",children:"Registro de usuario"}),Object(m.jsxs)("form",{className:" animate__animated animate__rollIn flex flex-col py-6 px-4 mx-4 w-full border border-solid border-warmGray-200 rounded-xl shadow-lg ",onSubmit:function(t){t.preventDefault(),O(),o.noErrors&&e(function(e){var t=e.name,n=e.email,a=e.password;return function(){var e=Object(S.a)(E.a.mark((function e(c){var r,s;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,q.a.auth().createUserWithEmailAndPassword(n,a);case 3:return r=e.sent,s=r.user,e.next=7,s.updateProfile({displayName:t});case 7:c(Fe({name:s.displayName,uid:s.uid,email:s.email,avatar:s.photoURL})),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.error("error al registrar usuario",e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}()}(n))},children:[Object(m.jsx)("h1",{className:" text-4xl font-semibold text-lime-500 text-center pb-4 mb-2 ",children:"MercApp 2"}),Object(m.jsx)("fieldset",{className:"mb-2",children:Object(m.jsx)(Ne,{autoComplete:"off",type:"text",name:"name",placeholder:"Nombre",value:d,onChange:c,onBlur:O,error:o.name})}),Object(m.jsx)("fieldset",{className:"mb-2",children:Object(m.jsx)(Ne,{name:"email",placeholder:"Correo",value:j,onChange:c,onBlur:O,error:o.email})}),Object(m.jsx)("fieldset",{className:"mb-2",children:Object(m.jsx)(Ne,{name:"password",placeholder:"Contrasena",type:"password",value:x,onChange:c,onBlur:O,error:o.password})}),Object(m.jsx)("fieldset",{className:"mb-2",children:Object(m.jsx)(Ne,{name:"password2",placeholder:"Confirmar contrasena",type:"password",value:p,onChange:c,onBlur:O,error:o.password2})}),Object(m.jsx)("button",{className:"\n                        w-full h-16\n                        bg-lime-200\n                        text-lime-700 text-xl\n                        rounded\n                    ",children:"Registrar"}),Object(m.jsx)(l.b,{className:" bg-warmGray-100 text-center text-warmGray-700 py-2 mt-4 ",to:f,children:"Ya tengo una cuenta"})]})]})},Qe={email:"",password:""},Ke=function(){var e=Object(i.b)(),t=Te(Object(b.a)({},Qe)),n=t.formState,c=t.handleInputChange,r=t.invalidForm,s=Object(a.useState)(Object(b.a)(Object(b.a)({},Qe),{},{noErrors:!1})),o=Object(H.a)(s,2),u=o[0],j=o[1],d=n.email,x=n.password,f=function(){var e=Object(b.a)(Object(b.a)({},Qe),{},{noErrors:!0});Ue.a.isEmail(d)||(e=Object(b.a)(Object(b.a)({},e),{},{noErrors:!1,email:"El correo es invalido"})),Object(k.f)(d)&&(e=Object(b.a)(Object(b.a)({},e),{},{noErrors:!1,email:"El correo es requerido"})),Ue.a.isLength(x,{min:6,max:16})||(e=Object(b.a)(Object(b.a)({},e),{},{noErrors:!1,password:"La contrasena debe tener entre 6 y 16 caracteres"})),Object(k.f)(x)&&(e=Object(b.a)(Object(b.a)({},e),{},{noErrors:!1,password:"La contrasena es requerida"})),j(Object(b.a)({},e))};return Object(m.jsxs)("div",{className:" flex flex-col items-center justify-center h-screen px-2 mx-auto max-w-xl ",children:[Object(m.jsx)("h2",{className:" font-medium text-xl text-warmGray-600 mb-4 ",children:"Inicio de sesion"}),Object(m.jsxs)("form",{className:" animate__animated animate__jello flex flex-col py-6 px-4 mx-4 w-full border border-solid border-warmGray-200 rounded-xl shadow-lg ",onSubmit:function(t){t.preventDefault(),f(),u.noErrors&&e(function(e){var t=e.email,n=e.password;return function(){var e=Object(S.a)(E.a.mark((function e(a){var c,r,s;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,q.a.auth().signInWithEmailAndPassword(t,n);case 3:c=e.sent,r=c.user,s={name:r.displayName,uid:r.uid,email:r.email,avatar:r.photoURL},a(Fe(s)),Le(Me,Object(b.a)(Object(b.a)({},s),{},{logged:!0})),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.error("error al iniciar sesion con correo",e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}()}(n))},children:[Object(m.jsx)("h1",{className:" text-4xl font-semibold text-lime-500 text-center pb-4 mb-2 ",children:"MercApp 2"}),Object(m.jsx)("fieldset",{className:"mb-2",children:Object(m.jsx)(Ne,{placeholder:"Introduzca su correo",type:"text",name:"email",value:d,onChange:c,onBlur:f,error:u.email})}),Object(m.jsx)("fieldset",{className:"mb-2",children:Object(m.jsx)(Ne,{placeholder:"Introduzca su contrasena",type:"password",name:"password",value:x,onChange:c,onBlur:f,error:u.password})}),Object(m.jsx)("button",{disabled:r,className:"\n                        btn\n                        bg-lime-200\n                        text-lime-700 text-xl\n                        ".concat(r&&"opacity-30","\n                    "),children:"Inicia sesion"}),Object(m.jsxs)("div",{className:" btn my-4 grid grid-cols-5 items-center bg-blue-500 text-white border border-solid border-blue-500 ",onClick:function(){e(function(){var e=Object(S.a)(E.a.mark((function e(t){var n,a,c;return E.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,q.a.auth().signInWithPopup(R);case 3:n=e.sent,a=n.user,c={name:a.displayName,uid:a.uid,email:a.email,avatar:a.photoURL},t(Fe(c)),Le(Me,Object(b.a)(Object(b.a)({},c),{},{logged:!0})),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.error("error al iniciar sesion con google",e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}())},children:[Object(m.jsx)("div",{className:" bg-white rounded-l px-4 h-full flex justify-center items-center ",children:Object(m.jsx)("img",{className:"google-icon",src:"https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",alt:"google button"})}),Object(m.jsx)("p",{className:"col-span-4 text-center text-xl font-medium",children:"Usa tu cuenta google"})]}),Object(m.jsx)(l.b,{className:" bg-warmGray-100 text-center text-warmGray-700 py-2 mt-4 ",to:p,children:"Registrarme"})]})]})},Ve=function(){var e=function(e){var t=localStorage.getItem(e);return JSON.parse(t)}(Me),t=Object(i.c)((function(e){return e.auth})),n=e||t,c=Object(i.b)();return Object(a.useEffect)((function(){e&&c(Fe(e))}),[]),Object(m.jsx)("div",{className:"font-mercapp",children:Object(m.jsx)(l.a,{children:Object(m.jsxs)(u.d,{children:[Object(m.jsx)(u.b,{exact:!0,path:f,component:function(e){return n.logged?Object(m.jsx)(u.a,{to:"/"}):Object(m.jsx)(Ke,{props:e})}}),Object(m.jsx)(u.b,{exact:!0,path:p,component:function(e){return n.logged?Object(m.jsx)(u.a,{to:"/"}):Object(m.jsx)(Je,{props:e})}}),Object(m.jsx)(x,{path:"/",isAuthenticated:n.logged,components:De})]})})})},Xe=n(33),Ye=n(61),Ze={logged:!1},He="undefined"!==typeof window&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||Xe.c,$e=Object(Xe.b)({auth:function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Ze,n=arguments.length>1?arguments[1]:void 0,a=(e={},Object($.a)(e,Ie,(function(){return Object(b.a)(Object(b.a)({},n.payload),{},{logged:!0})})),Object($.a)(e,Pe,(function(){return Object(b.a)({},Ze)})),e),c=a[n.type];return"function"===typeof c?c():t},newInsumo:function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ee,n=arguments.length>1?arguments[1]:void 0,a=(e={},Object($.a)(e,te,(function(){return Object(b.a)(Object(b.a)({},t),{},{data:Object(b.a)(Object(b.a)({},t.data),n.payload)})})),Object($.a)(e,ne,(function(){return Object(b.a)({},ee)})),Object($.a)(e,ae,(function(){return{data:n.payload,isEditing:!0}})),e),c=a[n.type];return"function"===typeof c?c():t},insumos:function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=arguments.length>1?arguments[1]:void 0,a=(e={},Object($.a)(e,I,(function(){return[n.payload].concat(Object(D.a)(t))})),Object($.a)(e,P,(function(){return Object(D.a)(t)})),Object($.a)(e,L,(function(){return Object(D.a)(n.payload)})),Object($.a)(e,M,(function(){return Object(D.a)(Object(k.i)("id",n.payload,t))})),Object($.a)(e,F,(function(){return W(n.payload,t)})),e),c=a[n.type];return"function"===typeof c?c():t},loading:function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:K,n=arguments.length>1?arguments[1]:void 0,a=(e={},Object($.a)(e,J,(function(){return{loading:!0}})),Object($.a)(e,Q,(function(){return K})),e),c=a[n.type];return"function"===typeof c?c():t}}),et=Object(Xe.d)($e,He(Object(Xe.a)(Ye.a))),tt=function(){return Object(m.jsx)(i.a,{store:et,children:Object(m.jsx)(Ve,{})})};s.a.render(Object(m.jsx)(c.a.StrictMode,{children:Object(m.jsx)(tt,{})}),document.getElementById("root")),o()},66:function(e,t,n){}},[[158,1,2]]]);
//# sourceMappingURL=main.b97aa37f.chunk.js.map