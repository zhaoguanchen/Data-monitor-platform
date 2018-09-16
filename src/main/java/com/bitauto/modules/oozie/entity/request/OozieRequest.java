package com.bitauto.modules.oozie.entity.request;

import java.io.Serializable;

public class OozieRequest implements Serializable {
    private String type="output";
    private String hdb;
    private String htable;

    @Override
    public String toString() {
        return "OozieRequest{" +
                "type='" + type + '\'' +
                ", hdb='" + hdb + '\'' +
                ", htable='" + htable + '\'' +
                '}';
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getHdb() {
        return hdb;
    }

    public void setHdb(String hdb) {
        this.hdb = hdb;
    }

    public String getHtable() {
        return htable;
    }

    public void setHtable(String htable) {
        this.htable = htable;
    }

    public OozieRequest() {

    }

    public OozieRequest(String type, String hdb, String htable) {

        this.type = type;
        this.hdb = hdb;
        this.htable = htable;
    }
}
