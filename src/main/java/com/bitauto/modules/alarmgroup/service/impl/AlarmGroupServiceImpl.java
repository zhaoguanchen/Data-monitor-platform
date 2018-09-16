package com.bitauto.modules.alarmgroup.service.impl;

import com.bitauto.modules.alarmgroup.dao.AlarmGroupDao;
import com.bitauto.modules.alarmgroup.entity.AlarmGroup;
import com.bitauto.modules.alarmgroup.service.AlarmGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AlarmGroupServiceImpl implements AlarmGroupService{
    @Autowired
    private AlarmGroupDao alarmGroupDao;

    /**
     * 获取所有的组名称
     * @param map
     * @return
     */
    @Override
    public List<AlarmGroup> queryAllParentGroupName(Map<String,Object> map) {
        return alarmGroupDao.queryAllParentGroup(map);

    }

    @Override
    public AlarmGroup queryGroupById(int id) {
        return alarmGroupDao.queryGroupById(id);
    }

    /**
     * 获取组下的所有成员
     * @param map
     * @return
     */
    @Override
    public Map queryAllByGoup(Map<String,Object> map) {
        Map<String ,Object> map1=new HashMap<>();
        List<AlarmGroup> alarmGroups = alarmGroupDao.queyrAllByGoup(map);
        int itemId=Integer.parseInt((String) map.get("itemID"));
        String s = alarmGroupDao.queryGroupNameById(itemId);
        for (AlarmGroup alarmGroup:alarmGroups
                ) {
            alarmGroup.setGroupName(s);
        }
        int total = alarmGroupDao.getTotal(itemId);
        map1.put("total",total);
        map1.put("list",alarmGroups);
        return map1;
    }

    @Override
    public boolean insertGroup(AlarmGroup alarmGroup) {
        int i = alarmGroupDao.insertGroup(alarmGroup);
        if(i>0){
            return true;
        }
        return false;
    }

    @Override
    public boolean updateGroup(AlarmGroup alarmGroup) {
        return alarmGroupDao.updateGroup(alarmGroup);
    }


    @Override
    public boolean delete(String[] ids) {
        for (String id:ids
             ) {
            boolean b = alarmGroupDao.updateStatu(id);
            if (!b){
                return false;
            }
        }
        return true;
    }
}
