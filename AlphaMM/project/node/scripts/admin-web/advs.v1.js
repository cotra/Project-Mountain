require(['jquery', 'avalon', 'core', 'bootstrap', 'gritter', 'ajaxfileupload'],function($, avalon, core, bootstrap, gritter, ajaxfileupload){

    var dataMap;
    var Model;
    var stateMap;
    var VM;
    var init;


    // 数据map
    dataMap = {
        Advs_Delete: {
            id: ''
        }
    }

    // 后台对接数据
    Model = {
        all: function(callback) {
            var par = {
                op: 'all'
            };
            core.json('admin/advs', par, callback);
        },
        AdvsCreate: function(par, callback) {
            var par = par;
            par.op = 'create';
            core.json('admin/advs', par, callback);
        },
        AdvsDelete: function(callback) {
            var par = dataMap.Advs_Delete;
            par.op = 'delete';
            core.json('admin/advs', par, callback);
        }
    }

    // 数据map
    stateMap = {
        TableVMrender: function(vm){
            Model.all(function(data){
                // 获得数据
                vm.list = data.banner;
            });
        }
    }

    // VM
    VM = (function(){

        // 表格VM
        var TableVM = avalon.define({
            $id: 'Banner',
            list: [],
            edit: function(el) {
                AdvsEditVM.advsParam.advs_id = el.advs_id;
                AdvsEditVM.advsParam.name = el.advs_name;
                AdvsEditVM.advsParam.url = el.link;
            },
            clear: function() {
                AdvsEditVM.advsParam.advs_id = '';
                AdvsEditVM.advsParam.name = '';
                AdvsEditVM.advsParam.url = '';
            }
        });
        // 编辑页面VM
        var AdvsEditVM = avalon.define({
            $id: 'AdvsEdit',
            advsParam: {
                advs_id: '',
                name: '',
                url: ''
            },
            FormSend: function(){
                Model.AdvsCreate(AdvsEditVM.advsParam, function(data){
                    if(data) {
                        $.gritter.add({
                            title: '操作提示',
                            text: '您新建了广告：' + AdvsEditVM.advsParam.name,
                            sticky: false,
                            class_name: 'growl-primary'
                        });
                        stateMap.TableVMrender(TableVM);
                    } else {
                        $.gritter.add({
                            title: '操作提示',
                            text: '操作失败,可能是网络原因!',
                            sticky: false,
                            class_name: 'growl-warning'
                        });
                    }
                })
            },
            DeleteSend: function() {
                dataMap.Advs_Delete = {
                    id: AdvsEditVM.advsParam.advs_id
                }
                Model.AdvsDelete(function(data){
                    if(data) {
                        $.gritter.add({
                            title: '操作提示',
                            text: '您删除了广告：' + AdvsEditVM.advsParam.name,
                            sticky: false,
                            class_name: 'growl-danger'
                        });
                        stateMap.TableVMrender(TableVM);
                    } else {
                        $.gritter.add({
                            title: '操作提示',
                            text: '操作失败,可能是网络原因!',
                            sticky: false,
                            class_name: 'growl-warning'
                        });
                    }
                });
            }
        });


        // 初始化
        init = function() {
            stateMap.TableVMrender(TableVM);
            avalon.scan()
        }
        // 启动应用
        init();
    }());

    $('#imageFile').change(function() {
        upload($('#imageFile').val());   //函数参数为上传的文件的本机地址
    });

    function upload(fileName) {
        $.ajaxFileUpload({
            url : '/api/fileUpload',   //提交的路径
            secureuri : false, // 是否启用安全提交，默认为false
            fileElementId : 'imageFile', // file控件id
            dataType : 'JSON',
            data : {
                fileName : fileName   //传递参数，用于解析出文件名
            }, // 键:值，传递文件名
            success : function(data, status) {
                log(data)

                $("#test").attr("src", data.src)
            },
            error : function(data, status) {

            }
        });
    }
});