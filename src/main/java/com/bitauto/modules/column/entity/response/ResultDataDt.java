package com.bitauto.modules.column.entity.response;

import com.bitauto.modules.column.entity.ColumnRuler;

import java.io.Serializable;
import java.util.List;

public class ResultDataDt implements Serializable {
    private String code;
    private String msg;
    private List<ColumnRuler> data;

    @Override
    public String toString() {
        return "ResultDataDt{" +
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

    public List<ColumnRuler> getData() {
        return data;
    }

    public void setData(List<ColumnRuler> data) {
        this.data = data;
    }

    public ResultDataDt() {

    }

    public ResultDataDt(String code, String msg, List<ColumnRuler> data) {

        this.code = code;
        this.msg = msg;
        this.data = data;
    }
}
