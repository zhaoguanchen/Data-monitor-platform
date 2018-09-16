package com.bitauto.modules.alarmGroupManager.service.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.bitauto.common.utils.HttpClientUtils;
import com.bitauto.common.utils.HttpUtils;
import com.bitauto.common.utils.R;
import com.bitauto.modules.alarmGroupManager.entity.AlarmGroupEntity;
import com.bitauto.modules.alarmGroupManager.service.AlarmGroupManagerService;
import com.yiche.bdc.aurora.entity.user.UserEntity;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

/**
 * Created by weiyongxu on 2018/8/13.
 */
@Service("alarmGroupManagerService")
public class AlarmGroupManagerServiceImpl implements AlarmGroupManagerService{

    private static Logger logger = LoggerFactory.getLogger(AlarmGroupManagerService.class);

    @Value("${RESTAPI.YU_BASE_URL}")
    private String dayuHost;

    @Value("${UNIFIED_ALARM_CENTER.alarmGroupTag}")
    private String alarmGroupTag;
    @Value("${UNIFIED_ALARM_CENTER.emailTemplateId}")
    private String emailTemplateId;
    @Value("${UNIFIED_ALARM_CENTER.emailServerId}")
    private String emailServerId;
    @Value("${UNIFIED_ALARM_CENTER.wxTemplateId}")
    private String wxTemplateId;
    @Value("${UNIFIED_ALARM_CENTER.wxServerId}")
    private String wxServerId;
    @Value("${UNIFIED_ALARM_CENTER.emailSender}")
    private String emailSender;


    @Override
    public R createAlarmGroup(AlarmGroupEntity alarmGroupEntity) {
        alarmGroupEntity.setEmailTemplateId(emailTemplateId);
        alarmGroupEntity.setEmailServerId(emailServerId);
        alarmGroupEntity.setWxTemplateId(wxTemplateId);
        alarmGroupEntity.setWxServerId(wxServerId);
        alarmGroupEntity.setGroupTag(alarmGroupTag);
        alarmGroupEntity.setEmailSender(emailSender);

        UserEntity userEntity = (UserEntity) SecurityUtils.getSubject().getPrincipal();
        alarmGroupEntity.setExtUser(userEntity.getUsername());

        String url = dayuHost + "/api/v1/notice/group/create";
        String res = null;
        try {
            res = HttpUtils.httpPostWithJSON(url, JSON.toJSONString(alarmGroupEntity));
        }catch (Exception e) {
            e.printStackTrace();
            logger.error("post http request create error, params:{}", alarmGroupEntity);
            return R.error("request to dayu host fail");
        }
        JSONObject jsonObject = JSON.parseObject(res);
        String code = jsonObject.getString("code");
        if(null == code || !"0".equals(code)) {
            logger.error("create group fail, params:{}, res:{}", alarmGroupEntity, res);
            return R.error(jsonObject.getString("msg"));
        }

        HashMap<String, Object> hashMap = new HashMap<>();
        hashMap.put("uniqueId", jsonObject.getString("uniqueId"));
        return R.ok(hashMap);
    }

    @Override
    public R updateAlarmGroup(AlarmGroupEntity alarmGroupEntity) {
        String url = dayuHost + "/api/v1/notice/group/update";
        String res = null;
        try {
            res = HttpUtils.httpPutWithJSON(url, JSON.toJSONString(alarmGroupEntity));
        }catch (Exception e) {
            e.printStackTrace();
            logger.error("put http request update error, params:{}", alarmGroupEntity);
            return R.error("request to dayu host fail");
        }
        JSONObject jsonObject = JSON.parseObject(res);
        String code = jsonObject.getString("code");
        if(null == code || !"0".equals(code)) {
            logger.error("update group fail, params:{}, res:{}", alarmGroupEntity, res);
            return R.error(jsonObject.getString("msg"));
        }

        return R.ok();
    }

    @Override
    public R queryByUniqueid(String uniqueid) {
        String url = dayuHost + "/api/v1/notice/group/unique/" + uniqueid;
        String res = null;
        try {
            res = HttpClientUtils.get(url);
        }catch (Exception e) {
            e.printStackTrace();
            logger.error("get http request update error, uniqueid:{}", uniqueid);
            return R.error("request to dayu host fail");
        }
        JSONObject jsonObject = JSON.parseObject(res);
        String code = jsonObject.getString("code");
        if(null == code || !"0".equals(code)) {
            logger.error("get group fail, uniqueid:{}, res:{}", uniqueid, res);
            return R.error(jsonObject.getString("msg"));
        }

        AlarmGroupEntity group = JSON.parseObject(jsonObject.getString("group"), AlarmGroupEntity.class);
        HashMap<String, Object> hashMap = new HashMap<>();
        hashMap.put("group", group);
        return R.ok(hashMap);
    }

    @Override
    public List<AlarmGroupEntity> listByTagname(String tagname) {
        if(StringUtils.isEmpty(tagname)) {
            tagname = alarmGroupTag;
        }
        String url = dayuHost + "/api/v1/notice/group/list/tag/" + tagname;
        String res = null;
        try {
            res = HttpClientUtils.get(url);
        }catch (Exception e) {
            e.printStackTrace();
            logger.error("list by tagname http request error, tagname:{}", tagname);
            return null;
        }
        JSONObject jsonObject = JSON.parseObject(res);
        String code = jsonObject.getString("code");
        if(null == code || !"0".equals(code)) {
            logger.error("list by tagname fail, tagname:{}, res:{}", tagname, res);
            return null;
        }

        List<AlarmGroupEntity> list = JSON.parseArray(jsonObject.getString("list"), AlarmGroupEntity.class);
        return list;
    }
}
