package com.bitauto.modules.alarmGroupManager.entity;

import java.io.Serializable;

/**
 * Created by weiyongxu on 2018/8/13.
 */
public class AlarmGroupEntity implements Serializable {
    private String groupName;
    private String groupTag;
    private String emailToList;
    private String emailTemplateId;
    private String emailServerId;
    private String wxTemplateId;
    private String wxServerId;
    private String wxToList;
    private String extUser;
    private String uniqueId;
    private String emailSender;

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public String getGroupTag() {
        return groupTag;
    }

    public void setGroupTag(String groupTag) {
        this.groupTag = groupTag;
    }

    public String getEmailToList() {
        return emailToList;
    }

    public void setEmailToList(String emailToList) {
        this.emailToList = emailToList;
    }

    public String getEmailTemplateId() {
        return emailTemplateId;
    }

    public void setEmailTemplateId(String emailTemplateId) {
        this.emailTemplateId = emailTemplateId;
    }

    public String getEmailServerId() {
        return emailServerId;
    }

    public void setEmailServerId(String emailServerId) {
        this.emailServerId = emailServerId;
    }

    public String getWxTemplateId() {
        return wxTemplateId;
    }

    public void setWxTemplateId(String wxTemplateId) {
        this.wxTemplateId = wxTemplateId;
    }

    public String getWxServerId() {
        return wxServerId;
    }

    public void setWxServerId(String wxServerId) {
        this.wxServerId = wxServerId;
    }

    public String getWxToList() {
        return wxToList;
    }

    public void setWxToList(String wxToList) {
        this.wxToList = wxToList;
    }


    public String getExtUser() {
        return extUser;
    }

    public void setExtUser(String extUser) {
        this.extUser = extUser;
    }

    public String getUniqueId() {
        return uniqueId;
    }

    public void setUniqueId(String uniqueId) {
        this.uniqueId = uniqueId;
    }

    public String getEmailSender() {
        return emailSender;
    }

    public void setEmailSender(String emailSender) {
        this.emailSender = emailSender;
    }
}
