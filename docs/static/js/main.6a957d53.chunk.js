(this.webpackJsonpmercapp2=this.webpackJsonpmercapp2||[]).push([[0],{32:function(e,t,n){},43:function(e,t,n){"use strict";n.r(t);var c=n(1),a=n.n(c),r=n(23),o=n.n(r),s=(n(32),function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,44)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,r=t.getLCP,o=t.getTTFB;n(e),c(e),a(e),r(e),o(e)}))}),i=Object(c.createContext)(),l=n(3),u="[mercapp2]::user-data",b="[auth]::login",d="[auth]::logout",j=function(e){var t=localStorage.getItem(e);return JSON.parse(t)},m=function(e,t){var n=JSON.stringify(t);localStorage.setItem(e,n)},f=n(13),x=n(6),p=function(e,t){var n,c=(n={},Object(f.a)(n,b,(function(){return Object(x.a)(Object(x.a)({},t.payload),{},{logged:!0})})),Object(f.a)(n,d,(function(){return{logged:!0}})),n)[t.type];return"function"===typeof c?c():e},O=n(0),h=function(){return j(u)||{logged:!1}},g=function(e){var t=e.children,n=Object(c.useReducer)(p,{},h),a=Object(l.a)(n,2),r=a[0],o=a[1];return Object(c.useEffect)((function(){m(u,r)}),[r]),Object(O.jsx)(i.Provider,{value:{user:r,dispatch:o},children:t})},v=n(12),y=n(4),w=n(27),N=["isAuthenticated","components"],C=function(e){var t=e.isAuthenticated,n=e.components,c=Object(w.a)(e,N);return localStorage.setItem("lastpath",c.location.pathname),Object(O.jsx)(O.Fragment,{children:Object(O.jsx)(y.b,Object(x.a)(Object(x.a)({},c),{},{component:function(e){return t?Object(O.jsx)(n,Object(x.a)({},e)):Object(O.jsx)(y.a,{to:"/inicio-sesion"})}}))})},I="/inicio-sesion",S="/registro-usuario",k="/mis-insumos",G="/mis-compras",A=Object(c.createContext)(null),E=function(){var e=Object(y.h)().pathname,t=Object(c.useState)(e===k),n=Object(l.a)(t,2),a=n[0],r=n[1],o=Object(c.useContext)(A).total;return Object(c.useEffect)((function(){r(e===k)}),[e]),Object(O.jsxs)("div",{className:" py-3 px-3 shadow flex items-center justify-between sticky top-0 z-10 w-full bg-white ",children:[Object(O.jsx)("h1",{className:" flex-auto font-medium text-lime-500 text-base ",children:"MercApp2"}),Object(O.jsxs)("div",{className:" flex items-center ",children:[o>0&&a&&Object(O.jsx)(v.b,{to:"/lista-de-compras",className:" py-2 px-3 text-base text-lime-500 bg-warmGray-100 rounded icon-cart "}),o>0&&Object(O.jsxs)("div",{className:" text-lg font-bold text-warmGray-600 mx-4 ",children:[Object(O.jsx)("small",{className:"text-xs",children:"S/."}),Object(O.jsx)("output",{children:o})]}),Object(O.jsx)("button",{type:"button",className:" icon-menu py-2 px-3 text-base text-warmGray-500 bg-warmGray-100 "})]})]})},L=n(7),P=n(2),T=function(e){return e.sort((function(e,t){return e.title<=t.title?-1:1}))},q=Object(P.n)(2),M=function(e,t){var n=Object(P.f)(Object(P.c)("id",t.id),e),c=Object(L.a)(e);return c.splice(n,1,t),Object(L.a)(c)},B=function(e,t){var n={add:function(){return[t.payload].concat(Object(L.a)(e))},toogle:function(){return M(e,t.payload)},"quantity-change":function(){return M(e,t.payload)},"select-all":function(){return t.payload},"unselect-all":function(){return function(e){var t=Object(P.o)("checked",!1);return Object(P.k)(t,e)}(e)},search:function(){return function(e,t){var n=t.toLowerCase();return Object(P.d)((function(e){return e.title.toLowerCase().includes(n)}),e)}(e,t.payload)},"restore-insumos":function(){return t.payload},filter:function(){return function(e,t){if(""===t||null===t||void 0===t)return e;var n=t.toLowerCase();return e.filter((function(e){var t=e.labels;return!Object(P.i)(t)&&!!t.find((function(e){return e.toLowerCase().includes(n)}))}))}(e,t.payload)},remove:function(){return Object(P.m)("id",t.payload,e)},update:function(){return M(e,t.payload)},"update-with-local-storage":function(){return t.payload}}[t.type];return"function"===typeof n?n():e},F=j("selected-insumos")||[],D=function(e){var t=e.children,n=Object(c.useReducer)(B,[]),a=Object(l.a)(n,2),r=a[0],o=a[1],s=Object(c.useState)([]),i=Object(l.a)(s,2),u=i[0],b=i[1],d=Object(c.useState)(F),j=Object(l.a)(d,2),f=j[0],p=j[1],h=Object(c.useState)(0),g=Object(l.a)(h,2),v=g[0],y=g[1],w=Object(c.useState)({}),N=Object(l.a)(w,2),C=N[0],I=N[1];Object(c.useEffect)((function(){y(function(e){return e.length<1?0:e.reduce((function(e,t){var n=t.quantity,c=t.price;return e+q(n*c||0)}),0)}(f))}),[f]);var S={addingNewInsumo:function(e){o({type:"add",payload:e})},deletingInsumo:function(e){o({type:"remove",payload:e})},dispatch:o,filteringInsumos:function(e){""===e||null===e||void 0===e?o({type:"restore-insumos",payload:u}):(b(r),o({type:"filter",payload:e}))},insumos:r,insumoToUpdate:C,searchingInsumos:function(e){""===e||null===e||void 0===e?o({type:"restore-insumos",payload:u}):(b(r),o({type:"search",payload:e}))},selectedInsumos:f,selectingAllInsumos:function(){var e=function(e){var t=Object(P.a)(Object(P.o)("checked",!0),Object(P.o)("quantity",1));return Object(P.k)(t,e)}(r);o({type:"select-all",payload:e}),p(Object(L.a)(e)),m("selected-insumos",e)},setInsumoToUpdate:I,total:v,toogleCheck:function(e){o({type:"toogle",payload:e});var t=e.checked?[e].concat(Object(L.a)(f)):Object(P.m)("id",e.id,f);p(Object(L.a)(t)),m("selected-insumos",t)},unSelectingAllInsumos:function(){o({type:"unselect-all"}),p([]),m("selected-insumos",[])},updatingInsumo:function(e){var t=Object(P.e)(Object(P.c)("id",e),r)||{};I(t)},updatingInsumoInContext:function(e){o({type:"update",payload:e})},updateQuantityInSelectedInsumo:function(e,t){var n=Object(P.e)(Object(P.c)("id",e),r);o({type:"quantity-change",payload:Object(x.a)(Object(x.a)({},n),{},{quantity:t})});var c=M(f,Object(x.a)(Object(x.a)({},n),{},{quantity:t}));p(c),m("selected-insumos",c)}};return Object(O.jsx)(A.Provider,{value:S,children:t})},R=n(8),U=n.n(R),z=n(15),J=n(25),Q=n(26),_=new(function(){function e(t){Object(J.a)(this,e),this.db=null,this.collection=t,this.indexById="by_id",this.indexByTitle="by_title",this.indexByLabels="by_labels";var n=indexedDB.open("mercapp2"),c=this;n.onupgradeneeded=function(){var e=n.result.createObjectStore("insumos",{keyPath:"id",autoIncrement:!0});e.createIndex(c.indexById,"id",{unique:!0}),e.createIndex(c.indexByTitle,"title",{unique:!1}),e.createIndex(c.indexByLabels,"labels",{unique:!1})},n.onsuccess=function(){c.db=n.result}}return Object(Q.a)(e,[{key:"post",value:function(e){var t=this.db.transaction(this.collection,"readwrite");return t.objectStore(this.collection).put(e),new Promise((function(e,n){t.oncomplete=function(){e(!0)},t.onerror=function(e){n("Error al registrar un insumo: ",e)}}))}},{key:"getAll",value:function(){var e=this.db.transaction(this.collection,"readonly").objectStore(this.collection).getAll();return new Promise((function(t,n){e.onsuccess=function(e){t(e.target.result)},e.onerror=function(e){n("Error al obtener los insumos: ",e)}}))}},{key:"delete",value:function(e){var t=this.db.transaction(this.collection,"readwrite").objectStore(this.collection).delete(e);return new Promise((function(n,c){t.onsuccess=function(){n(!0)},t.onerror=function(){c("Error eliminando el insumo ".concat(e))}}))}},{key:"update",value:function(e){var t=this.db.transaction(this.collection,"readwrite").objectStore(this.collection),n=t.get(e.id);return new Promise((function(c,a){n.onerror=function(t){a("Insumo con id: ".concat(e.id,", no conseguido: ").concat(t))},n.onsuccess=function(){var n=t.put(e);n.onsuccess=function(e){c(e.target.result)},n.onerror=function(t){a("No fue posible actualizar el insumo con id ".concat(e.id,": ").concat(t))}}}))}}]),e}())("insumos"),H=function(){var e=Object(c.useRef)(!0),t=Object(c.useState)([]),n=Object(l.a)(t,2),a=n[0],r=n[1],o=Object(c.useState)(!0),s=Object(l.a)(o,2),i=s[0],u=s[1],b=Object(c.useState)(_.db),d=Object(l.a)(b,2),j=d[0],m=d[1],f=null,x=function(){clearInterval(f)},p=function(){var e=Object(z.a)(U.a.mark((function e(t){return U.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,_.post(t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),O=function(){var e=Object(z.a)(U.a.mark((function e(t){return U.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,_.delete(t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),h=function(){var e=Object(z.a)(U.a.mark((function e(t){return U.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,_.update(t);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(c.useEffect)((function(){return function(){e.current=!1}}),[]),Object(c.useEffect)((function(){j?setTimeout((function(){_.getAll().then((function(t){e.current&&(r(t),u(!1))}))}),1e3):f=setInterval((function(){_.db&&(m(!0),x())}),1e3)}),[j]),{deleteInsumo:O,insumos:a,loading:i,setNewInsumoInLocalDB:p,updateInsumoInLocalDB:h}},K=a.a.memo((function(e){var t=e.title;return console.log("PageTitle"),Object(O.jsx)("h1",{className:" text-4xl font-bold text-warmGray-500 text-center mb-4 ",children:t})})),V=Object(P.n)(2),W=a.a.memo((function(e){var t=e.labels,n=e.checked;return Object(O.jsx)("ul",{className:"flex flex-wrap",children:t.map((function(e,t){return Object(O.jsx)("li",{className:"\n                            bg-white\n                            text-xs ".concat(n?"text-lime-700":"text-warmGray-800","\n                            m-1 p-1\n                        "),children:e},"".concat(e,"-").concat(t,"-").concat(Math.random))}))})})),X=a.a.memo((function(e){var t=e.title,n=e.checked;return Object(O.jsx)("dt",{className:"\n                duration-200\n                flex-auto\n                text-2xl font-bold ".concat(n?"text-lime-600":"text-warmGray-400","\n                pr-6\n            "),children:t})})),Y=a.a.memo((function(e){var t=e.currency,n=e.price;return Object(O.jsxs)("dt",{className:" text-lg text-warmGray-400 font-semibold ",children:[Object(O.jsx)("small",{className:"text-xs font-light",children:t}),Object(O.jsx)("span",{children:n})]})})),Z=a.a.memo((function(e){var t=e.currency,n=e.total;return Object(O.jsxs)("dt",{className:" text-2xl text-lime-500 font-bold ",children:[Object(O.jsx)("small",{className:"text-xs font-normal mr-1",children:"total:"}),Object(O.jsx)("small",{className:"text-base font-light",children:t}),Object(O.jsx)("span",{children:n})]})})),$=a.a.memo((function(e){var t=e.setTotal,n=e.price,a=e.id,r=Object(c.useContext)(A).updateQuantityInSelectedInsumo,o=Object(c.useState)(1),s=Object(l.a)(o,2),i=s[0],u=s[1];return Object(c.useEffect)((function(){var e=V(i*n);t(e)}),[i,n]),Object(O.jsxs)("div",{className:"flex mx-2",children:[Object(O.jsx)("button",{"data-jest":"minusQuantity",className:" icon-minus bg-gray-100 text-gray-500 w-12 h-12 ",onClick:function(e){e.stopPropagation();var t=i-1,n=t<=0?1:t;u(n),r(a,n)}}),Object(O.jsx)("input",{className:" mx-1 w-10 h-12 text-center text-xl font-medium text-warmGray-500 ",type:"number",value:i,onChange:function(){}}),Object(O.jsx)("button",{"data-jest":"addQuantity",className:" icon-plus bg-lime-50 text-lime-500 w-12 h-12 ",onClick:function(e){e.stopPropagation();var t=i+1;u(t),r(a,t)}})]})})),ee=a.a.memo((function(e){var t=e.id,n=Object(c.useContext)(A),a=n.deletingInsumo,r=n.updatingInsumo,o=Object(c.useState)(!1),s=Object(l.a)(o,2),i=s[0],u=s[1];return Object(O.jsxs)("div",{className:"\n                absolute right-0\n                pr-2\n                bg-warmGray-100\n                flex\n                transform ".concat(i?"translate-x-0":"translate-x-24","\n                border border-solid ").concat(i?"border-warmGray-200":"border-white","\n                rounded-l-full\n                duration-300\n            "),children:[Object(O.jsx)("button",{type:"button",className:"\n                    bg-white\n                    icon-circle-left\n                    flex items-center justify-center\n                    text-warmGray-500\n                    text-2xl\n                    transform ".concat(i?"rotate-180":"rotate-0","\n                    w-10\n                    ").concat(i&&"rounded-full","\n                    border border-solid ").concat(i?"border-warmGray-200":"border-white","\n                    duration-300\n                "),onClick:function(e){e.stopPropagation(),u((function(e){return!e}))}}),Object(O.jsxs)("div",{className:" grid grid-cols-2 gap-2 ",children:[Object(O.jsx)("button",{type:"button",className:" icon-pencil px-2 text-2xl text-blue-500 ",onClick:function(e){e.stopPropagation(),r(t)}}),Object(O.jsx)("button",{type:"button",className:" icon-bin2 px-2 text-2xl text-rose-500 ",onClick:function(e){e.stopPropagation(),a(t)}})]})]})})),te=a.a.memo((function(e){var t=e.insumo,n=t.checked,a=t.currency,r=t.labels,o=t.id,s=t.title,i=t.price,u=Object(c.useContext)(A).toogleCheck,b=Object(c.useState)(t.price),d=Object(l.a)(b,2),j=d[0],m=d[1];return Object(O.jsxs)("div",{className:"\n                duration-200\n                rounded-lg ".concat(n&&"shadow-xl","\n                border border-solid ").concat(n?"border-lime-400":"border-warmGray-300","\n            "),onClick:function(){return e=t,void u(Object(P.o)("checked",!e.checked,e));var e},children:[Object(O.jsxs)("dl",{className:"flex p-2 overflow-hidden relative",children:[Object(O.jsx)("div",{className:"flex flex-auto",children:Object(O.jsx)(X,{title:s,checked:n})}),Object(O.jsx)(ee,{id:o})]}),r&&r.length>0&&Object(O.jsx)("div",{className:"\n                        rounded-br-lg rounded-bl-lg\n                        ".concat(n?"bg-lime-100":"bg-warmGray-100","\n                        p-1\n                    "),children:Object(O.jsx)(W,{labels:r,checked:n})}),n&&Object(O.jsxs)("div",{className:"flex justify-between items-center py-2 pr-4",children:[Object(O.jsx)($,{setTotal:m,price:i,id:o}),Object(O.jsx)(Y,{currency:a,price:i,checked:n}),Object(O.jsx)(Z,{currency:a,total:j})]})]})})),ne=function(){var e=Object(c.useContext)(A).insumos;return e&&0!==e.length?Object(O.jsx)("ul",{className:"",children:e.map((function(e,t){return Object(O.jsx)("li",{className:"mb-3",children:Object(O.jsx)(te,{insumo:e})},"".concat(e.title,"-").concat(t,"-").concat(Math.random))}))}):Object(O.jsx)("h1",{className:"font-bold text-2xl text-center text-warmGray-500",children:"Debe agregrar insumos :)"})},ce=function(e){var t=e.onSearch,n=e.placeholder;console.log("4 SEARCHER");var a=Object(c.useState)({search:""}),r=Object(l.a)(a,2),o=r[0],s=r[1],i=Object(c.useRef)();return Object(c.useEffect)((function(){i.current.focus()}),[]),Object(O.jsx)("form",{className:"h-12 flex-auto",onSubmit:function(e){e.preventDefault(),t(o.search.trim()),i.current.select()},children:Object(O.jsx)("input",{className:" h-full w-full rounded border border-solid border-warmGray-300 px-2 ",ref:i,type:"search",autoComplete:"off",placeholder:n,name:"search",onChange:function(e){var n=e.target;s(Object(x.a)(Object(x.a)({},o),{},Object(f.a)({},n.name,n.value))),Object(P.i)(n.value)&&t(n.value)},value:o.search})})},ae=a.a.memo((function(e){var t=e.toogleShowSearch,n=e.toogleShowFilter,a=e.openModal;console.log("6 MENU MOVIL");var r=Object(c.useContext)(A),o=r.selectingAllInsumos,s=r.unSelectingAllInsumos;return Object(O.jsxs)("div",{className:" grid grid-cols-5 fixed bottom-0 left-0 w-full h-16 bg-white border-t border-solid border-warmGray-300 shadow-inner ",children:[Object(O.jsx)("button",{className:"icon-checkmark text-lime-400 text-3xl",title:"Seleccionar todo",onClick:o}),Object(O.jsx)("button",{className:" icon-checkmark text-3xl text-warmGray-300 ",title:"Deseleccionar todo",onClick:s}),Object(O.jsx)("button",{className:"icon-search text-3xl text-rose-500",title:"Buscar",onClick:t}),Object(O.jsx)("button",{className:"icon-filter text-3xl text-blue-400",title:"Filtrar",onClick:n}),Object(O.jsx)("button",{className:" icon-plus text-3xl text-lime-600 ",title:"Agregar",onClick:a})]})})),re=function(e){var t=e.children,n=e.show,a=Object(c.useState)(!1),r=Object(l.a)(a,2),o=r[0],s=r[1],i=Object(c.useState)(!1),u=Object(l.a)(i,2),b=u[0],d=u[1];return Object(c.useEffect)((function(){n?(d(!0),setTimeout((function(){s(!0)}),200)):(s(!1),setTimeout((function(){d(!1)}),100))}),[n]),Object(O.jsx)("div",{className:"\n                fixed ".concat(b?"top-0":"top-full"," left-0 z-20\n                w-full h-full\n                ").concat(o?"bg-opacity-50":"bg-opacity-0"," bg-black\n                flex items-end justify-center\n                pt-8 px-4\n                duration-200\n            "),children:Object(O.jsx)("div",{className:" bg-white p-4 rounded-t-2xl w-full h-auto ",children:t})})},oe=n(14),se=n.n(oe),ie=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=Object(c.useState)(e),a=Object(l.a)(n,2),r=a[0],o=a[1],s=Object(c.useState)(!0),i=Object(l.a)(s,2),u=i[0],b=i[1],d=function(e){var t=e.target;o(Object(x.a)(Object(x.a)({},r),{},Object(f.a)({},t.name,t.value)))},j=function(){o(e)};return Object(c.useEffect)((function(){if(Object(P.i)(t))b(!1);else{var e=Object(P.p)(P.h,Object(P.k)((function(e){return Object(P.i)(Object(P.g)(e,r))}),t));b(e)}}),[r,t]),{formState:r,handleInputChange:d,resetForm:j,invalidForm:u}},le=function(e){var t=e.labels,n=void 0===t?[]:t,a=e.addLabels,r=Object(c.useRef)(),o=Object(c.useState)(""),s=Object(l.a)(o,2),i=s[0],u=s[1],b=Object(c.useState)(n),d=Object(l.a)(b,2),j=d[0],m=d[1];return Object(O.jsxs)("div",{className:" flex flex-wrap w-full min-h-16 pl-2 pt-2 pb-1 mb-4 border border-solid border-warmGray-300 rounded ",children:[j&&j.length>0&&Object(O.jsx)("div",{className:"flex flex-wrap",children:j.map((function(e,t){return Object(O.jsxs)("span",{className:" relative flex items-center text-warmGray-600 ",children:[Object(O.jsx)("span",{className:" rounded bg-warmGray-200 m-1 p-1 ",children:e},"".concat(e,"-").concat(t)),Object(O.jsx)("button",{className:" icon-cancel-circle absolute -top-1 -right-1 text-rose-300 "})]})}))}),Object(O.jsx)("input",{type:"text",className:"\n                    flex-auto\n                    pl-4\n                    min-h-12\n                    ".concat(j&&j.length>0&&"ml-3 mt-2","\n                "),ref:r,autoComplete:"off",placeholder:"Etiquetas con tab...",onKeyDown:function(e){e.stopPropagation(),"Tab"===e.code&&i&&(m((function(e){return[i].concat(Object(L.a)(e))})),a({target:{name:"labels",value:[i].concat(Object(L.a)(j))}}),r.current.focus(),u(""))},onChange:function(e){var t=e.target;u(t.value)},value:i})]})},ue={labels:[],title:"",price:0},be=function(e){var t=e.closeModal,n=Object(c.useRef)(null),a=H(),r=a.setNewInsumoInLocalDB,o=a.updateInsumoInLocalDB,s=Object(c.useContext)(A),i=s.addingNewInsumo,u=s.insumoToUpdate,b=s.updatingInsumoInContext,d=Object(c.useState)(Object(P.j)(u)),j=Object(l.a)(d,1)[0],m=ie(j?u:ue,["title"]),f=m.formState,x=m.handleInputChange,p=m.invalidForm,h=function(){var e=Object(z.a)(U.a.mark((function e(){var t,n,c,a,o;return U.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=Object(P.o)("currency","S/."),n=Object(P.o)("id",Math.random().toString(16).slice(2)),c=Object(P.o)("quantity",1),a=Object(P.o)("price",Number(f.price)),o=Object(P.a)(t,n,c,a)(f),i(o),e.next=8,r(o);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),g=function(){var e=Object(z.a)(U.a.mark((function e(){return U.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return b(f),e.next=3,o(f);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),v=function(){var e=Object(z.a)(U.a.mark((function e(n){return U.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n.preventDefault(),j?g():h(),t();case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(c.useLayoutEffect)((function(){n.current.focus()}),[]),Object(O.jsxs)(O.Fragment,{children:[Object(O.jsx)("h1",{className:" text-2xl font-normal text-warmGray-500 pt-2 mb-4 ",children:"Agregar nuevo insumo"}),Object(O.jsxs)("form",{className:" pt-4 pb-20 flex flex-col relative w-full h-full ",onSubmit:v,children:[Object(O.jsx)("input",{autoComplete:"off",ref:n,className:" w-full h-16 pl-2 mb-4 border border-solid border-warmGray-300 rounded ",placeholder:"Nombre",name:"title",value:f.title,onChange:x}),Object(O.jsx)("input",{autoComplete:"off",className:" w-full h-16 pl-2 mb-4 border border-solid border-warmGray-300 rounded ",type:"number",placeholder:"Precio",name:"price",value:f.price,onChange:x}),Object(O.jsx)(le,{labels:f.labels,addLabels:x}),Object(O.jsxs)("div",{className:" absolute bottom-0 left-0 w-full py-2 flex items-center justify-center ",children:[Object(O.jsx)("button",{className:" flex-auto py-4 px-2 mr-2 bg-rose-300 text-rose-800 font-bold ",type:"button",onClick:t,children:"Cancelar"}),Object(O.jsx)("button",{disabled:p,className:"\n                        flex-auto\n                        py-4 px-2 ml-2\n                        bg-lime-400\n                        text-lime-800 font-bold\n                        ".concat(p&&"opacity-30","\n                    "),children:"Guardar"})]})]})]})};be.propType={closeModal:se.a.func.isRequired,saveData:se.a.func.isRequired};var de=function(){var e=Object(c.useContext)(A),t=e.filteringInsumos,n=e.insumoToUpdate,a=e.searchingInsumos,r=e.setInsumoToUpdate,o=Object(c.useState)(!1),s=Object(l.a)(o,2),i=s[0],u=s[1],b=Object(c.useState)(!1),d=Object(l.a)(b,2),j=d[0],m=d[1],f=Object(c.useState)(!1),x=Object(l.a)(f,2),p=x[0],h=x[1],g=Object(c.useCallback)((function(){m((function(){return!1})),u((function(e){return!e}))}),[m,u]),v=Object(c.useCallback)((function(){u((function(){return!1})),m((function(e){return!e}))}),[u,m]),y=Object(c.useCallback)((function(){return h(!0)}),[h]),w=Object(c.useCallback)((function(){h(!1),r()}),[h]);return Object(c.useEffect)((function(){h(!Object(P.i)(n))}),[n]),Object(O.jsxs)(O.Fragment,{children:[Object(O.jsxs)("div",{className:"\n                    flex\n                    mb-4\n                    overflow-hidden\n                    ".concat(i||j?"max-h-20":"max-h-0","\n                    duration-300\n                "),children:[i&&Object(O.jsx)(ce,{onSearch:a,placeholder:"Buscar insumo"}),j&&Object(O.jsx)(ce,{onSearch:t,placeholder:"Filtrar insumo"})]}),Object(O.jsx)(ne,{}),Object(O.jsx)(ae,{toogleShowSearch:g,toogleShowFilter:v,openModal:y}),p&&Object(O.jsx)(re,{show:p,children:Object(O.jsx)(be,{closeModal:w})})]})},je=function(){console.log("2 PAGINA INSUMOS");var e=H(),t=e.insumos,n=e.loading,a=Object(c.useContext)(A).dispatch;return Object(c.useEffect)((function(){if(!n){var e=function(e){var t=j("selected-insumos");if(!t||0===t.length)return T(e);var n=Object(P.l)((function(e,n){var c=Object(P.e)(Object(P.c)("id",n.id),t);return Object(P.b)(!!c,(function(){return e.concat(c)}),(function(t){return e.concat(t)}),n)}),[],e);return T(n)}(t);a({type:"update-with-local-storage",payload:e})}}),[n]),Object(O.jsxs)("div",{className:"px-2 pb-20 mt-4 relative",children:[Object(O.jsx)(K,{title:"Insumos"}),n?Object(O.jsx)("h1",{children:"Cargando..."}):Object(O.jsx)(de,{})]})},me=function(){var e=Object(c.useContext)(A).selectedInsumos;return Object(O.jsxs)("div",{children:[Object(O.jsxs)("div",{className:"px-2 pb-20 mt-4 relative",children:[Object(O.jsx)(K,{title:"Lista de compras"}),Object(O.jsx)("ul",{className:"",children:e.map((function(e,t){return Object(O.jsx)("li",{className:"mb-3",children:Object(O.jsx)(te,{insumo:e})},"".concat(e.title,"-").concat(t,"-").concat(Math.random))}))})]}),Object(O.jsx)("h1",{children:"Estos son los insumos a comprar"}),Object(O.jsxs)("ul",{children:[Object(O.jsx)("li",{children:"Crear base de datos: lista de compras"}),Object(O.jsx)("li",{children:"Crear objeto lista de compras"}),Object(O.jsx)("li",{children:'Al modificar un isumo solo afecta al insumo del objeto "lista de compras"'}),Object(O.jsx)("li",{children:"Se puede modificar: cantidad y precios"}),Object(O.jsx)("li",{children:"Agregar estado para indicar si fue comprado o no"}),Object(O.jsx)("li",{children:"Cuando se compra alguno se habilita el boton de Compra parcial para generar una factura: los productos comprados no se muestran mas"}),Object(O.jsx)("li",{children:"Cuando se compras todos se habilita el boton de Compra para generar factura"})]})]})},fe=function(){return Object(O.jsx)("div",{children:"Aqui se muestran todas las compras realizadas incluyendo las parciales"})},xe=function(){return Object(O.jsxs)(D,{children:[Object(O.jsx)(E,{}),Object(O.jsx)("div",{children:Object(O.jsxs)(y.d,{children:[Object(O.jsx)(y.b,{exact:!0,path:G,children:Object(O.jsx)(fe,{})}),Object(O.jsx)(y.b,{exact:!0,path:"/lista-de-compras",children:Object(O.jsx)(me,{})}),Object(O.jsx)(y.b,{exact:!0,path:k,children:Object(O.jsx)(je,{})}),Object(O.jsx)(y.a,{to:G})]})})]})},pe=function(){var e=Object(c.useContext)(i).dispatch,t=Object(y.g)(),n=ie({email:"",password:""},["email","password"]),a=n.formState,r=n.handleInputChange,o=n.invalidForm;return Object(O.jsx)("div",{className:" flex items-center justify-center h-screen ",children:Object(O.jsxs)("form",{className:" flex flex-col py-6 px-4 mx-4 w-full border border-solid border-warmGray-200 rounded-xl shadow-lg ",onSubmit:function(n){n.preventDefault(),e({type:b,payload:a}),t.replace(k)},children:[Object(O.jsx)("h1",{className:" text-4xl font-semibold text-lime-500 text-center pb-4 mb-2 ",children:"MercApp 2"}),Object(O.jsx)("input",{required:!0,className:" w-full h-16 border border-solid border-warmGray-200 rounded pl-4 pr-2 mb-4 ",placeholder:"Introduzca su correo",type:"email",name:"email",value:a.email,onChange:r}),Object(O.jsx)("input",{required:!0,className:" w-full h-16 border border-solid border-warmGray-200 rounded pl-4 pr-2 mb-4 ",placeholder:"Introduzca su contrasena",type:"password",name:"password",maxLength:16,minLength:6,value:a.password,onChange:r}),Object(O.jsx)("button",{disabled:o,className:"\n                        w-full h-16\n                        bg-lime-200\n                        text-lime-700 text-xl\n                        rounded\n                        ".concat(o&&"opacity-30","\n                    "),children:"Inicia sesion"}),Object(O.jsx)(v.b,{className:" bg-warmGray-100 text-center text-warmGray-700 py-2 mt-4 ",to:S,children:"Registrarme"})]})})},Oe=function(){return Object(O.jsxs)("div",{children:[Object(O.jsx)("h1",{children:"Pagina para Registro usuario"}),Object(O.jsx)("button",{type:"button",children:"Registrate"}),Object(O.jsx)(v.b,{to:I,children:"Inicar sesion"})]})},he=function(){console.log("1 MAIN");var e=Object(c.useContext)(i).user;return Object(O.jsx)("div",{className:"font-poppins",children:Object(O.jsx)(v.a,{children:Object(O.jsxs)(y.d,{children:[Object(O.jsx)(y.b,{exact:!0,path:I,component:function(t){return e.logged?Object(O.jsx)(y.a,{to:"/"}):Object(O.jsx)(pe,{props:t})}}),Object(O.jsx)(y.b,{exact:!0,path:S,component:function(t){return e.logged?Object(O.jsx)(y.a,{to:"/"}):Object(O.jsx)(Oe,{props:t})}}),Object(O.jsx)(C,{path:"/",isAuthenticated:e.logged,components:xe})]})})})},ge=function(){return Object(O.jsx)(g,{children:Object(O.jsx)(he,{})})};o.a.render(Object(O.jsx)(a.a.StrictMode,{children:Object(O.jsx)(ge,{})}),document.getElementById("root")),s()}},[[43,1,2]]]);
//# sourceMappingURL=main.6a957d53.chunk.js.map