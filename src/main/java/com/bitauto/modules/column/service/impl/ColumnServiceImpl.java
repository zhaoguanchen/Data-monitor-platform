package com.bitauto.modules.column.service.impl;

import com.bitauto.modules.column.dao.ColumnDao;
import com.bitauto.modules.column.em.ColumnRuleStatusEnum;
import com.bitauto.modules.column.entity.ColumnRuler;
import com.bitauto.modules.column.service.ColumnService;
import com.bitauto.modules.item.dao.ItemDao;
import com.bitauto.modules.item.entity.ItemBody;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service("columnService")
public class ColumnServiceImpl implements ColumnService {
    @Autowired
    private ColumnDao columnDao;
    @Autowired
    private ItemDao itemDao;

    @Override
    public Map queryAllCRulers(Map<String, Object> map1) {
        Map map = new HashMap();
        //一下是项目查询
        List<String> tableids = new ArrayList<>();
        boolean checkItemid = map1.get("itemid") != null && !StringUtils.isEmpty((String) map1.get("itemid")) && !"0".equals(map1.get("itemid"));//项目不为空值
        boolean checkModuleid = map1.get("moduleid") != null && !StringUtils.isEmpty((String) map1.get("moduleid")) && !"0".equals(map1.get("moduleid"));//模块不为空值

        if (!checkModuleid) {
            if (checkItemid) {
                //获取项目的id
                String itemName = itemDao.queryItemNameByItemId(Integer.parseInt((String) map1.get("itemid")));
                List<Integer> itemid = itemDao.queryItemIdByItemName(itemName);
                for (Integer id : itemid) {
                    //根据项目的id获取表的id
                    List<String> item = itemDao.queryColumnId(id);
                    for (String tid : item) {
                        tableids.add(tid);
                    }
                }
                map1.put("tableid", tableids);
            }
        } else {
            //获取项目的id
            String moduleName = itemDao.queryItemNameByItemId(Integer.parseInt((String) map1.get("moduleid")));
            List<Integer> itemid = itemDao.queryItemIdByItemName(moduleName);
            for (Integer id : itemid) {
                //根据项目的id获取表的id
                List<String> module = itemDao.queryColumnId(id);
                for (String tid : module) {
                    tableids.add(tid);
                }
            }
            map1.put("tableid", tableids);
        }
//        Set set = new  HashSet();
//        if(item.size()!=0){
//            set.addAll(item);
//        }
//
//        set.addAll(module);
//        tableids.addAll(set);

//        if(checkItemid||checkModuleid){
//            if(tableids.size()==0){
//                map.put("total",0);
//                map.put("list",null);
//            }
//            map1.put("tableid",tableids);
//        }
        //以上是项目查询

        List<ColumnRuler> list = columnDao.queryAllColumentRulers(map1);
        for (ColumnRuler columnRuler : list) {
            List<Integer> itemIds = itemDao.queryItemByColumnId(columnRuler.getCid());
            String itemName = "";
            for (int itemId : itemIds) {
                String s = itemDao.queryItemNameByItemId(itemId);
                itemName = s + "," + itemName;
            }
            columnRuler.setItemName(itemName);
        }

        int total = columnDao.getTotal();
        map.put("total", total);
        map.put("list", list);
        return map;
    }

    @Override
    public List<ColumnRuler> queryCRulerByDbNameAndTblName(String dbName, String tblName) {
        List<ColumnRuler> columnRulers = columnDao.queryCRulerByDbNameAndTblName(dbName, tblName);
        return columnRulers;
    }

    @Override
    public int getTotal() {
        return 0;
    }

    @Override
    public boolean updateCRuler(ColumnRuler columnRuler) {
        columnRuler.setCcreate_time(new Date());
        int i = columnDao.updateCRuler(columnRuler);
        if (i > 0) {
            return true;
        }
        return false;
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.READ_COMMITTED)
    public boolean insertCRuler(ColumnRuler columnRuler) {
//        UserEntity userEntity = (UserEntity) SecurityUtils.getSubject().getPrincipal();
//        columnRuler.setUsername(userEntity.getUsername());
        int i = columnDao.insertCRuler(columnRuler);
        int i1 = columnDao.queryIncrementID(columnRuler.getCid());
        String number = "c" + i1;
        columnDao.updateNumber(number, columnRuler.getCid());
        if (i > 0) {
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteCRulers(String[] ids) {
        itemDao.deleteColumnRelation(ids);
        int i1 = itemDao.deleteColumnRelation(ids);
        System.out.println(i1);
        int i = columnDao.deleteCRuler(ids);
        if (i == ids.length) {
            return true;
        }
        return false;
    }

    @Override
    public ColumnRuler queryCRulerById(String id) {
        ColumnRuler columnRuler = columnDao.queryCRulerById(id);
        //以下是更新项目关系代码
        List<Integer> integers = itemDao.queryItemByColumnId(id);
        List<ItemBody> itemBodies = new ArrayList<>();
        for (int itemId : integers
                ) {
            ItemBody itemBody = itemDao.queryItemByItemId(itemId);
            itemBodies.add(itemBody);
        }
        columnRuler.setItemBodys(itemBodies);
        return columnRuler;
    }

    @Override
    public List<String> queryCOwner() {
        return columnDao.queryCOwner();
    }

    @Override
    public List<String> queryCDbName() {
        return columnDao.queryCDbName();
    }

    public void stopColumnRule(String cid) {
        columnDao.updateStatus(ColumnRuleStatusEnum.PARSING.getVal(), cid);
    }

    public void startColumnRule(String cid) {
        columnDao.updateStatus(ColumnRuleStatusEnum.RUNNING.getVal(), cid);
    }
}
