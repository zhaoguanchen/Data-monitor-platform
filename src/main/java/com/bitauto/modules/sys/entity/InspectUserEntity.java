package com.bitauto.modules.sys.entity;

import com.yiche.bdc.aurora.entity.user.UserEntity;

import java.util.List;

/**
 * @Author：Guanchen Zhao
 * @Date: 2018/9/2 下午6:49
 */
public class InspectUserEntity extends UserEntity {


    /**
     * 角色ID列表
     */
    private List<Long> roleIdList;

    @Override
    public List<Long> getRoleIdList() {
        return roleIdList;
    }

    @Override
    public void setRoleIdList(List<Long> roleIdList) {
        this.roleIdList = roleIdList;
    }
}

