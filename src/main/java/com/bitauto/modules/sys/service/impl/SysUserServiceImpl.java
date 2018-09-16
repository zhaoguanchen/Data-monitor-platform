package com.bitauto.modules.sys.service.impl;

import com.bitauto.modules.bussiness.UserBussiness;
import com.bitauto.modules.sys.dao.SysUserDao;
import com.bitauto.modules.sys.service.SysUserService;
import com.yiche.bdc.aurora.em.UserPlatformEnums;
import com.yiche.bdc.aurora.entity.user.UserEntity;
import com.yiche.bdc.aurora.exception.AuroraApiException;
import com.yiche.bdc.aurora.response.CommonResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

import static com.bitauto.common.utils.TokenUtil.getRequestToken;


/**
 * 系统用户
 *
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2016年9月18日 上午9:46:09
 */
@Service("sysUserService")
public class SysUserServiceImpl implements SysUserService {
    @Autowired
    private SysUserDao sysUserDao;
    @Autowired
    private UserBussiness userBussiness;

    @Autowired
    private HttpServletRequest httpRequest;

    protected Logger logger = LoggerFactory.getLogger(getClass());


    @Override
    public UserEntity queryByUserName(String username) {

        CommonResult<UserEntity> result = userBussiness.userInfo(username, getRequestToken(httpRequest),UserPlatformEnums.SHUZHEN.getPlatform());
       System.out.println(result.isSuccess());
        if (result.isSuccess()) {
            return result.getData();
        }
        logger.error("queryByUsername error:username:{}", username);

        throw new AuroraApiException("没有查到该用户");

    }


    @Override
    public List<String> queryAllPerms(Long userId) {
        return sysUserDao.queryAllPerms(userId);
    }


    @Override
    public List<Long> queryAllMenuId(Long userId) {
        return sysUserDao.queryAllMenuId(userId);
    }


}
