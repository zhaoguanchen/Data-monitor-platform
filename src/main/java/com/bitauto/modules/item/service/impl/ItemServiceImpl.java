package com.bitauto.modules.item.service.impl;

import com.bitauto.modules.item.entity.ColumnRelation;
import com.bitauto.modules.item.dao.ItemDao;
import com.bitauto.modules.item.entity.ItemBody;
import com.bitauto.modules.item.entity.TableRelation;
import com.bitauto.modules.item.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("itemService")
public class ItemServiceImpl implements ItemService {
    @Autowired
    private ItemDao itemDao;

    @Override
    public ItemBody queryItemByItemId(int itemId) {
        return itemDao.queryItemByItemId(itemId);
    }

    @Override
    public Map<String, Object> queryAllItems(Map<String, Object> map) {
        Map<String,Object> map1=new HashMap<>();
        List<ItemBody> itemBodies = itemDao.queryAllItems(map);
        int itemId=Integer.parseInt((String) map.get("itemID"));
        String itemName = itemDao.queryItemNameByItemId(itemId);
        for (ItemBody itemBody:itemBodies) {
            itemBody.setItemName(itemName);
        }
        int total = itemDao.getTotal(itemId);
        map1.put("total",total);
        map1.put("list",itemBodies);
        return map1;
    }

    @Override
    public List<Integer> queryItemByTableId(String tid) {
        return itemDao.queryItemByTableId(tid);
    }

    @Override
    public List<ItemBody> queryAllItemName(Map<String,Object> map) {
       return itemDao.queryAllItemName(map);
    }

    @Override
    public List<ItemBody> queryAllModuleName(int parentId) {
        return itemDao.queryAllModuleName(parentId);
    }

    @Override
    public boolean updateItem(ItemBody itemBody) {
        return itemDao.updateItem(itemBody);
    }

    @Override
    public boolean updateStatu(String[] ids) {
        for (String id:ids) {
            boolean b = itemDao.updateStatu(Integer.parseInt(id));
            if(!b){
                return false;
            }
        }
       return true;
    }

    @Override
    public boolean insertModuleList(ItemBody itemBody) {
        int i = itemDao.insertModuleList(itemBody);
        if(i>0){
            return true;
        }
        return false;
    }

    @Override
    public boolean insertTableRelation(TableRelation tableRelation) {
        int i = itemDao.insertTableRelation(tableRelation);
        if(i>0){
            return true;
        }
        return false;
    }

    @Override
    public boolean insertColumnRelation(ColumnRelation columnRelation) {
        int i = itemDao.insertColumnRelation(columnRelation);
        if(i>0){
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteTableRelation(String[] ids) {
        itemDao.deleteTableRelation(ids);
        return true;
    }

    @Override
    public boolean deleteColumnRelation(String[] ids) {
         itemDao.deleteColumnRelation(ids);
        return true;
    }

    @Override
    public List<ItemBody> getAllItemT() {
        return itemDao.getAllItemT();
    }

    @Override
    public List<ItemBody> getAllModuleT(int parentid) {
        return itemDao.getAllModuleT(parentid);
    }

    @Override
    public List<ItemBody> getAllItemC() {
        return itemDao.getAllItemC();
    }

    @Override
    public List<ItemBody> getAllModuleC(int parentid) {
        return itemDao.getAllModuleC(parentid);
    }
}
