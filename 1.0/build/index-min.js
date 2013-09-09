/*! findlinks - v1.0 - 2013-09-09 5:32:19 PM
 * Copyright (c) 2013 chishang.lcw; Licensed  */
KISSY.add("gallery/findlinks/1.0/index", function (a, b, c) {
    function d(a) {
        var b = this;
        d.superclass.constructor.call(b, a), b.init()
    }

    var e = b.all;
    return a.extend(d, c, {init: function () {
        var b = this;
        a.UA.IE && 6 === a.UA.IE || (b.createUI(), b.bindUI(), b.bindEvent())
    }, bindEvent: function () {
        var a = this;
        a.on("afterResultChange", function () {
            a.showAllResults()
        }), a.on("beforeResultChange", function () {
            a.hideAllResults()
        }), a.on("beforeIndexChange", function () {
            a.set("prevIndex", a.get("index"))
        })
    }, createUI: function () {
        var b = this, c = a.DOM.create('<div ><span class="found-ico">&nbsp;</span><span class="J_FindLinks_Click hidden found-des" data-action="search">\u6211\u8981\u627e\u5165\u53e3</span><div class="J_FindLinks_Search found-search  hidden" ><input class="J_FindLinks_Input found-input" placeholder="\u5728\u9996\u9875\u627e\u5165\u53e3"/><a href="jasvasript:void(0);"  class="found-down J_FindLinks_Up J_FindLinks_Click" data-action="down">&nbsp;</a><a href="jasvasript:void(0);" class="found-up J_FindLinks_Down J_FindLinks_Click" data-action="up">&nbsp;</a><a href="jasvasript:void(0);"  class="found-close J_FindLinks_Close  J_FindLinks_Click" data-action="close">&nbsp;</a></div></div>', {href: "#", title: "\u67e5\u627e\u5165\u53e3", id: a.guid("J_FindLinks_"), "class": "findlinks-container"}), d = a.DOM.create("<div></div>", {href: "#", title: "\u627e\u5230\u4e86", id: a.guid("J_FindLinks_"), "class": "findlinks-ico"}), e = a.one("body");
        e.append(c), e.append(d);
        var f = a.one(c), g = f.one(".J_FindLinks_Search"), h = f.one(".J_FindLinks_Click"), i = f.one(".J_FindLinks_Hover"), j = f.one(".J_FindLinks_Input");
        b.set("doms", {container: f, search: g, click: h, hover: i, input: j, icoNode: a.one(d)})
    }, bindUI: function () {
        var a = this, b = a.get("doms"), c = b.container;
        c.on("mouseover", a.handleIcoHover, a), c.delegate("click", ".J_FindLinks_Click", a.handleClick, a), c.delegate("keyup", ".J_FindLinks_Input", a.handleKeyup, a), c.delegate("keydown", ".J_FindLinks_Input", a.handleKeydown, a)
    }, handleIcoHover: function () {
        var a = this;
        a.toggleClick(!0);
        var b = a.get("doms.container");
        b.detach("mouseover", a.handleIcoHover, a), b.addClass("findlinks-insearch")
    }, handleClick: function (b) {
        b.halt();
        var c = this, d = a.one(b.target), e = d.attr("data-action");
        switch (e) {
            case"search":
                c.toggleClick(!1), c.toggleSearch(!0);
                break;
            case"close":
                c.toggleClick(!1), c.toggleSearch(!1), c.hideAllResults();
                break;
            case"up":
                c.findPrev();
                break;
            case"down":
                c.findNext()
        }
    }, handleKeyup: function (b) {
        var c = this;
        a.one(b.target);
        var d = b.keyCode;
        13 != d && 37 != d && 38 != d && 39 != d && 40 != d && (c.setResult(), c.search())
    }, handleKeydown: function (a) {
        var b = this, c = a.keyCode;
        (13 == c || 40 == c) && b.findNext(), 38 == c && b.findPrev()
    }, search: function () {
        var a = this;
        a.findResult()
    }, setResult: function () {
        var b = this, c = b.get("doms.input"), d = a.trim(c.val());
        if ("" === d)return b.hideAllResults(), void 0;
        var f = "body a:contains(" + d + ")";
        console.time("find");
        var g = e(f);
        console.timeEnd("find"), b.set("result", g), b.set("index", 0)
    }, findResult: function () {
        var a = this, b = a.get("result"), c = a.get("index");
        if (b || (a.setResult(), b = a.get("result")), b) {
            var d = b.item(c);
            if (d) {
                var e = d.css("display"), f = d.css("visibility");
                if ("none" === e || "hidden" === f) {
                    var g = a.get("prevIndex");
                    c >= g ? a.findNext() : a.findPrev()
                } else a.showFocusResult(d)
            } else c--, a.set("index", c)
        }
    }, findPrev: function () {
        var a = this, b = a.get("index");
        b--, a.set("index", b), a.findResult()
    }, findNext: function () {
        var a = this, b = a.get("index");
        b++, a.set("index", b), a.findResult()
    }, showFocusResult: function (a) {
        var b = this;
        b.scrollTo(a), b.focusNode(a)
    }, showAllResults: function () {
        var a = this, b = a.get("result");
        b && b.addClass && b.addClass("findlinks-href")
    }, hideAllResults: function () {
        var a = this, b = a.get("result");
        b && b.addClass && b.removeClass("findlinks-href"), a.hideIco()
    }, scrollTo: function (a) {
        a && window.scrollTo(0, a.offset().top - 30)
    }, focusNode: function (b) {
        var c = this;
        c.showIco(b), b.addClass("findlinks-href");
        var d = b.clone(!0);
        d.appendTo("body"), c.set("focusNode", d);
        var e = b.offset();
        d.css({position: "absolute", left: e.left, top: e.top, display: "block"}), d.addClass("findlinks-href-focus"), a.later(function () {
            d.remove()
        }, 200)
    }, showIco: function (a) {
        var b = this, c = a.offset(), d = b.get("doms.icoNode");
        d.css({left: c.left - 8, top: c.top - 21, display: "block"})
    }, hideIco: function () {
        var a = this, b = a.get("doms.icoNode");
        b.hide()
    }, handleSearch: function () {
        var a = this, b = a.get("doms");
        b.container
    }, toggleClick: function (a) {
        var b = this, c = b.get("doms");
        c.container;
        var d = c.click;
        a ? d.fadeIn(.3) : d.fadeOut(.5)
    }, toggleSearch: function (b) {
        var c = this, d = c.get("doms"), e = d.container, f = d.search;
        if (b)f.fadeIn(.6); else {
            f.fadeOut(.5);
            var e = c.get("doms.container");
            e.removeClass("findlinks-insearch"), a.later(function () {
                e.on("mouseover", c.handleIcoHover, c)
            }, 1e3)
        }
    }}, {ATTRS: {ico: {value: ""}, position: {value: [20, 10]}, doms: {value: {}}, result: {value: null}, index: {value: 0, setter: function (a) {
        return 0 > a && (a = 0), a
    }}, prevIndex: {value: 0}}}), d
}, {requires: ["node", "base", "anim", "event", "sizzle", "./index.css"]});