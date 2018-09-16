package com.bitauto.modules.table.entity;

import com.bitauto.modules.item.entity.ItemBody;

import java.util.Date;
import java.util.List;

public class TableRuler {
//    //表级别规则表
//    CREATE TABLE `table_rule_db` (
//            `id` int(11) NOT NULL,			'表规则id'
//  `monitor_type` varchar(20) NOT NULL,		//规则类型
//  `condition` varchar(200) NOT NULL,		//过滤条件
//  `tabcondition` varchar(200) NOT NULL,		//自定义sql筛选条件
//  `table_name` varchar(100) NOT NULL,		//表名称
//  `database_name` varchar(50) NOT NULL,		//数据库名称
//  `h_compare` varchar(100) default NULL,	//环比值
//   lin`t_compare` varchar(100) default NULL,	//同比值
//  `self` varchar(100) default NULL,		//自身比
//  `seven_wave_avg` varchar(100) default NULL,	//7天均值
//  `alarm_type` varchar(20) NOT NULL,		//报警方式
//  `remark` varchar(100) NOT NULL,		//注释
//  `username` varchar(50) NOT NULL,			//负责人
//  `content` varchar(100) NOT NULL,		//通知内容
//  `reciever` varchar(100) NOT NULL,		//接收人
//  monitor_time varchar(100)               监测时间
//  `create_time` datetime NOT NULL		//创建时间
//    create_partition_time 创建分区时间
// String itemName;所属项目名称
//) ENGINE=InnoDB DEFAULT CHARSET=latin1;

    private String tId;//uuid
    private int id;//自增id
    private String number;//编号
    private String itemName;
    private String monitor_type;
    private String tabcondition;
    private String table_name;
    private String database_name;
    private String h_compare;
    private String t_compare;
    private String self;
    private String seven_wave_avg;
    private String alarm_type;
    private String remark;
    private String tabowner;//负责人即创建人
    private String content;
    private String reciever;
    private String alarmGroup;//通知组
    private String alarmman;//通知人
    private String monitor_time;
    private String username;
    private Date create_time;
    private String create_partition_time;
    private MonitorType monitorType;
    private ItemId itemId;
    private ModuleIds moduleId;
    private List<ItemBody> itemBodys;
    private String readyTime;
    private String partition_type;
    private String status;
    private String alarmUniqueid;
    private String alarmGroupName;

    @Override
    public String toString() {
        return "TableRuler{" +
                "tId='" + tId + '\'' +
                ", id=" + id +
                ", number='" + number + '\'' +
                ", itemName='" + itemName + '\'' +
                ", monitor_type='" + monitor_type + '\'' +
                ", tabcondition='" + tabcondition + '\'' +
                ", table_name='" + table_name + '\'' +
                ", database_name='" + database_name + '\'' +
                ", h_compare='" + h_compare + '\'' +
                ", t_compare='" + t_compare + '\'' +
                ", self='" + self + '\'' +
                ", seven_wave_avg='" + seven_wave_avg + '\'' +
                ", alarm_type='" + alarm_type + '\'' +
                ", remark='" + remark + '\'' +
                ", tabowner='" + tabowner + '\'' +
                ", content='" + content + '\'' +
                ", reciever='" + reciever + '\'' +
                ", alarmGroup='" + alarmGroup + '\'' +
                ", alarmman='" + alarmman + '\'' +
                ", monitor_time='" + monitor_time + '\'' +
                ", username='" + username + '\'' +
                ", create_time=" + create_time +
                ", create_partition_time='" + create_partition_time + '\'' +
                ", monitorType=" + monitorType +
                ", itemId=" + itemId +
                ", moduleId=" + moduleId +
                ", itemBodys=" + itemBodys +
                ", readyTime='" + readyTime + '\'' +
                ", partition_type='" + partition_type + '\'' +
                '}';
    }

    public String getAlarmman() {
        return alarmman;
    }

    public void setAlarmman(String alarmman) {
        this.alarmman = alarmman;
    }

    public TableRuler(String tId, int id, String number, String itemName, String monitor_type, String tabcondition, String table_name, String database_name, String h_compare, String t_compare, String self, String seven_wave_avg, String alarm_type, String remark, String tabowner, String content, String reciever, String alarmGroup, String alarmman, String monitor_time, String username, Date create_time, String create_partition_time, MonitorType monitorType, ItemId itemId, ModuleIds moduleId, List<ItemBody> itemBodys, String readyTime, String partition_type) {

        this.tId = tId;
        this.id = id;
        this.number = number;
        this.itemName = itemName;
        this.monitor_type = monitor_type;
        this.tabcondition = tabcondition;
        this.table_name = table_name;
        this.database_name = database_name;
        this.h_compare = h_compare;
        this.t_compare = t_compare;
        this.self = self;
        this.seven_wave_avg = seven_wave_avg;
        this.alarm_type = alarm_type;
        this.remark = remark;
        this.tabowner = tabowner;
        this.content = content;
        this.reciever = reciever;
        this.alarmGroup = alarmGroup;
        this.alarmman = alarmman;
        this.monitor_time = monitor_time;
        this.username = username;
        this.create_time = create_time;
        this.create_partition_time = create_partition_time;
        this.monitorType = monitorType;
        this.itemId = itemId;
        this.moduleId = moduleId;
        this.itemBodys = itemBodys;
        this.readyTime = readyTime;
        this.partition_type = partition_type;
    }

