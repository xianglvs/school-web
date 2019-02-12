/*global zNodes*/
layui.config({
    base: 'lib/',
}).extend({
    authtree: 'authtree',
});
layui.use(['jquery', 'authtree', 'table', 'form', 'layer'], function () {
    var form = layui.form,
        table = layui.table,
        layer = layui.layer,
        $ = layui.jquery,
        authtree = layui.authtree;
    var RoleForm = function () {
        var roleFrom = $('.roleDialog');

        return {
            init: function () {
                //创建form表单选项树
                this.setValidate();
            },
            setValidate: function () {
                //自定义验证规则
                form.verify({
                    roleName: function (value) {
                        if (value.length < 2) {
                            return '角色名称字数不能少于2';
                        }
                    },
                    enname: function (value) {
                        if (value.length < 1) {
                            return '英文名称不能为空';
                        }
                    }
                });
            },
            createInit: function (role) {
                this.init();
                this.reset();
                this.bindCreate();
                initTree();
                roleFrom.find('.submitForm').text('确认添加');
            },
            editInit: function (role) {
                this.init();
                this.reset();
                this.bindEdit();
                form.val('roleFrom', {
                    "id": role.id,
                    "name": role.name,
                    "enname": role.enname
                });
                initTree(role.id);
                roleFrom.find('.submitForm').text('确认修改');
            },
            reset: function () {
                form.render();
            },
            bindCreate: function () {
                form.on('submit(submitRoleForm)', function (data) {
                    var menus = authtree.getChecked('#LAY-auth-tree-index');
                    data.field.menus = menus;
                    layer.confirm('是否确认提交？', {
                        btn: ['确认', '取消']
                    }, function (index, layero) {
                        $.ajax({
                            url: '/interface/api/sysRole?token=' + getCookie('token'),
                            type: 'POST',
                            contentType: "application/json",
                            //dataType:'json',
                            data: JSON.stringify({
                                "name": data.field.name,
                                "enname": data.field.enname,
                                "useable": 1,
                                "menus": data.field.menus
                            }),
                            success: function (data) {
                                if (data.code) {
                                    layer.msg(data.message);
                                    return false;
                                }
                                setTimeout(function () {
                                    window.location.reload(); //修改成功后刷新父界面
                                }, 1000);
                            },
                            error: function (data) {
                                layer.msg("系统繁忙", {
                                    icon: 5
                                });
                            }
                        });
                    }, function (index) {
                        //按钮【按钮二】的回调
                    });
                });
            },
            bindEdit: function () {
                form.on('submit(submitRoleForm)', function (data) {
                    layer.confirm('是否确认提交？', {
                        btn: ['确认', '取消']
                    }, function (index, layero) {
                        var menus = authtree.getChecked('#LAY-auth-tree-index');
                        data.field.menus = menus;
                        $.ajax({
                            url: '/interface/api/sysRole?token=' + getCookie('token'),
                            type: 'PUT',
                            contentType: "application/json",
                            //dataType:'json',
                            data: JSON.stringify({
                                "id": data.field.id,
                                "name": data.field.name,
                                "enname": data.field.enname,
                                "useable": 1,
                                "menus": data.field.menus
                            }),
                            success: function (data) {
                                if (data.code) {
                                    layer.msg(data.message);
                                    return false;
                                }
                                layer.msg(data.message);
                                window.location.reload(); //修改成功后刷新父界面
                            },
                            error: function (data) {
                                layer.msg("系统繁忙", {
                                    icon: 5
                                });
                            }
                        });
                    }, function (index) {
                        //按钮【按钮二】的回调
                    });
                });
            }
        };
    };
    var roleForm = new RoleForm();
    roleForm.init();

    var RoleTable = function () {
        return {
            getOptions: function () {
                return {
                    elem: '#roleTable',
                    toolbar: '#toolTable',
                    cellMinWidth: 150 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                        ,
                    cols: [
                        [ //表头
                            {
                                field: 'name',
                                title: '角色名称',
                                fixed: 'left'
                            }, {
                                field: 'enname',
                                title: '英文名称'
                            }, {
                                fixed: 'right',
                                title: '操作',
                                toolbar: '#barTable'
                            }
                        ]
                    ],
                    data: []
                };
            },
            init: function () {
                this.setToolBar();
                this.setRowTools();
                this.render();
            },
            setToolBar: function () {
                //头工具栏事件
                table.on('toolbar(test)', function (obj) {
                    var checkStatus = table.checkStatus(obj.config.id);
                    switch (obj.event) {
                        case 'addData':
                            layer.open({
                                type: 1,
                                title: '添加角色',
                                maxmin: true,
                                shade: false,
                                area: ['420px', '480px'],
                                shadeClose: false, //点击遮罩关闭
                                content: $(".roleDialog")
                            });
                            roleForm.createInit();
                            break;
                    }
                });
            },
            setRowTools: function () {
                table.on('tool(test)', function (obj) {
                    var role = obj.data;
                    if (obj.event === 'del') {
                        layer.confirm('真的删除行么', function (index) {
                            $.ajax({
                                url: '/interface/api/sysRole/id=' + role.id + '?token=' + getCookie('token'),
                                type: 'DELETE',
                                contentType: "application/json",
                                //dataType:'json',
                                success: function (data) {
                                    if (data.code) {
                                        layer.msg(data.message);
                                        return false;
                                    }
                                    layer.msg(data.message);
                                    obj.del();
                                },
                                error: function (data) {
                                    layer.msg("系统繁忙", {
                                        icon: 5
                                    });
                                }
                            });
                            layer.close(index);
                        });
                    } else if (obj.event === 'edit') {
                        //表单初始赋值
                        layer.open({
                            type: 1,
                            title: '编辑角色',
                            maxmin: true,
                            shade: false,
                            area: ['420px', '480px'],
                            shadeClose: false, //点击遮罩关闭
                            content: $(".roleDialog")
                        });
                        roleForm.editInit(role);
                    }
                });
            },
            render: function () {
                var _this = this;
                $.get('/interface/api/sysRole/all', {
                    token: getCookie('token')
                }, function (result) {
                    var listData = result.data;
                    var options = $.extend(_this.getOptions(), {
                        data: listData
                    });
                    table.render(options);
                });
            }
        };
    };
    var roleTable = new RoleTable();
    roleTable.init();




    function initTree(roleId) {
        if (roleId != "" && roleId != null) {
            $.ajax({
                url: '/interface/api/sysRole/roleMenu?id=' + roleId + '&token=' + getCookie('token'),
                dataType: 'json',
                success: function (data) {
                    var checkedData = data.data;
                    var checkedKey = [];
                    for (var i = 0; i < checkedData.length; i++) {
                        var node = checkedData[i];
                        node.id = node.menuId;
                        checkedKey.push(node.menuId);
                    }
                    var trees = authtree.listConvert(zNodes, {
                        primaryKey: 'id',
                        startPid: '1',
                        parentKey: 'parentId',
                        nameKey: 'name',
                        valueKey: 'id',
                        checkedKey: checkedKey
                    });
                    authtree.render('#LAY-auth-tree-index', trees, {
                        inputname: 'menus[]',
                        layfilter: 'lay-check-auth',
                        autowidth: true
                    });
                }
            });
        } else {
            var trees = authtree.listConvert(zNodes, {
                primaryKey: 'id',
                startPid: '1',
                parentKey: 'parentId',
                nameKey: 'name',
                valueKey: 'id'
                //,checkedKey: res.data.checkedAlias
            });
            authtree.render('#LAY-auth-tree-index', trees, {
                inputname: 'menus[]',
                layfilter: 'lay-check-auth',
                autowidth: true
            });

        }
    }
    // initTree();
});