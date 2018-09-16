package com.bitauto.common.requestparma;

import java.io.Serializable;

public class LoginRequest implements Serializable {
    private String userName;
    private String password;

    @Override
    public String toString() {
        return "LoginRequest{" +
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

    public LoginRequest() {

    }

    public LoginRequest(String userName, String password) {

        this.userName = userName;
        this.password = password;
    }
}
