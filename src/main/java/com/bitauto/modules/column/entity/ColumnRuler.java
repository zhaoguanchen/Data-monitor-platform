package com.bitauto.modules.column.entity;

import com.bitauto.modules.item.entity.ItemBody;
import com.bitauto.modules.table.entity.ItemId;
import com.bitauto.modules.table.entity.ModuleIds;
import com.bitauto.modules.table.entity.MonitorType;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

public class ColumnRuler implements Serializable{
//`id` int(11) NOT NULL, 		//字段id
//  `cmonitor_type` varchar(20) NOT NULL,  	//监测类型
//  `ccondition` varchar(200) NOT NULL,		//过滤条件
//    aggregate_function                    聚合函数
//  `ctable_name` varchar(100) NOT NULL,		//表名称
//  `column_name` varchar(100) NOT NULL,		//字段名称
//  `cdatabase_name` varchar(50) NOT NULL,		//数据库名称
//  `calculate_type` varchar(50) NOT NULL,	//预测类型
//    count_type                            计算类型
//  `deviation` varchar(50) NOT NULL,		//误差
//  `ch_compare` varchar(100) default NULL,	//日环比规则范围
//            `ct_compare` varchar(100) default NULL,	//周环比规则范围
//            `cself` varchar(100) default NULL,		//自身比规则范围
//            `day_increment` varchar(100) default NULL,	//日增量规则范围
//            `calarm_type` varchar(20) NOT NULL,		//报警方式
//  `cremark` varchar(100) NOT NULL,		//注释
//  `cowner` varchar(50) NOT NULL,			//负责人
//  `ccontent` varchar(100) NOT NULL,		//通知内容
//  `creciever` varchar(100) NOT NULL,		//接收人
//  `ccreate_time` datetime NOT NULL		//创建时间
//    create_partition_time 分区生成时间
//    username    //用户名
    private String cid;//自增id
    private String number;//编号
    private String id;
    private String cmonitor_type;
    private String aggregate_function;
    private String ccondition;
    private String ctable_name;
    private String column_name;
    private String cdatabase_name;
    private String calculate_type;
    private String count_type;
    private String deviation;
    private String ch_compare;
    private String ct_compare;
    private String cself;
    private String day_increment;//日增量
    private String calarm_type;
    private String cremark;
    private String cowner;
    private String ccontent;
    private String creciever;
    private Date ccreate_time;
    private String create_partition_time;
    private String username;
    private MonitorType monitorType;
    private ItemId itemId;
    private ModuleIds moduleId;
    private String itemName;
    private String readyTiem;
    private List<ItemBody> itemBodys;
    private String partition_type;
    private String alarmGroup;
    private String alarmman;
    private String status;
    private String alarmUniqueid;
    private String alarmGroupName;

    @Override
    public String toString() {
        return "ColumnRuler{" +
                "cid='" + cid + '\'' +
                ", number='" + number + '\'' +
                ", id='" + id + '\'' +
                ", cmonitor_type='" + cmonitor_type + '\'' +
                ", aggregate_function='" + aggregate_function + '\'' +
                ", ccondition='" + ccondition + '\'' +
                ", ctable_name='" + ctable_name + '\'' +
                ", column_name='" + column_name + '\'' +
                ", cdatabase_name='" + cdatabase_name + '\'' +
                ", calculate_type='" + calculate_type + '\'' +
                ", count_type='" + count_type + '\'' +
                ", deviation='" + deviation + '\'' +
                ", ch_compare='" + ch_compare + '\'' +
                ", ct_compare='" + ct_compare + '\'' +
                ", cself='" + cself + '\'' +
                ", day_increment='" + day_increment + '\'' +
                ", calarm_type='" + calarm_type + '\'' +
                ", cremark='" + cremark + '\'' +
                ", cowner='" + cowner + '\'' +
                ", ccontent='" + ccontent + '\'' +
                ", creciever='" + creciever + '\'' +
                ", ccreate_time=" + ccreate_time +
                ", create_partition_time='" + create_partition_time + '\'' +
                ", username='" + username + '\'' +
                ", monitorType=" + monitorType +
                ", itemId=" + itemId +
                ", moduleId=" + moduleId +
                ", itemName='" + itemName + '\'' +
                ", readyTiem='" + readyTiem + '\'' +
                ", itemBodys=" + itemBodys +
                ", partition_type='" + partition_type + '\'' +
                ", alarmGroup='" + alarmGroup + '\'' +
                ", alarmman='" + alarmman + '\'' +
                '}';
    }

