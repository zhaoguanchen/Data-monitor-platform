package com.bitauto.modules.group.service;

import java.util.List;

public interface GroupService {

    List<Integer> queryGroupItemByGroup(String group);

    List<Integer> queryAlarmGroupRelaitonByGroup(String group);
}
