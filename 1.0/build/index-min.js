/*! findlinks - v1.0 - 2013-09-10 10:46:08 PM
* Copyright (c) 2013 chishang.lcw; Licensed  */
KISSY.add("gallery/findlinks/1.0/index",function(a,b,c){function d(a){var b=this;d.superclass.constructor.call(b,a),b.init()}var e="",f=b.all;return a.extend(d,c,{init:function(){var a=this;a._createUI(),a._bindUI(),a._bindModelChange()},_bindModelChange:function(){var a=this;a.on("afterResultChange",function(){a.showAllResults(),a.setTotalNumber(),a.setIndexNumber(),a.setBtnState()}),a.on("beforeResultChange",function(){a.set("cloneNode",null),a.hideAllResults()}),a.on("beforeIndexChange",function(){a.set("prevIndex",a.get("index"))}),a.on("afterIndexChange",function(){a.setIndexNumber(),a.setBtnState()}),a.on("beforeCloneNodeChange",function(){a._removeCloneNode()})},_createUI:function(){var b=this,c=a.DOM.create('<div ><div class="findlinks-icowrap J_FindLinks_Ico" data-action="search" ><span class="findlinks-ico"  data-action="search">&nbsp;</span></div><span class="J_FindLinks_Click findlinks-des" data-action="search">\u6211\u8981\u627e\u5165\u53e3</span><div class="J_FindLinks_Search findlinks-noresult findlinks-search  hidden" ><input class="J_FindLinks_Input findlinks-input" id="findlinks-input" placeholder="\u5728\u9996\u9875\u627e\u5165\u53e3"/><label class="findlinks-numbers" for="findlinks-input">\u7b2c<span class="J_FindLinks_Index">0</span>\u6761\uff0c\u5171<span class="J_FindLinks_Total">0</span>\u6761</label><a href="jasvasript:void(0);"  class="findlinks-down J_FindLinks_Down J_FindLinks_Click" data-action="down">&nbsp;</a><a href="jasvasript:void(0);" class="findlinks-up  J_FindLinks_Up J_FindLinks_Click" data-action="up">&nbsp;</a><a href="jasvasript:void(0);"  class="findlinks-close J_FindLinks_Close  J_FindLinks_Click" data-action="close">&nbsp;</a></div></div>',{href:"#",id:a.guid("J_FindLinks_"),title:"\u901a\u8fc7\u8fd9\u4e2a\u529f\u80fd\uff0c\u60a8\u4e0d\u4ec5\u80fd\u5feb\u901f\u627e\u5230\u9700\u8981\u7684\u94fe\u63a5\uff0c\u8fd8\u80fd\u5728\u5de6\u4e0a\u89d2\u53d1\u73b0\u88ab\u57cb\u85cf\u7684\u5165\u53e3\u54e6\uff01","class":"findlinks-container"}),d=a.DOM.create("<div></div>",{href:"#",title:"\u627e\u5230\u4e86",id:a.guid("J_FindLinks_"),"class":"findlinks-ico"}),e=a.one("body");e.append(c),e.append(d);var f=a.one(c);f.css("top",b.get("top"));var g=f.one(".J_FindLinks_Search"),h=f.one(".J_FindLinks_Click"),i=f.one(".J_FindLinks_Hover"),j=f.one(".J_FindLinks_Input"),k=f.one(".J_FindLinks_Ico"),l=f.one(".J_FindLinks_Index"),m=f.one(".J_FindLinks_Total"),n=f.one(".J_FindLinks_Up"),o=f.one(".J_FindLinks_Down");b.set("doms",{container:f,search:g,click:h,hover:i,input:j,ico:k,focusIco:a.one(d),total:m,index:l,up:n,down:o})},_bindUI:function(){var b=this,c=b.get("doms"),d=c.container;if(d.delegate("mouseover",".J_FindLinks_Ico",b._handleIcoHover,b),d.delegate("click",".J_FindLinks_Click",b._handleClick,b),d.delegate("keyup",".J_FindLinks_Input",b._handleKeyup,b),d.delegate("keydown",".J_FindLinks_Input",b._handleKeydown,b),6==a.UA.IE){var e=a.one(window);e.on("scroll",function(){d.css("top",a.DOM.scrollTop(e)+b.get("top"))})}},_handleIcoHover:function(){var a=this;a._toggleClick(!0);var b=a.get("doms.container");b.undelegate("mouseover",".J_FindLinks_Ico",a._handleIcoHover,a),b.delegate("click",".J_FindLinks_Ico",a._handleClick,a)},_handleClick:function(b){b.halt();var c=this,d=a.one(b.target),e=d.attr("data-action");switch(e){case"search":c._toggleClick(!1),c._toggleSearch(!0);break;case"close":c._toggleClick(!1),c._toggleSearch(!1),c.set("result",null);break;case"up":c.findPrev();break;case"down":c.findNext()}},_handleKeyup:function(b){var c=this,d=a.one(b.target),e=b.keyCode;if(13!=e&&37!=e&&38!=e&&39!=e&&40!=e){var f=d.val();c.setResult(f),c.search()}},_handleKeydown:function(a){var b=this,c=a.keyCode;(13==c||40==c)&&b.findNext(),38==c&&b.findPrev()},search:function(){var a=this;a._findResult()},setResult:function(b){var c=this,d=c.get("doms.input"),b="undefined"==typeof b?a.trim(d.val()):a.trim(b);if(b===e)return c.set("result",null),c.set("total",0),c.set("index",0),c.setTotalNumber(),c.setIndexNumber(),c.setBtnState(),void 0;var g='body a:contains("'+b+'")',h=f(g);c.set("total",h.length),c.set("result",h),c.set("index",0)},_findResult:function(){var a=this,b=a.get("result"),c=a.get("index");if(b||(a.setResult(),b=a.get("result")),b){var d=b.item(c);d?a.showFocusResult(d):(c--,a.set("index",c))}},findPrev:function(){var a=this,b=a.get("index");b--,a.set("index",b),a._findResult()},findNext:function(){var a=this,b=a.get("index");b++,a.set("index",b),a._findResult()},showFocusResult:function(a){var b=this;b._scrollTo(a),b._focusNode(a)},showAllResults:function(){var a=this,b=a.get("result");b&&b.addClass&&b.addClass("findlinks-href")},hideAllResults:function(){var a=this,b=a.get("result");b&&b.addClass&&b.removeClass("findlinks-href"),a._hideIco()},setTotalNumber:function(){var a=this,b=a.get("doms.total"),c=a.get("total");b.html(c)},setIndexNumber:function(){var a=this,b=a.get("doms.index"),c=a.get("index"),d=a.get("total"),e=d>0?c+1:0;b.html(e)},setBtnState:function(){var a=this,b=a.get("doms.search"),c=a.get("doms.up"),d=a.get("doms.down"),e=a.get("total"),f=a.get("index");0===e?b.addClass("findlinks-noresult"):b.removeClass("findlinks-noresult"),0===f?c.addClass("findlinks-noupresult"):c.removeClass("findlinks-noupresult"),f===e-1?d.addClass("findlinks-nodownresult"):d.removeClass("findlinks-nodownresult")},_scrollTo:function(a){a&&window.scrollTo(0,a.offset().top-30)},_focusNode:function(b){var c=this;if(c._showIco(b),b.addClass("findlinks-href-now"),!a.UA.IE){var d=b.clone(!0);d.appendTo("body");var e=b.offset();d.css({position:"absolute",left:e.left,top:e.top,display:"block",fontSize:b.css("fontSize"),lineHeight:b.css("lineHeight"),padding:b.css("padding"),height:"0px"==b.css("height")?"auto":b.css("height"),width:"0px"==b.css("width")?"auto":b.css("width"),textAlign:b.css("textAlign")}),c.set("cloneNode",d),b.addClass("findlinks-unvisibility"),d.show(),a.later(function(){d.addClass("findlinks-href-focus")},100)}c.set("focusNode",b)},_showIco:function(a){var b=this,c=a.offset(),d=b.get("doms.focusIco"),e=c.left-8,f=c.top-21;f=0>f?c.top:f,e=0>f?c.left:e-10,d.css({left:e,top:f,display:"block"})},_hideIco:function(){var a=this,b=a.get("doms.focusIco");b.hide()},_removeCloneNode:function(){var a=this,b=a.get("cloneNode"),c=a.get("focusNode");b&&b.remove(),c&&(c.removeClass("findlinks-href-now"),c.removeClass("findlinks-unvisibility"))},_handleSearch:function(){var a=this,b=a.get("doms");b.container},_toggleClick:function(a){function b(){e.fadeIn()}var c=this,d=c.get("doms");d.container;var e=d.click;a?b():e.fadeOut(.5)},_toggleSearch:function(b){var c=this,d=c.get("doms"),e=d.container,f=d.search;if(b)f.fadeIn(.3);else{f.fadeOut(.5);var e=c.get("doms.container"),g=c.get("doms.ico");g.hide(),g.fadeIn(1,function(){a.later(function(){e.delegate("mouseover",".J_FindLinks_Ico",c._handleIcoHover,c),e.undelegate("click",".J_FindLinks_Ico",c._handleClick,c)},500)})}}},{ATTRS:{doms:{value:{}},result:{value:null},index:{value:0,setter:function(a){return 0>a&&(a=0),a}},prevIndex:{value:0},total:{value:0},cloneNode:{value:null},focusNode:{value:null},top:{value:278}}}),d},{requires:["node","base","anim","event","sizzle","./index.css"]});