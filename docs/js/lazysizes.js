!function(e){var t=function(e,t,n){"use strict";var a,i;if(function(){var t,n={lazyClass:"lazyload",loadedClass:"lazyloaded",loadingClass:"lazyloading",preloadClass:"lazypreload",errorClass:"lazyerror",autosizesClass:"lazyautosizes",srcAttr:"data-src",srcsetAttr:"data-srcset",sizesAttr:"data-sizes",minSize:40,customMedia:{},init:!0,expFactor:1.5,hFac:.8,loadMode:2,loadHidden:!0,ricTimeout:0,throttleDelay:125};for(t in i=e.lazySizesConfig||e.lazysizesConfig||{},n)t in i||(i[t]=n[t])}(),!t||!t.getElementsByClassName)return{init:function(){},cfg:i,noSupport:!0};var r=t.documentElement,o=e.HTMLPictureElement,s="addEventListener",l="getAttribute",c=e[s].bind(e),u=e.setTimeout,d=e.requestAnimationFrame||u,f=e.requestIdleCallback,m=/^picture$/i,y=["load","error","lazyincluded","_lazyloaded"],h={},z=Array.prototype.forEach,v=function(e,t){return h[t]||(h[t]=new RegExp("(\\s|^)"+t+"(\\s|$)")),h[t].test(e[l]("class")||"")&&h[t]},g=function(e,t){v(e,t)||e.setAttribute("class",(e[l]("class")||"").trim()+" "+t)},p=function(e,t){var n;(n=v(e,t))&&e.setAttribute("class",(e[l]("class")||"").replace(n," "))},C=function(e,t,n){var a=n?s:"removeEventListener";n&&C(e,t),y.forEach(function(n){e[a](n,t)})},b=function(e,n,i,r,o){var s=t.createEvent("Event");return i||(i={}),i.instance=a,s.initEvent(n,!r,!o),s.detail=i,e.dispatchEvent(s),s},A=function(t,n){var a;!o&&(a=e.picturefill||i.pf)?(n&&n.src&&!t[l]("srcset")&&t.setAttribute("srcset",n.src),a({reevaluate:!0,elements:[t]})):n&&n.src&&(t.src=n.src)},E=function(e,t){return(getComputedStyle(e,null)||{})[t]},_=function(e,t,n){for(n=n||e.offsetWidth;n<i.minSize&&t&&!e._lazysizesWidth;)n=t.offsetWidth,t=t.parentNode;return n},w=function(){var e,n,a=[],i=[],r=a,o=function(){var t=r;for(r=a.length?i:a,e=!0,n=!1;t.length;)t.shift()();e=!1},s=function(a,i){e&&!i?a.apply(this,arguments):(r.push(a),n||(n=!0,(t.hidden?u:d)(o)))};return s._lsFlush=o,s}(),N=function(e,t){return t?function(){w(e)}:function(){var t=this,n=arguments;w(function(){e.apply(t,n)})}},M=function(e){var t,a=0,r=i.throttleDelay,o=i.ricTimeout,s=function(){t=!1,a=n.now(),e()},l=f&&o>49?function(){f(s,{timeout:o}),o!==i.ricTimeout&&(o=i.ricTimeout)}:N(function(){u(s)},!0);return function(e){var i;(e=!0===e)&&(o=33),t||(t=!0,(i=r-(n.now()-a))<0&&(i=0),e||i<9?l():u(l,i))}},x=function(e){var t,a,i=function(){t=null,e()},r=function(){var e=n.now()-a;e<99?u(r,99-e):(f||i)(i)};return function(){a=n.now(),t||(t=u(r,99))}},W=function(){var o,f,y,h,_,W,B,L,T,F,R,D,k=/^img$/i,H=/^iframe$/i,O="onscroll"in e&&!/(gle|ing)bot/.test(navigator.userAgent),P=0,$=0,q=-1,I=function(e){$--,(!e||$<0||!e.target)&&($=0)},U=function(e){return null==D&&(D="hidden"==E(t.body,"visibility")),D||!("hidden"==E(e.parentNode,"visibility")&&"hidden"==E(e,"visibility"))},j=function(e,n){var a,i=e,o=U(e);for(L-=n,R+=n,T-=n,F+=n;o&&(i=i.offsetParent)&&i!=t.body&&i!=r;)(o=(E(i,"opacity")||1)>0)&&"visible"!=E(i,"overflow")&&(a=i.getBoundingClientRect(),o=F>a.left&&T<a.right&&R>a.top-1&&L<a.bottom+1);return o},G=function(){var e,n,s,c,u,d,m,y,z,v,g,p,C=a.elements;if((h=i.loadMode)&&$<8&&(e=C.length)){for(n=0,q++;n<e;n++)if(C[n]&&!C[n]._lazyRace)if(!O||a.prematureUnveil&&a.prematureUnveil(C[n]))Z(C[n]);else if((y=C[n][l]("data-expand"))&&(d=1*y)||(d=P),v||(v=!i.expand||i.expand<1?r.clientHeight>500&&r.clientWidth>500?500:370:i.expand,a._defEx=v,g=v*i.expFactor,p=i.hFac,D=null,P<g&&$<1&&q>2&&h>2&&!t.hidden?(P=g,q=0):P=h>1&&q>1&&$<6?v:0),z!==d&&(W=innerWidth+d*p,B=innerHeight+d,m=-1*d,z=d),s=C[n].getBoundingClientRect(),(R=s.bottom)>=m&&(L=s.top)<=B&&(F=s.right)>=m*p&&(T=s.left)<=W&&(R||F||T||L)&&(i.loadHidden||U(C[n]))&&(f&&$<3&&!y&&(h<3||q<4)||j(C[n],d))){if(Z(C[n]),u=!0,$>9)break}else!u&&f&&!c&&$<4&&q<4&&h>2&&(o[0]||i.preloadAfterLoad)&&(o[0]||!y&&(R||F||T||L||"auto"!=C[n][l](i.sizesAttr)))&&(c=o[0]||C[n]);c&&!u&&Z(c)}},J=M(G),K=function(e){var t=e.target;t._lazyCache?delete t._lazyCache:(I(e),g(t,i.loadedClass),p(t,i.loadingClass),C(t,V),b(t,"lazyloaded"))},Q=N(K),V=function(e){Q({target:e.target})},X=function(e){var t,n=e[l](i.srcsetAttr);(t=i.customMedia[e[l]("data-media")||e[l]("media")])&&e.setAttribute("media",t),n&&e.setAttribute("srcset",n)},Y=N(function(e,t,n,a,r){var o,s,c,d,f,h;(f=b(e,"lazybeforeunveil",t)).defaultPrevented||(a&&(n?g(e,i.autosizesClass):e.setAttribute("sizes",a)),s=e[l](i.srcsetAttr),o=e[l](i.srcAttr),r&&(d=(c=e.parentNode)&&m.test(c.nodeName||"")),h=t.firesLoad||"src"in e&&(s||o||d),f={target:e},g(e,i.loadingClass),h&&(clearTimeout(y),y=u(I,2500),C(e,V,!0)),d&&z.call(c.getElementsByTagName("source"),X),s?e.setAttribute("srcset",s):o&&!d&&(H.test(e.nodeName)?function(e,t){try{e.contentWindow.location.replace(t)}catch(n){e.src=t}}(e,o):e.src=o),r&&(s||d)&&A(e,{src:o})),e._lazyRace&&delete e._lazyRace,p(e,i.lazyClass),w(function(){var t=e.complete&&e.naturalWidth>1;h&&!t||(t&&g(e,"ls-is-cached"),K(f),e._lazyCache=!0,u(function(){"_lazyCache"in e&&delete e._lazyCache},9)),"lazy"==e.loading&&$--},!0)}),Z=function(e){if(!e._lazyRace){var t,n=k.test(e.nodeName),a=n&&(e[l](i.sizesAttr)||e[l]("sizes")),r="auto"==a;(!r&&f||!n||!e[l]("src")&&!e.srcset||e.complete||v(e,i.errorClass)||!v(e,i.lazyClass))&&(t=b(e,"lazyunveilread").detail,r&&S.updateElem(e,!0,e.offsetWidth),e._lazyRace=!0,$++,Y(e,t,r,a,n))}},ee=x(function(){i.loadMode=3,J()}),te=function(){3==i.loadMode&&(i.loadMode=2),ee()},ne=function(){f||(n.now()-_<999?u(ne,999):(f=!0,i.loadMode=3,J(),c("scroll",te,!0)))};return{_:function(){_=n.now(),a.elements=t.getElementsByClassName(i.lazyClass),o=t.getElementsByClassName(i.lazyClass+" "+i.preloadClass),c("scroll",J,!0),c("resize",J,!0),c("pageshow",function(e){if(e.persisted){var n=t.querySelectorAll("."+i.loadingClass);n.length&&n.forEach&&d(function(){n.forEach(function(e){e.complete&&Z(e)})})}}),e.MutationObserver?new MutationObserver(J).observe(r,{childList:!0,subtree:!0,attributes:!0}):(r[s]("DOMNodeInserted",J,!0),r[s]("DOMAttrModified",J,!0),setInterval(J,999)),c("hashchange",J,!0),["focus","mouseover","click","load","transitionend","animationend"].forEach(function(e){t[s](e,J,!0)}),/d$|^c/.test(t.readyState)?ne():(c("load",ne),t[s]("DOMContentLoaded",J),u(ne,2e4)),a.elements.length?(G(),w._lsFlush()):J()},checkElems:J,unveil:Z,_aLSL:te}}(),S=function(){var e,n=N(function(e,t,n,a){var i,r,o;if(e._lazysizesWidth=a,a+="px",e.setAttribute("sizes",a),m.test(t.nodeName||""))for(r=0,o=(i=t.getElementsByTagName("source")).length;r<o;r++)i[r].setAttribute("sizes",a);n.detail.dataAttr||A(e,n.detail)}),a=function(e,t,a){var i,r=e.parentNode;r&&(a=_(e,r,a),(i=b(e,"lazybeforesizes",{width:a,dataAttr:!!t})).defaultPrevented||(a=i.detail.width)&&a!==e._lazysizesWidth&&n(e,r,i,a))},r=x(function(){var t,n=e.length;if(n)for(t=0;t<n;t++)a(e[t])});return{_:function(){e=t.getElementsByClassName(i.autosizesClass),c("resize",r)},checkElems:r,updateElem:a}}(),B=function(){!B.i&&t.getElementsByClassName&&(B.i=!0,S._(),W._())};return u(function(){i.init&&B()}),a={cfg:i,autoSizer:S,loader:W,init:B,uP:A,aC:g,rC:p,hC:v,fire:b,gW:_,rAF:w}}(e,e.document,Date);e.lazySizes=t,"object"==typeof module&&module.exports&&(module.exports=t)}("undefined"!=typeof window?window:{});