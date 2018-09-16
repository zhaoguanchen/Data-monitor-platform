package com.bitauto.modules.bussiness;


import com.yiche.bdc.aurora.entity.user.EmployeeEntity;
import com.yiche.bdc.aurora.entity.user.UserEntity;
import com.yiche.bdc.aurora.entity.user.UserTokenEntity;
import com.yiche.bdc.aurora.response.CommonResult;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;
import java.util.Map;


@FeignClient(value = "aurora-user")
public interface UserBussiness {

    @RequestMapping(value = "/sys/login", method = RequestMethod.POST)
    CommonResult<HashMap<String, String>> login(@RequestParam("username") String username, @RequestParam("password") String password, @RequestParam("platform") Integer platform);

    @RequestMapping(value = "/sys/logout", method = RequestMethod.POST)
    CommonResult logout(@RequestParam("token") String token, @RequestParam("platform") Integer platform);

    @RequestMapping(value = "/user/info/userId", method = RequestMethod.POST)
    CommonResult<UserEntity> queryByUserid(@RequestParam("userId") Long userId, @RequestParam("token") String token, @RequestParam("platform") Integer platform);

    @RequestMapping(value = "/validate", method = RequestMethod.GET)
    CommonResult validate(@RequestParam("token") String token, @RequestParam("platform") Integer platform);

    @RequestMapping(value = "/info/token", method = RequestMethod.GET)
    CommonResult<UserTokenEntity> queryByToken(@RequestParam("token") String token, @RequestParam("platform") Integer platform);

    @RequestMapping(value = "/user/info/username", method = RequestMethod.POST)
    CommonResult<UserEntity> userInfo(@RequestParam("username") String username, @RequestParam("token") String token, @RequestParam("platform") Integer platform);

    @RequestMapping(value = "/user/list", method = RequestMethod.GET)
    CommonResult listUser(@RequestParam Map<String, Object> params, @RequestParam("token") String token, @RequestParam("platform") Integer platform);

    @RequestMapping(value = "/user/userinfo")
    CommonResult<EmployeeEntity> getYiCheUserByDomainAccount(@RequestParam(value = "domainAccount") String domainAccount, @RequestParam("token") String token, @RequestParam("platform") Integer platform);

}
