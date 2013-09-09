/*
combined files : 

gallery/findlinks/1.0/index

*/
/**
 * @fileoverview
 * @author kissy-team<kissy-team@gmail.com>
 * @module found
 **/
KISSY.add('gallery/findlinks/1.0/index',function (S, Node, Base, Anim) {
    var EMPTY = '';
    var $ = Node.all;

    /**
     *
     * @class FindLinks
     * @constructor
     * @extends Base
     */
    function FindLinks(comConfig) {
        var self = this;
        //调用父类构造函数
        FindLinks.superclass.constructor.call(self, comConfig);
        self.init();
    }

    S.extend(FindLinks, Base, /** @lends FindLinks.prototype*/{
        init: function () {
            var self = this;
            if (S.UA.IE && S.UA.IE === 6) {
                return;
            }
            self.createUI();
            self.bindUI();
            self.bindEvent();
        },
        bindEvent: function () {
            var self = this;
            self.on('afterResultChange', function () {
                self.set('cloneNode',null);
                self.set('index',0);
                self.showAllResults();
            });
            self.on('beforeResultChange', function () {
                self.hideAllResults();
            });
            self.on('beforeIndexChange',function(){
                 self.set('prevIndex',self.get('index'));
            });
            self.on('beforeCloneNodeChange',function(){
                var cloneNode = self.get('cloneNode');
                cloneNode && cloneNode.remove();
            });

        },
        createUI: function () {
            var self = this;
            var node = S.DOM.create('<div >' +
                '<div class="ico-wrap"><span class="found-ico">&nbsp;</span></div>' +
                '<span class="J_FindLinks_Click hidden found-des" data-action="search">我要找入口</span>' +
                '<div class="J_FindLinks_Search found-search  hidden" >' +
                '<input class="J_FindLinks_Input found-input" placeholder="在首页找入口"/>' +
                '<a href="jasvasript:void(0);"  class="found-down J_FindLinks_Up J_FindLinks_Click" data-action="down">&nbsp;</a>' +
                '<a href="jasvasript:void(0);" class="found-up J_FindLinks_Down J_FindLinks_Click" data-action="up">&nbsp;</a>' +
                '<a href="jasvasript:void(0);"  class="found-close J_FindLinks_Close  J_FindLinks_Click" data-action="close">&nbsp;</a>' +
                '</div>' +
                '</div>', {
                href: '#',
                title: '查找入口',
                id: S.guid('J_FindLinks_'),
                class: 'findlinks-container'
            });
            var icoNode = S.DOM.create('<div></div>', {
                href: '#',
                title: '找到了',
                id: S.guid('J_FindLinks_'),
                class: 'findlinks-ico'
            });
            var body = S.one('body');
            body.append(node);
            body.append(icoNode);
            var container = S.one(node);
            var search = container.one('.J_FindLinks_Search');
            var click = container.one('.J_FindLinks_Click');
            var hover = container.one('.J_FindLinks_Hover');
            var input = container.one('.J_FindLinks_Input');
            self.set('doms', {
                container: container,
                search: search,
                click: click,
                hover: hover,
                input: input,
                icoNode: S.one(icoNode)
            });
        },

        bindUI: function () {
            var self = this;
            var doms = self.get('doms');
            var container = doms.container;
            container.on('mouseover', self.handleIcoHover, self);
            container.delegate('click', '.J_FindLinks_Click', self.handleClick, self);
            container.delegate('keyup', '.J_FindLinks_Input', self.handleKeyup, self);
            container.delegate('keydown', '.J_FindLinks_Input', self.handleKeydown, self);
        },
        handleIcoHover: function () {
            var self = this;
            self.toggleClick(true);
            var container = self.get('doms.container');
            container.detach('mouseover', self.handleIcoHover, self);
            container.addClass('findlinks-insearch');
        },
        handleClick: function (e) {
            e.halt();
            var self = this;
            var target = S.one(e.target);
            var action = target.attr('data-action');
            switch (action) {
                case 'search':
                    self.toggleClick(false);
                    self.toggleSearch(true);
                    break;
                case 'close':
                    self.toggleClick(false);
                    self.toggleSearch(false);
                    self.hideAllResults();
                    break;
                case 'up':
                    self.findPrev();
                    break;
                case 'down':
                    self.findNext();
                    break;
                default:
                    break;
            }

        },
        handleKeyup: function (e) {
            var self = this;
            var target = S.one(e.target);
            var keyCode = e.keyCode;
            if (keyCode == 13 || keyCode == 37 || keyCode == 38 || keyCode == 39 || keyCode == 40) {
                return;
            }
            self.setResult();
            self.search();
        },
        handleKeydown: function (e) {
            var self = this;
            var keyCode = e.keyCode;
            if (keyCode == 13 || keyCode == 40) {
                self.findNext();
            }
            if (keyCode == 38) {
                self.findPrev();
            }
        },
        search: function () {
            var self = this;
            self.findResult();
        },
        setResult: function () {
            var self = this;
            var input = self.get('doms.input');
            var text =  S.trim(input.val());
            if (text === '') {
                self.set('result',null);
                return;
            }
            var selector = "body a:contains(" + text + ")";
            console.time('find');
            var result = $(selector);
            console.timeEnd('find');
            self.set('result', result);
        },
        findResult: function () {
            var self = this;
            var result = self.get('result');
            var index = self.get('index');
            var isFind = false;
            if (!result) {
                self.setResult();
                result = self.get('result');
            }
            if (result) {
                var node = result.item(index);
                if (node) {
                    var display = node.css('display');
                    var visibility = node.css('visibility');
                    if(display === 'none' || visibility ==='hidden'){
                        var prevIndex = self.get('prevIndex');
                        if(prevIndex<=index){
                            self.findNext();
                        }else{
                            self.findPrev();
                        }
                    }else{
                        self.showFocusResult(node);
                    }

                } else {
                    index--;
                    self.set('index', index);
                }
            }

        },
        findPrev: function () {
            var self = this;
            var index = self.get('index');
            index--;
            self.set('index', index);
            var isfind = self.findResult();
        },
        findNext: function () {
            var self = this;
            var index = self.get('index');
            index++;
            self.set('index', index);
            self.findResult();
        },
        showFocusResult:function(node){
            var self = this;
            self.scrollTo(node);
            self.focusNode(node)
        },
        showAllResults: function () {
            var self = this;
            var result = self.get('result');
            if (result && result.addClass) {
                result.addClass('findlinks-href');
            }
        },
        hideAllResults: function () {
            var self = this;
            var result = self.get('result');
            if (result && result.addClass) {
                result.removeClass('findlinks-href');
            }
            self.hideIco();
        },
        scrollTo: function (node) {
            var self = this;
            if (node) {
                window.scrollTo(0, node.offset().top - 30);
            }
        },
        focusNode:function(node){
            var self = this;
            self.showIco(node);
            node.addClass('findlinks-href');
            var cloneNode = node.clone(true);
            cloneNode.appendTo('body');
            self.set('focusNode',cloneNode);
            var position = node.offset();
            cloneNode.css({
                position:'absolute',
                left: position.left,
                top: position.top,
                display: 'none'
            });
            cloneNode.fadeIn();
            S.later(function(){
              cloneNode.fadeOut(0.5,function(){
                  cloneNode.remove();
              });

            },200)
        },
        showIco: function (target) {
            var self = this;
            var position = target.offset();
            var icoNode = self.get('doms.icoNode');
            icoNode.css({
                left: position.left - 8,
                top: position.top - 21,
                display: 'block'
            });
        },
        hideIco: function () {
            var self = this;
            var icoNode = self.get('doms.icoNode');
            icoNode.hide();

        },
        removeCloneNode:function(){

        },
        handleSearch: function () {
            var self = this;
            var doms = self.get('doms');
            var container = doms.container;
        },
        toggleClick: function (isShow) {
            var self = this;
            var doms = self.get('doms');
            var container = doms.container;
            var click = doms.click;
            isShow ? click.fadeIn(0.3) : click.fadeOut(0.5);
        },
        toggleSearch: function (isShow) {
            var self = this;
            var doms = self.get('doms');
            var container = doms.container;
            var search = doms.search;
            if (isShow) {
                search.fadeIn(0.6);
            } else {
                search.fadeOut(0.5);
                var container = self.get('doms.container');
                container.removeClass('findlinks-insearch');
                S.later(function () {
                    container.on('mouseover', self.handleIcoHover, self);
                }, 1000);
            }
        }

    }, {ATTRS: /** @lends FindLinks*/{
        ico: {
            value: ""
        },
        position: {
            value: [20, 10]
        },
        doms: {
            value: {

            }
        },
        result: {
            value: null
        },
        index: {
            value: 0,
            setter: function (index) {
                if (index < 0)index = 0;
                return index;
            }
        },
        prevIndex:{
            value:0
        }
    }});
    return FindLinks;
}, {requires: ['node', 'base', 'anim', 'event', 'sizzle', './index-min.css']});




