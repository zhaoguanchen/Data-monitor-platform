package com.bitauto.common.utils;

import com.yiche.bdc.aurora.response.CommonResult;

/**
 * @Author：Guanchen Zhao
 * @Date: 2018/9/5 上午10:51
 */
public class ResultConvert {
    public static R resConvert(CommonResult commonResult){
        if(commonResult.isSuccess()){
            return R.ok().put("page", commonResult.getData());
        }else {
            return R.error(commonResult.getMsg());
        }
    }
}
