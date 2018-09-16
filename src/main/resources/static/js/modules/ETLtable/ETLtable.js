$(function () {
    $.get(baseURL + "yiche/ETLtable/queryAllDbName", function (r) {
        vm.dbName = r.dbName;
    });

    $.getJSON(baseURL + "sys/user/info", function(r){
        vm.user = r.user;
    });
    $.getJSON(baseURL + "item/queryAllItemName", function(r){
        vm.itemName = r.itemName;
    });
    $.getJSON(baseURL + "alarm_group_manager/list_by_tagname", function(r){
        vm.alarmGroups = r.list;
    });
    // $.getJSON(baseURL + "item/queryAllModuleName", function(r){
    //     vm.moduleName=r.moduleName;
    // });
});
var vm = new Vue({
    el:'#rrapp',
    data:{
        iditem:[],
        idmodule:[],
        count:1,
        // countItem:1,
        countModule:1,
        countt:1,
        countItemt:1,
        countModulet:1,
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
        //以上是column

        moduleNamet:[],
        moduleNamet1:[],
        moduleNamet2:[],
        moduleNamet3:[],
        moduleNamet4:[],
        moduleNamet5:[],
        moduleNamet6:[],
        moduleNamet7:[],
        moduleNamet8:[],
        moduleNamet9:[],

        monitort:[],
        monitort1:[],
        monitort2:[],
        monitort3:[],
        monitort4:[],
        monitort5:[],
        monitort6:[],
        monitort7:[],
        monitort8:[],
        monitort9:[],

        itemt:[],
        itemt1:[],
        itemt2:[],
        itemt3:[],
        itemt4:[],
        itemt5:[],
        itemt6:[],
        itemt7:[],
        itemt8:[],
        itemt9:[],

        modulet:[],
        modulet1:[],
        modulet2:[],
        modulet3:[],
        modulet4:[],
        modulet5:[],
        modulet6:[],
        modulet7:[],
        modulet8:[],
        modulet9:[],

        showItem: true,
        table_name:[],
        columnName:[],
        dbName:[],
        tblName:[],
        dbaseName:null,
        showList: true,
        showCommon: true,
        title: null,
        column:{},
        table:{},
        ETLtable: {},
        user:{},
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
        error5:false,  //错误提示
        error6:false,//错误提示
        error7:false,//错误提示
        error8:false,//错误提示
        showRule5:false, //展示规则
        showRule6:false,
        showRule7:false,
        showRule8:false,
        tablePartitionTime:1,
        columnPartitionTime:1,
        alarmGroups:[],
        chooseAlarmGroupItem: ""
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
        showText5:function() {
            this.showRule5 = true
        },
        hiddenText5:function() {
            this.showRule5 = false
        },
        showText6:function() {
            this.showRule6 = true
        },
        hiddenText6:function() {
            this.showRule6 = false
        },
        showText7:function() {
            this.showRule7 = true
        },
        hiddenText7:function() {
            this.showRule7 = false
        },
        showText8:function() {
            this.showRule8 = true
        },
        hiddenText8:function() {
            this.showRule8 = false
        },
        validation5:function() {  //验证本身
            if(document.getElementById("selectt").selectedIndex !== 1) {
                var inputValue = document.getElementById("self2").value;
                var str = inputValue.replace(/(^\s*)|(\s*$)/g,"")
                if(!/\s/g.test(str)) {
                    if((str.indexOf("|") === str.lastIndexOf("|")) && str.indexOf("|") !== -1) {
                        var firstHalfOr = inputValue.substring(0,str.indexOf("|"));
                        var afterHalfOr = inputValue.substring(str.indexOf("|") +1);
                        if(/^(\(-?\d+,-?\d+\))$/.test(firstHalfOr) || /^(\[-?\d+,-?\d+\))$/.test(firstHalfOr) || /^(\(-?\d+,-?\d+\])$/.test(firstHalfOr) || /^(\[-?\d+,-?\d+\])$/.test(firstHalfOr) || /^(\(-?\d+,\))$/.test(firstHalfOr) || /^(\[-?\d+,\))$/.test(firstHalfOr) || /^(\(,-?\d+\))$/.test(firstHalfOr) || /^(\(,-?\d+\])$/.test(firstHalfOr) || /^(!\{-?\d+\})$/.test(firstHalfOr)) {
                            if(/^(\(-?\d+,-?\d+\))$/.test(afterHalfOr) || /^(\[-?\d+,-?\d+\))$/.test(afterHalfOr) || /^(\(-?\d+,-?\d+\])$/.test(afterHalfOr) || /^(\[-?\d+,-?\d+\])$/.test(afterHalfOr) || /^(\(-?\d+,\))$/.test(afterHalfOr) || /^(\[-?\d+,\))$/.test(afterHalfOr) || /^(\(,-?\d+\))$/.test(afterHalfOr) || /^(\(,-?\d+\])$/.test(afterHalfOr) || /^(!\{-?\d+\})$/.test(afterHalfOr)) {
                                this.error5 = false
                            } else {
                                this.error5 = true
                            }
                        } else {
                            this.error5 = true
                        }
                    } else if((str.indexOf("&") === str.lastIndexOf("&")) && str.indexOf("&") !== -1) {
                        var firstHalfAnd = inputValue.substring(0,str.indexOf("&"));
                        var afterHalfAnd = inputValue.substring(str.indexOf("&") +1);
                        if(/^(\(-?\d+,-?\d+\))$/.test(firstHalfAnd) || /^(\[-?\d+,-?\d+\))$/.test(firstHalfAnd) || /^(\(-?\d+,-?\d+\])$/.test(firstHalfAnd) || /^(\[-?\d+,-?\d+\])$/.test(firstHalfAnd) || /^(\(-?\d+,\))$/.test(firstHalfAnd) || /^(\[-?\d+,\))$/.test(firstHalfAnd) || /^(\(,-?\d+\))$/.test(firstHalfAnd) || /^(\(,-?\d+\])$/.test(firstHalfAnd) || /^(!\{-?\d+\})$/.test(firstHalfAnd)) {
                            if(/^(\(-?\d+,-?\d+\))$/.test(afterHalfAnd) || /^(\[-?\d+,-?\d+\))$/.test(afterHalfAnd) || /^(\(-?\d+,-?\d+\])$/.test(afterHalfAnd) || /^(\[-?\d+,-?\d+\])$/.test(afterHalfAnd) || /^(\(-?\d+,\))$/.test(afterHalfAnd) || /^(\[-?\d+,\))$/.test(afterHalfAnd) || /^(\(,-?\d+\))$/.test(afterHalfAnd) || /^(\(,-?\d+\])$/.test(afterHalfAnd) || /^(!\{-?\d+\})$/.test(afterHalfAnd)) {
                                this.error5 = false
                            } else {
                                this.error5 = true
                            }
                        } else {
                            this.error5 = true
                        }
                    } else if(str === "") {
                        this.error5 = false
                    }  else {
                        if(/^(\(-?\d+,-?\d+\))$/.test(str) || /^(\[-?\d+,-?\d+\))$/.test(str) || /^(\(-?\d+,-?\d+\])$/.test(str) || /^(\[-?\d+,-?\d+\])$/.test(str) || /^(\(-?\d+,\))$/.test(str) || /^(\[-?\d+,\))$/.test(str) || /^(\(,-?\d+\))$/.test(str) || /^(\(,-?\d+\])$/.test(str) || /^(!\{-?\d+\})$/.test(str)) {
                            this.error5 = false
                        } else {
                            this.error5 = true
                        }
                    }
                } else {
                    this.error5 = true
                }
            } else {
                this.error5 =false
            }
        },
        validation6:function() {  // 验证环比
            var inputValue = document.getElementById("dayAdd2").value;
            var str = inputValue.replace(/(^\s*)|(\s*$)/g,"")
            if(!/\s/g.test(str)) {
                if((str.indexOf("|") === str.lastIndexOf("|")) && str.indexOf("|") !== -1) {
                    var firstHalfOr = inputValue.substring(0,str.indexOf("|"));
                    var afterHalfOr = inputValue.substring(str.indexOf("|") +1);
                    if(/^(\(-?\d+%?,-?\d+%?\))$/.test(firstHalfOr) || /^(\[-?\d+%?,-?\d+%?\))$/.test(firstHalfOr) || /^(\(-?\d+%?,-?\d+%?\])$/.test(firstHalfOr) || /^(\[-?\d+%?,-?\d+%?\])$/.test(firstHalfOr) || /^(\(-?\d+%?,\))$/.test(firstHalfOr) || /^(\[-?\d+%?,\))$/.test(firstHalfOr) || /^(\(,-?\d+%?\))$/.test(firstHalfOr) || /^(\(,-?\d+%?\])$/.test(firstHalfOr) || /^(!\{-?\d+%?\})$/.test(firstHalfOr)) {
                        if(/^(\(-?\d+%?,-?\d+%?\))$/.test(afterHalfOr) || /^(\[-?\d+%?,-?\d+%?\))$/.test(afterHalfOr) || /^(\(-?\d+%?,-?\d+%?\])$/.test(afterHalfOr) || /^(\[-?\d+%?,-?\d+%?\])$/.test(afterHalfOr) || /^(\(-?\d+%?,\))$/.test(afterHalfOr) || /^(\[-?\d+%?,\))$/.test(afterHalfOr) || /^(\(,-?\d+%?\))$/.test(afterHalfOr) || /^(\(,-?\d+%?\])$/.test(afterHalfOr) || /^(!\{-?\d+%?\})$/.test(afterHalfOr)) {
                            this.error6 = false
                        } else {
                            this.error6 = true
                        }
                    } else {
                        this.error6 = true
                    }
                } else if((str.indexOf("&") === str.lastIndexOf("&")) && str.indexOf("&") !== -1) {
                    var firstHalfAnd = inputValue.substring(0,str.indexOf("&"));
                    var afterHalfAnd = inputValue.substring(str.indexOf("&") +1);
                    if(/^(\(-?\d+%?,-?\d+%?\))$/.test(firstHalfAnd) || /^(\[-?\d+%?,-?\d+%?\))$/.test(firstHalfAnd) || /^(\(-?\d+%?,-?\d+%?\])$/.test(firstHalfAnd) || /^(\[-?\d+%?,-?\d+%?\])$/.test(firstHalfAnd) || /^(\(-?\d+%?,\))$/.test(firstHalfAnd) || /^(\[-?\d+%?,\))$/.test(firstHalfAnd) || /^(\(,-?\d+%?\))$/.test(firstHalfAnd) || /^(\(,-?\d+%?\])$/.test(firstHalfAnd) || /^(!\{-?\d+%?\})$/.test(firstHalfAnd)) {
                        if(/^(\(-?\d+%?,-?\d+%?\))$/.test(afterHalfAnd) || /^(\[-?\d+%?,-?\d+%?\))$/.test(afterHalfAnd) || /^(\(-?\d+%?,-?\d+%?\])$/.test(afterHalfAnd) || /^(\[-?\d+%?,-?\d+%?\])$/.test(afterHalfAnd) || /^(\(-?\d+%?,\))$/.test(afterHalfAnd) || /^(\[-?\d+%?,\))$/.test(afterHalfAnd) || /^(\(,-?\d+%?\))$/.test(afterHalfAnd) || /^(\(,-?\d+%?\])$/.test(afterHalfAnd) || /^(!\{-?\d+%?\})$/.test(afterHalfAnd)) {
                            this.error6 = false
                        } else {
                            this.error6 = true
                        }
                    } else {
                        this.error6 = true
                    }
                } else if(str === "") {
                    this.error6 = false
                }  else {
                    if(/^(\(-?\d+%?,-?\d+%?\))$/.test(str) || /^(\[-?\d+%?,-?\d+%?\))$/.test(str) || /^(\(-?\d+%?,-?\d+%?\])$/.test(str) || /^(\[-?\d+%?,-?\d+%?\])$/.test(str) || /^(\(-?\d+%?,\))$/.test(str) || /^(\[-?\d+%?,\))$/.test(str) || /^(\(,-?\d+%?\))$/.test(str) || /^(\(,-?\d+%?\])$/.test(str) || /^(!\{-?\d+%?\})$/.test(str)) {
                        this.error6 = false
                    } else {
                        this.error6 = true
                    }
                }
            } else {
                this.error6 = true
            }
        },
        validation7:function() {  ////验证同比
            var inputValue = document.getElementById("week2").value;
            var str = inputValue.replace(/(^\s*)|(\s*$)/g,"")
            if(!/\s/g.test(str)) {
                if((str.indexOf("|") === str.lastIndexOf("|")) && str.indexOf("|") !== -1) {
                    var firstHalfOr = inputValue.substring(0,str.indexOf("|"));
                    var afterHalfOr = inputValue.substring(str.indexOf("|") +1);
                    if(/^(\(-?\d+%?,-?\d+%?\))$/.test(firstHalfOr) || /^(\[-?\d+%?,-?\d+%?\))$/.test(firstHalfOr) || /^(\(-?\d+%?,-?\d+%?\])$/.test(firstHalfOr) || /^(\[-?\d+%?,-?\d+%?\])$/.test(firstHalfOr) || /^(\(-?\d+%?,\))$/.test(firstHalfOr) || /^(\[-?\d+%?,\))$/.test(firstHalfOr) || /^(\(,-?\d+%?\))$/.test(firstHalfOr) || /^(\(,-?\d+%?\])$/.test(firstHalfOr) || /^(!\{-?\d+%?\})$/.test(firstHalfOr)) {
                        if(/^(\(-?\d+%?,-?\d+%?\))$/.test(afterHalfOr) || /^(\[-?\d+%?,-?\d+%?\))$/.test(afterHalfOr) || /^(\(-?\d+%?,-?\d+%?\])$/.test(afterHalfOr) || /^(\[-?\d+%?,-?\d+%?\])$/.test(afterHalfOr) || /^(\(-?\d+%?,\))$/.test(afterHalfOr) || /^(\[-?\d+%?,\))$/.test(afterHalfOr) || /^(\(,-?\d+%?\))$/.test(afterHalfOr) || /^(\(,-?\d+%?\])$/.test(afterHalfOr) || /^(!\{-?\d+%?\})$/.test(afterHalfOr)) {
                            this.error7 = false
                        } else {
                            this.error7 = true
                        }
                    } else {
                        this.error7 = true
                    }
                } else if((str.indexOf("&") === str.lastIndexOf("&")) && str.indexOf("&") !== -1) {
                    var firstHalfAnd = inputValue.substring(0,str.indexOf("&"));
                    var afterHalfAnd = inputValue.substring(str.indexOf("&") +1);
                    if(/^(\(-?\d+%?,-?\d+%?\))$/.test(firstHalfAnd) || /^(\[-?\d+%?,-?\d+%?\))$/.test(firstHalfAnd) || /^(\(-?\d+%?,-?\d+%?\])$/.test(firstHalfAnd) || /^(\[-?\d+%?,-?\d+%?\])$/.test(firstHalfAnd) || /^(\(-?\d+%?,\))$/.test(firstHalfAnd) || /^(\[-?\d+%?,\))$/.test(firstHalfAnd) || /^(\(,-?\d+%?\))$/.test(firstHalfAnd) || /^(\(,-?\d+%?\])$/.test(firstHalfAnd) || /^(!\{-?\d+%?\})$/.test(firstHalfAnd)) {
                        if(/^(\(-?\d+%?,-?\d+%?\))$/.test(afterHalfAnd) || /^(\[-?\d+%?,-?\d+%?\))$/.test(afterHalfAnd) || /^(\(-?\d+%?,-?\d+%?\])$/.test(afterHalfAnd) || /^(\[-?\d+%?,-?\d+%?\])$/.test(afterHalfAnd) || /^(\(-?\d+%?,\))$/.test(afterHalfAnd) || /^(\[-?\d+%?,\))$/.test(afterHalfAnd) || /^(\(,-?\d+%?\))$/.test(afterHalfAnd) || /^(\(,-?\d+%?\])$/.test(afterHalfAnd) || /^(!\{-?\d+%?\})$/.test(afterHalfAnd)) {
                            this.error7 = false
                        } else {
                            this.error7 = true
                        }
                    } else {
                        this.error7 = true
                    }
                } else if(str === "") {
                    this.error7 = false
                }  else {
                    if(/^(\(-?\d+%?,-?\d+%?\))$/.test(str) || /^(\[-?\d+%?,-?\d+%?\))$/.test(str) || /^(\(-?\d+%?,-?\d+%?\])$/.test(str) || /^(\[-?\d+%?,-?\d+%?\])$/.test(str) || /^(\(-?\d+%?,\))$/.test(str) || /^(\[-?\d+%?,\))$/.test(str) || /^(\(,-?\d+%?\))$/.test(str) || /^(\(,-?\d+%?\])$/.test(str) || /^(!\{-?\d+%?\})$/.test(str)) {
                        this.error7 = false
                    } else {
                        this.error7 = true
                    }
                }
            } else {
                this.error7 = true
            }
        },
        validation8:function() {  //验证波动
            var inputValue = document.getElementById("sevenDay2").value;
            var str = inputValue.replace(/(^\s*)|(\s*$)/g,"")
            if(!/\s/g.test(str)) {
                if((str.indexOf("|") === str.lastIndexOf("|")) && str.indexOf("|") !== -1) {
                    var firstHalfOr = inputValue.substring(0,str.indexOf("|"));
                    var afterHalfOr = inputValue.substring(str.indexOf("|") +1);
                    if(/^(\(-?\d+%?,-?\d+%?\))$/.test(firstHalfOr) || /^(\[-?\d+%?,-?\d+%?\))$/.test(firstHalfOr) || /^(\(-?\d+%?,-?\d+%?\])$/.test(firstHalfOr) || /^(\[-?\d+%?,-?\d+%?\])$/.test(firstHalfOr) || /^(\(-?\d+%?,\))$/.test(firstHalfOr) || /^(\[-?\d+%?,\))$/.test(firstHalfOr) || /^(\(,-?\d+%?\))$/.test(firstHalfOr) || /^(\(,-?\d+%?\])$/.test(firstHalfOr) || /^(!\{-?\d+%?\})$/.test(firstHalfOr)) {
                        if(/^(\(-?\d+%?,-?\d+%?\))$/.test(afterHalfOr) || /^(\[-?\d+%?,-?\d+%?\))$/.test(afterHalfOr) || /^(\(-?\d+%?,-?\d+%?\])$/.test(afterHalfOr) || /^(\[-?\d+%?,-?\d+%?\])$/.test(afterHalfOr) || /^(\(-?\d+%?,\))$/.test(afterHalfOr) || /^(\[-?\d+%?,\))$/.test(afterHalfOr) || /^(\(,-?\d+%?\))$/.test(afterHalfOr) || /^(\(,-?\d+%?\])$/.test(afterHalfOr) || /^(!\{-?\d+%?\})$/.test(afterHalfOr)) {
                            this.error8 = false
                        } else {
                            this.error8 = true
                        }
                    } else {
                        this.error8 = true
                    }
                } else if((str.indexOf("&") === str.lastIndexOf("&")) && str.indexOf("&") !== -1) {
                    var firstHalfAnd = inputValue.substring(0,str.indexOf("&"));
                    var afterHalfAnd = inputValue.substring(str.indexOf("&") +1);
                    if(/^(\(-?\d+%?,-?\d+%?\))$/.test(firstHalfAnd) || /^(\[-?\d+%?,-?\d+%?\))$/.test(firstHalfAnd) || /^(\(-?\d+%?,-?\d+%?\])$/.test(firstHalfAnd) || /^(\[-?\d+%?,-?\d+%?\])$/.test(firstHalfAnd) || /^(\(-?\d+%?,\))$/.test(firstHalfAnd) || /^(\[-?\d+%?,\))$/.test(firstHalfAnd) || /^(\(,-?\d+%?\))$/.test(firstHalfAnd) || /^(\(,-?\d+%?\])$/.test(firstHalfAnd) || /^(!\{-?\d+%?\})$/.test(firstHalfAnd)) {
                        if(/^(\(-?\d+%?,-?\d+%?\))$/.test(afterHalfAnd) || /^(\[-?\d+%?,-?\d+%?\))$/.test(afterHalfAnd) || /^(\(-?\d+%?,-?\d+%?\])$/.test(afterHalfAnd) || /^(\[-?\d+%?,-?\d+%?\])$/.test(afterHalfAnd) || /^(\(-?\d+%?,\))$/.test(afterHalfAnd) || /^(\[-?\d+%?,\))$/.test(afterHalfAnd) || /^(\(,-?\d+%?\))$/.test(afterHalfAnd) || /^(\(,-?\d+%?\])$/.test(afterHalfAnd) || /^(!\{-?\d+%?\})$/.test(afterHalfAnd)) {
                            this.error8 = false
                        } else {
                            this.error8 = true
                        }
                    } else {
                        this.error8 = true
                    }
                } else if(str === "") {
                    this.error8 = false
                }  else {
                    if(/^(\(-?\d+%?,-?\d+%?\))$/.test(str) || /^(\[-?\d+%?,-?\d+%?\))$/.test(str) || /^(\(-?\d+%?,-?\d+%?\])$/.test(str) || /^(\[-?\d+%?,-?\d+%?\])$/.test(str) || /^(\(-?\d+%?,\))$/.test(str) || /^(\[-?\d+%?,\))$/.test(str) || /^(\(,-?\d+%?\))$/.test(str) || /^(\(,-?\d+%?\])$/.test(str) || /^(!\{-?\d+%?\})$/.test(str)) {
                        this.error8 = false
                    } else {
                        this.error8 = true
                    }
                }
            } else {
                this.error8 = true
            }
        },
        controlInput:function() {  // 勾选完成时间，则环比、同比、波动不可输入；
            if(document.getElementById("selectt").selectedIndex === 1) {
                this.error5 = false
                this.error6 = false
                this.error7 = false
                this.error8 = false
                this.table.h_compare =""
                this.table.t_compare = ""
                this.table.seven_wave_avg = ""
                document.getElementById("dayAdd2").disabled = "disabled"
                document.getElementById("dayAdd2").style.backgroundColor = "#F7F7F7"
                document.getElementById("week2").disabled = "disabled"
                document.getElementById("week2").style.backgroundColor = "#F7F7F7"
                document.getElementById("sevenDay2").disabled = "disabled"
                document.getElementById("sevenDay2").style.backgroundColor = "#F7F7F7"
            } else {
                this.error5 = false
                this.error6 = false
                this.error7 = false
                this.error8 = false
                document.getElementById("dayAdd2").removeAttribute("disabled")
                document.getElementById("dayAdd2").style.backgroundColor = ""
                document.getElementById("week2").removeAttribute("disabled")
                document.getElementById("week2").style.backgroundColor = ""
                document.getElementById("sevenDay2").removeAttribute("disabled")
                document.getElementById("sevenDay2").style.backgroundColor = ""
            }
        },
        queryMessagec: function(){
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
        queryMessaget: function(){
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
                            alert("获取"+r.message.length+"表血缘关系")
                        }

                    }
                })

            }
        },
        getTable:function () {
            vm.dbaseName=$("#selects").val();
            $("#jqGrid").jqGrid({
                url: baseURL + 'yiche/ETLtable/queryAlltable',
                datatype: "json",
                colModel: [
                    // {label: 'ID', name: 'dbId', width: 60, key: true, hidden: true},
                    // { label: 'ID', name: 'tId', width: 100, key: true,hidden:true },
                    // {label: '分组', name: 'partitionKey', width: 60},
                    // {label: 'META', name: 'META', width: 100},
                    {label: '表名', name: 'tblName'},
                    {label: '库名', name: 'dbName'},
                    {label: '注释 ', name: 'comment'},
                    {
                        label: '操作', name: '', width: 100, formatter: function (value, options, row) {
                        return '<a  class="label label-success" onclick="setTable('+options.rowId+')">设置表规则</a>&nbsp;<a  class="label label-success" onclick="setColumn('+options.rowId+')">设置字段规则</a>';
                    }
                    }
                ],
                postData: {"dbName": vm.dbaseName},
                viewrecords: true,
                height: 385,
                rowNum: 30,
                rowList: [30, 50],
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
                gridComplete: function () {
                    //隐藏grid底部滚动条
                    $("#jqGrid").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
                }
            })
            vm.showList = true;
            var page = $("#jqGrid").jqGrid('getGridParam', 'page');
            console.log(page)
            $("#jqGrid").jqGrid('setGridParam', {
                postData:{"dbName":vm.dbaseName},
                page: page
            }).trigger("reloadGrid");
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
            // vm.countModule=4;
            vm.countModule=vm.countModule-1;
        },
        addmodulet:function () {
            vm.countModulet=vm.countModulet+1;
            if(vm.checksModule()){
                return;
            }
        },
        deletemodulet:function(){
            // vm.countModulet=4;
            vm.countModulet=vm.countModulet-1;
        },
        addselectt:function () {
            vm.countt=vm.countt+1;
            if(vm.checks()){
                return;
            }


        },
        addmodulet:function () {
            vm.countModulet=vm.countModulet+1;
            if(vm.checksModule()){
                return;
            }
        },

        query: function () {
            vm.reload();
        },
        saveOrUpdate: function () {
            var url = "yiche/ETLtable/insertOrUpdate";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.ETLtable),
                success: function (r) {
                    if (r.code === 0) {
                        alert('操作成功', function () {
                            vm.reload();
                        });
                    } else {
                        alert(r.msg);
                    }
                }
            });
        },
        insert:function(){
            console.log(vm.column)
            vm.column.create_partition_time = Number(vm.columnPartitionTime)
            if(vm.validator()){
                return ;
            }
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

            if(vm.chooseAlarmGroupItem == null || vm.chooseAlarmGroupItem == ""){
                alert("请选择报警组")
                return true;
            }

            var url = "yiche/column/insert";
            console.log(vm.monitorType)
            console.log(vm.item_id)
            console.log(vm.module_id)
            vm.column.cmonitor_type=vm.monitor;
            vm.column.monitorType=vm.monitorType;
            vm.column.itemId=vm.item_id;
            vm.column.moduleId=vm.module_id;
            vm.column.alarmUniqueid = vm.chooseAlarmGroupItem.uniqueId;

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
        insertTable:function(){
            vm.table.create_partition_time = Number(vm.tablePartitionTime)
            console.log(vm.table)
            if(vm.validatorTable()){
                return ;
            }
            if(vm.countt==1){
                if(vm.monitort!=null&&vm.monitort!=""){
                    Vue.set(vm.monitorType,"a4",vm.monitort);
                }
            }

            if(vm.countt==2){
                if(vm.monitort!=null&&vm.monitort!=""){
                    Vue.set(vm.monitorType,"a4",vm.monitort);
                }
                if(vm.monitort1!=null&&vm.monitort1!=""){
                    Vue.set(vm.monitorType,"a5",vm.monitort1);
                }
            }

            if(vm.countt==3) {
                if(vm.monitort!=null&&vm.monitort!=""){
                    Vue.set(vm.monitorType,"a4",vm.monitort);
                }
                if(vm.monitort1!=null&&vm.monitort1!=""){
                    Vue.set(vm.monitorType,"a5",vm.monitort1);
                }
                if(vm.monitort2!=null&&vm.monitor2!=""){
                    Vue.set(vm.monitorType, "a6", vm.monitort2);
                }
            }

            if(vm.countt==4) {
                if(vm.monitort!=null&&vm.monitort!=""){
                    Vue.set(vm.monitorType,"a4",vm.monitort);
                }
                if(vm.monitort1!=null&&vm.monitort1!=""){
                    Vue.set(vm.monitorType,"a5",vm.monitort1);
                }
                if(vm.monitort2!=null&&vm.monitor2!=""){
                    Vue.set(vm.monitorType, "a6", vm.monitort2);
                }
                if(vm.monitor3!=null&&vm.monitort3!=""){
                    Vue.set(vm.monitorType,"a7",vm.monitort3);
                }
            }

            if(vm.countModulet==1) {
                if(vm.itemt!=null&&vm.itemt!=""){
                    Vue.set(vm.item_id,"a10",vm.itemt);
                }
                if(vm.modulet!=null&&vm.modulet!=""){
                    Vue.set(vm.module_id,"a10",vm.modulet);
                }
            }

            if(vm.countModulet==2) {
                if(vm.itemt!=null&&vm.itemt!=""){
                    Vue.set(vm.item_id,"a10",vm.itemt);
                }
                if(vm.itemt1!=null&&vm.itemt1!=""){
                    Vue.set(vm.item_id,"a11",vm.itemt1);
                }

                if(vm.modulet!=null&&vm.modulet!=""){
                    Vue.set(vm.module_id,"a10",vm.modulet);
                }
                if(vm.modulet1!=null&&vm.modulet1!=""){
                    Vue.set(vm.module_id,"a11",vm.modulet1);
                }
            }

            if(vm.countModulet==3) {
                if(vm.itemt!=null&&vm.itemt!=""){
                    Vue.set(vm.item_id,"a10",vm.itemt);
                }
                if(vm.itemt1!=null&&vm.itemt1!=""){
                    Vue.set(vm.item_id,"a11",vm.itemt1);
                }
                if(vm.itemt2!=null&&vm.itemt2!=""){
                    Vue.set(vm.item_id,"a12",vm.itemt2);
                }
                if(vm.modulet!=null&&vm.modulet!=""){
                    Vue.set(vm.module_id,"a10",vm.modulet);
                }
                if(vm.modulet1!=null&&vm.modulet1!=""){
                    Vue.set(vm.module_id,"a11",vm.modulet1);
                }
                if(vm.modulet2!=null&&vm.modulet2!=""){
                    Vue.set(vm.module_id,"a12",vm.modulet2);
                }

            }

            if(vm.countModulet==4) {
                if(vm.itemt!=null&&vm.itemt!=""){
                    Vue.set(vm.item_id,"a10",vm.itemt);
                }
                if(vm.itemt1!=null&&vm.itemt1!=""){
                    Vue.set(vm.item_id,"a11",vm.itemt1);
                }
                if(vm.itemt2!=null&&vm.itemt2!=""){
                    Vue.set(vm.item_id,"a12",vm.itemt2);
                }
                if(vm.modulet!=null&&vm.modulet!=""){
                    Vue.set(vm.module_id,"a10",vm.modulet);
                }
                if(vm.modulet1!=null&&vm.modulet1!=""){
                    Vue.set(vm.module_id,"a11",vm.modulet1);
                }
                if(vm.modulet2!=null&&vm.modulet2!=""){
                    Vue.set(vm.module_id,"a12",vm.modulet2);
                }
                if(vm.itemt3!=null&&vm.itemt3!=""){
                    Vue.set(vm.item_id,"a13",vm.itemt3);
                }
                if(vm.modulet3!=null&&vm.modulet3!=""){
                    Vue.set(vm.module_id,"a13",vm.modulet3);
                }
            }

            if(vm.countModulet==5) {
                if(vm.itemt!=null&&vm.itemt!=""){
                    Vue.set(vm.item_id,"a10",vm.itemt);
                }
                if(vm.itemt1!=null&&vm.itemt1!=""){
                    Vue.set(vm.item_id,"a11",vm.itemt1);
                }
                if(vm.itemt2!=null&&vm.itemt2!=""){
                    Vue.set(vm.item_id,"a12",vm.itemt2);
                }
                if(vm.modulet!=null&&vm.modulet!=""){
                    Vue.set(vm.module_id,"a10",vm.modulet);
                }
                if(vm.modulet1!=null&&vm.modulet1!=""){
                    Vue.set(vm.module_id,"a11",vm.modulet1);
                }
                if(vm.modulet2!=null&&vm.modulet2!=""){
                    Vue.set(vm.module_id,"a12",vm.modulet2);
                }
                if(vm.itemt3!=null&&vm.itemt3!=""){
                    Vue.set(vm.item_id,"a13",vm.itemt3);
                }
                if(vm.modulet3!=null&&vm.modulet3!=""){
                    Vue.set(vm.module_id,"a13",vm.modulet3);
                }
                if(vm.itemt4!=null&&vm.itemt4!=""){
                    Vue.set(vm.item_id,"a14",vm.itemt4);
                }
                if(vm.modulet4!=null&&vm.modulet4!=""){
                    Vue.set(vm.module_id,"a14",vm.modulet4);
                }
            }

            if(vm.countModulet==6) {
                if(vm.itemt!=null&&vm.itemt!=""){
                    Vue.set(vm.item_id,"a10",vm.itemt);
                }
                if(vm.itemt1!=null&&vm.itemt1!=""){
                    Vue.set(vm.item_id,"a11",vm.itemt1);
                }
                if(vm.itemt2!=null&&vm.itemt2!=""){
                    Vue.set(vm.item_id,"a12",vm.itemt2);
                }
                if(vm.modulet!=null&&vm.modulet!=""){
                    Vue.set(vm.module_id,"a10",vm.modulet);
                }
                if(vm.modulet1!=null&&vm.modulet1!=""){
                    Vue.set(vm.module_id,"a11",vm.modulet1);
                }
                if(vm.modulet2!=null&&vm.modulet2!=""){
                    Vue.set(vm.module_id,"a12",vm.modulet2);
                }
                if(vm.itemt3!=null&&vm.itemt3!=""){
                    Vue.set(vm.item_id,"a13",vm.itemt3);
                }
                if(vm.modulet3!=null&&vm.modulet3!=""){
                    Vue.set(vm.module_id,"a13",vm.modulet3);
                }
                if(vm.itemt4!=null&&vm.itemt4!=""){
                    Vue.set(vm.item_id,"a14",vm.itemt4);
                }
                if(vm.modulet4!=null&&vm.modulet4!=""){
                    Vue.set(vm.module_id,"a14",vm.modulet4);
                }
                if(vm.itemt5!=null&&vm.itemt5!=""){
                    Vue.set(vm.item_id,"a15",vm.itemt5);
                }
                if(vm.modulet5!=null&&vm.modulet5!=""){
                    Vue.set(vm.module_id,"a15",vm.modulet5);
                }
            }

            if(vm.countModulet==7) {
                if(vm.itemt!=null&&vm.itemt!=""){
                    Vue.set(vm.item_id,"a10",vm.itemt);
                }
                if(vm.itemt1!=null&&vm.itemt1!=""){
                    Vue.set(vm.item_id,"a11",vm.itemt1);
                }
                if(vm.itemt2!=null&&vm.itemt2!=""){
                    Vue.set(vm.item_id,"a12",vm.itemt2);
                }
                if(vm.modulet!=null&&vm.modulet!=""){
                    Vue.set(vm.module_id,"a10",vm.modulet);
                }
                if(vm.modulet1!=null&&vm.modulet1!=""){
                    Vue.set(vm.module_id,"a11",vm.modulet1);
                }
                if(vm.modulet2!=null&&vm.modulet2!=""){
                    Vue.set(vm.module_id,"a12",vm.modulet2);
                }
                if(vm.itemt3!=null&&vm.itemt3!=""){
                    Vue.set(vm.item_id,"a13",vm.itemt3);
                }
                if(vm.modulet3!=null&&vm.modulet3!=""){
                    Vue.set(vm.module_id,"a13",vm.modulet3);
                }
                if(vm.itemt4!=null&&vm.itemt4!=""){
                    Vue.set(vm.item_id,"a14",vm.itemt4);
                }
                if(vm.modulet4!=null&&vm.modulet4!=""){
                    Vue.set(vm.module_id,"a14",vm.modulet4);
                }
                if(vm.itemt5!=null&&vm.itemt5!=""){
                    Vue.set(vm.item_id,"a15",vm.itemt5);
                }
                if(vm.modulet5!=null&&vm.modulet5!=""){
                    Vue.set(vm.module_id,"a15",vm.modulet5);
                }
                if(vm.itemt6!=null&&vm.itemt6!=""){
                    Vue.set(vm.item_id,"a16",vm.itemt6);
                }
                if(vm.modulet6!=null&&vm.modulet6!=""){
                    Vue.set(vm.module_id,"a16",vm.modulet6);
                }
            }

            if(vm.countModulet==8) {
                if(vm.itemt!=null&&vm.itemt!=""){
                    Vue.set(vm.item_id,"a10",vm.itemt);
                }
                if(vm.itemt1!=null&&vm.itemt1!=""){
                    Vue.set(vm.item_id,"a11",vm.itemt1);
                }
                if(vm.itemt2!=null&&vm.itemt2!=""){
                    Vue.set(vm.item_id,"a12",vm.itemt2);
                }
                if(vm.modulet!=null&&vm.modulet!=""){
                    Vue.set(vm.module_id,"a10",vm.modulet);
                }
                if(vm.modulet1!=null&&vm.modulet1!=""){
                    Vue.set(vm.module_id,"a11",vm.modulet1);
                }
                if(vm.modulet2!=null&&vm.modulet2!=""){
                    Vue.set(vm.module_id,"a12",vm.modulet2);
                }
                if(vm.itemt3!=null&&vm.itemt3!=""){
                    Vue.set(vm.item_id,"a13",vm.itemt3);
                }
                if(vm.modulet3!=null&&vm.modulet3!=""){
                    Vue.set(vm.module_id,"a13",vm.modulet3);
                }
                if(vm.itemt4!=null&&vm.itemt4!=""){
                    Vue.set(vm.item_id,"a14",vm.itemt4);
                }
                if(vm.modulet4!=null&&vm.modulet4!=""){
                    Vue.set(vm.module_id,"a14",vm.modulet4);
                }
                if(vm.itemt5!=null&&vm.itemt5!=""){
                    Vue.set(vm.item_id,"a15",vm.itemt5);
                }
                if(vm.modulet5!=null&&vm.modulet5!=""){
                    Vue.set(vm.module_id,"a15",vm.modulet5);
                }
                if(vm.itemt6!=null&&vm.itemt6!=""){
                    Vue.set(vm.item_id,"a16",vm.itemt6);
                }
                if(vm.modulet6!=null&&vm.modulet6!=""){
                    Vue.set(vm.module_id,"a16",vm.modulet6);
                }
                if(vm.itemt7!=null&&vm.itemt7!=""){
                    Vue.set(vm.item_id,"a17",vm.itemt7);
                }
                if(vm.modulet7!=null&&vm.modulet7!=""){
                    Vue.set(vm.module_id,"a17",vm.modulet7);
                }
            }

            if(vm.countModulet==9) {
                if(vm.itemt!=null&&vm.itemt!=""){
                    Vue.set(vm.item_id,"a10",vm.itemt);
                }
                if(vm.itemt1!=null&&vm.itemt1!=""){
                    Vue.set(vm.item_id,"a11",vm.itemt1);
                }
                if(vm.itemt2!=null&&vm.itemt2!=""){
                    Vue.set(vm.item_id,"a12",vm.itemt2);
                }
                if(vm.modulet!=null&&vm.modulet!=""){
                    Vue.set(vm.module_id,"a10",vm.modulet);
                }
                if(vm.modulet1!=null&&vm.modulet1!=""){
                    Vue.set(vm.module_id,"a11",vm.modulet1);
                }
                if(vm.modulet2!=null&&vm.modulet2!=""){
                    Vue.set(vm.module_id,"a12",vm.modulet2);
                }
                if(vm.itemt3!=null&&vm.itemt3!=""){
                    Vue.set(vm.item_id,"a13",vm.itemt3);
                }
                if(vm.modulet3!=null&&vm.modulet3!=""){
                    Vue.set(vm.module_id,"a13",vm.modulet3);
                }
                if(vm.itemt4!=null&&vm.itemt4!=""){
                    Vue.set(vm.item_id,"a14",vm.itemt4);
                }
                if(vm.modulet4!=null&&vm.modulet4!=""){
                    Vue.set(vm.module_id,"a14",vm.modulet4);
                }
                if(vm.itemt5!=null&&vm.itemt5!=""){
                    Vue.set(vm.item_id,"a15",vm.itemt5);
                }
                if(vm.modulet5!=null&&vm.modulet5!=""){
                    Vue.set(vm.module_id,"a15",vm.modulet5);
                }
                if(vm.itemt6!=null&&vm.itemt6!=""){
                    Vue.set(vm.item_id,"a16",vm.itemt6);
                }
                if(vm.modulet6!=null&&vm.modulet6!=""){
                    Vue.set(vm.module_id,"a16",vm.modulet6);
                }
                if(vm.itemt7!=null&&vm.itemt7!=""){
                    Vue.set(vm.item_id,"a17",vm.itemt7);
                }
                if(vm.modulet7!=null&&vm.modulet7!=""){
                    Vue.set(vm.module_id,"a17",vm.modulet7);
                }
                if(vm.itemt8!=null&&vm.itemt8!=""){
                    Vue.set(vm.item_id,"a18",vm.itemt8);
                }
                if(vm.modulet8!=null&&vm.modulet8!=""){
                    Vue.set(vm.module_id,"a18",vm.modulet8);
                }
            }

            if(vm.countModulet==10) {
                if(vm.itemt!=null&&vm.itemt!=""){
                    Vue.set(vm.item_id,"a10",vm.itemt);
                }
                if(vm.itemt1!=null&&vm.itemt1!=""){
                    Vue.set(vm.item_id,"a11",vm.itemt1);
                }
                if(vm.itemt2!=null&&vm.itemt2!=""){
                    Vue.set(vm.item_id,"a12",vm.itemt2);
                }
                if(vm.modulet!=null&&vm.modulet!=""){
                    Vue.set(vm.module_id,"a10",vm.modulet);
                }
                if(vm.modulet1!=null&&vm.modulet1!=""){
                    Vue.set(vm.module_id,"a11",vm.modulet1);
                }
                if(vm.modulet2!=null&&vm.modulet2!=""){
                    Vue.set(vm.module_id,"a12",vm.modulet2);
                }
                if(vm.itemt3!=null&&vm.itemt3!=""){
                    Vue.set(vm.item_id,"a13",vm.itemt3);
                }
                if(vm.modulet3!=null&&vm.modulet3!=""){
                    Vue.set(vm.module_id,"a13",vm.modulet3);
                }
                if(vm.itemt4!=null&&vm.itemt4!=""){
                    Vue.set(vm.item_id,"a14",vm.itemt4);
                }
                if(vm.modulet4!=null&&vm.modulet4!=""){
                    Vue.set(vm.module_id,"a14",vm.modulet4);
                }
                if(vm.itemt5!=null&&vm.itemt5!=""){
                    Vue.set(vm.item_id,"a15",vm.itemt5);
                }
                if(vm.modulet5!=null&&vm.modulet5!=""){
                    Vue.set(vm.module_id,"a15",vm.modulet5);
                }
                if(vm.itemt6!=null&&vm.itemt6!=""){
                    Vue.set(vm.item_id,"a16",vm.itemt6);
                }
                if(vm.modulet6!=null&&vm.modulet6!=""){
                    Vue.set(vm.module_id,"a16",vm.modulet6);
                }
                if(vm.itemt7!=null&&vm.itemt7!=""){
                    Vue.set(vm.item_id,"a17",vm.itemt7);
                }
                if(vm.modulet7!=null&&vm.modulet7!=""){
                    Vue.set(vm.module_id,"a17",vm.modulet7);
                }
                if(vm.itemt8!=null&&vm.itemt8!=""){
                    Vue.set(vm.item_id,"a18",vm.itemt8);
                }
                if(vm.modulet8!=null&&vm.modulet8!=""){
                    Vue.set(vm.module_id,"a18",vm.modulet8);
                }
                if(vm.itemt9!=null&&vm.itemt9!=""){
                    Vue.set(vm.item_id,"a19",vm.itemt9);
                }
                if(vm.modulet9!=null&&vm.modulet9!=""){
                    Vue.set(vm.module_id,"a19",vm.modulet9);
                }
            }

            if(vm.chooseAlarmGroupItem == null || vm.chooseAlarmGroupItem == ""){
                alert("请选择报警组")
                return true;
            }

            vm.table.alarmUniqueid = vm.chooseAlarmGroupItem.uniqueId;

            var url = "yiche/table/insert";
            vm.table.monitor_type= vm.monitort;
            vm.table.monitorType=vm.monitorType;
            vm.table.itemId=vm.item_id;
            vm.table.moduleId=vm.module_id;
            vm.table.alarmUniqueid = vm.chooseAlarmGroupItem.uniqueId;
            vm.column.column_name=vm.column.columnName;
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.table),
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
            var page = $("#jqGrid").jqGrid('getGridParam', 'page');
            $("#jqGrid").jqGrid('setGridParam', {
                postData: {"table_name": vm.table_name,"dbName":vm.dbaseName},
                page: page
            }).trigger("reloadGrid");
        },
        checks:function () {
            if(vm.count>4||vm.countt>4){
                alert("该类型一次最多添加4组数据")
                return true;
            }
        },
        // checksItem:function () {
        //     if(vm.countItem>10||vm.countItemt>10){
        //         alert("该类型一次最多添加4组数据")
        //         return true;
        //     }
        // },
        checksModule:function () {
            if(vm.countModule>10||vm.countModulet>10){
                alert("该类型一次最多添加10组数据")
                return true;
            }
        },
        validator: function () {
            var checkcreateTime=/^[0-1]$/;
            if(!checkcreateTime.test(vm.column.create_partition_time)){
                alert("分区生成时间格式不正确")
                return true;
            }
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

        },
        validatorTable: function () {
            // if(isBlank(vm.column.cmonitor_type)&&(vm.column.cmonitor_type)=="请选择"){
            //     alert("监控类型不能为空");
            //     return true;
            // }
            // var checktime=/^([0-1]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;
            // if(!checktime.test(vm.table.readyTime)){
            //     alert("数据就绪时间格式不正确");
            //     return true;
            // }
            if(vm.monitort=="完成时间"){
                var checkSetTime=/^([0-1]?[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/;
                if(!checkSetTime.test(vm.table.self)){
                    alert("完成时间规则不正确，正确格式：‘05:30:00’")
                    return true;
                }
            }
            var checkcreateTime=/^[0-1]$/;
            if(!checkcreateTime.test(vm.table.create_partition_time)){
                alert("分区生成时间格式不正确")
                return true;
            }
            // if(isBlank(vm.table.tabcondition)){
            //     alert("分区生成时间不能为空");
            //     return true;
            // }
            // if(isBlank(vm.table.alarm_type)){
            //     alert("报警方式不能为空");
            //     return true;
            // }
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
            if(isBlank(vm.table.tabowner)){
                alert("负责人不能为空");
                return true;
            }
            if(isBlank(vm.table.partition_type)){
                alert("监控周期不能为空");
                return true;
            }
            // if(isBlank(vm.table.content)){
            //     alert("通知内容不能为空");
            //     return true;
            // }

            if(this.error5 === true || this.error6 === true || this.error7 === true || this.error8 === true) {
                alert("监控范围格式有误");
                return true;
            }
        }
    }
});
function setValueItem(){
    console.log("aaa")
    var parentId=document.getElementById("selt1").value;
    console.log(parentId)
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
function setChooseAlarmGroup2(){
    var uniqueId = document.getElementById("selAlarmGroupId2").value;
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
    console.log(parentId);
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

function setValueItemt(){
    var parentId=document.getElementById("seltt1").value;
    console.log(parentId)
    $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
        vm.moduleNamet=r.moduleName;
    });
}
function setValueItemt1(){
    var parentId=document.getElementById("seltt2").value;
    $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
        vm.moduleNamet1=r.moduleName;
    });
}
function setValueItemt2(){
    var parentId=document.getElementById("seltt3").value;
    $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
        vm.moduleNamet2=r.moduleName;
    });
}
function setValueItemt3(){
    var parentId=document.getElementById("seltt4").value;
    $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
        vm.moduleNamet3=r.moduleName;
    });
}
function setValueItemt4(){
    var parentId=document.getElementById("seltt5").value;
    $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
        vm.moduleNamet4=r.moduleName;
    });
}
function setValueItemt5(){
    var parentId=document.getElementById("seltt6").value;
    $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
        vm.moduleNamet5=r.moduleName;
    });
}
function setValueItemt6(){
    var parentId=document.getElementById("seltt7").value;
    $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
        vm.moduleNamet6=r.moduleName;
    });
}
function setValueItemt7(){
    var parentId=document.getElementById("seltt8").value;
    $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
        vm.moduleNamet7=r.moduleName;
    });
}
function setValueItemt8(){
    var parentId=document.getElementById("seltt9").value;
    $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
        vm.moduleNamet8=r.moduleName;
    });
}
function setValueItemt9(){
    var parentId=document.getElementById("seltt10").value;
    $.getJSON(baseURL + "item/queryAllModuleName/"+parentId, function(r){
        vm.moduleNamet9=r.moduleName;
    });
}
//表规则设置监控周期的js
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
//字段规则设置监控周期的js
function setCyclec(){
    var setCycle=document.getElementById("setCylec").value;
    if(setCycle=="月"){
        $("#dayhc").prop("style","display:none");
        $("#monthhc").prop("style","display:block");
        $("#daytc").prop("style","display:none");
        $("#monthtc").prop("style","display:block");
    }else {
        $("#dayhc").prop("style","display:block");
        $("#monthhc").prop("style","display:none");
        $("#daytc").prop("style","display:block");
        $("#monthtc").prop("style","display:none");
    }
}
function setColumn(obj) {
    $('#set').prop("style","display:none");
    $('#setTable').prop("style","display:none");
    $("#setColumn").prop("style","display:block");
    var rowData = $("#jqGrid").jqGrid('getRowData', obj);
    var tableName = rowData.tblName;
    var dbName = rowData.dbName;
    vm.column.ctable_name=tableName;
    vm.column.cdatabase_name=dbName;
    vm.column.cowner=vm.user.username;
    vm.count=1;
    vm.countModule=1;
    vm.countt=0;
    vm.countItemt=0;
    vm.countModulet=0;
    vm.item_id={};
    vm.module_id={};
    vm.monitorType={};
    console.log(vm.column.cowner+"column")
    $.get(baseURL + "yiche/ETLtable/queryAllColumnName/" + tableName+"/"+dbName, function (r) {
        vm.showList = false;
        vm.title = "设置字段规则";
        vm.columnName = r.columnName;
    });
};
function set(obj) {
    $("#setColumn").prop("style", "display:none");
    $("#setTable").prop("style", "display:none");
    $("#set").prop("style", "display:block");
    var rowData = $("#jqGrid").jqGrid('getRowData', obj);
    var tblName = rowData.tblName;
    var dbName = rowData.dbName;
    $.get(baseURL + "yiche/ETLtable/getTableByTableName/" + tblName + "/" + dbName, function (r) {
        vm.showList = false;
        vm.title = "监控设置";
        vm.ETLtable = r.ETLtable;
    });
}
function setTable(obj) {
    // var jobId = getSelectedRow();
    $("#setColumn").prop("style","display:none");
    $("#set").prop("style","display:none");
    $("#setTable").prop("style","display:block");
    // var id = $('#jqGrid').jqGrid('getGridParam', 'selrow');
    var rowData = $("#jqGrid").jqGrid('getRowData', obj);
    vm.table.table_name = rowData.tblName;
    vm.table.database_name=rowData.dbName;
    vm.table.tabowner=vm.user.username;
    console.log(vm.table.tabowner+"table")
    vm.count=0;
    vm.countModule=0;
    vm.countt=1;
    vm.countItemt=1;
    vm.countModulet=1;
    vm.showList = false;
    vm.title = "表规则设置";
    vm.item_id={};
    vm.module_id={};
    vm.monitorType={};
}