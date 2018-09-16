package com.bitauto.modules.item.entity;

public class TableRelation {
    private int id;
    private int itemId;
    private String tableId;

    @Override
    public String toString() {
        return "TableRelation{" +
                "id=" + id +
                ", itemId=" + itemId +
                ", tableId=" + tableId +
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

    public String getTableId() {
        return tableId;
    }

    public void setTableId(String tableId) {
        this.tableId = tableId;
    }

    public TableRelation() {

    }

    public TableRelation(int id, int itemId, String tableId) {

        this.id = id;
        this.itemId = itemId;
        this.tableId = tableId;
    }
}
