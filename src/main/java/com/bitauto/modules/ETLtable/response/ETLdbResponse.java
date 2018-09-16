package com.bitauto.modules.ETLtable.response;

import java.io.Serializable;

public class ETLdbResponse implements Serializable {
    private String dbId;
    private String name;
    private String desc;
    private String ownerName;
    private String dbLocationUri;

    @Override
    public String toString() {
        return "ETLdbResponse{" +
                "dbId='" + dbId + '\'' +
                ", name='" + name + '\'' +
                ", desc='" + desc + '\'' +
                ", ownerName='" + ownerName + '\'' +
                ", dbLocationUri='" + dbLocationUri + '\'' +
                '}';
    }

    public String getDbId() {

        return dbId;
    }

    public void setDbId(String dbId) {
        this.dbId = dbId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public String getDbLocationUri() {
        return dbLocationUri;
    }

    public void setDbLocationUri(String dbLocationUri) {
        this.dbLocationUri = dbLocationUri;
    }

    public ETLdbResponse() {

    }

    public ETLdbResponse(String dbId, String name, String desc, String ownerName, String dbLocationUri) {

        this.dbId = dbId;
        this.name = name;
        this.desc = desc;
        this.ownerName = ownerName;
        this.dbLocationUri = dbLocationUri;
    }
}
