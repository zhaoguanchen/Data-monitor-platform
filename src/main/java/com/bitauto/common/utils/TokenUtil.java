package com.bitauto.common.utils;

import org.apache.commons.lang.StringUtils;

import javax.servlet.http.HttpServletRequest;

/**
 * @Author：Guanchen Zhao
 * @Date: 2018/8/30 上午11:20
 */

public class TokenUtil {
    /**
     * 获取请求的token
     * @param httpRequest
     * @return
     */
    public static  String getRequestToken(HttpServletRequest httpRequest){
        //从header中获取token
        String token = httpRequest.getHeader("token");

        //如果header中不存在token，则从参数中获取token
        if(StringUtils.isBlank(token)){
            token = httpRequest.getParameter("token");
        }

        return token;
    }

}
