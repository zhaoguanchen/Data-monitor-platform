package com.bitauto.modules.sys.dao;

import com.bitauto.modules.sys.entity.SysUserGroupEntity;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
 * @Author：Guanchen Zhao
 * @Date: 2018/9/4 下午12:26
 */
@Mapper
public interface SysUserGroupDao {
    SysUserGroupEntity queryUserGroup(Long userId);

    void setUserGroup(@Param("userId") Long userId, @Param("group") String group);
}
