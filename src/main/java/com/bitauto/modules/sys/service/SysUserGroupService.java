package com.bitauto.modules.sys.service;

import com.bitauto.modules.sys.entity.SysUserGroupEntity;

/**
 * @Author：Guanchen Zhao
 * @Date: 2018/9/4 下午1:20
 */
public interface SysUserGroupService {
    SysUserGroupEntity queryUserGroup(Long userId);

    void setUserGroup(String username, String token);
}
