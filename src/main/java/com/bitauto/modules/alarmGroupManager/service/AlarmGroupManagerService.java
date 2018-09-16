package com.bitauto.modules.alarmGroupManager.service;

import com.bitauto.common.utils.R;
import com.bitauto.modules.alarmGroupManager.entity.AlarmGroupEntity;

import java.util.HashMap;
import java.util.List;

/**
 * Created by weiyongxu on 2018/8/13.
 */
public interface AlarmGroupManagerService {
    R createAlarmGroup(AlarmGroupEntity alarmGroupEntity);
    R updateAlarmGroup(AlarmGroupEntity alarmGroupEntity);
    R queryByUniqueid(String uniqueid);
    List<AlarmGroupEntity> listByTagname(String tagname);

}
