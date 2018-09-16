package com.bitauto.modules.ETLtable.response;

import java.io.Serializable;

public class ETLtableResponse implements Serializable {
    private String dbName;//库名
    private String owner;//owner
    private String tblName;//表名
    private String comment;//注释
    private String partitionKey;//分区key
    private String tblId;//表id
    private String dbId;//库id
    private String tblPath;//表路径
    private String tblType;//是否是外部表
    private Integer columnCount;//列数
    private String reciver;//报警接收人
    private String monitor_time;//监测时间

    public ETLtableResponse(String dbName, String owner, String tblName, String comment, String partitionKey, String tblId, String dbId, String tblPath, String tblType, Integer columnCount, String reciver, String monitor_time) {

        this.dbName = dbName;
        this.owner = owner;
        this.tblName = tblName;
        this.comment = comment;
        this.partitionKey = partitionKey;
        this.tblId = tblId;
        this.dbId = dbId;
        this.tblPath = tblPath;
        this.tblType = tblType;
        this.columnCount = columnCount;
        this.reciver = reciver;
        this.monitor_time = monitor_time;
    }

    @Override
    public String toString() {
        return "ETLtableResponse{" +
                "dbName='" + dbName + '\'' +
                ", owner='" + owner + '\'' +
                ", tblName='" + tblName + '\'' +
                ", comment='" + comment + '\'' +
                ", partitionKey='" + partitionKey + '\'' +
                ", tblId='" + tblId + '\'' +
                ", dbId='" + dbId + '\'' +
                ", tblPath='" + tblPath + '\'' +
                ", tblType='" + tblType + '\'' +
                ", columnCount=" + columnCount +
                ", reciver='" + reciver + '\'' +
                ", monitor_time='" + monitor_time + '\'' +
                '}';
    }

    public String getReciver() {
        return reciver;
    }

    public void setReciver(String reciver) {
        this.reciver = reciver;
    }

    public String getMonitor_time() {
        return monitor_time;
    }

    public void setMonitor_time(String monitor_time) {
        this.monitor_time = monitor_time;
    }

    public String getOwner() {
        return owner;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public String getTblName() {
        return tblName;
    }

    public void setTblName(String tblName) {
        this.tblName = tblName;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getPartitionKey() {
        return partitionKey;
    }

    public void setPartitionKey(String partitionKey) {
        this.partitionKey = partitionKey;
    }

    public String getTblId() {
        return tblId;
    }

    public void setTblId(String tblId) {
        this.tblId = tblId;
    }

    public String getDbId() {
        return dbId;
    }

    public void setDbId(String dbId) {
        this.dbId = dbId;
    }

    public String getTblPath() {
        return tblPath;
    }

    public void setTblPath(String tblPath) {
        this.tblPath = tblPath;
    }

    public String getTblType() {
        return tblType;
    }

    public void setTblType(String tblType) {
        this.tblType = tblType;
    }

    public Integer getColumnCount() {
        return columnCount;
    }

    public void setColumnCount(Integer columnCount) {
        this.columnCount = columnCount;
    }

    public ETLtableResponse() {

    }

    public ETLtableResponse(String owner, String tblName, String comment, String partitionKey, String tblId, String dbId, String tblPath, String tblType, Integer columnCount) {

        this.owner = owner;
        this.tblName = tblName;
        this.comment = comment;
        this.partitionKey = partitionKey;
        this.tblId = tblId;
        this.dbId = dbId;
        this.tblPath = tblPath;
        this.tblType = tblType;
        this.columnCount = columnCount;
    }

    public ETLtableResponse(String dbName, String owner, String tblName, String comment, String partitionKey, String tblId, String dbId, String tblPath, String tblType, Integer columnCount) {
        this.dbName = dbName;
        this.owner = owner;
        this.tblName = tblName;
        this.comment = comment;
        this.partitionKey = partitionKey;
        this.tblId = tblId;
        this.dbId = dbId;
        this.tblPath = tblPath;
        this.tblType = tblType;
        this.columnCount = columnCount;
    }

    public String getDbName() {
        return dbName;
    }

    public void setDbName(String dbName) {
        this.dbName = dbName;
    }
}
