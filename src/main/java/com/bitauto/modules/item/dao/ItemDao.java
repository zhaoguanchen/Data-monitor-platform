package com.bitauto.modules.item.dao;

import com.bitauto.modules.item.entity.ColumnRelation;
import com.bitauto.modules.item.entity.ItemBody;
import com.bitauto.modules.item.entity.TableRelation;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface ItemDao {

    /**
     * 获取所有的项目和模块的信息
     * @param map
     * @return
     */
    List<ItemBody> queryAllItems(Map<String,Object> map);

    /**
     * 获取项目和模块信息的总条数
     * @return
     */
    int getTotal(int parentid);

    /**
     *根据表id获取其所属项目id
     * @param tid
     * @return
     */
    List<Integer> queryItemByTableId(String tid);

    /**
     * 根据项目id获取项目对象id
     * @param itemId
     * @return
     */
    ItemBody queryItemByItemId(int itemId);

    /**
     * 根据字段规则id获取其所属项目id
     * @param cid
     * @return
     */
    List<Integer> queryItemByColumnId(String cid);
    /**
     * 获取所有的项目名称
     * @return
     */
    List<ItemBody> queryAllItemName(Map<String,Object> map);

    /**
     * 根据父类id获取所有的模块名称
     * @return
     */
    List<ItemBody> queryAllModuleName(int parentId);

    /**
     * 添加表规则的项目名和模块名
     * @param tableRelation
     * @return
     */
    int insertTableRelation(TableRelation tableRelation);

    /**
     * 添加字段规则的项目名和模块名
     * @param columnRelation
     * @return
     */
    int insertColumnRelation(ColumnRelation columnRelation);

    /**
     * 添加项目模块
     * @param itemBody
     * @return
     */
    int insertModuleList(ItemBody itemBody);

    /**
     * 批量删除项目关系
     * @param ids
     * @return
     */
    int deleteTableRelation(String[] ids);

    /**
     * 批量删除模块关系
     * @param ids
     * @return
     */
    int deleteColumnRelation(String[] ids);

    /**
     * 根据项目id获取项目名称
     * @param id
     * @return
     */
    String queryItemNameByItemId(int id);

    /**
     * 根据项目名称获项目id
     * @param itemName
     * @return
     */
    List<Integer> queryItemIdByItemName(String itemName);

    List<String>  queryTableId(int id);

    List<String>  queryColumnId(int id);

    /**
     * 更新项目列表
     * @param itemBody
     * @return
     */
    boolean updateItem(ItemBody itemBody);

    /**
     * 更改项目列表状态
     * @param id
     * @return
     */
    boolean updateStatu(int id);

    /**
     * 获取所有表规则里面的项目名称
     * @return
     */
    List<ItemBody> getAllItemT();

    List<ItemBody> getAllModuleT(int parentid);

    List<ItemBody> getAllItemC();

    List<ItemBody> getAllModuleC(int parentid);
}
