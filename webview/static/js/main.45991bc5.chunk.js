(this.webpackJsonpvscode_regedit_react_ui=this.webpackJsonpvscode_regedit_react_ui||[]).push([[0],{276:function(e,n,t){},483:function(e,n,t){},484:function(e,n,t){"use strict";t.r(n);var a=t(4),r=t(0),c=t.n(r),o=t(53),l=t.n(o),i=(t(276),t(12)),u=t(23),s=t(24),d=t(499),b=t(498),j=t(253),O=t(494),v="undefined"!==typeof acquireVsCodeApi?acquireVsCodeApi():null;function p(){var e=Object(u.a)(["\n  margin-top: 5px;\n"]);return p=function(){return e},e}var f=Object(s.a)(O.a)(p());var h=function(){var e=Object(b.a)().t,n=Object(r.useState)(""),t=Object(i.a)(n,2),c=t[0],o=t[1],l=Object(r.useCallback)((function(e){var n=function(e){v.setState({address:e}),v.postMessage({command:"setTitle",title:e.replace(/^.*\\/,"")}),o(e)},t=e.data;switch(t.command){case"setKeyValues":n(t.key);break;case"setKeyTreeAndValues":n(t.retrievedKey)}}),[]),u=Object(r.useCallback)((function(e){var n=e.trim();return(n=(n=(n=(n=(n=(n=n.replace(/^Computer\\/i,"")).replace(/^HKCR(\\|$)/i,"HKEY_CLASSES_ROOT$1")).replace(/^HKCU(\\|$)/i,"HKEY_CURRENT_USER$1")).replace(/^HKLM(\\|$)/i,"HKEY_LOCAL_MACHINE$1")).replace(/^HKU(\\|$)/i,"HKEY_USERS$1")).replace(/^HKCC(\\|$)/i,"HKEY_CURRENT_CONFIG$1")).match(/^(HKEY_CLASSES_ROOT|HKEY_CURRENT_USER|HKEY_LOCAL_MACHINE|HKEY_USERS|HKEY_CURRENT_CONFIG)(\\|$)/i)?n=(n=n.replace(/\\+$/,"")).replace(/\\{2,}/g,"\\"):null}),[]);return Object(d.a)("message",l),Object(a.jsx)(f,{value:c,onChange:function(e){return o(e)},onKeyDown:function(n){if("Enter"===n.key){var t=u(c);t?v.postMessage({command:"getKeyTreeAndValues",key:t}):v.postMessage({command:"alert",text:e("addressBar.invalidRegistryPath")})}},placeholder:e("addressBar.registryPath")})},y=t(109),E=t(70),m=t(100),g=t(68),_=t(46),x=t(500),R=t(493),C=t(56),k=t(495);function S(){var e=Object(u.a)(["\n  .rs-tree-node-label-content {\n    // No word wrapping for long names.\n    white-space: nowrap;\n  }\n\n  .ReactVirtualized__Grid {\n    // Allow to scroll horizontally.\n    overflow: auto !important;\n  }\n\n  .ReactVirtualized__Grid__innerScrollContainer {\n    // Allow to scroll horizontally.\n    position: unset !important;\n  }\n\n  .rs-tree-nodes {\n    // Fix resizing.\n    height: 100%;\n  }\n\n  .rs-tree-node-label-content {\n    // Remove padding, move it to child div for mouse events (see below).\n    padding: 0 !important;\n  }\n\n  .rs-tree-node-label-content > div {\n    // Steal padding from the parent for mouse events (see above).\n    padding: 6px 12px 6px 8px;\n  }\n"]);return S=function(){return e},e}function K(){var e=Object(u.a)(["\n  visibility: ",";\n  opacity: ",";\n  transition: visibility 0s, opacity 0.5s linear;\n  position: absolute !important;\n  right: 20px;\n  bottom: 20px;\n  z-index: 1;\n"]);return K=function(){return e},e}var w=Object(s.a)(x.a)(K(),(function(e){return e.$visible?"visible":"hidden"}),(function(e){return e.$visible?1:0}));function M(e){var n=Object(b.a)().t,t=Object(r.useState)(!1),c=Object(i.a)(t,2),o=c[0],l=c[1],u=Object(r.useState)(""),s=Object(i.a)(u,2),d=s[0],j=s[1],p=function(e){return""!==e&&!e.includes("\\")},f=function(){v.postMessage({command:"createKey",key:e.currentRegKey+"\\"+d})};return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)(w,{onClick:function(){j(""),l(!0)},icon:Object(a.jsx)(g.a,{icon:_.d}),color:"blue",circle:!0,$visible:e.hovered&&!o}),Object(a.jsxs)(R.a,{backdrop:!0,size:"xs",open:o,onClose:function(){return l(!1)},onClick:function(e){return e.stopPropagation()},onDoubleClick:function(e){return e.stopPropagation()},onMouseDown:function(e){return e.stopPropagation()},onMouseUp:function(e){return e.stopPropagation()},children:[Object(a.jsx)(R.a.Title,{children:n("keysTreeView.newKeyModal.title")}),Object(a.jsx)(R.a.Body,{children:Object(a.jsx)(O.a,{value:d,onChange:function(e){return j(e)},onKeyDown:function(e){"Enter"===e.key&&p(d)&&(f(),l(!1))},placeholder:n("keysTreeView.newKeyModal.newKeyName")})}),Object(a.jsxs)(R.a.Footer,{children:[Object(a.jsx)(C.a,{onClick:function(){f(),l(!1)},appearance:"primary",disabled:!p(d),children:n("keysTreeView.newKeyModal.create")}),Object(a.jsx)(C.a,{onClick:function(){return l(!1)},appearance:"subtle",children:n("keysTreeView.newKeyModal.cancel")})]})]})]})}var D=s.a.div(S());function L(e){var n=e.nodeLabel,t=e.nodeRegKey,c=e.nodeIsSelected,o=Object(E.a)(e,["nodeLabel","nodeRegKey","nodeIsSelected"]),l=Object(b.a)().t,u=Object(r.useState)(null),s=Object(i.a)(u,2),d=s[0],j=s[1],p=function(){var e=d;""!==e&&e!==n&&v.postMessage({command:"renameKey",key:t,newSubKey:e})},f=Object(r.useState)(!1),h=Object(i.a)(f,2),y=h[0],m=h[1];return Object(a.jsxs)("div",{onClick:function(){c&&t.includes("\\")&&j(n)},onMouseDown:function(e){1===e.button&&t.includes("\\")&&(m(!0),e.preventDefault())},children:[null!==d?Object(a.jsx)(O.a,{size:"xs",autoFocus:!0,value:d,onChange:function(e){return j(e)},onKeyDown:function(e){"Enter"===e.key?(j(null),p()):"Escape"===e.key&&j(null)},placeholder:l("keysTreeView.keyName"),onBlur:function(){j(null),p()}}):o.children,Object(a.jsxs)(R.a,{backdrop:!0,size:"xs",open:y,onClose:function(){return m(!1)},onClick:function(e){return e.stopPropagation()},onDoubleClick:function(e){return e.stopPropagation()},onMouseDown:function(e){return e.stopPropagation()},onMouseUp:function(e){return e.stopPropagation()},children:[Object(a.jsx)(R.a.Title,{children:l("keysTreeView.confirmDeleteKeyModal.title")}),Object(a.jsx)(R.a.Body,{children:l("keysTreeView.confirmDeleteKeyModal.text",{key:n})}),Object(a.jsxs)(R.a.Footer,{children:[Object(a.jsx)(C.a,{onClick:function(){v.postMessage({command:"deleteKey",key:t}),m(!1)},appearance:"primary",children:l("global.yes")}),Object(a.jsx)(C.a,{onClick:function(){return m(!1)},appearance:"subtle",children:l("global.no")})]})]})]})}var N=function(){var e=Object(b.a)().t,n=Object(r.useState)(0),t=Object(i.a)(n,2),c=t[0],o=t[1],l=Object(r.useState)([{label:"Computer",value:"",children:[{label:"HKEY_CLASSES_ROOT",value:"HKEY_CLASSES_ROOT",children:[]},{label:"HKEY_CURRENT_USER",value:"HKEY_CURRENT_USER",children:[]},{label:"HKEY_LOCAL_MACHINE",value:"HKEY_LOCAL_MACHINE",children:[]},{label:"HKEY_USERS",value:"HKEY_USERS",children:[]},{label:"HKEY_CURRENT_CONFIG",value:"HKEY_CURRENT_CONFIG",children:[]}]}]),u=Object(i.a)(l,2),s=u[0],j=u[1],O=Object(r.useState)(""),p=Object(i.a)(O,2),f=p[0],h=p[1],E=Object(r.useState)(null),g=Object(i.a)(E,2),_=g[0],x=g[1],R=Object(r.useCallback)((function(e){var n=[{label:"Computer",value:"",children:[{label:"HKEY_CLASSES_ROOT",value:"HKEY_CLASSES_ROOT",children:[]},{label:"HKEY_CURRENT_USER",value:"HKEY_CURRENT_USER",children:[]},{label:"HKEY_LOCAL_MACHINE",value:"HKEY_LOCAL_MACHINE",children:[]},{label:"HKEY_USERS",value:"HKEY_USERS",children:[]},{label:"HKEY_CURRENT_CONFIG",value:"HKEY_CURRENT_CONFIG",children:[]}]}];if(e.tree.length>0){var t=function e(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";return n.map((function(n){return{label:n.name,value:t+n.name,children:e(n.children,t+n.name+"\\")}}))}(e.tree),a=t[0].value,r=t[0].children;n[0].children.find((function(e){return e.value===a})).children=r}j(n),h(e.retrievedKey),o(c+1)}),[c]),C=Object(r.useCallback)((function(e){if(!_)throw new Error("Got unexpected data for ".concat(e.key));if(e.key!==_.key)throw new Error("Expected data for ".concat(_.key,", got data for ").concat(e.key));if(e.subKeys.length>0){var n=e.subKeys.map((function(n){return{label:n,value:e.key+"\\"+n,children:[]}}));_.resolve(n)}else _.resolve();x(null)}),[_]),S=Object(r.useCallback)((function(e){var n=e.key,t=function e(t){var a,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",c=[],o=!1,l=Object(y.a)(t);try{for(l.s();!(a=l.n()).done;){var i=a.value;if(i.value===n)o=!0;else if(""===i.value||n.startsWith(i.value+"\\")){o=!0,c.push(Object.assign({},i,{children:e(i.children,i.value)}));continue}c.push(i)}}catch(s){l.e(s)}finally{l.f()}if(!o&&""!==r){var u=n.slice((r+"\\").length).replace(/\\.*$/,"");c.push({label:u,value:r+"\\"+u,children:[]})}return c}(s);j(t)}),[s]),K=Object(r.useCallback)((function(e){var n=e.key,t=e.newSubKey,a=n.replace(/\\[^\\]+$/,"\\"+t);(f===n||f.startsWith(n+"\\"))&&(h(a),v.postMessage({command:"getKeyValues",key:a}));var r=function e(r){var c,o=[],l=Object(y.a)(r);try{for(l.s();!(c=l.n()).done;){var i=c.value;i.value!==n?""===i.value||n.startsWith(i.value+"\\")?o.push(Object.assign({},i,{children:e(i.children)})):o.push(i):o.push(Object.assign({},i,{label:t,value:a,children:[]}))}}catch(u){l.e(u)}finally{l.f()}return o}(s);j(r)}),[s,f]),w=Object(r.useCallback)((function(e){var n=e.key;if(f===n||f.startsWith(n+"\\")){var t=n.replace(/\\[^\\]+$/,"");h(t),v.postMessage({command:"getKeyValues",key:t})}var a=function e(t){var a,r=[],c=Object(y.a)(t);try{for(c.s();!(a=c.n()).done;){var o=a.value;o.value!==n&&(""===o.value||n.startsWith(o.value+"\\")?r.push(Object.assign({},o,{children:e(o.children)})):r.push(o))}}catch(l){c.e(l)}finally{c.f()}return r}(s);j(a)}),[s,f]),N=Object(r.useCallback)((function(e){var n=e.data;switch(n.command){case"setKeyTreeAndValues":R(n);break;case"setSubKeys":C(n);break;case"createKeyDone":S(n);break;case"renameKeyDone":K(n);break;case"deleteKeyDone":w(n)}}),[R,C,S,K,w]);Object(d.a)("message",N);var T=Object(r.useState)(!1),V=Object(i.a)(T,2),H=V[0],U=V[1];return Object(a.jsx)(m.a,{children:function(n){var t=n.height,r=n.width;return Object(a.jsxs)(D,{onMouseEnter:function(){return U(!0)},onMouseLeave:function(){return U(!1)},children:[Object(a.jsx)(M,{currentRegKey:f,hovered:H}),[c].map((function(n){return Object(a.jsx)(k.a,{virtualized:!0,defaultExpandAll:!0,data:s,value:f,height:t,style:{maxHeight:t,width:r},renderTreeNode:function(n){return Object(a.jsx)(L,{nodeLabel:n.label,nodeRegKey:n.value,nodeIsSelected:""!==n.value&&n.value===f,children:""===n.value?e("keysTreeView.computer"):n.label})},getChildren:function(e){return new Promise((function(n){var t=e.value;v.postMessage({command:"getSubKeys",key:t}),x({key:t,resolve:n})}))},onSelect:function(e,n){""!==n&&n!==f&&(h(n),v.postMessage({command:"getKeyValues",key:n}))}},n)}))]})}})},T=t(74),V=t(252),H=t(492);function U(){var e=Object(u.a)(["\n  overflow: hidden;\n  text-overflow: ellipsis;\n"]);return U=function(){return e},e}function G(){var e=Object(u.a)(["\n  .rs-table-cell-content {\n    display: flex;\n    align-items: center;\n  }\n"]);return G=function(){return e},e}function A(){var e=Object(u.a)(["\n  visibility: ",";\n  opacity: ",";\n  transition: visibility 0s, opacity 0.5s linear;\n  position: absolute !important;\n  left: 20px;\n  bottom: 20px;\n  z-index: 1;\n"]);return A=function(){return e},e}var I=Object(s.a)(x.a)(A(),(function(e){return e.$visible?"visible":"hidden"}),(function(e){return e.$visible?1:0}));function Y(e){var n=Object(b.a)().t,t=Object(r.useState)(!1),c=Object(i.a)(t,2),o=c[0],l=c[1],u=Object(r.useState)(""),s=Object(i.a)(u,2),d=s[0],j=s[1],p=Object(r.useState)(""),f=Object(i.a)(p,2),h=f[0],y=f[1],E=Object(r.useState)(""),m=Object(i.a)(E,2),x=m[0],k=m[1],S=function(){return""!==h},K=function(){v.postMessage({command:"createValue",key:e.currentRegKey,name:d,type:h,data:x})},w=function(e){"Enter"===e.key&&S()&&(K(),l(!1))};return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)(I,{onClick:function(){j(""),y(""),k(""),l(!0)},icon:Object(a.jsx)(g.a,{icon:_.d}),color:"blue",circle:!0,$visible:e.hovered&&!o}),Object(a.jsxs)(R.a,{backdrop:!0,size:"xs",open:o,onClose:function(){return l(!1)},onClick:function(e){return e.stopPropagation()},onDoubleClick:function(e){return e.stopPropagation()},onMouseDown:function(e){return e.stopPropagation()},onMouseUp:function(e){return e.stopPropagation()},children:[Object(a.jsx)(R.a.Title,{children:n("valuesList.newValueModal.title")}),Object(a.jsxs)(R.a.Body,{children:[Object(a.jsx)(O.a,{value:d,onChange:function(e){return j(e)},onKeyDown:w,placeholder:n("valuesList.newValueModal.newValueName")}),Object(a.jsx)(V.a,{value:h,onChange:function(e){return y(e)},data:[{label:n("valuesList.newValueModal.types.dword")+" (REG_DWORD)",value:"REG_DWORD"},{label:n("valuesList.newValueModal.types.string")+" (REG_SZ)",value:"REG_SZ"},{label:n("valuesList.newValueModal.types.expandableString")+" (REG_EXPAND_SZ)",value:"REG_EXPAND_SZ"},{label:n("valuesList.newValueModal.types.multiString")+" (REG_MULTI_SZ)",value:"REG_MULTI_SZ"},{label:n("valuesList.newValueModal.types.binaryData")+" (REG_BINARY)",value:"REG_BINARY"},{label:"REG_NONE",value:"REG_NONE"},{label:"REG_DWORD_BIG_ENDIAN",value:"REG_DWORD_BIG_ENDIAN"},{label:"REG_LINK",value:"REG_LINK"},{label:"REG_RESOURCE_LIST",value:"REG_RESOURCE_LIST"},{label:"REG_FULL_RESOURCE_DESCRIPTOR",value:"REG_FULL_RESOURCE_DESCRIPTOR"},{label:"REG_RESOURCE_REQUIREMENTS_LIST",value:"REG_RESOURCE_REQUIREMENTS_LIST"},{label:"REG_QWORD",value:"REG_QWORD"}],defaultValue:"",searchable:!1,cleanable:!1,style:{width:"100%",marginTop:"5px"},placeholder:n("valuesList.newValueModal.selectValueType")}),Object(a.jsx)(O.a,{value:x,onChange:function(e){return k(e)},onKeyDown:w,placeholder:n("valuesList.newValueModal.insertValueData"),style:{marginTop:"5px"}})]}),Object(a.jsxs)(R.a.Footer,{children:[Object(a.jsx)(C.a,{onClick:function(){K(),l(!1)},appearance:"primary",disabled:!S(),children:n("valuesList.newValueModal.create")}),Object(a.jsx)(C.a,{onClick:function(){return l(!1)},appearance:"subtle",children:n("valuesList.newValueModal.cancel")})]})]})]})}var P=Object(s.a)(H.a.Cell)(G()),$=s.a.div(U());function F(e){var n=e.rowData,t=e.dataKey,c=e.currentKey,o=Object(E.a)(e,["rowData","dataKey","currentKey"]),l=Object(b.a)().t,u=_.b,s="var(--vscode-charts-orange)";switch(n.type){case"REG_DWORD":case"REG_QWORD":u=_.a,s="var(--vscode-charts-green)";break;case"REG_SZ":case"REG_EXPAND_SZ":case"REG_MULTI_SZ":u=_.c,s="var(--vscode-charts-purple)"}var d=Object(r.useState)(null),j=Object(i.a)(d,2),p=j[0],f=j[1],h=function(){var e=n.name,t=p;t!==e&&v.postMessage({command:"renameValue",key:c,oldName:e,newName:t})},y=Object(r.useState)(!1),m=Object(i.a)(y,2),x=m[0],k=m[1],S=n[t]||l("valuesList.defaultName");return Object(a.jsxs)(P,Object(T.a)(Object(T.a)({},o),{},{onClick:function(){return f(n[t])},onMouseDown:function(e){1===e.button&&k(!0)},children:[Object(a.jsx)(g.a,{icon:u,style:{color:s,marginRight:"8px"}}),null!==p?Object(a.jsx)(O.a,{autoFocus:!0,value:p,onChange:function(e){return f(e)},onKeyDown:function(e){"Enter"===e.key?(f(null),h()):"Escape"===e.key&&f(null)},placeholder:l("valuesList.columnNames.name"),onBlur:function(){f(null),h()}}):Object(a.jsx)($,{children:S}),Object(a.jsxs)(R.a,{backdrop:!0,size:"xs",open:x,onClose:function(){return k(!1)},onClick:function(e){return e.stopPropagation()},onDoubleClick:function(e){return e.stopPropagation()},onMouseDown:function(e){return e.stopPropagation()},onMouseUp:function(e){return e.stopPropagation()},children:[Object(a.jsx)(R.a.Title,{children:l("valuesList.confirmDeleteValueModal.title")}),Object(a.jsx)(R.a.Body,{children:l("valuesList.confirmDeleteValueModal.text",{value:S})}),Object(a.jsxs)(R.a.Footer,{children:[Object(a.jsx)(C.a,{onClick:function(){v.postMessage({command:"deleteValue",key:c,name:n.name}),k(!1)},appearance:"primary",children:l("global.yes")}),Object(a.jsx)(C.a,{onClick:function(){return k(!1)},appearance:"subtle",children:l("global.no")})]})]})]}))}function z(e){var n=e.rowData,t=e.dataKey,c=e.currentKey,o=Object(E.a)(e,["rowData","dataKey","currentKey"]),l=Object(b.a)().t,u=Object(r.useState)(null),s=Object(i.a)(u,2),d=s[0],j=s[1],p=function(){var e=n.value,t="number"===typeof e?parseInt(d):d;e!==t&&v.postMessage({command:"setValueData",key:c,type:n.type,name:n.name,data:t})};return Object(a.jsx)(P,Object(T.a)(Object(T.a)({},o),{},{onClick:function(){return j(n[t])},children:null!==d?Object(a.jsx)(O.a,{autoFocus:!0,value:d,onChange:function(e){return j(e)},onKeyDown:function(e){"Enter"===e.key?(j(null),p()):"Escape"===e.key&&j(null)},placeholder:l("valuesList.columnNames.value"),onBlur:function(){j(null),p()}}):Object(a.jsx)($,{children:"number"===typeof n[t]?"0x"+n[t].toString(16).padStart(8,"0")+" ("+n[t].toString()+")":n[t]})}))}var B=function(){var e=Object(b.a)().t,n=Object(r.useState)([]),t=Object(i.a)(n,2),c=t[0],o=t[1],l=Object(r.useState)(""),u=Object(i.a)(l,2),s=u[0],j=u[1],O=Object(r.useCallback)((function(e){var n=e.data;switch(n.command){case"setKeyValues":o(n.values),j(n.key);break;case"setKeyTreeAndValues":o(n.values),j(n.retrievedKey);break;case"renameValueDone":if(n.key!==s)throw new Error("Expected data for ".concat(s,", got data for ").concat(n.key));o(c.map((function(e){return e.name===n.oldName?Object.assign({},e,{name:n.newName}):e})));break;case"createValueDone":if(n.key!==s)throw new Error("Expected data for ".concat(s,", got data for ").concat(n.key));o(c.concat([{name:n.name,type:n.type,value:n.data}]));break;case"setValueDataDone":if(n.key!==s)throw new Error("Expected data for ".concat(s,", got data for ").concat(n.key));o(c.map((function(e){return e.name===n.name?Object.assign({},e,{value:n.newData}):e})));break;case"deleteValueDone":if(n.key!==s)throw new Error("Expected data for ".concat(s,", got data for ").concat(n.key));o(c.filter((function(e){return e.name!==n.name})))}}),[s,c]);Object(d.a)("message",O);var v=Object(r.useState)(!1),p=Object(i.a)(v,2),f=p[0],h=p[1];return Object(a.jsx)(m.a,{children:function(n){var t=n.height,r=n.width;return Object(a.jsxs)("div",{onMouseEnter:function(){return h(!0)},onMouseLeave:function(){return h(!1)},children:[Object(a.jsx)(Y,{currentRegKey:s,hovered:f}),Object(a.jsxs)(H.a,{virtualized:!0,data:c,height:t,style:{width:r},children:[Object(a.jsxs)(H.a.Column,{width:200,resizable:!0,children:[Object(a.jsx)(H.a.HeaderCell,{children:e("valuesList.columnNames.name")}),Object(a.jsx)(F,{dataKey:"name",currentKey:s})]}),Object(a.jsxs)(H.a.Column,{width:150,resizable:!0,children:[Object(a.jsx)(H.a.HeaderCell,{children:e("valuesList.columnNames.type")}),Object(a.jsx)(H.a.Cell,{dataKey:"type"})]}),Object(a.jsxs)(H.a.Column,{width:300,resizable:!0,children:[Object(a.jsx)(H.a.HeaderCell,{children:e("valuesList.columnNames.value")}),Object(a.jsx)(z,{dataKey:"value",currentKey:s})]})]})]})}})};function W(){var e=Object(u.a)(["\n  overflow: hidden;\n"]);return W=function(){return e},e}function Z(){var e=Object(u.a)(["\n  display: flex;\n  height: 100%;\n  .gutter {\n    cursor: ew-resize;\n    padding: 0 5px;\n    box-sizing: border-box;\n    background-color: var(--vscode-panelSection-border);\n    background-clip: content-box;\n  }\n"]);return Z=function(){return e},e}function Q(){var e=Object(u.a)(["\n  display: ",";\n  flex-direction: column;\n  height: 100vh;\n  width: 100%;\n"]);return Q=function(){return e},e}var q=s.a.div(Q(),(function(e){return e.$hidden?"none":"flex"})),X=Object(s.a)(j.a)(Z()),J=s.a.div(W());var ee=function(){var e=Object(b.a)().ready,n=Object(r.useState)(!0),t=Object(i.a)(n,2),c=t[0],o=t[1];Object(r.useEffect)((function(){var e=!1;if(v){var n=v.getState();n&&n.address&&(v.postMessage({command:"getKeyTreeAndValues",key:n.address}),e=!0)}o(e)}),[]);var l=Object(r.useCallback)((function(e){switch(e.data.command){case"setKeyTreeAndValues":o(!1)}}),[]);return Object(d.a)("message",l),Object(a.jsxs)(q,{$hidden:c||!e,children:[Object(a.jsx)(h,{}),Object(a.jsxs)(X,{sizes:[25,75],cursor:"",gutterSize:11,snapOffset:0,children:[Object(a.jsx)(J,{children:Object(a.jsx)(N,{})}),Object(a.jsx)(J,{children:Object(a.jsx)(B,{})})]})]})};t(483);var ne=function(){return Object(a.jsx)(ee,{})},te=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,501)).then((function(n){var t=n.getCLS,a=n.getFID,r=n.getFCP,c=n.getLCP,o=n.getTTFB;t(e),a(e),r(e),c(e),o(e)}))},ae=t(150),re=t(72),ce=t(250);ae.a.use(ce.a).use(re.e).init({lng:document.querySelector("body").getAttribute("data-locale"),fallbackLng:"en",interpolation:{escapeValue:!1},react:{useSuspense:!1},backend:{loadPath:"./locales/{{lng}}/{{ns}}.json"}});ae.a;l.a.render(Object(a.jsx)(c.a.StrictMode,{children:Object(a.jsx)(ne,{})}),document.getElementById("root")),te()}},[[484,1,2]]]);
//# sourceMappingURL=main.45991bc5.chunk.js.map