/*global searchMenuById zNodes */
var menuIcons = ['icon-gerenzhongxin',
'icon-report',
'icon-suojinindent2',
'icon-suojinindent3',
'icon-tuichuquanping',
'icon-guanbi',
'icon-jiantou1',
'icon-quanping',
'icon-gerenzhongxin1',
'icon-gongxiangtubiaozhuangtaileicaozuolei23',
'icon-iconyonghu',
'icon-gongxiang',
'icon-xiaoxi',
'icon-tuichudenglu',
'icon-sousuo',
'icon-tuichudenglu1',
'icon-mimashezhi',
'icon-config-account',
'icon-shoucang',
'icon-guanbijiantou',
'icon-shoucang1',
'icon-sousuo1',
'icon-fenxiang',
'icon-xiaoxi1',
'icon-xihuan',
'icon-zan',
'icon-lvjing',
'icon-fanzhuanjingtou',
'icon-paizhao',
'icon-bianda',
'icon-kuaijin',
'icon-xuanzhuanshouji',
'icon-liangdu',
'icon-yanjingmoshi',
'icon-yinliang',
'icon-suoxiao',
'icon-xialajiantouxiao',
'icon-jingxuan',
'icon-zhekou',
'icon-tishi',
'icon-shuiguo',
'icon-huiyi',
'icon-youhuiquan',
'icon-jianshen',
'icon-chufang',
'icon-ditu',
'icon-zanxiao',
'icon-huiyuanqia',
'icon-jiesonghuoche',
'icon-changyongxinxi',
'icon-fanchengjipiao',
'icon-chujingchaoshi',
'icon-shoujian',
'icon-shaixuan',
'icon-jiesongji',
'icon-tupian',
'icon-zengjia',
'icon-neirong2',
'icon-daohang',
'icon-gengduo',
'icon-ganxie',
'icon-dianhua',
'icon-huodongxiangqu',
'icon-jieban',
'icon-kefu',
'icon-liebiao',
'icon-jingdian',
'icon-mulu',
'icon-neirong',
'icon-naozhong',
'icon-pinglun',
'icon-saoyisao',
'icon-qianzheng',
'icon-toutiao',
'icon-shezhi',
'icon-tuichu',
'icon-jinnang',
'icon-wifi',
'icon-changge',
'icon-dianpu',
'icon-anquanzhongxin',
'icon-dingdanchulizhong',
'icon-dingdandaifukuan',
'icon-dingdan',
'icon-dingdanjihe',
'icon-faxian',
'icon-chujingyou',
'icon-dingdanyichenggong',
'icon-gouwu',
'icon-gouwuche',
'icon-dujia',
'icon-hongbao',
'icon-huochepiao',
'icon-jihuozhongzhuan',
'icon-jiudian',
'icon-licheng',
'icon-guojijipiao',
'icon-lichengdixian',
'icon-jipiao',
'icon-mudedi',
'icon-qichepiao',
'icon-lubiao',
'icon-qitadingdan',
'icon-rili',
'icon-shikebiao',
'icon-shoudiantongguan',
'icon-shoudiantongkai',
'icon-taideng',
'icon-shouye',
'icon-weilaijiudian',
'icon-xiangqing',
'icon-wangwang',
'icon-wode',
'icon-hangcheng',
'icon-yuyuedingdan',
'icon-zuche',
'icon-yijianfankui',
'icon-bangzhu',
'icon-bofang',
'icon-bangdan',
'icon-ditudingwei',
'icon-canyin',
'icon-fanhui',
'icon-gantanhao',
'icon-feiyongbuhan',
'icon-gengduo1',
'icon-huiyuan',
'icon-jian',
'icon-jingdianwanfa',
'icon-jiaoxing',
'icon-kuandai',
'icon-qianzheng1',
'icon-shibai',
'icon-qiehuan',
'icon-shijian',
'icon-heliu',
'icon-icon-test',
'icon-pifu',
'icon-xiugaimima',
'icon-jiantou_yemian_xiangyou_o',
'icon-jiantou_yemian_xiangzuo_o',
'icon-shujutongji',
'icon-yunliankeji_gongyinglianfuben',
'icon-yunliankeji_gongyinglianfuben1',
'icon-yunliankeji_gongyinglianfuben2',
'icon-yunliankeji-',
'icon-yunliankeji-1',
'icon-yunliankeji-2',
'icon-yunliankeji-3',
'icon-yunliankeji-4',
'icon-yunliankeji-5',
'icon-yunliankeji-6',
'icon-yunliankeji_gongyinglianfuben3',
'icon-weibiaoti-_chazhao-xian',
'icon-weibiaoti-_saoyisao-xian',
'icon-weibiaoti-_gouwuche-xian',
'icon-weibiaoti-_dingwei-xian',
'icon-weibiaoti-_shanchu-xian',
'icon-weibiaoti-_shizhong-xian',
'icon-weibiaoti-_shezhi-xian',
'icon-weibiaoti-_shuqian-xian',
'icon-weibiaoti-_suo-xian',
'icon-weibiaoti-_tianjia-xian',
'icon-weibiaoti-_wode-xian',
'icon-weibiaoti-_xiangji-xian',
'icon-weibiaoti-_xianshi-xian',
'icon-weibiaoti-_xiazai-mian',
'icon-weibiaoti-_zan-xian',
'icon-sousuo2',
'icon-erweima',
'icon-wuliuchaxun',
'icon-baoshuicang',
'icon-fabugonglve',
'icon-buxihuan',
'icon-fuzhilianjie',
'icon-fenxiangzhuanqian',
'icon-gouwuche1',
'icon-kefu1',
'icon-leng',
'icon-miandankaituan',
'icon-qianbao',
'icon-icon-test1',
'icon-icon-test2',
'icon-icon-test3',
'icon-icon-test4',
'icon-icon-test5',
'icon-icon-test6',
'icon-icon-test7',
'icon-icon-test8',
'icon-icon-test9',
'icon-icon-test10',
'icon-icon-test11',
'icon-icon-test12',
'icon-icon-test13',
'icon-fenxiang1',
'icon-dushu',
'icon-shudan',
'icon-yanjing',
'icon-rili1',
'icon-yuedu',
'icon-jilu',
'icon-biji',
'icon-bianji',
'icon-shezhi1',
'icon-xiaoxi2',
'icon-sousuo3',
'icon-naoling',
'icon-dingdan1',
'icon-wode1',
'icon-fenxi',
'icon-luxiang',
'icon-jiesuo',
'icon-shezhi2',
'icon-shijian1',
'icon-suo',
'icon-wendang',
'icon-xiangji',
'icon-bangong',
'icon-dianhua1',
'icon-IDxingmingzhengjian',
'icon-buchongtianjiashangchuan',
'icon-caiwuguanli',
'icon-caozuodaicaodaili',
'icon-daichulijihua',
'icon-daichulikehu',
'icon-duizhangzhongxin',
'icon-edushouxin',
'icon-feiyongguanli',
'icon-fengkonganquandunpai',
'icon-fengkongkehu',
'icon-qiapianshuliang',
'icon-kehuzhuangtai',
'icon-quanbueduzichan',
'icon-quaneyihuanqing',
'icon-shezhi3',
'icon-shenqingjiechu',
'icon-shenhe',
'icon-shengyukeyongedu',
'icon-shoudonggengxin',
'icon-shoujilianxi',
'icon-sousuofangdajing',
'icon-sousuofangdajing-',
'icon-tongzhixiaoxilaba',
'icon-tuijianren',
'icon-wangyinqia',
'icon-wentidingdan',
'icon-xingmingzhengjian',
'icon-yihuankuanbufen',
'icon-yuqikehu',
'icon-zhengtiquanbujihua',
'icon-zijinguanli',
'icon-bianji1',
'icon-baocun',
'icon-chakanxiangqing',
'icon-fasong',
'icon-bukejian',
'icon-fanhui1',
'icon-banli',
'icon-fangkuan',
'icon-jinzhi',
'icon-kejian',
'icon-jujue',
'icon-lingqu',
'icon-renxiang',
'icon-mimasuo',
'icon-renzheng',
'icon-riqi',
'icon-shanchu',
'icon-shangchuan',
'icon-sousuo4',
'icon-shuaxin',
'icon-shenhe1',
'icon-tijiao',
'icon-tongguo',
'icon-tixing',
'icon-tuichudenglu2',
'icon-xiazai',
'icon-xinzeng',
'icon-xinzengrenyuan',
'icon-zhaopian',
'icon-zhuanfa',
'icon-yulan',
'icon-huankuanguanli',
'icon-baobiaoguanli',
'icon-chushenguanli',
'icon-cuishouguanli',
'icon-fangkuanguanli',
'icon-jintiaoguanli',
'icon-shenqingguanli',
'icon-yuqiguanli',
'icon-zhongshenguanli'];

