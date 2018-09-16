$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'yiche/column/queryAll',
        datatype: "json",
        colModel: [
            { label: 'ID', name: 'cid', width: 100, key: true,hidden:true },
            { label: '编号', name: 'number', width: 40 },
            { label: '库名称 ', name: 'cdatabase_name', width: 100 },
            { label: '表名称 ', name: 'ctable_name', width: 180 },
            { label: '字段名称 ', name: 'column_name', width: 80 },
            { label: '通知内容 ', name: 'ccontent', width: 160 },
            { label: '筛选条件', name: 'ccondition', width: 100},
            { label: '负责人 ', name: 'cowner', width: 70 },
            { label: '创建时间 ', name: 'ccreate_time', width: 130 },
            { label: '状态', name: 'status', width: 100, formatter:editStatus},
            { label: '报警组名称', name: 'alarmGroupName', width: 200},
            { label: '监控类型', name: 'cmonitor_type', width: 80 },
            { label: '聚合函数', name: 'aggregate_function', width: 100 ,hidden:true},
            { label: '预测类型 ', name: 'calculate_type', width: 100 ,hidden:true},
            { label: '计算类型 ', name: 'count_type', width: 100,hidden:true },
            { label: '误差 ', name: 'deviation', width: 100,hidden:true },
            { label: '本身 ', name: 'cself', width: 100,hidden:true },
            { label: '日环比 ', name: 'ch_compare', width: 100 ,hidden:true},
            { label: '周同比 ', name: 'ct_compare', width: 100 ,hidden:true},
            { label: '日增量 ', name: 'day_increment', width: 100,hidden:true },
            { label: '影响范围 ', name: 'itemName', width: 100 ,hidden:true},
            { label: '分区生成时间 ', name: 'create_partition_time', width: 100 ,hidden:true},
            { label: '注释', name: 'cremark', width: 100 ,hidden:true},
            { label: '接收人 ', name: 'creciever', width: 100 ,hidden:true},
            { label: '报警组', name: 'alarmUniqueid', width: 30 ,hidden:true},
            {
                label: '操作', name: '', width: 40, formatter: function (value, options, row) {
                var id=options.rowId;
                return '<a  class="btn btn-default" style="background: #5bc0de;" onclick="start(\''+options.rowId+'\')">执行</a>&nbsp;';
            }
            }
        ],
        viewrecords: true,
        height: 385,
        rowNum: 30,
        rowList : [30,50],
        rownumbers: true,
        rownumWidth: 40,
        autowidth:true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader : {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
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

    function editStatus(cellValue, options, rowdata, action)
    {
        if(rowdata.status == "1") {
            return "暂停中";
        } else if (rowdata.status == "0"){
            return "开启中";
        } else {
            return "";
        }
    }
});