    public String getAlarmGroup() {
        return alarmGroup;
    }

    public void setAlarmGroup(String alarmGroup) {
        this.alarmGroup = alarmGroup;
    }

    public String getAlarmman() {
        return alarmman;
    }

    public void setAlarmman(String alarmman) {
        this.alarmman = alarmman;
    }

    public ColumnRuler(String cid, String number, String id, String cmonitor_type, String aggregate_function, String ccondition, String ctable_name, String column_name, String cdatabase_name, String calculate_type, String count_type, String deviation, String ch_compare, String ct_compare, String cself, String day_increment, String calarm_type, String cremark, String cowner, String ccontent, String creciever, Date ccreate_time, String create_partition_time, String username, MonitorType monitorType, ItemId itemId, ModuleIds moduleId, String itemName, String readyTiem, List<ItemBody> itemBodys, String partition_type, String alarmGroup, String alarmman) {

        this.cid = cid;
        this.number = number;
        this.id = id;
        this.cmonitor_type = cmonitor_type;
        this.aggregate_function = aggregate_function;
        this.ccondition = ccondition;
        this.ctable_name = ctable_name;
        this.column_name = column_name;
        this.cdatabase_name = cdatabase_name;
        this.calculate_type = calculate_type;
        this.count_type = count_type;
        this.deviation = deviation;
        this.ch_compare = ch_compare;
        this.ct_compare = ct_compare;
        this.cself = cself;
        this.day_increment = day_increment;
        this.calarm_type = calarm_type;
        this.cremark = cremark;
        this.cowner = cowner;
        this.ccontent = ccontent;
        this.creciever = creciever;
        this.ccreate_time = ccreate_time;
        this.create_partition_time = create_partition_time;
        this.username = username;
        this.monitorType = monitorType;
        this.itemId = itemId;
        this.moduleId = moduleId;
        this.itemName = itemName;
        this.readyTiem = readyTiem;
        this.itemBodys = itemBodys;
        this.partition_type = partition_type;
        this.alarmGroup = alarmGroup;
        this.alarmman = alarmman;
    }

    public String getPartition_type() {
        return partition_type;
    }

    public void setPartition_type(String partition_type) {
        this.partition_type = partition_type;
    }

