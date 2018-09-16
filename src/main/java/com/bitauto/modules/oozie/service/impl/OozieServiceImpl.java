package com.bitauto.modules.oozie.service.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.bitauto.common.message.FeedInfo;
import com.bitauto.modules.oozie.entity.request.OozieRequest;
import com.bitauto.modules.oozie.entity.response.OozieResponse;
import com.bitauto.modules.oozie.service.OozieService;
import com.google.gson.Gson;
import com.qiniu.util.Json;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
@Service
public class OozieServiceImpl implements OozieService {
    private static final String url="http://yu.yiche.com";
    @Override
    public List<OozieResponse> getInfo(String dbName, String tblName) {
        String result=null;
        try {
             result = FeedInfo.saveDataToInterface(url+"/api/v1/lineage/oozie/info?type=output&hdb="+dbName+"&htable="+tblName);
        } catch (IOException e) {
            e.printStackTrace();
        }
        JSONObject jsonObject = JSONObject.parseObject(result);
        int code = (int) jsonObject.get("code");
        List<OozieResponse> oozieResponses=new ArrayList<>();
        if(code==0){
            Object jobs = jsonObject.get("jobs");
            JSONArray objects = JSONObject.parseArray(JSON.toJSON(jobs).toString());
            for (int i=0;i<objects.size();i++) {
                Gson gson=new Gson();
                OozieResponse oozieResponse = gson.fromJson(objects.get(i).toString(), OozieResponse.class);
                oozieResponses.add(oozieResponse);
            }
        }
        return oozieResponses;
    }
}
