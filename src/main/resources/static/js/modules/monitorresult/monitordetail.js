
var vm = new Vue({
    el:'#rrapp',
    data:{
        showList: true,
        query:{
            databaseName:null,
            tableName: null,
        }
    },
    methods: {
        parsingUrl:function(url) {
            var str = url.split('?')[1];
            items = str.split('&');
            var arr,name,value,newArr = [];
            for(var i = 0;i < items.length;i++) {
                arr = items[i].split('=');
                name = arr[0]
                newArr.push(name)
                value = arr[1]
                newArr.push(value)
            }
            this.query.databaseName = newArr[3]
            this.query.tableName = newArr[1]
            console.log(newArr)
            return newArr;
        }
    },
    created:function() {
        var _this = this;
        $(function() {
            $("#jqGrid").jqGrid({
                url: baseURL + 'yiche/alarm/queryAllByTblName',
                datatype: "json",
                postData: {"tableName": _this.query.tableName,"dbName": _this.query.databaseName},
                colModel: [
                    { label: 'ID', name: 'id', width: 100 },
                    { label: '字段', name: 'levelType', width: 100 },
                    { label: '类型', name: 'type', width: 100 },
                    { label: '负责人', name: 'leader', width: 100 },
                    { label: '取值范围', name: 'scope', width: 100 },
                    { label: '实际值', name: 'value', width: 100 },
                    { label: '状态', name: 'status', width: 100},
                    { label: '操作状态', name: 'handle', width: 100}
                ],
                viewrecords: true,
                height: 400,
                rowNum: 10,
                rowList : [10,30,50],
                rownumWidth: 25,
                autowidth:true,
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
                    $("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
                },
                caption: "库名:&nbsp;&nbsp;&nbsp;" +_this.query.databaseName + "&nbsp;&nbsp;&nbsp;表名:&nbsp;&nbsp;&nbsp;" + _this.query.tableName
            });
        })
        this.parsingUrl(window.location.href)
    }
});



