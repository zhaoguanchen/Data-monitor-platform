package com.bitauto.modules.table.service;

import com.bitauto.modules.table.entity.TableRuler;

import java.util.List;
import java.util.Map;

public interface TableService {
    Map queryAllTRulers(Map<String, Object> map);

    int getTotal();

    boolean updateTRuler(TableRuler tableRuler);

    boolean insertTRuler(TableRuler tableRuler);

    boolean deleteTRulers(String[] ids);

    TableRuler queryTRulerById(String id);

    List<TableRuler> queryTRulerBydbNameAndTableName(String table_name, String database_name);

    List<String>  queryTabOwner();

    List<String>  queryTabDbName();

//    List<TableRuler> queryAll();

    void stopTableRule(String tid);

    void startTableRule(String tid);
}
