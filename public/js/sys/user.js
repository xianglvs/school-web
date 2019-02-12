layui.config({
    base: 'lib/',
}).extend({
    selectM: 'selectM',
});
layui.use(['jquery', 'table', 'form', 'layer', 'selectM'], function () {
    var form = layui.form,
        table = layui.table,
        layer = layui.layer,
        $ = layui.jquery,
        selectM = layui.selectM;
    var roleIns = "";

    //监听搜索
    var searchParams = {};
    var SearchFrom = function () {
        return {
            bindSearch: function () {
                form.on('submit(table-search)', function (data) {
                    console.log(data);
                    $.extend(searchParams, data.field);
                    userTable.reload();
                });
            },
        };
    };
    var searchFrom = new SearchFrom();
    searchFrom.bindSearch();

    var UserForm = function () {
        var userFrom = $('.userDialog');
        return {
            init: function () {
                //创建form表单选项树
                this.setValidate();
            },
            setValidate: function () {
                //自定义验证规则
                form.verify({
                    name: function (value) {
                        if (value.length < 2) {
                            return '长度不能低于2';
                        }
                    },
                    loginName: function (value) {
                        if (value.length < 2) {
                            return '长度不能低于2';
                        }
                    },
                    mobile: function (value) {
                        if (value.length < 2) {
                            return '长度不能低于2';
                        }
                    },
                    email: function (value) {
                        if (value.length < 2) {
                            return '长度不能低于2';
                        }
                    }
                });
            },
            createInit: function (user) {
                this.init();
                this.reset();
                this.bindCreate();
                userFrom.find('.password').show();
                userFrom.find('.submitForm').text('确认添加');
            },
            editInit: function (user) {
                this.init();
                this.reset();
                this.bindEdit();
                this.selectCheck(user.id);
                form.val('userFrom', {
                    "id": user.id,
                    "name": user.name,
                    "loginName": user.loginName,
                    "mobile": user.mobile,
                    "email": user.email,
                });
                userFrom.find('.password').hide();
                userFrom.find('.submitForm').text('确认修改');
            },
            selectCheck: function (id) {
                $.get('/interface/api/sysUser/queryUserRoles', {
                    id: id
                }, function (result) {
                    var selectDefault = [];
                    var data = result.data;
                    for (var i = 0; i < data.length; i++) {
                        selectDefault.push(data[i].id);
                    }
                    roleIns.set(selectDefault);
                });
            },
            selectInit: function () {
                $.get('/interface/api/sysRole/all', {
                    token: getCookie('token')
                }, function (result) {
                    roleIns = selectM({
                        elem: '#role_list',
                        data: result.data,
                        width: 250,
                        tips: "请选择角色",
                        verify: 'required'
                    });
                });
            },
            reset: function () {
                roleIns.set();
                form.render();
            },
            bindCreate: function () {
                form.on('submit(submituserForm)', function (data) {
                    data.field.roles = roleIns.selected;
                    layer.confirm('是否确认提交？', {
                        btn: ['确认', '取消']
                    }, function (index, layero) {
                        $.ajax({
                            url: '/interface/api/sysUser?token=' + getCookie('token'),
                            type: 'POST',
                            contentType: "application/json",
                            //dataType:'json',
                            data: JSON.stringify({
                                "name": data.field.name,
                                "loginName": data.field.loginName,
                                "mobile": data.field.mobile,
                                "password": hex_md5(data.field.password),
                                "phone": data.field.mobile,
                                "email": data.field.email,
                                "type": 1,
                                "roles": data.field.roles
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
                form.on('submit(submituserForm)', function (data) {
                    data.field.roles = roleIns.selected;
                    layer.confirm('是否确认提交？', {
                        btn: ['确认', '取消']
                    }, function (index, layero) {
                        $.ajax({
                            url: '/interface/api/sysUser?token=' + getCookie('token'),
                            type: 'PUT',
                            contentType: "application/json",
                            //dataType:'json',
                            data: JSON.stringify({
                                "id": data.field.id,
                                "name": data.field.name,
                                "loginName": data.field.loginName,
                                "mobile": data.field.mobile,
                                "phone": data.field.mobile,
                                "email": data.field.email,
                                "roles": data.field.roles
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
    var userForm = new UserForm();
    userForm.init();
    userForm.selectInit();

    var UserTable = function () {
        return {
            getOptions: function () {
                return {
                    elem: '#userTable',
                    toolbar: '#toolTable',
                    cellMinWidth: 150 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
                        ,
                    skin: 'row' //表格风格
                        ,
                    even: true,
                    page: true //是否显示分页
                        ,
                    limit: 10 //每页默认显示的数量
                        ,
                    limits: [10, 20, 50, 100] //每页默认显示的数量
                        ,
                    cols: [
                        [ //表头
                            {
                                field: 'name',
                                title: '姓名 ',
                                fixed: 'left'
                            }, {
                                field: 'loginName',
                                title: '登录账号 '
                            }, {
                                field: 'mobile',
                                title: '手机号码'
                            }, {
                                field: 'email',
                                title: '邮箱'
                            }, {
                                field: 'createDate',
                                sort: true,
                                title: '创建时间'
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
                                area: ['420px', '550px'],
                                shadeClose: false, //点击遮罩关闭
                                content: $(".userDialog")
                            });
                            userForm.createInit();
                            break;
                    }
                });
            },
            setRowTools: function () {
                table.on('tool(test)', function (obj) {
                    var user = obj.data;
                    console.log(obj);
                    if (obj.event === 'del') {
                        layer.confirm('真的删除此用户吗？', function (index) {
                            $.ajax({
                                url: '/interface/api/sysUser/' + user.id + '?token=' + getCookie('token'),
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
                            area: ['420px', '500px'],
                            shadeClose: false, //点击遮罩关闭
                            content: $(".userDialog")
                        });
                        userForm.editInit(user);
                    } else if (obj.event === 'resetPassword') {
                        console.log(user);
                        layer.confirm('确认为此用户重置密码吗？', function (index) {
                            $.ajax({
                                url: '/interface/api/sysUser/resetPassword?id=' + user.id + '&token=' + getCookie('token'),
                                type: 'PUT',
                                contentType: "application/json",
                                //dataType:'json',
                                success: function (data) {
                                    if (data.code) {
                                        layer.msg(data.message);
                                        return false;
                                    }
                                    layer.msg(data.message);
                                    //  obj.del();
                                },
                                error: function (data) {
                                    layer.msg("系统繁忙", {
                                        icon: 5
                                    });
                                }
                            });
                            layer.close(index);
                        });
                    }
                });
            },
            render: function () {
                var _this = this;
                $.extend(searchParams, {
                    token: getCookie('token'),
                    type: 1
                });
                var options =
                    $.extend(_this.getOptions(), {
                        url: '/interface/api/sysUser',
                        where: searchParams, //如果无需传递额外参数，可不加该参数
                        method: 'GET',
                        request: {
                            pageName: 'pageNum' //页码的参数名称，默认：page
                                ,
                            limitName: 'pageSize' //每页数据量的参数名，默认：limit
                        },
                        parseData: function (res) { //res 即为原始返回的数据
                            return {
                                "code": res.code, //解析接口状态
                                "msg": res.message, //解析提示文本
                                "count": res.data.total, //解析数据长度
                                "data": res.data.list //解析数据列表
                            };
                        }
                    });
                table.render(options);
            },
            reload: function () {
                $.extend(searchParams, {
                    token: getCookie('token'),
                    type: 1
                });
                table.reload('userTable', {
                    where: searchParams
                });
            }
        };
    };
    var userTable = new UserTable();
    userTable.init();

});