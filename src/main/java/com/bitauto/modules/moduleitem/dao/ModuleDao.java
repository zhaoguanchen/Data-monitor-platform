package com.bitauto.modules.moduleitem.dao;

import com.bitauto.modules.item.entity.TableRelation;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
@Mapper
public interface ModuleDao {
    /**
     * 根据项目id获取表id
     * @param id
     * @return
     */
    List<TableRelation> queryTableId(int id);
}
