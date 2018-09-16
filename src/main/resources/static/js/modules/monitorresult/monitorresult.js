var vm = new Vue({
    el:'#rrapp',
    data:{
        query:{
            databaseName:null,
            tableName: null,
        },
        showList: true,
        title: null,
        select:'selected',
        table: {},
        tblName:null
    },
    methods: {
        query: function () {
            vm.reload();
        },
        reload: function (event) {
            vm.showList = true;
            var page = $("#jqGrid").jqGrid('getGridParam','page');
            console.log(page)
            $("#jqGrid").jqGrid('setGridParam',{
                postData:{'ctable_name': vm.q.table_name,'cdatabase_name':vm.q.database_name},
                page:page
            }).trigger("reloadGrid");
        },
        bindSubGrid:function(subgrid_id, collectLineId) {
            var subgrid_table_id;
            subgrid_table_id = subgrid_id + "_t"; // (3)根据subgrid_id定义对应的子表格的table的id

            var subgrid_pager_id;
            subgrid_pager_id = subgrid_id + "_pgr" // (4)根据subgrid_id定义对应的子表格的pager的id
            var rowData = $("#jqGrid").jqGrid('getRowData', collectLineId);
            vm.tblName=rowData.tableName;
            vm.dbName=rowData.databaseName;
            // (5)动态添加子报表的table和pager
            $("#" + subgrid_id)
                .html(
                    "<table style='border: 0px; cellspacing:0px; cellpadding:0px' id="+subgrid_table_id+"  ></table><div id="+subgrid_pager_id+"></div>");
            // (6)创建jqGrid对象
            $("#" + subgrid_table_id)
                .jqGrid(
                    {

                        url :  baseURL + 'yiche/alarm/queryAllByTblName',
                        // (7)子表格数据对应的url，注意传入的contact.id参数
                        datatype : "json",
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
                        height: 185,
                        rowNum: 5,
                        rowList : [5,10,50],
                        // rownumbers: true,
                        rownumWidth: 25,
                        autowidth:true,
                        // multiselect: true,
                        pager: "#"+subgrid_pager_id,
                        postData: {"tableName": vm.tblName,"dbName":vm.dbName},
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
        },
        transferParams:function() {
            var _this = this
            document.getElementById('jqGrid').addEventListener('click',function(event) {
                _this.query.databaseName  = $("#jqGrid").getRowData(event.target.id).databaseName
                _this.query.tableName = $("#jqGrid").getRowData(event.target.id)
            })
        }
    },
    created:function() {
        var _this = this;
        $(function () {
            $("#jqGrid").jqGrid({
                url: baseURL + 'yiche/alarm/queryAll',
                datatype: "json",
                colModel: [
                    { label: 'ID', name: 'id', width: 100,key:true, hidden:true },
                    { label: '库名', name: 'databaseName', width: 100 },
                    { label: '表名', name: 'tableName', width: 100 },
                    { label: '成功/失败/全部', name: 'resultCount', width: 50 },
                    { label: '', name: ' ', width: 50,formatter: function(value, options, row){
                        return  '<a href="monitordetail.html?tableName='+row.tableName+'&databaseName='+row.databaseName+'" target="_blank"><span>详情</span></a>';
                    }}
                ],
                viewrecords: true,
                height: 385,
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
                subGrid : true,
                subGridRowExpanded : function(subgrid_id, row_id) {//子表格容器的id和需要展开子表格的行id
                    _this.bindSubGrid(subgrid_id, row_id);
                },
                gridComplete:function(){
                    $("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
                    $("#jqGrid").getRowData()
                }
            });
        });
    },
    mounted:function() {
        this.transferParams()
    }
});

// gridComplete : function() { // 数据加载完成后 添加 采购按钮
//     var ids = jQuery("#" + subgrid_table_id)
//         .jqGrid('getDataIDs');
//     for (var i = 0; i < ids.length; i++) {
//         var id = ids[i];
//         var editBtn = "<div class='btnBox'> "
//             + "<button   class='btn btn-primary' onclick='editItem("
//             + id
//             + ")'>编辑</button>    "
//             + "<button  class='btn btn-primary' onclick='deleteItem("
//             + subgrid_table_id + "," + id
//             + ")'>删除</button></div>";
//         $("#" + subgrid_table_id).jqGrid(
//             'setRowData', id, {
//                 edit : editBtn
//             });
//     }
// },






