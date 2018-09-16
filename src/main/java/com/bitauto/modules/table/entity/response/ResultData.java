package com.bitauto.modules.table.entity.response;

import com.bitauto.modules.table.entity.TableRuler;

import java.io.Serializable;
import java.util.List;

public class ResultData implements Serializable {
    private String code;
    private String msg;
    private List<TableRuler> data;

    @Override
    public String toString() {
        return "ResultData{" +
                "code='" + code + '\'' +
                ", msg='" + msg + '\'' +
                ", data=" + data +
                '}';
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public List<TableRuler> getData() {
        return data;
    }

    public void setData(List<TableRuler> data) {
        this.data = data;
    }

    public ResultData() {

    }

    public ResultData(String code, String msg, List<TableRuler> data) {

        this.code = code;
        this.msg = msg;
        this.data = data;
    }
}
