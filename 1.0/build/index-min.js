/*! findlinks - v1.0 - 2013-09-13 9:54:23 AM
* Copyright (c) 2013 chishang.lcw; Licensed  */
KISSY.add("gallery/findlinks/1.0/index",function(a,b,c){function d(a){var b=this;d.superclass.constructor.call(b,a),b.init()}var e="",f=b.all;return a.extend(d,c,{init:function(){var a=this;a._createUI(),a._bindUI(),a._bindModelChange()},_createUI:function(){var b=this,c=a.DOM.create('<div ><div class="findlinks-icowrap J_FindLinks_Ico" data-action="search" ><span class="findlinks-ico"  data-action="search">&nbsp;</span></div><span class="J_FindLinks_Click findlinks-des" data-action="search">\u6211\u8981\u627e\u5165\u53e3</span><div class="J_FindLinks_Search findlinks-noresult findlinks-search  hidden" ><input class="J_FindLinks_Input findlinks-input" id="findlinks-input" placeholder="\u5728\u9996\u9875\u627e\u5165\u53e3"/><label class="findlinks-numbers" for="findlinks-input">\u7b2c<span class="J_FindLinks_Index">0</span>\u6761\uff0c\u5171<span class="J_FindLinks_Total">0</span>\u6761</label><a href="jasvasript:void(0);"  class="findlinks-down J_FindLinks_Down J_FindLinks_Click" data-action="down">&nbsp;</a><a href="jasvasript:void(0);" class="findlinks-up  J_FindLinks_Up J_FindLinks_Click" data-action="up">&nbsp;</a><a href="jasvasript:void(0);"  class="findlinks-close J_FindLinks_Close  J_FindLinks_Click" data-action="close">&nbsp;</a></div></div>',{href:"#",id:a.guid("J_FindLinks_"),title:"\u901a\u8fc7\u8fd9\u4e2a\u529f\u80fd\uff0c\u60a8\u4e0d\u4ec5\u80fd\u5feb\u901f\u627e\u5230\u9700\u8981\u7684\u94fe\u63a5\uff0c\u8fd8\u80fd\u627e\u5230\u88ab\u201c\u6df1\u85cf\u201d\u7684\u5165\u53e3\u54e6~","class":"findlinks-container"}),d=a.DOM.create("<div></div>",{href:"#",title:"\u627e\u5230\u4e86",id:a.guid("J_FindLinks_"),"class":"findlinks-ico"}),e=a.one("body");e.append(c),e.append(d);var f=a.one(c);f.css("top",b.get("top"));var g=f.one(".J_FindLinks_Search"),h=f.one(".J_FindLinks_Click"),i=f.one(".J_FindLinks_Hover"),j=f.one(".J_FindLinks_Input"),k=f.one(".J_FindLinks_Ico"),l=f.one(".J_FindLinks_Index"),m=f.one(".J_FindLinks_Total"),n=f.one(".J_FindLinks_Up"),o=f.one(".J_FindLinks_Down");b.set("doms",{container:f,search:g,click:h,hover:i,input:j,ico:k,focusIco:a.one(d),total:m,index:l,up:n,down:o})},_bindUI:function(){var b=this,c=b.get("doms"),d=c.container;if(d.delegate("mouseover",".J_FindLinks_Ico",b._handleIcoHover,b),d.delegate("click",".J_FindLinks_Click",b._handleClick,b),d.delegate("keyup",".J_FindLinks_Input",b._handleKeyup,b),d.delegate("keydown",".J_FindLinks_Input",b._handleKeydown,b),6==a.UA.ie){var e=a.one(window);e.on("scroll",function(){d.css("top",a.DOM.scrollTop(e)+b.get("top"))})}},_bindModelChange:function(){var a=this;a.on("afterResultChange",function(){a._showAllResults(),a._setTotalNumber(),a._setIndexNumber(),a._setBtnState()}),a.on("beforeResultChange",function(){a.set("focusNode",null),a._hideAllResults()}),a.on("beforeIndexChange",function(){a.set("prevIndex",a.get("index"))}),a.on("afterIndexChange",function(){a._setIndexNumber(),a._setBtnState()}),a.on("beforeFocusNodeChange",function(){a._unFocusNode()})},_handleIcoHover:function(){var a=this;a._toggleClick(!0);var b=a.get("doms.container");b.undelegate("mouseover",".J_FindLinks_Ico",a._handleIcoHover,a),b.delegate("click",".J_FindLinks_Ico",a._handleClick,a)},_handleClick:function(b){b.halt();var c=this,d=a.one(b.target),e=d.attr("data-action");switch(e){case"search":c._toggleClick(!1),c._toggleSearch(!0);break;case"close":c._toggleClick(!1),c._toggleSearch(!1),c.set("result",null);break;case"up":c.findPrev();break;case"down":c.findNext()}},_handleKeyup:function(b){var c=this,d=a.one(b.target),e=b.keyCode;if(13!=e&&37!=e&&38!=e&&39!=e&&40!=e){var f=d.val();c.search(f)}},_handleKeydown:function(a){var b=this,c=a.keyCode;(13==c||40==c)&&b.findNext(),38==c&&b.findPrev()},search:function(a){var b=this;b._setSearchText(a),b._findResult()},_setSearchText:function(b){var c=this,d=c.get("doms.input"),b="undefined"==typeof b?a.trim(d.val()):a.trim(b);if(b===e)return c.set("result",null),c.set("total",0),c.set("index",0),c._setTotalNumber(),c._setIndexNumber(),c._setBtnState(),void 0;var g='body a:contains("'+b+'")',h=f(g);c.set("total",h.length),c.set("result",h),c.set("index",0)},_findResult:function(){var a=this,b=a.get("result"),c=a.get("index");if(b||(a._setSearchText(),b=a.get("result")),b){var d=b.item(c);if(d){var e=d.attr("href"),f=!e.match(/javascript/gi);f?a._showFocusResult(d):a._filterShowResult()}else c--,a.set("index",c)}},_filterShowResult:function(){var a=this,b=a.get("index"),c=a.get("prevIndex");b>=c?a.findNext():a.findPrev()},findPrev:function(){var a=this,b=a.get("index");b--,a.set("index",b),a._findResult()},findNext:function(){var a=this,b=a.get("index");b++,a.set("index",b),a._findResult()},_showFocusResult:function(a){var b=this;b._focusNode(a)},_showAllResults:function(){var a=this,b=a.get("result");b&&b.addClass&&b.addClass("findlinks-href")},_hideAllResults:function(){var a=this,b=a.get("result");b&&b.addClass&&b.removeClass("findlinks-href"),a._hideIco(),a._unFocusNode()},_setTotalNumber:function(){var a=this,b=a.get("doms.total"),c=a.get("total");b.html(c)},_setIndexNumber:function(){var a=this,b=a.get("doms.index"),c=a.get("index"),d=a.get("total"),e=d>0?c+1:0;b.html(e)},_setBtnState:function(){var a=this,b=a.get("doms.search"),c=a.get("doms.up"),d=a.get("doms.down"),e=a.get("total"),f=a.get("index");0===e?b.addClass("findlinks-noresult"):b.removeClass("findlinks-noresult"),0===f?c.addClass("findlinks-noupresult"):c.removeClass("findlinks-noupresult"),f===e-1?d.addClass("findlinks-nodownresult"):d.removeClass("findlinks-nodownresult")},_focusNode:function(b){var c=this,d=c.get("fireFn");if(d)try{d(b)}catch(e){a.log("\u6267\u884c\u89e6\u53d1\u4e8b\u4ef6\u5931\u8d25")}var f=c._findPosition(b);b.addClass("findlinks-unvisibility"),b.addClass("findlinks-href-now"),c.set("focusNode",b);var g=b.clone(!0),h=b.css("lineHeight"),i=f.top,j=f.left,k=b.css("height"),l=b.css("width"),m=(parseInt(h)-parseInt(k))/2;i=m>0&&i-m>0?i-m:i,c._showIco({left:j,top:i});var n={position:"absolute",left:j,top:i,fontSize:b.css("fontSize"),padding:b.css("padding"),minHeight:"0px"==k?"auto":k,minWidth:"0px"==l?"auto":l,textAlign:b.css("textAlign"),lineHeight:h};6===a.UA.ie&&a.mix(n,{height:"0px"==k?"auto":k,width:"0px"==l?"auto":l}),g.css(n),g.addClass("findlinks-href-focus"),g.appendTo("body"),g.show(),c.set("cloneNode",g)},_findPosition:function(a){var b=this,c=a.offset(),d=c.left,e=c.top,f={left:d,top:e};if(0===d){var g=a.parent();g&&g.prop("tagName")&&"BODY"!==g.prop("tagName")&&(f=b._findPosition(g))}return f},_showIco:function(a){var b=this,c=b.get("doms.focusIco"),d=a.left-8,e=a.top-21;e=0>e?a.top:e,d=0>e?a.left:d-10,c.css({left:d,top:e,display:"block"}),c.scrollIntoView()},_hideIco:function(){var a=this,b=a.get("doms.focusIco");b.hide()},_unFocusNode:function(){var a=this,b=a.get("cloneNode"),c=a.get("focusNode");b&&b.remove(),c&&(c.removeClass("findlinks-href-now"),c.removeClass("findlinks-unvisibility"))},_handleSearch:function(){var a=this,b=a.get("doms");b.container},_toggleClick:function(a){function b(){g.fadeIn(.3),f.on("mouseleave",function(){d._toggleClick(!1)})}function c(){g.fadeOut(.5),f.detach("mouseleave"),f.delegate("mouseover",".J_FindLinks_Ico",d._handleIcoHover,d)}var d=this,e=d.get("doms"),f=e.container,g=e.click;a?b():c()},_toggleSearch:function(b){var c=this,d=c.get("doms"),e=d.container,f=d.search;b?f.show():(f.fadeOut(.5),a.later(function(){e.delegate("mouseover",".J_FindLinks_Ico",c._handleIcoHover,c),e.undelegate("click",".J_FindLinks_Ico",c._handleClick,c)},1e3))}},{ATTRS:{doms:{value:{}},result:{value:null},index:{value:0,setter:function(a){return 0>a&&(a=0),a}},prevIndex:{value:0},total:{value:0},cloneNode:{value:null},focusNode:{value:null},top:{value:278},fireFn:{value:null}}}),d},{requires:["node","base","anim","event","sizzle","ua","./index.css"]});