function show(){
    var value=$("#select").val();
    if("指标监控"==value){
        vm.showCommon=false;
        // $("#common").prop("style","display:none");
        // $("#zbType").prop("style","display:block");
        vm.column.cmonitor_type=null;
        vm.column.ch_compare = null;
        vm.column.ct_compare = null;
        vm.column.cself = null;
    }else{
        vm.showCommon=true;
        // $("#zbType").prop("style","display:none");
        // $("#common").prop("style","display:block");
        vm.column.calculate_type=null;
        vm.column.count_type=null;
        vm.column.aggregate_function=null;
        vm.column.deviation=null;
    }
};
var vm = new Vue({
    el:'#rrapp',
    data:{
        itemid:[],
        moduleid:[],
        iditem:[],
        idmodule:[],
        count:1,
        countItem:1,
        countModule:1,
        monitorType:{},
        monitor:[],
        monitor1:[],
        monitor2:[],
        monitor3:[],
        itemName:[],
        alarmGroup:[],
        moduleName:[],
        moduleName1:[],
        moduleName2:[],
        moduleName3:[],
        moduleName4:[],
        moduleName5:[],
        moduleName6:[],
        moduleName7:[],
        moduleName8:[],
        moduleName9:[],
        moduleName10:[],
        itemid:[],
        moduleid:[],
        item_id:{},
        item:[],
        item1:[],
        item2:[],
        item3:[],
        item4:[],
        item5:[],
        item6:[],
        item7:[],
        item8:[],
        item9:[],
        item10:[],
        module_id:{},
        module:[],
        module1:[],
        module2:[],
        module3:[],
        module4:[],
        module5:[],
        module6:[],
        module7:[],
        module8:[],
        module9:[],
        module10:[],
        q:{
            cdatabase_name:null,
            ctable_name:null,
            cid:null
        },
        showList: true,
        showItem: true,
        showCommon: true,
        title: null,
        create_partition_time:null,
        user:{},
        column: {},
        cDatabaseName:[],   //数据库名称
        cProjectName:[],   //项目名称
        cSelectedProject:"",  // 选中的项目名称
        cSelectedProjectId:0, //选中的项目名称ID
        cQueryModuleName:[],  //  模块名称
        cSelectedDatabase:"",  //选中的数据库名称
        cSelectedModuleName:"",  //选中的模块名称
        cSelectedModuleId:0,//选中的模块名称ID
        cOwner:[],//负责人
        cSelectedOwner:"",  //选中的负责人
        error1:false,  //错误提示
        error2:false,//错误提示
        error3:false,//错误提示
        error4:false,//错误提示
        showRule1:false, //展示规则
        showRule2:false,
        showRule3:false,
        showRule4:false,
        cPartitionTime:1,
        alarmGroups:[],
        chooseAlarmGroupItem: ""
    },
    methods: {
        created:function() {
            this.querydbName()
            this.queryProjectName()
            this.queryOwner()
        },
        showText1:function() {
            this.showRule1 = true
        },
        hiddenText1:function() {
            this.showRule1 = false
        },
        showText2:function() {
            this.showRule2 = true
        },
        hiddenText2:function() {
            this.showRule2 = false
        },
        showText3:function() {
            this.showRule3 = true
        },
        hiddenText3:function() {
            this.showRule3 = false
        },
        showText4:function() {
            this.showRule4 = true
        },
        hiddenText4:function() {
            this.showRule4 = false
        },
        queryData:function() {  //规则查询
            // vm.cSelectedProjectId=document.getElementById("project").value;
            vm.showList = true;
            // console.log(vm.cSelectedDatabase,vm.ctable_name,vm.selectedProjectId,vm.selectedModuleId,vm.selectedOwner,vm.tid)
            var page = $("#jqGrid").jqGrid('getGridParam','page');
            $("#jqGrid").jqGrid('setGridParam',{
                postData:{'cDatabaseName':vm.cSelectedDatabase,'ctable_name': vm.q.ctable_name,'itemid':vm.cSelectedProjectId,'moduleid':vm.cSelectedModuleId,'cowner':vm.cSelectedOwner,'cid':vm.q.cid},
                // postData:{'table_name': vm.table_name,'tid':vm.tid,'itemid':vm.itemid,'moduleid':vm.moduleid},
                page:page
            }).trigger("reloadGrid");
        },
        validation1:function() {  //验证本身
            var inputValue = document.getElementById("self").value;
            var str = inputValue.replace(/(^\s*)|(\s*$)/g,"")
            if(!/\s/g.test(str)) {
                if((str.indexOf("|") === str.lastIndexOf("|")) && str.indexOf("|") !== -1) {
                    var firstHalfOr = inputValue.substring(0,str.indexOf("|"));
                    var afterHalfOr = inputValue.substring(str.indexOf("|") +1);
                    if(/^(\(-?\d+,-?\d+\))$/.test(firstHalfOr) || /^(\[-?\d+,-?\d+\))$/.test(firstHalfOr) || /^(\(-?\d+,-?\d+\])$/.test(firstHalfOr) || /^(\[-?\d+,-?\d+\])$/.test(firstHalfOr) || /^(\(-?\d+,\))$/.test(firstHalfOr) || /^(\[-?\d+,\))$/.test(firstHalfOr) || /^(\(,-?\d+\))$/.test(firstHalfOr) || /^(\(,-?\d+\])$/.test(firstHalfOr) || /^(!\{-?\d+\})$/.test(firstHalfOr)) {
                        if(/^(\(-?\d+,-?\d+\))$/.test(afterHalfOr) || /^(\[-?\d+,-?\d+\))$/.test(afterHalfOr) || /^(\(-?\d+,-?\d+\])$/.test(afterHalfOr) || /^(\[-?\d+,-?\d+\])$/.test(afterHalfOr) || /^(\(-?\d+,\))$/.test(afterHalfOr) || /^(\[-?\d+,\))$/.test(afterHalfOr) || /^(\(,-?\d+\))$/.test(afterHalfOr) || /^(\(,-?\d+\])$/.test(afterHalfOr) || /^(!\{-?\d+\})$/.test(afterHalfOr)) {
                            this.error1 = false
                        } else {
                            this.error1 = true
                        }
                    } else {
                        this.error1 = true
                    }
                } else if((str.indexOf("&") === str.lastIndexOf("&")) && str.indexOf("&") !== -1) {
                    var firstHalfAnd = inputValue.substring(0,str.indexOf("&"));
                    var afterHalfAnd = inputValue.substring(str.indexOf("&") +1);
                    if(/^(\(-?\d+,-?\d+\))$/.test(firstHalfAnd) || /^(\[-?\d+,-?\d+\))$/.test(firstHalfAnd) || /^(\(-?\d+,-?\d+\])$/.test(firstHalfAnd) || /^(\[-?\d+,-?\d+\])$/.test(firstHalfAnd) || /^(\(-?\d+,\))$/.test(firstHalfAnd) || /^(\[-?\d+,\))$/.test(firstHalfAnd) || /^(\(,-?\d+\))$/.test(firstHalfAnd) || /^(\(,-?\d+\])$/.test(firstHalfAnd) || /^(!\{-?\d+\})$/.test(firstHalfAnd)) {
                        if(/^(\(-?\d+,-?\d+\))$/.test(afterHalfAnd) || /^(\[-?\d+,-?\d+\))$/.test(afterHalfAnd) || /^(\(-?\d+,-?\d+\])$/.test(afterHalfAnd) || /^(\[-?\d+,-?\d+\])$/.test(afterHalfAnd) || /^(\(-?\d+,\))$/.test(afterHalfAnd) || /^(\[-?\d+,\))$/.test(afterHalfAnd) || /^(\(,-?\d+\))$/.test(afterHalfAnd) || /^(\(,-?\d+\])$/.test(afterHalfAnd) || /^(!\{-?\d+\})$/.test(afterHalfAnd)) {
                            this.error1 = false
                        } else {
                            this.error1 = true
                        }
                    } else {
                        this.error1 = true
                    }
                } else if(str === "") {
                    this.error1 = false
                }  else {
                    if(/^(\(-?\d+,-?\d+\))$/.test(str) || /^(\[-?\d+,-?\d+\))$/.test(str) || /^(\(-?\d+,-?\d+\])$/.test(str) || /^(\[-?\d+,-?\d+\])$/.test(str) || /^(\(-?\d+,\))$/.test(str) || /^(\[-?\d+,\))$/.test(str) || /^(\(,-?\d+\))$/.test(str) || /^(\(,-?\d+\])$/.test(str) || /^(!\{-?\d+\})$/.test(str)) {
                        this.error1 = false
                    } else {
                        this.error1 = true
                    }
                }
            } else {
                this.error1 = true
            }
        },
        validation2:function() {  // 验证环比
            var inputValue = document.getElementById("dayAdd").value;
            var str = inputValue.replace(/(^\s*)|(\s*$)/g,"")
            if(!/\s/g.test(str)) {
                if((str.indexOf("|") === str.lastIndexOf("|")) && str.indexOf("|") !== -1) {
                    var firstHalfOr = inputValue.substring(0,str.indexOf("|"));
                    var afterHalfOr = inputValue.substring(str.indexOf("|") +1);
                    if(/^(\(-?\d+%?,-?\d+%?\))$/.test(firstHalfOr) || /^(\[-?\d+%?,-?\d+%?\))$/.test(firstHalfOr) || /^(\(-?\d+%?,-?\d+%?\])$/.test(firstHalfOr) || /^(\[-?\d+%?,-?\d+%?\])$/.test(firstHalfOr) || /^(\(-?\d+%?,\))$/.test(firstHalfOr) || /^(\[-?\d+%?,\))$/.test(firstHalfOr) || /^(\(,-?\d+%?\))$/.test(firstHalfOr) || /^(\(,-?\d+%?\])$/.test(firstHalfOr) || /^(!\{-?\d+%?\})$/.test(firstHalfOr)) {
                        if(/^(\(-?\d+%?,-?\d+%?\))$/.test(afterHalfOr) || /^(\[-?\d+%?,-?\d+%?\))$/.test(afterHalfOr) || /^(\(-?\d+%?,-?\d+%?\])$/.test(afterHalfOr) || /^(\[-?\d+%?,-?\d+%?\])$/.test(afterHalfOr) || /^(\(-?\d+%?,\))$/.test(afterHalfOr) || /^(\[-?\d+%?,\))$/.test(afterHalfOr) || /^(\(,-?\d+%?\))$/.test(afterHalfOr) || /^(\(,-?\d+%?\])$/.test(afterHalfOr) || /^(!\{-?\d+%?\})$/.test(afterHalfOr)) {
                            this.error2 = false
                        } else {
                            this.error2 = true
                        }
                    } else {
                        this.error2 = true
                    }
                } else if((str.indexOf("&") === str.lastIndexOf("&")) && str.indexOf("&") !== -1) {
                    var firstHalfAnd = inputValue.substring(0,str.indexOf("&"));
                    var afterHalfAnd = inputValue.substring(str.indexOf("&") +1);
                    if(/^(\(-?\d+%?,-?\d+%?\))$/.test(firstHalfAnd) || /^(\[-?\d+%?,-?\d+%?\))$/.test(firstHalfAnd) || /^(\(-?\d+%?,-?\d+%?\])$/.test(firstHalfAnd) || /^(\[-?\d+%?,-?\d+%?\])$/.test(firstHalfAnd) || /^(\(-?\d+%?,\))$/.test(firstHalfAnd) || /^(\[-?\d+%?,\))$/.test(firstHalfAnd) || /^(\(,-?\d+%?\))$/.test(firstHalfAnd) || /^(\(,-?\d+%?\])$/.test(firstHalfAnd) || /^(!\{-?\d+%?\})$/.test(firstHalfAnd)) {
                        if(/^(\(-?\d+%?,-?\d+%?\))$/.test(afterHalfAnd) || /^(\[-?\d+%?,-?\d+%?\))$/.test(afterHalfAnd) || /^(\(-?\d+%?,-?\d+%?\])$/.test(afterHalfAnd) || /^(\[-?\d+%?,-?\d+%?\])$/.test(afterHalfAnd) || /^(\(-?\d+%?,\))$/.test(afterHalfAnd) || /^(\[-?\d+%?,\))$/.test(afterHalfAnd) || /^(\(,-?\d+%?\))$/.test(afterHalfAnd) || /^(\(,-?\d+%?\])$/.test(afterHalfAnd) || /^(!\{-?\d+%?\})$/.test(afterHalfAnd)) {
                            this.error2 = false
                        } else {
                            this.error2 = true
                        }
                    } else {
                        this.error2 = true
                    }
                } else if(str === "") {
                    this.error2 = false
                }  else {
                    if(/^(\(-?\d+%?,-?\d+%?\))$/.test(str) || /^(\[-?\d+%?,-?\d+%?\))$/.test(str) || /^(\(-?\d+%?,-?\d+%?\])$/.test(str) || /^(\[-?\d+%?,-?\d+%?\])$/.test(str) || /^(\(-?\d+%?,\))$/.test(str) || /^(\[-?\d+%?,\))$/.test(str) || /^(\(,-?\d+%?\))$/.test(str) || /^(\(,-?\d+%?\])$/.test(str) || /^(!\{-?\d+%?\})$/.test(str)) {
                        this.error2 = false
                    } else {
                        this.error2 = true
                    }
                }
            } else {
                this.error2 = true
            }
        },
        validation3:function() {   //验证同比
            var inputValue = document.getElementById("week").value;
            var str = inputValue.replace(/(^\s*)|(\s*$)/g,"")
            if(!/\s/g.test(str)) {
                if((str.indexOf("|") === str.lastIndexOf("|")) && str.indexOf("|") !== -1) {
                    var firstHalfOr = inputValue.substring(0,str.indexOf("|"));
                    var afterHalfOr = inputValue.substring(str.indexOf("|") +1);
                    if(/^(\(-?\d+%?,-?\d+%?\))$/.test(firstHalfOr) || /^(\[-?\d+%?,-?\d+%?\))$/.test(firstHalfOr) || /^(\(-?\d+%?,-?\d+%?\])$/.test(firstHalfOr) || /^(\[-?\d+%?,-?\d+%?\])$/.test(firstHalfOr) || /^(\(-?\d+%?,\))$/.test(firstHalfOr) || /^(\[-?\d+%?,\))$/.test(firstHalfOr) || /^(\(,-?\d+%?\))$/.test(firstHalfOr) || /^(\(,-?\d+%?\])$/.test(firstHalfOr) || /^(!\{-?\d+%?\})$/.test(firstHalfOr)) {
                        if(/^(\(-?\d+%?,-?\d+%?\))$/.test(afterHalfOr) || /^(\[-?\d+%?,-?\d+%?\))$/.test(afterHalfOr) || /^(\(-?\d+%?,-?\d+%?\])$/.test(afterHalfOr) || /^(\[-?\d+%?,-?\d+%?\])$/.test(afterHalfOr) || /^(\(-?\d+%?,\))$/.test(afterHalfOr) || /^(\[-?\d+%?,\))$/.test(afterHalfOr) || /^(\(,-?\d+%?\))$/.test(afterHalfOr) || /^(\(,-?\d+%?\])$/.test(afterHalfOr) || /^(!\{-?\d+%?\})$/.test(afterHalfOr)) {
                            this.error3 = false
                        } else {
                            this.error3 = true
                        }
                    } else {
                        this.error3 = true
                    }
                } else if((str.indexOf("&") === str.lastIndexOf("&")) && str.indexOf("&") !== -1) {
                    var firstHalfAnd = inputValue.substring(0,str.indexOf("&"));
                    var afterHalfAnd = inputValue.substring(str.indexOf("&") +1);
                    if(/^(\(-?\d+%?,-?\d+%?\))$/.test(firstHalfAnd) || /^(\[-?\d+%?,-?\d+%?\))$/.test(firstHalfAnd) || /^(\(-?\d+%?,-?\d+%?\])$/.test(firstHalfAnd) || /^(\[-?\d+%?,-?\d+%?\])$/.test(firstHalfAnd) || /^(\(-?\d+%?,\))$/.test(firstHalfAnd) || /^(\[-?\d+%?,\))$/.test(firstHalfAnd) || /^(\(,-?\d+%?\))$/.test(firstHalfAnd) || /^(\(,-?\d+%?\])$/.test(firstHalfAnd) || /^(!\{-?\d+%?\})$/.test(firstHalfAnd)) {
                        if(/^(\(-?\d+%?,-?\d+%?\))$/.test(afterHalfAnd) || /^(\[-?\d+%?,-?\d+%?\))$/.test(afterHalfAnd) || /^(\(-?\d+%?,-?\d+%?\])$/.test(afterHalfAnd) || /^(\[-?\d+%?,-?\d+%?\])$/.test(afterHalfAnd) || /^(\(-?\d+%?,\))$/.test(afterHalfAnd) || /^(\[-?\d+%?,\))$/.test(afterHalfAnd) || /^(\(,-?\d+%?\))$/.test(afterHalfAnd) || /^(\(,-?\d+%?\])$/.test(afterHalfAnd) || /^(!\{-?\d+%?\})$/.test(afterHalfAnd)) {
                            this.error3 = false
                        } else {
                            this.error3 = true
                        }
                    } else {
                        this.error3 = true
                    }
                } else if(str === "") {
                    this.error3 = false
                }  else {
                    if(/^(\(-?\d+%?,-?\d+%?\))$/.test(str) || /^(\[-?\d+%?,-?\d+%?\))$/.test(str) || /^(\(-?\d+%?,-?\d+%?\])$/.test(str) || /^(\[-?\d+%?,-?\d+%?\])$/.test(str) || /^(\(-?\d+%?,\))$/.test(str) || /^(\[-?\d+%?,\))$/.test(str) || /^(\(,-?\d+%?\))$/.test(str) || /^(\(,-?\d+%?\])$/.test(str) || /^(!\{-?\d+%?\})$/.test(str)) {
                        this.error3 = false
                    } else {
                        this.error3 = true
                    }
                }
            } else {
                this.error3 = true
            }
        },
        emitModule:function() {     //二级菜单触发模块列表
            var id = document.getElementById("project").value
            this.cSelectedProjectId = id;
            $.getJSON(baseURL + "item/getAllModuleC/" + id, function(r){
                vm.cQueryModuleName=r.allModuleC;
            });
        },
        queryProjectName:function() {   //查询项目
            $.getJSON(baseURL + "item/getAllItemC", function(r) {
                vm.cProjectName = r.allModuleC;
            });
        },
        getModule:function() {    //选中的模块
            var id = document.getElementById("module").value;
            this.cSelectedModuleId = id;
        },
        querydbName:function() {  //查询数据库
            $.get(baseURL + "yiche/column/queryCDbName", function (r) {
                vm.cDatabaseName = r.cDbName;
            });
        },
        queryOwner:function() { //查询负责人
            $.getJSON(baseURL + "yiche/column/queryCOwner", function(r){
                vm.cOwner = r.cOwner;
            });
        },
        queryMessage: function(){
            if(vm.column.cdatabase_name==null||vm.column.ctable_name==null){
                alert("库名和表名不能为空")
                return true;
            }else{
                $.ajax({
                    type:"post",
                    url:baseURL +"yiche/oozie/getInfo",
                    dataType: "JSON",
                    data: { dbName:vm.column.cdatabase_name,tblName:vm.column.ctable_name},
                    // contentType:"application/json",
                    success:function (r) {
                        console.log(r.message)
                        console.log(r.message.length)
                        if(r.message.length==1){
                            for (var i=0;i<r.message.length;i++){
                                alert("<div>任务id："+r.message[0].jobid+"</div>"+
                                    "<div>任务名称："+r.message[0].jobname+"</div>" +
                                    "<div>提交人："+r.message[0].committer+"</div>" +
                                    "<div>开始时间："+r.message[0].startDate+"</div>" +
                                    "<div>结束时间："+r.message[0].endDate+"</div>" +
                                    "<div>任务状态："+r.message[0].jobStatus+"</div>" +
                                    "<div>执行周期："+r.message[0].quartz+"</div>")
                            }
                        }else
                        if(r.message.length==0)  {
                            alert("该表没有血缘关系")
                        }else{
                            alert("获取"+r.message.length+"表血缘关系")
                        }

                    }
                })

            }
        },
        // selectName: function (val) {
        // vm.column.create_partition_time=this.create_partition_time;
        // },
        query: function () {
            vm.reload();
        },
        parse: function () {
            var cid = getSelectedRow();
            if(cid == null){
                return ;
            }

            confirm('确定要暂停选中的监控项？', function(){
                $.ajax({
                    type: "POST",
                    url: baseURL + "yiche/column/stop/" + cid,
                    contentType: "application/json",
                    data: JSON.stringify(cid),
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
        resume: function () {
            var cid = getSelectedRow();
            if(cid == null){
                return ;
            }

            confirm('确定要开启选中的监控项？', function(){
                $.ajax({
                    type: "POST",
                    url: baseURL + "yiche/column/start/" + cid,
                    contentType: "application/json",
                    data: JSON.stringify(cid),
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
        queryAlarmGroupInfo: function(){
            if(vm.chooseAlarmGroupItem == null || vm.chooseAlarmGroupItem == ""){
                alert("请选择报警组")
                return true;
            }
            alert("<div>报警组ID："+vm.chooseAlarmGroupItem.uniqueId+"</div>"+
                "<div>报警组名称："+vm.chooseAlarmGroupItem.groupName+"</div>"+
                "<div>创建人："+vm.chooseAlarmGroupItem.extUser+"</div>" +
                "<div>邮件接收人："+vm.chooseAlarmGroupItem.emailToList+"</div>" +
                "<div>微信接收人："+vm.chooseAlarmGroupItem.wxToList+"</div>"
            )
        },
        add: function(){
            vm.showList = false;
            vm.showCommon = true;
            vm.title = "新增";
            vm.column = {};
            vm.column.cowner=vm.user.username;
            vm.column.cmonitor_type=vm.monitor;
            vm.count=1;
            vm.countItem=1;
            vm.countModule=1;
            vm.item_id={};
            vm.module_id={};
            vm.monitorType={};
        },
        addselect:function () {
            vm.count=vm.count+1;
            if(vm.checks()){
                return;
            }
        },
        addmodule:function () {
            vm.countModule=vm.countModule+1;
            if(vm.checksModule()){
                return;
            }
        },
        deletemodule:function(){
            vm.countModule=vm.countModule-1;
        },
        update: function () {
            var jobId = getSelectedRow();
            if(jobId == null){
                return ;
            }
            vm.item=[],
                vm.item1=[],
                vm.item2=[],
                vm.item3=[],
                vm.item4=[],
                vm.item5=[],
                vm.item6=[],
                vm.item7=[],
                vm.item8=[],
                vm.item9=[],
                vm.item10=[],
                vm.module=[],
                vm.module1=[],
                vm.module2=[],
                vm.module3=[],
                vm.module4=[],
                vm.module5=[],
                vm.module6=[],
                vm.module7=[],
                vm.module8=[],
                vm.module9=[],
                vm.module10=[],
                vm.moduleName=[],
                vm.moduleName1=[],
                vm.moduleName2=[],
                vm.moduleName3=[],
                vm.moduleName4=[],
                vm.moduleName5=[],
                vm.moduleName6=[],
                vm.moduleName7=[],
                vm.moduleName8=[],
                vm.moduleName9=[],
                vm.moduleName10=[],
                // $.get(baseURL + "yiche/column/queryById/"+jobId, function(r){
                //     vm.showList = false;
                //     vm.title = "修改";
                //     vm.column = r.column;
                //     console.log(r.column);
                // console.log(vm.column);
                // });
                $.ajax({
                    type: "POST",
                    url: baseURL + "yiche/column/queryById",
                    //contentType: "application/json",
                    dataType:"json",
                    data: {jobId:jobId},
                    async:false,
                    success: function(data){
                        vm.showList = false;
                        vm.showItem = false;
                        vm.title = "修改";
                        vm.column.cid = data.column.cid;
                        vm.column.cmonitor_type = data.column.cmonitor_type;
                        vm.column.aggregate_function = data.column.aggregate_function;
                        vm.column.ccondition = data.column.ccondition;
                        vm.column.ctable_name = data.column.ctable_name;
                        vm.column.column_name = data.column.column_name;
                        vm.column.cdatabase_name = data.column.cdatabase_name;
                        vm.column.calculate_type = data.column.calculate_type;
                        vm.column.count_type = data.column.count_type;
                        vm.column.deviation = data.column.deviation;
                        vm.column.ch_compare = data.column.ch_compare;
                        vm.column.ct_compare = data.column.ct_compare;
                        vm.column.cself = data.column.cself;
                        vm.column.calarm_type = data.column.calarm_type;
                        vm.column.cremark = data.column.cremark;
                        vm.column.cowner = data.column.cowner;
                        vm.column.ccontent = data.column.ccontent;
                        vm.column.creciever = data.column.creciever;
                        vm.column.ccreate_time = data.column.ccreate_time;
                        vm.column.create_partition_time = data.column.create_partition_time;
                        vm.column.partition_type=data.column.partition_type;
                        vm.column.itemBodys=data.column.itemBodys;
                        vm.column.alarmUniqueid=data.column.alarmUniqueid;
                        vm.monitor=vm.column.cmonitor_type;
                        vm.count=1;
                        if(vm.column.partition_type==null&&vm.column.partition_type==""){
                            vm.column.partition_type="日";
                        }

                        if(vm.column.cmonitor_type=="指标监控"){
                            vm.showCommon=false;
                        }else{
                            vm.showCommon=true;
                        }
                        // 以下是更新项目关系代码
                        vm.countModule=vm.column.itemBodys.length;
                        //含有一个项目关系
                        if(vm.column.itemBodys.length==1) {
                            //第一个关系
                            if(vm.column.itemBodys[0].parentId!=0){
                                vm.item = vm.column.itemBodys[0].parentId;
                                var parentId = vm.column.itemBodys[0].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/" + parentId, function (r) {
                                    vm.moduleName = r.moduleName;
                                    vm.module = vm.column.itemBodys[0].id;
                                });
                            }else {
                                vm.item = vm.column.itemBodys[0].id;
                            }

                        }

                        //含有两个项目关系
                        if(vm.column.itemBodys.length==2){
                            //第一个关系
                            if(vm.column.itemBodys[0].parentId!=0){
                                vm.item = vm.column.itemBodys[0].parentId;
                                console.log(vm.item)
                                var parentId = vm.column.itemBodys[0].parentId;
                                console.log(parentId)
                                $.getJSON(baseURL + "item/queryAllModuleName/" + parentId, function (r) {
                                    vm.moduleName = r.moduleName;
                                    vm.module = vm.column.itemBodys[0].id;
                                });
                            }else {
                                vm.item = vm.column.itemBodys[0].id;
                            }
                            //第二个关系
                            if(vm.column.itemBodys[1].parentId!=0){
                                vm.item1=vm.column.itemBodys[1].parentId;
                                var parentId=vm.column.itemBodys[1].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName1=r.moduleName;
                                    vm.module1=vm.column.itemBodys[1].id;
                                });
                            }else{
                                vm.item1 = vm.column.itemBodys[1].id;
                            }
                        }

                        //含有三个项目关系
                        if(vm.column.itemBodys.length==3){
                            //第一个关系
                            if(vm.column.itemBodys[0].parentId!=0){
                                vm.item = vm.column.itemBodys[0].parentId;
                                var parentId = vm.column.itemBodys[0].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/" + parentId, function (r) {
                                    vm.moduleName = r.moduleName;
                                    vm.module = vm.column.itemBodys[0].id;
                                });
                            }else {
                                vm.item = vm.column.itemBodys[0].id;
                            }
                            //第二个关系
                            if(vm.column.itemBodys[1].parentId!=0){
                                vm.item1=vm.column.itemBodys[1].parentId;
                                var parentId=vm.column.itemBodys[1].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName1=r.moduleName;
                                    vm.module1=vm.column.itemBodys[1].id;
                                });
                            }else{
                                vm.item1 = vm.column.itemBodys[1].id;
                            }
                            //第三个关系
                            if(vm.column.itemBodys[2].parentId!=0){
                                vm.item2=vm.column.itemBodys[2].parentId;
                                var parentId=vm.column.itemBodys[2].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName2=r.moduleName;
                                    vm.module2=vm.column.itemBodys[2].id;
                                });
                            }else{
                                vm.item2 = vm.column.itemBodys[2].id;
                            }
                        }

                        //含有四个项目关系
                        if(vm.column.itemBodys.length==4){
                            //第一个关系
                            if(vm.column.itemBodys[0].parentId!=0){
                                vm.item = vm.column.itemBodys[0].parentId;
                                console.log(vm.item)
                                var parentId = vm.column.itemBodys[0].parentId;
                                console.log(parentId)
                                $.getJSON(baseURL + "item/queryAllModuleName/" + parentId, function (r) {
                                    vm.moduleName = r.moduleName;
                                    vm.module = vm.column.itemBodys[0].id;
                                });
                            }else {
                                vm.item = vm.column.itemBodys[0].id;
                            }
                            //第二个关系
                            if(vm.column.itemBodys[1].parentId!=0){
                                vm.item1=vm.column.itemBodys[1].parentId;
                                var parentId=vm.column.itemBodys[1].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName1=r.moduleName;
                                    vm.module1=vm.column.itemBodys[1].id;
                                });
                            }else{
                                vm.item = vm.column.itemBodys[1].id;
                            }
                            //第三个关系
                            if(vm.column.itemBodys[2].parentId!=0){
                                vm.item2=vm.column.itemBodys[2].parentId;
                                var parentId=vm.column.itemBodys[2].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName2=r.moduleName;
                                    vm.module2=vm.column.itemBodys[2].id;
                                });
                            }else{
                                vm.item2 = vm.column.itemBodys[2].id;
                            }
                            //第四个关系
                            if(vm.column.itemBodys[3].parentId!=0){
                                vm.item3=vm.column.itemBodys[3].parentId;
                                var parentId=vm.column.itemBodys[3].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName3=r.moduleName;
                                    vm.module3=vm.column.itemBodys[3].id;
                                });
                            }else{
                                vm.item3 = vm.column.itemBodys[3].id;
                            }
                        }

                        //含有五个项目关系
                        if(vm.column.itemBodys.length==5){
                            //第一个关系
                            if(vm.column.itemBodys[0].parentId!=0){
                                vm.item = vm.column.itemBodys[0].parentId;
                                console.log(vm.item)
                                var parentId = vm.column.itemBodys[0].parentId;
                                console.log(parentId)
                                $.getJSON(baseURL + "item/queryAllModuleName/" + parentId, function (r) {
                                    vm.moduleName = r.moduleName;
                                    vm.module = vm.column.itemBodys[0].id;
                                });
                            }else {
                                vm.item = vm.column.itemBodys[0].id;
                            }
                            //第二个关系
                            if(vm.column.itemBodys[1].parentId!=0){
                                vm.item1=vm.column.itemBodys[1].parentId;
                                var parentId=vm.column.itemBodys[1].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName1=r.moduleName;
                                    vm.module1=vm.column.itemBodys[1].id;
                                });
                            }else{
                                vm.item = vm.column.itemBodys[1].id;
                            }
                            //第三个关系
                            if(vm.column.itemBodys[2].parentId!=0){
                                vm.item2=vm.column.itemBodys[2].parentId;
                                var parentId=vm.column.itemBodys[2].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName2=r.moduleName;
                                    vm.module2=vm.column.itemBodys[2].id;
                                });
                            }else{
                                vm.item2 = vm.column.itemBodys[2].id;
                            }
                            //第四个关系
                            if(vm.column.itemBodys[3].parentId!=0){
                                vm.item3=vm.column.itemBodys[3].parentId;
                                var parentId=vm.column.itemBodys[3].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName3=r.moduleName;
                                    vm.module3=vm.column.itemBodys[3].id;
                                });
                            }else{
                                vm.item3 = vm.column.itemBodys[3].id;
                            }
                            //第五个关系
                            if(vm.column.itemBodys[4].parentId!=0){
                                vm.item4=vm.column.itemBodys[4].parentId;
                                var parentId=vm.column.itemBodys[4].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName4=r.moduleName;
                                    vm.module4=vm.column.itemBodys[4].id;
                                });
                            }else{
                                vm.item4 = vm.column.itemBodys[4].id;
                            }
                        }

                        //含有六个项目关系
                        if(vm.column.itemBodys.length==6){
                            //第一个关系
                            if(vm.column.itemBodys[0].parentId!=0){
                                vm.item = vm.column.itemBodys[0].parentId;
                                console.log(vm.item)
                                var parentId = vm.column.itemBodys[0].parentId;
                                console.log(parentId)
                                $.getJSON(baseURL + "item/queryAllModuleName/" + parentId, function (r) {
                                    vm.moduleName = r.moduleName;
                                    vm.module = vm.column.itemBodys[0].id;
                                });
                            }else {
                                vm.item = vm.column.itemBodys[0].id;
                            }
                            //第二个关系
                            if(vm.column.itemBodys[1].parentId!=0){
                                vm.item1=vm.column.itemBodys[1].parentId;
                                var parentId=vm.column.itemBodys[1].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName1=r.moduleName;
                                    vm.module1=vm.column.itemBodys[1].id;
                                });
                            }else{
                                vm.item = vm.column.itemBodys[1].id;
                            }
                            //第三个关系
                            if(vm.column.itemBodys[2].parentId!=0){
                                vm.item2=vm.column.itemBodys[2].parentId;
                                var parentId=vm.column.itemBodys[2].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName2=r.moduleName;
                                    vm.module2=vm.column.itemBodys[2].id;
                                });
                            }else{
                                vm.item2 = vm.column.itemBodys[2].id;
                            }
                            //第四个关系
                            if(vm.column.itemBodys[3].parentId!=0){
                                vm.item3=vm.column.itemBodys[3].parentId;
                                var parentId=vm.column.itemBodys[3].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName3=r.moduleName;
                                    vm.module3=vm.column.itemBodys[3].id;
                                });
                            }else{
                                vm.item3 = vm.column.itemBodys[3].id;
                            }
                            //第五个关系
                            if(vm.column.itemBodys[4].parentId!=0){
                                vm.item4=vm.column.itemBodys[4].parentId;
                                var parentId=vm.column.itemBodys[4].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName4=r.moduleName;
                                    vm.module4=vm.column.itemBodys[4].id;
                                });
                            }else{
                                vm.item4 = vm.column.itemBodys[4].id;
                            }
                            //第六个关系
                            if(vm.column.itemBodys[5].parentId!=0){
                                vm.item5=vm.column.itemBodys[5].parentId;
                                var parentId=vm.column.itemBodys[5].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName5=r.moduleName;
                                    vm.module5=vm.column.itemBodys[5].id;
                                });
                            }else{
                                vm.item5 = vm.column.itemBodys[5].id;
                            }
                        }

                        //含有七个项目关系
                        if(vm.column.itemBodys.length==7){
                            //第一个关系
                            if(vm.column.itemBodys[0].parentId!=0){
                                vm.item = vm.column.itemBodys[0].parentId;
                                console.log(vm.item)
                                var parentId = vm.column.itemBodys[0].parentId;
                                console.log(parentId)
                                $.getJSON(baseURL + "item/queryAllModuleName/" + parentId, function (r) {
                                    vm.moduleName = r.moduleName;
                                    vm.module = vm.column.itemBodys[0].id;
                                });
                            }else {
                                vm.item = vm.column.itemBodys[0].id;
                            }
                            //第二个关系
                            if(vm.column.itemBodys[1].parentId!=0){
                                vm.item1=vm.column.itemBodys[1].parentId;
                                var parentId=vm.column.itemBodys[1].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName1=r.moduleName;
                                    vm.module1=vm.column.itemBodys[1].id;
                                });
                            }else{
                                vm.item = vm.column.itemBodys[1].id;
                            }
                            //第三个关系
                            if(vm.column.itemBodys[2].parentId!=0){
                                vm.item2=vm.column.itemBodys[2].parentId;
                                var parentId=vm.column.itemBodys[2].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName2=r.moduleName;
                                    vm.module2=vm.column.itemBodys[2].id;
                                });
                            }else{
                                vm.item2 = vm.column.itemBodys[2].id;
                            }
                            //第四个关系
                            if(vm.column.itemBodys[3].parentId!=0){
                                vm.item3=vm.column.itemBodys[3].parentId;
                                var parentId=vm.column.itemBodys[3].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName3=r.moduleName;
                                    vm.module3=vm.column.itemBodys[3].id;
                                });
                            }else{
                                vm.item3 = vm.column.itemBodys[3].id;
                            }
                            //第五个关系
                            if(vm.column.itemBodys[4].parentId!=0){
                                vm.item4=vm.column.itemBodys[4].parentId;
                                var parentId=vm.column.itemBodys[4].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName4=r.moduleName;
                                    vm.module4=vm.column.itemBodys[4].id;
                                });
                            }else{
                                vm.item4 = vm.column.itemBodys[4].id;
                            }
                            //第六个关系
                            if(vm.column.itemBodys[5].parentId!=0){
                                vm.item5=vm.column.itemBodys[5].parentId;
                                var parentId=vm.column.itemBodys[5].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName5=r.moduleName;
                                    vm.module5=vm.column.itemBodys[5].id;
                                });
                            }else{
                                vm.item5 = vm.column.itemBodys[5].id;
                            }
                            //第七个关系
                            if(vm.column.itemBodys[6].parentId!=0){
                                vm.item6=vm.column.itemBodys[6].parentId;
                                var parentId=vm.column.itemBodys[6].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName6=r.moduleName;
                                    vm.module6=vm.column.itemBodys[6].id;
                                });
                            }else{
                                vm.item6 = vm.column.itemBodys[6].id;
                            }
                        }

                        //含有八个项目关系
                        if(vm.column.itemBodys.length==8){
                            //第一个关系
                            if(vm.column.itemBodys[0].parentId!=0){
                                vm.item = vm.column.itemBodys[0].parentId;
                                console.log(vm.item)
                                var parentId = vm.column.itemBodys[0].parentId;
                                console.log(parentId)
                                $.getJSON(baseURL + "item/queryAllModuleName/" + parentId, function (r) {
                                    vm.moduleName = r.moduleName;
                                    vm.module = vm.column.itemBodys[0].id;
                                });
                            }else {
                                vm.item = vm.column.itemBodys[0].id;
                            }
                            //第二个关系
                            if(vm.column.itemBodys[1].parentId!=0){
                                vm.item1=vm.column.itemBodys[1].parentId;
                                var parentId=vm.column.itemBodys[1].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName1=r.moduleName;
                                    vm.module1=vm.column.itemBodys[1].id;
                                });
                            }else{
                                vm.item = vm.column.itemBodys[1].id;
                            }
                            //第三个关系
                            if(vm.column.itemBodys[2].parentId!=0){
                                vm.item2=vm.column.itemBodys[2].parentId;
                                var parentId=vm.column.itemBodys[2].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName2=r.moduleName;
                                    vm.module2=vm.column.itemBodys[2].id;
                                });
                            }else{
                                vm.item2 = vm.column.itemBodys[2].id;
                            }
                            //第四个关系
                            if(vm.column.itemBodys[3].parentId!=0){
                                vm.item3=vm.column.itemBodys[3].parentId;
                                var parentId=vm.column.itemBodys[3].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName3=r.moduleName;
                                    vm.module3=vm.column.itemBodys[3].id;
                                });
                            }else{
                                vm.item3 = vm.column.itemBodys[3].id;
                            }
                            //第五个关系
                            if(vm.column.itemBodys[4].parentId!=0){
                                vm.item4=vm.column.itemBodys[4].parentId;
                                var parentId=vm.column.itemBodys[4].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName4=r.moduleName;
                                    vm.module4=vm.column.itemBodys[4].id;
                                });
                            }else{
                                vm.item4 = vm.column.itemBodys[4].id;
                            }
                            //第六个关系
                            if(vm.column.itemBodys[5].parentId!=0){
                                vm.item5=vm.column.itemBodys[5].parentId;
                                var parentId=vm.column.itemBodys[5].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName5=r.moduleName;
                                    vm.module5=vm.column.itemBodys[5].id;
                                });
                            }else{
                                vm.item5 = vm.column.itemBodys[5].id;
                            }
                            //第七个关系
                            if(vm.column.itemBodys[6].parentId!=0){
                                vm.item6=vm.column.itemBodys[6].parentId;
                                var parentId=vm.column.itemBodys[6].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName6=r.moduleName;
                                    vm.module6=vm.column.itemBodys[6].id;
                                });
                            }else{
                                vm.item6 = vm.column.itemBodys[6].id;
                            }
                            //第八个关系
                            if(vm.column.itemBodys[7].parentId!=0){
                                vm.item7=vm.column.itemBodys[7].parentId;
                                var parentId=vm.column.itemBodys[7].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName7=r.moduleName;
                                    vm.module7=vm.column.itemBodys[7].id;
                                });
                            }else{
                                vm.item7 = vm.column.itemBodys[7].id;
                            }
                        }

                        //含有九个项目关系
                        if(vm.column.itemBodys.length==9){
                            //第一个关系
                            if(vm.column.itemBodys[0].parentId!=0){
                                vm.item = vm.column.itemBodys[0].parentId;
                                console.log(vm.item)
                                var parentId = vm.column.itemBodys[0].parentId;
                                console.log(parentId)
                                $.getJSON(baseURL + "item/queryAllModuleName/" + parentId, function (r) {
                                    vm.moduleName = r.moduleName;
                                    vm.module = vm.column.itemBodys[0].id;
                                });
                            }else {
                                vm.item = vm.column.itemBodys[0].id;
                            }
                            //第二个关系
                            if(vm.column.itemBodys[1].parentId!=0){
                                vm.item1=vm.column.itemBodys[1].parentId;
                                var parentId=vm.column.itemBodys[1].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName1=r.moduleName;
                                    vm.module1=vm.column.itemBodys[1].id;
                                });
                            }else{
                                vm.item = vm.column.itemBodys[1].id;
                            }
                            //第三个关系
                            if(vm.column.itemBodys[2].parentId!=0){
                                vm.item2=vm.column.itemBodys[2].parentId;
                                var parentId=vm.column.itemBodys[2].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName2=r.moduleName;
                                    vm.module2=vm.column.itemBodys[2].id;
                                });
                            }else{
                                vm.item2 = vm.column.itemBodys[2].id;
                            }
                            //第四个关系
                            if(vm.column.itemBodys[3].parentId!=0){
                                vm.item3=vm.column.itemBodys[3].parentId;
                                var parentId=vm.column.itemBodys[3].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName3=r.moduleName;
                                    vm.module3=vm.column.itemBodys[3].id;
                                });
                            }else{
                                vm.item3 = vm.column.itemBodys[3].id;
                            }
                            //第五个关系
                            if(vm.column.itemBodys[4].parentId!=0){
                                vm.item4=vm.column.itemBodys[4].parentId;
                                var parentId=vm.column.itemBodys[4].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName4=r.moduleName;
                                    vm.module4=vm.column.itemBodys[4].id;
                                });
                            }else{
                                vm.item4 = vm.column.itemBodys[4].id;
                            }
                            //第六个关系
                            if(vm.column.itemBodys[5].parentId!=0){
                                vm.item5=vm.column.itemBodys[5].parentId;
                                var parentId=vm.column.itemBodys[5].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName5=r.moduleName;
                                    vm.module5=vm.column.itemBodys[5].id;
                                });
                            }else{
                                vm.item5 = vm.column.itemBodys[5].id;
                            }
                            //第七个关系
                            if(vm.column.itemBodys[6].parentId!=0){
                                vm.item6=vm.column.itemBodys[6].parentId;
                                var parentId=vm.column.itemBodys[6].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName6=r.moduleName;
                                    vm.module6=vm.column.itemBodys[6].id;
                                });
                            }else{
                                vm.item6 = vm.column.itemBodys[6].id;
                            }
                            //第八个关系
                            if(vm.column.itemBodys[7].parentId!=0){
                                vm.item7=vm.column.itemBodys[7].parentId;
                                var parentId=vm.column.itemBodys[7].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName7=r.moduleName;
                                    vm.module7=vm.column.itemBodys[7].id;
                                });
                            }else{
                                vm.item7 = vm.column.itemBodys[7].id;
                            }
                            //第九个关系
                            if(vm.column.itemBodys[8].parentId!=0){
                                vm.item8=vm.column.itemBodys[8].parentId;
                                var parentId=vm.column.itemBodys[8].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName8=r.moduleName;
                                    vm.module8=vm.column.itemBodys[8].id;
                                });
                            }else{
                                vm.item8 = vm.column.itemBodys[8].id;
                            }
                        }

                        //含有十个项目关系
                        if(vm.column.itemBodys.length==10){
                            //第一个关系
                            if(vm.column.itemBodys[0].parentId!=0){
                                vm.item = vm.column.itemBodys[0].parentId;
                                console.log(vm.item)
                                var parentId = vm.column.itemBodys[0].parentId;
                                console.log(parentId)
                                $.getJSON(baseURL + "item/queryAllModuleName/" + parentId, function (r) {
                                    vm.moduleName = r.moduleName;
                                    vm.module = vm.column.itemBodys[0].id;
                                });
                            }else {
                                vm.item = vm.column.itemBodys[0].id;
                            }
                            //第二个关系
                            if(vm.column.itemBodys[1].parentId!=0){
                                vm.item1=vm.column.itemBodys[1].parentId;
                                var parentId=vm.column.itemBodys[1].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName1=r.moduleName;
                                    vm.module1=vm.column.itemBodys[1].id;
                                });
                            }else{
                                vm.item = vm.column.itemBodys[1].id;
                            }
                            //第三个关系
                            if(vm.column.itemBodys[2].parentId!=0){
                                vm.item2=vm.column.itemBodys[2].parentId;
                                var parentId=vm.column.itemBodys[2].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName2=r.moduleName;
                                    vm.module2=vm.column.itemBodys[2].id;
                                });
                            }else{
                                vm.item2 = vm.column.itemBodys[2].id;
                            }
                            //第四个关系
                            if(vm.column.itemBodys[3].parentId!=0){
                                vm.item3=vm.column.itemBodys[3].parentId;
                                var parentId=vm.column.itemBodys[3].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName3=r.moduleName;
                                    vm.module3=vm.column.itemBodys[3].id;
                                });
                            }else{
                                vm.item3 = vm.column.itemBodys[3].id;
                            }
                            //第五个关系
                            if(vm.column.itemBodys[4].parentId!=0){
                                vm.item4=vm.column.itemBodys[4].parentId;
                                var parentId=vm.column.itemBodys[4].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName4=r.moduleName;
                                    vm.module4=vm.column.itemBodys[4].id;
                                });
                            }else{
                                vm.item4 = vm.column.itemBodys[4].id;
                            }
                            //第六个关系
                            if(vm.column.itemBodys[5].parentId!=0){
                                vm.item5=vm.column.itemBodys[5].parentId;
                                var parentId=vm.column.itemBodys[5].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName5=r.moduleName;
                                    vm.module5=vm.column.itemBodys[5].id;
                                });
                            }else{
                                vm.item5 = vm.column.itemBodys[5].id;
                            }
                            //第七个关系
                            if(vm.column.itemBodys[6].parentId!=0){
                                vm.item6=vm.column.itemBodys[6].parentId;
                                var parentId=vm.column.itemBodys[6].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName6=r.moduleName;
                                    vm.module6=vm.column.itemBodys[6].id;
                                });
                            }else{
                                vm.item6 = vm.column.itemBodys[6].id;
                            }
                            //第八个关系
                            if(vm.column.itemBodys[7].parentId!=0){
                                vm.item7=vm.column.itemBodys[7].parentId;
                                var parentId=vm.column.itemBodys[7].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName7=r.moduleName;
                                    vm.module7=vm.column.itemBodys[7].id;
                                });
                            }else{
                                vm.item7 = vm.column.itemBodys[7].id;
                            }
                            //第九个关系
                            if(vm.column.itemBodys[8].parentId!=0){
                                vm.item8=vm.column.itemBodys[8].parentId;
                                var parentId=vm.column.itemBodys[8].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName8=r.moduleName;
                                    vm.module8=vm.column.itemBodys[8].id;
                                });
                            }else{
                                vm.item8 = vm.column.itemBodys[8].id;
                            }
                            //第十个关系
                            if(vm.column.itemBodys[9].parentId!=0){
                                vm.item9=vm.column.itemBodys[9].parentId;
                                var parentId=vm.column.itemBodys[9].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName9=r.moduleName;
                                    vm.module9=vm.column.itemBodys[9].id;
                                });
                            }else{
                                vm.item9 = vm.column.itemBodys[9].id;
                            }
                        }

                        //含有十一个项目关系
                        if(vm.column.itemBodys.length==11){
                            //第一个关系
                            if(vm.column.itemBodys[0].parentId!=0){
                                vm.item = vm.column.itemBodys[0].parentId;
                                console.log(vm.item)
                                var parentId = vm.column.itemBodys[0].parentId;
                                console.log(parentId)
                                $.getJSON(baseURL + "item/queryAllModuleName/" + parentId, function (r) {
                                    vm.moduleName = r.moduleName;
                                    vm.module = vm.column.itemBodys[0].id;
                                });
                            }else {
                                vm.item = vm.column.itemBodys[0].id;
                            }
                            //第二个关系
                            if(vm.column.itemBodys[1].parentId!=0){
                                vm.item1=vm.column.itemBodys[1].parentId;
                                var parentId=vm.column.itemBodys[1].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName1=r.moduleName;
                                    vm.module1=vm.column.itemBodys[1].id;
                                });
                            }else{
                                vm.item = vm.column.itemBodys[1].id;
                            }
                            //第三个关系
                            if(vm.column.itemBodys[2].parentId!=0){
                                vm.item2=vm.column.itemBodys[2].parentId;
                                var parentId=vm.column.itemBodys[2].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName2=r.moduleName;
                                    vm.module2=vm.column.itemBodys[2].id;
                                });
                            }else{
                                vm.item2 = vm.column.itemBodys[2].id;
                            }
                            //第四个关系
                            if(vm.column.itemBodys[3].parentId!=0){
                                vm.item3=vm.column.itemBodys[3].parentId;
                                var parentId=vm.column.itemBodys[3].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName3=r.moduleName;
                                    vm.module3=vm.column.itemBodys[3].id;
                                });
                            }else{
                                vm.item3 = vm.column.itemBodys[3].id;
                            }
                            //第五个关系
                            if(vm.column.itemBodys[4].parentId!=0){
                                vm.item4=vm.column.itemBodys[4].parentId;
                                var parentId=vm.column.itemBodys[4].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName4=r.moduleName;
                                    vm.module4=vm.column.itemBodys[4].id;
                                });
                            }else{
                                vm.item4 = vm.column.itemBodys[4].id;
                            }
                            //第六个关系
                            if(vm.column.itemBodys[5].parentId!=0){
                                vm.item5=vm.column.itemBodys[5].parentId;
                                var parentId=vm.column.itemBodys[5].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName5=r.moduleName;
                                    vm.module5=vm.column.itemBodys[5].id;
                                });
                            }else{
                                vm.item5 = vm.column.itemBodys[5].id;
                            }
                            //第七个关系
                            if(vm.column.itemBodys[6].parentId!=0){
                                vm.item6=vm.column.itemBodys[6].parentId;
                                var parentId=vm.column.itemBodys[6].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName6=r.moduleName;
                                    vm.module6=vm.column.itemBodys[6].id;
                                });
                            }else{
                                vm.item6 = vm.column.itemBodys[6].id;
                            }
                            //第八个关系
                            if(vm.column.itemBodys[7].parentId!=0){
                                vm.item7=vm.column.itemBodys[7].parentId;
                                var parentId=vm.column.itemBodys[7].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName7=r.moduleName;
                                    vm.module7=vm.column.itemBodys[7].id;
                                });
                            }else{
                                vm.item7 = vm.column.itemBodys[7].id;
                            }
                            //第九个关系
                            if(vm.column.itemBodys[8].parentId!=0){
                                vm.item8=vm.column.itemBodys[8].parentId;
                                var parentId=vm.column.itemBodys[8].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName8=r.moduleName;
                                    vm.module8=vm.column.itemBodys[8].id;
                                });
                            }else{
                                vm.item8 = vm.column.itemBodys[8].id;
                            }
                            //第十个关系
                            if(vm.column.itemBodys[9].parentId!=0){
                                vm.item9=vm.column.itemBodys[9].parentId;
                                var parentId=vm.column.itemBodys[9].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName9=r.moduleName;
                                    vm.module9=vm.column.itemBodys[9].id;
                                });
                            }else{
                                vm.item9 = vm.column.itemBodys[9].id;
                            }

                            //第十一个关系
                            if(vm.column.itemBodys[10].parentId!=0){
                                vm.item10=vm.column.itemBodys[10].parentId;
                                var parentId=vm.column.itemBodys[10].parentId;
                                $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                                    vm.moduleName10=r.moduleName;
                                    vm.module10=vm.column.itemBodys[10].id;
                                });
                            }else{
                                vm.item10 = vm.column.itemBodys[10].id;
                            }
                        }
                        //以上是更新项目关系代码

                    }
                });
        },
        saveOrUpdate: function () {
            console.log(vm.column)
            vm.column.create_partition_time = Number(vm.cPartitionTime)
            if(vm.validator()){
                return ;
            }
            vm.item_id={};
            vm.module_id={};
            if(vm.count==1){
                if(vm.monitor!=null&&vm.monitor!=""){
                    Vue.set(vm.monitorType,"a",vm.monitor);
                }
            }
            if(vm.count==2){
                if(vm.monitor!=null&&vm.monitor!=""){
                    Vue.set(vm.monitorType,"a",vm.monitor);
                }
                if(vm.monitor1!=null&&vm.monitor1!=""){
                    Vue.set(vm.monitorType,"a1",vm.monitor1);
                }

            }

            if(vm.count==3) {
                if(vm.monitor!=null&&vm.monitor!=""){
                    Vue.set(vm.monitorType,"a",vm.monitor);
                }
                if(vm.monitor1!=null&&vm.monitor1!=""){
                    Vue.set(vm.monitorType,"a1",vm.monitor1);
                }
                if(vm.monitor2!=null&&vm.monitor2!=""){
                    Vue.set(vm.monitorType,"a2",vm.monitor2);
                }
            }
            if(vm.countModule==1) {
                if(vm.item!=null&&vm.item!=""){
                    Vue.set(vm.item_id,"a",vm.item);
                }
                if(vm.module!=null&&vm.module!=""){
                    Vue.set(vm.module_id,"a",vm.module);
                }

            }

            if(vm.countModule==2) {
                if(vm.item!=null&&vm.item!=""){
                    Vue.set(vm.item_id,"a",vm.item);
                }
                if(vm.item1!=null&&vm.item1!=""){
                    Vue.set(vm.item_id,"a1",vm.item1);
                }
                if(vm.module!=null&&vm.module!=""){
                    Vue.set(vm.module_id,"a",vm.module);
                }
                if(vm.module1!=null&&vm.module1!=""){
                    Vue.set(vm.module_id,"a1",vm.module1);
                }

            }

            if(vm.countModule==3) {
                if(vm.item!=null&&vm.item!=""){
                    Vue.set(vm.item_id,"a",vm.item);
                }
                if(vm.item1!=null&&vm.item1!=""){
                    Vue.set(vm.item_id,"a1",vm.item1);
                }
                if(vm.module!=null&&vm.module!=""){
                    Vue.set(vm.module_id,"a",vm.module);
                }
                if(vm.module1!=null&&vm.module1!=""){
                    Vue.set(vm.module_id,"a1",vm.module1);
                }
                if(vm.item2!=null&&vm.item2!=""){
                    Vue.set(vm.item_id,"a2",vm.item2);
                }
                if(vm.module2!=null&&vm.module2!=""){
                    Vue.set(vm.module_id,"a2",vm.module2);
                }
            }

            if(vm.countModule==4) {
                if(vm.item!=null&&vm.item!=""){
                    Vue.set(vm.item_id,"a",vm.item);
                }
                if(vm.item1!=null&&vm.item1!=""){
                    Vue.set(vm.item_id,"a1",vm.item1);
                }
                if(vm.module!=null&&vm.module!=""){
                    Vue.set(vm.module_id,"a",vm.module);
                }
                if(vm.module1!=null&&vm.module1!=""){
                    Vue.set(vm.module_id,"a1",vm.module1);
                }
                if(vm.item2!=null&&vm.item2!=""){
                    Vue.set(vm.item_id,"a2",vm.item2);
                }
                if(vm.module2!=null&&vm.module2!=""){
                    Vue.set(vm.module_id,"a2",vm.module2);
                }
                if(vm.item3!=null&&vm.item3!=""){
                    Vue.set(vm.item_id,"a3",vm.item3);
                }
                if(vm.module3!=null&&vm.module3!=""){
                    Vue.set(vm.module_id,"a3",vm.module3);
                }
            }
            if(vm.countModule==5){
                if(vm.item!=null&&vm.item!=""){
                    Vue.set(vm.item_id,"a",vm.item);
                }
                if(vm.item1!=null&&vm.item1!=""){
                    Vue.set(vm.item_id,"a1",vm.item1);
                }
                if(vm.module!=null&&vm.module!=""){
                    Vue.set(vm.module_id,"a",vm.module);
                }
                if(vm.module1!=null&&vm.module1!=""){
                    Vue.set(vm.module_id,"a1",vm.module1);
                }
                if(vm.item2!=null&&vm.item2!=""){
                    Vue.set(vm.item_id,"a2",vm.item2);
                }
                if(vm.module2!=null&&vm.module2!=""){
                    Vue.set(vm.module_id,"a2",vm.module2);
                }
                if(vm.item3!=null&&vm.item3!=""){
                    Vue.set(vm.item_id,"a3",vm.item3);
                }
                if(vm.module3!=null&&vm.module3!=""){
                    Vue.set(vm.module_id,"a3",vm.module3);
                }
                if(vm.item4!=null&&vm.item4!=""){
                    Vue.set(vm.item_id,"a4",vm.item4);
                }
                if(vm.module4!=null&&vm.module4!=""){
                    Vue.set(vm.module_id,"a4",vm.module4);
                }
            }
            if(vm.countModule==6){
                if(vm.item!=null&&vm.item!=""){
                    Vue.set(vm.item_id,"a",vm.item);
                }
                if(vm.item1!=null&&vm.item1!=""){
                    Vue.set(vm.item_id,"a1",vm.item1);
                }
                if(vm.module!=null&&vm.module!=""){
                    Vue.set(vm.module_id,"a",vm.module);
                }
                if(vm.module1!=null&&vm.module1!=""){
                    Vue.set(vm.module_id,"a1",vm.module1);
                }
                if(vm.item2!=null&&vm.item2!=""){
                    Vue.set(vm.item_id,"a2",vm.item2);
                }
                if(vm.module2!=null&&vm.module2!=""){
                    Vue.set(vm.module_id,"a2",vm.module2);
                }
                if(vm.item3!=null&&vm.item3!=""){
                    Vue.set(vm.item_id,"a3",vm.item3);
                }
                if(vm.module3!=null&&vm.module3!=""){
                    Vue.set(vm.module_id,"a3",vm.module3);
                }
                if(vm.item4!=null&&vm.item4!=""){
                    Vue.set(vm.item_id,"a4",vm.item4);
                }
                if(vm.module4!=null&&vm.module4!=""){
                    Vue.set(vm.module_id,"a4",vm.module4);
                }

                if(vm.item5!=null&&vm.item5!=""){
                    Vue.set(vm.item_id,"a5",vm.item5);
                }
                if(vm.module5!=null&&vm.module5!=""){
                    Vue.set(vm.module_id,"a5",vm.module5);
                }
            }
            if(vm.countModule==7){
                if(vm.item!=null&&vm.item!=""){
                    Vue.set(vm.item_id,"a",vm.item);
                }
                if(vm.item1!=null&&vm.item1!=""){
                    Vue.set(vm.item_id,"a1",vm.item1);
                }
                if(vm.module!=null&&vm.module!=""){
                    Vue.set(vm.module_id,"a",vm.module);
                }
                if(vm.module1!=null&&vm.module1!=""){
                    Vue.set(vm.module_id,"a1",vm.module1);
                }
                if(vm.item2!=null&&vm.item2!=""){
                    Vue.set(vm.item_id,"a2",vm.item2);
                }
                if(vm.module2!=null&&vm.module2!=""){
                    Vue.set(vm.module_id,"a2",vm.module2);
                }
                if(vm.item3!=null&&vm.item3!=""){
                    Vue.set(vm.item_id,"a3",vm.item3);
                }
                if(vm.module3!=null&&vm.module3!=""){
                    Vue.set(vm.module_id,"a3",vm.module3);
                }
                if(vm.item4!=null&&vm.item4!=""){
                    Vue.set(vm.item_id,"a4",vm.item4);
                }
                if(vm.module4!=null&&vm.module4!=""){
                    Vue.set(vm.module_id,"a4",vm.module4);
                }

                if(vm.item5!=null&&vm.item5!=""){
                    Vue.set(vm.item_id,"a5",vm.item5);
                }
                if(vm.module5!=null&&vm.module5!=""){
                    Vue.set(vm.module_id,"a5",vm.module5);
                }

                if(vm.item6!=null&&vm.item6!=""){
                    Vue.set(vm.item_id,"a6",vm.item6);
                }
                if(vm.module6!=null&&vm.module6!=""){
                    Vue.set(vm.module_id,"a6",vm.module6);
                }
            }
            if(vm.countModule==8){
                if(vm.item!=null&&vm.item!=""){
                    Vue.set(vm.item_id,"a",vm.item);
                }
                if(vm.item1!=null&&vm.item1!=""){
                    Vue.set(vm.item_id,"a1",vm.item1);
                }
                if(vm.module!=null&&vm.module!=""){
                    Vue.set(vm.module_id,"a",vm.module);
                }
                if(vm.module1!=null&&vm.module1!=""){
                    Vue.set(vm.module_id,"a1",vm.module1);
                }
                if(vm.item2!=null&&vm.item2!=""){
                    Vue.set(vm.item_id,"a2",vm.item2);
                }
                if(vm.module2!=null&&vm.module2!=""){
                    Vue.set(vm.module_id,"a2",vm.module2);
                }
                if(vm.item3!=null&&vm.item3!=""){
                    Vue.set(vm.item_id,"a3",vm.item3);
                }
                if(vm.module3!=null&&vm.module3!=""){
                    Vue.set(vm.module_id,"a3",vm.module3);
                }
                if(vm.item4!=null&&vm.item4!=""){
                    Vue.set(vm.item_id,"a4",vm.item4);
                }
                if(vm.module4!=null&&vm.module4!=""){
                    Vue.set(vm.module_id,"a4",vm.module4);
                }

                if(vm.item5!=null&&vm.item5!=""){
                    Vue.set(vm.item_id,"a5",vm.item5);
                }
                if(vm.module5!=null&&vm.module5!=""){
                    Vue.set(vm.module_id,"a5",vm.module5);
                }

                if(vm.item6!=null&&vm.item6!=""){
                    Vue.set(vm.item_id,"a6",vm.item6);
                }
                if(vm.module6!=null&&vm.module6!=""){
                    Vue.set(vm.module_id,"a6",vm.module6);
                }

                if(vm.item7!=null&&vm.item7!=""){
                    Vue.set(vm.item_id,"a7",vm.item7);
                }
                if(vm.module7!=null&&vm.module7!=""){
                    Vue.set(vm.module_id,"a7",vm.module7);
                }
            }
            if(vm.countModule==9){
                if(vm.item!=null&&vm.item!=""){
                    Vue.set(vm.item_id,"a",vm.item);
                }
                if(vm.item1!=null&&vm.item1!=""){
                    Vue.set(vm.item_id,"a1",vm.item1);
                }
                if(vm.module!=null&&vm.module!=""){
                    Vue.set(vm.module_id,"a",vm.module);
                }
                if(vm.module1!=null&&vm.module1!=""){
                    Vue.set(vm.module_id,"a1",vm.module1);
                }
                if(vm.item2!=null&&vm.item2!=""){
                    Vue.set(vm.item_id,"a2",vm.item2);
                }
                if(vm.module2!=null&&vm.module2!=""){
                    Vue.set(vm.module_id,"a2",vm.module2);
                }
                if(vm.item3!=null&&vm.item3!=""){
                    Vue.set(vm.item_id,"a3",vm.item3);
                }
                if(vm.module3!=null&&vm.module3!=""){
                    Vue.set(vm.module_id,"a3",vm.module3);
                }
                if(vm.item4!=null&&vm.item4!=""){
                    Vue.set(vm.item_id,"a4",vm.item4);
                }
                if(vm.module4!=null&&vm.module4!=""){
                    Vue.set(vm.module_id,"a4",vm.module4);
                }

                if(vm.item5!=null&&vm.item5!=""){
                    Vue.set(vm.item_id,"a5",vm.item5);
                }
                if(vm.module5!=null&&vm.module5!=""){
                    Vue.set(vm.module_id,"a5",vm.module5);
                }

                if(vm.item6!=null&&vm.item6!=""){
                    Vue.set(vm.item_id,"a6",vm.item6);
                }
                if(vm.module6!=null&&vm.module6!=""){
                    Vue.set(vm.module_id,"a6",vm.module6);
                }

                if(vm.item7!=null&&vm.item7!=""){
                    Vue.set(vm.item_id,"a7",vm.item7);
                }
                if(vm.module7!=null&&vm.module7!=""){
                    Vue.set(vm.module_id,"a7",vm.module7);
                }

                if(vm.item8!=null&&vm.item8!=""){
                    Vue.set(vm.item_id,"a8",vm.item8);
                }
                if(vm.module8!=null&&vm.module8!=""){
                    Vue.set(vm.module_id,"a8",vm.module8);
                }
            }
            if(vm.countModule==10){
                if(vm.item!=null&&vm.item!=""){
                    Vue.set(vm.item_id,"a",vm.item);
                }
                if(vm.item1!=null&&vm.item1!=""){
                    Vue.set(vm.item_id,"a1",vm.item1);
                }
                if(vm.module!=null&&vm.module!=""){
                    Vue.set(vm.module_id,"a",vm.module);
                }
                if(vm.module1!=null&&vm.module1!=""){
                    Vue.set(vm.module_id,"a1",vm.module1);
                }
                if(vm.item2!=null&&vm.item2!=""){
                    Vue.set(vm.item_id,"a2",vm.item2);
                }
                if(vm.module2!=null&&vm.module2!=""){
                    Vue.set(vm.module_id,"a2",vm.module2);
                }
                if(vm.item3!=null&&vm.item3!=""){
                    Vue.set(vm.item_id,"a3",vm.item3);
                }
                if(vm.module3!=null&&vm.module3!=""){
                    Vue.set(vm.module_id,"a3",vm.module3);
                }
                if(vm.item4!=null&&vm.item4!=""){
                    Vue.set(vm.item_id,"a4",vm.item4);
                }
                if(vm.module4!=null&&vm.module4!=""){
                    Vue.set(vm.module_id,"a4",vm.module4);
                }

                if(vm.item5!=null&&vm.item5!=""){
                    Vue.set(vm.item_id,"a5",vm.item5);
                }
                if(vm.module5!=null&&vm.module5!=""){
                    Vue.set(vm.module_id,"a5",vm.module5);
                }

                if(vm.item6!=null&&vm.item6!=""){
                    Vue.set(vm.item_id,"a6",vm.item6);
                }
                if(vm.module6!=null&&vm.module6!=""){
                    Vue.set(vm.module_id,"a6",vm.module6);
                }

                if(vm.item7!=null&&vm.item7!=""){
                    Vue.set(vm.item_id,"a7",vm.item7);
                }
                if(vm.module7!=null&&vm.module7!=""){
                    Vue.set(vm.module_id,"a7",vm.module7);
                }

                if(vm.item8!=null&&vm.item8!=""){
                    Vue.set(vm.item_id,"a8",vm.item8);
                }
                if(vm.module8!=null&&vm.module8!=""){
                    Vue.set(vm.module_id,"a8",vm.module8);
                }

                if(vm.item9!=null&&vm.item9!=""){
                    Vue.set(vm.item_id,"a9",vm.item9);
                }
                if(vm.module9!=null&&vm.module9!=""){
                    Vue.set(vm.module_id,"a9",vm.module9);
                }
            }
            if(vm.countModule==11){
                if(vm.item!=null&&vm.item!=""){
                    Vue.set(vm.item_id,"a",vm.item);
                }
                if(vm.item1!=null&&vm.item1!=""){
                    Vue.set(vm.item_id,"a1",vm.item1);
                }
                if(vm.module!=null&&vm.module!=""){
                    Vue.set(vm.module_id,"a",vm.module);
                }
                if(vm.module1!=null&&vm.module1!=""){
                    Vue.set(vm.module_id,"a1",vm.module1);
                }
                if(vm.item2!=null&&vm.item2!=""){
                    Vue.set(vm.item_id,"a2",vm.item2);
                }
                if(vm.module2!=null&&vm.module2!=""){
                    Vue.set(vm.module_id,"a2",vm.module2);
                }
                if(vm.item3!=null&&vm.item3!=""){
                    Vue.set(vm.item_id,"a3",vm.item3);
                }
                if(vm.module3!=null&&vm.module3!=""){
                    Vue.set(vm.module_id,"a3",vm.module3);
                }
                if(vm.item4!=null&&vm.item4!=""){
                    Vue.set(vm.item_id,"a4",vm.item4);
                }
                if(vm.module4!=null&&vm.module4!=""){
                    Vue.set(vm.module_id,"a4",vm.module4);
                }

                if(vm.item5!=null&&vm.item5!=""){
                    Vue.set(vm.item_id,"a5",vm.item5);
                }
                if(vm.module5!=null&&vm.module5!=""){
                    Vue.set(vm.module_id,"a5",vm.module5);
                }

                if(vm.item6!=null&&vm.item6!=""){
                    Vue.set(vm.item_id,"a6",vm.item6);
                }
                if(vm.module6!=null&&vm.module6!=""){
                    Vue.set(vm.module_id,"a6",vm.module6);
                }

                if(vm.item7!=null&&vm.item7!=""){
                    Vue.set(vm.item_id,"a7",vm.item7);
                }
                if(vm.module7!=null&&vm.module7!=""){
                    Vue.set(vm.module_id,"a7",vm.module7);
                }

                if(vm.item8!=null&&vm.item8!=""){
                    Vue.set(vm.item_id,"a8",vm.item8);
                }
                if(vm.module8!=null&&vm.module8!=""){
                    Vue.set(vm.module_id,"a8",vm.module8);
                }

                if(vm.item9!=null&&vm.item9!=""){
                    Vue.set(vm.item_id,"a9",vm.item9);
                }
                if(vm.module9!=null&&vm.module9!=""){
                    Vue.set(vm.module_id,"a9",vm.module9);
                }
                if(vm.item10!=null&&vm.item10!=""){
                    Vue.set(vm.item_id,"a10",vm.item10);
                }
                if(vm.module10!=null&&vm.module10!=""){
                    Vue.set(vm.module_id,"a10",vm.module10);
                }
            }
            var url;
            if(vm.column.cid == null){
                url="yiche/column/insert";
                vm.column.monitorType=vm.monitorType;
                vm.column.itemId=vm.item_id;
                vm.column.moduleId=vm.module_id;
            }else{
                url="yiche/column/update";
                vm.column.itemId=vm.item_id;
                vm.column.moduleId=vm.module_id;
            }
            // var url = vm.column.cid == null ? "yiche/column/insert" : "yiche/column/update";
            vm.column.cmonitor_type=vm.monitor

            if(vm.chooseAlarmGroupItem == null || vm.chooseAlarmGroupItem == ""){
                alert("请选择报警组")
                return true;
            }

            vm.column.alarmUniqueid = vm.chooseAlarmGroupItem.uniqueId;

            console.log(vm.column);

            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.column),
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

        del: function () {
            var jobIds = getSelectedRows();
            if(jobIds == null){
                return ;
            }
            confirm('确定要删除选中的记录？', function(){
                $.ajax({
                    type: "POST",
                    url: baseURL + "yiche/column/delete",
                    contentType: "application/json",
                    data: JSON.stringify(jobIds),
                    success: function(r){
                        if(r.code == 0){
                            alert('操作成功', function(){
                                vm.reload();
                                location.reload();
                            });
                        }else{
                            alert(r.msg);
                        }
                    }
                });
            });
        },
        reload: function (event) {
            vm.showList = true;
            var page = $("#jqGrid").jqGrid('getGridParam','page');
            $("#jqGrid").jqGrid('setGridParam',{
                postData:{'ctable_name': vm.q.ctable_name,'cid':vm.q.cid,'itemid':vm.itemid,'moduleid':vm.moduleid},
                page:page
            }).trigger("reloadGrid");
        },
        checks:function () {
            if(vm.count>4){
                alert("该类型一次最多添加4组数据")
                return true;
            }
        },
        checksModule:function () {
            if(vm.countModule>10){
                vm.countModule=vm.countModule-1;
                alert("该类型一次最多添加10组数据")
                return true;
            }
        },
        validator: function () {
            // if(isBlank(vm.column.cmonitor_type)){
            //     alert("监控类型不能为空");
            //     return true;
            // }

            var checkcreateTime=/^[0-1]$/;
            // if(!checkcreateTime.test(vm.column.create_partition_time)){
            //     alert("分区生成时间格式不正确")
            //     return true;
            // }
            // if(isBlank(vm.column.calarm_type)){
            //     alert("报警方式不能为空");
            //     return true;
            // }

            if(isBlank(vm.column.cowner)){
                alert("负责人不能为空");
                return true;
            }

            if(isBlank(vm.column.partition_type)){
                alert("监控周期不能为空");
                return true;
            }
            if(isBlank(vm.column.ccontent)){
                alert("通知内容不能为空");
                return true;
            }
            var checkReciever=/^([a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+\|([0-9])+\,)*([a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+\|([0-9])+)?$/;
            if(!isBlank(vm.column.alarmman)){
                if(!checkReciever.test(vm.column.alarmman)){
                    alert("接收人格式不正确");
                    return true;
                }
            }
            if(this.error1 === true || this.error2 === true || this.error3 === true) {
                alert("监控范围格式有误");
                return true;
            }
        }
    }
});

