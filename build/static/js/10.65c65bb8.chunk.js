(this["webpackJsonpinvest-india"]=this["webpackJsonpinvest-india"]||[]).push([[10],{272:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return C}));var r=a(4),c=a(1),n=a.n(c),s=a(111),o=a(10),i=a(316),l=a(313),d=a(95),u=a.n(d),b=a(96),j=a.n(b),h=a(17),p=a(312),f=a(308),m=a(2),O=function(e){var t=e.columns,a=e.bodyData,s=e.noOfItemsToRender,d=(e.loop,e.mentorsTable),b=Object(r.a)(e.searchObj,2),O=b[0],x=b[1],g=Object(c.useState)([]),v=Object(r.a)(g,2),y=v[0],C=v[1],w=Object(c.useState)([]),T=Object(r.a)(w,2),N=T[0],S=T[1],k=Object(c.useState)(100),B=Object(r.a)(k,2),R=B[0],H=B[1],W=Object(c.useContext)(h.d),P=Object(i.useTable)({columns:t,data:N},i.useSortBy),L=P.getTableProps,z=P.getTableBodyProps,M=P.headerGroups,D=P.rows,E=P.prepareRow,G=n.a.useMemo((function(){return y}),[y]);function J(e){return 0===e&&d?"header-cell-state-2":0!==e||d?0!==e&&d?"header-cell-2 w-50":0===e||d?void 0:"header-cell w-50":"header-cell-state w-50"}return Object(c.useEffect)((function(){var e=[];a.forEach((function(t){t.district&&t.district.length>3&&e.push(t)})),C(a),S(a),s&&H(s)}),[a]),Object(m.jsxs)("div",{className:"data-table-overflow-scroll",children:[Object(m.jsxs)("table",Object(o.a)(Object(o.a)({},L()),{},{className:"w-100",children:[Object(m.jsx)("thead",{className:"w-100 py-5 ",children:M.map((function(e){return Object(m.jsx)(f.d,Object(o.a)(Object(o.a)({},e.getHeaderGroupProps()),{},{className:"d-flex flex-row ".concat(W.dataTable.headerBorder),children:e.headers.map((function(e,t){return Object(m.jsx)(p.a,Object(o.a)(Object(o.a)(Object(o.a)({},e.getSortByToggleProps()),{},{cellClass:J(t)},e.getHeaderProps()),{},{borderWidth:0===t?"0px":"1px",fontWeight:!0,borderColor:"#e5e5e5",borderHeight:"48px",children:Object(m.jsxs)("div",Object(o.a)(Object(o.a)({},e.getSortByToggleProps()),{},{className:"d-flex align-items-center w-100",children:[Object(m.jsx)("div",{children:0===t||"seed fund startups"===e.render("Header").toLowerCase()?e.render("Header"):e.render("Header").split(" ").map((function(e){return Object(m.jsx)("div",{children:e})}))}),Object(m.jsx)("div",{children:e.isSorted?e.isSortedDesc?Object(m.jsx)(u.a,{fontSize:"small"}):Object(m.jsx)(j.a,{fontSize:"small"}):Object(m.jsxs)("span",{className:"d-flex flex-column p-0",children:[Object(m.jsx)(j.a,{fontSize:"small",style:{marginBottom:"-7px"}}),Object(m.jsx)(u.a,{fontSize:"small",style:{marginTop:"-7px"}})]})})]}))}))}))}))}))}),Object(m.jsx)("div",{className:"mt-3 mb-2",style:{maxWidth:"21rem",visibility:e.search?"visible":"hidden"},children:Object(m.jsx)(l.a,{background:W.dataTable.searchBg,borderRadius:"4px",onChange:x,value:O,placeholderClass:"search-bar-placeholder-data-table ".concat(W.dataTable.inputClass),inputClass:"".concat(W.dataTable.searchBorderClass," radius-5 me-3")})}),Object(m.jsx)("tbody",Object(o.a)(Object(o.a)({},z()),{},{children:D.slice(0,R).map((function(e){return E(e),Object(m.jsx)("tr",Object(o.a)(Object(o.a)({},e.getRowProps()),{},{className:"d-flex bg-white mt-2 flex-row justify-content-between radius-5 w-100 ".concat(W.dataTable.bodyClass),children:e.cells.map((function(e,t){return Object(m.jsx)(m.Fragment,{children:Object(m.jsx)(p.a,Object(o.a)(Object(o.a)({},e.getCellProps()),{},{maxWidth:"auto",cellClass:J(t),borderHeight:"2.5rem",borderWidth:0!==t?"1px":"0px",fontWeight:0===t,borderColor:"#e5e5e5",textRight:!0,children:e.render("Cell")}))})}))}))}))}))]})),Object(m.jsx)("div",{style:{visibility:N.length!==G.length?"visible":"hidden"},className:"my-4 data-table-view-more-button text-theme",onClick:function(){var e=R+8;if(e>G.length)return H(G.length),void S(G);H(e)},children:"View More"})]})},x=["Startup"];function g(e){var t=Object(c.useMemo)((function(){return[{Header:"District",accessor:"district"},{Header:e.startupType.text||"All Startup",accessor:"statistics."+s.a[e.startupType.text]}]}),[e.startupType]);return Object(m.jsx)("div",{className:"col-4 mx-0 px-2",children:Object(m.jsx)(O,{columns:t,bodyData:e.data||[],loop:x,searchObj:e.searchObj,search:e.search,mentorsTable:!1})})}var v=a(34),y=a.n(v);function C(e){var t=Object(c.useState)([]),a=Object(r.a)(t,2),n=a[0],s=a[1],o=Object(c.useState)([]),i=Object(r.a)(o,2),l=i[0],d=i[1],u=Object(c.useState)(""),b=Object(r.a)(u,2),j=b[0],h=(b[1],function(e){var t=y.a.chunk(e,Math.floor(e.length/3));return t[3]&&(t[0]=t[0].concat(t[3])),t}),p=function(e){if(0===e.length)return s(h(l));var t=l.filter((function(t){if(t.district&&e)return t.district.toLowerCase().includes(e.toLowerCase())}));t.length<3?s([t,[],[]]):s(h(t))};return Object(c.useEffect)((function(){e.data&&e.data.length?(d(e.data),s(h(e.data))):e.fetch()}),[e.data]),Object(m.jsx)("div",{className:"ms-3",children:Object(m.jsxs)("div",{className:"w-100 row",children:[Object(m.jsx)(g,{search:!0,data:n[0],searchObj:[j,p],startupType:e.startupType}),Object(m.jsx)(g,{search:!1,data:n[1],searchObj:[j,p],startupType:e.startupType}),Object(m.jsx)(g,{search:!1,data:n[2],searchObj:[j,p],startupType:e.startupType})]})})}},308:function(e,t,a){"use strict";a.d(t,"d",(function(){return l})),a.d(t,"c",(function(){return d})),a.d(t,"a",(function(){return u})),a.d(t,"b",(function(){return b}));var r,c,n,s,o=a(15),i=a(19),l=i.c.tr(r||(r=Object(o.a)(["\n  background: ",";\n  color: ",";\n  overflow: hidden;\n  width: 100%;\n"])),(function(e){return e.theme.bgCards}),(function(e){return e.theme.colorCards})),d=i.c.th(c||(c=Object(o.a)(["\n  background: ",";\n  color: ",";\n  position: relative;\n"])),(function(e){return e.theme.bgCards}),(function(e){return e.theme.colorCards})),u=i.c.span(n||(n=Object(o.a)(["\n  background: ",";\n  border-radius: 4px;\n  padding-left: 1.3rem !important;\n  color: ",";\n"])),(function(e){return e.theme.searchBg}),(function(e){return e.theme.color})),b=i.c.input(s||(s=Object(o.a)(["\nbackground: ",";\nborder-radius: 4px;\nborder: 0px;\ncolor: "," !important;\nfont-family: Montserrat !important;\nfont-Size: 14px !important;\n"])),(function(e){return e.theme.searchBg}),(function(e){return e.theme.color}))},312:function(e,t,a){"use strict";var r=a(1),c=a(17),n=a(308),s=a(2);t.a=function(e){var t=e.children,a=e.borderWidth,o=(e.borderStyle,e.borderColor),i=(e.background,e.borderHeight),l=e.fontWeight,d=e.cellClass,u=(e.maxWidth,e.onClick),b=e.textRight,j=Object(r.useContext)(c.d),h=a||"0.1rem",p=o||j.dataTable.dashedBorder,f="".concat(h," ").concat("solid"," ").concat(p);return Object(s.jsxs)(n.c,{onClick:u,className:d,children:[Object(s.jsx)("div",{style:{minHeight:i||"63px",borderLeft:f,position:"absolute"}}),Object(s.jsx)("div",{style:{minHeight:i||"43px"},className:"d-flex h-100 ".concat(b&&!l?"justify-content-end":""),children:Object(s.jsx)("p",{className:"my-0 p-0 d-flex align-items-center font-mont-data-table pe-3",style:{marginLeft:"0.8rem",color:j.dataTable.textColor,fontWeight:l?700:500},children:t})})]})}},313:function(e,t,a){"use strict";a.d(t,"a",(function(){return l}));var r=a(4),c=a(110),n=a(1),s=a(17),o=a(308),i=(a(162),a(2));function l(e){var t=e.background,a=e.borderRadius,l=e.placeholderClass,d=e.inputClass,u=e.onChange,b=(e.value,e.placeholder),j=(Object(n.useContext)(s.d),Object(n.useState)()),h=Object(r.a)(j,2),p=h[0],f=h[1],m=a||"0px",O=t||"#f8f8f8";return Object(n.useEffect)((function(){var e;return""!==p&&void 0!==p?e=setTimeout((function(){u(p)}),100):(clearTimeout(e),u("")),function(){return clearTimeout(e)}}),[p]),Object(i.jsx)("div",{className:"mt-3 mb-2",style:{maxWidth:"22rem"},children:Object(i.jsx)("div",{className:"row d-flex flex-row justify-content-center align-items-center search-bar-comman-component m-0",children:Object(i.jsx)("div",{className:"search input-group px-0 d-flex flex-nowrap",style:{borderTopLeftRadius:m,borderBottomLeftRadius:m},children:Object(i.jsxs)("div",{className:"d-flex w-60 ".concat(d),children:[Object(i.jsx)(o.a,{className:"btn search-icon",style:{background:O},children:Object(i.jsx)(c.a,{style:{marginTop:"-2px"}})}),Object(i.jsx)(o.b,{type:"text",className:"form-control me-3 px-0 search-input shadow-none search-bar-placeholder ".concat(l),placeholder:b||"Search",style:{background:O,color:"black",borderTopRightRadius:m,borderBottomRightRadius:m},onChange:function(e){return f(e.target.value)},value:p})]})})})})}}}]);
//# sourceMappingURL=10.65c65bb8.chunk.js.map