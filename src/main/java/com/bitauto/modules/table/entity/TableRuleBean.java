package com.bitauto.modules.table.entity;

import java.util.Date;

public class TableRuleBean {
    private Integer id;

    private String tid;

    private String monitorType;

    private String tcondition;

    private String tableName;

    private String databaseName;

    private String hCompare;

    private String tCompare;

    private String self;

    private String sevenWaveAvg;

    private String alarmType;

    private String remark;

    private String towner;

    private String content;

    private String reciever;

    private Date createTime;

    private String monitorTime;

    private String username;

    private String status;

    private Integer checkDay;

    private String columnName;

    private String contentSql;

    private String number;

    private String partitionType;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTid() {
        return tid;
    }

    public void setTid(String tid) {
        this.tid = tid;
    }

    public String getMonitorType() {
        return monitorType;
    }

    public void setMonitorType(String monitorType) {
        this.monitorType = monitorType;
    }

    public String getTcondition() {
        return tcondition;
    }

    public void setTcondition(String tcondition) {
        this.tcondition = tcondition;
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

    public String getSevenWaveAvg() {
        return sevenWaveAvg;
    }

    public void setSevenWaveAvg(String sevenWaveAvg) {
        this.sevenWaveAvg = sevenWaveAvg;
    }

    public String getAlarmType() {
        return alarmType;
    }

    public void setAlarmType(String alarmType) {
        this.alarmType = alarmType;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getTowner() {
        return towner;
    }

    public void setTowner(String towner) {
        this.towner = towner;
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

    public String getMonitorTime() {
        return monitorTime;
    }

    public void setMonitorTime(String monitorTime) {
        this.monitorTime = monitorTime;
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

    public String getColumnName() {
        return columnName;
    }

    public void setColumnName(String columnName) {
        this.columnName = columnName;
    }

    public String getContentSql() {
        return contentSql;
    }

    public void setContentSql(String contentSql) {
        this.contentSql = contentSql;
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
        return "TableRuleBean{" +
                "id=" + id +
                ", tid='" + tid + '\'' +
                ", monitorType='" + monitorType + '\'' +
                ", tcondition='" + tcondition + '\'' +
                ", tableName='" + tableName + '\'' +
                ", databaseName='" + databaseName + '\'' +
                ", hCompare='" + hCompare + '\'' +
                ", tCompare='" + tCompare + '\'' +
                ", self='" + self + '\'' +
                ", sevenWaveAvg='" + sevenWaveAvg + '\'' +
                ", alarmType='" + alarmType + '\'' +
                ", remark='" + remark + '\'' +
                ", towner='" + towner + '\'' +
                ", content='" + content + '\'' +
                ", reciever='" + reciever + '\'' +
                ", createTime=" + createTime +
                ", monitorTime='" + monitorTime + '\'' +
                ", username='" + username + '\'' +
                ", status='" + status + '\'' +
                ", checkDay=" + checkDay +
                ", columnName='" + columnName + '\'' +
                ", contentSql='" + contentSql + '\'' +
                ", number='" + number + '\'' +
                ", partitionType='" + partitionType + '\'' +
                '}';
    }

    public TableRuleBean() {
    }

    public TableRuleBean(Integer id, String tid, String monitorType, String tcondition, String tableName, String databaseName, String hCompare, String tCompare, String self, String sevenWaveAvg, String alarmType, String remark, String towner, String content, String reciever, Date createTime, String monitorTime, String username, String status, Integer checkDay, String columnName, String contentSql, String number, String partitionType) {

        this.id = id;
        this.tid = tid;
        this.monitorType = monitorType;
        this.tcondition = tcondition;
        this.tableName = tableName;
        this.databaseName = databaseName;
        this.hCompare = hCompare;
        this.tCompare = tCompare;
        this.self = self;
        this.sevenWaveAvg = sevenWaveAvg;
        this.alarmType = alarmType;
        this.remark = remark;
        this.towner = towner;
        this.content = content;
        this.reciever = reciever;
        this.createTime = createTime;
        this.monitorTime = monitorTime;
        this.username = username;
        this.status = status;
        this.checkDay = checkDay;
        this.columnName = columnName;
        this.contentSql = contentSql;
        this.number = number;
        this.partitionType = partitionType;
    }
}