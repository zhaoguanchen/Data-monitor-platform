package com.bitauto.modules.sys.service.impl;

import com.bitauto.modules.bussiness.UserBussiness;
import com.yiche.bdc.aurora.em.UserPlatformEnums;
import com.yiche.bdc.aurora.entity.user.UserEntity;
import com.yiche.bdc.aurora.entity.user.UserTokenEntity;
import com.yiche.bdc.aurora.exception.AuroraApiException;
import com.yiche.bdc.aurora.response.CommonResult;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bitauto.common.utils.Constant;
import com.bitauto.modules.sys.dao.SysMenuDao;
import com.bitauto.modules.sys.dao.SysUserDao;
import com.bitauto.modules.sys.entity.SysMenuEntity;
import com.bitauto.modules.sys.service.ShiroService;

import java.util.*;


@Service
public class ShiroServiceImpl implements ShiroService {
    @Autowired
    private SysMenuDao sysMenuDao;
    @Autowired
    private SysUserDao sysUserDao;
    @Autowired
    private UserBussiness userBussiness;

    private static Logger logger = LoggerFactory.getLogger(ShiroServiceImpl.class);

    /*
     * 获取用户权限类别  待修改
     * @param userId
     * @return
     */
    @Override
    public Set<String> getUserPermissions(long userId) {
        List<String> permsList;

        //系统管理员，拥有最高权限
        if (userId == Constant.SUPER_ADMIN) {
            List<SysMenuEntity> menuList = sysMenuDao.queryList(new HashMap<>());
            permsList = new ArrayList<>(menuList.size());
            for (SysMenuEntity menu : menuList) {
                permsList.add(menu.getPerms());
            }
        } else {
            permsList = sysUserDao.queryAllPerms(userId);
        }
        //用户权限列表
        Set<String> permsSet = new HashSet<>();
        for (String perms : permsList) {
            if (StringUtils.isBlank(perms)) {
                continue;
            }
            permsSet.addAll(Arrays.asList(perms.trim().split(",")));
        }
        return permsSet;
    }

    /**
     * 通过token查询用户对象
     *
     * @param token
     * @return
     */
    @Override
    public UserTokenEntity queryByToken(String token) {
        CommonResult<UserTokenEntity> result = userBussiness.queryByToken(token, UserPlatformEnums.SHUZHEN.getPlatform());
        if (result.isSuccess()) {
            return result.getData();
        }
        logger.error("Query token error:token:{},result:{}", token, result);
        throw new IncorrectCredentialsException("token失效，请重新登录");

    }

    @Override
    public UserEntity queryUser(Long userId ,String token) {
        CommonResult<UserEntity> result = userBussiness.queryByUserid(userId, token,UserPlatformEnums.SHUZHEN.getPlatform());
        if (result.isSuccess()) {
            return result.getData();
        }
        logger.error("Query user error:userId:{},result:{}", userId, result);
        throw new AuroraApiException(result.getMsg(), result.getCode());

    }
}