for (var i = 0; i < menuIcons.length; i++) {
    var a = $('<a></a>').attr({
        href: 'javascript:void(0)',
        icon: menuIcons[i]
    }).css({
        marginRight: '20px',
        float: 'left',
        display: 'block',
        margin: '0 0 20px 20px',
        overflow:'hidden',
        width:'22px',
        height:'22px'
    });
    $('<i class="layui-icon"></i>').css({
        fontSize: '24px',
        color: '#337AB7'
    }).addClass(menuIcons[i]).appendTo(a);
    a.appendTo('.menuIcons');
}

layui.use(['layer', 'form'], function () {
    var layer = layui.layer,form = layui.form;
    var menuIconComponet = function (node, index) {
        var makeIcon = function (icon) {
            node.siblings("i").remove();
            node.siblings("input").remove();
            node.after('<i class="layui-icon ' + icon + '"></i>');
            node.after('<input type="hidden" name="icon" value="' + icon + '"/>');
            layer.close(index);
        };

        $('.menuIcons a').unbind('click').bind('click', function () {
            var icon = $(this).attr('icon');
            makeIcon(icon);
        });
    };

    var MenuForm = function () {
        var dialogMenu = $('.dialogMenu');
        var selectIcon = dialogMenu.find('.selectIcon');
        var menuIcons = $('.menuIcons');
        return {
            init: function () {
                //关联选择图标节点
                this.setSelectIcon();
            },
            createInit: function (menu) {
                this.init();
                this.reset();
                this.bindCreate();
                dialogMenu.find('input[name="parentId"]').val(menu.parentId);
                dialogMenu.find('.submitForm').text('确认添加');
            },
            editInit: function (menu) {
                this.init();
                this.reset();
                this.bindEdit();
                dialogMenu.find('input[name="parentId"]').val(menu.parentId);
                dialogMenu.find('input[name="id"]').val(menu.id);
                dialogMenu.find('input[name="name"]').val(menu.name);
                dialogMenu.find('input[name="href"]').val(menu.href);
                selectIcon.siblings("i").remove();
                selectIcon.siblings("input").remove();
                selectIcon.after('<i class="layui-icon ' + menu.icon + '"></i>');
                selectIcon.after('<input type="hidden" name="icon" value="' + menu.icon + '"/>');
                dialogMenu.find('input[name="sort"]').val(menu.sort);
                dialogMenu.find('.submitForm').text('确认修改');
            },
            reset: function () {
                form.render();
                selectIcon.siblings("i").remove();
                selectIcon.siblings("input").remove();
            },
            setSelectIcon: function () {
                selectIcon.unbind('click').bind('click', function () {
                    var index = layer.open({
                        type: 1,
                        title: '选择菜单图标',
                        offset: 'auto',
                        id: 'menuIconsId' ,//防止重复弹出
                        content: layui.jquery('.menuIcons'),
                        shade: 0 ,//不显示遮罩
                        area: ['600px', '480px'] //宽高
                    });
                    menuIconComponet($(this), index);
                });
            },
            bindCreate:function(){
                form.on('submit(submitForm)', function (data) {
                    $.ajax({
                        url: '/interface/api/sysMenu?token=' + getCookie('token'),
                        data: JSON.stringify({
                            href: data.field.href,
                            icon: data.field.icon,
                            name: data.field.name,
                            parentId: data.field.parentId,
                            sort: data.field.sort
                        }),
                        contentType: "application/json", //发送信息至服务器时内容编码类型。             
                        dataType: "json", // 预期服务器返回的数据类型。如果不指定，jQuery 将自动根据 HTTP 包 MIME 信息来智能判断，比如XML MIME类型就被识别为XML。
                        type: 'post',
                        success: function (data) {
                            if (data.errCode) {
                                layer.msg('网络异常请求失败，请重试。');
                                return false;
                            } else {
                                layer.alert('创建成功!', {
                                    icon: 1
                                });
                                layer.closeAll();
                                window.location.reload();
                            }
                        }
                    });
                    return false;
                });
            },
            bindEdit:function(){
                form.on('submit(submitForm)', function (data) {
                    $.ajax({
                        url: '/interface/api/sysMenu?token=' + getCookie('token'),
                        data: JSON.stringify({
                            href: data.field.href,
                            icon: data.field.icon,
                            name: data.field.name,
                            parentId: data.field.parentId,
                            sort: data.field.sort,
                            id: data.field.id
                        }),
                        contentType: "application/json", //发送信息至服务器时内容编码类型。             
                        dataType: "json", // 预期服务器返回的数据类型。如果不指定，jQuery 将自动根据 HTTP 包 MIME 信息来智能判断，比如XML MIME类型就被识别为XML。
                        type: 'put',
                        success: function (data) {
                            if (data.errCode) {
                                layer.msg('网络异常请求失败，请重试。');
                                return false;
                            } else {
                                layer.alert('修改成功!', {
                                    icon: 1
                                });
                                layer.closeAll();
                                window.location.reload();
                            }
                        }
                    });
                    return false;
                });
            }
        };
    };
    var menuForm = new MenuForm();
    var className = "dark";
    var setting = {
        view: {
            addHoverDom: function (treeId, treeNode) {
                var sObj = $("#" + treeNode.tId + "_span");
                if (treeNode.editNameFlag || $("#addBtn_" + treeNode.tId).length > 0) return;
                var addStr = "<span class='button add' id='addBtn_" + treeNode.tId + "' title='添加子菜单' onfocus='this.blur();'></span>";
                sObj.after(addStr);
                var btn = $("#addBtn_" + treeNode.tId);
                if (btn) btn.bind("click", function () {
                    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                    zTree.selectNode(treeNode);
                    layer.open({
                        type: 1,
                        title: '创建菜单',
                        offset: 'auto' ,
                        id: 'dialogMenuId',
                        content: layui.jquery('.dialogMenu'),
                        shade: 0 //不显示遮罩
                            ,
                        area: ['480px', '400px'] //宽高
                    });
                    menuForm.createInit({
                        parentId: treeNode.id
                    });
                    return false;
                });
            },
            removeHoverDom: function(treeId, treeNode) {
                $("#addBtn_" + treeNode.tId).unbind().remove();
            },
            selectedMulti: false
        },
        edit: {
            enable: true,
            editNameSelectAll: true,
            removeTitle: "删除菜单",
            renameTitle: "编辑菜单"
        },
        callback: {
            beforeDrag: function(treeId, treeNodes) {
                return false;
            },
            beforeEditName: function(treeId, treeNode) {
                className = (className === "dark" ? "" : "dark");
                var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                zTree.selectNode(treeNode);
                layer.open({
                    type: 1,
                    title: '编辑菜单',
                    offset: 'auto' ,
                    id: 'dialogMenuId',
                    content: layui.jquery('.dialogMenu'),
                    shade: 0 //不显示遮罩
                        ,
                    area: ['480px', '400px'] //宽高
                });
                menuForm.editInit(searchMenuById(treeNode.id));                
                //return confirm("进入节点 -- " + treeNode.name + " 的编辑状态吗？");
                return false;
            },
            //删除之前提示确认删除
            beforeRemove: function(treeId, treeNode) {
                className = (className === "dark" ? "" : "dark");
                var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                zTree.selectNode(treeNode);
                layer.confirm('您确认要删除该菜单吗？', {
                    btn: ['确认', '取消'] //按钮
                }, function () {
                    $.ajax({
                        url: '/interface/api/sysMenu/' + treeNode.id + '?token=' + getCookie('token'),
                        contentType: "application/json", //发送信息至服务器时内容编码类型。             
                        dataType: "json", // 预期服务器返回的数据类型。如果不指定，jQuery 将自动根据 HTTP 包 MIME 信息来智能判断，比如XML MIME类型就被识别为XML。
                        type: 'delete',
                        success: function (data) {
                            if (data.errCode) {
                                layer.msg('网络异常请求失败，请重试。');
                                return false;
                            } else {
                                layer.alert('修改成功。', {
                                    icon: 1
                                });
                                window.location.reload();
                            }
                        }
                    });
                }, function () {
        
                });
                return false;
            },
            beforeRename: function(treeId, treeNode, newName, isCancel) {
                className = (className === "dark" ? "" : "dark");
                if (newName.length == 0) {
                    alert("节点名称不能为空.");
                    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                    setTimeout(function () {
                        zTree.editName(treeNode);
                    }, 10);
                    return false;
                }
                return true;
            },
            onRemove: function(e, treeId, treeNode) {
                alert('删除的时候执行！');
            },
            onRename: function(e, treeId, treeNode, isCancel) {}
        },
        data: {
            simpleData: {
                enable: true,
                idKey: "id",
                pIdKey: "parentId",
                rootPId: '0'
            }
        }
    };
    $(document).ready(function () {
        var treeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
        treeObj.expandAll(true);
        $('.ztree li span').removeAttr('style');
        $("#selectAll").bind("click", function() {
            var zTree = $.fn.zTree.getZTreeObj("treeDemo");
            zTree.setting.edit.editNameSelectAll = $("#selectAll").attr("checked");
        });
    });
});