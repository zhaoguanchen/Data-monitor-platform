package com.bitauto.modules.ETLtable.service;

import com.bitauto.modules.ETLtable.request.ETLcolumnRequest;
import com.bitauto.modules.ETLtable.response.ETLdbResponse;
import com.bitauto.modules.ETLtable.response.ETLtableResponse;

import java.sql.SQLException;
import java.util.List;

public interface ETLtableService {

//    public List<ETLtable> queryAll();

    /**
     * 获取所有的数据库的名称
     * @return
     */
    public List<ETLdbResponse> queryAllDatabases();

    /**
     * 分页获取所有的ETL表及其相关信息
     * @param etLdbResponse offset
     * @return
     */
    public List<ETLtableResponse> queryAllTable(ETLdbResponse etLdbResponse,int page,int limit) throws SQLException, ClassNotFoundException;

    /**
     * 无分页获取所有的ETL表及其详细信息
     * @param etLdbResponse
     * @return
     * @throws SQLException
     * @throws ClassNotFoundException
     */
    public List<ETLtableResponse> queryAllTable(ETLdbResponse etLdbResponse) throws SQLException, ClassNotFoundException;

    /**
     * 获取全量的表名称
     * @param etLdbNameRequest
     * @return
     */
//    List<String>  getTableName(ETLdbNameRequest etLdbNameRequest);
    /**
     * 根据表名称获取该表下的字段名称
     * @param etLcolumnRequest
     * @return
     */
    public List<String> queryAllColumnName(ETLcolumnRequest etLcolumnRequest);

    /**
     * 根据表名获取表的详细信息
     * @param tbName
     * @return
     */
   ETLtableResponse getTableByTableName(String tbName, String dbName);

    /**
     * 获取该库下表的总条数
     * @param etLdbResponse
     * @return
     */
   int getTableTotal(ETLdbResponse etLdbResponse);

    List<ETLtableResponse> queryAllTableSet(ETLdbResponse etLdbResponse,int page,int limit) throws SQLException, ClassNotFoundException;

}
