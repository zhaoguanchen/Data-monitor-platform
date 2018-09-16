package com.bitauto.modules.consanguinity.entity.response;

public class TableNodeRelation {
    private int tableNodeRelationId;
    private int tableNodeId;
    private int nextTableNodeId;
    @Override
    public String toString() {
        return "TableNodeRelationList{" +
                "tableNodeRelationId=" + tableNodeRelationId +
                ", tableNodeId=" + tableNodeId +
                ", nextTableNodeId=" + nextTableNodeId +
                '}';
    }

    public int getTableNodeRelationId() {
        return tableNodeRelationId;
    }

    public void setTableNodeRelationId(int tableNodeRelationId) {
        this.tableNodeRelationId = tableNodeRelationId;
    }

    public int getTableNodeId() {
        return tableNodeId;
    }

    public void setTableNodeId(int tableNodeId) {
        this.tableNodeId = tableNodeId;
    }

    public int getNextTableNodeId() {
        return nextTableNodeId;
    }

    public void setNextTableNodeId(int nextTableNodeId) {
        this.nextTableNodeId = nextTableNodeId;
    }

    public TableNodeRelation() {
    }

    public TableNodeRelation(int tableNodeRelationId, int tableNodeId, int nextTableNodeId) {

        this.tableNodeRelationId = tableNodeRelationId;
        this.tableNodeId = tableNodeId;
        this.nextTableNodeId = nextTableNodeId;
    }
}
