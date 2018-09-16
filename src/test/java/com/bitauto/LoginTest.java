package com.bitauto;

import com.bitauto.modules.bussiness.UserBussiness;
import com.bitauto.modules.sys.dao.SysUserGroupDao;
import com.bitauto.modules.sys.entity.SysUserGroupEntity;
import com.bitauto.modules.sys.service.SysUserGroupService;
import com.bitauto.modules.sys.service.SysUserService;
import com.yiche.bdc.aurora.em.UserPlatformEnums;
import com.yiche.bdc.aurora.entity.user.EmployeeEntity;
import com.yiche.bdc.aurora.entity.user.UserEntity;
import com.yiche.bdc.aurora.response.CommonResult;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;

import static com.bitauto.common.utils.TokenUtil.getRequestToken;


@RunWith(SpringRunner.class)
@SpringBootTest
/**
 * 测试单点登录
 */
public class LoginTest {
    // @Autowired
    // SysLoginController sysLoginController;
    @Autowired
    SysUserService sysUserService;
    @Autowired
    SysUserGroupDao sysUserGroupDao;
    @Autowired
    SysUserGroupService sysUserGroupService;
    @Autowired
    UserBussiness userBussiness;
    @Autowired
    private HttpServletRequest httpRequest;
    String token = "";
    String name = "zhaoguanchen";
    String passwd = "123456";

    @Test
    public void logintest() {
        CommonResult<HashMap<String, String>> r = userBussiness.login(name, passwd, UserPlatformEnums.SHUZHEN.getPlatform());
        HashMap<String, String> dataMap = r.getData();
        token = dataMap.get("token");
        System.out.println(r.getData());
        setGroupTest();

    }


    @Test
    public void setGroupTest() {
       token ="185bd511721fd16c2128de040a50883b";
        CommonResult<UserEntity> userEntityCommonResult = userBussiness.userInfo(name, token, UserPlatformEnums.SHUZHEN.getPlatform());

        Long userId = userEntityCommonResult.getData().getUserId();


        SysUserGroupEntity sysUserGroupEntity = sysUserGroupService.queryUserGroup(userId);
        if (sysUserGroupEntity == null) {
            CommonResult<EmployeeEntity> commonResult = userBussiness.getYiCheUserByDomainAccount(name, token, UserPlatformEnums.SHUZHEN.getPlatform());
//            Gson gson = new Gson();
//            EmployeeEntity employeeEntity = gson.fromJson(commonResult.getData(), EmployeeEntity.class);

            EmployeeEntity employeeEntity = commonResult.getData();
            System.out.println(employeeEntity);

            String departmentId = employeeEntity.getDepartmentId();
            String departName = employeeEntity.getDepartName();
            String group = departName + departmentId;

            sysUserGroupDao.setUserGroup(userId, group);
            System.out.println(group);
        }


    }

    @Test
    public void userInfoTest() {
        String name = "zhaoguanchen";
        CommonResult<UserEntity> result = userBussiness.userInfo(name, getRequestToken(httpRequest), UserPlatformEnums.SHUZHEN.getPlatform());
        System.out.println(result.isSuccess());
    }


}
