package com.bitauto.modules.ETLtable.service.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.bitauto.common.message.FeedInfo;
import com.bitauto.modules.ETLtable.request.ETLcolumnRequest;
import com.bitauto.modules.ETLtable.request.ETLdbNameRequest;
import com.bitauto.modules.ETLtable.request.ETLtbRequest;
import com.bitauto.modules.ETLtable.response.ETLdbResponse;
import com.bitauto.modules.ETLtable.response.ETLtableResponse;
import com.bitauto.modules.ETLtable.service.ETLtableService;
import com.bitauto.modules.table.dao.TableDao;
import com.bitauto.modules.table.entity.TableRuler;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service("eTltableService")
public class ETLtableServiceImpl implements ETLtableService {
    private static final String url="172.20.8.122";
//    private static final String url="192.168.87.236";
    /**
     * 获取所有数据库的详情信息
     * @return,
     */
    @Override
    public List<ETLdbResponse> queryAllDatabases() {

        String result=null;
        try {
            result=FeedInfo.saveDataToInterface("http://"+url+":8762/db/listdetail");
        } catch (IOException e) {
            e.printStackTrace();
        }
        JSONObject jsonObject = JSONObject.parseObject(result);
        int code = (int) jsonObject.get("code");
        List<ETLdbResponse>  dbList=new ArrayList<>();
        if(code==0){
            Object data = jsonObject.get("data");
            JSONArray objects = JSONObject.parseArray(JSON.toJSON(data).toString());
            for(int i=0;i<objects.size();i++){
                Gson gson=new Gson();
                ETLdbResponse etLdbResponse = gson.fromJson(objects.get(i).toString(), ETLdbResponse.class);
                dbList.add(etLdbResponse);
            }
            return dbList;
        }else{
            throw new RuntimeException("获取数据异常");
        }
    }

    @Override
    public List<ETLtableResponse> queryAllTable(ETLdbResponse etLdbResponse) throws SQLException, ClassNotFoundException {
        String result=null;
        ETLdbNameRequest etLdbNameRequest=new ETLdbNameRequest(etLdbResponse.getDbId());
        try {
            // 根据数据库ID获取该库下的所有的表详情
            result=FeedInfo.saveDataToInterface(etLdbNameRequest,"http://"+url+":8762/db/tables?dbId="+etLdbResponse.getDbId());
        } catch (IOException e) {
            e.printStackTrace();
        }
        JSONObject jsonObject = JSONObject.parseObject(result);
        int code = (int) jsonObject.get("code");
        System.out.println(code+"获取表详情接口状态");
        List<ETLtableResponse>  tableList=new ArrayList<>();
        if(code!=-1){
            Object data = jsonObject.get("data");
            JSONArray objects = JSONObject.parseArray(JSON.toJSON(data).toString());
            for(int i=0;i<objects.size();i++){
                String s = objects.get(i).toString();
                Gson gson=new Gson();
                ETLtableResponse etLtableResponse = gson.fromJson(s, ETLtableResponse.class);
                etLtableResponse.setDbName(etLdbResponse.getName());
                //此处获取表的列数，并添加到对应的实体类中
                tableList.add(etLtableResponse);
            }
        }

        return tableList;
    }
    @Override
    public List<ETLtableResponse> queryAllTable(ETLdbResponse etLdbResponse,int page,int limit) throws SQLException, ClassNotFoundException {
        String result=null;
        ETLdbNameRequest etLdbNameRequest=new ETLdbNameRequest(etLdbResponse.getDbId());
        try {
            //根据数据库ID获取该库下的所有的表详情
            result=FeedInfo.saveDataToInterface(etLdbNameRequest,"http://"+url+":8762/db/tables/page?dbId="+etLdbResponse.getDbId()+"&limit="+limit+"&page="+page);
        } catch (IOException e) {
            e.printStackTrace();
        }
        JSONObject jsonObject = JSONObject.parseObject(result);
        int code = (int) jsonObject.get("code");
        System.out.println(code+"获取表详情接口状态");
        List<ETLtableResponse>  tableList=new ArrayList<>();
        if(code!=-1){
            Object data = jsonObject.get("data");
            JSONArray objects = JSONObject.parseArray(JSON.toJSON(data).toString());
            for(int i=0;i<objects.size();i++){
                String s = objects.get(i).toString();
                Gson gson=new Gson();
                ETLtableResponse etLtableResponse = gson.fromJson(s, ETLtableResponse.class);
                etLtableResponse.setDbName(etLdbResponse.getName());
                //此处获取表的列数，并添加到对应的实体类中
                tableList.add(etLtableResponse);
            }
        }
         return tableList;
    }

