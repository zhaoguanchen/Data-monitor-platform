package com.bitauto.modules.alarm.entity;

import org.springframework.format.annotation.DateTimeFormat;

public class AlarmResult {
    private String id;          //id
    private String tableName;     //表名称
    private String databaseName;    //数据库名称
    private String levelType; //字段
    private String type;        //类型
    private String leader;      //负责人
    private String scope;       //范围
    private String value;       //实际值
    private String status;      //状态
    private int successCount;
    private int unSuccessCount;
    private int allCount;
    private String resultCount;//监测结果统计
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private String createTime;   //创建时间

    @Override
    public String toString() {
        return "AlarmResult{" +
                "id='" + id + '\'' +
                ", tableName='" + tableName + '\'' +
                ", databaseName='" + databaseName + '\'' +
                ", levelType='" + levelType + '\'' +
                ", type='" + type + '\'' +
                ", leader='" + leader + '\'' +
                ", scope='" + scope + '\'' +
                ", value='" + value + '\'' +
                ", status='" + status + '\'' +
                ", successCount=" + successCount +
                ", unSuccessCount=" + unSuccessCount +
                ", allCount=" + allCount +
                ", resultCount='" + resultCount + '\'' +
                ", createTime=" + createTime +
                '}';
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public String getDatabaseName() {
        return databaseName;
    }

    public void setDatabaseName(String databaseName) {
        this.databaseName = databaseName;
    }

    public String getLevelType() {
        return levelType;
    }

    public void setLevelType(String levelType) {
        this.levelType = levelType;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getLeader() {
        return leader;
    }

    public void setLeader(String leader) {
        this.leader = leader;
    }

    public String getScope() {
        return scope;
    }

    public void setScope(String scope) {
        this.scope = scope;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getSuccessCount() {
        return successCount;
    }

    public void setSuccessCount(int successCount) {
        this.successCount = successCount;
    }

    public int getUnSuccessCount() {
        return unSuccessCount;
    }

    public void setUnSuccessCount(int unSuccessCount) {
        this.unSuccessCount = unSuccessCount;
    }

    public int getAllCount() {
        return allCount;
    }

    public void setAllCount(int allCount) {
        this.allCount = allCount;
    }

    public String getResultCount() {
        return resultCount;
    }

    public void setResultCount(String resultCount) {
        this.resultCount = resultCount;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public AlarmResult(String id, String tableName, String databaseName, String levelType, String type, String leader, String scope, String value, String status, int successCount, int unSuccessCount, int allCount, String resultCount, String createTime) {

        this.id = id;
        this.tableName = tableName;
        this.databaseName = databaseName;
        this.levelType = levelType;
        this.type = type;
        this.leader = leader;
        this.scope = scope;
        this.value = value;
        this.status = status;
        this.successCount = successCount;
        this.unSuccessCount = unSuccessCount;
        this.allCount = allCount;
        this.resultCount = resultCount;
        this.createTime = createTime;
    }

    public AlarmResult() {

    }
}
