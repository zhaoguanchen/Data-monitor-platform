package com.bitauto.modules.sys.entity.response;

import java.io.Serializable;

public class LoginR<T> implements Serializable {
    private static final long serialVersionUID = -4020301315355522332L;
    private int code;
    private String msg;
    private T data;

    @Override
    public String toString() {
        return "LoginR{" +
                "code=" + code +
                ", msg='" + msg + '\'' +
                ", data=" + data +
                '}';
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public LoginR() {

    }

    public LoginR(int code, String msg, T data) {

        this.code = code;
        this.msg = msg;
        this.data = data;
    }
}
