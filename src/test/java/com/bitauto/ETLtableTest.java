package com.bitauto;

import com.bitauto.modules.ETLtable.response.ETLdbResponse;
import com.bitauto.modules.ETLtable.response.ETLtableResponse;
import com.bitauto.modules.ETLtable.service.ETLtableService;
import com.bitauto.modules.column.dao.ColumnDao;
import com.bitauto.modules.column.entity.ColumnRuler;
import com.bitauto.modules.item.dao.ItemDao;
import com.bitauto.modules.item.entity.ItemBody;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class ETLtableTest {
    @Autowired
    private ETLtableService etLtableService;
    @Autowired
    private ItemDao itemDao;

    @Test
    public void test01() throws SQLException, ClassNotFoundException {
        ETLdbResponse etLdbResponse=new ETLdbResponse();
        etLdbResponse.setDbId("1");
        List<ETLtableResponse> etLtableResponses = etLtableService.queryAllTable(etLdbResponse, 1, 10);
        for (ETLtableResponse etr:etLtableResponses
             ) {
            System.out.println(etr);
        }
    }
    @Test
    public void t(){
        String[] ids={"18d4161fe93340f6bceb1d9128a819cc"};
        int i = itemDao.deleteColumnRelation(ids);
        System.out.println(i);
    }
    @Test
    public void t1(){
        String s = itemDao.queryItemNameByItemId(2);
        System.out.println(s);
    }

    @Test
    public void dd(){
        Map map=new HashMap();
//        List<Integer> itemIds =null;
//        System.out.println(itemIds.size()+"#####");
//        map.put("itemIds",itemIds);
//        System.out.println(itemIds.size()+"#####");
//        System.out.println(map.get("itemIds"));
        List<ItemBody> list = itemDao.queryAllItemName(map);
        for (ItemBody itemBody:list
             ) {
            System.out.println(itemBody);
        }
    }

}
