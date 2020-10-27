var hljs=function(){"use strict";function e(n){Object.freeze(n);var t="function"==typeof n;return Object.getOwnPropertyNames(n).forEach((function(a){!Object.hasOwnProperty.call(n,a)||null===n[a]||"object"!=typeof n[a]&&"function"!=typeof n[a]||t&&("caller"===a||"callee"===a||"arguments"===a)||Object.isFrozen(n[a])||e(n[a])})),n}class n{constructor(e){void 0===e.data&&(e.data={}),this.data=e.data}ignoreMatch(){this.ignore=!0}}function t(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function a(e,...n){var t={};for(const n in e)t[n]=e[n];return n.forEach((function(e){for(const n in e)t[n]=e[n]})),t}function i(e){return e.nodeName.toLowerCase()}var r=Object.freeze({__proto__:null,escapeHTML:t,inherit:a,nodeStream:function(e){var n=[];return function e(t,a){for(var r=t.firstChild;r;r=r.nextSibling)3===r.nodeType?a+=r.nodeValue.length:1===r.nodeType&&(n.push({event:"start",offset:a,node:r}),a=e(r,a),i(r).match(/br|hr|img|input/)||n.push({event:"stop",offset:a,node:r}));return a}(e,0),n},mergeStreams:function(e,n,a){var r=0,s="",o=[];function l(){return e.length&&n.length?e[0].offset!==n[0].offset?e[0].offset<n[0].offset?e:n:"start"===n[0].event?e:n:e.length?e:n}function c(e){s+="<"+i(e)+[].map.call(e.attributes,(function(e){return" "+e.nodeName+'="'+t(e.value)+'"'})).join("")+">"}function d(e){s+="</"+i(e)+">"}function g(e){("start"===e.event?c:d)(e.node)}for(;e.length||n.length;){var u=l();if(s+=t(a.substring(r,u[0].offset)),r=u[0].offset,u===e){o.reverse().forEach(d);do{g(u.splice(0,1)[0]),u=l()}while(u===e&&u.length&&u[0].offset===r);o.reverse().forEach(c)}else"start"===u[0].event?o.push(u[0].node):o.pop(),g(u.splice(0,1)[0])}return s+t(a.substr(r))}});const s=e=>!!e.kind;class o{constructor(e,n){this.buffer="",this.classPrefix=n.classPrefix,e.walk(this)}addText(e){this.buffer+=t(e)}openNode(e){if(!s(e))return;let n=e.kind;e.sublanguage||(n=`${this.classPrefix}${n}`),this.span(n)}closeNode(e){s(e)&&(this.buffer+="</span>")}value(){return this.buffer}span(e){this.buffer+=`<span class="${e}">`}}class l{constructor(){this.rootNode={children:[]},this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(e){this.top.children.push(e)}openNode(e){const n={kind:e,children:[]};this.add(n),this.stack.push(n)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(e){return this.constructor._walk(e,this.rootNode)}static _walk(e,n){return"string"==typeof n?e.addText(n):n.children&&(e.openNode(n),n.children.forEach((n=>this._walk(e,n))),e.closeNode(n)),e}static _collapse(e){"string"!=typeof e&&e.children&&(e.children.every((e=>"string"==typeof e))?e.children=[e.children.join("")]:e.children.forEach((e=>{l._collapse(e)})))}}class c extends l{constructor(e){super(),this.options=e}addKeyword(e,n){""!==e&&(this.openNode(n),this.addText(e),this.closeNode())}addText(e){""!==e&&this.add(e)}addSublanguage(e,n){const t=e.root;t.kind=n,t.sublanguage=!0,this.add(t)}toHTML(){return new o(this,this.options).value()}finalize(){return!0}}function d(e){return e?"string"==typeof e?e:e.source:null}const g="[a-zA-Z]\\w*",u="[a-zA-Z_]\\w*",h="\\b\\d+(\\.\\d+)?",b="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",m="\\b(0b[01]+)",f={begin:"\\\\[\\s\\S]",relevance:0},p={className:"string",begin:"'",end:"'",illegal:"\\n",contains:[f]},v={className:"string",begin:'"',end:'"',illegal:"\\n",contains:[f]},_={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},N=function(e,n,t={}){var i=a({className:"comment",begin:e,end:n,contains:[]},t);return i.contains.push(_),i.contains.push({className:"doctag",begin:"(?:TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):",relevance:0}),i},E=N("//","$"),w=N("/\\*","\\*/"),x=N("#","$");var y=Object.freeze({__proto__:null,IDENT_RE:g,UNDERSCORE_IDENT_RE:u,NUMBER_RE:h,C_NUMBER_RE:b,BINARY_NUMBER_RE:m,RE_STARTERS_RE:"!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",SHEBANG:(e={})=>{const n=/^#![ ]*\//;return e.binary&&(e.begin=function(...e){return e.map((e=>d(e))).join("")}(n,/.*\b/,e.binary,/\b.*/)),a({className:"meta",begin:n,end:/$/,relevance:0,"on:begin":(e,n)=>{0!==e.index&&n.ignoreMatch()}},e)},BACKSLASH_ESCAPE:f,APOS_STRING_MODE:p,QUOTE_STRING_MODE:v,PHRASAL_WORDS_MODE:_,COMMENT:N,C_LINE_COMMENT_MODE:E,C_BLOCK_COMMENT_MODE:w,HASH_COMMENT_MODE:x,NUMBER_MODE:{className:"number",begin:h,relevance:0},C_NUMBER_MODE:{className:"number",begin:b,relevance:0},BINARY_NUMBER_MODE:{className:"number",begin:m,relevance:0},CSS_NUMBER_MODE:{className:"number",begin:h+"(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",relevance:0},REGEXP_MODE:{begin:/(?=\/[^/\n]*\/)/,contains:[{className:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[f,{begin:/\[/,end:/\]/,relevance:0,contains:[f]}]}]},TITLE_MODE:{className:"title",begin:g,relevance:0},UNDERSCORE_TITLE_MODE:{className:"title",begin:u,relevance:0},METHOD_GUARD:{begin:"\\.\\s*[a-zA-Z_]\\w*",relevance:0},END_SAME_AS_BEGIN:function(e){return Object.assign(e,{"on:begin":(e,n)=>{n.data._beginMatch=e[1]},"on:end":(e,n)=>{n.data._beginMatch!==e[1]&&n.ignoreMatch()}})}}),M="of and for in not or if then".split(" ");function O(e){function n(n,t){return RegExp(d(n),"m"+(e.case_insensitive?"i":"")+(t?"g":""))}class t{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(e,n){n.position=this.position++,this.matchIndexes[this.matchAt]=n,this.regexes.push([n,e]),this.matchAt+=function(e){return RegExp(e.toString()+"|").exec("").length-1}(e)+1}compile(){0===this.regexes.length&&(this.exec=()=>null);const e=this.regexes.map((e=>e[1]));this.matcherRe=n(function(e,n="|"){for(var t=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./,a=0,i="",r=0;r<e.length;r++){var s=a+=1,o=d(e[r]);for(r>0&&(i+=n),i+="(";o.length>0;){var l=t.exec(o);if(null==l){i+=o;break}i+=o.substring(0,l.index),o=o.substring(l.index+l[0].length),"\\"===l[0][0]&&l[1]?i+="\\"+(Number(l[1])+s):(i+=l[0],"("===l[0]&&a++)}i+=")"}return i}(e),!0),this.lastIndex=0}exec(e){this.matcherRe.lastIndex=this.lastIndex;const n=this.matcherRe.exec(e);if(!n)return null;const t=n.findIndex(((e,n)=>n>0&&void 0!==e)),a=this.matchIndexes[t];return n.splice(0,t),Object.assign(n,a)}}class i{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(e){if(this.multiRegexes[e])return this.multiRegexes[e];const n=new t;return this.rules.slice(e).forEach((([e,t])=>n.addRule(e,t))),n.compile(),this.multiRegexes[e]=n,n}resumingScanAtSamePosition(){return 0!==this.regexIndex}considerAll(){this.regexIndex=0}addRule(e,n){this.rules.push([e,n]),"begin"===n.type&&this.count++}exec(e){const n=this.getMatcher(this.regexIndex);n.lastIndex=this.lastIndex;let t=n.exec(e);if(this.resumingScanAtSamePosition())if(t&&t.index===this.lastIndex);else{const n=this.getMatcher(0);n.lastIndex=this.lastIndex+1,t=n.exec(e)}return t&&(this.regexIndex+=t.position+1,this.regexIndex===this.count&&this.considerAll()),t}}function r(e,n){const t=e.input[e.index-1],a=e.input[e.index+e[0].length];"."!==t&&"."!==a||n.ignoreMatch()}if(e.contains&&e.contains.includes("self"))throw Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return function t(s,o){const l=s;if(s.compiled)return l;s.compiled=!0,s.__beforeBegin=null,s.keywords=s.keywords||s.beginKeywords;let c=null;if("object"==typeof s.keywords&&(c=s.keywords.$pattern,delete s.keywords.$pattern),s.keywords&&(s.keywords=function(e,n){var t={};return"string"==typeof e?a("keyword",e):Object.keys(e).forEach((function(n){a(n,e[n])})),t;function a(e,a){n&&(a=a.toLowerCase()),a.split(" ").forEach((function(n){var a=n.split("|");t[a[0]]=[e,S(a[0],a[1])]}))}}(s.keywords,e.case_insensitive)),s.lexemes&&c)throw Error("ERR: Prefer `keywords.$pattern` to `mode.lexemes`, BOTH are not allowed. (see mode reference) ");return l.keywordPatternRe=n(s.lexemes||c||/\w+/,!0),o&&(s.beginKeywords&&(s.begin="\\b("+s.beginKeywords.split(" ").join("|")+")(?=\\b|\\s)",s.__beforeBegin=r),s.begin||(s.begin=/\B|\b/),l.beginRe=n(s.begin),s.endSameAsBegin&&(s.end=s.begin),s.end||s.endsWithParent||(s.end=/\B|\b/),s.end&&(l.endRe=n(s.end)),l.terminator_end=d(s.end)||"",s.endsWithParent&&o.terminator_end&&(l.terminator_end+=(s.end?"|":"")+o.terminator_end)),s.illegal&&(l.illegalRe=n(s.illegal)),void 0===s.relevance&&(s.relevance=1),s.contains||(s.contains=[]),s.contains=[].concat(...s.contains.map((function(e){return function(e){return e.variants&&!e.cached_variants&&(e.cached_variants=e.variants.map((function(n){return a(e,{variants:null},n)}))),e.cached_variants?e.cached_variants:k(e)?a(e,{starts:e.starts?a(e.starts):null}):Object.isFrozen(e)?a(e):e}("self"===e?s:e)}))),s.contains.forEach((function(e){t(e,l)})),s.starts&&t(s.starts,o),l.matcher=function(e){const n=new i;return e.contains.forEach((e=>n.addRule(e.begin,{rule:e,type:"begin"}))),e.terminator_end&&n.addRule(e.terminator_end,{type:"end"}),e.illegal&&n.addRule(e.illegal,{type:"illegal"}),n}(l),l}(e)}function k(e){return!!e&&(e.endsWithParent||k(e.starts))}function S(e,n){return n?Number(n):function(e){return M.includes(e.toLowerCase())}(e)?0:1}const R={props:["language","code","autodetect"],data:function(){return{detectedLanguage:"",unknownLanguage:!1}},computed:{className(){return this.unknownLanguage?"":"hljs "+this.detectedLanguage},highlighted(){if(!this.autoDetect&&!hljs.getLanguage(this.language))return console.warn(`The language "${this.language}" you specified could not be found.`),this.unknownLanguage=!0,t(this.code);let e;return this.autoDetect?(e=hljs.highlightAuto(this.code),this.detectedLanguage=e.language):(e=hljs.highlight(this.language,this.code,this.ignoreIllegals),this.detectectLanguage=this.language),e.value},autoDetect(){return!(this.language&&(e=this.autodetect,!e&&""!==e));var e},ignoreIllegals:()=>!0},render(e){return e("pre",{},[e("code",{class:this.className,domProps:{innerHTML:this.highlighted}})])}},T={install(e){e.component("highlightjs",R)}},A=t,B=a,{nodeStream:C,mergeStreams:L}=r,D=Symbol("nomatch");return function(t){var a=[],i=Object.create(null),r=Object.create(null),s=[],o=!0,l=/(^(<[^>]+>|\t|)+|\n)/gm,d="Could not find the language '{}', did you forget to load/include a language module?";const g={disableAutodetect:!0,name:"Plain text",contains:[]};var u={noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",tabReplace:null,useBR:!1,languages:null,__emitter:c};function h(e){return u.noHighlightRe.test(e)}function b(e,n,t,a){var i={code:n,language:e};x("before:highlight",i);var r=i.result?i.result:m(i.language,i.code,t,a);return r.code=i.code,x("after:highlight",r),r}function m(e,t,a,r){var s=t;function l(e,n){var t=_.case_insensitive?n[0].toLowerCase():n[0];return Object.prototype.hasOwnProperty.call(e.keywords,t)&&e.keywords[t]}function c(){null!=x.subLanguage?function(){if(""!==k){var e=null;if("string"==typeof x.subLanguage){if(!i[x.subLanguage])return void M.addText(k);e=m(x.subLanguage,k,!0,y[x.subLanguage]),y[x.subLanguage]=e.top}else e=f(k,x.subLanguage.length?x.subLanguage:null);x.relevance>0&&(S+=e.relevance),M.addSublanguage(e.emitter,e.language)}}():function(){if(!x.keywords)return void M.addText(k);let e=0;x.keywordPatternRe.lastIndex=0;let n=x.keywordPatternRe.exec(k),t="";for(;n;){t+=k.substring(e,n.index);const a=l(x,n);if(a){const[e,i]=a;M.addText(t),t="",S+=i,M.addKeyword(n[0],e)}else t+=n[0];e=x.keywordPatternRe.lastIndex,n=x.keywordPatternRe.exec(k)}t+=k.substr(e),M.addText(t)}(),k=""}function g(e){return e.className&&M.openNode(e.className),x=Object.create(e,{parent:{value:x}})}function h(e,t,a){let i=function(e,n){var t=e&&e.exec(n);return t&&0===t.index}(e.endRe,a);if(i){if(e["on:end"]){const a=new n(e);e["on:end"](t,a),a.ignore&&(i=!1)}if(i){for(;e.endsParent&&e.parent;)e=e.parent;return e}}if(e.endsWithParent)return h(e.parent,t,a)}function b(e){return 0===x.matcher.regexIndex?(k+=e[0],1):(B=!0,0)}var p={};function v(t,i){var r=i&&i[0];if(k+=t,null==r)return c(),0;if("begin"===p.type&&"end"===i.type&&p.index===i.index&&""===r){if(k+=s.slice(i.index,i.index+1),!o){const n=Error("0 width match regex");throw n.languageName=e,n.badRule=p.rule,n}return 1}if(p=i,"begin"===i.type)return function(e){var t=e[0],a=e.rule;const i=new n(a),r=[a.__beforeBegin,a["on:begin"]];for(const n of r)if(n&&(n(e,i),i.ignore))return b(t);return a&&a.endSameAsBegin&&(a.endRe=RegExp(t.replace(/[-/\\^$*+?.()|[\]{}]/g,"\\$&"),"m")),a.skip?k+=t:(a.excludeBegin&&(k+=t),c(),a.returnBegin||a.excludeBegin||(k=t)),g(a),a.returnBegin?0:t.length}(i);if("illegal"===i.type&&!a){const e=Error('Illegal lexeme "'+r+'" for mode "'+(x.className||"<unnamed>")+'"');throw e.mode=x,e}if("end"===i.type){var l=function(e){var n=e[0],t=s.substr(e.index),a=h(x,e,t);if(!a)return D;var i=x;i.skip?k+=n:(i.returnEnd||i.excludeEnd||(k+=n),c(),i.excludeEnd&&(k=n));do{x.className&&M.closeNode(),x.skip||x.subLanguage||(S+=x.relevance),x=x.parent}while(x!==a.parent);return a.starts&&(a.endSameAsBegin&&(a.starts.endRe=a.endRe),g(a.starts)),i.returnEnd?0:n.length}(i);if(l!==D)return l}if("illegal"===i.type&&""===r)return 1;if(T>1e5&&T>3*i.index)throw Error("potential infinite loop, way more iterations than matches");return k+=r,r.length}var _=N(e);if(!_)throw console.error(d.replace("{}",e)),Error('Unknown language: "'+e+'"');var E=O(_),w="",x=r||E,y={},M=new u.__emitter(u);!function(){for(var e=[],n=x;n!==_;n=n.parent)n.className&&e.unshift(n.className);e.forEach((e=>M.openNode(e)))}();var k="",S=0,R=0,T=0,B=!1;try{for(x.matcher.considerAll();;){T++,B?B=!1:x.matcher.considerAll(),x.matcher.lastIndex=R;const e=x.matcher.exec(s);if(!e)break;const n=v(s.substring(R,e.index),e);R=e.index+n}return v(s.substr(R)),M.closeAllNodes(),M.finalize(),w=M.toHTML(),{relevance:S,value:w,language:e,illegal:!1,emitter:M,top:x}}catch(n){if(n.message&&n.message.includes("Illegal"))return{illegal:!0,illegalBy:{msg:n.message,context:s.slice(R-100,R+100),mode:n.mode},sofar:w,relevance:0,value:A(s),emitter:M};if(o)return{illegal:!1,relevance:0,value:A(s),emitter:M,language:e,top:x,errorRaised:n};throw n}}function f(e,n){n=n||u.languages||Object.keys(i);var t=function(e){const n={relevance:0,emitter:new u.__emitter(u),value:A(e),illegal:!1,top:g};return n.emitter.addText(e),n}(e),a=t;return n.filter(N).filter(w).forEach((function(n){var i=m(n,e,!1);i.language=n,i.relevance>a.relevance&&(a=i),i.relevance>t.relevance&&(a=t,t=i)})),a.language&&(t.second_best=a),t}function p(e){return u.tabReplace||u.useBR?e.replace(l,(e=>"\n"===e?u.useBR?"<br>":e:u.tabReplace?e.replace(/\t/g,u.tabReplace):e)):e}function v(e){let n=null;const t=function(e){var n=e.className+" ";n+=e.parentNode?e.parentNode.className:"";const t=u.languageDetectRe.exec(n);if(t){var a=N(t[1]);return a||(console.warn(d.replace("{}",t[1])),console.warn("Falling back to no-highlight mode for this block.",e)),a?t[1]:"no-highlight"}return n.split(/\s+/).find((e=>h(e)||N(e)))}(e);if(h(t))return;x("before:highlightBlock",{block:e,language:t}),u.useBR?(n=document.createElement("div"),n.innerHTML=e.innerHTML.replace(/\n/g,"").replace(/<br[ /]*>/g,"\n")):n=e;const a=n.textContent,i=t?b(t,a,!0):f(a),s=C(n);if(s.length){const e=document.createElement("div");e.innerHTML=i.value,i.value=L(s,C(e),a)}i.value=p(i.value),x("after:highlightBlock",{block:e,result:i}),e.innerHTML=i.value,e.className=function(e,n,t){var a=n?r[n]:t,i=[e.trim()];return e.match(/\bhljs\b/)||i.push("hljs"),e.includes(a)||i.push(a),i.join(" ").trim()}(e.className,t,i.language),e.result={language:i.language,re:i.relevance,relavance:i.relevance},i.second_best&&(e.second_best={language:i.second_best.language,re:i.second_best.relevance,relavance:i.second_best.relevance})}const _=()=>{if(!_.called){_.called=!0;var e=document.querySelectorAll("pre code");a.forEach.call(e,v)}};function N(e){return e=(e||"").toLowerCase(),i[e]||i[r[e]]}function E(e,{languageName:n}){"string"==typeof e&&(e=[e]),e.forEach((e=>{r[e]=n}))}function w(e){var n=N(e);return n&&!n.disableAutodetect}function x(e,n){var t=e;s.forEach((function(e){e[t]&&e[t](n)}))}Object.assign(t,{highlight:b,highlightAuto:f,fixMarkup:function(e){return console.warn("fixMarkup is deprecated and will be removed entirely in v11.0"),console.warn("Please see https://github.com/highlightjs/highlight.js/issues/2534"),p(e)},highlightBlock:v,configure:function(e){e.useBR&&(console.warn("'useBR' option is deprecated and will be removed entirely in v11.0"),console.warn("Please see https://github.com/highlightjs/highlight.js/issues/2559")),u=B(u,e)},initHighlighting:_,initHighlightingOnLoad:function(){window.addEventListener("DOMContentLoaded",_,!1)},registerLanguage:function(e,n){var a=null;try{a=n(t)}catch(n){if(console.error("Language definition for '{}' could not be registered.".replace("{}",e)),!o)throw n;console.error(n),a=g}a.name||(a.name=e),i[e]=a,a.rawDefinition=n.bind(null,t),a.aliases&&E(a.aliases,{languageName:e})},listLanguages:function(){return Object.keys(i)},getLanguage:N,registerAliases:E,requireLanguage:function(e){var n=N(e);if(n)return n;throw Error("The '{}' language is required, but not loaded.".replace("{}",e))},autoDetection:w,inherit:B,addPlugin:function(e){s.push(e)},vuePlugin:T}),t.debugMode=function(){o=!1},t.safeMode=function(){o=!0},t.versionString="10.3.1";for(const n in y)"object"==typeof y[n]&&e(y[n]);return Object.assign(t,y),t}({})}();"object"==typeof exports&&"undefined"!=typeof module&&(module.exports=hljs),hljs.registerLanguage("css",function(){"use strict";return function(e){var n={begin:/(?:[A-Z\_\.\-]+|--[a-zA-Z0-9_-]+)\s*:/,returnBegin:!0,end:";",endsWithParent:!0,contains:[{className:"attribute",begin:/\S/,end:":",excludeEnd:!0,starts:{endsWithParent:!0,excludeEnd:!0,contains:[{begin:/[\w-]+\(/,returnBegin:!0,contains:[{className:"built_in",begin:/[\w-]+/},{begin:/\(/,end:/\)/,contains:[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,e.CSS_NUMBER_MODE]}]},e.CSS_NUMBER_MODE,e.QUOTE_STRING_MODE,e.APOS_STRING_MODE,e.C_BLOCK_COMMENT_MODE,{className:"number",begin:"#[0-9A-Fa-f]+"},{className:"meta",begin:"!important"}]}}]};return{name:"CSS",case_insensitive:!0,illegal:/[=\/|'\$]/,contains:[e.C_BLOCK_COMMENT_MODE,{className:"selector-id",begin:/#[A-Za-z0-9_-]+/},{className:"selector-class",begin:/\.[A-Za-z0-9_-]+/},{className:"selector-attr",begin:/\[/,end:/\]/,illegal:"$",contains:[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE]},{className:"selector-pseudo",begin:/:(:)?[a-zA-Z0-9\_\-\+\(\)"'.]+/},{begin:"@(page|font-face)",lexemes:"@[a-z-]+",keywords:"@page @font-face"},{begin:"@",end:"[{;]",illegal:/:/,returnBegin:!0,contains:[{className:"keyword",begin:/@\-?\w[\w]*(\-\w+)*/},{begin:/\s/,endsWithParent:!0,excludeEnd:!0,relevance:0,keywords:"and or not only",contains:[{begin:/[a-z-]+:/,className:"attribute"},e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,e.CSS_NUMBER_MODE]}]},{className:"selector-tag",begin:"[a-zA-Z-][a-zA-Z0-9_-]*",relevance:0},{begin:"{",end:"}",illegal:/\S/,contains:[e.C_BLOCK_COMMENT_MODE,n]}]}}}()),hljs.registerLanguage("bash",function(){"use strict";return function(e){const n={};Object.assign(n,{className:"variable",variants:[{begin:/\$[\w\d#@][\w\d_]*/},{begin:/\$\{/,end:/\}/,contains:["self",{begin:/:-/,contains:[n]}]}]});const t={className:"subst",begin:/\$\(/,end:/\)/,contains:[e.BACKSLASH_ESCAPE]},a={begin:/<<-?\s*(?=\w+)/,starts:{contains:[e.END_SAME_AS_BEGIN({begin:/(\w+)/,end:/(\w+)/,className:"string"})]}},i={className:"string",begin:/"/,end:/"/,contains:[e.BACKSLASH_ESCAPE,n,t]};t.contains.push(i);const r={begin:/\$\(\(/,end:/\)\)/,contains:[{begin:/\d+#[0-9a-f]+/,className:"number"},e.NUMBER_MODE,n]},s=e.SHEBANG({binary:"(fish|bash|zsh|sh|csh|ksh|tcsh|dash|scsh)",relevance:10}),o={className:"function",begin:/\w[\w\d_]*\s*\(\s*\)\s*\{/,returnBegin:!0,contains:[e.inherit(e.TITLE_MODE,{begin:/\w[\w\d_]*/})],relevance:0};return{name:"Bash",aliases:["sh","zsh"],keywords:{$pattern:/\b[a-z._-]+\b/,keyword:"if then else elif fi for while in do done case esac function",literal:"true false",built_in:"break cd continue eval exec exit export getopts hash pwd readonly return shift test times trap umask unset alias bind builtin caller command declare echo enable help let local logout mapfile printf read readarray source type typeset ulimit unalias set shopt autoload bg bindkey bye cap chdir clone comparguments compcall compctl compdescribe compfiles compgroups compquote comptags comptry compvalues dirs disable disown echotc echoti emulate fc fg float functions getcap getln history integer jobs kill limit log noglob popd print pushd pushln rehash sched setcap setopt stat suspend ttyctl unfunction unhash unlimit unsetopt vared wait whence where which zcompile zformat zftp zle zmodload zparseopts zprof zpty zregexparse zsocket zstyle ztcp"},contains:[s,e.SHEBANG(),o,r,e.HASH_COMMENT_MODE,a,i,{className:"",begin:/\\"/},{className:"string",begin:/'/,end:/'/},n]}}}()),hljs.registerLanguage("xml",function(){"use strict";return function(e){var n={className:"symbol",begin:"&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;"},t={begin:"\\s",contains:[{className:"meta-keyword",begin:"#?[a-z_][a-z1-9_-]+",illegal:"\\n"}]},a=e.inherit(t,{begin:"\\(",end:"\\)"}),i=e.inherit(e.APOS_STRING_MODE,{className:"meta-string"}),r=e.inherit(e.QUOTE_STRING_MODE,{className:"meta-string"}),s={endsWithParent:!0,illegal:/</,relevance:0,contains:[{className:"attr",begin:"[A-Za-z0-9\\._:-]+",relevance:0},{begin:/=\s*/,relevance:0,contains:[{className:"string",endsParent:!0,variants:[{begin:/"/,end:/"/,contains:[n]},{begin:/'/,end:/'/,contains:[n]},{begin:/[^\s"'=<>`]+/}]}]}]};return{name:"HTML, XML",aliases:["html","xhtml","rss","atom","xjb","xsd","xsl","plist","wsf","svg"],case_insensitive:!0,contains:[{className:"meta",begin:"<![a-z]",end:">",relevance:10,contains:[t,r,i,a,{begin:"\\[",end:"\\]",contains:[{className:"meta",begin:"<![a-z]",end:">",contains:[t,a,r,i]}]}]},e.COMMENT("\x3c!--","--\x3e",{relevance:10}),{begin:"<\\!\\[CDATA\\[",end:"\\]\\]>",relevance:10},n,{className:"meta",begin:/<\?xml/,end:/\?>/,relevance:10},{className:"tag",begin:"<style(?=\\s|>)",end:">",keywords:{name:"style"},contains:[s],starts:{end:"</style>",returnEnd:!0,subLanguage:["css","xml"]}},{className:"tag",begin:"<script(?=\\s|>)",end:">",keywords:{name:"script"},contains:[s],starts:{end:"<\/script>",returnEnd:!0,subLanguage:["javascript","handlebars","xml"]}},{className:"tag",begin:"</?",end:"/?>",contains:[{className:"name",begin:/[^\/><\s]+/,relevance:0},s]}]}}}()),hljs.registerLanguage("json",function(){"use strict";return function(e){var n={literal:"true false null"},t=[e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE],a=[e.QUOTE_STRING_MODE,e.C_NUMBER_MODE],i={end:",",endsWithParent:!0,excludeEnd:!0,contains:a,keywords:n},r={begin:"{",end:"}",contains:[{className:"attr",begin:/"/,end:/"/,contains:[e.BACKSLASH_ESCAPE],illegal:"\\n"},e.inherit(i,{begin:/:/})].concat(t),illegal:"\\S"},s={begin:"\\[",end:"\\]",contains:[e.inherit(i)],illegal:"\\S"};return a.push(r,s),t.forEach((function(e){a.push(e)})),{name:"JSON",contains:a,keywords:n,illegal:"\\S"}}}()),hljs.registerLanguage("markdown",function(){"use strict";return function(e){const n={begin:"<",end:">",subLanguage:"xml",relevance:0},t={begin:"\\[.+?\\][\\(\\[].*?[\\)\\]]",returnBegin:!0,contains:[{className:"string",begin:"\\[",end:"\\]",excludeBegin:!0,returnEnd:!0,relevance:0},{className:"link",begin:"\\]\\(",end:"\\)",excludeBegin:!0,excludeEnd:!0},{className:"symbol",begin:"\\]\\[",end:"\\]",excludeBegin:!0,excludeEnd:!0}],relevance:10},a={className:"strong",contains:[],variants:[{begin:/_{2}/,end:/_{2}/},{begin:/\*{2}/,end:/\*{2}/}]},i={className:"emphasis",contains:[],variants:[{begin:/\*(?!\*)/,end:/\*/},{begin:/_(?!_)/,end:/_/,relevance:0}]};a.contains.push(i),i.contains.push(a);var r=[n,t];return a.contains=a.contains.concat(r),i.contains=i.contains.concat(r),{name:"Markdown",aliases:["md","mkdown","mkd"],contains:[{className:"section",variants:[{begin:"^#{1,6}",end:"$",contains:r=r.concat(a,i)},{begin:"(?=^.+?\\n[=-]{2,}$)",contains:[{begin:"^[=-]*$"},{begin:"^",end:"\\n",contains:r}]}]},n,{className:"bullet",begin:"^[ \t]*([*+-]|(\\d+\\.))(?=\\s+)",end:"\\s+",excludeEnd:!0},a,i,{className:"quote",begin:"^>\\s+",contains:r,end:"$"},{className:"code",variants:[{begin:"(`{3,})(.|\\n)*?\\1`*[ ]*"},{begin:"(~{3,})(.|\\n)*?\\1~*[ ]*"},{begin:"```",end:"```+[ ]*$"},{begin:"~~~",end:"~~~+[ ]*$"},{begin:"`.+?`"},{begin:"(?=^( {4}|\\t))",contains:[{begin:"^( {4}|\\t)",end:"(\\n)$"}],relevance:0}]},{begin:"^[-\\*]{3,}",end:"$"},t,{begin:/^\[[^\n]+\]:/,returnBegin:!0,contains:[{className:"symbol",begin:/\[/,end:/\]/,excludeBegin:!0,excludeEnd:!0},{className:"link",begin:/:\s*/,end:/$/,excludeBegin:!0}]}]}}}()),hljs.registerLanguage("properties",function(){"use strict";return function(e){var n="[ \\t\\f]*",t="("+n+"[:=]"+n+"|[ \\t\\f]+)",a="([^\\\\\\W:= \\t\\f\\n]|\\\\.)+",i="([^\\\\:= \\t\\f\\n]|\\\\.)+",r={end:t,relevance:0,starts:{className:"string",end:/$/,relevance:0,contains:[{begin:"\\\\\\n"}]}};return{name:".properties",case_insensitive:!0,illegal:/\S/,contains:[e.COMMENT("^\\s*[!#]","$"),{begin:a+t,returnBegin:!0,contains:[{className:"attr",begin:a,endsParent:!0,relevance:0}],starts:r},{begin:i+t,returnBegin:!0,relevance:0,contains:[{className:"meta",begin:i,endsParent:!0,relevance:0}],starts:r},{className:"attr",relevance:0,begin:i+n+"$"}]}}}()),hljs.registerLanguage("less",function(){"use strict";return function(e){var n="([\\w-]+|@{[\\w-]+})",t=[],a=[],i=function(e){return{className:"string",begin:"~?"+e+".*?"+e}},r=function(e,n,t){return{className:e,begin:n,relevance:t}},s={begin:"\\(",end:"\\)",contains:a,relevance:0};a.push(e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,i("'"),i('"'),e.CSS_NUMBER_MODE,{begin:"(url|data-uri)\\(",starts:{className:"string",end:"[\\)\\n]",excludeEnd:!0}},r("number","#[0-9A-Fa-f]+\\b"),s,r("variable","@@?[\\w-]+",10),r("variable","@{[\\w-]+}"),r("built_in","~?`[^`]*?`"),{className:"attribute",begin:"[\\w-]+\\s*:",end:":",returnBegin:!0,excludeEnd:!0},{className:"meta",begin:"!important"});var o=a.concat({begin:"{",end:"}",contains:t}),l={beginKeywords:"when",endsWithParent:!0,contains:[{beginKeywords:"and not"}].concat(a)},c={begin:n+"\\s*:",returnBegin:!0,end:"[;}]",relevance:0,contains:[{className:"attribute",begin:n,end:":",excludeEnd:!0,starts:{endsWithParent:!0,illegal:"[<=$]",relevance:0,contains:a}}]},d={className:"keyword",begin:"@(import|media|charset|font-face|(-[a-z]+-)?keyframes|supports|document|namespace|page|viewport|host)\\b",starts:{end:"[;{}]",returnEnd:!0,contains:a,relevance:0}},g={className:"variable",variants:[{begin:"@[\\w-]+\\s*:",relevance:15},{begin:"@[\\w-]+"}],starts:{end:"[;}]",returnEnd:!0,contains:o}},u={variants:[{begin:"[\\.#:&\\[>]",end:"[;{}]"},{begin:n,end:"{"}],returnBegin:!0,returnEnd:!0,illegal:"[<='$\"]",relevance:0,contains:[e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,l,r("keyword","all\\b"),r("variable","@{[\\w-]+}"),r("selector-tag",n+"%?",0),r("selector-id","#"+n),r("selector-class","\\."+n,0),r("selector-tag","&",0),{className:"selector-attr",begin:"\\[",end:"\\]"},{className:"selector-pseudo",begin:/:(:)?[a-zA-Z0-9\_\-\+\(\)"'.]+/},{begin:"\\(",end:"\\)",contains:o},{begin:"!important"}]};return t.push(e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,d,g,c,u),{name:"Less",case_insensitive:!0,illegal:"[=>'/<($\"]",contains:t}}}()),hljs.registerLanguage("http",function(){"use strict";return function(e){var n="HTTP/[0-9\\.]+";return{name:"HTTP",aliases:["https"],illegal:"\\S",contains:[{begin:"^"+n,end:"$",contains:[{className:"number",begin:"\\b\\d{3}\\b"}]},{begin:"^[A-Z]+ (.*?) "+n+"$",returnBegin:!0,end:"$",contains:[{className:"string",begin:" ",end:" ",excludeBegin:!0,excludeEnd:!0},{begin:n},{className:"keyword",begin:"[A-Z]+"}]},{className:"attribute",begin:"^\\w",end:": ",excludeEnd:!0,illegal:"\\n|\\s|=",starts:{end:"$",relevance:0}},{begin:"\\n\\n",starts:{subLanguage:[],endsWithParent:!0}}]}}}()),hljs.registerLanguage("shell",function(){"use strict";return function(e){return{name:"Shell Session",aliases:["console"],contains:[{className:"meta",begin:"^\\s{0,3}[/\\w\\d\\[\\]()@-]*[>%$#]",starts:{end:"$",subLanguage:"bash"}}]}}}()),hljs.registerLanguage("plaintext",function(){"use strict";return function(e){return{name:"Plain text",aliases:["text","txt"],disableAutodetect:!0}}}()),hljs.registerLanguage("scss",function(){"use strict";return function(e){var n="@[a-z-]+",t={className:"variable",begin:"(\\$[a-zA-Z-][a-zA-Z0-9_-]*)\\b"},a={className:"number",begin:"#[0-9A-Fa-f]+"};return e.CSS_NUMBER_MODE,e.QUOTE_STRING_MODE,e.APOS_STRING_MODE,e.C_BLOCK_COMMENT_MODE,{name:"SCSS",case_insensitive:!0,illegal:"[=/|']",contains:[e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,{className:"selector-id",begin:"\\#[A-Za-z0-9_-]+",relevance:0},{className:"selector-class",begin:"\\.[A-Za-z0-9_-]+",relevance:0},{className:"selector-attr",begin:"\\[",end:"\\]",illegal:"$"},{className:"selector-tag",begin:"\\b(a|abbr|acronym|address|area|article|aside|audio|b|base|big|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|frame|frameset|(h[1-6])|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|map|mark|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|samp|script|section|select|small|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|tt|ul|var|video)\\b",relevance:0},{className:"selector-pseudo",begin:":(visited|valid|root|right|required|read-write|read-only|out-range|optional|only-of-type|only-child|nth-of-type|nth-last-of-type|nth-last-child|nth-child|not|link|left|last-of-type|last-child|lang|invalid|indeterminate|in-range|hover|focus|first-of-type|first-line|first-letter|first-child|first|enabled|empty|disabled|default|checked|before|after|active)"},{className:"selector-pseudo",begin:"::(after|before|choices|first-letter|first-line|repeat-index|repeat-item|selection|value)"},t,{className:"attribute",begin:"\\b(src|z-index|word-wrap|word-spacing|word-break|width|widows|white-space|visibility|vertical-align|unicode-bidi|transition-timing-function|transition-property|transition-duration|transition-delay|transition|transform-style|transform-origin|transform|top|text-underline-position|text-transform|text-shadow|text-rendering|text-overflow|text-indent|text-decoration-style|text-decoration-line|text-decoration-color|text-decoration|text-align-last|text-align|tab-size|table-layout|right|resize|quotes|position|pointer-events|perspective-origin|perspective|page-break-inside|page-break-before|page-break-after|padding-top|padding-right|padding-left|padding-bottom|padding|overflow-y|overflow-x|overflow-wrap|overflow|outline-width|outline-style|outline-offset|outline-color|outline|orphans|order|opacity|object-position|object-fit|normal|none|nav-up|nav-right|nav-left|nav-index|nav-down|min-width|min-height|max-width|max-height|mask|marks|margin-top|margin-right|margin-left|margin-bottom|margin|list-style-type|list-style-position|list-style-image|list-style|line-height|letter-spacing|left|justify-content|initial|inherit|ime-mode|image-orientation|image-resolution|image-rendering|icon|hyphens|height|font-weight|font-variant-ligatures|font-variant|font-style|font-stretch|font-size-adjust|font-size|font-language-override|font-kerning|font-feature-settings|font-family|font|float|flex-wrap|flex-shrink|flex-grow|flex-flow|flex-direction|flex-basis|flex|filter|empty-cells|display|direction|cursor|counter-reset|counter-increment|content|column-width|column-span|column-rule-width|column-rule-style|column-rule-color|column-rule|column-gap|column-fill|column-count|columns|color|clip-path|clip|clear|caption-side|break-inside|break-before|break-after|box-sizing|box-shadow|box-decoration-break|bottom|border-width|border-top-width|border-top-style|border-top-right-radius|border-top-left-radius|border-top-color|border-top|border-style|border-spacing|border-right-width|border-right-style|border-right-color|border-right|border-radius|border-left-width|border-left-style|border-left-color|border-left|border-image-width|border-image-source|border-image-slice|border-image-repeat|border-image-outset|border-image|border-color|border-collapse|border-bottom-width|border-bottom-style|border-bottom-right-radius|border-bottom-left-radius|border-bottom-color|border-bottom|border|background-size|background-repeat|background-position|background-origin|background-image|background-color|background-clip|background-attachment|background-blend-mode|background|backface-visibility|auto|animation-timing-function|animation-play-state|animation-name|animation-iteration-count|animation-fill-mode|animation-duration|animation-direction|animation-delay|animation|align-self|align-items|align-content)\\b",illegal:"[^\\s]"},{begin:"\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b"},{begin:":",end:";",contains:[t,a,e.CSS_NUMBER_MODE,e.QUOTE_STRING_MODE,e.APOS_STRING_MODE,{className:"meta",begin:"!important"}]},{begin:"@(page|font-face)",lexemes:n,keywords:"@page @font-face"},{begin:"@",end:"[{;]",returnBegin:!0,keywords:"and or not only",contains:[{begin:n,className:"keyword"},t,e.QUOTE_STRING_MODE,e.APOS_STRING_MODE,a,e.CSS_NUMBER_MODE]}]}}}());