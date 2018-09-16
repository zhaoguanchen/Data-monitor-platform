package com.bitauto.modules.table.dao;

import com.bitauto.modules.table.entity.TableRuler;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface TableDao {
    /**
     * 根据表规则id获取自增id
     * @param tid
     * @return
     */
    int queryIncrementID(String tid);

    /**
     * 分页获取所有表规则
     * @return
     */
    List<TableRuler> queryAllTRulers(Map<String, Object> map);

    /**
     * 根据表名和数据库名称获取表规则
     * @param table_name
     * @param database_name
     * @return
     */
    List<TableRuler> queryTRulerBydbNameAndTableName(@Param("table_name") String table_name, @Param("database_name") String database_name);

    /**
     * 获取总条数
     * @return
     */
    int getTotal();

    /**
     * 根据id查找字段规则
     * @param id
     * @return
     */
    TableRuler queryTRulerById(String id);

    /**
     * 更新字段规则
     * @param tableRuler
     * @return
     */
    int updateTRuler(TableRuler tableRuler);

    /**
     * 更新表规则的编号
     * @param number
     * @param tid
     * @return
     */
    int updateNumber(@Param("number")String number,@Param("tid")String tid);
    /**
     * 根据id批量删除字段规则
     * @param ids
     * @return
     */
    int deleteTRuler(String[] ids);

    /**
     * 添加字段规则
     * @param tableRuler
     * @return
     */
    int insertTRuler(TableRuler tableRuler);

    /**
     * 获取表规则里面所有的负责人
     * @return
     */
    List<String> queryTabOwner();

    /**
     * 获取表规则里面所有的数据库名称
     * @return
     */
    List<String> queryTabDbName();

    int updateStatus(@Param("status")String status, @Param("tid")String tid);

}
