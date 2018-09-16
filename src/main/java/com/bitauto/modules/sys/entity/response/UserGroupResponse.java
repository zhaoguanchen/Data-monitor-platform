package com.bitauto.modules.sys.entity.response;

public class UserGroupResponse {
//    "employeeId": "24659",
//            "domainAccount": "luozhenyu",
//            "cnName": "罗振宇",
//            "enName": "",
//            "employeeNumber": "14860",
//            "postTitle": null,
//            "email": "luozhenyu@yiche.com",
//            "mobile": "18646236554",
//            "departmentId": "5834",
//            "parentDepartmentId": "5828",
//            "sex": null,
//            "departName": "研发一组"
    private String employeeId;
    private String domainAccount;
    private String cnName;
    private String enName;
    private String employeeNumber;
    private String postTitle;
    private String email;
    private String mobile;
    private String departmentId;
    private String parentDepartmentId;
    private String sex;
    private String departName;

    @Override
    public String toString() {
        return "UserGroupResponse{" +
                "employeeId='" + employeeId + '\'' +
                ", domainAccount='" + domainAccount + '\'' +
                ", cnName='" + cnName + '\'' +
                ", enName='" + enName + '\'' +
                ", employeeNumber='" + employeeNumber + '\'' +
                ", postTitle='" + postTitle + '\'' +
                ", email='" + email + '\'' +
                ", mobile='" + mobile + '\'' +
                ", departmentId='" + departmentId + '\'' +
                ", parentDepartmentId='" + parentDepartmentId + '\'' +
                ", sex='" + sex + '\'' +
                ", departName='" + departName + '\'' +
                '}';
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public String getDomainAccount() {
        return domainAccount;
    }

    public void setDomainAccount(String domainAccount) {
        this.domainAccount = domainAccount;
    }

    public String getCnName() {
        return cnName;
    }

    public void setCnName(String cnName) {
        this.cnName = cnName;
    }

    public String getEnName() {
        return enName;
    }

    public void setEnName(String enName) {
        this.enName = enName;
    }

    public String getEmployeeNumber() {
        return employeeNumber;
    }

    public void setEmployeeNumber(String employeeNumber) {
        this.employeeNumber = employeeNumber;
    }

    public String getPostTitle() {
        return postTitle;
    }

    public void setPostTitle(String postTitle) {
        this.postTitle = postTitle;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(String departmentId) {
        this.departmentId = departmentId;
    }

    public String getParentDepartmentId() {
        return parentDepartmentId;
    }

    public void setParentDepartmentId(String parentDepartmentId) {
        this.parentDepartmentId = parentDepartmentId;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getDepartName() {
        return departName;
    }

    public void setDepartName(String departName) {
        this.departName = departName;
    }

    public UserGroupResponse() {

    }

    public UserGroupResponse(String employeeId, String domainAccount, String cnName, String enName, String employeeNumber, String postTitle, String email, String mobile, String departmentId, String parentDepartmentId, String sex, String departName) {

        this.employeeId = employeeId;
        this.domainAccount = domainAccount;
        this.cnName = cnName;
        this.enName = enName;
        this.employeeNumber = employeeNumber;
        this.postTitle = postTitle;
        this.email = email;
        this.mobile = mobile;
        this.departmentId = departmentId;
        this.parentDepartmentId = parentDepartmentId;
        this.sex = sex;
        this.departName = departName;
    }
}
