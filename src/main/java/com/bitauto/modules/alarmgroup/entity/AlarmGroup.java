package com.bitauto.modules.alarmgroup.entity;


import com.bitauto.modules.table.entity.ModuleIds;

public class AlarmGroup {
    private int id;
    private String name;//用户名
    private int parentId;//父类id
    private String creater;//创建人
    private String remark;//注释
    private int statu;//状态
    private String groupName;//组名称
    private String email;//用户邮箱
    private int jobNumber;//用户工号
    private ModuleId moduleId;

    @Override
    public String toString() {
        return "AlarmGroup{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", parentId=" + parentId +
                ", creater='" + creater + '\'' +
                ", remark='" + remark + '\'' +
                ", statu=" + statu +
                ", groupName='" + groupName + '\'' +
                ", email='" + email + '\'' +
                ", jobNumber=" + jobNumber +
                ", moduleId=" + moduleId +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getParentId() {
        return parentId;
    }

    public void setParentId(int parentId) {
        this.parentId = parentId;
    }

    public String getCreater() {
        return creater;
    }

    public void setCreater(String creater) {
        this.creater = creater;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public int getStatu() {
        return statu;
    }

    public void setStatu(int statu) {
        this.statu = statu;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getJobNumber() {
        return jobNumber;
    }

    public void setJobNumber(int jobNumber) {
        this.jobNumber = jobNumber;
    }

    public ModuleId getModuleId() {
        return moduleId;
    }

    public void setModuleId(ModuleId moduleId) {
        this.moduleId = moduleId;
    }

    public AlarmGroup() {

    }

    public AlarmGroup(int id, String name, int parentId, String creater, String remark, int statu, String groupName, String email, int jobNumber, ModuleId moduleId) {

        this.id = id;
        this.name = name;
        this.parentId = parentId;
        this.creater = creater;
        this.remark = remark;
        this.statu = statu;
        this.groupName = groupName;
        this.email = email;
        this.jobNumber = jobNumber;
        this.moduleId = moduleId;
    }
}
