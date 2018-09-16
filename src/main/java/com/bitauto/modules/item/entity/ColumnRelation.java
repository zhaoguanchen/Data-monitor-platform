package com.bitauto.modules.item.entity;

public class ColumnRelation {
    private int id;
    private int itemId;
    private String columnId;

    @Override
    public String toString() {
        return "ColumnRelation{" +
                "id=" + id +
                ", itemId=" + itemId +
                ", columnId='" + columnId + '\'' +
                '}';
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getItemId() {
        return itemId;
    }

    public void setItemId(int itemId) {
        this.itemId = itemId;
    }

    public String getColumnId() {
        return columnId;
    }

    public void setColumnId(String columnId) {
        this.columnId = columnId;
    }

    public ColumnRelation() {

    }

    public ColumnRelation(int id, int itemId, String columnId) {

        this.id = id;
        this.itemId = itemId;
        this.columnId = columnId;
    }
}
