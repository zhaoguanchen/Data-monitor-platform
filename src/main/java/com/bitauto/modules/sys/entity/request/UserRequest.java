package com.bitauto.modules.sys.entity.request;

import java.io.Serializable;

public class UserRequest implements Serializable {
    private String userName;
    private String password;

    @Override
    public String toString() {
        return "UserRequest{" +
                "userName='" + userName + '\'' +
                ", password='" + password + '\'' +
                '}';
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UserRequest() {

    }

    public UserRequest(String userName, String password) {

        this.userName = userName;
        this.password = password;
    }
}