function setChooseAlarmGroup(){
    var uniqueId = document.getElementById("selAlarmGroupId").value;
    $.getJSON(baseURL + "alarm_group_manager/query_by_uniqueid?uniqueid="+uniqueId, function(r){
        vm.chooseAlarmGroupItem = r.group;
    });
}

function setValueItem(){
    console.log("aaa")
    var parentId=document.getElementById("selt1").value;
    console.log(parentId)
    $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
        vm.moduleName=r.moduleName;
    });
}
function setValueItem1(){
    var parentId=document.getElementById("selt2").value;
    $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
        vm.moduleName1=r.moduleName;
    });
}
function setValueItem2(){
    var parentId=document.getElementById("selt3").value;
    $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
        vm.moduleName2=r.moduleName;
    });
}
function setValueItem3(){
    var parentId=document.getElementById("selt4").value;
    $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
        vm.moduleName3=r.moduleName;
    });
}
function setValueItem4(){
    var parentId=document.getElementById("selt5").value;
    $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
        vm.moduleName4=r.moduleName;
    });
}
function setValueItem5(){
    var parentId=document.getElementById("selt6").value;
    $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
        vm.moduleName5=r.moduleName;
    });
}
function setValueItem6(){
    var parentId=document.getElementById("selt7").value;
    $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
        vm.moduleName6=r.moduleName;
    });
}
function setValueItem7(){
    var parentId=document.getElementById("selt8").value;
    $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
        vm.moduleName7=r.moduleName;
    });
}
function setValueItem8(){
    var parentId=document.getElementById("selt9").value;
    $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
        vm.moduleName8=r.moduleName;
    });
}
function setValueItem9(){
    var parentId=document.getElementById("selt10").value;
    $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
        vm.moduleName9=r.moduleName;
    });
}
function setValueItem10(){
    var parentId=document.getElementById("selt11").value;
    $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
        vm.moduleName9=r.moduleName;
    });
}


