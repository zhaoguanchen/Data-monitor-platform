package com.bitauto.common.response;

import java.io.Serializable;

/**
 * Created by michealzhang on 2017/12/18.
 */
public class Rs<T> implements Serializable{
    /**
     * 意义，目的和功能，以及被用到的地方<br>
     */
    private static final long serialVersionUID = -4020301315355522332L;
    private int code;
    private String msg;
    private T data;

    public Rs() {
    }

    public Rs(int code, String msg, T data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    public int getCode() {
        return code;
    }

    public Rs<T> setCode(int code) {
        this.code = code;
        return this;
    }

    public String getMsg() {
        return msg;
    }

    public Rs<T> setMsg(String msg) {
        this.msg = msg;
        return this;
    }

    public T getData() {
        return data;
    }

    public Rs<T> setData(T data) {
        this.data = data;
        return  this;
    }
}
