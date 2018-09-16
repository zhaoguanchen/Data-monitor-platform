package com.bitauto.modules.column.dao;

import com.bitauto.modules.column.entity.ColumnRuler;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface ColumnDao {
    /**
     * 根据字段规则id获取其自增id
     * @param cid
     * @return
     */
    int queryIncrementID(String cid);
    /**
     * 获取所有字段规则
     * @return
     */
    List<ColumnRuler> queryAllColumentRulers(Map<String, Object> map);

    /**
     * 获取总条数
     * @return
     */
    int getTotal();
    /**
     * 根据表名和库名查找字段规则
     * @param database
     * @param table_name
     * @return
     */
    List<ColumnRuler> queryAllRulers(@Param("database") String database, @Param("table_name") String table_name);

    /**
     * 根据id查找字段规则
     * @param id
     * @return
     */
    ColumnRuler queryCRulerById(String id);

    /**
     * 更新字段规则
     * @param columnRuler
     * @return
     */
    int updateCRuler(ColumnRuler columnRuler);

    /**
     * 根据字段规则表id更新其编号
     * @param number
     * @param cid
     * @return
     */
    int updateNumber(@Param("number")String number,@Param("cid")String cid);
    /**
     * 根据id批量删除字段规则
     * @param ids
     * @return
     */
    int deleteCRuler(String[] ids);

    /**
     * 添加字段规则
     * @param columnRuler
     * @return
     */
    int insertCRuler(ColumnRuler columnRuler);

    /**
     * 根据数据库名和表名获取字段规则
     * @param dbName
     * @param tblName
     * @return
     */
    List<ColumnRuler> queryCRulerByDbNameAndTblName(@Param("dbName") String dbName, @Param("tblName") String tblName);

    /**
     * 获取字段规则里面所有的负责人
     * @return
     */
    List<String> queryCOwner();

    /**
     * 获取字段规则里面所有的数据库名称
     * @return
     */
    List<String> queryCDbName();

    int updateStatus(@Param("status")String status, @Param("cid")String cid);
}
