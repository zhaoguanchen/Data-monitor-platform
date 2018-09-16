package com.bitauto.modules.group.dao;

import com.bitauto.modules.group.entity.GroupItem;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
@Mapper
public interface GroupDao {
    /**
     * 根据分组获取分组所对应的项目id
     * @param group
     * @return
     */
    List<Integer> queryGroupItemByGroup(String group);

    /**
     * 根据分组获取该分组下的报警人员信息
     * @param group
     * @return
     */
    List<Integer> queryAlarmGroupRelaitonByGroup(String group);


}
