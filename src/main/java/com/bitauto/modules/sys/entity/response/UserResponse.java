package com.bitauto.modules.sys.entity.response;

import java.io.Serializable;

public class UserResponse implements Serializable{
    private String code;
    private String msg;
    private String data;

    @Override
    public String toString() {
        return "UserResponse{" +
                "code='" + code + '\'' +
                ", msg='" + msg + '\'' +
                ", data='" + data + '\'' +
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

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public UserResponse() {

    }

    public UserResponse(String code, String msg, String data) {

        this.code = code;
        this.msg = msg;
        this.data = data;
    }
}
