package com.bitauto.modules.group.entity;

public class GroupItem {
    private String id;
    private String groups;
    private int itemId;

    @Override
    public String toString() {
        return "GroupItem{" +
                "id='" + id + '\'' +
                ", group='" + groups + '\'' +
                ", itemId=" + itemId +
                '}';
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getGroups() {
        return groups;
    }

    public void setGroups(String groups) {
        this.groups = groups;
    }

    public int getItemId() {
        return itemId;
    }

    public void setItemId(int itemId) {
        this.itemId = itemId;
    }

    public GroupItem() {

    }

    public GroupItem(String id, String groups, int itemId) {

        this.id = id;
        this.groups = groups;
        this.itemId = itemId;
    }
}
