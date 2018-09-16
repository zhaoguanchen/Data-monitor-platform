$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'yiche/table/queryAll',
        datatype: "json",
        colModel: [
            { label: 'ID', name: 'tId', width: 100, key: true,hidden:true },
            { label: '编号', name: 'number', width: 40, },
            { label: '库名称', name: 'database_name', width: 100 },
            { label: '表名称', name: 'table_name', width: 180 },
            { label: '监控类型', name: 'monitor_type', width: 60 },
            { label: '通知内容', name: 'content', width: 160 },
            { label: '筛选条件', name: 'tabcondition', width: 100 },
            { label: '负责人', name: 'tabowner', width: 70 },
            { label: '状态', name: 'status', width: 100, formatter:editStatus},
            { label: '报警组名称', name: 'alarmGroupName', width: 200},
            { label: '创建时间', name: 'create_time', width: 130 },
            { label: '日环比', name: 'h_compare', width: 100 ,hidden:true},
            { label: '周同比', name: 't_compare', width: 100,hidden:true },
            { label: '本身', name: 'self', width: 100,hidden:true },
            { label: '7天均值', name: 'seven_wave_avg', width: 100,hidden:true},
            { label: '影响范围 ', name: 'itemName', width: 100 ,hidden:true},
            { label: '分区时间', name: 'create_partition_time', width: 100 ,hidden:true},
            { label: '注释', name: 'remark', width: 100,hidden:true },
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
        rowList : [30,50,100],
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

var vm = new Vue({
    el:'#rrapp',
    data:{
        // ids:[],
        tid:[],
        // tabowner:[],
        a:{},
        iditem:[],
        idmodule:[],
        count:1,
        // countItem:1,
        countModule:1,
        monitorType:{},
        monitor:[],
        monitor1:[],
        monitor2:[],
        monitor3:[],
        itemName:[],
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
        database_name:[],
        table_name: [],
        showList: true,
        showItem: true,
        showItems: true,
        title: null,
        select:'selected',
        table: {

        },
        user:{},
        databaseName:[],   //数据库名称
        projectName:[],   //项目名称
        selectedProject:"",  // 选中的项目名称
        selectedProjectId:0, //选中的项目名称ID
        queryModuleName:[],  //  模块名称
        selectedDatabase:"",  //选中的数据库名称
        selectedModuleName:"",  //选中的模块名称
        selectedModuleId:0,//选中的模块名称ID
        owner:[],//负责人
        selectedOwner:"",  //选中的负责人
        error1:false,  //错误提示
        error2:false,//错误提示
        error3:false,//错误提示
        error4:false,//错误提示
        showRule1:false, //展示规则
        showRule2:false,
        showRule3:false,
        showRule4:false,
        partitionTime:1,
        alarmGroups:[],
        chooseAlarmGroupItem: ""
    },
    created:function() {
        this.querydbName()
        this.queryProjectName()
        this.queryOwner()
    },
    methods: {
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
            vm.showList = true;
            console.log(vm.selectedDatabase,vm.table_name,vm.selectedProjectId,vm.selectedModuleId,vm.selectedOwner,vm.tid)
            var page = $("#jqGrid").jqGrid('getGridParam','page');
            $("#jqGrid").jqGrid('setGridParam',{
                postData:{'databaseName':vm.selectedDatabase,'table_name': vm.table_name,'itemid':vm.selectedProjectId,'moduleid':vm.selectedModuleId,'towner':vm.selectedOwner,'tid':vm.tid},
                // postData:{'table_name': vm.table_name,'tid':vm.tid,'itemid':vm.itemid,'moduleid':vm.moduleid},
                page:page
            }).trigger("reloadGrid");
        },
        validation1:function() {  //验证本身
            if(document.getElementById("select").selectedIndex !== 1) {
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
            } else {
                this.error1 =false
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
        validation3:function() {  ////验证同比
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
        validation4:function() {  //验证波动
            var inputValue = document.getElementById("sevenDay").value;
            var str = inputValue.replace(/(^\s*)|(\s*$)/g,"")
            if(!/\s/g.test(str)) {
                if((str.indexOf("|") === str.lastIndexOf("|")) && str.indexOf("|") !== -1) {
                    var firstHalfOr = inputValue.substring(0,str.indexOf("|"));
                    var afterHalfOr = inputValue.substring(str.indexOf("|") +1);
                    if(/^(\(-?\d+%?,-?\d+%?\))$/.test(firstHalfOr) || /^(\[-?\d+%?,-?\d+%?\))$/.test(firstHalfOr) || /^(\(-?\d+%?,-?\d+%?\])$/.test(firstHalfOr) || /^(\[-?\d+%?,-?\d+%?\])$/.test(firstHalfOr) || /^(\(-?\d+%?,\))$/.test(firstHalfOr) || /^(\[-?\d+%?,\))$/.test(firstHalfOr) || /^(\(,-?\d+%?\))$/.test(firstHalfOr) || /^(\(,-?\d+%?\])$/.test(firstHalfOr) || /^(!\{-?\d+%?\})$/.test(firstHalfOr)) {
                        if(/^(\(-?\d+%?,-?\d+%?\))$/.test(afterHalfOr) || /^(\[-?\d+%?,-?\d+%?\))$/.test(afterHalfOr) || /^(\(-?\d+%?,-?\d+%?\])$/.test(afterHalfOr) || /^(\[-?\d+%?,-?\d+%?\])$/.test(afterHalfOr) || /^(\(-?\d+%?,\))$/.test(afterHalfOr) || /^(\[-?\d+%?,\))$/.test(afterHalfOr) || /^(\(,-?\d+%?\))$/.test(afterHalfOr) || /^(\(,-?\d+%?\])$/.test(afterHalfOr) || /^(!\{-?\d+%?\})$/.test(afterHalfOr)) {
                            this.error4 = false
                        } else {
                            this.error4 = true
                        }
                    } else {
                        this.error4 = true
                    }
                } else if((str.indexOf("&") === str.lastIndexOf("&")) && str.indexOf("&") !== -1) {
                    var firstHalfAnd = inputValue.substring(0,str.indexOf("&"));
                    var afterHalfAnd = inputValue.substring(str.indexOf("&") +1);
                    if(/^(\(-?\d+%?,-?\d+%?\))$/.test(firstHalfAnd) || /^(\[-?\d+%?,-?\d+%?\))$/.test(firstHalfAnd) || /^(\(-?\d+%?,-?\d+%?\])$/.test(firstHalfAnd) || /^(\[-?\d+%?,-?\d+%?\])$/.test(firstHalfAnd) || /^(\(-?\d+%?,\))$/.test(firstHalfAnd) || /^(\[-?\d+%?,\))$/.test(firstHalfAnd) || /^(\(,-?\d+%?\))$/.test(firstHalfAnd) || /^(\(,-?\d+%?\])$/.test(firstHalfAnd) || /^(!\{-?\d+%?\})$/.test(firstHalfAnd)) {
                        if(/^(\(-?\d+%?,-?\d+%?\))$/.test(afterHalfAnd) || /^(\[-?\d+%?,-?\d+%?\))$/.test(afterHalfAnd) || /^(\(-?\d+%?,-?\d+%?\])$/.test(afterHalfAnd) || /^(\[-?\d+%?,-?\d+%?\])$/.test(afterHalfAnd) || /^(\(-?\d+%?,\))$/.test(afterHalfAnd) || /^(\[-?\d+%?,\))$/.test(afterHalfAnd) || /^(\(,-?\d+%?\))$/.test(afterHalfAnd) || /^(\(,-?\d+%?\])$/.test(afterHalfAnd) || /^(!\{-?\d+%?\})$/.test(afterHalfAnd)) {
                            this.error4 = false
                        } else {
                            this.error4 = true
                        }
                    } else {
                        this.error4 = true
                    }
                } else if(str === "") {
                    this.error4 = false
                }  else {
                    if(/^(\(-?\d+%?,-?\d+%?\))$/.test(str) || /^(\[-?\d+%?,-?\d+%?\))$/.test(str) || /^(\(-?\d+%?,-?\d+%?\])$/.test(str) || /^(\[-?\d+%?,-?\d+%?\])$/.test(str) || /^(\(-?\d+%?,\))$/.test(str) || /^(\[-?\d+%?,\))$/.test(str) || /^(\(,-?\d+%?\))$/.test(str) || /^(\(,-?\d+%?\])$/.test(str) || /^(!\{-?\d+%?\})$/.test(str)) {
                        this.error4 = false
                    } else {
                        this.error4 = true
                    }
                }
            } else {
                this.error4 = true
            }
        },
        controlInput:function() {  // 勾选完成时间，则环比、同比、波动不可输入；
            if(document.getElementById("select").selectedIndex === 1) {
                this.error1 = false
                this.error2 = false
                this.error3 = false
                this.error4 = false
                this.table.h_compare =""
                this.table.t_compare = ""
                this.table.seven_wave_avg = ""
                document.getElementById("dayAdd").disabled = "disabled"
                document.getElementById("dayAdd").style.backgroundColor = "#F7F7F7"
                document.getElementById("week").disabled = "disabled"
                document.getElementById("week").style.backgroundColor = "#F7F7F7"
                document.getElementById("sevenDay").disabled = "disabled"
                document.getElementById("sevenDay").style.backgroundColor = "#F7F7F7"
            } else  {
                this.error1 = false
                this.error2 = false
                this.error3 = false
                this.error4 = false
                document.getElementById("dayAdd").removeAttribute("disabled")
                document.getElementById("dayAdd").style.backgroundColor = ""
                document.getElementById("week").removeAttribute("disabled")
                document.getElementById("week").style.backgroundColor = ""
                document.getElementById("sevenDay").removeAttribute("disabled")
                document.getElementById("sevenDay").style.backgroundColor = ""
            }
        },
        emitModule:function() {    //二级菜单触发模块列表
            var id = document.getElementById("project").value
            this.selectedProjectId = id;
            $.getJSON(baseURL + "item/getAllModuleT/" + id, function(r){
                vm.queryModuleName=r.allModuleT;
            });
        },
        getModule:function() {  //选中的模块
            var id = document.getElementById("module").value;
            this.selectedModuleId = id;
        },
        querydbName:function() {  //查询数据库
            $.get(baseURL + "yiche/table/queryTabDbName", function (r) {
                vm.databaseName = r.tabDbName;
            });
        },
        queryProjectName:function() {   //查询项目
            $.getJSON(baseURL + "item/getAllItemT", function(r) {
                vm.projectName = r.allItemT;
            });
        },
        queryOwner:function() { //查询负责人
            $.getJSON(baseURL + "yiche/table/queryTabOwner", function(r){
                vm.owner = r.tOwner;
            });
        },
        query: function () {
            vm.reload();
        },
        queryMessage: function(){
            if(vm.table.database_name==null||vm.table.table_name==null){
                alert("库名和表名不能为空")
                return true;
            }else{
                $.ajax({
                    type:"post",
                    url:baseURL +"yiche/oozie/getInfo",
                    dataType: "JSON",
                    data: { dbName:vm.table.database_name,tblName:vm.table.table_name},
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
                            alert("获取"+r.message.length+"条表血缘关系")
                        }

                    }
                })

            }
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
            vm.title = "新增";
            vm.table = {};
            vm.table.tabowner=vm.user.username;
            vm.count=1;
            vm.countModule=1;
            vm.item_id={};
            vm.module_id={};
        },
        // class="select_component"
        addselect:function () {
            vm.count=vm.count+1;
            if(vm.checks()){
                return;
            }
        },
        addmodule:function () {
            vm.countModule=vm.countModule+1;
            console.log(vm.countModule)
            if(vm.checksModule()){
                return;
            }
        },
        deletemodule:function(){
            // vm.countModule=4;
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
            $.get(baseURL + "yiche/table/queryById/"+jobId, function(r){
                vm.showList = false;
                // vm.showItem = false;
                vm.title = "修改";
                vm.table = r.table;
                if(vm.table.partition_type==null&&vm.table.partition_type==""){
                    vm.table.partition_type="日";
                }
                vm.monitor=vm.table.monitor_type;
                vm.count=1;

                // 以下是更新项目关系代码
                vm.countModule=vm.table.itemBodys.length;
                //含有一个项目关系
                if(vm.table.itemBodys.length==1) {
                    //第一个关系
                    if(vm.table.itemBodys[0].parentId!=0){
                        vm.item = vm.table.itemBodys[0].parentId;
                        var parentId = vm.table.itemBodys[0].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/" + parentId, function (r) {
                            vm.moduleName = r.moduleName;
                            vm.module = vm.table.itemBodys[0].id;
                        });
                    }else {
                        vm.item = vm.table.itemBodys[0].id;
                    }

                }

                //含有两个项目关系
                if(vm.table.itemBodys.length==2){
                    //第一个关系
                    if(vm.table.itemBodys[0].parentId!=0){
                        vm.item = vm.table.itemBodys[0].parentId;
                        console.log(vm.item)
                        var parentId = vm.table.itemBodys[0].parentId;
                        console.log(parentId)
                        $.getJSON(baseURL + "item/queryAllModuleName/" + parentId, function (r) {
                            vm.moduleName = r.moduleName;
                            vm.module = vm.table.itemBodys[0].id;
                        });
                    }else {
                        vm.item = vm.table.itemBodys[0].id;
                    }
                    //第二个关系
                    if(vm.table.itemBodys[1].parentId!=0){
                        vm.item1=vm.table.itemBodys[1].parentId;
                        var parentId=vm.table.itemBodys[1].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName1=r.moduleName;
                            vm.module1=vm.table.itemBodys[1].id;
                        });
                    }else{
                        vm.item1 = vm.table.itemBodys[1].id;
                    }
                }

                //含有三个项目关系
                if(vm.table.itemBodys.length==3){
                    //第一个关系
                    if(vm.table.itemBodys[0].parentId!=0){
                        vm.item = vm.table.itemBodys[0].parentId;
                        var parentId = vm.table.itemBodys[0].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/" + parentId, function (r) {
                            vm.moduleName = r.moduleName;
                            vm.module = vm.table.itemBodys[0].id;
                        });
                    }else {
                        vm.item = vm.table.itemBodys[0].id;
                    }
                    //第二个关系
                    if(vm.table.itemBodys[1].parentId!=0){
                        vm.item1=vm.table.itemBodys[1].parentId;
                        var parentId=vm.table.itemBodys[1].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName1=r.moduleName;
                            vm.module1=vm.table.itemBodys[1].id;
                        });
                    }else{
                        vm.item1 = vm.table.itemBodys[1].id;
                    }
                    //第三个关系
                    if(vm.table.itemBodys[2].parentId!=0){
                        vm.item2=vm.table.itemBodys[2].parentId;
                        var parentId=vm.table.itemBodys[2].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName2=r.moduleName;
                            vm.module2=vm.table.itemBodys[2].id;
                        });
                    }else{
                        vm.item2 = vm.table.itemBodys[2].id;
                    }
                }

                //含有四个项目关系
                if(vm.table.itemBodys.length==4){
                    //第一个关系
                    if(vm.table.itemBodys[0].parentId!=0){
                        vm.item = vm.table.itemBodys[0].parentId;
                        console.log(vm.item)
                        var parentId = vm.table.itemBodys[0].parentId;
                        console.log(parentId)
                        $.getJSON(baseURL + "item/queryAllModuleName/" + parentId, function (r) {
                            vm.moduleName = r.moduleName;
                            vm.module = vm.table.itemBodys[0].id;
                        });
                    }else {
                        vm.item = vm.table.itemBodys[0].id;
                    }
                    //第二个关系
                    if(vm.table.itemBodys[1].parentId!=0){
                        vm.item1=vm.table.itemBodys[1].parentId;
                        var parentId=vm.table.itemBodys[1].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName1=r.moduleName;
                            vm.module1=vm.table.itemBodys[1].id;
                        });
                    }else{
                        vm.item = vm.table.itemBodys[1].id;
                    }
                    //第三个关系
                    if(vm.table.itemBodys[2].parentId!=0){
                        vm.item2=vm.table.itemBodys[2].parentId;
                        var parentId=vm.table.itemBodys[2].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName2=r.moduleName;
                            vm.module2=vm.table.itemBodys[2].id;
                        });
                    }else{
                        vm.item2 = vm.table.itemBodys[2].id;
                    }
                    //第四个关系
                    if(vm.table.itemBodys[3].parentId!=0){
                        vm.item3=vm.table.itemBodys[3].parentId;
                        var parentId=vm.table.itemBodys[3].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName3=r.moduleName;
                            vm.module3=vm.table.itemBodys[3].id;
                        });
                    }else{
                        vm.item3 = vm.table.itemBodys[3].id;
                    }
                }

                //含有五个项目关系
                if(vm.table.itemBodys.length==5){
                    //第一个关系
                    if(vm.table.itemBodys[0].parentId!=0){
                        vm.item = vm.table.itemBodys[0].parentId;
                        console.log(vm.item)
                        var parentId = vm.table.itemBodys[0].parentId;
                        console.log(parentId)
                        $.getJSON(baseURL + "item/queryAllModuleName/" + parentId, function (r) {
                            vm.moduleName = r.moduleName;
                            vm.module = vm.table.itemBodys[0].id;
                        });
                    }else {
                        vm.item = vm.table.itemBodys[0].id;
                    }
                    //第二个关系
                    if(vm.table.itemBodys[1].parentId!=0){
                        vm.item1=vm.table.itemBodys[1].parentId;
                        var parentId=vm.table.itemBodys[1].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName1=r.moduleName;
                            vm.module1=vm.table.itemBodys[1].id;
                        });
                    }else{
                        vm.item = vm.table.itemBodys[1].id;
                    }
                    //第三个关系
                    if(vm.table.itemBodys[2].parentId!=0){
                        vm.item2=vm.table.itemBodys[2].parentId;
                        var parentId=vm.table.itemBodys[2].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName2=r.moduleName;
                            vm.module2=vm.table.itemBodys[2].id;
                        });
                    }else{
                        vm.item2 = vm.table.itemBodys[2].id;
                    }
                    //第四个关系
                    if(vm.table.itemBodys[3].parentId!=0){
                        vm.item3=vm.table.itemBodys[3].parentId;
                        var parentId=vm.table.itemBodys[3].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName3=r.moduleName;
                            vm.module3=vm.table.itemBodys[3].id;
                        });
                    }else{
                        vm.item3 = vm.table.itemBodys[3].id;
                    }
                    //第五个关系
                    if(vm.table.itemBodys[4].parentId!=0){
                        vm.item4=vm.table.itemBodys[4].parentId;
                        var parentId=vm.table.itemBodys[4].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName4=r.moduleName;
                            vm.module4=vm.table.itemBodys[4].id;
                        });
                    }else{
                        vm.item4 = vm.table.itemBodys[4].id;
                    }
                }

                //含有六个项目关系
                if(vm.table.itemBodys.length==6){
                    //第一个关系
                    if(vm.table.itemBodys[0].parentId!=0){
                        vm.item = vm.table.itemBodys[0].parentId;
                        console.log(vm.item)
                        var parentId = vm.table.itemBodys[0].parentId;
                        console.log(parentId)
                        $.getJSON(baseURL + "item/queryAllModuleName/" + parentId, function (r) {
                            vm.moduleName = r.moduleName;
                            vm.module = vm.table.itemBodys[0].id;
                        });
                    }else {
                        vm.item = vm.table.itemBodys[0].id;
                    }
                    //第二个关系
                    if(vm.table.itemBodys[1].parentId!=0){
                        vm.item1=vm.table.itemBodys[1].parentId;
                        var parentId=vm.table.itemBodys[1].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName1=r.moduleName;
                            vm.module1=vm.table.itemBodys[1].id;
                        });
                    }else{
                        vm.item = vm.table.itemBodys[1].id;
                    }
                    //第三个关系
                    if(vm.table.itemBodys[2].parentId!=0){
                        vm.item2=vm.table.itemBodys[2].parentId;
                        var parentId=vm.table.itemBodys[2].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName2=r.moduleName;
                            vm.module2=vm.table.itemBodys[2].id;
                        });
                    }else{
                        vm.item2 = vm.table.itemBodys[2].id;
                    }
                    //第四个关系
                    if(vm.table.itemBodys[3].parentId!=0){
                        vm.item3=vm.table.itemBodys[3].parentId;
                        var parentId=vm.table.itemBodys[3].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName3=r.moduleName;
                            vm.module3=vm.table.itemBodys[3].id;
                        });
                    }else{
                        vm.item3 = vm.table.itemBodys[3].id;
                    }
                    //第五个关系
                    if(vm.table.itemBodys[4].parentId!=0){
                        vm.item4=vm.table.itemBodys[4].parentId;
                        var parentId=vm.table.itemBodys[4].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName4=r.moduleName;
                            vm.module4=vm.table.itemBodys[4].id;
                        });
                    }else{
                        vm.item4 = vm.table.itemBodys[4].id;
                    }
                    //第六个关系
                    if(vm.table.itemBodys[5].parentId!=0){
                        vm.item5=vm.table.itemBodys[5].parentId;
                        var parentId=vm.table.itemBodys[5].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName5=r.moduleName;
                            vm.module5=vm.table.itemBodys[5].id;
                        });
                    }else{
                        vm.item5 = vm.table.itemBodys[5].id;
                    }
                }

                //含有七个项目关系
                if(vm.table.itemBodys.length==7){
                    //第一个关系
                    if(vm.table.itemBodys[0].parentId!=0){
                        vm.item = vm.table.itemBodys[0].parentId;
                        console.log(vm.item)
                        var parentId = vm.table.itemBodys[0].parentId;
                        console.log(parentId)
                        $.getJSON(baseURL + "item/queryAllModuleName/" + parentId, function (r) {
                            vm.moduleName = r.moduleName;
                            vm.module = vm.table.itemBodys[0].id;
                        });
                    }else {
                        vm.item = vm.table.itemBodys[0].id;
                    }
                    //第二个关系
                    if(vm.table.itemBodys[1].parentId!=0){
                        vm.item1=vm.table.itemBodys[1].parentId;
                        var parentId=vm.table.itemBodys[1].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName1=r.moduleName;
                            vm.module1=vm.table.itemBodys[1].id;
                        });
                    }else{
                        vm.item = vm.table.itemBodys[1].id;
                    }
                    //第三个关系
                    if(vm.table.itemBodys[2].parentId!=0){
                        vm.item2=vm.table.itemBodys[2].parentId;
                        var parentId=vm.table.itemBodys[2].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName2=r.moduleName;
                            vm.module2=vm.table.itemBodys[2].id;
                        });
                    }else{
                        vm.item2 = vm.table.itemBodys[2].id;
                    }
                    //第四个关系
                    if(vm.table.itemBodys[3].parentId!=0){
                        vm.item3=vm.table.itemBodys[3].parentId;
                        var parentId=vm.table.itemBodys[3].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName3=r.moduleName;
                            vm.module3=vm.table.itemBodys[3].id;
                        });
                    }else{
                        vm.item3 = vm.table.itemBodys[3].id;
                    }
                    //第五个关系
                    if(vm.table.itemBodys[4].parentId!=0){
                        vm.item4=vm.table.itemBodys[4].parentId;
                        var parentId=vm.table.itemBodys[4].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName4=r.moduleName;
                            vm.module4=vm.table.itemBodys[4].id;
                        });
                    }else{
                        vm.item4 = vm.table.itemBodys[4].id;
                    }
                    //第六个关系
                    if(vm.table.itemBodys[5].parentId!=0){
                        vm.item5=vm.table.itemBodys[5].parentId;
                        var parentId=vm.table.itemBodys[5].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName5=r.moduleName;
                            vm.module5=vm.table.itemBodys[5].id;
                        });
                    }else{
                        vm.item5 = vm.table.itemBodys[5].id;
                    }
                    //第七个关系
                    if(vm.table.itemBodys[6].parentId!=0){
                        vm.item6=vm.table.itemBodys[6].parentId;
                        var parentId=vm.table.itemBodys[6].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName6=r.moduleName;
                            vm.module6=vm.table.itemBodys[6].id;
                        });
                    }else{
                        vm.item6 = vm.table.itemBodys[6].id;
                    }
                }

                //含有八个项目关系
                if(vm.table.itemBodys.length==8){
                    //第一个关系
                    if(vm.table.itemBodys[0].parentId!=0){
                        vm.item = vm.table.itemBodys[0].parentId;
                        console.log(vm.item)
                        var parentId = vm.table.itemBodys[0].parentId;
                        console.log(parentId)
                        $.getJSON(baseURL + "item/queryAllModuleName/" + parentId, function (r) {
                            vm.moduleName = r.moduleName;
                            vm.module = vm.table.itemBodys[0].id;
                        });
                    }else {
                        vm.item = vm.table.itemBodys[0].id;
                    }
                    //第二个关系
                    if(vm.table.itemBodys[1].parentId!=0){
                        vm.item1=vm.table.itemBodys[1].parentId;
                        var parentId=vm.table.itemBodys[1].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName1=r.moduleName;
                            vm.module1=vm.table.itemBodys[1].id;
                        });
                    }else{
                        vm.item = vm.table.itemBodys[1].id;
                    }
                    //第三个关系
                    if(vm.table.itemBodys[2].parentId!=0){
                        vm.item2=vm.table.itemBodys[2].parentId;
                        var parentId=vm.table.itemBodys[2].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName2=r.moduleName;
                            vm.module2=vm.table.itemBodys[2].id;
                        });
                    }else{
                        vm.item2 = vm.table.itemBodys[2].id;
                    }
                    //第四个关系
                    if(vm.table.itemBodys[3].parentId!=0){
                        vm.item3=vm.table.itemBodys[3].parentId;
                        var parentId=vm.table.itemBodys[3].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName3=r.moduleName;
                            vm.module3=vm.table.itemBodys[3].id;
                        });
                    }else{
                        vm.item3 = vm.table.itemBodys[3].id;
                    }
                    //第五个关系
                    if(vm.table.itemBodys[4].parentId!=0){
                        vm.item4=vm.table.itemBodys[4].parentId;
                        var parentId=vm.table.itemBodys[4].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName4=r.moduleName;
                            vm.module4=vm.table.itemBodys[4].id;
                        });
                    }else{
                        vm.item4 = vm.table.itemBodys[4].id;
                    }
                    //第六个关系
                    if(vm.table.itemBodys[5].parentId!=0){
                        vm.item5=vm.table.itemBodys[5].parentId;
                        var parentId=vm.table.itemBodys[5].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName5=r.moduleName;
                            vm.module5=vm.table.itemBodys[5].id;
                        });
                    }else{
                        vm.item5 = vm.table.itemBodys[5].id;
                    }
                    //第七个关系
                    if(vm.table.itemBodys[6].parentId!=0){
                        vm.item6=vm.table.itemBodys[6].parentId;
                        var parentId=vm.table.itemBodys[6].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName6=r.moduleName;
                            vm.module6=vm.table.itemBodys[6].id;
                        });
                    }else{
                        vm.item6 = vm.table.itemBodys[6].id;
                    }
                    //第八个关系
                    if(vm.table.itemBodys[7].parentId!=0){
                        vm.item7=vm.table.itemBodys[7].parentId;
                        var parentId=vm.table.itemBodys[7].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName7=r.moduleName;
                            vm.module7=vm.table.itemBodys[7].id;
                        });
                    }else{
                        vm.item7 = vm.table.itemBodys[7].id;
                    }
                }

                //含有九个项目关系
                if(vm.table.itemBodys.length==9){
                    //第一个关系
                    if(vm.table.itemBodys[0].parentId!=0){
                        vm.item = vm.table.itemBodys[0].parentId;
                        console.log(vm.item)
                        var parentId = vm.table.itemBodys[0].parentId;
                        console.log(parentId)
                        $.getJSON(baseURL + "item/queryAllModuleName/" + parentId, function (r) {
                            vm.moduleName = r.moduleName;
                            vm.module = vm.table.itemBodys[0].id;
                        });
                    }else {
                        vm.item = vm.table.itemBodys[0].id;
                    }
                    //第二个关系
                    if(vm.table.itemBodys[1].parentId!=0){
                        vm.item1=vm.table.itemBodys[1].parentId;
                        var parentId=vm.table.itemBodys[1].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName1=r.moduleName;
                            vm.module1=vm.table.itemBodys[1].id;
                        });
                    }else{
                        vm.item = vm.table.itemBodys[1].id;
                    }
                    //第三个关系
                    if(vm.table.itemBodys[2].parentId!=0){
                        vm.item2=vm.table.itemBodys[2].parentId;
                        var parentId=vm.table.itemBodys[2].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName2=r.moduleName;
                            vm.module2=vm.table.itemBodys[2].id;
                        });
                    }else{
                        vm.item2 = vm.table.itemBodys[2].id;
                    }
                    //第四个关系
                    if(vm.table.itemBodys[3].parentId!=0){
                        vm.item3=vm.table.itemBodys[3].parentId;
                        var parentId=vm.table.itemBodys[3].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName3=r.moduleName;
                            vm.module3=vm.table.itemBodys[3].id;
                        });
                    }else{
                        vm.item3 = vm.table.itemBodys[3].id;
                    }
                    //第五个关系
                    if(vm.table.itemBodys[4].parentId!=0){
                        vm.item4=vm.table.itemBodys[4].parentId;
                        var parentId=vm.table.itemBodys[4].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName4=r.moduleName;
                            vm.module4=vm.table.itemBodys[4].id;
                        });
                    }else{
                        vm.item4 = vm.table.itemBodys[4].id;
                    }
                    //第六个关系
                    if(vm.table.itemBodys[5].parentId!=0){
                        vm.item5=vm.table.itemBodys[5].parentId;
                        var parentId=vm.table.itemBodys[5].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName5=r.moduleName;
                            vm.module5=vm.table.itemBodys[5].id;
                        });
                    }else{
                        vm.item5 = vm.table.itemBodys[5].id;
                    }
                    //第七个关系
                    if(vm.table.itemBodys[6].parentId!=0){
                        vm.item6=vm.table.itemBodys[6].parentId;
                        var parentId=vm.table.itemBodys[6].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName6=r.moduleName;
                            vm.module6=vm.table.itemBodys[6].id;
                        });
                    }else{
                        vm.item6 = vm.table.itemBodys[6].id;
                    }
                    //第八个关系
                    if(vm.table.itemBodys[7].parentId!=0){
                        vm.item7=vm.table.itemBodys[7].parentId;
                        var parentId=vm.table.itemBodys[7].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName7=r.moduleName;
                            vm.module7=vm.table.itemBodys[7].id;
                        });
                    }else{
                        vm.item7 = vm.table.itemBodys[7].id;
                    }
                    //第九个关系
                    if(vm.table.itemBodys[8].parentId!=0){
                        vm.item8=vm.table.itemBodys[8].parentId;
                        var parentId=vm.table.itemBodys[8].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName8=r.moduleName;
                            vm.module8=vm.table.itemBodys[8].id;
                        });
                    }else{
                        vm.item8 = vm.table.itemBodys[8].id;
                    }
                }

                //含有十个项目关系
                if(vm.table.itemBodys.length==10){
                    //第一个关系
                    if(vm.table.itemBodys[0].parentId!=0){
                        vm.item = vm.table.itemBodys[0].parentId;
                        console.log(vm.item)
                        var parentId = vm.table.itemBodys[0].parentId;
                        console.log(parentId)
                        $.getJSON(baseURL + "item/queryAllModuleName/" + parentId, function (r) {
                            vm.moduleName = r.moduleName;
                            vm.module = vm.table.itemBodys[0].id;
                        });
                    }else {
                        vm.item = vm.table.itemBodys[0].id;
                    }
                    //第二个关系
                    if(vm.table.itemBodys[1].parentId!=0){
                        vm.item1=vm.table.itemBodys[1].parentId;
                        var parentId=vm.table.itemBodys[1].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName1=r.moduleName;
                            vm.module1=vm.table.itemBodys[1].id;
                        });
                    }else{
                        vm.item = vm.table.itemBodys[1].id;
                    }
                    //第三个关系
                    if(vm.table.itemBodys[2].parentId!=0){
                        vm.item2=vm.table.itemBodys[2].parentId;
                        var parentId=vm.table.itemBodys[2].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName2=r.moduleName;
                            vm.module2=vm.table.itemBodys[2].id;
                        });
                    }else{
                        vm.item2 = vm.table.itemBodys[2].id;
                    }
                    //第四个关系
                    if(vm.table.itemBodys[3].parentId!=0){
                        vm.item3=vm.table.itemBodys[3].parentId;
                        var parentId=vm.table.itemBodys[3].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName3=r.moduleName;
                            vm.module3=vm.table.itemBodys[3].id;
                        });
                    }else{
                        vm.item3 = vm.table.itemBodys[3].id;
                    }
                    //第五个关系
                    if(vm.table.itemBodys[4].parentId!=0){
                        vm.item4=vm.table.itemBodys[4].parentId;
                        var parentId=vm.table.itemBodys[4].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName4=r.moduleName;
                            vm.module4=vm.table.itemBodys[4].id;
                        });
                    }else{
                        vm.item4 = vm.table.itemBodys[4].id;
                    }
                    //第六个关系
                    if(vm.table.itemBodys[5].parentId!=0){
                        vm.item5=vm.table.itemBodys[5].parentId;
                        var parentId=vm.table.itemBodys[5].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName5=r.moduleName;
                            vm.module5=vm.table.itemBodys[5].id;
                        });
                    }else{
                        vm.item5 = vm.table.itemBodys[5].id;
                    }
                    //第七个关系
                    if(vm.table.itemBodys[6].parentId!=0){
                        vm.item6=vm.table.itemBodys[6].parentId;
                        var parentId=vm.table.itemBodys[6].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName6=r.moduleName;
                            vm.module6=vm.table.itemBodys[6].id;
                        });
                    }else{
                        vm.item6 = vm.table.itemBodys[6].id;
                    }
                    //第八个关系
                    if(vm.table.itemBodys[7].parentId!=0){
                        vm.item7=vm.table.itemBodys[7].parentId;
                        var parentId=vm.table.itemBodys[7].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName7=r.moduleName;
                            vm.module7=vm.table.itemBodys[7].id;
                        });
                    }else{
                        vm.item7 = vm.table.itemBodys[7].id;
                    }
                    //第九个关系
                    if(vm.table.itemBodys[8].parentId!=0){
                        vm.item8=vm.table.itemBodys[8].parentId;
                        var parentId=vm.table.itemBodys[8].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName8=r.moduleName;
                            vm.module8=vm.table.itemBodys[8].id;
                        });
                    }else{
                        vm.item8 = vm.table.itemBodys[8].id;
                    }
                    //第十个关系
                    if(vm.table.itemBodys[9].parentId!=0){
                        vm.item9=vm.table.itemBodys[9].parentId;
                        var parentId=vm.table.itemBodys[9].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName9=r.moduleName;
                            vm.module9=vm.table.itemBodys[9].id;
                        });
                    }else{
                        vm.item9 = vm.table.itemBodys[9].id;
                    }
                }

                //含有十一个项目关系
                if(vm.table.itemBodys.length==11){
                    //第一个关系
                    if(vm.table.itemBodys[0].parentId!=0){
                        vm.item = vm.table.itemBodys[0].parentId;
                        console.log(vm.item)
                        var parentId = vm.table.itemBodys[0].parentId;
                        console.log(parentId)
                        $.getJSON(baseURL + "item/queryAllModuleName/" + parentId, function (r) {
                            vm.moduleName = r.moduleName;
                            vm.module = vm.table.itemBodys[0].id;
                        });
                    }else {
                        vm.item = vm.table.itemBodys[0].id;
                    }
                    //第二个关系
                    if(vm.table.itemBodys[1].parentId!=0){
                        vm.item1=vm.table.itemBodys[1].parentId;
                        var parentId=vm.table.itemBodys[1].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName1=r.moduleName;
                            vm.module1=vm.table.itemBodys[1].id;
                        });
                    }else{
                        vm.item = vm.table.itemBodys[1].id;
                    }
                    //第三个关系
                    if(vm.table.itemBodys[2].parentId!=0){
                        vm.item2=vm.table.itemBodys[2].parentId;
                        var parentId=vm.table.itemBodys[2].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName2=r.moduleName;
                            vm.module2=vm.table.itemBodys[2].id;
                        });
                    }else{
                        vm.item2 = vm.table.itemBodys[2].id;
                    }
                    //第四个关系
                    if(vm.table.itemBodys[3].parentId!=0){
                        vm.item3=vm.table.itemBodys[3].parentId;
                        var parentId=vm.table.itemBodys[3].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName3=r.moduleName;
                            vm.module3=vm.table.itemBodys[3].id;
                        });
                    }else{
                        vm.item3 = vm.table.itemBodys[3].id;
                    }
                    //第五个关系
                    if(vm.table.itemBodys[4].parentId!=0){
                        vm.item4=vm.table.itemBodys[4].parentId;
                        var parentId=vm.table.itemBodys[4].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName4=r.moduleName;
                            vm.module4=vm.table.itemBodys[4].id;
                        });
                    }else{
                        vm.item4 = vm.table.itemBodys[4].id;
                    }
                    //第六个关系
                    if(vm.table.itemBodys[5].parentId!=0){
                        vm.item5=vm.table.itemBodys[5].parentId;
                        var parentId=vm.table.itemBodys[5].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName5=r.moduleName;
                            vm.module5=vm.table.itemBodys[5].id;
                        });
                    }else{
                        vm.item5 = vm.table.itemBodys[5].id;
                    }
                    //第七个关系
                    if(vm.table.itemBodys[6].parentId!=0){
                        vm.item6=vm.table.itemBodys[6].parentId;
                        var parentId=vm.table.itemBodys[6].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName6=r.moduleName;
                            vm.module6=vm.table.itemBodys[6].id;
                        });
                    }else{
                        vm.item6 = vm.table.itemBodys[6].id;
                    }
                    //第八个关系
                    if(vm.table.itemBodys[7].parentId!=0){
                        vm.item7=vm.table.itemBodys[7].parentId;
                        var parentId=vm.table.itemBodys[7].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName7=r.moduleName;
                            vm.module7=vm.table.itemBodys[7].id;
                        });
                    }else{
                        vm.item7 = vm.table.itemBodys[7].id;
                    }
                    //第九个关系
                    if(vm.table.itemBodys[8].parentId!=0){
                        vm.item8=vm.table.itemBodys[8].parentId;
                        var parentId=vm.table.itemBodys[8].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName8=r.moduleName;
                            vm.module8=vm.table.itemBodys[8].id;
                        });
                    }else{
                        vm.item8 = vm.table.itemBodys[8].id;
                    }
                    //第十个关系
                    if(vm.table.itemBodys[9].parentId!=0){
                        vm.item9=vm.table.itemBodys[9].parentId;
                        var parentId=vm.table.itemBodys[9].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName9=r.moduleName;
                            vm.module9=vm.table.itemBodys[9].id;
                        });
                    }else{
                        vm.item9 = vm.table.itemBodys[9].id;
                    }

                    //第十一个关系
                    if(vm.table.itemBodys[10].parentId!=0){
                        vm.item10=vm.table.itemBodys[10].parentId;
                        var parentId=vm.table.itemBodys[10].parentId;
                        $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
                            vm.moduleName10=r.moduleName;
                            vm.module10=vm.table.itemBodys[10].id;
                        });
                    }else{
                        vm.item10 = vm.table.itemBodys[10].id;
                    }
                }
                //以上是更新项目关系代码
            });


        },
        saveOrUpdate: function () {
            vm.table.create_partition_time = Number(vm.partitionTime)
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

            if(vm.count==4) {
                if(vm.monitor!=null&&vm.monitor!=""){
                    Vue.set(vm.monitorType,"a",vm.monitor);
                }
                if(vm.monitor1!=null&&vm.monitor1!=""){
                    Vue.set(vm.monitorType,"a1",vm.monitor1);
                }
                if(vm.monitor2!=null&&vm.monitor2!=""){
                    Vue.set(vm.monitorType,"a2",vm.monitor2);
                }
                if(vm.monitor3!=null&&vm.monitor3!=""){
                    Vue.set(vm.monitorType,"a3",vm.monitor3);
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
            if(vm.table.tId== null){
                url="yiche/table/insert";
                // vm.table.monitorType=vm.monitorType;
                vm.table.itemId=vm.item_id;
                vm.table.moduleId=vm.module_id;
            }else{
                url="yiche/table/update";
                vm.table.itemId=vm.item_id;
                vm.table.moduleId=vm.module_id;
            }
            vm.table.monitor_type=vm.monitor;

            if(vm.chooseAlarmGroupItem == null || vm.chooseAlarmGroupItem == ""){
                alert("请选择报警组")
                return true;
            }

            vm.table.alarmUniqueid = vm.chooseAlarmGroupItem.uniqueId;

            console.log(vm.table);

            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                // dataType:"json",
                data: JSON.stringify(vm.table),
                // data: {table:vm.table,monitorType:vm.monitorType},
                success: function(r){
                    if(r.code === 0){
                        alert('操作成功', function(){
                            vm.reload();
                            location.reload();
                        });
                    }else{
                        alert(r.msg);
                    }
                }
            });
        },
        parse: function () {
            var tid = getSelectedRow();
            if(tid == null){
                return ;
            }

            confirm('确定要暂停选中的监控项？', function(){
                $.ajax({
                    type: "POST",
                    url: baseURL + "yiche/table/stop/" + tid,
                    contentType: "application/json",
                    data: JSON.stringify(tid),
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
            var tid = getSelectedRow();
            if(tid == null){
                return ;
            }

            confirm('确定要开启选中的监控项？', function(){
                $.ajax({
                    type: "POST",
                    url: baseURL + "yiche/table/start/" + tid,
                    contentType: "application/json",
                    data: JSON.stringify(tid),
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
        del: function () {
            var jobIds = getSelectedRows();
            if(jobIds == null){
                return ;
            }

            confirm('确定要删除选中的记录？', function(){
                $.ajax({
                    type: "POST",
                    url: baseURL + "yiche/table/delete",
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
        reload: function (event) {
            vm.showList = true;
            var page = $("#jqGrid").jqGrid('getGridParam','page');
            $("#jqGrid").jqGrid('setGridParam',{
                postData:{'table_name': vm.table_name,'tid':vm.tid,'itemid':vm.itemid,'moduleid':vm.moduleid},
                page:page
            }).trigger("reloadGrid");
        },
        checks:function () {
            if(vm.count>4){
                alert("一次同时最多添加4组数据")
                return true;
            }
        },
        // checksItem:function () {
        //     if(vm.countItem>4){
        //         alert("该类型一次最多添加4组数据")
        //         return true;
        //     }
        // },
        checksModule:function () {
            if(vm.countModule>10){
                vm.countModule=vm.countModule-1;
                alert("一次同时最多添加10组数据")
                return true;
            }
        },
        validator: function() {
            // if(isBlank(vm.table.monitor_type)){
            //     alert("监控类型不能为空");
            //     return true;
            // }
            if(vm.monitor=="完成时间"){
                var checkSetTime=/^([0-1]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;
                if(!checkSetTime.test(vm.table.self)){
                    alert("完成时间规则不正确，正确格式：‘05:30:00’")
                    return true;
                }
            }
            // if(isBlank(vm.table.alarm_type)){
            //     alert("报警方式不能为空");
            //     return true;
            // }
            var checkcreateTime=/^[0-1]$/;
            if(!checkcreateTime.test(vm.table.create_partition_time)){
                alert("分区生成时间格式不正确")
                return true;
            }
            if(isBlank(vm.table.tabowner)){
                alert("负责人不能为空");
                return true;
            }
            if(isBlank(vm.table.partition_type)){
                alert("监控周期不能为空");
                return true;
            }
            if(isBlank(vm.table.content)){
                alert("通知内容不能为空");
                return true;
            }
            var checkReciever=/^([a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+\|([0-9])+\,)*([a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+\|([0-9])+)?$/;
            // if(!checkReciever.test(vm.table.reciever)){
            //     alert("接收人格式不正确");
            //     return true;
            // }
            if(!isBlank(vm.table.alarmman)){
                if(!checkReciever.test(vm.table.alarmman)){
                    alert("接收人格式不正确");
                    return true;
                }
            }
            if(this.error1 === true || this.error2 === true || this.error3 === true || this.error4 === true) {
                alert("监控范围格式有误");
                return true;
            }

        }
    }
});
// function setValue(){
//     // var count="a";
//     // var val=document.getElementById(vm.ids).value;
//     // console.log(val);
//     // Vue.set(vm.monitorType,count+vm.count,val);
//     var val=document.getElementById("").value;
//
// }
// function  getTabOwners() {
//     var tabOwner="";
//     $.ajax({
//         type: "POST",
//         url: baseURL + "yiche/table/queryTabOwner",
//         contentType: "application/json",
//         success: function(result){
//             console.log(result.tOwner)
//             console.log(result)
//             // var result = eval('('+ result.tOwner +')');
//             for(var i = 0; i < result.tOwner.length; i++){
//                 if(i != result.tOwner.length - 1){
//                     tabOwner += result.tOwner[i] + ":" + result.tOwner[i] + ";";
//                 }else{
//                     tabOwner += result.tOwner[i] + ":" + result.tOwner[i];
//                 }
//             }
//         }
//     });
//     return tabOwner;
// }
function setValueItem(){
    console.log("aaa")
    var parentId=document.getElementById("selt1").value;
    $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
        vm.moduleName=r.moduleName;
    });
}

function setChooseAlarmGroup(){
    var uniqueId = document.getElementById("selAlarmGroupId").value;
    $.getJSON(baseURL + "alarm_group_manager/query_by_uniqueid?uniqueid="+uniqueId, function(r){
        vm.chooseAlarmGroupItem = r.group;
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
        $("#sevenAvg").prop("style","display:none");
        vm.table.seven_wave_avg=null;
    }else {
        $("#dayh").prop("style","display:block");
        $("#monthh").prop("style","display:none");
        $("#dayt").prop("style","display:block");
        $("#montht").prop("style","display:none");
        $("#sevenAvg").prop("style","display:block");
    }
}

function start(id){
 // var   userName=vm.user.username;
    $.get(baseURL + "yiche/alarm/startTRuler/"+id, function(r) {
        alert(r.message);
    })
}

// function setValueModule(){
//     var count="a";
//     console.log(vm.item_id)
//     var val;
//     if(vm.idmodule!=null&&vm.idmodule!=""){
//         val=document.getElementById(vm.idmodule).value;
//     }else{
//         val=document.getElementById("selm").value;
//     }
//     console.log(val);
//     Vue.set(vm.module_id,count+vm.count,val);
// }
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
})