package com.bitauto.modules.ETLtable.controller;

import com.bitauto.common.utils.PageUtils;
import com.bitauto.common.utils.Query;
import com.bitauto.common.utils.R;
import com.bitauto.modules.ETLtable.request.ETLcolumnRequest;
import com.bitauto.modules.ETLtable.response.ETLdbResponse;
import com.bitauto.modules.ETLtable.response.ETLtableResponse;
import com.bitauto.modules.ETLtable.service.ETLtableService;
import com.bitauto.modules.table.entity.TableRuler;
import com.bitauto.modules.table.service.TableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("yiche/ETLtable")
public class ETLtableController {
    @Autowired
    private ETLtableService etLtableService;

    @RequestMapping("/queryAllDbName")
    @ResponseBody
    public Map queryAllDbName(){
        List<String> dbName=new ArrayList<>();
        List<ETLdbResponse> etLdbResponses = etLtableService.queryAllDatabases();
        for (ETLdbResponse edb:etLdbResponses) {
            dbName.add(edb.getName());
        }
        Collections.sort(dbName);
        return R.ok().put("dbName",dbName);
    }

    @RequestMapping("/queryAlltable")
    @ResponseBody
    public Map queryAllTRuler(@RequestParam Map<String, Object> params) throws SQLException, ClassNotFoundException {
        Query query = new Query(params);
        List<ETLtableResponse> list=new ArrayList<>();
        List<ETLdbResponse> etLdbResponses =null;
        List<ETLtableResponse> etLtableResponses=null;
        System.out.println(params.get("table_name"));
        int total=0;
        if(params.get("table_name")==null||params.get("table_name").equals("")){
            etLdbResponses = etLtableService.queryAllDatabases();
            for (ETLdbResponse etLdbResponse:etLdbResponses) {
               if(params.get("dbName").equals(etLdbResponse.getName())){
                   //获取所有的表的详细信息
                   etLtableResponses = etLtableService.queryAllTable(etLdbResponse,query.getPage(),query.getLimit());
                   total = etLtableService.getTableTotal(etLdbResponse);
                   for (ETLtableResponse etLtableResponse:etLtableResponses){
                       list.add(etLtableResponse);
                   }
               }
            }
            PageUtils pageUtil = new PageUtils(list, total, query.getLimit(), query.getPage());
            return R.ok().put("page",pageUtil);
        }else{
            etLdbResponses = etLtableService.queryAllDatabases();
            for (ETLdbResponse etLdbResponse:etLdbResponses) {
                if(params.get("dbName").equals(etLdbResponse.getName())){
                    //获取所有的表的详细信息
                    etLtableResponses = etLtableService.queryAllTable(etLdbResponse);
//                    total = etLtableService.getTableTotal(etLdbResponse);
                    String table_name= (String) params.get("table_name");
                    for (ETLtableResponse e:etLtableResponses){
                        int i = e.getTblName().indexOf(table_name);
                        if(i!=-1){
                            list.add(e);
                        }
                    }
                }
            }
            PageUtils pageUtil = new PageUtils(list, 1, 50, 1);
            return R.ok().put("page",pageUtil);
        }
    }

    @RequestMapping("/getTableByTableName/{tableName}/{dbName}")
    public Map getTableByTableName(@PathVariable("tableName") String tableName,@PathVariable("dbName") String dbName) throws SQLException, ClassNotFoundException {
        List<ETLdbResponse> etLdbResponses = etLtableService.queryAllDatabases();
        for (ETLdbResponse edb:etLdbResponses
             ) {
            if(dbName.equals(edb.getName())){
                List<ETLtableResponse> etLtableResponses = etLtableService.queryAllTableSet(edb,1,1);
                for (ETLtableResponse etbl:etLtableResponses
                     ) {
                    if (tableName.equals(etbl.getTblName())){
                        return R.ok().put("ETLtable",etbl);
                    }
                }
            }
        }
        return R.error("获取数据异常，请联系管理员");
    }

    @RequestMapping("/queryAllColumnName/{tblName}/{dbName}")
    @ResponseBody
    public Map queryAllColumnName(@PathVariable("tblName") String tableName,@PathVariable("dbName") String dbName){
        List<String> strings = etLtableService.queryAllColumnName(new ETLcolumnRequest(tableName,dbName));
        return R.ok().put("columnName",strings);
    }


    @RequestMapping("/insertOrUpdate")
    @ResponseBody
    public Map insert(@RequestBody ETLtableResponse etLtableResponse,List<String> monitorType){
//        String table_name = etLtableResponse.getTblName();
//        String db_name= etLtableResponse.getDbName();
//        String monitor_time=etLtableResponse.getMonitor_time();
////        TableRuler tableRuler = tableService.queryTRulerBydbNameAndTableName(table_name, db_name);
//        TableRuler tableRuler1=new TableRuler();
//        if(tableRuler!=null&&tableRuler.getMonitor_time()!=null){
//            tableRuler.setMonitor_time(monitor_time);
//            boolean b = tableService.updateTRuler(tableRuler);
//            if(b){
//                return R.ok();
//            }else{
//                return R.error("添加数据失败");
//            }
//        }else{
//            tableRuler1.setTable_name(table_name);
//            tableRuler1.setDatabase_name(db_name);
//            tableRuler1.setMonitor_time(monitor_time);
//            boolean b = tableService.insertTRuler(tableRuler1,monitorType);
//            if(b){
//                return R.ok();
//            }else{
//                return R.error("更新数据失败");
//            }
//        }
        return R.ok();
    }
}