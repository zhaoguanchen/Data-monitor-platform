package com.bitauto.modules.ETLtable.request;

import java.io.Serializable;

public class ETLcolumnRequest implements Serializable {
    private String tableName;
    private String dbName;

    @Override
    public String toString() {
        return "ETLcolumnRequest{" +
                "tableName='" + tableName + '\'' +
                ", dbName='" + dbName + '\'' +
                '}';
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public String getDbName() {
        return dbName;
    }

    public void setDbName(String dbName) {
        this.dbName = dbName;
    }

    public ETLcolumnRequest() {

    }

    public ETLcolumnRequest(String tableName, String dbName) {

        this.tableName = tableName;
        this.dbName = dbName;
    }
}
