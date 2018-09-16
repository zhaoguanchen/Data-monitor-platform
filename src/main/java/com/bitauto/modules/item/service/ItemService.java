
package com.bitauto.modules.item.service;

import com.bitauto.modules.item.entity.ColumnRelation;
import com.bitauto.modules.item.entity.ItemBody;
import com.bitauto.modules.item.entity.TableRelation;

import java.util.List;
import java.util.Map;

public interface ItemService {

    ItemBody queryItemByItemId(int itemId);

    Map<String, Object> queryAllItems(Map<String,Object> map);

    List<Integer> queryItemByTableId(String tid);

    List<ItemBody> queryAllItemName(Map<String,Object> map);

    List<ItemBody> queryAllModuleName(int parentId);

    boolean updateItem(ItemBody itemBody);

    boolean updateStatu(String[] ids);
    boolean insertModuleList(ItemBody itemBody);
    boolean insertTableRelation(TableRelation tableRelation);

    boolean insertColumnRelation(ColumnRelation columnRelation);

    boolean deleteTableRelation(String[] ids);

    boolean deleteColumnRelation(String[] ids);

    List<ItemBody> getAllItemT();

    List<ItemBody> getAllModuleT(int parentid);

    List<ItemBody> getAllItemC();

    List<ItemBody> getAllModuleC(int parentid);


}
