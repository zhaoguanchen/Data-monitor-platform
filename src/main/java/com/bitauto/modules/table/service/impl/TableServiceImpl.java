package com.bitauto.modules.table.service.impl;

import com.bitauto.modules.column.entity.ColumnRuler;
import com.bitauto.modules.item.dao.ItemDao;
import com.bitauto.modules.item.entity.ItemBody;

import com.bitauto.modules.table.dao.TableDao;
import com.bitauto.modules.table.entity.ModuleIds;
import com.bitauto.modules.table.entity.TableRuler;
import com.bitauto.modules.table.service.TableService;
import com.yiche.bdc.aurora.entity.user.UserEntity;
import org.apache.commons.lang3.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import com.bitauto.modules.table.em.TableRuleStatusEnum;

import java.util.*;

@Service("tableService")
public class TableServiceImpl implements TableService {
    @Autowired
    private TableDao tableDao;
    @Autowired
    private ItemDao itemDao;
    @Override
    public Map<String, Object> queryAllTRulers(Map<String, Object> map1) {

        Map map=new HashMap();
        boolean checkItemid=map1.get("itemid")!=null&&!StringUtils.isEmpty((String)map1.get("itemid"))&&!"0".equals(map1.get("itemid"));//项目不为空值
        boolean checkModuleid=map1.get("moduleid")!=null&&!StringUtils.isEmpty((String)map1.get("moduleid"))&&!"0".equals(map1.get("moduleid"));//模块不为空值
        //一下是项目查询
        List tableids=new ArrayList<>();
        if(!checkModuleid){
            if(checkItemid){
                //获取项目的id
                String itemName = itemDao.queryItemNameByItemId(Integer.parseInt((String) map1.get("itemid")));
                List<Integer> itemid = itemDao.queryItemIdByItemName(itemName);
                for (Integer id:itemid) {
                    //根据项目的id获取表的id
                    List<String> tableid = itemDao.queryTableId(id);
                    for (String tid:tableid) {
                        tableids.add(tid);
                    }
                }
                map1.put("tableid",tableids);
            }
        }else{
            //获取项目的id
            String moduleName = itemDao.queryItemNameByItemId(Integer.parseInt((String) map1.get("moduleid")));
            List<Integer> itemid = itemDao.queryItemIdByItemName(moduleName);
            for (Integer id:itemid) {
                //根据项目的id获取表的id
                List<String> tableid = itemDao.queryTableId(id);
                for (String tid:tableid) {
                    tableids.add(tid);
                }
            }
            map1.put("tableid",tableids);
        }
//        if(checkItemid||checkModuleid){
//            if(tableids.size()==0){
//                map.put("total",0);
//                map.put("list",null);
//                return map;
//            }
//            map1.put("tableid",tableids);
//        }

//        以上是根据项目查询

        System.out.println(map1);
        List<TableRuler>   list = tableDao.queryAllTRulers(map1);

        for (TableRuler tableRuler:list) {
            List<Integer> itemIds = itemDao.queryItemByTableId(tableRuler.gettId());
            String itemName="";
            for (int itemId:itemIds) {
                String s = itemDao.queryItemNameByItemId(itemId);
                itemName=s+","+itemName;
            }
            tableRuler.setItemName(itemName);
        }
            int total = tableDao.getTotal();
            map.put("total",total);
            map.put("list",list);
        return map;
    }

    @Override
    public int getTotal() {
        return 0;
    }

    @Override
    public boolean updateTRuler(TableRuler tableRuler) {
        tableRuler.setCreate_time(new Date());
        int i = tableDao.updateTRuler(tableRuler);
        if(i>0){
            return true;
        }
        return false;
    }

    @Override
    @Transactional(propagation= Propagation.REQUIRED,isolation = Isolation.READ_COMMITTED)
    public boolean insertTRuler(TableRuler tableRuler) {
//        UserEntity userEntity = (UserEntity) SecurityUtils.getSubject().getPrincipal();
//        tableRuler.setTabowner(userEntity.getUsername());
        int i = tableDao.insertTRuler(tableRuler);
        int i1 = tableDao.queryIncrementID(tableRuler.gettId());
        String number="t"+i1;
        tableDao.updateNumber(number,tableRuler.gettId());
        if(i<=0){
            return false;
        }else{
            return true;
        }
    }

    @Override
    public boolean deleteTRulers(String[] ids) {
        int i1 = itemDao.deleteTableRelation(ids);
        int i = tableDao.deleteTRuler(ids);
        if(i==ids.length){
            return true;
        }
        return false;
    }

    @Override
    public TableRuler queryTRulerById(String id) {
        TableRuler tableRuler = tableDao.queryTRulerById(id);
        //以下是更新项目关系代码
        List<Integer> integers = itemDao.queryItemByTableId(id);
        List<ItemBody> itemBodies=new ArrayList<>();
        for (int itemId:integers
             ) {
            ItemBody itemBody = itemDao.queryItemByItemId(itemId);
            itemBodies.add(itemBody);
        }
        if(itemBodies!=null){
            tableRuler.setItemBodys(itemBodies);
        }
        //以上是更新项目关系代码
        return tableRuler;
    }

    @Override
    public List<TableRuler> queryTRulerBydbNameAndTableName(String table_name, String database_name) {
        List<TableRuler> tableRulers = tableDao.queryTRulerBydbNameAndTableName(table_name, database_name);
        return tableRulers;
    }

    @Override
    public List<String> queryTabOwner() {
        return tableDao.queryTabOwner();
    }

    @Override
    public List<String> queryTabDbName() {
        return tableDao.queryTabDbName();
    }


    @Override
    public void stopTableRule(String tid) {
        tableDao.updateStatus(TableRuleStatusEnum.PARSING.getVal(), tid);
    }

    @Override
    public void startTableRule(String tid) {
        tableDao.updateStatus(TableRuleStatusEnum.RUNNING.getVal(), tid);
    }
}
