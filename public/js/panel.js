//工具方法提供集合
var PanelTools = function () {
    //获得正确位置的节点信息
    var fullScreen = $('#fullScreen');
    var msg = $('#msg');
    var skin = $('#skin');
    var signout = $('#signout');
    var leftNode = $('#l-slide');
    var switchNode = $('#switch');
    var mControl = $('#m-control');
    var updatepwd = $('#updatepwd');
    var searchKey = $('#l-slide .search .key');

    return {
        init: function () {
            var _this = this;
            this.currentChildrenMenus = null;
            this.hasMenus = [];
            this.checkAuth(function () {
                _this.setFullScreen(fullScreen);
                _this.setShrink(switchNode);
                _this.setChangeSkin(skin);
                _this.setUpdatePwd(updatepwd);
                _this.setSignOut(signout);
                _this.renderMenus(_this.getMenusByPId('1'));
                //绑定搜索二级菜单事件
                _this.searchChildrenMenusByKeyword(searchKey);
                _this.jscroll();
                layui.use('element', function () {
                    var element = layui.element;
                    element.on('tabDelete(m-control)', function (data) {
                        _this.hasMenus.remove(data.index);
                    });

                    element.on('tab(m-control)', function (data) {
                        _this.findLMenuCrrentMenuId($(this).attr('lay-id'));
                    });
                });
            });
        },
        //通过父级id查询菜单信息不递归
        getMenusByPId: function (pId) {
            var targetMenus = [];
            for (var i = 0; i < this.menus.length; i++) {
                if (this.menus[i].parentId == pId) {
                    targetMenus.push(this.menus[i]);
                }
            }
            return targetMenus;
        },
        //通过父级id查询菜单信息递归
        getMenusByPIdRecursion: function (pId) {
            var targetMenus = [];
            for (var i = 0; i < this.menus.length; i++) {
                if (this.menus[i].parentId == pId) {
                    this.menus[i].children = this.getMenusByPIdRecursion(this.menus[i].id);
                    targetMenus.push(this.menus[i]);
                }
            }
            return targetMenus;
        },
        checkAuth: function (callback) {
            if (!getCookie('token')) {
                window.location.href = '/login';
            }
            $('#header .person-frame .person .name').text(unescape(getCookie('username')) + '(' + unescape(getCookie('officeName')) + ')');

            var _this = this;
            $.get('/interface/api/sysMenu/user', {
                token: getCookie('token')
            }, function (result) {
                _this.menus = result.data;
                if (callback) callback();
            });
        },
        jscroll: function () {
            var bars = '.jspHorizontalBar, .jspVerticalBar';
            var _this = this;
            _this.headerAdapterScroll();
            _this.lMenusAdapterScroll();

            $(window).resize(function () {
                _this.headerAdapterScroll();
            });
            $('.l-menus-frame').click(function () {
                _this.lMenusAdapterScroll();
            });
        },
        headerAdapterScroll: function () {
            $('.h-scroll').unbind('jsp-initialised').bind('jsp-initialised').jScrollPane();
            $('.v-scroll').unbind('jsp-initialised').bind('jsp-initialised').jScrollPane();
        },
        lMenusAdapterScroll: function () {
            $('.v-scroll').unbind('jsp-initialised').bind('jsp-initialised').jScrollPane();
        },
        setShrink: function (node) {
            node.click(function () {
                //判断状态
                var state = $(this).attr('state');
                var _this = this;
                if (state == 'on') {
                    leftNode.animate({
                        left: '-210px'
                    }, 300);
                    mControl.animate({
                        left: '10px'
                    }, 300, function () {
                        $(_this).removeClass('icon-jiantou_yemian_xiangzuo_o').addClass('icon-jiantou_yemian_xiangyou_o');
                    });
                    $(this).attr('state', 'off');
                } else {
                    leftNode.animate({
                        left: '0'
                    }, 300);
                    mControl.animate({
                        left: '220px'
                    }, 300, function () {
                        $(_this).removeClass('icon-jiantou_yemian_xiangyou_o').addClass('icon-jiantou_yemian_xiangzuo_o');
                    });
                    $(this).attr('state', 'on');
                }
            });
        },
        setChangeSkin: function (node) {
            layui.use('layer', function () { //独立版的layer无需执行这一句
                var $ = layui.jquery,
                    layer = layui.layer; //独立版的layer无需执行这一句
                node.click(function () {
                    layer.open({
                        type: 1,
                        title: '选择皮肤',
                        offset: 'auto' //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
                            ,
                        id: 'layerDemo' //防止重复弹出
                            ,
                        content: $('#selectSkin'),
                        shade: 0 //不显示遮罩
                            ,
                        area: ['720px', '380px'] //宽高
                    });
                });
                $('#selectSkin .item').unbind('click').bind('click', function () {
                    $('#selectSkin .item').removeClass('selected');
                    $(this).addClass('selected');
                    var skinCss = $(this).attr('skin');
                    setCookie('skinCss', skinCss, 24 * 365);
                    if (skinCss) {
                        $('#skinCss').attr('href', '/css/skin/' + skinCss + '.css');
                    } else
                        $('#skinCss').attr('href', '');
                });
            });
        },
        setUpdatePwd: function (node) {
            layui.use(['layer', 'form'], function () { //独立版的layer无需执行这一句
                var $ = layui.jquery,
                    layer = layui.layer; //独立版的layer无需执行这一句
                var form = layui.form;

                node.click(function () {
                    layer.open({
                        type: 1,
                        title: '修改密码',
                        offset: 'auto' //具体配置参考：http://www.layui.com/doc/modules/layer.html#offset
                            ,
                        id: 'layerDemo' //防止重复弹出
                            ,
                        content: $('#updatePwd'),
                        shade: 0 //不显示遮罩
                            ,
                        area: ['320px', '210px'] //宽高
                    });

                    //表单初始赋值
                    form.val('updatepwdform', {
                        "oldPassword": "",
                        "newPassword": ""
                    });
                });
                //自定义验证规则
                form.verify({
                    oldPassword: [/(.+){6,12}$/, '密码必须6到12位'],
                    newPassword: [/(.+){6,12}$/, '密码必须6到12位']
                });

                form.on('submit(confirmUpdate)', function (data) {
                    //验证两次的密码是否相同
                    if (data.field.oldPassword == data.field.newPassword) {
                        layer.msg('新密码不可以跟旧密码一样', {
                            icon: 5
                        });
                        return false;
                    }

                    $.ajax({
                        url: '/4a/api/v2/passport/item/' + getCookie('passportId') + '/password',
                        data: JSON.stringify({
                            "oldPassword": data.field.oldPassword,
                            "newPassword": data.field.newPassword
                        }),
                        contentType: "application/json", //发送信息至服务器时内容编码类型。             
                        dataType: "json", // 预期服务器返回的数据类型。如果不指定，jQuery 将自动根据 HTTP 包 MIME 信息来智能判断，比如XML MIME类型就被识别为XML。
                        type: 'PUT',
                        success: function (data) {
                            if (data.errCode) {
                                layer.msg('网络异常请求失败，请重试。');
                                return false;
                            } else {
                                layer.alert('修改成功。', {
                                    icon: 1
                                });
                            }
                        }
                    });
                    return false;
                });
            });
        },
        setFullScreen: function (node) {
            node.click(function () {
                if ($(this).attr('fullScreen') == 'on') {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    }
                    $(this).attr({
                        'fullScreen': 'off',
                        title: '全屏'
                    }).removeClass('icon-tuichuquanping').addClass('icon-weibiaoti-_dingwei-xian');
                } else {
                    var docElm = document.documentElement;
                    if (docElm.requestFullscreen) {
                        docElm.requestFullscreen();
                    } else if (docElm.mozRequestFullScreen) {
                        docElm.mozRequestFullScreen();
                    } else if (docElm.webkitRequestFullScreen) {
                        docElm.webkitRequestFullScreen();
                    } else if (docElm.msRequestFullscreen) {
                        docElm.msRequestFullscreen();
                    }
                    $(this).attr({
                        'fullScreen': 'on',
                        title: '退出全屏'
                    }).removeClass('icon-weibiaoti-_dingwei-xian').addClass('icon-tuichuquanping');
                }
            });
        },
        setSignOut: function (node) {
            node.click(function () {
                layer.confirm('您是否要确定退出登录呢？', {
                    btn: ['确认', '取消'] //按钮
                }, function () {
                    delCookie('token');
                    window.location.reload();
                }, function () {

                });
            });
        },
        /**
         * 搜索下面有的关键字
         */
        searchChildrenMenusByKeyword: function (node) {
            var _this = this;
            node.keyup(function (event) {
                if (event.keyCode == 13) {
                    _this.renderLMenus(_this.currentChildrenMenus, $(this).val());
                }
            });
            node.parent().find('.btn').click(function () {
                _this.renderLMenus(_this.currentChildrenMenus, node.val());
            });
        },
        clearMenuKeyword: function (node) {
            node.val('');
        },
        /**
         * 渲染一级菜单
         */
        renderMenus: function (menus) {
            var _this = this;
            var headerMenus = $('#header .layui-scroll .layui-nav');
            var outerFrame = $('#outer-frame iframe');

            //在生成之前先清除所有信息
            headerMenus.empty();
            for (var i = 0; i < menus.length; i++) {
                var menu = $('<li></li>').attr({
                    menuId: menus[i].id,
                    target: menus[i].target ? menus[i].target : '',
                    href: menus[i].href,
                    pId: menus[i].pid
                }).addClass('layui-nav-item').click(function () {
                    var target = $(this).attr('target');
                    if (target == '_blank') {
                        var href = $(this).attr('href');
                        outerFrame.parent().show();
                        outerFrame.attr('src', href);
                    } else {
                        outerFrame.parent().hide();
                        _this.currentChildrenMenus = _this.getMenusByPIdRecursion($(this).attr('menuId'));
                        _this.renderLMenus(_this.currentChildrenMenus);
                    }
                    _this.jscroll();
                }).appendTo(headerMenus);
                if (i == 0) {
                    if (menus[i].target == '_blank') {
                        outerFrame.parent().show();
                        outerFrame.attr('src', menus[i].href);
                    }
                    menu.addClass('layui-this');
                }
                var a = $('<a></a>').text(menus[i].name).appendTo(menu);
            }
            //模拟渲染二级菜单
            _this.currentChildrenMenus = _this.getMenusByPIdRecursion(menus[0].id);
            _this.renderLMenus(_this.currentChildrenMenus);
        },
        /**
         * 渲染左部菜单
         */
        renderLMenus: function (menus, keyword) {
            var _this = this;
            var lSlideMenus = $('#l-slide .layui-nav');
            lSlideMenus.empty();
            for (var i = 0; i < menus.length; i++) {
                var menu = $('<li></li>').attr({
                    menuId: menus[i].id
                }).addClass('layui-nav-item').appendTo(lSlideMenus);
                //如果是第一个菜单默认打开
                if (i == 0 && !keyword) {
                    menu.addClass('layui-nav-itemed');
                    //如果没有孩子默认打开第一个页面
                    if (!(menus[i].children && menus[i].children.length > 0)) {
                        _this.goPage({
                            id: menus[i].id,
                            name: menus[i].name,
                            href: menus[i].href
                        });
                    }
                }
                if (keyword)
                    menu.addClass('layui-nav-itemed');

                var a = $('<a></a>').attr({
                    menuId: menus[i].id,
                    menuUrl: menus[i].href
                }).appendTo(menu);
                $('<i></i>').addClass('layui-icon').addClass(menus[i].icon).appendTo(a);
                var title = menus[i].name;
                var htmlTitle = title.replace(new RegExp("(" + keyword + ")", "ig"), "<g>" + keyword + "</g>");
                var text = $('<font></font>').html(htmlTitle).appendTo(a);
                if (menus[i].children && menus[i].children.length > 0) {
                    //开始渲染子数据
                    var dl = $('<dl></dl>').addClass('layui-nav-child').appendTo(menu);
                    for (var j = 0; j < menus[i].children.length; j++) {
                        var dd = $('<dd></dd>').appendTo(dl);
                        if (i == 0 && j == 0) {
                            _this.goPage({
                                id: menus[i].children[j].id,
                                name: menus[i].children[j].name,
                                href: menus[i].children[j].href,
                                dd: dd
                            });
                        }
                        var childrenTitle = menus[i].children[j].name;
                        var htmlChildrenTitle = childrenTitle.replace(new RegExp("(" + keyword + ")", "ig"), "<g>" + keyword + "</g>");
                        $('<a></a>')
                            .attr({
                                menuId: menus[i].children[j].id,
                                menuUrl: menus[i].children[j].href
                            })
                            .html(htmlChildrenTitle).click(function () {
                                _this.goPage({
                                    id: $(this).attr('menuId'),
                                    name: $(this).text(),
                                    href: $(this).attr('menuUrl')
                                });
                            }).appendTo(dd);
                    }
                }
                //如果没有孩子就能够点击访问
                else {
                    a.click(function () {
                        _this.goPage({
                            id: $(this).attr('menuId'),
                            name: $(this).find('font').text(),
                            href: $(this).attr('menuUrl')
                        });
                    }).css({
                        cursor: 'pointer'
                    });
                }
            }

            _this.clearMenuKeyword(searchKey);
            layui.use('element', function () {
                var element = layui.element;
                element.init();
            });
        },
        findLMenuCrrentMenuId: function (menuId) {
            $('.l-menus-frame').find('dd').each(function () {
                $(this).removeClass('layui-this');
                if ($(this).find('a').attr('menuid') == menuId) {
                    $(this).addClass('layui-this');
                }
            });
        },
        /**
         * 指向左部菜单
         */
        pointerLMenus: function () {

        },
        /**
         * 选择一个页面渲染到主控制台上去
         */
        goPage: function (row) {
            var _this = this;
            layui.use('element', function () {
                var $ = layui.jquery,
                    element = layui.element; //Tab的切换功能，切换事件监听等，需要依赖element模块
                //console.log(_this.hasMenus);
                if (!isInArray(_this.hasMenus, row.id)) {
                    _this.hasMenus.push(row.id);
                    //新增一个Tab项
                    element.tabAdd('m-control', {
                        title: row.name //用于演示
                            ,
                        content: '<iframe src="' + row.href + '" frameborder="0" width="100%" height="100%" name="iframe_' + row.id + '"></iframe>',
                        id: row.id //实际使用一般是规定好的id，这里以时间戳模拟下
                    });
                    element.tabChange('m-control', row.id);
                } else {
                    //切换到指定Tab项
                    element.tabChange('m-control', row.id);
                }
                if (row.dd) row.dd.addClass('layui-this');
            });
        },
        /**
         * 切换皮肤
         */
        changeSkin: function () {

        },
        //用于生成uuid
        s4: function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        },
        guid: function () {
            return (this.s4() + this.s4() + "-" + this.s4() + "-" + this.s4() + "-" + this.s4() + "-" + this.s4() + this.s4() + this.s4());
        }
    };
};

$(function () {
    //注意：导航 依赖 element 模块，否则无法进行功能性操作
    layui.use('element', function () {
        var $ = layui.jquery,
            element = layui.element; //Tab的切换功能，切换事件监听等，需要依赖element模块
    });

    var panelTools = new PanelTools();
    panelTools.init();
});