var REDIPS=REDIPS||{};
REDIPS.drag=function(){var l=null,L=/\bredips-drag\b/i,r=0,J=0,la=null,ma=null,M=[],v=null,O=0,P=0,R=0,S=0,T=0,U=0,Z,f=[],aa,na,t,V=[],n=[],z=null,G=null,W=0,X=0,Ja=0,Ka=0,ea=!1,va=!1,ba=!1,oa=[],pa,I,h=null,y=null,D=null,k=null,A=null,N=null,u=null,E=null,Y=null,g=!1,p=!1,w="cell",fa={div:{},divClass:{},cname:"redips-only",other:"deny"},wa={action:"deny",cname:"redips-mark",exception:{},exceptionClass:{}},m={},La={keyDiv:!1,keyRow:!1,sendBack:!1,drop:!1};var Ma=function(){return!1};var ca=function(a){var b,
c;f.length=0;var d=void 0===a?z.getElementsByTagName("table"):document.querySelectorAll(a);for(b=a=0;a<d.length;a++)if(!("redips_clone"===d[a].parentNode.id||-1<d[a].className.indexOf("redips-nolayout"))){var e=d[a].parentNode;var q=0;do"TD"===e.nodeName&&q++,e=e.parentNode;while(e&&e!==z);f[b]=d[a];f[b].redips||(f[b].redips={});f[b].redips.container=z;f[b].redips.nestedLevel=q;f[b].redips.idx=b;oa[b]=0;q=f[b].getElementsByTagName("td");e=0;for(c=!1;e<q.length;e++)if(1<q[e].rowSpan){c=!0;break}f[b].redips.rowspan=
c;b++}a=0;for(d=aa=1;a<f.length;a++)if(0===f[a].redips.nestedLevel){f[a].redips.nestedGroup=d;f[a].redips.sort=100*aa;e=f[a].getElementsByTagName("table");for(b=0;b<e.length;b++)-1<e[b].className.indexOf("redips-nolayout")||(e[b].redips.nestedGroup=d,e[b].redips.sort=100*aa+e[b].redips.nestedLevel);d++;aa++}};var Pa=function(a){var b=a||window.event;if(!0===this.redips.animated)return!0;b.cancelBubble=!0;b.stopPropagation&&b.stopPropagation();va=b.shiftKey;a=b.which?b.which:b.button;if(Na(b)||!b.touches&&
1!==a)return!0;if(window.getSelection)window.getSelection().removeAllRanges();else if(document.selection&&"Text"===document.selection.type)try{document.selection.empty()}catch(e){}if(b.touches){a=W=b.touches[0].clientX;var c=X=b.touches[0].clientY}else a=W=b.clientX,c=X=b.clientY;Ja=a;Ka=c;ea=!1;REDIPS.drag.objOld=p=g||this;REDIPS.drag.obj=g=this;ba=-1<g.className.indexOf("redips-clone");REDIPS.drag.tableSort&&Za(g);z!==g.redips.container&&(z=g.redips.container,ca());B();ba||"cell"!==w||(g.style.zIndex=
999);REDIPS.drag.td.source=m.source=x("TD",g)||x("TH",g);REDIPS.drag.td.current=m.current=m.source;REDIPS.drag.td.previous=m.previous=m.source;h=D=y=f.indexOf(x("TABLE",m.source));k=N=A=x("TR",m.source).rowIndex;u=Y=E=m.source.cellIndex;var d=K(f[D],"position");"fixed"!==d&&(d=K(f[D].parentNode,"position"));n=H(m.current,d);-1===g.className.indexOf("row")?(REDIPS.drag.mode=w="cell",REDIPS.drag.event.clicked(m.current)):(REDIPS.drag.mode=w="row",REDIPS.drag.obj=g=qa(g),REDIPS.drag.event.rowClicked(m.current));
if(!1===f[h].redips.enabled)return!0;na=t=!1;REDIPS.event.add(document,"mousemove",ra);REDIPS.event.add(document,"touchmove",ra);REDIPS.event.add(document,"mouseup",sa);REDIPS.event.add(document,"touchend",sa);g.setCapture&&g.setCapture();null!==h&&null!==k&&null!==u&&(Z=Oa(h,k,u));d=H(g,d);l=[c-d[0],d[1]-a,d[2]-c,a-d[3]];z.onselectstart=function(a){b=a||window.event;if(!Na(b))return b.shiftKey&&document.selection.clear(),!1};return!1};var $a=function(a){REDIPS.drag.event.dblClicked()};var Za=function(a){var b=
x("TABLE",a).redips.nestedGroup;for(a=0;a<f.length;a++)f[a].redips.nestedGroup===b&&(f[a].redips.sort=100*aa+f[a].redips.nestedLevel);f.sort(function(a,b){return b.redips.sort-a.redips.sort});aa++};var qa=function(a,b){var c,d;if("DIV"===a.nodeName){var e=a;a=x("TR",a);void 0===a.redips&&(a.redips={});a.redips.div=e;return a}var q=a;void 0===q.redips&&(q.redips={});a=x("TABLE",a);ba&&t&&(e=q.redips.div,e.className=ha(e.className.replace("redips-clone","")));var f=a.cloneNode(!0);ba&&t&&(e.className+=
" redips-clone");var g=f.rows.length-1;e="animated"===b?0===g:!0;for(c=g;0<=c;c--)if(c!==q.rowIndex){if(!0===e&&void 0===b)for(g=f.rows[c],d=0;d<g.cells.length;d++)if(-1<g.cells[d].className.indexOf("redips-rowhandler")){e=!1;break}f.deleteRow(c)}t||(q.redips.emptyRow=e);f.redips={};f.redips.container=a.redips.container;f.redips.sourceRow=q;ab(q,f.rows[0]);Qa(q,f.rows[0]);document.getElementById("redips_clone").appendChild(f);a=H(q,"fixed");f.style.position="fixed";f.style.top=a[0]+"px";f.style.left=
a[3]+"px";f.style.width=a[1]-a[3]+"px";return f};var Ra=function(a,b,c){var d=!1;var e=function(a){if(void 0!==a.redips&&a.redips.emptyRow)xa(a,"empty",REDIPS.drag.style.rowEmptyColor);else{var b=x("TABLE",a);b.deleteRow(a.rowIndex)}};void 0===c?c=g:d=!0;var q=c.redips.sourceRow;var C=q.rowIndex;var k=x("TABLE",q);var bb=q.parentNode;a=f[a];b>a.rows.length-1&&(b=a.rows.length-1);var F=a.rows[b];var l=b;var n=F.parentNode;b=c.getElementsByTagName("tr")[0];c.parentNode.removeChild(c);!1!==REDIPS.drag.event.rowDroppedBefore(k,
C)&&(!d&&-1<m.target.className.indexOf(REDIPS.drag.trash.className)?t?REDIPS.drag.event.rowDeleted():REDIPS.drag.trash.questionRow?confirm(REDIPS.drag.trash.questionRow)?(e(q),REDIPS.drag.event.rowDeleted()):(delete p.redips.emptyRow,REDIPS.drag.event.rowUndeleted()):(e(q),REDIPS.drag.event.rowDeleted()):(l<a.rows.length?h===D?C>l?n.insertBefore(b,F):n.insertBefore(b,F.nextSibling):"after"===REDIPS.drag.rowDropMode?n.insertBefore(b,F.nextSibling):n.insertBefore(b,F):(n.appendChild(b),F=a.rows[0]),
F&&F.redips&&F.redips.emptyRow?a.deleteRow(F.rowIndex):"overwrite"===REDIPS.drag.rowDropMode?e(F):"switch"!==REDIPS.drag.rowDropMode||t||(bb.insertBefore(F,q),void 0!==q.redips&&delete q.redips.emptyRow),!d&&t||e(q),delete b.redips.emptyRow,d||REDIPS.drag.event.rowDropped(b,k,C)),0<b.getElementsByTagName("table").length&&ca())};var ab=function(a,b){var c=[],d=[];c[0]=a.getElementsByTagName("input");c[1]=a.getElementsByTagName("textarea");c[2]=a.getElementsByTagName("select");d[0]=b.getElementsByTagName("input");
d[1]=b.getElementsByTagName("textarea");d[2]=b.getElementsByTagName("select");for(a=0;a<c.length;a++)for(b=0;b<c[a].length;b++){var e=c[a][b].type;switch(e){case "text":case "textarea":case "password":d[a][b].value=c[a][b].value;break;case "radio":case "checkbox":d[a][b].checked=c[a][b].checked;break;case "select-one":d[a][b].selectedIndex=c[a][b].selectedIndex;break;case "select-multiple":for(e=0;e<c[a][b].options.length;e++)d[a][b].options[e].selected=c[a][b].options[e].selected}}};var sa=function(a){var b=
a||window.event;a=b.clientX;var c=b.clientY;T=U=0;g.releaseCapture&&g.releaseCapture();REDIPS.event.remove(document,"mousemove",ra);REDIPS.event.remove(document,"touchmove",ra);REDIPS.event.remove(document,"mouseup",sa);REDIPS.event.remove(document,"touchend",sa);z.onselectstart=null;Sa(g);la=document.documentElement.scrollWidth;ma=document.documentElement.scrollHeight;T=U=0;if(!t||"cell"!==w||null!==h&&null!==k&&null!==u)if(null===h||null===k||null===u)REDIPS.drag.event.notMoved();else{if(h<f.length){b=
f[h];REDIPS.drag.td.target=m.target=b.rows[k].cells[u];ia(h,k,u,Z);var d=h;var e=k}else null===y||null===A||null===E?(b=f[D],REDIPS.drag.td.target=m.target=b.rows[N].cells[Y],ia(D,N,Y,Z),d=D,e=N):(b=f[y],REDIPS.drag.td.target=m.target=b.rows[A].cells[E],ia(y,A,E,Z),d=y,e=A);if("row"===w)if(na)if(D===d&&N===e){b=g.getElementsByTagName("tr")[0];p.style.backgroundColor=b.style.backgroundColor;for(a=0;a<b.cells.length;a++)p.cells[a].style.backgroundColor=b.cells[a].style.backgroundColor;g.parentNode.removeChild(g);
delete p.redips.emptyRow;t?REDIPS.drag.event.rowNotCloned():REDIPS.drag.event.rowDroppedSource(m.target)}else Ra(d,e);else REDIPS.drag.event.rowNotMoved();else if(t||ea)if(t&&D===h&&N===k&&Y===u)g.parentNode.removeChild(g),--V[p.id],REDIPS.drag.event.notCloned();else if(t&&!1===REDIPS.drag.clone.drop&&(a<b.redips.offset[3]||a>b.redips.offset[1]||c<b.redips.offset[0]||c>b.redips.offset[2]))g.parentNode.removeChild(g),--V[p.id],REDIPS.drag.event.notCloned();else if(-1<m.target.className.indexOf(REDIPS.drag.trash.className))g.parentNode.removeChild(g),
REDIPS.drag.trash.question?setTimeout(function(){confirm(REDIPS.drag.trash.question)?Ta():(t||(f[D].rows[N].cells[Y].appendChild(g),B()),REDIPS.drag.event.undeleted())},20):Ta();else if("switch"===REDIPS.drag.dropMode)if(a=REDIPS.drag.event.droppedBefore(m.target),!1===a)ya(!1);else{g.parentNode.removeChild(g);b=m.target.getElementsByTagName("div");d=b.length;for(a=0;a<d;a++)void 0!==b[0]&&(REDIPS.drag.objOld=p=b[0],m.source.appendChild(p),da(p));ya();d&&REDIPS.drag.event.switched()}else"overwrite"===
REDIPS.drag.dropMode?(a=REDIPS.drag.event.droppedBefore(m.target),!1!==a&&ta(m.target)):a=REDIPS.drag.event.droppedBefore(m.target),ya(a);else REDIPS.drag.event.notMoved();"cell"===w&&0<g.getElementsByTagName("table").length&&ca();B();REDIPS.drag.event.finish()}else g.parentNode.removeChild(g),--V[p.id],REDIPS.drag.event.notCloned();y=A=E=null};var ya=function(a){var b=null,c;if(!1!==a){if(!0===La.sendBack){a=m.target.getElementsByTagName("DIV");for(c=0;c<a.length;c++)if(g!==a[c]&&0===g.id.indexOf(a[c].id)){b=
a[c];break}if(b){za(b,1);g.parentNode.removeChild(g);return}}"shift"!==REDIPS.drag.dropMode||!cb(m.target)&&"always"!==REDIPS.drag.shift.after||Aa(m.source,m.target);"top"===REDIPS.drag.multipleDrop&&m.target.hasChildNodes()?m.target.insertBefore(g,m.target.firstChild):m.target.appendChild(g);da(g);REDIPS.drag.event.dropped(m.target);t&&(REDIPS.drag.event.clonedDropped(m.target),za(p,-1))}else t&&g.parentNode&&g.parentNode.removeChild(g)};var da=function(a,b){!1===b?(a.onmousedown=null,a.ontouchstart=
null,a.ondblclick=null):(a.onmousedown=Pa,a.ontouchstart=Pa,a.ondblclick=$a)};var Sa=function(a){a.style.top="";a.style.left="";a.style.position="";a.style.zIndex=""};var Ta=function(){t&&za(p,-1);if("shift"===REDIPS.drag.dropMode&&("delete"===REDIPS.drag.shift.after||"always"===REDIPS.drag.shift.after)){switch(REDIPS.drag.shift.mode){case "vertical2":var a="lastInColumn";break;case "horizontal2":a="lastInRow";break;default:a="last"}Aa(m.source,Ua(a,m.source)[2])}REDIPS.drag.event.deleted(t)};var ra=
function(a){a=a||window.event;var b=REDIPS.drag.scroll.bound;if(a.touches){var c=W=a.touches[0].clientX;var d=X=a.touches[0].clientY}else c=W=a.clientX,d=X=a.clientY;var e=Math.abs(Ja-c);var q=Math.abs(Ka-d);if(!na){if("cell"===w&&(ba||!0===REDIPS.drag.clone.keyDiv&&va))REDIPS.drag.objOld=p=g,REDIPS.drag.obj=g=Ba(g,!0),t=!0,REDIPS.drag.event.cloned();else{if("row"===w){if(ba||!0===REDIPS.drag.clone.keyRow&&va)t=!0;REDIPS.drag.objOld=p=g;REDIPS.drag.obj=g=qa(g);g.style.zIndex=999}g.setCapture&&g.setCapture();
g.style.position="fixed";B();ja();"row"===w&&(t?REDIPS.drag.event.rowCloned():REDIPS.drag.event.rowMoved())}Ca();c>r-l[1]&&(g.style.left=r-(l[1]+l[3])+"px");d>J-l[2]&&(g.style.top=J-(l[0]+l[2])+"px")}na=!0;"cell"===w&&(7<e||7<q)&&!ea&&(ea=!0,Ca(),REDIPS.drag.event.moved(t));c>l[3]&&c<r-l[1]&&(g.style.left=c-l[3]+"px");d>l[0]&&d<J-l[2]&&(g.style.top=d-l[0]+"px");c<G[1]&&c>G[3]&&d<G[2]&&d>G[0]&&0===T&&0===U&&(n.containTable||c<n[3]||c>n[1]||d<n[0]||d>n[2])&&(ja(),Da());if(REDIPS.drag.scroll.enable)for(O=
b-(r/2>c?c-l[3]:r-c-l[1]),0<O?(O>b&&(O=b),e=Q()[0],O*=c<r/2?-1:1,0>O&&0>=e||0<O&&e>=la-r||0!==T++||(REDIPS.event.remove(window,"scroll",B),Ea(window))):O=0,P=b-(J/2>d?d-l[0]:J-d-l[2]),0<P?(P>b&&(P=b),e=Q()[1],P*=d<J/2?-1:1,0>P&&0>=e||0<P&&e>=ma-J||0!==U++||(REDIPS.event.remove(window,"scroll",B),Fa(window))):P=0,q=0;q<M.length;q++)if(e=M[q],e.autoscroll&&c<e.offset[1]&&c>e.offset[3]&&d<e.offset[2]&&d>e.offset[0]){R=b-(e.midstX>c?c-l[3]-e.offset[3]:e.offset[1]-c-l[1]);0<R?(R>b&&(R=b),R*=c<e.midstX?
-1:1,0===T++&&(REDIPS.event.remove(e.div,"scroll",B),Ea(e.div))):R=0;S=b-(e.midstY>d?d-l[0]-e.offset[0]:e.offset[2]-d-l[2]);0<S?(S>b&&(S=b),S*=d<e.midstY?-1:1,0===U++&&(REDIPS.event.remove(e.div,"scroll",B),Fa(e.div))):S=0;break}else R=S=0;a.cancelBubble=!0;a.stopPropagation&&a.stopPropagation()};var Da=function(){h<f.length&&(h!==y||k!==A||u!==E)&&(null!==y&&null!==A&&null!==E&&(ia(y,A,E,Z),REDIPS.drag.td.previous=m.previous=f[y].rows[A].cells[E],REDIPS.drag.td.current=m.current=f[h].rows[k].cells[u],
"switching"===REDIPS.drag.dropMode&&"cell"===w&&(ua(m.current,m.previous),B(),ja()),"cell"===w?REDIPS.drag.event.changed(m.current):"row"!==w||h===y&&k===A||REDIPS.drag.event.rowChanged(m.current)),Ca())};var Va=function(){"number"===typeof window.innerWidth?(r=window.innerWidth,J=window.innerHeight):document.documentElement&&(document.documentElement.clientWidth||document.documentElement.clientHeight)?(r=document.documentElement.clientWidth,J=document.documentElement.clientHeight):document.body&&
(document.body.clientWidth||document.body.clientHeight)&&(r=document.body.clientWidth,J=document.body.clientHeight);la=document.documentElement.scrollWidth;ma=document.documentElement.scrollHeight;B()};var ja=function(){var a;var b=[];var c=function(){null!==y&&null!==A&&null!==E&&(h=y,k=A,u=E)};var d=function(a,b,c){var d=null,e;for(e in c)if(-1<a.indexOf(e)&&(d=!1,-1<b.indexOf(c[e]))){d=!0;break}return d};var e=W;var q=X;for(h=0;h<f.length;h++)if(!1!==f[h].redips.enabled&&(b[0]=f[h].redips.offset[0],
b[1]=f[h].redips.offset[1],b[2]=f[h].redips.offset[2],b[3]=f[h].redips.offset[3],void 0!==f[h].sca&&(b[0]=b[0]>f[h].sca.offset[0]?b[0]:f[h].sca.offset[0],b[1]=b[1]<f[h].sca.offset[1]?b[1]:f[h].sca.offset[1],b[2]=b[2]<f[h].sca.offset[2]?b[2]:f[h].sca.offset[2],b[3]=b[3]>f[h].sca.offset[3]?b[3]:f[h].sca.offset[3]),b[3]<e&&e<b[1]&&b[0]<q&&q<b[2])){var C=f[h].redips.rowOffset;for(k=0;k<C.length-1;k++)if(void 0!==C[k]){n[0]=C[k][0];if(void 0!==C[k+1])n[2]=C[k+1][0];else for(a=k+2;a<C.length;a++)if(void 0!==
C[a]){n[2]=C[a][0];break}if(q<=n[2])break}a=k;k===C.length-1&&(n[0]=C[k][0],n[2]=f[h].redips.offset[2]);do for(u=b=f[h].rows[k].cells.length-1;0<=u;u--){b=f[h].rows[k].cells[u];n[3]=C[k][3]+b.offsetLeft;n[1]=n[3]+b.offsetWidth;var m=n[0]+(b.offsetTop-f[h].rows[k].offsetTop);if(n[3]<=e&&e<=n[1]&&m<=q&&q<=m+b.offsetHeight){n[0]=m;n[2]=m+b.offsetHeight;break}}while(f[h].redips.rowspan&&-1===u&&0<k--);0>k||0>u?c():k!==a&&(n[0]=C[k][0],n[2]=n[0]+f[h].rows[k].cells[u].offsetHeight,(q<n[0]||q>n[2])&&c());
b=f[h].rows[k].cells[u];n.containTable=0<b.childNodes.length&&0<b.getElementsByTagName("table").length;if(-1===b.className.indexOf(REDIPS.drag.trash.className))if(e=d(g.className,b.className,fa.divClass),-1<b.className.indexOf(REDIPS.drag.only.cname)){if(-1===b.className.indexOf(fa.div[g.id])&&!0!==e){c();break}}else if(void 0===fa.div[g.id]&&null===e||"deny"!==fa.other){if(e=-1<b.className.indexOf(REDIPS.drag.mark.cname),!0===e&&"deny"===REDIPS.drag.mark.action||!1===e&&"allow"===REDIPS.drag.mark.action)if(e=
d(g.className,b.className,wa.exceptionClass),-1===b.className.indexOf(wa.exception[g.id])&&!0!==e){c();break}}else{c();break}d=-1<b.className.indexOf("redips-single");if("cell"===w){if(("single"===REDIPS.drag.dropMode||d)&&0<b.childNodes.length){if(1===b.childNodes.length&&3===b.firstChild.nodeType)break;d=!0;for(a=b.childNodes.length-1;0<=a;a--)if(b.childNodes[a].className&&-1<b.childNodes[a].className.indexOf("redips-drag")){d=!1;break}if(!d&&null!==y&&null!==A&&null!==E&&(D!==h||N!==k||Y!==u)){c();
break}}if(-1<b.className.indexOf("redips-rowhandler")){c();break}if(b.parentNode.redips&&b.parentNode.redips.emptyRow){c();break}}break}};var Ca=function(){h<f.length&&null!==h&&null!==k&&null!==u&&(Z=Oa(h,k,u),ia(h,k,u),y=h,A=k,E=u)};var ia=function(a,b,c,d){if("cell"===w&&ea)c=f[a].rows[b].cells[c].style,c.backgroundColor=void 0===d?REDIPS.drag.hover.colorTd:d.color[0].toString(),void 0!==REDIPS.drag.hover.borderTd&&(void 0===d?c.border=REDIPS.drag.hover.borderTd:(c.borderTopWidth=d.top[0][0],c.borderTopStyle=
d.top[0][1],c.borderTopColor=d.top[0][2],c.borderRightWidth=d.right[0][0],c.borderRightStyle=d.right[0][1],c.borderRightColor=d.right[0][2],c.borderBottomWidth=d.bottom[0][0],c.borderBottomStyle=d.bottom[0][1],c.borderBottomColor=d.bottom[0][2],c.borderLeftWidth=d.left[0][0],c.borderLeftStyle=d.left[0][1],c.borderLeftColor=d.left[0][2]));else if("row"===w)for(a=f[a].rows[b],b=0;b<a.cells.length;b++)c=a.cells[b].style,c.backgroundColor=void 0===d?REDIPS.drag.hover.colorTr:d.color[b].toString(),void 0!==
REDIPS.drag.hover.borderTr&&(void 0===d?h===D?k<N?c.borderTop=REDIPS.drag.hover.borderTr:c.borderBottom=REDIPS.drag.hover.borderTr:"before"===REDIPS.drag.rowDropMode?c.borderTop=REDIPS.drag.hover.borderTr:c.borderBottom=REDIPS.drag.hover.borderTr:(c.borderTopWidth=d.top[b][0],c.borderTopStyle=d.top[b][1],c.borderTopColor=d.top[b][2],c.borderBottomWidth=d.bottom[b][0],c.borderBottomStyle=d.bottom[b][1],c.borderBottomColor=d.bottom[b][2]))};var Oa=function(a,b,c){var d={color:[],top:[],right:[],bottom:[],
left:[]},e=function(a,b){var c="border"+b+"Style",d="border"+b+"Color";return[K(a,"border"+b+"Width"),K(a,c),K(a,d)]};if("cell"===w)c=f[a].rows[b].cells[c],d.color[0]=c.style.backgroundColor,void 0!==REDIPS.drag.hover.borderTd&&(d.top[0]=e(c,"Top"),d.right[0]=e(c,"Right"),d.bottom[0]=e(c,"Bottom"),d.left[0]=e(c,"Left"));else for(a=f[a].rows[b],b=0;b<a.cells.length;b++)c=a.cells[b],d.color[b]=c.style.backgroundColor,void 0!==REDIPS.drag.hover.borderTr&&(d.top[b]=e(c,"Top"),d.bottom[b]=e(c,"Bottom"));
return d};var H=function(a,b,c){var d=0,e=0,q=a;"fixed"!==b&&(d=0-pa[0],e=0-pa[1]);if(void 0===c||!0===c){do d+=a.offsetLeft-a.scrollLeft,e+=a.offsetTop-a.scrollTop,a=a.offsetParent;while(a&&"BODY"!==a.nodeName)}else{do d+=a.offsetLeft,e+=a.offsetTop,a=a.offsetParent;while(a&&"BODY"!==a.nodeName)}return[e,d+q.offsetWidth,e+q.offsetHeight,d]};var B=function(){var a,b;pa=Q();for(a=0;a<f.length;a++){var c=[];var d=K(f[a],"position");"fixed"!==d&&(d=K(f[a].parentNode,"position"));for(b=f[a].rows.length-
1;0<=b;b--)"none"!==f[a].rows[b].style.display&&(c[b]=H(f[a].rows[b],d));f[a].redips.offset=H(f[a],d);f[a].redips.rowOffset=c}G=H(z);for(a=0;a<M.length;a++)d=K(M[a].div,"position"),b=H(M[a].div,d,!1),M[a].offset=b,M[a].midstX=(b[1]+b[3])/2,M[a].midstY=(b[0]+b[2])/2};var Q=function(){if("number"===typeof window.pageYOffset){var a=window.pageXOffset;var b=window.pageYOffset}else document.body&&(document.body.scrollLeft||document.body.scrollTop)?(a=document.body.scrollLeft,b=document.body.scrollTop):
document.documentElement&&(document.documentElement.scrollLeft||document.documentElement.scrollTop)?(a=document.documentElement.scrollLeft,b=document.documentElement.scrollTop):a=b=0;return[a,b]};var Ea=function(a){var b=W;var c=X;0<T&&(B(),ja(),b<G[1]&&b>G[3]&&c<G[2]&&c>G[0]&&Da());"object"===typeof a&&(v=a);v===window?(a=Q()[0],b=la-r,c=O):(a=v.scrollLeft,b=v.scrollWidth-v.clientWidth,c=R);0<T&&(0>c&&0<a||0<c&&a<b)?(v===window?(window.scrollBy(c,0),Q(),a=parseInt(g.style.left,10),isNaN(a)):v.scrollLeft+=
c,setTimeout(Ea,REDIPS.drag.scroll.speed)):(REDIPS.event.add(v,"scroll",B),T=0,n=[0,0,0,0])};var Fa=function(a){var b=W;var c=X;0<U&&(B(),ja(),b<G[1]&&b>G[3]&&c<G[2]&&c>G[0]&&Da());"object"===typeof a&&(v=a);v===window?(a=Q()[1],b=ma-J,c=P):(a=v.scrollTop,b=v.scrollHeight-v.clientHeight,c=S);0<U&&(0>c&&0<a||0<c&&a<b)?(v===window?(window.scrollBy(0,c),Q(),a=parseInt(g.style.top,10),isNaN(a)):v.scrollTop+=c,setTimeout(Fa,REDIPS.drag.scroll.speed)):(REDIPS.event.add(v,"scroll",B),U=0,n=[0,0,0,0])};var Ba=
function(a,b){var c=a.cloneNode(!0),d=c.className;if(!0===b){document.getElementById("redips_clone").appendChild(c);c.style.zIndex=999;c.style.position="fixed";b=H(a);var e=H(c);c.style.top=b[0]-e[0]+"px";c.style.left=b[3]-e[3]+"px"}c.setCapture&&c.setCapture();d=d.replace("redips-clone","");d=d.replace(/climit(\d)_(\d+)/,"");c.className=ha(d);void 0===V[a.id]&&(V[a.id]=0);c.id=a.id+"c"+V[a.id];V[a.id]+=1;Qa(a,c);return c};var Qa=function(a,b){var c=[];c[0]=function(a,b){a.redips&&(b.redips={},b.redips.enabled=
a.redips.enabled,b.redips.container=a.redips.container,a.redips.enabled&&da(b))};c[1]=function(a,b){a.redips&&(b.redips={},b.redips.emptyRow=a.redips.emptyRow)};var d=function(d){var e;var f=["DIV","TR"];var g=a.getElementsByTagName(f[d]);f=b.getElementsByTagName(f[d]);for(e=0;e<f.length;e++)c[d](g[e],f[e])};if("DIV"===a.nodeName)c[0](a,b);else if("TR"===a.nodeName)c[1](a,b);d(0);d(1)};var za=function(a,b){var c=a.className;var d=c.match(/climit(\d)_(\d+)/);if(null!==d){var e=parseInt(d[1],10);d=
parseInt(d[2],10);0===d&&1===b&&(c+=" redips-clone",2===e&&ka(!0,a));d+=b;c=c.replace(/climit\d_\d+/g,"climit"+e+"_"+d);0>=d&&(c=c.replace("redips-clone",""),2===e?(ka(!1,a),REDIPS.drag.event.clonedEnd2()):REDIPS.drag.event.clonedEnd1());a.className=ha(c)}};var Na=function(a){var b=/\bredips-nodrag\b/i;if(a.srcElement){var c=a.srcElement.nodeName;a=a.srcElement.className}else c=a.target.nodeName,a=a.target.className;switch(c){case "A":case "INPUT":case "SELECT":case "OPTION":case "TEXTAREA":c=!0;
break;default:c=b.test(a)}return c};var ka=function(a,b){var c,d=[],e=/\bredips-noautoscroll\b/i;var f=REDIPS.drag.style.opacityDisabled;if(!0===a||"init"===a){var g=REDIPS.drag.style.borderEnabled;var h="move";var m=!0}else g=REDIPS.drag.style.borderDisabled,h="auto",m=!1;void 0===b?d=z.getElementsByTagName("div"):"string"===typeof b?d=document.querySelectorAll(b):"object"!==typeof b||"DIV"===b.nodeName&&-1!==b.className.indexOf("redips-drag")?d[0]=b:d=b.getElementsByTagName("div");for(c=b=0;b<d.length;b++)if(L.test(d[b].className))"init"===
a||void 0===d[b].redips?(d[b].redips={},d[b].redips.container=z):!0===a&&"number"===typeof f?(d[b].style.opacity="",d[b].style.filter=""):!1===a&&"number"===typeof f&&(d[b].style.opacity=f/100,d[b].style.filter="alpha(opacity="+f+")"),da(d[b],m),d[b].style.borderStyle=g,d[b].style.cursor=h,d[b].redips.enabled=m;else if("init"===a){var k=K(d[b],"overflow");if("visible"!==k){REDIPS.event.add(d[b],"scroll",B);k=K(d[b],"position");var l=H(d[b],k,!1);k=!e.test(d[b].className);M[c]={div:d[b],offset:l,midstX:(l[1]+
l[3])/2,midstY:(l[0]+l[2])/2,autoscroll:k};l=d[b].getElementsByTagName("table");for(k=0;k<l.length;k++)l[k].sca=M[c];c++}}};var Wa=function(a){"object"===typeof a&&"DIV"===a.nodeName?a.parentNode.removeChild(a):"string"===typeof a&&(a=document.getElementById(a))&&a.parentNode.removeChild(a)};var K=function(a,b){var c;a&&a.currentStyle?c=a.currentStyle[b]:a&&window.getComputedStyle&&(c=document.defaultView.getComputedStyle(a,null)[b]);return c};var x=function(a,b,c){b=b.parentNode;for(void 0===c&&
(c=0);b;){if(b.nodeName===a)if(0<c)c--;else break;b=b.parentNode}return b};var Ua=function(a,b){var c=x("TABLE",b);switch(a){case "firstInColumn":a=0;b=b.cellIndex;break;case "firstInRow":a=b.parentNode.rowIndex;b=0;break;case "lastInColumn":a=c.rows.length-1;b=b.cellIndex;break;case "lastInRow":a=b.parentNode.rowIndex;b=c.rows[a].cells.length-1;break;case "last":a=c.rows.length-1;b=c.rows[a].cells.length-1;break;default:a=b=0}return[a,b,c.rows[a].cells[b]]};var db=function(a,b){200===a.status?Ga(b.targetTable,
a.responseText):REDIPS.drag.error.loadContent({type:0,message:"AJAX error: ["+a.status+"] "+a.statusText,content:null,rowIndex:null,cellIndex:null})};var Ga=function(a,b){"string"===typeof a&&(a=document.getElementById(a));if(void 0===a||null===a||"TABLE"!==a.nodeName)REDIPS.drag.error.loadContent({type:0,message:"Target table does not exist",content:null,rowIndex:null,cellIndex:null});else{if(Array.isArray(b))var c=b;else try{c=JSON.parse(b)}catch(F){REDIPS.drag.error.loadContent({type:0,message:F.message,
content:null,rowIndex:null,cellIndex:null});return}for(b=0;b<c.length;b++){var d=c[b][0];var e=c[b][1];var f=c[b][2];var g=c[b][3];var h=c[b][4];var k=document.createElement("div");k.id=d;k.className=ha("redips-drag "+g);k.innerHTML=h;if(void 0===a.rows[e]){if(k=REDIPS.drag.error.loadContent({type:1,message:"Target TR ["+e+"] does not exist",content:h,rowIndex:e,cellIndex:f}),!1===k)break}else if(void 0===a.rows[e].cells[f]){if(k=REDIPS.drag.error.loadContent({type:2,message:"Target TD ["+e+","+f+
"] does not exist",content:h,rowIndex:e,cellIndex:f}),!1===k)break}else a.rows[e].cells[f].appendChild(k),ka(!0,k)}}};var Xa=function(a,b,c){var d="GET",e="",f;void 0===I&&(I=new XMLHttpRequest);"object"===typeof c&&("string"===typeof c.method&&"POST"===c.method&&(d="POST"),"string"===typeof c.data&&(e=c.data));I.open(d,a,!0);I.onreadystatechange=function(){if(I.readyState===XMLHttpRequest.DONE){if(200!==I.status&&(f=REDIPS.drag.error.ajax(I,c),!1===f))return;"function"===typeof b&&b.call(this,I,
c)}};I.setRequestHeader("X-Requested-With","XMLHttpRequest");"GET"===d?I.send(null):(I.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),I.send(e))};var ua=function(a,b,c){var d=function(a,b){REDIPS.drag.event.relocateBefore(a,b);var c=REDIPS.drag.getPosition(b);REDIPS.drag.moveObject({obj:a,target:c,callback:function(a){var c=REDIPS.drag.findParent("TABLE",a),d=c.redips.idx;REDIPS.drag.event.relocateAfter(a,b);oa[d]--;0===oa[d]&&(REDIPS.drag.event.relocateEnd(),REDIPS.drag.enableTable(!0,
c))}})};if(a!==b&&"object"===typeof a&&"object"===typeof b){var e=a.childNodes.length;if("animation"===c){if(0<e){c=x("TABLE",b);var f=c.redips.idx;REDIPS.drag.enableTable(!1,c);for(c=0;c<e;c++)1===a.childNodes[c].nodeType&&"DIV"===a.childNodes[c].nodeName&&(oa[f]++,d(a.childNodes[c],b))}}else for(d=c=0;c<e;c++)1===a.childNodes[d].nodeType&&"DIV"===a.childNodes[d].nodeName?(f=a.childNodes[d],REDIPS.drag.event.relocateBefore(f,b),b.appendChild(f),f.redips&&!1!==f.redips.enabled&&da(f),REDIPS.drag.event.relocateAfter(f)):
d++}};var ta=function(a,b){var c=[];if("TD"===a.nodeName){var d=a.childNodes.length;if("test"===b)return a=m.source===a?void 0:0===a.childNodes.length||1===a.childNodes.length&&3===a.firstChild.nodeType;for(b=0;b<d;b++)c.push(a.childNodes[0]),a.removeChild(a.childNodes[0]);return c}};var Aa=function(a,b){var c,d,e,f=!1;var g=function(a,b){REDIPS.drag.shift.animation?ua(a,b,"animation"):ua(a,b)};var k=function(a){"delete"===REDIPS.drag.shift.overflow?ta(a):"source"===REDIPS.drag.shift.overflow?g(a,
m.source):"object"===typeof REDIPS.drag.shift.overflow&&g(a,REDIPS.drag.shift.overflow);f=!1;REDIPS.drag.event.shiftOverflow(a)};if(a!==b){var h=REDIPS.drag.shift.mode;var l=x("TABLE",a);var n=x("TABLE",b);var u=eb(n);var p=l===n?[a.redips.rowIndex,a.redips.cellIndex]:[-1,-1];var t=[b.redips.rowIndex,b.redips.cellIndex];var r=n.rows.length;var v=fb(n);switch(h){case "vertical2":a=l===n&&a.redips.cellIndex===b.redips.cellIndex?p:[r,b.redips.cellIndex];break;case "horizontal2":a=l===n&&a.parentNode.rowIndex===
b.parentNode.rowIndex?p:[b.redips.rowIndex,v];break;default:a=l===n?p:[r,v]}"vertical1"===h||"vertical2"===h?(h=1E3*a[1]+a[0]<1E3*t[1]+t[0]?1:-1,b=r,r=0,v=1):(h=1E3*a[0]+a[1]<1E3*t[0]+t[1]?1:-1,b=v,r=1,v=0);for(a[0]!==p[0]&&a[1]!==p[1]&&(f=!0);a[0]!==t[0]||a[1]!==t[1];)l=u[a[0]+"-"+a[1]],a[r]+=h,0>a[r]?(a[r]=b,a[v]--):a[r]>b&&(a[r]=0,a[v]++),p=u[a[0]+"-"+a[1]],void 0!==p&&(c=p),void 0!==l&&(d=l),void 0!==p&&void 0!==d||void 0!==c&&void 0!==l?(p=-1===c.className.indexOf(REDIPS.drag.mark.cname)?0:1,
l=-1===d.className.indexOf(REDIPS.drag.mark.cname)?0:1,f&&0===p&&1===l&&k(c),1===p?0===l&&(e=d):(0===p&&1===l&&(d=e),g(c,d))):f&&void 0!==c&&void 0===d&&(p=-1===c.className.indexOf(REDIPS.drag.mark.cname)?0:1,0===p&&k(c))}};var eb=function(a){var b=[],c={},d,e,f,g;var k=a.rows;for(d=0;d<k.length;d++)for(e=0;e<k[d].cells.length;e++){var h=k[d].cells[e];a=h.parentNode.rowIndex;var l=h.rowSpan||1;var m=h.colSpan||1;b[a]=b[a]||[];for(f=0;f<b[a].length+1;f++)if("undefined"===typeof b[a][f]){var n=f;break}c[a+
"-"+n]=h;void 0===h.redips&&(h.redips={});h.redips.rowIndex=a;h.redips.cellIndex=n;for(f=a;f<a+l;f++)for(b[f]=b[f]||[],h=b[f],g=n;g<n+m;g++)h[g]="x"}return c};var fb=function(a){"string"===typeof a&&(a=document.getElementById(a));a=a.rows;var b,c=0,d,e;for(d=0;d<a.length;d++){for(e=b=0;e<a[d].cells.length;e++)b+=a[d].cells[e].colSpan||1;b>c&&(c=b)}return c};var Ya=function(a,b){var c=(b.k1-b.k2*a)*(b.k1-b.k2*a);a+=REDIPS.drag.animation.step*(4-3*c)*b.direction;var d=b.m*a+b.b;"horizontal"===b.type?
(b.obj.style.left=a+"px",b.obj.style.top=d+"px"):(b.obj.style.left=d+"px",b.obj.style.top=a+"px");a<b.last&&0<b.direction||a>b.last&&0>b.direction?setTimeout(function(){Ya(a,b)},REDIPS.drag.animation.pause*c):(Sa(b.obj),b.obj.redips&&(b.obj.redips.animated=!1),"cell"===b.mode?(!0===b.overwrite&&ta(b.targetCell),b.targetCell.appendChild(b.obj),b.obj.redips&&!1!==b.obj.redips.enabled&&da(b.obj)):Ra(Ha(b.target[0]),b.target[1],b.obj),"function"===typeof b.callback&&b.callback(b.obj))};var Ia=function(a){var b,
c;var d=b=c=-1;if(void 0===a)d=h<f.length?f[h].redips.idx:null===y||null===A||null===E?f[D].redips.idx:f[y].redips.idx,b=f[D].redips.idx,d=[d,k,u,b,N,Y];else{if(a="string"===typeof a?document.getElementById(a):a)"TD"!==a.nodeName&&(a=x("TD",a)),a&&"TD"===a.nodeName&&(d=a.cellIndex,b=a.parentNode.rowIndex,c=x("TABLE",a),c=c.redips.idx);d=[c,b,d]}return d};var Ha=function(a){var b;for(b=0;b<f.length&&f[b].redips.idx!==a;b++);return b};var ha=function(a){void 0!==a&&(a=a.replace(/^\s+|\s+$/g,"").replace(/\s{2,}/g,
" "));return a};var cb=function(a){var b;for(b=0;b<a.childNodes.length;b++)if(1===a.childNodes[b].nodeType)return!0;return!1};var xa=function(a,b,c){var d,e;"string"===typeof a&&(a=document.getElementById(a),a=x("TABLE",a));if("TR"===a.nodeName)for(a=a.getElementsByTagName("td"),d=0;d<a.length;d++)if(a[d].style.backgroundColor=c||"","empty"===b)a[d].innerHTML="";else for(e=0;e<a[d].childNodes.length;e++)1===a[d].childNodes[e].nodeType&&(a[d].childNodes[e].style.opacity=b/100,a[d].childNodes[e].style.filter=
"alpha(opacity="+b+")");else a.style.opacity=b/100,a.style.filter="alpha(opacity="+b+")",a.style.backgroundColor=c||""};return{obj:g,objOld:p,mode:w,td:m,hover:{colorTd:"#E7AB83",colorTr:"#E7AB83"},scroll:{enable:!0,bound:25,speed:20},only:fa,mark:wa,style:{borderEnabled:"solid",borderDisabled:"dotted",opacityDisabled:"",rowEmptyColor:"white"},trash:{className:"redips-trash",question:null,questionRow:null},saveParamName:"p",dropMode:"multiple",multipleDrop:"bottom",clone:La,animation:{pause:20,step:2,
shift:!1},shift:{mode:"horizontal1",after:"default",overflow:"bunch"},rowDropMode:"before",tableSort:!0,init:function(a){if(void 0===a||"string"!==typeof a)a="redips-drag";z=document.getElementById(a);if(null===z)throw Error("REDIPS.drag: drag container is not set");pa=Q();document.getElementById("redips_clone")||(a=document.createElement("div"),a.id="redips_clone",a.style.width=a.style.height="1px",z.appendChild(a));ka("init");ca();Va();REDIPS.event.add(window,"resize",Va);var b=z.getElementsByTagName("img");
for(a=0;a<b.length;a++)REDIPS.event.add(b[a],"mousemove",Ma),REDIPS.event.add(b[a],"touchmove",Ma);REDIPS.event.add(window,"scroll",B)},initTables:ca,enableDrag:ka,clearTable:function(a){var b;"string"===typeof a&&(a=document.getElementById(a));if("object"!==typeof a||"TABLE"!==a.nodeName)console.log("REDIPS.drag.clearTable: input element is not HTML table");else for(a=a.getElementsByTagName("DIV"),b=a.length-1;0<=b;b--)L.test(a[b].className)&&Wa(a[b])},enableTable:function(a,b){var c;if("object"===
typeof b&&"TABLE"===b.nodeName)b.redips.enabled=a;else for(c=0;c<f.length;c++)-1<f[c].className.indexOf(b)&&(f[c].redips.enabled=a)},cloneObject:Ba,saveContent:function(a,b){var c="",d,e,f,g=[],h=REDIPS.drag.saveParamName;"string"===typeof a&&(a=document.getElementById(a));if(void 0!==a&&"object"===typeof a&&"TABLE"===a.nodeName){var k=a.rows.length;for(d=0;d<k;d++){var l=a.rows[d].cells.length;for(e=0;e<l;e++){var m=a.rows[d].cells[e];if(0<m.childNodes.length)for(f=0;f<m.childNodes.length;f++){var n=
m.childNodes[f];if("DIV"===n.nodeName&&-1<n.className.indexOf("redips-drag")){var p=n.className.replace(/redips-\w+/g,"");p=ha(p);var r=n.innerText||n.textContent;c+=h+"[]="+n.id+"_"+d+"_"+e+"_"+p+"_"+r+"&";g.push([n.id,d,e,p,r])}}}}c="json"===b&&0<g.length?JSON.stringify(g):c.substring(0,c.length-1)}return c},loadContent:function(a,b){if(Array.isArray(b))Ga(a,b);else if("string"===typeof b)try{JSON.parse(b),Ga(a,b)}catch(c){Xa(b,db,{targetTable:a})}else REDIPS.drag.error.loadContent({type:0,message:"Invalid input parameter (URL or JSON is expected)",
content:null,rowIndex:null,cellIndex:null})},ajaxCall:Xa,relocate:ua,emptyCell:ta,moveObject:function(a){var b={direction:1};b.callback=a.callback;b.overwrite=a.overwrite;"string"===typeof a.id?b.obj=b.objOld=document.getElementById(a.id):"object"===typeof a.obj&&"DIV"===a.obj.nodeName&&(b.obj=b.objOld=a.obj);if("row"===a.mode){b.mode="row";var c=Ha(a.source[0]);var d=a.source[1];p=b.objOld=f[c].rows[d];if(p.redips&&!0===p.redips.emptyRow)return!1;b.obj=qa(b.objOld,"animated")}else if(b.obj&&-1<b.obj.className.indexOf("redips-row")){b.mode=
"row";b.obj=b.objOld=p=x("TR",b.obj);if(p.redips&&!0===p.redips.emptyRow)return!1;b.obj=qa(b.objOld,"animated")}else b.mode="cell";if("object"===typeof b.obj&&null!==b.obj){b.obj.style.zIndex=999;b.obj.redips&&z!==b.obj.redips.container&&(z=b.obj.redips.container,ca());c=H(b.obj);var e=c[1]-c[3];var g=c[2]-c[0];var h=c[3];var k=c[0];!0===a.clone&&"cell"===b.mode&&(b.obj=Ba(b.obj,!0),REDIPS.drag.event.cloned(b.obj));void 0===a.target?a.target=Ia():"object"===typeof a.target&&"TD"===a.target.nodeName&&
(a.target=Ia(a.target));b.target=a.target;c=Ha(a.target[0]);d=a.target[1];a=a.target[2];d>f[c].rows.length-1&&(d=f[c].rows.length-1);b.targetCell=f[c].rows[d].cells[a];"cell"===b.mode?(c=H(b.targetCell),d=c[1]-c[3],a=c[2]-c[0],e=c[3]+(d-e)/2,g=c[0]+(a-g)/2):(c=H(f[c].rows[d]),e=c[3],g=c[0]);c=e-h;a=g-k;b.obj.style.position="fixed";Math.abs(c)>Math.abs(a)?(b.type="horizontal",b.m=a/c,b.b=k-b.m*h,b.k1=(h+e)/(h-e),b.k2=2/(h-e),h>e&&(b.direction=-1),c=h,b.last=e):(b.type="vertical",b.m=c/a,b.b=h-b.m*
k,b.k1=(k+g)/(k-g),b.k2=2/(k-g),k>g&&(b.direction=-1),c=k,b.last=g);b.obj.redips&&(b.obj.redips.animated=!0);Ya(c,b);return[b.obj,b.objOld]}},shiftCells:Aa,deleteObject:Wa,getPosition:Ia,rowOpacity:xa,rowEmpty:function(a,b,c){a=document.getElementById(a).rows[b];void 0===c&&(c=REDIPS.drag.style.rowEmptyColor);void 0===a.redips&&(a.redips={});a.redips.emptyRow=!0;xa(a,"empty",c)},getScrollPosition:Q,getStyle:K,findParent:x,findCell:Ua,event:{changed:function(){},clicked:function(){},cloned:function(){},
clonedDropped:function(){},clonedEnd1:function(){},clonedEnd2:function(){},dblClicked:function(){},deleted:function(){},dropped:function(){},droppedBefore:function(){},finish:function(){},moved:function(){},notCloned:function(){},notMoved:function(){},shiftOverflow:function(){},relocateBefore:function(){},relocateAfter:function(){},relocateEnd:function(){},rowChanged:function(){},rowClicked:function(){},rowCloned:function(){},rowDeleted:function(){},rowDropped:function(){},rowDroppedBefore:function(){},
rowDroppedSource:function(){},rowMoved:function(){},rowNotCloned:function(){},rowNotMoved:function(){},rowUndeleted:function(){},switched:function(){},undeleted:function(){}},error:{ajax:function(){},loadContent:function(){}}}}();
REDIPS.event||(REDIPS.event=function(){return{add:function(l,L,r){l.addEventListener?l.addEventListener(L,r,!1):l.attachEvent?l.attachEvent("on"+L,r):l["on"+L]=r},remove:function(l,L,r){l.removeEventListener?l.removeEventListener(L,r,!1):l.detachEvent?l.detachEvent("on"+L,r):l["on"+L]=null}}}());