    public String getAlarmGroup() {
        return alarmGroup;
    }

    public void setAlarmGroup(String alarmGroup) {
        this.alarmGroup = alarmGroup;
    }

    public TableRuler(String tId, int id, String number, String itemName, String monitor_type, String tabcondition, String table_name, String database_name, String h_compare, String t_compare, String self, String seven_wave_avg, String alarm_type, String remark, String tabowner, String content, String reciever, String alarmGroup, String monitor_time, String username, Date create_time, String create_partition_time, MonitorType monitorType, ItemId itemId, ModuleIds moduleId, List<ItemBody> itemBodys, String readyTime, String partition_type) {

        this.tId = tId;
        this.id = id;
        this.number = number;
        this.itemName = itemName;
        this.monitor_type = monitor_type;
        this.tabcondition = tabcondition;
        this.table_name = table_name;
        this.database_name = database_name;
        this.h_compare = h_compare;
        this.t_compare = t_compare;
        this.self = self;
        this.seven_wave_avg = seven_wave_avg;
        this.alarm_type = alarm_type;
        this.remark = remark;
        this.tabowner = tabowner;
        this.content = content;
        this.reciever = reciever;
        this.alarmGroup = alarmGroup;
        this.monitor_time = monitor_time;
        this.username = username;
        this.create_time = create_time;
        this.create_partition_time = create_partition_time;
        this.monitorType = monitorType;
        this.itemId = itemId;
        this.moduleId = moduleId;
        this.itemBodys = itemBodys;
        this.readyTime = readyTime;
        this.partition_type = partition_type;
    }

    public String getPartition_type() {
        return partition_type;
    }

    public void setPartition_type(String partition_type) {
        this.partition_type = partition_type;
    }

    public TableRuler(String tId, int id, String number, String itemName, String monitor_type, String tabcondition, String table_name, String database_name, String h_compare, String t_compare, String self, String seven_wave_avg, String alarm_type, String remark, String tabowner, String content, String reciever, String monitor_time, String username, Date create_time, String create_partition_time, MonitorType monitorType, ItemId itemId, ModuleIds moduleId, List<ItemBody> itemBodys, String readyTime, String partition_type) {

        this.tId = tId;
        this.id = id;
        this.number = number;
        this.itemName = itemName;
        this.monitor_type = monitor_type;
        this.tabcondition = tabcondition;
        this.table_name = table_name;
        this.database_name = database_name;
        this.h_compare = h_compare;
        this.t_compare = t_compare;
        this.self = self;
        this.seven_wave_avg = seven_wave_avg;
        this.alarm_type = alarm_type;
        this.remark = remark;
        this.tabowner = tabowner;
        this.content = content;
        this.reciever = reciever;
        this.monitor_time = monitor_time;
        this.username = username;
        this.create_time = create_time;
        this.create_partition_time = create_partition_time;
        this.monitorType = monitorType;
        this.itemId = itemId;
        this.moduleId = moduleId;
        this.itemBodys = itemBodys;
        this.readyTime = readyTime;
        this.partition_type = partition_type;
    }

    public String getItemName() {
        return itemName;
    }

    public List<ItemBody> getItemBodys() {
        return itemBodys;
    }

