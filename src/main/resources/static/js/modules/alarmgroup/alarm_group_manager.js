$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'alarm_group_manager/list_by_tagname',
        datatype: "json",
        colModel: [
            { label: '报警组名称', name: 'groupName', index: "groupName", width: 100},
            { label: '报警组ID', name: 'uniqueId', index: "uniqueId", width: 50, key: true },
            { label: '创建人', name: 'extUser', index: "extUser", width: 50},
            { label: '报警邮件接收人', name: 'emailToList', index: "emailToList", width: 300 },
            { label: '报警微信接收人ID', name: 'wxToList', index: "wxToList", width: 200 }

        ],
        viewrecords: true,
        height: 485,
        rowNum: 1000,
        rowList : [1000,3000,5000],
        rownumbers: true,
        rownumWidth: 25,
        autowidth:true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader : {
            root: "list",
            page: 1,
            total: 1,
            records: "totalCount"
        },
        prmNames : {
            page:"page",
            rows:"limit",
            order: "order"
        },
        gridComplete:function(){
            //隐藏grid底部滚动条
            $("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
        }
    });
});

var vm = new Vue({
    el:'#rrapp',
    data:{
        showList: true,
        title:null,
        alarmGroup:{}
    },
    methods: {
        query: function () {
            vm.reload();
        },
        add: function(){
            vm.showList = false;
            vm.title = "新增";
            vm.alarmGroup = {};
        },
        update: function () {
            var uniqueId = getSelectedRow();
            if(uniqueId == null){
                return ;
            }

            vm.showList = false;
            vm.title = "修改";

            vm.getInfo(uniqueId)
        },

        saveOrUpdate: function () {
            if(vm.validator()){
                return ;
            }
            var url = vm.alarmGroup.uniqueId == null ? "alarm_group_manager/create" : "alarm_group_manager/update";

            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.alarmGroup),
                success: function(r){
                    if(r.code === 0){
                        alert('操作成功', function(index){
                            vm.reload();
                        });
                    }else{
                        alert(r.msg);
                    }
                }
            });
        },
        getInfo: function(uniqueId){
            $.get(baseURL + "alarm_group_manager/query_by_uniqueid?&uniqueid="+uniqueId, function(r){
                vm.alarmGroup = r.group;
            });
        },

        reload: function (event) {
            vm.showList = true;
            var page = $("#jqGrid").jqGrid('getGridParam','page');
            $("#jqGrid").jqGrid('setGridParam',{
                page:page
            }).trigger("reloadGrid");
        },

        validator: function () {
            if(isBlank(vm.alarmGroup.groupName)){
                alert("名称不能为空");
                return true;
            }
        }
    }
});