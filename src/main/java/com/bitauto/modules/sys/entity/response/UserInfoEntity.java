package com.bitauto.modules.sys.entity.response;

import java.io.Serializable;

/**
 * Created by michealzhang on 2017/12/18.
 */
public class UserInfoEntity<T> implements Serializable{
    /**
     * 意义，目的和功能，以及被用到的地方<br>
     */
    private static final long serialVersionUID = -4020301315355522332L;
    private int code;
    private String msg;
    private UserGroupResponse data;

    public UserInfoEntity() {
    }



    public int getCode() {
        return code;
    }

    public UserInfoEntity<T> setCode(int code) {
        this.code = code;
        return this;
    }

    public String getMsg() {
        return msg;
    }

    public UserInfoEntity<T> setMsg(String msg) {
        this.msg = msg;
        return this;
    }

    @Override
    public String toString() {
        return "UserInfoEntity{" +
                "code=" + code +
                ", msg='" + msg + '\'' +
                ", data=" + data +
                '}';
    }

    public UserGroupResponse getData() {
        return data;
    }

    public void setData(UserGroupResponse data) {
        this.data = data;
    }

    public UserInfoEntity(int code, String msg, UserGroupResponse data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }
}
