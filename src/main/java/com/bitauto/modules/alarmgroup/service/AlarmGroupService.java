package com.bitauto.modules.alarmgroup.service;

import com.bitauto.modules.alarmgroup.entity.AlarmGroup;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Map;

public interface AlarmGroupService {
    /**
     * 获取所有的组名称
     * @return
     */
    List<AlarmGroup> queryAllParentGroupName(Map<String,Object> map);

    AlarmGroup queryGroupById(int id);

    /**
     * 根据父类的id获取该组下的所有用户信息
     * @param map
     * @return
     */
    Map queryAllByGoup(Map<String,Object> map);

    /**
     * 添加用户信息
     * @param alarmGroup
     * @return
     */
    boolean insertGroup(AlarmGroup alarmGroup);

    /**
     * 更新用户信息
     * @param alarmGroup
     * @return
     */
    boolean updateGroup(AlarmGroup alarmGroup);

    /**
     * 批量删除
     * @param ids
     * @return
     */
    boolean delete(String[] ids);
}
