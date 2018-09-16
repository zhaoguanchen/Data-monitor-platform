package com.bitauto.modules.alarmgroup.entity;

public class Groups {
    private String name;
    private String email;
    private String jobNumber;

    @Override
    public String toString() {
        return "Groups{" +
                "name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", jobNumber='" + jobNumber + '\'' +
                '}';
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getJobNumber() {
        return jobNumber;
    }

    public void setJobNumber(String jobNumber) {
        this.jobNumber = jobNumber;
    }

    public Groups() {

    }

    public Groups(String name, String email, String jobNumber) {

        this.name = name;
        this.email = email;
        this.jobNumber = jobNumber;
    }
}
