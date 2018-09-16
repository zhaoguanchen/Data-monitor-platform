package com.bitauto.modules.sys.service;

import java.util.Set;
import com.yiche.bdc.aurora.entity.user.UserEntity;
import com.yiche.bdc.aurora.entity.user.UserTokenEntity;

/**
 * shiro相关接口
 *
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2017-06-06 8:49
 */
public interface ShiroService {
    /**
     * 获取用户权限列表
     */
    Set<String> getUserPermissions(long userId);

    UserTokenEntity queryByToken(String token);

    /**
     * 根据用户ID，查询用户
     *
     * @param userId
     */
    UserEntity queryUser(Long userId,String token);
}
