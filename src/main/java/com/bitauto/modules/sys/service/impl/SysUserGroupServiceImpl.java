package com.bitauto.modules.sys.service.impl;

import com.bitauto.modules.bussiness.UserBussiness;
import com.bitauto.modules.sys.dao.SysUserGroupDao;
import com.bitauto.modules.sys.entity.SysUserGroupEntity;
import com.bitauto.modules.sys.service.SysUserGroupService;
import com.yiche.bdc.aurora.em.UserPlatformEnums;
import com.yiche.bdc.aurora.entity.user.EmployeeEntity;
import com.yiche.bdc.aurora.entity.user.UserEntity;
import com.yiche.bdc.aurora.response.CommonResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @Author：Guanchen Zhao
 * @Date: 2018/9/4 下午12:28
 */
@Service("SysUserGroupService")
public class SysUserGroupServiceImpl implements SysUserGroupService {
    @Autowired
    private SysUserGroupDao sysUserGroupDao;
    @Autowired
    private UserBussiness userBussiness;

    protected Logger logger = LoggerFactory.getLogger(getClass());

    @Override
    public SysUserGroupEntity queryUserGroup(Long userId) {
        return sysUserGroupDao.queryUserGroup(userId);
    }

    /**
     * 登录时判断组信息是否存在，不存在则添加组信息
     *
     * @param username
     * @param token
     */
    @Override
    public void setUserGroup(String username, String token) {

        CommonResult<UserEntity> userEntityCommonResult = userBussiness.userInfo(username, token, UserPlatformEnums.SHUZHEN.getPlatform());

        Long userId = userEntityCommonResult.getData().getUserId();
        System.out.println(userEntityCommonResult.getData());


        SysUserGroupEntity sysUserGroupEntity = queryUserGroup(userId);
        if (sysUserGroupEntity == null) {
            CommonResult<EmployeeEntity> commonResult = userBussiness.getYiCheUserByDomainAccount(username, token, UserPlatformEnums.SHUZHEN.getPlatform());
            EmployeeEntity employeeEntity = (EmployeeEntity) commonResult.getData();
            String departmentId = employeeEntity.getDepartmentId();
            String departName = employeeEntity.getDepartName();
            String group = departName + departmentId;
            sysUserGroupDao.setUserGroup(userId, group);
            logger.info("setUserGroup: userId：{}，username:{},group:{}", userId, username, group);

        }


    }
}
