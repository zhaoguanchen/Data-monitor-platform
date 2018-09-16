package com.bitauto.modules.sys.controller;

import com.bitauto.common.utils.R;
import com.bitauto.common.utils.ShiroUtils;
import com.bitauto.modules.bussiness.UserBussiness;
import com.bitauto.modules.sys.service.SysUserGroupService;
import com.google.code.kaptcha.Constants;
import com.google.code.kaptcha.Producer;
import com.yiche.bdc.aurora.em.UserPlatformEnums;
import com.yiche.bdc.aurora.response.CommonResult;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;

/**
 * 登录相关
 *
 * @author chenshun
 * @email sunlightcs@gmail.com
 * @date 2016年11月10日 下午1:15:31
 */
@RestController
public class SysLoginController extends AbstractController {
    @Autowired
    private Producer producer;
    @Autowired
    private UserBussiness userBussiness;
    @Autowired
    private HttpServletRequest httpRequest;
    @Autowired
    private SysUserGroupService sysUserGroupService;


    /**
     * 验证码
     */
    @RequestMapping("captcha.jpg")
    public void captcha(HttpServletResponse response) throws ServletException, IOException {
        response.setHeader("Cache-Control", "no-store, no-cache");
        response.setContentType("image/jpeg");

        //生成文字验证码
        String text = producer.createText();
        //生成图片验证码
        BufferedImage image = producer.createImage(text);
        //保存到shiro session
        ShiroUtils.setSessionAttribute(Constants.KAPTCHA_SESSION_KEY, text);

        ServletOutputStream out = response.getOutputStream();
        ImageIO.write(image, "jpg", out);
        IOUtils.closeQuietly(out);
    }


    /**
     * 登录
     */
    @RequestMapping(value = "/sys/login", method = RequestMethod.POST)
    public Map<String, Object> login(String username, String password, String captcha) throws IOException {
        String uname = URLDecoder.decode(username, "utf-8");
        String pword = URLDecoder.decode(password, "utf-8");
        String kaptcha = ShiroUtils.getKaptcha(Constants.KAPTCHA_SESSION_KEY);

        if (!captcha.equalsIgnoreCase(kaptcha)) {
            return R.error("验证码不正确");
        }


        CommonResult<HashMap<String, String>> r = userBussiness.login(uname, pword, UserPlatformEnums.SHUZHEN.getPlatform());
        if (r.isSuccess()) {
            HashMap<String, String> dataMap = r.getData();
            //添加组信息
            sysUserGroupService.setUserGroup(uname, dataMap.get("token"));

            logger.info("Login success, username:{},token:{}", uname, dataMap.get("token"));

            return R.ok().put("token", dataMap.get("token"));
        }
        logger.error("Login fail, username:{},r:{}", username, r);

        return R.error(r.getMsg());
    }


    /**
     * 退出
     */
    @RequestMapping(value = "/sys/logout", method = RequestMethod.POST)
    public R logout() {

        CommonResult r = userBussiness.logout(getRequestToken(httpRequest), UserPlatformEnums.SHUZHEN.getPlatform());
        if (r.isSuccess()) {
            logger.info("Logout success, userId:{}", getUserId());
            return R.ok();
        }
        logger.error("Logout fail, userId:{},r:{}", getUserId(), r);
        return R.error(r.getMsg());

    }


}


