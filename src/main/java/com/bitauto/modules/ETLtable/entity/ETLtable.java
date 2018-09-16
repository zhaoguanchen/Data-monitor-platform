package com.bitauto.modules.ETLtable.entity;

public class ETLtable {
    private Long id;
    private String ETLgroup;//ETL分组
    private String table_name;//表名称
    private String META;//META
    private String database_name;//数据库名称
    private String annotation;//注释
    private String eowner;//owner
    private String rowCount;//列数
    private String monitor_time;//监测时间
    private String groupKey;//分区键
    private String reciver; //报警接收人
    public Long getId() {
        return id;
    }

    @Override
    public String toString() {
        return "ETLtable{" +
                "id=" + id +
                ", ETLgroup='" + ETLgroup + '\'' +
                ", table_name='" + table_name + '\'' +
                ", META='" + META + '\'' +
                ", database_name='" + database_name + '\'' +
                ", annotation='" + annotation + '\'' +
                ", eowner='" + eowner + '\'' +
                ", rowCount='" + rowCount + '\'' +
                ", monitor_time='" + monitor_time + '\'' +
                ", groupKey='" + groupKey + '\'' +
                ", reciver='" + reciver + '\'' +
                '}';
    }

    public String getReciver() {
        return reciver;
    }

    public void setReciver(String reciver) {
        this.reciver = reciver;
    }

    public ETLtable(Long id, String ETLgroup, String table_name, String META, String database_name, String annotation, String eowner, String rowCount, String monitor_time, String groupKey, String reciver) {

        this.id = id;
        this.ETLgroup = ETLgroup;
        this.table_name = table_name;
        this.META = META;
        this.database_name = database_name;
        this.annotation = annotation;
        this.eowner = eowner;
        this.rowCount = rowCount;
        this.monitor_time = monitor_time;
        this.groupKey = groupKey;
        this.reciver = reciver;
    }

    public String getGroupKey() {
        return groupKey;
    }

    public void setGroupKey(String groupKey) {
        this.groupKey = groupKey;
    }

    public String getMonitor_time() {
        return monitor_time;
    }

    public void setMonitor_time(String monitor_time) {
        this.monitor_time = monitor_time;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getETLgroup() {
        return ETLgroup;
    }

    public void setETLgroup(String ETLgroup) {
        this.ETLgroup = ETLgroup;
    }

    public String getTable_name() {
        return table_name;
    }

    public void setTable_name(String table_name) {
        this.table_name = table_name;
    }

    public String getMETA() {
        return META;
    }

    public void setMETA(String META) {
        this.META = META;
    }

    public String getDatabase_name() {
        return database_name;
    }

    public void setDatabase_name(String database_name) {
        this.database_name = database_name;
    }

    public String getAnnotation() {
        return annotation;
    }

    public void setAnnotation(String annotation) {
        this.annotation = annotation;
    }

    public String getEowner() {
        return eowner;
    }

    public void setEowner(String eowner) {
        this.eowner = eowner;
    }

    public String getRowCount() {
        return rowCount;
    }

    public void setRowCount(String rowCount) {
        this.rowCount = rowCount;
    }

    public ETLtable() {

    }
}
