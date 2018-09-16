package com.bitauto.modules.consanguinity.controller;

import com.bitauto.common.response.Rs;
import com.bitauto.common.utils.R;
import com.bitauto.modules.consanguinity.entity.request.ConsanguintyRequest;
import com.bitauto.modules.consanguinity.entity.response.TableLineageVO;
import com.bitauto.modules.consanguinity.entity.response.TableNodeEntity;
import com.bitauto.modules.consanguinity.entity.response.TableNodeRelation;
import com.bitauto.modules.consanguinity.service.ConsanguintySpringCloudService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/consanguinty")
public class ConsanguintyController {
    @Autowired
    private ConsanguintySpringCloudService consanguintySpringCloudService;
    @RequestMapping("/getConsanguinty")
    @ResponseBody
    public R getConsanguinty(ConsanguintyRequest consanguinty){
        Rs<TableLineageVO> consanguinty1 = consanguintySpringCloudService.getConsanguinty(consanguinty.getQualifiedName(), consanguinty.getForwardStep(), consanguinty.getBackward());
        if(consanguinty1.getCode()==0){
            TableLineageVO tableLineageVO=consanguinty1.getData();
            return R.ok().put("consanguinty",tableLineageVO);
        }
        if(consanguinty1.getCode()==-2000){
            return  R.error("该表不存在血缘关系");
        }
        if(consanguinty1.getCode()==-1000){
            return  R.error("该表不存在");
        }
        if(consanguinty1.getCode()==401){
            return  R.error("token invalid");
        }
        if(consanguinty1.getCode()==-1001){
            return  R.error("Saved ask not exists");
        }
        if(consanguinty1.getCode()==-1002){
            return  R.error("Download file not exists");
        }
        if(consanguinty1.getCode()==-1003){
            return  R.error("Copy hdfs file to local fail");
        }
        if(consanguinty1.getCode()==-1004){
            return  R.error("Merge file error");
        }
        if(consanguinty1.getCode()==-1005){
            return  R.error("Download Hdfs path not existsr");
        }
        if(consanguinty1.getCode()==-1006){
            return  R.error("Exceeded maximum number of running tasks");
        }
        if(consanguinty1.getCode()==-1007){
            return  R.error("查找用户列表异常，可能是用户列表接口故障，请联系管理员处理。");
        }
        if(consanguinty1.getCode()==-1000){
            return  R.error("Task result not exists");
        }
        return R.error("获取表血缘关系异常，请联系管理员");
    }

    /**
     * 根据数据库名称和表名称获取该表下的所有的下级表名称
     * @param dbName
     * @param tblName
     * @return
     */
    @RequestMapping("/getNextConsanguinty")
    @ResponseBody
    public R getNextConsanguinty(@RequestParam("dbName")String dbName, @RequestParam("tblName")String tblName){
        Rs<TableLineageVO> consanguinty = consanguintySpringCloudService.getConsanguinty(dbName + "." + tblName, "-1", "-1");
        TableLineageVO data = consanguinty.getData();
        List<TableNodeRelation> tableNodeRelationList = data.getTableNodeRelationList();
        List<TableNodeEntity> tableNodeList = data.getTableNodeList();
        List<String> qualifiedNames=new ArrayList<>();
        for (TableNodeRelation tblNodeRelatin:tableNodeRelationList) {
            int nextTableNodeId = tblNodeRelatin.getNextTableNodeId();
            for (TableNodeEntity tblNodeEntity:tableNodeList){
                int tableNodeId = tblNodeEntity.getTableNodeId();
                if(nextTableNodeId==tableNodeId){
                    String qualifiedName = tblNodeEntity.getQualifiedName();
                    qualifiedNames.add(qualifiedName);
                    break;
                }
            }
        }
        return R.ok().put("qualifiedNames",qualifiedNames);
    }
}
