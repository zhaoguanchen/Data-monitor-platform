$(function () {
    $.getJSON(baseURL + "sys/user/info", function(r){
        vm.user = r.user;
    });
    $.getJSON(baseURL + "alarmgroup/queryAllGroupName", function(r){
        vm.itemName = r.itemName;
    });
});
var vm = new Vue({
	el:'#rrapp',
	data:{
	    module_id:{},
        lastrow:[],
        lastcell:[],
        countModule:1,
	    itemId:[],
	    itemBody:{},
        alarmGroup:{},
        module_name:[],
	    itemID:[],
		itemName:[],
		itemNameu:[],
		moduleName:[],
		moduleNameu:[],
        item:[],
        itemu:[],
        // items:[],//项目id
        groupNameu:[],
        nameu:[],
        emailu:[],
        jobNumberu:[],
        module:[],
        moduleu:[],
        module1:{},
        module2:{},
        module3:{},
        module4:{},
        module5:{},
        module6:{},
        module7:{},
        module8:{},
        module9:{},
        module10:{},
        module11:{},
        module12:{},
        module13:{},
        module14:{},
        module15:{},
        module16:{},
        module17:{},
        module18:{},
        module19:{},
        module20:{},
        modulem:[],
        modulemu:[],
        showList:true,
        showInsert:false,
        showUpdate:false,
        title: null,
        user:{}
	},
	methods: {
        getItemList:function () {
            vm.itemID=$("#selects").val();
            $("#jqGrid").jqGrid({
                url: baseURL + 'alarmgroup/queryAllGroup',
                datatype: "json",
                mtype: "GET",
                colModel: [
                    {label: 'id', name: 'id', key: true,hidden:true},
                    {label: 'parentId', name: 'parentId', hidden:true},
                    {label: '组名称', name: 'groupName'},
                    {label: '用户名', name: 'name',editable : true},
                    {label: '邮箱', name: 'email',editable : true},
                    {label: '工号', name: 'jobNumber',editable : true},
                    {label: '创建人', name: 'creater'},
                    {label: '注释', name: 'remark',editable : true},
                    {
                        label: '操作', name: '', width: 100, formatter: function (value, options, row) {
                        return '<a  class="btn btn-default" style="background: #5bc0de" onclick="update('+options.rowId+')">修改</a>&nbsp;';
                    }
                    }
                ],

                postData: {"itemID": vm.itemID},
                viewrecords: true,
                height: 385,
                rowNum: 30,
                rowList: [30, 50],
                multiselect: true,
                rownumbers: true,
                rownumWidth: 25,
                autowidth: true,
                // multiselect: true,
                pager: "#jqGridPager",
                jsonReader: {
                    root: "page.list",
                    page: "page.currPage",
                    total: "page.totalPage",
                    records: "page.totalCount"
                },
                prmNames: {
                    page: "page",
                    rows: "limit",
                    order: "order"
                },
                beforeEditCell:function(rowid,cellname,v,iRow,iCol){
                    vm.lastrow = iRow;
                    vm.lastcell = iCol;
                },

                gridComplete: function () {
                    //隐藏grid底部滚动条
                    $("#jqGrid").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
                }
            })
                vm.showList = true;
                var page = $("#jqGrid").jqGrid('getGridParam', 'page');
                $("#jqGrid").jqGrid('setGridParam', {
                    postData:{"itemID":vm.itemID},
                    page: page
                }).trigger("reloadGrid");
        },
        addmodule:function () {
            vm.countModule=vm.countModule+1;
            console.log(vm.countModule)
            if(vm.checksModule()){
                return;
            }
        },
        deletemodule:function(){
            vm.countModule=vm.countModule-1;
        },
        query: function () {
            vm.reload();
        },

        insert:function(){
            if(vm.validator()){
                return ;
            }
            vm.alarmGroup={},
            vm.title = "新增";
            vm.showInsert=true;
            vm.showList=false;
            vm.showUpdate=false;
            vm.item=vm.itemID;
            vm.alarmGroup.creater=vm.user.username;
            var parentId=vm.itemID;
            $.getJSON(baseURL + "alarmgroup/queryAllGroupName/"+parentId, function(r){
                vm.modulem=r.moduleName;
            });
        },
        del:function(){
            var jobIds = getSelectedRows();
            if(jobIds == null){
                return ;
            }
            confirm('确定要删除选中的记录？', function(){
                $.ajax({
                    type: "POST",
                    url: baseURL + "alarmgroup/delete",
                    contentType: "application/json",
                    data: JSON.stringify(jobIds),
                    success: function(r){
                        if(r.code == 0){
                            alert('操作成功', function(){
                                vm.reload();
                            });
                        }else{
                            alert(r.msg);
                        }
                    }
                });
            });
        },
        saveOrUpdate:function () {
            var url;
            var checkjobNumber=/^\d{1,7}$/;
            var checkemail=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
            if(vm.alarmGroup.id== null){
                url="alarmgroup/insert";

                if(vm.countModule==1) {
                    if(!checkemail.test(vm.module1.email)){
                        alert("添加第一个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module1.jobNumber)){
                        alert("添加第一个用户工号格式不正确")
                        return true;
                    }
                    if(vm.module1!=null&&vm.module1!={}){
                        Vue.set(vm.module_id,"a",vm.module1);
                    }

                }

                if(vm.countModule==2) {
                    if(!checkemail.test(vm.module1.email)){
                        alert("添加第一个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module1.jobNumber)){
                        alert("添加第一个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module2.email)){
                        alert("添加第二个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module2.jobNumber)){
                        alert("添加第二个用户工号格式不正确")
                        return true;
                    }
                    if(vm.module1!=null&&vm.module1!={}){
                        Vue.set(vm.module_id,"a",vm.module1);
                    }
                    if(vm.module2!=null&&vm.module2!={}){
                        Vue.set(vm.module_id,"a1",vm.module2);
                    }

                }

                if(vm.countModule==3) {
                    if(!checkemail.test(vm.module1.email)){
                        alert("添加第一个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module1.jobNumber)){
                        alert("添加第一个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module2.email)){
                        alert("添加第二个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module2.jobNumber)){
                        alert("添加第二个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module3.email)){
                        alert("添加第三个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module3.jobNumber)){
                        alert("添加第三个用户工号格式不正确")
                        return true;
                    }
                    if(vm.module1!=null&&vm.module1!=""){
                        Vue.set(vm.module_id,"a",vm.module1);
                    }
                    if(vm.module2!=null&&vm.module2!=""){
                        Vue.set(vm.module_id,"a1",vm.module2);
                    }

                    if(vm.module3!=null&&vm.module3!=""){
                        Vue.set(vm.module_id,"a2",vm.module3);
                    }
                }

                if(vm.countModule==4) {
                    if(!checkemail.test(vm.module1.email)){
                        alert("添加第一个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module1.jobNumber)){
                        alert("添加第一个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module2.email)){
                        alert("添加第二个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module2.jobNumber)){
                        alert("添加第二个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module3.email)){
                        alert("添加第三个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module4.email)){
                        alert("添加第四个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module4.jobNumber)){
                        alert("添加第四个用户工号格式不正确")
                        return true;
                    }
                    if(vm.module1!=null&&vm.module1!=""){
                        Vue.set(vm.module_id,"a",vm.module1);
                    }
                    if(vm.module2!=null&&vm.module2!=""){
                        Vue.set(vm.module_id,"a1",vm.module2);
                    }
                    if(vm.module3!=null&&vm.module3!=""){
                        Vue.set(vm.module_id,"a2",vm.module3);
                    }
                    if(vm.module4!=null&&vm.module4!=""){
                        Vue.set(vm.module_id,"a3",vm.module4);
                    }
                }

                if(vm.countModule==5){
                    if(!checkemail.test(vm.module1.email)){
                        alert("添加第一个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module1.jobNumber)){
                        alert("添加第一个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module2.email)){
                        alert("添加第二个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module2.jobNumber)){
                        alert("添加第二个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module3.email)){
                        alert("添加第三个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module4.email)){
                        alert("添加第四个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module4.jobNumber)){
                        alert("添加第四个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module5.email)){
                        alert("添加第五个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module5.jobNumber)){
                        alert("添加第五个用户工号格式不正确")
                        return true;
                    }
                    if(vm.module1!=null&&vm.module1!=""){
                        Vue.set(vm.module_id,"a",vm.module1);
                    }
                    if(vm.module2!=null&&vm.module2!=""){
                        Vue.set(vm.module_id,"a1",vm.module2);
                    }
                    if(vm.module3!=null&&vm.module3!=""){
                        Vue.set(vm.module_id,"a2",vm.module3);
                    }

                    if(vm.module4!=null&&vm.module4!=""){
                        Vue.set(vm.module_id,"a3",vm.module4);
                    }
                    if(vm.module5!=null&&vm.module5!=""){
                        Vue.set(vm.module_id,"a4",vm.module5);
                    }
                }

                if(vm.countModule==6){
                    if(!checkemail.test(vm.module1.email)){
                        alert("添加第一个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module1.jobNumber)){
                        alert("添加第一个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module2.email)){
                        alert("添加第二个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module2.jobNumber)){
                        alert("添加第二个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module3.email)){
                        alert("添加第三个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module4.email)){
                        alert("添加第四个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module4.jobNumber)){
                        alert("添加第四个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module5.email)){
                        alert("添加第五个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module5.jobNumber)){
                        alert("添加第五个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module6.email)){
                        alert("添加第六个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module6.jobNumber)){
                        alert("添加第六个用户工号格式不正确")
                        return true;
                    }
                    if(vm.module1!=null&&vm.module1!=""){
                        Vue.set(vm.module_id,"a",vm.module1);
                    }
                    if(vm.module2!=null&&vm.module2!=""){
                        Vue.set(vm.module_id,"a1",vm.module2);
                    }
                    if(vm.module3!=null&&vm.module3!=""){
                        Vue.set(vm.module_id,"a2",vm.module3);
                    }
                    if(vm.module4!=null&&vm.module4!=""){
                        Vue.set(vm.module_id,"a3",vm.module4);
                    }
                    if(vm.module5!=null&&vm.module5!=""){
                        Vue.set(vm.module_id,"a4",vm.module5);
                    }
                    if(vm.module6!=null&&vm.module6!=""){
                        Vue.set(vm.module_id,"a5",vm.module6);
                    }
                }

                if(vm.countModule==7){
                    if(!checkemail.test(vm.module1.email)){
                        alert("添加第一个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module1.jobNumber)){
                        alert("添加第一个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module2.email)){
                        alert("添加第二个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module2.jobNumber)){
                        alert("添加第二个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module3.email)){
                        alert("添加第三个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module4.email)){
                        alert("添加第四个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module4.jobNumber)){
                        alert("添加第四个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module5.email)){
                        alert("添加第五个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module5.jobNumber)){
                        alert("添加第五个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module6.email)){
                        alert("添加第六个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module6.jobNumber)){
                        alert("添加第六个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module7.email)){
                        alert("添加第七个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module7.jobNumber)){
                        alert("添加第七个用户工号格式不正确")
                        return true;
                    }
                    if(vm.module1!=null&&vm.module1!=""){
                        Vue.set(vm.module_id,"a",vm.module1);
                    }
                    if(vm.module2!=null&&vm.module2!=""){
                        Vue.set(vm.module_id,"a1",vm.module2);
                    }
                    if(vm.module3!=null&&vm.module3!=""){
                        Vue.set(vm.module_id,"a2",vm.module3);
                    }
                    if(vm.module4!=null&&vm.module4!=""){
                        Vue.set(vm.module_id,"a3",vm.module4);
                    }
                    if(vm.module5!=null&&vm.module5!=""){
                        Vue.set(vm.module_id,"a4",vm.module5);
                    }
                    if(vm.module6!=null&&vm.module6!=""){
                        Vue.set(vm.module_id,"a5",vm.module6);
                    }
                    if(vm.module7!=null&&vm.module7!=""){
                        Vue.set(vm.module_id,"a6",vm.module7);
                    }
                }

                if(vm.countModule==8){
                    if(!checkemail.test(vm.module1.email)){
                        alert("添加第一个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module1.jobNumber)){
                        alert("添加第一个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module2.email)){
                        alert("添加第二个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module2.jobNumber)){
                        alert("添加第二个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module3.email)){
                        alert("添加第三个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module4.email)){
                        alert("添加第四个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module4.jobNumber)){
                        alert("添加第四个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module5.email)){
                        alert("添加第五个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module5.jobNumber)){
                        alert("添加第五个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module6.email)){
                        alert("添加第六个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module6.jobNumber)){
                        alert("添加第六个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module7.email)){
                        alert("添加第七个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module7.jobNumber)){
                        alert("添加第七个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module8.email)){
                        alert("添加第八个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module8.jobNumber)){
                        alert("添加第八个用户工号格式不正确")
                        return true;
                    }
                    if(vm.module8!=null&&vm.module8!=""){
                        Vue.set(vm.module_id,"a7",vm.module8);
                    }
                    if(vm.module1!=null&&vm.module1!=""){
                        Vue.set(vm.module_id,"a",vm.module1);
                    }
                    if(vm.module2!=null&&vm.module2!=""){
                        Vue.set(vm.module_id,"a1",vm.module2);
                    }
                    if(vm.module3!=null&&vm.module3!=""){
                        Vue.set(vm.module_id,"a2",vm.module3);
                    }
                    if(vm.module4!=null&&vm.module4!=""){
                        Vue.set(vm.module_id,"a3",vm.module4);
                    }
                    if(vm.module5!=null&&vm.module5!=""){
                        Vue.set(vm.module_id,"a4",vm.module5);
                    }
                    if(vm.module6!=null&&vm.module6!=""){
                        Vue.set(vm.module_id,"a5",vm.module6);
                    }
                    if(vm.module7!=null&&vm.module7!=""){
                        Vue.set(vm.module_id,"a6",vm.module7);
                    }
                }

                if(vm.countModule==9){
                    if(!checkemail.test(vm.module1.email)){
                        alert("添加第一个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module1.jobNumber)){
                        alert("添加第一个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module2.email)){
                        alert("添加第二个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module2.jobNumber)){
                        alert("添加第二个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module3.email)){
                        alert("添加第三个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module4.email)){
                        alert("添加第四个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module4.jobNumber)){
                        alert("添加第四个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module5.email)){
                        alert("添加第五个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module5.jobNumber)){
                        alert("添加第五个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module6.email)){
                        alert("添加第六个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module6.jobNumber)){
                        alert("添加第六个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module7.email)){
                        alert("添加第七个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module7.jobNumber)){
                        alert("添加第七个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module8.email)){
                        alert("添加第八个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module8.jobNumber)){
                        alert("添加第八个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module9.email)){
                        alert("添加第九个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module9.jobNumber)){
                        alert("添加第九个用户工号格式不正确")
                        return true;
                    }
                    if(vm.module9!=null&&vm.module9!=""){
                        Vue.set(vm.module_id,"a8",vm.module9);
                    }
                    if(vm.module1!=null&&vm.module1!=""){
                        Vue.set(vm.module_id,"a",vm.module1);
                    }
                    if(vm.module2!=null&&vm.module2!=""){
                        Vue.set(vm.module_id,"a1",vm.module2);
                    }
                    if(vm.module3!=null&&vm.module3!=""){
                        Vue.set(vm.module_id,"a2",vm.module3);
                    }
                    if(vm.module4!=null&&vm.module4!=""){
                        Vue.set(vm.module_id,"a3",vm.module4);
                    }
                    if(vm.module5!=null&&vm.module5!=""){
                        Vue.set(vm.module_id,"a4",vm.module5);
                    }
                    if(vm.module6!=null&&vm.module6!=""){
                        Vue.set(vm.module_id,"a5",vm.module6);
                    }
                    if(vm.module7!=null&&vm.module7!=""){
                        Vue.set(vm.module_id,"a6",vm.module7);
                    }
                    if(vm.module8!=null&&vm.module8!=""){
                        Vue.set(vm.module_id,"a7",vm.module8);
                    }
                }

                if(vm.countModule==10){
                    if(!checkemail.test(vm.module1.email)){
                        alert("添加第一个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module1.jobNumber)){
                        alert("添加第一个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module2.email)){
                        alert("添加第二个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module2.jobNumber)){
                        alert("添加第二个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module3.email)){
                        alert("添加第三个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module4.email)){
                        alert("添加第四个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module4.jobNumber)){
                        alert("添加第四个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module5.email)){
                        alert("添加第五个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module5.jobNumber)){
                        alert("添加第五个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module6.email)){
                        alert("添加第六个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module6.jobNumber)){
                        alert("添加第六个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module7.email)){
                        alert("添加第七个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module7.jobNumber)){
                        alert("添加第七个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module8.email)){
                        alert("添加第八个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module8.jobNumber)){
                        alert("添加第八个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module9.email)){
                        alert("添加第九个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module9.jobNumber)){
                        alert("添加第九个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module10.email)){
                        alert("添加第十个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module10.jobNumber)){
                        alert("添加第十个用户工号格式不正确")
                        return true;
                    }
                    if(vm.module10!=null&&vm.module10!=""){
                        Vue.set(vm.module_id,"a9",vm.module10);
                    }
                    if(vm.module1!=null&&vm.module1!=""){
                        Vue.set(vm.module_id,"a",vm.module1);
                    }
                    if(vm.module2!=null&&vm.module2!=""){
                        Vue.set(vm.module_id,"a1",vm.module2);
                    }
                    if(vm.module3!=null&&vm.module3!=""){
                        Vue.set(vm.module_id,"a2",vm.module3);
                    }
                    if(vm.module4!=null&&vm.module4!=""){
                        Vue.set(vm.module_id,"a3",vm.module4);
                    }
                    if(vm.module5!=null&&vm.module5!=""){
                        Vue.set(vm.module_id,"a4",vm.module5);
                    }
                    if(vm.module6!=null&&vm.module6!=""){
                        Vue.set(vm.module_id,"a5",vm.module6);
                    }
                    if(vm.module7!=null&&vm.module7!=""){
                        Vue.set(vm.module_id,"a6",vm.module7);
                    }
                    if(vm.module8!=null&&vm.module8!=""){
                        Vue.set(vm.module_id,"a7",vm.module8);
                    }
                    if(vm.module9!=null&&vm.module9!=""){
                        Vue.set(vm.module_id,"a8",vm.module9);
                    }
                }

                if(vm.countModule==11){
                    if(!checkemail.test(vm.module1.email)){
                        alert("添加第一个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module1.jobNumber)){
                        alert("添加第一个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module2.email)){
                        alert("添加第二个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module2.jobNumber)){
                        alert("添加第二个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module3.email)){
                        alert("添加第三个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module4.email)){
                        alert("添加第四个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module4.jobNumber)){
                        alert("添加第四个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module5.email)){
                        alert("添加第五个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module5.jobNumber)){
                        alert("添加第五个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module6.email)){
                        alert("添加第六个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module6.jobNumber)){
                        alert("添加第六个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module7.email)){
                        alert("添加第七个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module7.jobNumber)){
                        alert("添加第七个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module8.email)){
                        alert("添加第八个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module8.jobNumber)){
                        alert("添加第八个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module9.email)){
                        alert("添加第九个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module9.jobNumber)){
                        alert("添加第九个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module10.email)){
                        alert("添加第十个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module10.jobNumber)){
                        alert("添加第十个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module11.email)){
                        alert("添加第十一个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module11.jobNumber)){
                        alert("添加第十一个用户工号格式不正确")
                        return true;
                    }
                    if(vm.module11!=null&&vm.module11!=""){
                        Vue.set(vm.module_id,"a10",vm.module11);
                    }
                    if(vm.module1!=null&&vm.module1!=""){
                        Vue.set(vm.module_id,"a",vm.module1);
                    }
                    if(vm.module2!=null&&vm.module2!=""){
                        Vue.set(vm.module_id,"a1",vm.module2);
                    }
                    if(vm.module3!=null&&vm.module3!=""){
                        Vue.set(vm.module_id,"a2",vm.module3);
                    }
                    if(vm.module4!=null&&vm.module4!=""){
                        Vue.set(vm.module_id,"a3",vm.module4);
                    }
                    if(vm.module5!=null&&vm.module5!=""){
                        Vue.set(vm.module_id,"a4",vm.module5);
                    }
                    if(vm.module6!=null&&vm.module6!=""){
                        Vue.set(vm.module_id,"a5",vm.module6);
                    }
                    if(vm.module7!=null&&vm.module7!=""){
                        Vue.set(vm.module_id,"a6",vm.module7);
                    }
                    if(vm.module8!=null&&vm.module8!=""){
                        Vue.set(vm.module_id,"a7",vm.module8);
                    }
                    if(vm.module9!=null&&vm.module9!=""){
                        Vue.set(vm.module_id,"a8",vm.module9);
                    }
                    if(vm.module10!=null&&vm.module10!=""){
                        Vue.set(vm.module_id,"a9",vm.module10);
                    }
                }

                if(vm.countModule==12){
                    if(!checkemail.test(vm.module1.email)){
                        alert("添加第一个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module1.jobNumber)){
                        alert("添加第一个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module2.email)){
                        alert("添加第二个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module2.jobNumber)){
                        alert("添加第二个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module3.email)){
                        alert("添加第三个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module4.email)){
                        alert("添加第四个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module4.jobNumber)){
                        alert("添加第四个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module5.email)){
                        alert("添加第五个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module5.jobNumber)){
                        alert("添加第五个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module6.email)){
                        alert("添加第六个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module6.jobNumber)){
                        alert("添加第六个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module7.email)){
                        alert("添加第七个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module7.jobNumber)){
                        alert("添加第七个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module8.email)){
                        alert("添加第八个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module8.jobNumber)){
                        alert("添加第八个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module9.email)){
                        alert("添加第九个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module9.jobNumber)){
                        alert("添加第九个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module10.email)){
                        alert("添加第十个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module10.jobNumber)){
                        alert("添加第十个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module11.email)){
                        alert("添加第十一个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module11.jobNumber)){
                        alert("添加第十一个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module12.email)){
                        alert("添加第十二个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module12.jobNumber)){
                        alert("添加第十二个用户工号格式不正确")
                        return true;
                    }
                    if(vm.module11!=null&&vm.module11!=""){
                        Vue.set(vm.module_id,"a10",vm.module11);
                    }
                    if(vm.module12!=null&&vm.module12!=""){
                        Vue.set(vm.module_id,"a11",vm.module12);
                    }
                    if(vm.module1!=null&&vm.module1!=""){
                        Vue.set(vm.module_id,"a",vm.module1);
                    }
                    if(vm.module2!=null&&vm.module2!=""){
                        Vue.set(vm.module_id,"a1",vm.module2);
                    }
                    if(vm.module3!=null&&vm.module3!=""){
                        Vue.set(vm.module_id,"a2",vm.module3);
                    }
                    if(vm.module4!=null&&vm.module4!=""){
                        Vue.set(vm.module_id,"a3",vm.module4);
                    }
                    if(vm.module5!=null&&vm.module5!=""){
                        Vue.set(vm.module_id,"a4",vm.module5);
                    }
                    if(vm.module6!=null&&vm.module6!=""){
                        Vue.set(vm.module_id,"a5",vm.module6);
                    }
                    if(vm.module7!=null&&vm.module7!=""){
                        Vue.set(vm.module_id,"a6",vm.module7);
                    }
                    if(vm.module8!=null&&vm.module8!=""){
                        Vue.set(vm.module_id,"a7",vm.module8);
                    }
                    if(vm.module9!=null&&vm.module9!=""){
                        Vue.set(vm.module_id,"a8",vm.module9);
                    }
                    if(vm.module10!=null&&vm.module10!=""){
                        Vue.set(vm.module_id,"a9",vm.module10);
                    }
                }

                if(vm.countModule==13){
                    if(!checkemail.test(vm.module1.email)){
                        alert("添加第一个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module1.jobNumber)){
                        alert("添加第一个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module2.email)){
                        alert("添加第二个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module2.jobNumber)){
                        alert("添加第二个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module3.email)){
                        alert("添加第三个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module4.email)){
                        alert("添加第四个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module4.jobNumber)){
                        alert("添加第四个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module5.email)){
                        alert("添加第五个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module5.jobNumber)){
                        alert("添加第五个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module6.email)){
                        alert("添加第六个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module6.jobNumber)){
                        alert("添加第六个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module7.email)){
                        alert("添加第七个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module7.jobNumber)){
                        alert("添加第七个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module8.email)){
                        alert("添加第八个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module8.jobNumber)){
                        alert("添加第八个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module9.email)){
                        alert("添加第九个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module9.jobNumber)){
                        alert("添加第九个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module10.email)){
                        alert("添加第十个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module10.jobNumber)){
                        alert("添加第十个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module11.email)){
                        alert("添加第十一个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module11.jobNumber)){
                        alert("添加第十一个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module12.email)){
                        alert("添加第十二个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module12.jobNumber)){
                        alert("添加第十二个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module13.email)){
                        alert("添加第十三个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module13.jobNumber)){
                        alert("添加第十三个用户工号格式不正确")
                        return true;
                    }
                    if(vm.module11!=null&&vm.module11!=""){
                        Vue.set(vm.module_id,"a10",vm.module11);
                    }
                    if(vm.module12!=null&&vm.module12!=""){
                        Vue.set(vm.module_id,"a11",vm.module12);
                    }
                    if(vm.module13!=null&&vm.module13!=""){
                        Vue.set(vm.module_id,"a12",vm.module13);
                    }
                    if(vm.module1!=null&&vm.module1!=""){
                        Vue.set(vm.module_id,"a",vm.module1);
                    }
                    if(vm.module2!=null&&vm.module2!=""){
                        Vue.set(vm.module_id,"a1",vm.module2);
                    }
                    if(vm.module3!=null&&vm.module3!=""){
                        Vue.set(vm.module_id,"a2",vm.module3);
                    }
                    if(vm.module4!=null&&vm.module4!=""){
                        Vue.set(vm.module_id,"a3",vm.module4);
                    }
                    if(vm.module5!=null&&vm.module5!=""){
                        Vue.set(vm.module_id,"a4",vm.module5);
                    }
                    if(vm.module6!=null&&vm.module6!=""){
                        Vue.set(vm.module_id,"a5",vm.module6);
                    }
                    if(vm.module7!=null&&vm.module7!=""){
                        Vue.set(vm.module_id,"a6",vm.module7);
                    }
                    if(vm.module8!=null&&vm.module8!=""){
                        Vue.set(vm.module_id,"a7",vm.module8);
                    }
                    if(vm.module9!=null&&vm.module9!=""){
                        Vue.set(vm.module_id,"a8",vm.module9);
                    }
                    if(vm.module10!=null&&vm.module10!=""){
                        Vue.set(vm.module_id,"a9",vm.module10);
                    }
                }

                if(vm.countModule==14){
                    if(!checkemail.test(vm.module1.email)){
                        alert("添加第一个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module1.jobNumber)){
                        alert("添加第一个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module2.email)){
                        alert("添加第二个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module2.jobNumber)){
                        alert("添加第二个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module3.email)){
                        alert("添加第三个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module4.email)){
                        alert("添加第四个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module4.jobNumber)){
                        alert("添加第四个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module5.email)){
                        alert("添加第五个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module5.jobNumber)){
                        alert("添加第五个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module6.email)){
                        alert("添加第六个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module6.jobNumber)){
                        alert("添加第六个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module7.email)){
                        alert("添加第七个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module7.jobNumber)){
                        alert("添加第七个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module8.email)){
                        alert("添加第八个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module8.jobNumber)){
                        alert("添加第八个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module9.email)){
                        alert("添加第九个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module9.jobNumber)){
                        alert("添加第九个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module10.email)){
                        alert("添加第十个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module10.jobNumber)){
                        alert("添加第十个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module11.email)){
                        alert("添加第十一个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module11.jobNumber)){
                        alert("添加第十一个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module12.email)){
                        alert("添加第十二个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module12.jobNumber)){
                        alert("添加第十二个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module13.email)){
                        alert("添加第十三个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module13.jobNumber)){
                        alert("添加第十三个用户工号格式不正确")
                        return true;
                    }if(!checkemail.test(vm.module14.email)){
                        alert("添加第十四个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module14.jobNumber)){
                        alert("添加第十四个用户工号格式不正确")
                        return true;
                    }
                    if(vm.module11!=null&&vm.module11!=""){
                        Vue.set(vm.module_id,"a10",vm.module11);
                    }
                    if(vm.module12!=null&&vm.module12!=""){
                        Vue.set(vm.module_id,"a11",vm.module12);
                    }
                    if(vm.module13!=null&&vm.module13!=""){
                        Vue.set(vm.module_id,"a12",vm.module13);
                    }
                    if(vm.module14!=null&&vm.module14!=""){
                        Vue.set(vm.module_id,"a13",vm.module14);
                    }
                    if(vm.module1!=null&&vm.module1!=""){
                        Vue.set(vm.module_id,"a",vm.module1);
                    }
                    if(vm.module2!=null&&vm.module2!=""){
                        Vue.set(vm.module_id,"a1",vm.module2);
                    }
                    if(vm.module3!=null&&vm.module3!=""){
                        Vue.set(vm.module_id,"a2",vm.module3);
                    }
                    if(vm.module4!=null&&vm.module4!=""){
                        Vue.set(vm.module_id,"a3",vm.module4);
                    }
                    if(vm.module5!=null&&vm.module5!=""){
                        Vue.set(vm.module_id,"a4",vm.module5);
                    }
                    if(vm.module6!=null&&vm.module6!=""){
                        Vue.set(vm.module_id,"a5",vm.module6);
                    }
                    if(vm.module7!=null&&vm.module7!=""){
                        Vue.set(vm.module_id,"a6",vm.module7);
                    }
                    if(vm.module8!=null&&vm.module8!=""){
                        Vue.set(vm.module_id,"a7",vm.module8);
                    }
                    if(vm.module9!=null&&vm.module9!=""){
                        Vue.set(vm.module_id,"a8",vm.module9);
                    }
                    if(vm.module10!=null&&vm.module10!=""){
                        Vue.set(vm.module_id,"a9",vm.module10);
                    }
                }

                if(vm.countModule==15){
                    if(!checkemail.test(vm.module1.email)){
                        alert("添加第一个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module1.jobNumber)){
                        alert("添加第一个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module2.email)){
                        alert("添加第二个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module2.jobNumber)){
                        alert("添加第二个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module3.email)){
                        alert("添加第三个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module4.email)){
                        alert("添加第四个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module4.jobNumber)){
                        alert("添加第四个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module5.email)){
                        alert("添加第五个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module5.jobNumber)){
                        alert("添加第五个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module6.email)){
                        alert("添加第六个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module6.jobNumber)){
                        alert("添加第六个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module7.email)){
                        alert("添加第七个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module7.jobNumber)){
                        alert("添加第七个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module8.email)){
                        alert("添加第八个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module8.jobNumber)){
                        alert("添加第八个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module9.email)){
                        alert("添加第九个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module9.jobNumber)){
                        alert("添加第九个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module10.email)){
                        alert("添加第十个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module10.jobNumber)){
                        alert("添加第十个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module11.email)){
                        alert("添加第十一个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module11.jobNumber)){
                        alert("添加第十一个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module12.email)){
                        alert("添加第十二个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module12.jobNumber)){
                        alert("添加第十二个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module13.email)){
                        alert("添加第十三个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module13.jobNumber)){
                        alert("添加第十三个用户工号格式不正确")
                        return true;
                    }if(!checkemail.test(vm.module14.email)){
                        alert("添加第十四个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module14.jobNumber)){
                        alert("添加第十四个用户工号格式不正确")
                        return true;
                    }if(!checkemail.test(vm.module15.email)){
                        alert("添加第十五个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module15.jobNumber)){
                        alert("添加第十五个用户工号格式不正确")
                        return true;
                    }
                    if(vm.module11!=null&&vm.module11!=""){
                        Vue.set(vm.module_id,"a10",vm.module11);
                    }
                    if(vm.module12!=null&&vm.module12!=""){
                        Vue.set(vm.module_id,"a11",vm.module12);
                    }
                    if(vm.module13!=null&&vm.module13!=""){
                        Vue.set(vm.module_id,"a12",vm.module13);
                    }
                    if(vm.module14!=null&&vm.module14!=""){
                        Vue.set(vm.module_id,"a13",vm.module14);
                    }
                    if(vm.module15!=null&&vm.module15!=""){
                        Vue.set(vm.module_id,"a14",vm.module15);
                    }
                    if(vm.module1!=null&&vm.module1!=""){
                        Vue.set(vm.module_id,"a",vm.module1);
                    }
                    if(vm.module2!=null&&vm.module2!=""){
                        Vue.set(vm.module_id,"a1",vm.module2);
                    }
                    if(vm.module3!=null&&vm.module3!=""){
                        Vue.set(vm.module_id,"a2",vm.module3);
                    }
                    if(vm.module4!=null&&vm.module4!=""){
                        Vue.set(vm.module_id,"a3",vm.module4);
                    }
                    if(vm.module5!=null&&vm.module5!=""){
                        Vue.set(vm.module_id,"a4",vm.module5);
                    }
                    if(vm.module6!=null&&vm.module6!=""){
                        Vue.set(vm.module_id,"a5",vm.module6);
                    }
                    if(vm.module7!=null&&vm.module7!=""){
                        Vue.set(vm.module_id,"a6",vm.module7);
                    }
                    if(vm.module8!=null&&vm.module8!=""){
                        Vue.set(vm.module_id,"a7",vm.module8);
                    }
                    if(vm.module9!=null&&vm.module9!=""){
                        Vue.set(vm.module_id,"a8",vm.module9);
                    }
                    if(vm.module10!=null&&vm.module10!=""){
                        Vue.set(vm.module_id,"a9",vm.module10);
                    }
                }

                if(vm.countModule==16){
                    if(!checkemail.test(vm.module1.email)){
                        alert("添加第一个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module1.jobNumber)){
                        alert("添加第一个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module2.email)){
                        alert("添加第二个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module2.jobNumber)){
                        alert("添加第二个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module3.email)){
                        alert("添加第三个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module4.email)){
                        alert("添加第四个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module4.jobNumber)){
                        alert("添加第四个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module5.email)){
                        alert("添加第五个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module5.jobNumber)){
                        alert("添加第五个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module6.email)){
                        alert("添加第六个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module6.jobNumber)){
                        alert("添加第六个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module7.email)){
                        alert("添加第七个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module7.jobNumber)){
                        alert("添加第七个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module8.email)){
                        alert("添加第八个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module8.jobNumber)){
                        alert("添加第八个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module9.email)){
                        alert("添加第九个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module9.jobNumber)){
                        alert("添加第九个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module10.email)){
                        alert("添加第十个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module10.jobNumber)){
                        alert("添加第十个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module11.email)){
                        alert("添加第十一个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module11.jobNumber)){
                        alert("添加第十一个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module12.email)){
                        alert("添加第十二个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module12.jobNumber)){
                        alert("添加第十二个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module13.email)){
                        alert("添加第十三个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module13.jobNumber)){
                        alert("添加第十三个用户工号格式不正确")
                        return true;
                    }if(!checkemail.test(vm.module14.email)){
                        alert("添加第十四个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module14.jobNumber)){
                        alert("添加第十四个用户工号格式不正确")
                        return true;
                    }if(!checkemail.test(vm.module15.email)){
                        alert("添加第十五个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module15.jobNumber)){
                        alert("添加第十五个用户工号格式不正确")
                        return true;
                    }if(!checkemail.test(vm.module16.email)){
                        alert("添加第十六个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module16.jobNumber)){
                        alert("添加第十六个用户工号格式不正确")
                        return true;
                    }
                    if(vm.module11!=null&&vm.module11!=""){
                        Vue.set(vm.module_id,"a10",vm.module11);
                    }
                    if(vm.module12!=null&&vm.module12!=""){
                        Vue.set(vm.module_id,"a11",vm.module12);
                    }
                    if(vm.module13!=null&&vm.module13!=""){
                        Vue.set(vm.module_id,"a12",vm.module13);
                    }
                    if(vm.module14!=null&&vm.module14!=""){
                        Vue.set(vm.module_id,"a13",vm.module14);
                    }
                    if(vm.module15!=null&&vm.module15!=""){
                        Vue.set(vm.module_id,"a14",vm.module15);
                    }
                    if(vm.module16!=null&&vm.module16!=""){
                        Vue.set(vm.module_id,"a15",vm.module16);
                    }
                    if(vm.module1!=null&&vm.module1!=""){
                        Vue.set(vm.module_id,"a",vm.module1);
                    }
                    if(vm.module2!=null&&vm.module2!=""){
                        Vue.set(vm.module_id,"a1",vm.module2);
                    }
                    if(vm.module3!=null&&vm.module3!=""){
                        Vue.set(vm.module_id,"a2",vm.module3);
                    }
                    if(vm.module4!=null&&vm.module4!=""){
                        Vue.set(vm.module_id,"a3",vm.module4);
                    }
                    if(vm.module5!=null&&vm.module5!=""){
                        Vue.set(vm.module_id,"a4",vm.module5);
                    }
                    if(vm.module6!=null&&vm.module6!=""){
                        Vue.set(vm.module_id,"a5",vm.module6);
                    }
                    if(vm.module7!=null&&vm.module7!=""){
                        Vue.set(vm.module_id,"a6",vm.module7);
                    }
                    if(vm.module8!=null&&vm.module8!=""){
                        Vue.set(vm.module_id,"a7",vm.module8);
                    }
                    if(vm.module9!=null&&vm.module9!=""){
                        Vue.set(vm.module_id,"a8",vm.module9);
                    }
                    if(vm.module10!=null&&vm.module10!=""){
                        Vue.set(vm.module_id,"a9",vm.module10);
                    }
                }

                if(vm.countModule==17){
                    if(!checkemail.test(vm.module1.email)){
                        alert("添加第一个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module1.jobNumber)){
                        alert("添加第一个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module2.email)){
                        alert("添加第二个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module2.jobNumber)){
                        alert("添加第二个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module3.email)){
                        alert("添加第三个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module4.email)){
                        alert("添加第四个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module4.jobNumber)){
                        alert("添加第四个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module5.email)){
                        alert("添加第五个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module5.jobNumber)){
                        alert("添加第五个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module6.email)){
                        alert("添加第六个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module6.jobNumber)){
                        alert("添加第六个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module7.email)){
                        alert("添加第七个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module7.jobNumber)){
                        alert("添加第七个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module8.email)){
                        alert("添加第八个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module8.jobNumber)){
                        alert("添加第八个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module9.email)){
                        alert("添加第九个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module9.jobNumber)){
                        alert("添加第九个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module10.email)){
                        alert("添加第十个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module10.jobNumber)){
                        alert("添加第十个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module11.email)){
                        alert("添加第十一个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module11.jobNumber)){
                        alert("添加第十一个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module12.email)){
                        alert("添加第十二个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module12.jobNumber)){
                        alert("添加第十二个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module13.email)){
                        alert("添加第十三个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module13.jobNumber)){
                        alert("添加第十三个用户工号格式不正确")
                        return true;
                    }if(!checkemail.test(vm.module14.email)){
                        alert("添加第十四个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module14.jobNumber)){
                        alert("添加第十四个用户工号格式不正确")
                        return true;
                    }if(!checkemail.test(vm.module15.email)){
                        alert("添加第十五个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module15.jobNumber)){
                        alert("添加第十五个用户工号格式不正确")
                        return true;
                    }if(!checkemail.test(vm.module16.email)){
                        alert("添加第十六个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module16.jobNumber)){
                        alert("添加第十六个用户工号格式不正确")
                        return true;
                    }if(!checkemail.test(vm.module17.email)){
                        alert("添加第十七个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module17.jobNumber)){
                        alert("添加第十七个用户工号格式不正确")
                        return true;
                    }
                    if(vm.module11!=null&&vm.module11!=""){
                        Vue.set(vm.module_id,"a10",vm.module11);
                    }
                    if(vm.module12!=null&&vm.module12!=""){
                        Vue.set(vm.module_id,"a11",vm.module12);
                    }
                    if(vm.module13!=null&&vm.module13!=""){
                        Vue.set(vm.module_id,"a12",vm.module13);
                    }
                    if(vm.module14!=null&&vm.module14!=""){
                        Vue.set(vm.module_id,"a13",vm.module14);
                    }
                    if(vm.module15!=null&&vm.module15!=""){
                        Vue.set(vm.module_id,"a14",vm.module15);
                    }
                    if(vm.module16!=null&&vm.module16!=""){
                        Vue.set(vm.module_id,"a15",vm.module16);
                    }
                    if(vm.module17!=null&&vm.module17!=""){
                        Vue.set(vm.module_id,"a16",vm.module17);
                    }
                    if(vm.module1!=null&&vm.module1!=""){
                        Vue.set(vm.module_id,"a",vm.module1);
                    }
                    if(vm.module2!=null&&vm.module2!=""){
                        Vue.set(vm.module_id,"a1",vm.module2);
                    }
                    if(vm.module3!=null&&vm.module3!=""){
                        Vue.set(vm.module_id,"a2",vm.module3);
                    }
                    if(vm.module4!=null&&vm.module4!=""){
                        Vue.set(vm.module_id,"a3",vm.module4);
                    }
                    if(vm.module5!=null&&vm.module5!=""){
                        Vue.set(vm.module_id,"a4",vm.module5);
                    }
                    if(vm.module6!=null&&vm.module6!=""){
                        Vue.set(vm.module_id,"a5",vm.module6);
                    }
                    if(vm.module7!=null&&vm.module7!=""){
                        Vue.set(vm.module_id,"a6",vm.module7);
                    }
                    if(vm.module8!=null&&vm.module8!=""){
                        Vue.set(vm.module_id,"a7",vm.module8);
                    }
                    if(vm.module9!=null&&vm.module9!=""){
                        Vue.set(vm.module_id,"a8",vm.module9);
                    }
                    if(vm.module10!=null&&vm.module10!=""){
                        Vue.set(vm.module_id,"a9",vm.module10);
                    }
                }

                if(vm.countModule==18){
                    if(!checkemail.test(vm.module1.email)){
                        alert("添加第一个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module1.jobNumber)){
                        alert("添加第一个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module2.email)){
                        alert("添加第二个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module2.jobNumber)){
                        alert("添加第二个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module3.email)){
                        alert("添加第三个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module4.email)){
                        alert("添加第四个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module4.jobNumber)){
                        alert("添加第四个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module5.email)){
                        alert("添加第五个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module5.jobNumber)){
                        alert("添加第五个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module6.email)){
                        alert("添加第六个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module6.jobNumber)){
                        alert("添加第六个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module7.email)){
                        alert("添加第七个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module7.jobNumber)){
                        alert("添加第七个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module8.email)){
                        alert("添加第八个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module8.jobNumber)){
                        alert("添加第八个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module9.email)){
                        alert("添加第九个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module9.jobNumber)){
                        alert("添加第九个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module10.email)){
                        alert("添加第十个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module10.jobNumber)){
                        alert("添加第十个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module11.email)){
                        alert("添加第十一个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module11.jobNumber)){
                        alert("添加第十一个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module12.email)){
                        alert("添加第十二个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module12.jobNumber)){
                        alert("添加第十二个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module13.email)){
                        alert("添加第十三个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module13.jobNumber)){
                        alert("添加第十三个用户工号格式不正确")
                        return true;
                    }if(!checkemail.test(vm.module14.email)){
                        alert("添加第十四个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module14.jobNumber)){
                        alert("添加第十四个用户工号格式不正确")
                        return true;
                    }if(!checkemail.test(vm.module15.email)){
                        alert("添加第十五个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module15.jobNumber)){
                        alert("添加第十五个用户工号格式不正确")
                        return true;
                    }if(!checkemail.test(vm.module16.email)){
                        alert("添加第十六个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module16.jobNumber)){
                        alert("添加第十六个用户工号格式不正确")
                        return true;
                    }if(!checkemail.test(vm.module17.email)){
                        alert("添加第十七个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module17.jobNumber)){
                        alert("添加第十七个用户工号格式不正确")
                        return true;
                    }if(!checkemail.test(vm.module18.email)){
                        alert("添加第十八个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module18.jobNumber)){
                        alert("添加第十八个用户工号格式不正确")
                        return true;
                    }
                    if(vm.module11!=null&&vm.module11!=""){
                        Vue.set(vm.module_id,"a10",vm.module11);
                    }
                    if(vm.module12!=null&&vm.module12!=""){
                        Vue.set(vm.module_id,"a11",vm.module12);
                    }
                    if(vm.module13!=null&&vm.module13!=""){
                        Vue.set(vm.module_id,"a12",vm.module13);
                    }
                    if(vm.module14!=null&&vm.module14!=""){
                        Vue.set(vm.module_id,"a13",vm.module14);
                    }
                    if(vm.module15!=null&&vm.module15!=""){
                        Vue.set(vm.module_id,"a14",vm.module15);
                    }
                    if(vm.module16!=null&&vm.module16!=""){
                        Vue.set(vm.module_id,"a15",vm.module16);
                    }
                    if(vm.module17!=null&&vm.module17!=""){
                        Vue.set(vm.module_id,"a16",vm.module17);
                    }
                    if(vm.module18!=null&&vm.module18!=""){
                        Vue.set(vm.module_id,"a17",vm.module18);
                    }
                    if(vm.module1!=null&&vm.module1!=""){
                        Vue.set(vm.module_id,"a",vm.module1);
                    }
                    if(vm.module2!=null&&vm.module2!=""){
                        Vue.set(vm.module_id,"a1",vm.module2);
                    }
                    if(vm.module3!=null&&vm.module3!=""){
                        Vue.set(vm.module_id,"a2",vm.module3);
                    }
                    if(vm.module4!=null&&vm.module4!=""){
                        Vue.set(vm.module_id,"a3",vm.module4);
                    }
                    if(vm.module5!=null&&vm.module5!=""){
                        Vue.set(vm.module_id,"a4",vm.module5);
                    }
                    if(vm.module6!=null&&vm.module6!=""){
                        Vue.set(vm.module_id,"a5",vm.module6);
                    }
                    if(vm.module7!=null&&vm.module7!=""){
                        Vue.set(vm.module_id,"a6",vm.module7);
                    }
                    if(vm.module8!=null&&vm.module8!=""){
                        Vue.set(vm.module_id,"a7",vm.module8);
                    }
                    if(vm.module9!=null&&vm.module9!=""){
                        Vue.set(vm.module_id,"a8",vm.module9);
                    }
                    if(vm.module10!=null&&vm.module10!=""){
                        Vue.set(vm.module_id,"a9",vm.module10);
                    }
                }

                if(vm.countModule==19){
                    if(!checkemail.test(vm.module1.email)){
                        alert("添加第一个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module1.jobNumber)){
                        alert("添加第一个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module2.email)){
                        alert("添加第二个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module2.jobNumber)){
                        alert("添加第二个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module3.email)){
                        alert("添加第三个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module4.email)){
                        alert("添加第四个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module4.jobNumber)){
                        alert("添加第四个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module5.email)){
                        alert("添加第五个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module5.jobNumber)){
                        alert("添加第五个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module6.email)){
                        alert("添加第六个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module6.jobNumber)){
                        alert("添加第六个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module7.email)){
                        alert("添加第七个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module7.jobNumber)){
                        alert("添加第七个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module8.email)){
                        alert("添加第八个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module8.jobNumber)){
                        alert("添加第八个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module9.email)){
                        alert("添加第九个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module9.jobNumber)){
                        alert("添加第九个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module10.email)){
                        alert("添加第十个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module10.jobNumber)){
                        alert("添加第十个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module11.email)){
                        alert("添加第十一个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module11.jobNumber)){
                        alert("添加第十一个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module12.email)){
                        alert("添加第十二个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module12.jobNumber)){
                        alert("添加第十二个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module13.email)){
                        alert("添加第十三个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module13.jobNumber)){
                        alert("添加第十三个用户工号格式不正确")
                        return true;
                    }if(!checkemail.test(vm.module14.email)){
                        alert("添加第十四个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module14.jobNumber)){
                        alert("添加第十四个用户工号格式不正确")
                        return true;
                    }if(!checkemail.test(vm.module15.email)){
                        alert("添加第十五个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module15.jobNumber)){
                        alert("添加第十五个用户工号格式不正确")
                        return true;
                    }if(!checkemail.test(vm.module16.email)){
                        alert("添加第十六个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module16.jobNumber)){
                        alert("添加第十六个用户工号格式不正确")
                        return true;
                    }if(!checkemail.test(vm.module17.email)){
                        alert("添加第十七个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module17.jobNumber)){
                        alert("添加第十七个用户工号格式不正确")
                        return true;
                    }if(!checkemail.test(vm.module18.email)){
                        alert("添加第十八个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module18.jobNumber)){
                        alert("添加第十八个用户工号格式不正确")
                        return true;
                    }if(!checkemail.test(vm.module19.email)){
                        alert("添加第十九个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module19.jobNumber)){
                        alert("添加第十九个用户工号格式不正确")
                        return true;
                    }
                    if(vm.module11!=null&&vm.module11!=""){
                        Vue.set(vm.module_id,"a10",vm.module11);
                    }
                    if(vm.module12!=null&&vm.module12!=""){
                        Vue.set(vm.module_id,"a11",vm.module12);
                    }
                    if(vm.module13!=null&&vm.module13!=""){
                        Vue.set(vm.module_id,"a12",vm.module13);
                    }
                    if(vm.module14!=null&&vm.module14!=""){
                        Vue.set(vm.module_id,"a13",vm.module14);
                    }
                    if(vm.module15!=null&&vm.module15!=""){
                        Vue.set(vm.module_id,"a14",vm.module15);
                    }
                    if(vm.module16!=null&&vm.module16!=""){
                        Vue.set(vm.module_id,"a15",vm.module16);
                    }
                    if(vm.module17!=null&&vm.module17!=""){
                        Vue.set(vm.module_id,"a16",vm.module17);
                    }
                    if(vm.module18!=null&&vm.module18!=""){
                        Vue.set(vm.module_id,"a17",vm.module18);
                    }
                    if(vm.module19!=null&&vm.module19!=""){
                        Vue.set(vm.module_id,"a18",vm.module19);
                    }
                    if(vm.module1!=null&&vm.module1!=""){
                        Vue.set(vm.module_id,"a",vm.module1);
                    }
                    if(vm.module2!=null&&vm.module2!=""){
                        Vue.set(vm.module_id,"a1",vm.module2);
                    }
                    if(vm.module3!=null&&vm.module3!=""){
                        Vue.set(vm.module_id,"a2",vm.module3);
                    }
                    if(vm.module4!=null&&vm.module4!=""){
                        Vue.set(vm.module_id,"a3",vm.module4);
                    }
                    if(vm.module5!=null&&vm.module5!=""){
                        Vue.set(vm.module_id,"a4",vm.module5);
                    }
                    if(vm.module6!=null&&vm.module6!=""){
                        Vue.set(vm.module_id,"a5",vm.module6);
                    }
                    if(vm.module7!=null&&vm.module7!=""){
                        Vue.set(vm.module_id,"a6",vm.module7);
                    }
                    if(vm.module8!=null&&vm.module8!=""){
                        Vue.set(vm.module_id,"a7",vm.module8);
                    }
                    if(vm.module9!=null&&vm.module9!=""){
                        Vue.set(vm.module_id,"a8",vm.module9);
                    }
                    if(vm.module10!=null&&vm.module10!=""){
                        Vue.set(vm.module_id,"a9",vm.module10);
                    }
                }

                if(vm.countModule==20){
                    if(!checkemail.test(vm.module1.email)){
                        alert("添加第一个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module1.jobNumber)){
                        alert("添加第一个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module2.email)){
                        alert("添加第二个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module2.jobNumber)){
                        alert("添加第二个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module3.email)){
                        alert("添加第三个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module4.email)){
                        alert("添加第四个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module4.jobNumber)){
                        alert("添加第四个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module5.email)){
                        alert("添加第五个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module5.jobNumber)){
                        alert("添加第五个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module6.email)){
                        alert("添加第六个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module6.jobNumber)){
                        alert("添加第六个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module7.email)){
                        alert("添加第七个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module7.jobNumber)){
                        alert("添加第七个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module8.email)){
                        alert("添加第八个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module8.jobNumber)){
                        alert("添加第八个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module9.email)){
                        alert("添加第九个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module9.jobNumber)){
                        alert("添加第九个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module10.email)){
                        alert("添加第十个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module10.jobNumber)){
                        alert("添加第十个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module11.email)){
                        alert("添加第十一个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module11.jobNumber)){
                        alert("添加第十一个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module12.email)){
                        alert("添加第十二个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module12.jobNumber)){
                        alert("添加第十二个用户工号格式不正确")
                        return true;
                    }
                    if(!checkemail.test(vm.module13.email)){
                        alert("添加第十三个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module13.jobNumber)){
                        alert("添加第十三个用户工号格式不正确")
                        return true;
                    }if(!checkemail.test(vm.module14.email)){
                        alert("添加第十四个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module14.jobNumber)){
                        alert("添加第十四个用户工号格式不正确")
                        return true;
                    }if(!checkemail.test(vm.module15.email)){
                        alert("添加第十五个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module15.jobNumber)){
                        alert("添加第十五个用户工号格式不正确")
                        return true;
                    }if(!checkemail.test(vm.module16.email)){
                        alert("添加第十六个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module16.jobNumber)){
                        alert("添加第十六个用户工号格式不正确")
                        return true;
                    }if(!checkemail.test(vm.module17.email)){
                        alert("添加第十七个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module17.jobNumber)){
                        alert("添加第十七个用户工号格式不正确")
                        return true;
                    }if(!checkemail.test(vm.module18.email)){
                        alert("添加第十八个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module18.jobNumber)){
                        alert("添加第十八个用户工号格式不正确")
                        return true;
                    }if(!checkemail.test(vm.module19.email)){
                        alert("添加第十九个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module19.jobNumber)){
                        alert("添加第十九个用户工号格式不正确")
                        return true;
                    }if(!checkemail.test(vm.module20.email)){
                        alert("添加第二十个用户邮箱格式不正确")
                        return true;
                    }
                    if(!checkjobNumber.test(vm.module20.jobNumber)){
                        alert("添加第二十个用户工号格式不正确")
                        return true;
                    }
                    if(vm.module11!=null&&vm.module11!=""){
                        Vue.set(vm.module_id,"a10",vm.module11);
                    }
                    if(vm.module12!=null&&vm.module12!=""){
                        Vue.set(vm.module_id,"a11",vm.module12);
                    }
                    if(vm.module13!=null&&vm.module13!=""){
                        Vue.set(vm.module_id,"a12",vm.module13);
                    }
                    if(vm.module14!=null&&vm.module14!=""){
                        Vue.set(vm.module_id,"a13",vm.module14);
                    }
                    if(vm.module15!=null&&vm.module15!=""){
                        Vue.set(vm.module_id,"a14",vm.module15);
                    }
                    if(vm.module16!=null&&vm.module16!=""){
                        Vue.set(vm.module_id,"a15",vm.module16);
                    }
                    if(vm.module17!=null&&vm.module17!=""){
                        Vue.set(vm.module_id,"a16",vm.module17);
                    }
                    if(vm.module18!=null&&vm.module18!=""){
                        Vue.set(vm.module_id,"a17",vm.module18);
                    }
                    if(vm.module19!=null&&vm.module19!=""){
                        Vue.set(vm.module_id,"a18",vm.module19);
                    }
                    if(vm.module20!=null&&vm.module20!=""){
                        Vue.set(vm.module_id,"a19",vm.module20);
                    }
                    if(vm.module1!=null&&vm.module1!=""){
                        Vue.set(vm.module_id,"a",vm.module1);
                    }
                    if(vm.module2!=null&&vm.module2!=""){
                        Vue.set(vm.module_id,"a1",vm.module2);
                    }
                    if(vm.module3!=null&&vm.module3!=""){
                        Vue.set(vm.module_id,"a2",vm.module3);
                    }
                    if(vm.module4!=null&&vm.module4!=""){
                        Vue.set(vm.module_id,"a3",vm.module4);
                    }
                    if(vm.module5!=null&&vm.module5!=""){
                        Vue.set(vm.module_id,"a4",vm.module5);
                    }
                    if(vm.module6!=null&&vm.module6!=""){
                        Vue.set(vm.module_id,"a5",vm.module6);
                    }
                    if(vm.module7!=null&&vm.module7!=""){
                        Vue.set(vm.module_id,"a6",vm.module7);
                    }
                    if(vm.module8!=null&&vm.module8!=""){
                        Vue.set(vm.module_id,"a7",vm.module8);
                    }
                    if(vm.module9!=null&&vm.module9!=""){
                        Vue.set(vm.module_id,"a8",vm.module9);
                    }
                    if(vm.module10!=null&&vm.module10!=""){
                        Vue.set(vm.module_id,"a9",vm.module10);
                    }
                }
                vm.alarmGroup.parentId=vm.itemID;
                vm.alarmGroup.moduleId=vm.module_id;

            }else{
                url="alarmgroup/update";
                // vm.alarmGroup.parentId=vm.items;
                vm.alarmGroup.name=vm.nameu;
                vm.alarmGroup.groupName=vm.groupNameu;
                vm.alarmGroup.email=vm.emailu;
                vm.alarmGroup.jobNumber=vm.jobNumberu;
            }
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                // dataType:"json",
                data: JSON.stringify(vm.alarmGroup),
                // data: {table:vm.table,monitorType:vm.monitorType},
                success: function(r){
                    if(r.code === 0){
                        alert('操作成功', function(){
                            vm.reload();
                        });
                    }else{
                        alert(r.msg);
                    }
                }
            });
        },
        reload: function (event) {
            vm.showList = true;
            vm.showInsert=false;
            vm.showUpdate=false;
            var page = $("#jqGrid").jqGrid('getGridParam', 'page');
            $("#jqGrid").jqGrid('setGridParam', {
                postData: {"module_name": vm.module_name,"itemID":vm.itemID},
                page: page
            }).trigger("reloadGrid");
        },
        validator: function() {
           var items=document.getElementById("selects").value;
            if(items==-1){
                alert("请先选择项目名");
                return true;
            }
            if(vm.module_id.length==0){
                alert("添加人员不能为空")
                return true;
            }
        },
        checksModule:function () {
            if(vm.countModule>20){
                vm.countModule=vm.countModule-1;
                alert("每次最多同时添加20组数据")
                return true;
            }
        },
    }
});

function update(obj) {
    vm.showInsert=false;
    vm.showList=false;
    vm.showUpdate=true;
    vm.itemu=vm.itemID;
    var alarmid=obj;
    var parentId=vm.itemID;
    $.get(baseURL + "alarmgroup/queryAlarmGroupById/"+alarmid, function(r) {
        vm.title = "修改";
        //把后台的值赋给前端页面
        vm.alarmGroup=r.alarmGroup;
        vm.groupNameu=vm.alarmGroup.groupName;
        vm.nameu=vm.alarmGroup.name;
        vm.emailu=vm.alarmGroup.email;
        vm.jobNumberu=vm.alarmGroup.jobNumber;
    })
    $.getJSON(baseURL + "alarmgroup/queryAllGroupName/"+parentId, function(r){
        vm.modulemu=r.moduleName;
    });
}
function insert(obj) {
    // $("#jqGrid").jqGrid("saveCell",vm.lastrow,vm.lastcell);
    // jQuery("#jqGrid").saveRow(obj);
    // $("#jqGrid").jqGrid('setCell', obj, "name", '', 'not-editable-cell');
    // $("#jqgrid").setColProp("name",{editable:false});
    var rowData = $("#jqGrid").jqGrid('getRowData', obj);
    // $("#list").jqGrid("saveCell",obj,0);
    // $("#list").jqGrid("saveCell",obj,1);
    // $("#list").jqGrid("saveCell",obj,2);
    // $("#list").jqGrid("saveCell",obj,3);
    // $("#list").jqGrid("saveCell",obj,4);
    // $("#list").jqGrid("saveCell",obj,5);
    // $("#list").jqGrid("saveCell",obj,'name');
    // $("#list").jqGrid("saveCell",obj,'remark');
    // $("#jqGrid").jqGrid('setCell', obj, 2, '', 'not-editable-cell');
    // $("#jqGrid").jqGrid('setCell', obj, 4, '', 'not-editable-cell');
    // var a=$("#jqGrid tr:eq("+(1)+")").find("#name").val()
    // var b=$("#jqGrid tr:eq("+(obj)+")").find("#remark").val()
}
function setValueIte(){
    var parentId=document.getElementById("sel").value;
    $.getJSON(baseURL + "alarmgroup/queryAllGroupName/"+parentId, function(r){
        vm.modulem=r.moduleName;
    });
}
function setValueIteu(){
    var parentId=document.getElementById("selu").value;
    $.getJSON(baseURL + "alarmgroup/queryAllGroupName/"+parentId, function(r){
        vm.modulem=r.moduleName;
    });
}
function setValueItem(){
    var parentId=document.getElementById("selt1").value;
    $.getJSON(baseURL + "alarmgroup/queryAllGroupName/"+parentId, function(r){
        vm.moduleName=r.moduleName;
    });
}