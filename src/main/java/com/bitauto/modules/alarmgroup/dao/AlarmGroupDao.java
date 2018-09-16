package com.bitauto.modules.alarmgroup.dao;

import com.bitauto.modules.alarmgroup.entity.AlarmGroup;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
import java.util.Map;
@Mapper
public interface AlarmGroupDao {
    /**
     * 获取所有的组名称
     * @return
     */
    List<AlarmGroup> queryAllParentGroup(Map<String,Object> map);

    /**
     * 根据父类的id获取该组下的所有用户信息
     * @param
     * @return
     */
    List<AlarmGroup> queyrAllByGoup(Map<String,Object> map);

    /**
     * 根据id获取组名称
     * @param id
     * @return
     */
    String queryGroupNameById(int id);

    /**
     * 根据id获取人员信息
     * @param id
     * @return
     */
    AlarmGroup queryGroupById(int id);
    int getTotal(int parentid );
    /**
     * 添加用户信息
     * @param alarmGroup
     * @return
     */
    int insertGroup(AlarmGroup alarmGroup);

    /**
     * 更新用户信息
     * @param alarmGroup
     * @return
     */
    boolean updateGroup(AlarmGroup alarmGroup);

    /**
     * 更改组成员列表状态
     * @param id
     * @return
     */
    boolean updateStatu(String id);
}
