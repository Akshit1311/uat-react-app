/*! For license information please see 13.2817d703.chunk.js.LICENSE.txt */
(this["webpackJsonpinvest-india"]=this["webpackJsonpinvest-india"]||[]).push([[13],{270:function(t,e,r){"use strict";r.r(e);var n,o,a=r(10),c=r(67),i=r(4),s=r(15),u=r(48),l=r(20),h=r.n(l),d=r(1),f=r.n(d),p=r(13),v=r(108),m=r.n(v),b=r(19),y=r(122),j=r(17),g=r(24),x=r(66),O=r(107),w=(r(320),r(140)),L=r(2);function N(){N=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n=Object.defineProperty||function(t,e,r){t[e]=r.value},o="function"==typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",c=o.asyncIterator||"@@asyncIterator",i=o.toStringTag||"@@toStringTag";function s(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(S){s=function(t,e,r){return t[e]=r}}function u(t,e,r,o){var a=e&&e.prototype instanceof d?e:d,c=Object.create(a.prototype),i=new E(o||[]);return n(c,"_invoke",{value:x(t,r,i)}),c}function l(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(S){return{type:"throw",arg:S}}}t.wrap=u;var h={};function d(){}function f(){}function p(){}var v={};s(v,a,(function(){return this}));var m=Object.getPrototypeOf,b=m&&m(m(C([])));b&&b!==e&&r.call(b,a)&&(v=b);var y=p.prototype=d.prototype=Object.create(v);function j(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function g(t,e){function o(n,a,c,i){var s=l(t[n],t,a);if("throw"!==s.type){var u=s.arg,h=u.value;return h&&"object"==typeof h&&r.call(h,"__await")?e.resolve(h.__await).then((function(t){o("next",t,c,i)}),(function(t){o("throw",t,c,i)})):e.resolve(h).then((function(t){u.value=t,c(u)}),(function(t){return o("throw",t,c,i)}))}i(s.arg)}var a;n(this,"_invoke",{value:function(t,r){function n(){return new e((function(e,n){o(t,r,e,n)}))}return a=a?a.then(n,n):n()}})}function x(t,e,r){var n="suspendedStart";return function(o,a){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw a;return k()}for(r.method=o,r.arg=a;;){var c=r.delegate;if(c){var i=O(c,r);if(i){if(i===h)continue;return i}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var s=l(t,e,r);if("normal"===s.type){if(n=r.done?"completed":"suspendedYield",s.arg===h)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(n="completed",r.method="throw",r.arg=s.arg)}}}function O(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,O(t,e),"throw"===e.method))return h;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return h}var n=l(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,h;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,h):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,h)}function w(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function L(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function E(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(w,this),this.reset(!0)}function C(t){if(t){var e=t[a];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:k}}function k(){return{value:void 0,done:!0}}return f.prototype=p,n(y,"constructor",{value:p,configurable:!0}),n(p,"constructor",{value:f,configurable:!0}),f.displayName=s(p,i,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===f||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,p):(t.__proto__=p,s(t,i,"GeneratorFunction")),t.prototype=Object.create(y),t},t.awrap=function(t){return{__await:t}},j(g.prototype),s(g.prototype,c,(function(){return this})),t.AsyncIterator=g,t.async=function(e,r,n,o,a){void 0===a&&(a=Promise);var c=new g(u(e,r,n,o),a);return t.isGeneratorFunction(r)?c:c.next().then((function(t){return t.done?t.value:c.next()}))},j(y),s(y,i,"Generator"),s(y,a,(function(){return this})),s(y,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},t.values=C,E.prototype={constructor:E,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(L),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return c.type="throw",c.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],c=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var i=r.call(a,"catchLoc"),s=r.call(a,"finallyLoc");if(i&&s){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(i){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var c=a?a.completion:{};return c.type=t,c.arg=e,a?(this.method="next",this.next=a.finallyLoc,h):this.complete(c)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),h},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),L(r),h}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;L(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:C(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),h}},t}var E=Object(u.css)(n||(n=Object(s.a)(["\n  display: block;\n  margin: 0 auto;\n  border-color: red;\n"]))),C=b.c.div(o||(o=Object(s.a)(["\n  border-radius: 4px;\n  height: 76px;\n  top: 43px;\n  background-color: ",";\n  border: 2px solid ",";\n  color: ",";\n  transition: 0.5s color;\n  @media (max-width: 768px) {\n    border: none;\n    background-color: "," !important;\n    color: "," !important;\n    height: 82px;\n    font-weight: ",";\n  }\n"])),(function(t){return t.active?Object(g.a)(t.colorTheme):t.theme.bgCards}),(function(t){return t.borderColor}),(function(t){return t.active?"white":t.theme.color}),(function(t){return t.active,"rgba(255,255,255,0)"}),(function(t){return t.active?t.theme.color:""}),(function(t){return t.active?"600":"500"})),k=function(t){var e=t.activeCard,r=t.name,n=t.acc,o=t.state,a=t.borderColor,c=t.handleCardClick,s=t.accessor,u=t.loading,l=t.colorTheme,h=Object(O.a)(),f=Object(i.a)(h,2),p=f[0],v=(f[1],Object(d.useState)(0)),b=Object(i.a)(v,2),y=b[0],x=b[1],w=r===e,N=Object(d.useContext)(j.d);return Object(d.useEffect)((function(){var t,e,n=o[s||r.slice(0,-1)];return 0===n&&x(0),n&&n>y?(y<n?t=setInterval((function(){x((function(t){return t===Number(n)||t>Number(n)?n:n>1e3?t+1e3:n<1e3&&n>500?t+200:t+1}))}),1):y===n&&clearInterval(t),function(){return clearInterval(t)}):n&&n<y?(y>n?e=setInterval((function(){x((function(t){return t===Number(n)||t<Number(n)?n:y-n>1e4?t-500:y-n>5e3?t-200:y-n>1e3?t-100:t-1}))}),1):y===n&&clearInterval(e),function(){return clearInterval(e)}):void 0}),[o,u]),Object(L.jsxs)(C,{colorTheme:l,onClick:function(){return c(r,n)},active:w,borderColor:a,className:"col-md count-single-card p-0 w-100",children:[u?Object(L.jsx)("div",{className:"w-100 h-100 d-flex justify-content-center align-items-center",children:Object(L.jsx)(m.a,{color:w?"white":Object(g.a)(l),loading:!0,size:"25px",css:E})}):Object(L.jsx)(L.Fragment,{}),!u&&Object(L.jsxs)("div",{className:" d-flex flex-column h-100 justify-content-between",style:{padding:"0.83rem",alignItems:"start"},children:[Object(L.jsx)("h4",{className:"m-0 p-0 count-number",style:{color:w?"":N.color,visibility:p>768||w?"visible":"hidden"},children:0===y?"-":y}),Object(L.jsxs)("div",{children:[Object(L.jsx)("h6",{style:{color:w?p<768?Object(g.a)(l):"":N.color},className:"mx-0 mb-0 p-0",children:r}),Object(L.jsx)("div",{className:"count-underline d-block d-sm-none",style:{visibility:w?"visible":"hidden",background:Object(g.a)(l)}})]})]})]})},S=function(t){var e,r=t.selectedArea,n=t.countResource,o=t.applyRoles,s=t.setStateViewMap,u=t.activeCard,l=t.setActiveCard,f=t.startupType,v=Object(d.useContext)(j.d),m=Object(p.f)(),b=(n.getCounts,n.colorTheme),g=n.countLoading,O=n.setPrimaryColorTheme,E=n.setSelectedArea,C=(n.tableState,n.selectedStateByMap,n.setSelectedStateByMap),S=n.appliedFilters,I=n.startupCount,T=Object(d.useState)(new y.a),_=Object(i.a)(T,2),A=_[0],F=_[1],G=Object(x.a)(),P=function(){var t=Object(c.a)(N().mark((function t(){var r,n,o;return N().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return"undefined"!=typeof e&&e.cancel("Operation canceled due to new request."),e=h.a.CancelToken.source(),t.prev=2,t.next=5,h.a.post("".concat("https://uat.startupindia.gov.in/maps","/home/topNumbers"),Object(a.a)(Object(a.a)({},S),{},{stateId:S.states[0],from:S.registrationFrom,to:S.registrationTo,roles:["Startup","Mentor","Investor","GovernmentBody","Incubator","Accelerator"]}),{cancelToken:e.token});case 5:r=t.sent,n=r.data,o=new y.a,Object.keys(n).forEach((function(t){"0"!==(null===f||void 0===f?void 0:f.index)&&"Startup"===t?o[t]=I:o[t]=n[t]})),F(o),t.next=14;break;case 12:t.prev=12,t.t0=t.catch(2);case 14:case"end":return t.stop()}}),t,null,[[2,12]])})));return function(){return t.apply(this,arguments)}}();Object(d.useEffect)((function(){var t=setTimeout((function(){P()}),100);return function(){clearTimeout(t)}}),[S,I]),Object(d.useEffect)((function(){"1"!==(null===f||void 0===f?void 0:f.index)&&"Startups"!==u&&B("Startups","Startup")}),[f]),Object(d.useEffect)((function(){var t=Object(a.a)({},A);t.Startup=I,F(t)}),[I]);var B=function(t,e){o(e,t),l(t),O(function(t){var e=t.toLowerCase();return"startups"===e?"theme-1":"mentors"===e?"theme-3":"incubators"===e?"theme-4":"investors"===e?"theme-5":"accelerators"===e?"theme-6":"institutions"===e?"theme-7":void 0}(t))},M={activeCard:u,handleCardClick:B,state:A,loading:g,colorTheme:b},D=G.get("state"),z="india"!==D||D?D:null;return Object(L.jsxs)("div",{className:"container-fluid count-block-styles px-0 mx-0",children:[Object(L.jsx)("div",{className:"row mx-0 px-0",children:Object(L.jsxs)("div",{className:"d-flex mt-3 px-0 align-items-baseline",children:[Object(L.jsx)(w.a,{active:z,colorTheme:b,onClick:function(){z&&(E({id:"india",stateName:"India"}),C({id:"",name:""}),s(!1),m.push("/startup-india-maps/maps/"))},className:"mb-3 ".concat(z?"text-theme":""),children:"India"}),z&&"India"!=r.stateName?Object(L.jsx)(L.Fragment,{children:Object(L.jsxs)("div",{className:"d-flex ms-2 align-items-center",children:[Object(L.jsx)("p",{style:{color:v.color},className:"m-0 p-0 font-12px",children:">"}),Object(L.jsx)("p",{style:{color:v.color},className:"p-0 m-0 state-label ms-2",children:r.stateName})]})}):Object(L.jsx)(L.Fragment,{})]})}),Object(L.jsxs)("div",{className:"d-inline-flex count-div horizontal-scroll",children:[Object(L.jsx)(k,Object(a.a)(Object(a.a)({},M),{},{borderColor:"#0177FA",accessor:"Startup",name:"Startups",acc:"Startup"})),Object(L.jsx)(k,Object(a.a)(Object(a.a)({},M),{},{borderColor:"#ED8E00",accessor:"Mentor",acc:"Mentor",name:"Mentors"})),Object(L.jsx)(k,Object(a.a)(Object(a.a)({},M),{},{borderColor:"#7838e0",name:"Incubators",acc:"Incubator"})),Object(L.jsx)(k,Object(a.a)(Object(a.a)({},M),{},{borderColor:"#BDAA00",name:"Investors",acc:"Investor"})),Object(L.jsx)(k,Object(a.a)(Object(a.a)({},M),{},{borderColor:"#CB3535",name:"Accelerators",acc:"Accelerator"})),Object(L.jsx)(k,Object(a.a)(Object(a.a)({},M),{},{borderColor:"#00AD11",accessor:"GovernmentBody",acc:"GovernmentBody",name:"Institutions"}))]})]})};e.default=f.a.memo(S)},320:function(t,e,r){}}]);
//# sourceMappingURL=13.2817d703.chunk.js.map