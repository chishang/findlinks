## 综述

findlinks是用来查找页面的链接入口。 通过该功能，不仅可以快速找到入口链接，而且还能找到“隐藏”的入口，方便快速的找到链接并点击。

功能：

* 标记所有匹配到的内容
* 高亮显示当前内容
* 遇到隐藏的内容，会在最近的可视父元素位置显示
* 自动跳过href属性为javasript的标签


## 快速使用

### 初始化组件

    S.use('gallery/findlinks/1.0/index', function (S, Findlinks) {
         var findlinks = new Findlinks({
         fireFn:function(a){
             var parent = a.parent('.J_TabCol');
             if(parent){
                 S.one('#J_jipiao_depCity').fire('click')
             }
         }
         });
    })；

## API说明

### config 参数

* top （number） fixed的top值，default:278
* fireFn (function) 找到某个节点后，需要触发的回调函数，回参是a标签的node节点 default:null

### 方法

* search(text) 查找内容
* findNext 查找下一个
* findPrev   查找上一个


