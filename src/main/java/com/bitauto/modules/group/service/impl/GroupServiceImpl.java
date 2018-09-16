package com.bitauto.modules.group.service.impl;

import com.bitauto.modules.group.dao.GroupDao;
import com.bitauto.modules.group.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service("groupServiceImpl")
public class GroupServiceImpl implements GroupService {
    @Autowired
    private GroupDao groupDao;
    @Override
    public List<Integer> queryGroupItemByGroup(String group) {
        return groupDao.queryGroupItemByGroup(group);
    }

    @Override
    public List<Integer> queryAlarmGroupRelaitonByGroup(String group) {
        return groupDao.queryAlarmGroupRelaitonByGroup(group);
    }
}
