package com.bitauto.modules.sys.controller;

import com.alibaba.fastjson.JSON;
import com.bitauto.common.utils.R;
import com.bitauto.common.utils.ResultConvert;
import com.bitauto.modules.bussiness.UserBussiness;
import com.bitauto.modules.sys.entity.InspectUserEntity;
import com.bitauto.modules.sys.service.SysUserRoleService;
import com.bitauto.modules.sys.service.SysUserService;
import com.yiche.bdc.aurora.em.UserPlatformEnums;
import com.yiche.bdc.aurora.entity.user.UserEntity;
import com.yiche.bdc.aurora.response.CommonResult;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 * 系统用户
 *
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2016年10月31日 上午10:40:10
 */
@RestController
@RequestMapping("/sys/user")
public class SysUserController extends AbstractController {
    @Autowired
    private SysUserService sysUserService;
    @Autowired
    private SysUserRoleService sysUserRoleService;
    @Autowired
    private UserBussiness userBussiness;
    @Autowired
    private HttpServletRequest httpServletRequest;


    /**
     * 所有用户列表
     */

    @RequestMapping("/list")
    @RequiresPermissions("sys:user:list")
    public R list(@RequestParam Map<String, Object> params) {
        CommonResult r = userBussiness.listUser(params, getRequestToken(httpServletRequest), UserPlatformEnums.SHUZHEN.getPlatform());
        return ResultConvert.resConvert(r);
    }

    /**
     * 获取登录的用户信息
     */
    @RequestMapping("/info")
    public R info() {
        return R.ok().put("user", getUser());
    }

    /**
     * 用户信息
     */

    @RequestMapping("/info/{userId}")
    @RequiresPermissions("sys:user:info")
    public R info(@PathVariable("userId") Long userId) {

        CommonResult<UserEntity> r = userBussiness.queryByUserid(userId, getRequestToken(httpServletRequest), UserPlatformEnums.SHUZHEN.getPlatform());
        InspectUserEntity user;
        if (r.isSuccess()) {
            String json = JSON.toJSONString(r.getData());
            user = JSON.parseObject(json, InspectUserEntity.class);
        } else {
            return R.error(r.getMsg());
        }

        //获取用户所属的角色列表
        List<Long> roleIdList = sysUserRoleService.queryRoleIdList(userId);
        user.setRoleIdList(roleIdList);

        return R.ok().put("user", user);


    }

}


