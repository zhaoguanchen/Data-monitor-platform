package com.bitauto.modules.alarmGroupManager.controller;

import com.bitauto.common.utils.R;
import com.bitauto.modules.alarmGroupManager.entity.AlarmGroupEntity;
import com.bitauto.modules.alarmGroupManager.service.AlarmGroupManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

/**
 * Created by weiyongxu on 2018/8/13.
 */
@RestController
public class AlarmGroupManagerController {

    @Autowired
    private AlarmGroupManagerService alarmGroupManagerService;

    @RequestMapping("/alarm_group_manager/create")
    public R create(@RequestBody AlarmGroupEntity alarmGroupEntity){
        return alarmGroupManagerService.createAlarmGroup(alarmGroupEntity);
    }

    @RequestMapping("/alarm_group_manager/update")
    public R update(@RequestBody AlarmGroupEntity alarmGroupEntity){
        return alarmGroupManagerService.updateAlarmGroup(alarmGroupEntity);
    }

    @RequestMapping("/alarm_group_manager/query_by_uniqueid")
    public R queryByUniqueId(@RequestParam String uniqueid){
        return alarmGroupManagerService.queryByUniqueid(uniqueid);
    }

    @RequestMapping("/alarm_group_manager/list_by_tagname")
    public R listByTagname(@RequestParam(required = false) String tagname){
        List<AlarmGroupEntity> list = alarmGroupManagerService.listByTagname(tagname);
        if(null == list) {
            return R.error("list fail");
        }
        HashMap<String, Object> hashMap = new HashMap<>();
        hashMap.put("list", list);
        hashMap.put("totalCount", list.size());
        return R.ok(hashMap);
    }

}
