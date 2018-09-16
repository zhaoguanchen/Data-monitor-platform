package com.bitauto.modules.item.entity;

import com.bitauto.modules.table.entity.ModuleIds;

public class ItemBody {
    private int id;//表id
    private String name;//模块名称
    private int parentId;//父类id
    private String creater;//创建人
    private String remark;//注释
    private String itemName;//项目名称
    private ModuleIds moduleId;

    @Override
    public String toString() {
        return "ItemBody{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", parentId=" + parentId +
                ", creater='" + creater + '\'' +
                ", remark='" + remark + '\'' +
                ", itemName='" + itemName + '\'' +
                ", moduleId=" + moduleId +
                '}';
    }

    public ModuleIds getModuleId() {
        return moduleId;
    }

    public void setModuleId(ModuleIds moduleId) {
        this.moduleId = moduleId;
    }

    public ItemBody(int id, String name, int parentId, String creater, String remark, String itemName, ModuleIds moduleId) {

        this.id = id;
        this.name = name;
        this.parentId = parentId;
        this.creater = creater;
        this.remark = remark;
        this.itemName = itemName;
        this.moduleId = moduleId;
    }

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public ItemBody(int id, String name, int parentId, String creater, String remark, String itemName) {

        this.id = id;
        this.name = name;
        this.parentId = parentId;
        this.creater = creater;
        this.remark = remark;
        this.itemName = itemName;
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

    public ItemBody() {

    }

}