    public ColumnRuler(String cid, String number, String id, String cmonitor_type, String aggregate_function, String ccondition, String ctable_name, String column_name, String cdatabase_name, String calculate_type, String count_type, String deviation, String ch_compare, String ct_compare, String cself, String day_increment, String calarm_type, String cremark, String cowner, String ccontent, String creciever, Date ccreate_time, String create_partition_time, String username, MonitorType monitorType, ItemId itemId, ModuleIds moduleId, String itemName, String readyTiem, List<ItemBody> itemBodys, String partition_type) {

        this.cid = cid;
        this.number = number;
        this.id = id;
        this.cmonitor_type = cmonitor_type;
        this.aggregate_function = aggregate_function;
        this.ccondition = ccondition;
        this.ctable_name = ctable_name;
        this.column_name = column_name;
        this.cdatabase_name = cdatabase_name;
        this.calculate_type = calculate_type;
        this.count_type = count_type;
        this.deviation = deviation;
        this.ch_compare = ch_compare;
        this.ct_compare = ct_compare;
        this.cself = cself;
        this.day_increment = day_increment;
        this.calarm_type = calarm_type;
        this.cremark = cremark;
        this.cowner = cowner;
        this.ccontent = ccontent;
        this.creciever = creciever;
        this.ccreate_time = ccreate_time;
        this.create_partition_time = create_partition_time;
        this.username = username;
        this.monitorType = monitorType;
        this.itemId = itemId;
        this.moduleId = moduleId;
        this.itemName = itemName;
        this.readyTiem = readyTiem;
        this.itemBodys = itemBodys;
        this.partition_type = partition_type;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<ItemBody> getItemBodys() {
        return itemBodys;
    }

    public void setItemBodys(List<ItemBody> itemBodys) {
        this.itemBodys = itemBodys;
    }

    public MonitorType getMonitorType() {
        return monitorType;
    }

    public void setMonitorType(MonitorType monitorType) {
        this.monitorType = monitorType;
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

    public String getCid() {
        return cid;
    }

    public void setCid(String cid) {
        this.cid = cid;
    }

    public String getCmonitor_type() {
        return cmonitor_type;
    }

    public void setCmonitor_type(String cmonitor_type) {
        this.cmonitor_type = cmonitor_type;
    }

    public String getAggregate_function() {
        return aggregate_function;
    }

    public void setAggregate_function(String aggregate_function) {
        this.aggregate_function = aggregate_function;
    }

    public String getCcondition() {
        return ccondition;
    }

    public void setCcondition(String ccondition) {
        this.ccondition = ccondition;
    }

    public String getCtable_name() {
        return ctable_name;
    }

    public void setCtable_name(String ctable_name) {
        this.ctable_name = ctable_name;
    }

    public String getColumn_name() {
        return column_name;
    }

    public void setColumn_name(String column_name) {
        this.column_name = column_name;
    }

    public String getCdatabase_name() {
        return cdatabase_name;
    }

    public void setCdatabase_name(String cdatabase_name) {
        this.cdatabase_name = cdatabase_name;
    }

    public String getCalculate_type() {
        return calculate_type;
    }

    public void setCalculate_type(String calculate_type) {
        this.calculate_type = calculate_type;
    }

    public String getCount_type() {
        return count_type;
    }

    public void setCount_type(String count_type) {
        this.count_type = count_type;
    }

    public String getDeviation() {
        return deviation;
    }

    public void setDeviation(String deviation) {
        this.deviation = deviation;
    }

    public String getCh_compare() {
        return ch_compare;
    }

    public void setCh_compare(String ch_compare) {
        this.ch_compare = ch_compare;
    }

    public String getCt_compare() {
        return ct_compare;
    }

    public void setCt_compare(String ct_compare) {
        this.ct_compare = ct_compare;
    }

    public String getCself() {
        return cself;
    }

    public void setCself(String cself) {
        this.cself = cself;
    }

    public String getDay_increment() {
        return day_increment;
    }

    public void setDay_increment(String day_increment) {
        this.day_increment = day_increment;
    }

    public String getCalarm_type() {
        return calarm_type;
    }

    public void setCalarm_type(String calarm_type) {
        this.calarm_type = calarm_type;
    }

    public String getCremark() {
        return cremark;
    }

    public void setCremark(String cremark) {
        this.cremark = cremark;
    }

    public String getCowner() {
        return cowner;
    }

    public void setCowner(String cowner) {
        this.cowner = cowner;
    }

    public String getCcontent() {
        return ccontent;
    }

    public void setCcontent(String ccontent) {
        this.ccontent = ccontent;
    }

    public String getCreciever() {
        return creciever;
    }

    public void setCreciever(String creciever) {
        this.creciever = creciever;
    }

    public Date getCcreate_time() {
        return ccreate_time;
    }

    public void setCcreate_time(Date ccreate_time) {
        this.ccreate_time = ccreate_time;
    }

    public ColumnRuler() {

    }
    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getReadyTiem() {
        return readyTiem;
    }

    public void setReadyTiem(String readyTiem) {
        this.readyTiem = readyTiem;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public ColumnRuler(String cid, String number, String id, String cmonitor_type, String aggregate_function, String ccondition, String ctable_name, String column_name, String cdatabase_name, String calculate_type, String count_type, String deviation, String ch_compare, String ct_compare, String cself, String day_increment, String calarm_type, String cremark, String cowner, String ccontent, String creciever, Date ccreate_time, String create_partition_time, String username, MonitorType monitorType, ItemId itemId, ModuleIds moduleId, String itemName, String readyTiem, List<ItemBody> itemBodys) {

        this.cid = cid;
        this.number = number;
        this.id = id;
        this.cmonitor_type = cmonitor_type;
        this.aggregate_function = aggregate_function;
        this.ccondition = ccondition;
        this.ctable_name = ctable_name;
        this.column_name = column_name;
        this.cdatabase_name = cdatabase_name;
        this.calculate_type = calculate_type;
        this.count_type = count_type;
        this.deviation = deviation;
        this.ch_compare = ch_compare;
        this.ct_compare = ct_compare;
        this.cself = cself;
        this.day_increment = day_increment;
        this.calarm_type = calarm_type;
        this.cremark = cremark;
        this.cowner = cowner;
        this.ccontent = ccontent;
        this.creciever = creciever;
        this.ccreate_time = ccreate_time;
        this.create_partition_time = create_partition_time;
        this.username = username;
        this.monitorType = monitorType;
        this.itemId = itemId;
        this.moduleId = moduleId;
        this.itemName = itemName;
        this.readyTiem = readyTiem;
        this.itemBodys = itemBodys;
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
