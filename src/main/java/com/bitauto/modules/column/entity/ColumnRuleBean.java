package com.bitauto.modules.column.entity;

import java.util.Date;

public class ColumnRuleBean {
    private Integer cid;

    private String id;

    private String monitorType;

    private String ccondition;

    private String tableName;

    private String columnName;

    private String databaseName;

    private String calculateType;

    private String deviation;

    private String hCompare;

    private String tCompare;

    private String self;

    private String remark;

    private String cowner;

    private String content;

    private String reciever;

    private Date createTime;

    private String countType;

    private String aggregateFunction;

    private String dayIncrement;

    private String alarmType;

    private String username;

    private String status;

    private Integer checkDay;

    private String number;

    private String partitionType;

    public Integer getCid() {
        return cid;
    }

    public void setCid(Integer cid) {
        this.cid = cid;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getMonitorType() {
        return monitorType;
    }

    public void setMonitorType(String monitorType) {
        this.monitorType = monitorType;
    }

    public String getCcondition() {
        return ccondition;
    }

    public void setCcondition(String ccondition) {
        this.ccondition = ccondition;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public String getColumnName() {
        return columnName;
    }

    public void setColumnName(String columnName) {
        this.columnName = columnName;
    }

    public String getDatabaseName() {
        return databaseName;
    }

    public void setDatabaseName(String databaseName) {
        this.databaseName = databaseName;
    }

    public String getCalculateType() {
        return calculateType;
    }

    public void setCalculateType(String calculateType) {
        this.calculateType = calculateType;
    }

    public String getDeviation() {
        return deviation;
    }

    public void setDeviation(String deviation) {
        this.deviation = deviation;
    }

    public String gethCompare() {
        return hCompare;
    }

    public void sethCompare(String hCompare) {
        this.hCompare = hCompare;
    }

    public String gettCompare() {
        return tCompare;
    }

    public void settCompare(String tCompare) {
        this.tCompare = tCompare;
    }

    public String getSelf() {
        return self;
    }

    public void setSelf(String self) {
        this.self = self;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getCowner() {
        return cowner;
    }

    public void setCowner(String cowner) {
        this.cowner = cowner;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getReciever() {
        return reciever;
    }

    public void setReciever(String reciever) {
        this.reciever = reciever;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getCountType() {
        return countType;
    }

    public void setCountType(String countType) {
        this.countType = countType;
    }

    public String getAggregateFunction() {
        return aggregateFunction;
    }

    public void setAggregateFunction(String aggregateFunction) {
        this.aggregateFunction = aggregateFunction;
    }

    public String getDayIncrement() {
        return dayIncrement;
    }

    public void setDayIncrement(String dayIncrement) {
        this.dayIncrement = dayIncrement;
    }

    public String getAlarmType() {
        return alarmType;
    }

    public void setAlarmType(String alarmType) {
        this.alarmType = alarmType;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getCheckDay() {
        return checkDay;
    }

    public void setCheckDay(Integer checkDay) {
        this.checkDay = checkDay;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getPartitionType() {
        return partitionType;
    }

    public void setPartitionType(String partitionType) {
        this.partitionType = partitionType;
    }

    @Override
    public String toString() {
        return "ColumnRuleBean{" +
                "cid=" + cid +
                ", id='" + id + '\'' +
                ", monitorType='" + monitorType + '\'' +
                ", ccondition='" + ccondition + '\'' +
                ", tableName='" + tableName + '\'' +
                ", columnName='" + columnName + '\'' +
                ", databaseName='" + databaseName + '\'' +
                ", calculateType='" + calculateType + '\'' +
                ", deviation='" + deviation + '\'' +
                ", hCompare='" + hCompare + '\'' +
                ", tCompare='" + tCompare + '\'' +
                ", self='" + self + '\'' +
                ", remark='" + remark + '\'' +
                ", cowner='" + cowner + '\'' +
                ", content='" + content + '\'' +
                ", reciever='" + reciever + '\'' +
                ", createTime=" + createTime +
                ", countType='" + countType + '\'' +
                ", aggregateFunction='" + aggregateFunction + '\'' +
                ", dayIncrement='" + dayIncrement + '\'' +
                ", alarmType='" + alarmType + '\'' +
                ", username='" + username + '\'' +
                ", status='" + status + '\'' +
                ", checkDay=" + checkDay +
                ", number='" + number + '\'' +
                ", partitionType='" + partitionType + '\'' +
                '}';
    }

    public ColumnRuleBean() {
    }

    public ColumnRuleBean(Integer cid, String id, String monitorType, String ccondition, String tableName, String columnName, String databaseName, String calculateType, String deviation, String hCompare, String tCompare, String self, String remark, String cowner, String content, String reciever, Date createTime, String countType, String aggregateFunction, String dayIncrement, String alarmType, String username, String status, Integer checkDay, String number, String partitionType) {

        this.cid = cid;
        this.id = id;
        this.monitorType = monitorType;
        this.ccondition = ccondition;
        this.tableName = tableName;
        this.columnName = columnName;
        this.databaseName = databaseName;
        this.calculateType = calculateType;
        this.deviation = deviation;
        this.hCompare = hCompare;
        this.tCompare = tCompare;
        this.self = self;
        this.remark = remark;
        this.cowner = cowner;
        this.content = content;
        this.reciever = reciever;
        this.createTime = createTime;
        this.countType = countType;
        this.aggregateFunction = aggregateFunction;
        this.dayIncrement = dayIncrement;
        this.alarmType = alarmType;
        this.username = username;
        this.status = status;
        this.checkDay = checkDay;
        this.number = number;
        this.partitionType = partitionType;
    }
}