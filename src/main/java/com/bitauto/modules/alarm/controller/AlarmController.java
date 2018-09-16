package com.bitauto.modules.alarm.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.bitauto.common.utils.PageUtils;
import com.bitauto.common.utils.Query;
import com.bitauto.common.utils.R;
import com.bitauto.modules.alarm.entity.AlarmResult;
import com.bitauto.modules.alarm.service.AlarmService;
import com.bitauto.modules.alarmgroup.service.AlarmGroupService;
import com.bitauto.modules.column.entity.ColumnRuleBean;
import com.bitauto.modules.column.entity.ColumnRuler;
import com.bitauto.modules.column.service.ColumnService;

import com.bitauto.modules.sys.entity.SysUserGroupEntity;
import com.bitauto.modules.sys.service.SysUserGroupService;
import com.bitauto.modules.sys.service.SysUserService;
import com.bitauto.modules.table.entity.TableRuleBean;
import com.bitauto.modules.table.entity.TableRuler;
import com.bitauto.modules.table.service.TableService;
import com.google.gson.Gson;
import com.yiche.bdc.aurora.entity.user.UserEntity;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static com.bitauto.common.utils.ShiroUtils.getUserId;

@RestController
@RequestMapping("yiche/alarm")
public class AlarmController {
    @Autowired
    private AlarmService alarmService;
    @Autowired
    private TableService tableService;
    @Autowired
    private ColumnService columnService;
    @Autowired
    private SysUserService sysUserService;
    @Autowired
    private SysUserGroupService sysUserGroupService;

    @RequestMapping("/queryAll")
    @ResponseBody
    public Map queryAllTRuler(@RequestParam Map<String, Object> params) {
        Query query = new Query(params);
        String result = alarmService.queryAll(query.get("offset").toString(), query.get("limit").toString());
        System.out.println(result);
        JSONObject jsonObject = JSONObject.parseObject(result);
        int count = (int) jsonObject.get("count");
        List<AlarmResult> list = new ArrayList<>();
        if (result != null) {
            JSONArray objects = JSONObject.parseArray(jsonObject.get("list").toString());
            for (int i = 0; i < objects.size(); i++) {
                Gson gson = new Gson();
                AlarmResult alarmResult = gson.fromJson(objects.get(i).toString(), AlarmResult.class);
                String tblName = alarmResult.getTableName();
                String dbName = alarmResult.getDatabaseName();
                //判断返回的数据中是否有空表名和空数据库名
                if (tblName != null && dbName != null) {
                    String s = alarmService.queryDetail(tblName, dbName, "0", "100000");
                    JSONObject jsonObject1 = JSONObject.parseObject(s.toString());
                    JSONArray lists = JSONObject.parseArray(jsonObject1.get("list").toString());
                    String resultCount = null;
                    int successCount = 0;
                    int unSuccessCount = 0;
                    int allCount = (int) jsonObject1.get("count");
                    //循环遍历json集合，通过gson进行实体类映射并放入到list集合中
                    for (int j = 0; j < lists.size(); j++) {
                        AlarmResult alarmResult1 = gson.fromJson(lists.get(j).toString(), AlarmResult.class);
                        String status = alarmResult1.getStatus();
                        if (status.equals("通过")) {
                            successCount++;
                        }
                        if (status.equals("不通过")) {
                            unSuccessCount++;
                        }
                    }
                    resultCount = successCount + "/" + unSuccessCount + "/" + allCount;
                    alarmResult.setResultCount(resultCount);
                }
                list.add(alarmResult);
            }
        }
        PageUtils pageUtil = new PageUtils(list, count, query.getLimit(), query.getPage());
        return R.ok().put("page", pageUtil);
    }


    @RequestMapping("/queryAllByTblName")
    @ResponseBody
    public Map queryAllByTblName(@RequestParam Map<String, Object> params) {
        Query query = new Query(params);
        String result = alarmService.queryDetail(params.get("tableName").toString(), params.get("dbName").toString(), query.get("offset").toString(), query.get("limit").toString());
        JSONObject jsonObject = JSONObject.parseObject(result);
        int count = (int) jsonObject.get("count");
        List<AlarmResult> list = new ArrayList<>();
        //循环遍历json集合，通过gson进行实体类映射并放入到list集合中
        if (result != null) {
            JSONArray objects = JSONObject.parseArray(jsonObject.get("list").toString());
            for (int i = 0; i < objects.size(); i++) {
                Gson gson = new Gson();
                AlarmResult alarmResult = gson.fromJson(objects.get(i).toString(), AlarmResult.class);
                list.add(alarmResult);
            }
        }
        PageUtils pageUtil = new PageUtils(list, count, query.getLimit(), query.getPage());
        return R.ok().put("page", pageUtil);
    }