    public void setItemBodys(List<ItemBody> itemBodys) {
        this.itemBodys = itemBodys;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public TableRuler(String tId, int id, String number, String itemName, String monitor_type, String tabcondition, String table_name, String database_name, String h_compare, String t_compare, String self, String seven_wave_avg, String alarm_type, String remark, String tabowner, String content, String reciever, String monitor_time, String username, Date create_time, String create_partition_time, MonitorType monitorType, ItemId itemId, ModuleIds moduleId, List<ItemBody> itemBodys, String readyTime) {

        this.tId = tId;
        this.id = id;
        this.number = number;
        this.itemName = itemName;
        this.monitor_type = monitor_type;
        this.tabcondition = tabcondition;
        this.table_name = table_name;
        this.database_name = database_name;
        this.h_compare = h_compare;
        this.t_compare = t_compare;
        this.self = self;
        this.seven_wave_avg = seven_wave_avg;
        this.alarm_type = alarm_type;
        this.remark = remark;
        this.tabowner = tabowner;
        this.content = content;
        this.reciever = reciever;
        this.monitor_time = monitor_time;
        this.username = username;
        this.create_time = create_time;
        this.create_partition_time = create_partition_time;
        this.monitorType = monitorType;
        this.itemId = itemId;
        this.moduleId = moduleId;
        this.itemBodys = itemBodys;
        this.readyTime = readyTime;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getReadyTime() {
        return readyTime;
    }

    public void setReadyTime(String readyTime) {
        this.readyTime = readyTime;
    }

    public TableRuler(String tId, String itemName, String monitor_type, String tabcondition, String table_name, String database_name, String h_compare, String t_compare, String self, String seven_wave_avg, String alarm_type, String remark, String tabowner, String content, String reciever, String monitor_time, String username, Date create_time, String create_partition_time, MonitorType monitorType, ItemId itemId, ModuleIds moduleId, String readyTime) {

        this.tId = tId;
        this.itemName = itemName;
        this.monitor_type = monitor_type;
        this.tabcondition = tabcondition;
        this.table_name = table_name;
        this.database_name = database_name;
        this.h_compare = h_compare;
        this.t_compare = t_compare;
        this.self = self;
        this.seven_wave_avg = seven_wave_avg;
        this.alarm_type = alarm_type;
        this.remark = remark;
        this.tabowner = tabowner;
        this.content = content;
        this.reciever = reciever;
        this.monitor_time = monitor_time;
        this.username = username;
        this.create_time = create_time;
        this.create_partition_time = create_partition_time;
        this.monitorType = monitorType;
        this.itemId = itemId;
        this.moduleId = moduleId;
        this.readyTime = readyTime;
    }

    public ItemId getItemId() {
        return itemId;
    }

    public void setItemId(ItemId itemId) {
        this.itemId = itemId;
    }

    public ModuleIds getModuleId() {
        return moduleId;
    }

    public void setModuleId(ModuleIds moduleId) {
        this.moduleId = moduleId;
    }

    public MonitorType getMonitorType() {
        return monitorType;
    }

    public void setMonitorType(MonitorType monitorType) {
        this.monitorType = monitorType;
    }


    public String getCreate_partition_time() {
        return create_partition_time;
    }

    public void setCreate_partition_time(String create_partition_time) {
        this.create_partition_time = create_partition_time;
    }


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getMonitor_time() {
        return monitor_time;
    }

    public void setMonitor_time(String monitor_time) {
        this.monitor_time = monitor_time;
    }

    public String gettId() {
        return tId;
    }

    public void settId(String tId) {
        this.tId = tId;
    }

    public String getMonitor_type() {
        return monitor_type;
    }

    public void setMonitor_type(String monitor_type) {
        this.monitor_type = monitor_type;
    }

    public String getTabcondition() {
        return tabcondition;
    }

    public void setTabcondition(String tabcondition) {
        this.tabcondition = tabcondition;
    }

    public String getTable_name() {
        return table_name;
    }

    public void setTable_name(String table_name) {
        this.table_name = table_name;
    }

    public String getDatabase_name() {
        return database_name;
    }

    public void setDatabase_name(String database_name) {
        this.database_name = database_name;
    }

    public String getH_compare() {
        return h_compare;
    }

    public void setH_compare(String h_compare) {
        this.h_compare = h_compare;
    }

    public String getT_compare() {
        return t_compare;
    }

    public void setT_compare(String t_compare) {
        this.t_compare = t_compare;
    }

    public String getSelf() {
        return self;
    }

    public void setSelf(String self) {
        this.self = self;
    }

    public String getSeven_wave_avg() {
        return seven_wave_avg;
    }

    public void setSeven_wave_avg(String seven_wave_avg) {
        this.seven_wave_avg = seven_wave_avg;
    }

    public String getAlarm_type() {
        return alarm_type;
    }

    public void setAlarm_type(String alarm_type) {
        this.alarm_type = alarm_type;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getTabowner() {
        return tabowner;
    }

    public void setTabowner(String tabowner) {
        this.tabowner = tabowner;
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

    public Date getCreate_time() {
        return create_time;
    }

    public void setCreate_time(Date create_time) {
        this.create_time = create_time;
    }

    public TableRuler() {

    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getAlarmUniqueid() {
        return alarmUniqueid;
    }

    public void setAlarmUniqueid(String alarmUniqueid) {
        this.alarmUniqueid = alarmUniqueid;
    }

    public String getAlarmGroupName() {
        return alarmGroupName;
    }

    public void setAlarmGroupName(String alarmGroupName) {
        this.alarmGroupName = alarmGroupName;
    }
}
