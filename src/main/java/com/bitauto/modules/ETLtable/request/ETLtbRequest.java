package com.bitauto.modules.ETLtable.request;

import java.io.Serializable;

public class ETLtbRequest implements Serializable {
    private String tblName;

    @Override
    public String toString() {
        return "ETLtbRequest{" +
                "tblName='" + tblName + '\'' +
                '}';
    }

    public String getTblName() {
        return tblName;
    }

    public void setTblName(String tblName) {
        this.tblName = tblName;
    }

    public ETLtbRequest(String tblName) {

        this.tblName = tblName;
    }

    public ETLtbRequest() {

    }


}
