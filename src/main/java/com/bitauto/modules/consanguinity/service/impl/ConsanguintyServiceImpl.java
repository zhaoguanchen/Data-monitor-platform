package com.bitauto.modules.consanguinity.service.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.bitauto.common.message.FeedInfo;
import com.bitauto.modules.consanguinity.entity.request.ConsanguintyRequest;
import com.bitauto.modules.consanguinity.entity.response.TableNodeEntity;
import com.bitauto.modules.consanguinity.entity.response.TableNodeRelation;
import com.bitauto.modules.consanguinity.service.ConsanguintyService;
import com.google.gson.Gson;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ConsanguintyServiceImpl implements ConsanguintyService {
    @Override
    public Map getConsanguinty(ConsanguintyRequest consanguintyRequest) {
        String result=null;
        Map map=new HashMap<>();
        try {
            result= FeedInfo.saveDataToInterfaceGet("http://192.168.87.236:8768/lineage/table_lineage.json?qualifiedName=" + consanguintyRequest.getQualifiedName() + "&forwardStep=" + consanguintyRequest.getForwardStep() + "&backward=" + consanguintyRequest.getBackward());
        } catch (IOException e) {
            e.printStackTrace();
        }
        System.out.println(result);
        JSONObject jsonObject = JSONObject.parseObject(result);
        int code = (int) jsonObject.get("code");
        if(code==0){
            List<TableNodeEntity> tableNodeEntityList=new ArrayList<>();
            List<TableNodeRelation> tableNodeRelations=new ArrayList<>();
            Object data1 = jsonObject.get("data");
            System.out.println(JSON.toJSONString(data1));
            JSONObject data = JSONObject.parseObject(JSON.toJSONString(data1));
            Gson gson=new Gson();
            TableNodeEntity tableNodeEntity = gson.fromJson(JSON.toJSONString( data.get("tableNodeEntity")), TableNodeEntity.class);
            map.put("tableNodeEntity",tableNodeEntity);
            //获取表血缘详情
            JSONArray tableNodeList = JSONObject.parseArray(JSON.toJSONString(data.get("tableNodeList")));
            for (int i=0;i<tableNodeList.size();i++
                 ) {
                TableNodeEntity tableNodeEntity1 = gson.fromJson(tableNodeList.get(i).toString(), TableNodeEntity.class);
                tableNodeEntityList.add(tableNodeEntity1);
            }
            map.put("tableNodeEntityList",tableNodeEntityList);
            //获取表血缘关系
            JSONArray tableNodeRelationList = JSONObject.parseArray(JSON.toJSONString( data.get("tableNodeRelationList")));
            for (int i=0;i<tableNodeRelationList.size();i++ ) {
                TableNodeRelation tableNodeRelation = gson.fromJson( tableNodeRelationList.get(i).toString(), TableNodeRelation.class);
                tableNodeRelations.add(tableNodeRelation);
            }
            map.put("tableNodeRelations",tableNodeRelations);
        }else{
            throw new RuntimeException("获取血缘关系数据异常"+result);
        }
        return map;
    }
}
