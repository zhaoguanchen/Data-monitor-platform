package com.bitauto.modules.consanguinity.entity.response;

public class TableNodeEntity {
    private int tableNodeId;
    private String tableName;
    private String dbName;
    private String qualifiedName;

    @Override
    public String toString() {
        return "TableNodeEntity{" +
                "tableNodeId=" + tableNodeId +
                ", tableName='" + tableName + '\'' +
                ", dbName='" + dbName + '\'' +
                ", qualifiedName='" + qualifiedName + '\'' +
                '}';
    }

    public int getTableNodeId() {
        return tableNodeId;
    }

    public void setTableNodeId(int tableNodeId) {
        this.tableNodeId = tableNodeId;
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

    public String getQualifiedName() {
        return qualifiedName;
    }

    public void setQualifiedName(String qualifiedName) {
        this.qualifiedName = qualifiedName;
    }

    public TableNodeEntity() {

    }

    public TableNodeEntity(int tableNodeId, String tableName, String dbName, String qualifiedName) {

        this.tableNodeId = tableNodeId;
        this.tableName = tableName;
        this.dbName = dbName;
        this.qualifiedName = qualifiedName;
    }
}