    @Override
    public List<ETLtableResponse> queryAllTableSet(ETLdbResponse etLdbResponse,int page,int limit) throws SQLException, ClassNotFoundException {
        String result=null;
        ETLdbNameRequest etLdbNameRequest=new ETLdbNameRequest(etLdbResponse.getDbId());
        try {
            //根据数据库ID获取该库下的所有的表详情
            result=FeedInfo.saveDataToInterface(etLdbNameRequest,"http://"+url+":8762/db/tables/page?dbId="+etLdbResponse.getDbId()+"&limit="+limit+"&page="+page);
        } catch (IOException e) {
            e.printStackTrace();
        }
        JSONObject jsonObject = JSONObject.parseObject(result);
        int code = (int) jsonObject.get("code");
        System.out.println(code+"获取表详情接口状态");
        List<ETLtableResponse>  tableList=new ArrayList<>();
        if(code!=-1){
            Object data = jsonObject.get("data");
            JSONArray objects = JSONObject.parseArray(JSON.toJSON(data).toString());
            for(int i=0;i<objects.size();i++){
                String s = objects.get(i).toString();
                Gson gson=new Gson();
                ETLtableResponse etLtableResponse = gson.fromJson(s, ETLtableResponse.class);
                etLtableResponse.setDbName(etLdbResponse.getName());
                //此处获取表的列数，并添加到对应的实体类中
                tableList.add(etLtableResponse);
            }
        }
        return tableList;
    }

    @Override
    public List<String> queryAllColumnName(ETLcolumnRequest etLcolumnRequest) {
        String result=null;
        try {
            result=FeedInfo.saveDataToInterface(etLcolumnRequest,"http://"+url+":8762/column/list/anonymous?dbName="+etLcolumnRequest.getDbName()+"&tableName="+etLcolumnRequest.getTableName());
        } catch (IOException e) {
            e.printStackTrace();
        }
        JSONObject jsonObject = JSONObject.parseObject(result);
        int code = (int) jsonObject.get("code");
        List<String>  databaseList=new ArrayList<>();
        if(code!=-1){
            Object data = jsonObject.get("data");
            JSONArray objects = JSONObject.parseArray(JSON.toJSON(data).toString());
            for(int i=0;i<objects.size();i++){
                Object o = objects.get(i);
                String columnName = (String) JSONObject.parseObject(objects.get(i).toString()).get("columnName");
                databaseList.add(columnName);
            }
            return databaseList;
        }else{
            throw new RuntimeException("获取字段名称数据异常");
        }
    }

    @Override
    public ETLtableResponse getTableByTableName(String tbName,String dbName) {
        ETLtbRequest etLtbRequest=new ETLtbRequest(tbName);
        String result=null;
        try {
            long startTime = System.currentTimeMillis();
            result=FeedInfo.saveDataToInterface(etLtbRequest,"http://"+url+":8762/table/detail?tblName="+etLtbRequest.getTblName());
            long startEnd = System.currentTimeMillis();
            System.out.println("程序运行时间："+(startEnd-startTime)+"ms");
        } catch (IOException e) {
            e.printStackTrace();
        }
        JSONObject jsonObject = JSONObject.parseObject(result);
        int code = (int) jsonObject.get("code");
        ETLtableResponse etLtableResponse=null;
        if(code==0){
            Object data = jsonObject.get("data");
            Gson gson=new Gson();
            etLtableResponse = gson.fromJson(data.toString(), ETLtableResponse.class);
            etLtableResponse.setDbName(dbName);
//            TableRuler tableRuler = tableDao.queryTRulerBydbNameAndTableName(tbName, dbName);
//            if (tableRuler!=null){
//                etLtableResponse.setMonitor_time(tableRuler.getMonitor_time());
//                etLtableResponse.setReciver(tableRuler.getReciever());
//            }

        }
        return etLtableResponse;
    }

    @Override
    public int getTableTotal(ETLdbResponse etLdbResponse) {
        String result=null;
        ETLdbNameRequest etLdbNameRequest=new ETLdbNameRequest(etLdbResponse.getDbId());
        try {
            //根据数据库ID获取该库下的所有的表详情
            result=FeedInfo.saveDataToInterface(etLdbNameRequest,"http://"+url+":8762/db/tables?dbId="+etLdbResponse.getDbId());
        } catch (IOException e) {
            e.printStackTrace();
        }
        JSONObject jsonObject = JSONObject.parseObject(result);
        int code = (int) jsonObject.get("code");
        System.out.println(code+"获取表详情接口状态");
        List<ETLtableResponse>  tableList=new ArrayList<>();
        if(code!=-1){
            Object data = jsonObject.get("data");
            JSONArray objects = JSONObject.parseArray(JSON.toJSON(data).toString());
            for(int i=0;i<objects.size();i++){
                String s = objects.get(i).toString();
                Gson gson=new Gson();
                ETLtableResponse etLtableResponse = gson.fromJson(s, ETLtableResponse.class);
                etLtableResponse.setDbName(etLdbResponse.getName());
                //此处获取表的列数，并添加到对应的实体类中
//                System.out.println("获取ETL表详细信息"+etLtableResponse);
                tableList.add(etLtableResponse);
            }
        }
        return tableList.size();
    }


}
