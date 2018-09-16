package com.bitauto.modules.column.service;

import com.bitauto.modules.column.entity.ColumnRuler;

import java.util.List;
import java.util.Map;

public interface ColumnService {

    Map queryAllCRulers(Map<String, Object> map);

    List<ColumnRuler> queryCRulerByDbNameAndTblName(String dbName, String tblName);

    int getTotal();

    boolean updateCRuler(ColumnRuler columnRuler);

    boolean insertCRuler(ColumnRuler columnRuler);

    boolean deleteCRulers(String[] ids);

    ColumnRuler queryCRulerById(String id);
    /**
     * 获取字段规则里面所有的负责人
     * @return
     */
    List<String> queryCOwner();

    /**
     * 获取字段规则里面所有的数据库名称
     * @return
     */
    List<String> queryCDbName();

    void stopColumnRule(String cid);

    void startColumnRule(String cid);
}
