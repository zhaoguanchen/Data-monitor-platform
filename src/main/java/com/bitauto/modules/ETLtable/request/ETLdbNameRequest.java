package com.bitauto.modules.ETLtable.request;

import java.io.Serializable;

public class ETLdbNameRequest implements Serializable {
    private String dbId;//请求参数数据库名称
    private String userName;//用户名称
    @Override
    public String toString() {
        return "ETLdbNameRequest{" +
                "dbId='" + dbId + '\'' +
                '}';
    }

    public String getDbId() {
        return dbId;
    }

    public void setDbId(String dbId) {
        this.dbId = dbId;
    }

    public ETLdbNameRequest(String dbId) {

        this.dbId = dbId;
    }

    public ETLdbNameRequest() {

    }

}