    @RequestMapping("/startTRuler/{jobId}")
    @ResponseBody
    public R startTRuler(@PathVariable("jobId") String jobId) {


        UserEntity userEntity = (UserEntity) SecurityUtils.getSubject().getPrincipal();
        SysUserGroupEntity sysUserGroupEntity = sysUserGroupService.queryUserGroup(userEntity.getUserId());
        String sysUserGroup =sysUserGroupEntity.getGroups() ;

        TableRuler tableRuler = tableService.queryTRulerById(jobId);
        UserEntity userEntity1 =sysUserService.queryByUserName(tableRuler.getTabowner());
        SysUserGroupEntity sysUserGroupEntity1= sysUserGroupService.queryUserGroup(userEntity1.getUserId());
        String tableUserGroup  = sysUserGroupEntity1.getGroups();
        boolean checkGroup = !tableUserGroup.equals(sysUserGroup);



        if (checkGroup) {
            return R.ok().put("message", "您与负责人不在同一分组，您无权执行任务");
        } else {

            TableRuleBean tableRuleBean = new TableRuleBean(tableRuler.getId(), tableRuler.gettId(), tableRuler.getMonitor_type(), tableRuler.getTabcondition(), tableRuler.getTable_name(),
                    tableRuler.getDatabase_name(), tableRuler.getH_compare(), tableRuler.getT_compare(), tableRuler.getSelf(), tableRuler.getSeven_wave_avg(), tableRuler.getAlarm_type(),
                    tableRuler.getRemark(), tableRuler.getTabowner(), tableRuler.getContent(), tableRuler.getReciever(), tableRuler.getCreate_time(), tableRuler.getMonitor_time(),
                    tableRuler.getUsername(), "0", Integer.parseInt(tableRuler.getCreate_partition_time()), "", tableRuler.getContent(), tableRuler.getNumber(), tableRuler.getPartition_type());
           System.out.println(tableRuleBean.getDatabaseName());
           String S = "SSSS";
//tableRuleBean.setCreateTime(null);
           System.out.println(tableRuleBean.getCreateTime());
            String s = alarmService.startTRuler(tableRuleBean);

//            String s = alarmService.startTRuler(tableRuleBean);
            JSONObject jsonObject = JSONObject.parseObject(s);
            Object status = jsonObject.get("status");
            if ("success".equals(status)) {
                String message = (String) jsonObject.get("message");
                return R.ok().put("message", message);
            } else {
                return R.ok().put("result", "执行规则异常，请联系管理员");
            }
        }
    }

    @RequestMapping("/startCRuler/{jobId}")
    @ResponseBody
    public R startCRuler(@PathVariable("jobId") String jobId) {




        UserEntity userEntity = (UserEntity) SecurityUtils.getSubject().getPrincipal();
        SysUserGroupEntity sysUserGroupEntity = sysUserGroupService.queryUserGroup(userEntity.getUserId());
        String sysUserGroup =sysUserGroupEntity.getGroups() ;

        ColumnRuler columnRuler = columnService.queryCRulerById(jobId);
        UserEntity userEntity1 =sysUserService.queryByUserName(columnRuler.getCowner());
        SysUserGroupEntity sysUserGroupEntity1= sysUserGroupService.queryUserGroup(userEntity1.getUserId());
        String columnUserGroup  = sysUserGroupEntity1.getGroups();
        boolean checkGroup = !columnUserGroup.equals(sysUserGroup);


        if (checkGroup) {
            return R.ok().put("message", "您与负责人不在同一分组，您无权执行任务");
        } else {
            ColumnRuleBean columnRuleBean = new ColumnRuleBean(Integer.parseInt(columnRuler.getId()), columnRuler.getCid(), columnRuler.getCmonitor_type(), columnRuler.getCcondition(), columnRuler.getCtable_name(),
                    columnRuler.getColumn_name(), columnRuler.getCdatabase_name(), columnRuler.getCalculate_type(), columnRuler.getDeviation(), columnRuler.getCh_compare(), columnRuler.getCt_compare(),
                    columnRuler.getCself(), columnRuler.getCremark(), columnRuler.getCowner(), columnRuler.getCcontent(), columnRuler.getCreciever(), columnRuler.getCcreate_time(),
                    columnRuler.getCount_type(), columnRuler.getAggregate_function(), columnRuler.getDay_increment(), columnRuler.getCalarm_type(), columnRuler.getUsername(),
                    "0", Integer.parseInt(columnRuler.getCreate_partition_time()), columnRuler.getNumber(), columnRuler.getPartition_type());
            String s = alarmService.startCRuler(columnRuleBean);
            JSONObject jsonObject = JSONObject.parseObject(s);
            Object status = jsonObject.get("status");
            if ("success".equals(status)) {
                String message = (String) jsonObject.get("message");
                return R.ok().put("message", message);
            } else {
                return R.ok().put("result", "执行规则异常，请联系管理员");
            }
        }

    }
}