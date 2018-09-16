package com.bitauto.modules.consanguinity.entity.response;

import java.util.List;

public class TableLineageVO {

        private TableNodeEntity tableNodeEntity;

        private List<TableNodeEntity> tableNodeList;

        private List<TableNodeRelation> tableNodeRelationList;

        public List<TableNodeEntity> getTableNodeList() {
            return tableNodeList;
        }

        public void setTableNodeList(List<TableNodeEntity> tableNodeList) {
            this.tableNodeList = tableNodeList;
        }

        public List<TableNodeRelation> getTableNodeRelationList() {
            return tableNodeRelationList;
        }

        public void setTableNodeRelationList(List<TableNodeRelation> tableNodeRelationList) {
            this.tableNodeRelationList = tableNodeRelationList;
        }

        public TableNodeEntity getTableNodeEntity() {
            return tableNodeEntity;
        }

        public void setTableNodeEntity(TableNodeEntity tableNodeEntity) {
            this.tableNodeEntity = tableNodeEntity;
        }

    public TableLineageVO() {
    }

    @Override
    public String toString() {
        return "TableLineageVO{" +
                "tableNodeEntity=" + tableNodeEntity +
                ", tableNodeList=" + tableNodeList +
                ", tableNodeRelationList=" + tableNodeRelationList +
                '}';
    }

    public TableLineageVO(TableNodeEntity tableNodeEntity, List<TableNodeEntity> tableNodeList, List<TableNodeRelation> tableNodeRelationList) {
        this.tableNodeEntity = tableNodeEntity;
        this.tableNodeList = tableNodeList;
        this.tableNodeRelationList = tableNodeRelationList;
    }
}
