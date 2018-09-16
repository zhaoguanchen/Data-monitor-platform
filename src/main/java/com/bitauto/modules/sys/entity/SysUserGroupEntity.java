package com.bitauto.modules.sys.entity;

import java.io.Serializable;

/**
 * @Author：Guanchen Zhao
 * @Date: 2018/9/4 上午11:40
 */
public class SysUserGroupEntity implements Serializable {

    private static final long serialVersionUID = 1L;
    private Long id;

    /**
     * 用户ID
     */
    private Long userId;
    /**
     * 用户组信息
     */
    private String groups;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getGroups() {
        return groups;
    }

    public void setGroups(String groups) {
        this.groups = groups;
    }
}