function setCycle(){
    var setCycle=document.getElementById("setCyle").value;
    if(setCycle=="月"){
        $("#dayh").prop("style","display:none");
        $("#monthh").prop("style","display:block");
        $("#dayt").prop("style","display:none");
        $("#montht").prop("style","display:block");
    }else {
        $("#dayh").prop("style","display:block");
        $("#monthh").prop("style","display:none");
        $("#dayt").prop("style","display:block");
        $("#montht").prop("style","display:none");
    }
}
function start(id){
    $.get(baseURL + "yiche/alarm/startCRuler/"+id, function(r) {
        alert(r.message);
    })
}
$(function () {
    $.getJSON(baseURL + "sys/user/info", function(r){
        vm.user = r.user;
    });
    $.getJSON(baseURL + "item/queryAllItemName", function(r){
        vm.itemName = r.itemName;
    });
    $.getJSON(baseURL + "alarm_group_manager/list_by_tagname", function(r){
        vm.alarmGroups = r.list;
    });

    // emitModule:function() {     //二级菜单触发模块列表
    //     var id = document.getElementById("project").value
    //     this.selectedProjectId = id;
    //     $.getJSON(baseURL + "item/getAllModuleC/" + id, function(r){
    //         vm.cQueryModuleName=r.allModuleC;
    //     });
    // },
    // queryProjectName:function() {   //查询项目
    $.getJSON(baseURL + "item/getAllItemC", function(r) {
        vm.cProjectName = r.allItemC;
    });
    // },
    // getModule:function() {    //选中的模块
    //     var id = document.getElementById("module").value;
    //     this.selectedModuleId = id;
    // },
    // querydbName:function() {  //查询数据库
    $.get(baseURL + "yiche/column/queryCDbName", function (r) {
        vm.cDatabaseName = r.cDbName;
    });
    // },
    // queryOwner:function() { //查询负责人
    $.getJSON(baseURL + "yiche/column/queryCOwner", function(r){
        vm.cOwner = r.cOwner;
    });
    // },
})