package com.bitauto.modules.table.controller;

import com.bitauto.common.utils.PageUtils;
import com.bitauto.common.utils.Query;
import com.bitauto.common.utils.R;
import com.bitauto.modules.alarmGroupManager.entity.AlarmGroupEntity;
import com.bitauto.modules.alarmGroupManager.service.AlarmGroupManagerService;
import com.bitauto.modules.alarmgroup.entity.AlarmGroup;
import com.bitauto.modules.alarmgroup.service.AlarmGroupService;
import com.bitauto.modules.item.entity.TableRelation;
import com.bitauto.modules.item.service.ItemService;
import com.bitauto.modules.sys.entity.SysUserGroupEntity;
import com.bitauto.modules.sys.service.SysUserGroupService;
import com.bitauto.modules.sys.service.SysUserService;
import com.bitauto.modules.table.entity.ItemId;
import com.bitauto.modules.table.entity.ModuleIds;
import com.bitauto.modules.table.entity.TableRuler;
import com.bitauto.modules.table.entity.response.ResultData;
import com.bitauto.modules.table.service.TableService;
import com.yiche.bdc.aurora.entity.user.UserEntity;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/yiche/table")
public class TableController {
    @Autowired
    private TableService tableService;
    @Autowired
    private ItemService itemService;
    @Autowired
    private SysUserService sysUserService;
    @Autowired
    private SysUserGroupService sysUserGroupService;

    @Autowired
    private AlarmGroupService alarmGroupService;

    @Autowired
    private AlarmGroupManagerService alarmGroupManagerService;


    @RequestMapping("/queryAll")
    @ResponseBody
    public Map queryAllTRuler(@RequestParam Map<String, Object> params) {
        Query query = new Query(params);
        Map map = tableService.queryAllTRulers(query);
        List<TableRuler> jobList = (List<TableRuler>) map.get("list");

        List<AlarmGroupEntity> alarmGroupEntityList = alarmGroupManagerService.listByTagname(null);
        HashMap<String, AlarmGroupEntity> alarmUniqueidMap = new HashMap<>();
        for (AlarmGroupEntity alarmGroupEntity : alarmGroupEntityList) {
            alarmUniqueidMap.put(alarmGroupEntity.getUniqueId(), alarmGroupEntity);
        }

        for (int i = 0; i < jobList.size(); i++) {
            if (StringUtils.isNotEmpty(jobList.get(i).getAlarmUniqueid()) &&
                    alarmUniqueidMap.containsKey(jobList.get(i).getAlarmUniqueid())) {
                TableRuler tableRuler = jobList.get(i);
                tableRuler.setAlarmGroupName(alarmUniqueidMap.get(tableRuler.getAlarmUniqueid()).getGroupName());
                jobList.set(i, tableRuler);
            }
        }

        int total = (int) map.get("total");
        PageUtils pageUtil = new PageUtils(jobList, total, query.getLimit(), query.getPage());
        return R.ok().put("page", pageUtil);
    }

    @RequestMapping(value = "/queryAllTRuler", method = {RequestMethod.POST,
            RequestMethod.GET}, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public ResultData queryAllTRulers() {
        Map map = new HashMap();
        Map map1 = tableService.queryAllTRulers(map);
        List<TableRuler> list = (List<TableRuler>) map1.get("list");
        ResultData rd = new ResultData();
        if (list.size() != 0) {
            rd.setCode("1");
            rd.setMsg("SUCCESS");
            rd.setData(list);
        } else {
            rd.setCode("-1");
            rd.setMsg("获取数据异常");
        }
        return rd;
    }

    @RequestMapping("/insert")
    @ResponseBody
    public R insertTRuler(@RequestBody TableRuler tableRuler) {
        ItemId itemId = tableRuler.getItemId();
        ModuleIds moduleId = tableRuler.getModuleId();
        List<String> itemIds = new ArrayList<>();
        if ((itemId.getA10() == null || itemId.getA10() == "") &&
                (itemId.getA11() == null || itemId.getA11() == "") &&
                (itemId.getA12() == null || itemId.getA12() == "") &&
                (itemId.getA13() == null || itemId.getA13() == "") &&
                (itemId.getA14() == null || itemId.getA14() == "") &&
                (itemId.getA15() == null || itemId.getA15() == "") &&
                (itemId.getA16() == null || itemId.getA16() == "") &&
                (itemId.getA17() == null || itemId.getA17() == "") &&
                (itemId.getA18() == null || itemId.getA18() == "") &&
                (itemId.getA19() == null || itemId.getA19() == "")) {
            if (itemId.getA() != null && itemId.getA() != "") {
                itemIds.add(itemId.getA());
            }
            if (itemId.getA1() != null && itemId.getA1() != "") {
                itemIds.add(itemId.getA1());
            }
            if (itemId.getA2() != null && itemId.getA2() != "") {
                itemIds.add(itemId.getA2());
            }
            if (itemId.getA3() != null && itemId.getA3() != "") {
                itemIds.add(itemId.getA3());
            }
            if (itemId.getA4() != null && itemId.getA4() != "") {
                itemIds.add(itemId.getA4());
            }
            if (itemId.getA5() != null && itemId.getA5() != "") {
                itemIds.add(itemId.getA5());
            }
            if (itemId.getA6() != null && itemId.getA6() != "") {
                itemIds.add(itemId.getA6());
            }
            if (itemId.getA7() != null && itemId.getA7() != "") {
                itemIds.add(itemId.getA7());
            }
            if (itemId.getA8() != null && itemId.getA8() != "") {
                itemIds.add(itemId.getA8());
            }
            if (itemId.getA9() != null && itemId.getA9() != "") {
                itemIds.add(itemId.getA9());
            }
        } else {
            if (itemId.getA10() != null && itemId.getA10() != "") {
                itemIds.add(itemId.getA10());
            }
            if (itemId.getA11() != null && itemId.getA11() != "") {
                itemIds.add(itemId.getA11());
            }
            if (itemId.getA12() != null && itemId.getA12() != "") {
                itemIds.add(itemId.getA12());
            }
            if (itemId.getA13() != null && itemId.getA13() != "") {
                itemIds.add(itemId.getA13());
            }
            if (itemId.getA14() != null && itemId.getA14() != "") {
                itemIds.add(itemId.getA14());
            }
            if (itemId.getA15() != null && itemId.getA15() != "") {
                itemIds.add(itemId.getA15());
            }
            if (itemId.getA16() != null && itemId.getA16() != "") {
                itemIds.add(itemId.getA16());
            }
            if (itemId.getA17() != null && itemId.getA17() != "") {
                itemIds.add(itemId.getA17());
            }
            if (itemId.getA18() != null && itemId.getA18() != "") {
                itemIds.add(itemId.getA18());
            }
            if (itemId.getA19() != null && itemId.getA19() != "") {
                itemIds.add(itemId.getA19());
            }
        }

        if ((moduleId.getA10() == null || moduleId.getA10() == "") &&
                (moduleId.getA11() == null || moduleId.getA11() == "") &&
                (moduleId.getA12() == null || moduleId.getA12() == "") &&
                (moduleId.getA13() == null || moduleId.getA13() == "") &&
                (moduleId.getA14() == null || moduleId.getA14() == "") &&
                (moduleId.getA15() == null || moduleId.getA15() == "") &&
                (moduleId.getA16() == null || moduleId.getA16() == "") &&
                (moduleId.getA17() == null || moduleId.getA17() == "") &&
                (moduleId.getA18() == null || moduleId.getA18() == "") &&
                (moduleId.getA19() == null || moduleId.getA19() == "")
                ) {
            if (moduleId.getA() != null && moduleId.getA() != "") {
                itemIds.add(moduleId.getA());
            }
            if (moduleId.getA1() != null && moduleId.getA1() != "") {
                itemIds.add(moduleId.getA1());
            }
            if (moduleId.getA2() != null && moduleId.getA2() != "") {
                itemIds.add(moduleId.getA2());
            }
            if (moduleId.getA3() != null && moduleId.getA3() != "") {
                itemIds.add(moduleId.getA3());
            }
            if (moduleId.getA4() != null && moduleId.getA4() != "") {
                itemIds.add(moduleId.getA4());
            }
            if (moduleId.getA5() != null && moduleId.getA5() != "") {
                itemIds.add(moduleId.getA5());
            }
            if (moduleId.getA6() != null && moduleId.getA6() != "") {
                itemIds.add(moduleId.getA6());
            }
            if (moduleId.getA7() != null && moduleId.getA7() != "") {
                itemIds.add(moduleId.getA7());
            }
            if (moduleId.getA8() != null && moduleId.getA8() != "") {
                itemIds.add(moduleId.getA8());
            }
            if (moduleId.getA9() != null && moduleId.getA9() != "") {
                itemIds.add(moduleId.getA9());
            }
        } else {
            if (moduleId.getA10() != null && moduleId.getA10() != "") {
                itemIds.add(moduleId.getA10());
            }
            if (moduleId.getA11() != null && moduleId.getA11() != "") {
                itemIds.add(moduleId.getA11());
            }
            if (moduleId.getA12() != null && moduleId.getA12() != "") {
                itemIds.add(moduleId.getA12());
            }
            if (moduleId.getA13() != null && moduleId.getA13() != "") {
                itemIds.add(moduleId.getA13());
            }
            if (moduleId.getA14() != null && moduleId.getA14() != "") {
                itemIds.add(moduleId.getA14());
            }
            if (moduleId.getA15() != null && moduleId.getA15() != "") {
                itemIds.add(moduleId.getA15());
            }
            if (moduleId.getA16() != null && moduleId.getA16() != "") {
                itemIds.add(moduleId.getA16());
            }
            if (moduleId.getA17() != null && moduleId.getA17() != "") {
                itemIds.add(moduleId.getA17());
            }
            if (moduleId.getA18() != null && moduleId.getA18() != "") {
                itemIds.add(moduleId.getA18());
            }
            if (moduleId.getA19() != null && moduleId.getA19() != "") {
                itemIds.add(moduleId.getA19());
            }
        }

//        if (monitorType != null) {
//            if ((monitorType.getA4() == null || monitorType.getA4() == "") &&
//                    (monitorType.getA5() == null || monitorType.getA5() == "") &&
//                    (monitorType.getA6() == null || monitorType.getA6() == "") &&
//                    (monitorType.getA7() == null || monitorType.getA7() == "")) {
//                if (monitorType.getA() != null && monitorType.getA() != "") {
//                    monitoryTypes.add(monitorType.getA());
//                }
//                if (monitorType.getA1() != null && monitorType.getA1() != "") {
//                    monitoryTypes.add(monitorType.getA1());
//                }
//                if (monitorType.getA2() != null && monitorType.getA2() != "") {
//                    monitoryTypes.add(monitorType.getA2());
//                }
//                if (monitorType.getA3() != null && monitorType.getA3() != "") {
//                    monitoryTypes.add(monitorType.getA3());
//                }
//            } else {
//                if (monitorType.getA4() != null && monitorType.getA4() != "") {
//                    monitoryTypes.add(monitorType.getA4());
//                }
//                if (monitorType.getA5() != null && monitorType.getA5() != "") {
//                    monitoryTypes.add(monitorType.getA5());
//                }
//                if (monitorType.getA6() != null && monitorType.getA6() != "") {
//                    monitoryTypes.add(monitorType.getA6());
//                }
//                if (monitorType.getA7() != null && monitorType.getA7() != "") {
//                    monitoryTypes.add(monitorType.getA7());
//                }
//            }

//        }
        Set set = new HashSet();
        List<String> newItemIds = new ArrayList();
        set.addAll(itemIds);
        newItemIds.addAll(set);
        String tId = null;
//        List<TableRuler> tableRulers = tableService.queryTRulerBydbNameAndTableName(tableRuler.getTable_name(), tableRuler.getDatabase_name());
//        if (tableRulers.size() != 0) {
//                for (String mon : monitoryTypes) {
//                    tId = UUID.randomUUID().toString().replace("-", "");
////                    tId1 = UUID.randomUUID().toString().replace("-", "");
//                    tableRuler.setMonitor_type(mon);
//                    TableRelation tableRelation = new TableRelation();
//                    for (String itemid : newItemIds) {
////                        List<TableRelation> tableRelations = new ArrayList();
//                        tableRelation.setItemId(Integer.parseInt(itemid));
//                        tableRelation.setTableId(tId);
//                        boolean b1 = itemService.insertTableRelation(tableRelation);
//                        if (!b1) {
//                            return R.error("添加所属项目及模块时异常");
//                        }
//                    }
//                    tableRuler.settId(tId);
//                    boolean b = tableService.insertTRuler(tableRuler);
//                    if (!b) {
//                        return R.error("添加数据失败");
//                    }
//                }
//            return R.ok();
//        } else {
//            for (String mon : monitoryTypes) {
        tId = UUID.randomUUID().toString().replace("-", "");
        tableRuler.settId(tId);

        //获取通知接收人邮箱及微信
        String receiver = "";
        if (tableRuler.getAlarmGroup() != null && tableRuler.getAlarmGroup() != "") {
            Map map = new HashMap();
            map.put("itemID", tableRuler.getAlarmGroup());
            if (null != tableRuler.getAlarmGroup() && !"-1".equals(tableRuler.getAlarmGroup())) {
                Map map1 = alarmGroupService.queryAllByGoup(map);
                List<AlarmGroup> alarmGroups = (List<AlarmGroup>) map1.get("list");
                for (AlarmGroup alarmGroup : alarmGroups
                        ) {
                    receiver = receiver + alarmGroup.getEmail() + "|" + alarmGroup.getJobNumber() + ",";
                }
                tableRuler.setReciever(receiver);
            }
        }
        if (tableRuler.getAlarmman() != null && tableRuler.getAlarmman() != "") {
            if (null != tableRuler.getAlarmman() && "" != tableRuler.getAlarmman()) {
                tableRuler.setReciever(receiver + "," + tableRuler.getAlarmman());
            }
        }
        if ("".equals(receiver)) {
            tableRuler.setReciever(receiver);
        }
        boolean b = tableService.insertTRuler(tableRuler);
        if (!b) {
            return R.error("添加数据失败");
        }
        TableRelation tableRelation = new TableRelation();
        for (String itemid : newItemIds) {
            tableRelation.setItemId(Integer.parseInt(itemid));
            tableRelation.setTableId(tId);
            boolean b1 = itemService.insertTableRelation(tableRelation);
            if (!b1) {
                return R.error("添加所属项目及模块时异常");
            }
        }
//            }
        return R.ok();
//        }
    }

    @RequestMapping("/update")
    @ResponseBody
    public R updateTRuler(@RequestBody TableRuler tableRuler) {

        UserEntity userEntity = (UserEntity) SecurityUtils.getSubject().getPrincipal();


        TableRuler tableRuler1 = tableService.queryTRulerById(tableRuler.gettId());
        //以下是更新表规则项目关系
        ItemId itemId = tableRuler.getItemId();
        ModuleIds moduleId = tableRuler.getModuleId();
        List<String> itemIds = new ArrayList<>();
//            List<String> monitoryTypes = new ArrayList<>();
        if (itemId.getA() != null && itemId.getA() != "") {
            itemIds.add(itemId.getA());
        }
        if (itemId.getA1() != null && itemId.getA1() != "") {
            itemIds.add(itemId.getA1());
        }
        if (itemId.getA2() != null && itemId.getA2() != "") {
            itemIds.add(itemId.getA2());
        }
        if (itemId.getA3() != null && itemId.getA3() != "") {
            itemIds.add(itemId.getA3());
        }
        if (itemId.getA4() != null && itemId.getA4() != "") {
            itemIds.add(itemId.getA4());
        }
        if (itemId.getA5() != null && itemId.getA5() != "") {
            itemIds.add(itemId.getA5());
        }
        if (itemId.getA6() != null && itemId.getA6() != "") {
            itemIds.add(itemId.getA6());
        }
        if (itemId.getA7() != null && itemId.getA7() != "") {
            itemIds.add(itemId.getA7());
        }
        if (itemId.getA8() != null && itemId.getA8() != "") {
            itemIds.add(itemId.getA8());
        }
        if (itemId.getA9() != null && itemId.getA9() != "") {
            itemIds.add(itemId.getA9());
        }

        if (moduleId.getA() != null && moduleId.getA() != "") {
            itemIds.add(moduleId.getA());
        }
        if (moduleId.getA1() != null && moduleId.getA1() != "") {
            itemIds.add(moduleId.getA1());
        }
        if (moduleId.getA2() != null && moduleId.getA2() != "") {
            itemIds.add(moduleId.getA2());
        }
        if (moduleId.getA3() != null && moduleId.getA3() != "") {
            itemIds.add(moduleId.getA3());
        }
        if (moduleId.getA4() != null && moduleId.getA4() != "") {
            itemIds.add(moduleId.getA4());
        }
        if (moduleId.getA5() != null && moduleId.getA5() != "") {
            itemIds.add(moduleId.getA5());
        }
        if (moduleId.getA6() != null && moduleId.getA6() != "") {
            itemIds.add(moduleId.getA6());
        }
        if (moduleId.getA7() != null && moduleId.getA7() != "") {
            itemIds.add(moduleId.getA7());
        }
        if (moduleId.getA8() != null && moduleId.getA8() != "") {
            itemIds.add(moduleId.getA8());
        }
        if (moduleId.getA9() != null && moduleId.getA9() != "") {
            itemIds.add(moduleId.getA9());
        }

        Set set = new HashSet();
        List<String> newItemIds = new ArrayList();
        set.addAll(itemIds);
        newItemIds.addAll(set);

        //获取通知接收人邮箱及微信
        String receiver = "";
        if (tableRuler.getAlarmGroup() != null && tableRuler.getAlarmGroup() != "") {
            Map map = new HashMap();
            map.put("itemID", tableRuler.getAlarmGroup());
            if (null != tableRuler.getAlarmGroup() && !"-1".equals(tableRuler.getAlarmGroup())) {
                Map map1 = alarmGroupService.queryAllByGoup(map);
                List<AlarmGroup> alarmGroups = (List<AlarmGroup>) map1.get("list");
                for (AlarmGroup alarmGroup : alarmGroups
                        ) {
                    receiver = receiver + alarmGroup.getEmail() + "|" + alarmGroup.getJobNumber() + ",";
                }
                tableRuler.setReciever(receiver);
            }
        }
        if (tableRuler.getAlarmman() != null && tableRuler.getAlarmman() != "") {
            if (null != tableRuler.getAlarmman() && "" != tableRuler.getAlarmman()) {
                tableRuler.setReciever(receiver + "," + tableRuler.getAlarmman());
            }
        }
        if ("".equals(receiver)) {
            tableRuler.setReciever(receiver);
        }
        //第一步删除项目关系
        String[] ids = {tableRuler.gettId()};
        if (!"admin".equals(userEntity.getUsername())) {

            SysUserGroupEntity sysUserGroupEntity = sysUserGroupService.queryUserGroup(userEntity.getUserId());
            String sysUserGroup = sysUserGroupEntity.getGroups();

            UserEntity userEntity1 = sysUserService.queryByUserName(tableRuler.getTabowner());
            SysUserGroupEntity sysUserGroupEntity1 = sysUserGroupService.queryUserGroup(userEntity1.getUserId());
            String tableUserGroup = sysUserGroupEntity1.getGroups();
            if (sysUserGroup.equals(tableUserGroup)) {
                try {
                    itemService.deleteTableRelation(ids);
                } catch (Exception e) {
                    e.printStackTrace();
                    return R.error("更新项目及模块时异常,请联系管理员");
                }
                //第二步循环添加项目关系
                TableRelation tableRelation = new TableRelation();
                for (String itemId1 : newItemIds) {
                    tableRelation.setItemId(Integer.parseInt(itemId1));
                    tableRelation.setTableId(tableRuler.gettId());
                    boolean b2 = itemService.insertTableRelation(tableRelation);
                    if (!b2) {
                        return R.error("更新所属项目及模块时异常");
                    }
                }


                //以下是更新表规则内容
                boolean b = tableService.updateTRuler(tableRuler);
                if (b) {
                    return R.ok();
                } else {
                    return R.error("更新数据失败");
                }
            } else {
                return R.error("您与创建人不在同一分组，您无权限操作");
            }
        } else {
            try {
                itemService.deleteTableRelation(ids);
            } catch (Exception e) {
                e.printStackTrace();
                return R.error("更新项目及模块时异常,请联系管理员");
            }

            //第二步循环添加项目关系
            TableRelation tableRelation = new TableRelation();
            for (String itemId1 : newItemIds
                    ) {
                tableRelation.setItemId(Integer.parseInt(itemId1));
                tableRelation.setTableId(tableRuler.gettId());
                boolean b2 = itemService.insertTableRelation(tableRelation);
                if (!b2) {
                    return R.error("更新所属项目及模块时异常");
                }
            }
            //以下是更新表规则内容
            boolean b = tableService.updateTRuler(tableRuler);
            if (b) {
                return R.ok();
            } else {
                return R.error("更新数据失败");
            }
        }

    }

    @RequestMapping("/queryById/{jobId}")
    @ResponseBody
    public R queryTRulerById(@PathVariable("jobId") String jobId) {
        TableRuler tableRuler = tableService.queryTRulerById(jobId);
        return R.ok().put("table", tableRuler);
    }

    @RequestMapping("/delete")
    @ResponseBody
    public R deleteTRulers(@RequestBody String[] ids) {
        UserEntity userEntity = (UserEntity) SecurityUtils.getSubject().getPrincipal();
        for (String id : ids) {
            TableRuler tableRuler = tableService.queryTRulerById(id);
            String username = tableRuler.getTabowner();
            if (!"admin".equals(userEntity.getUsername())) {
                /**
                 * 修改验证方式
                 */

                SysUserGroupEntity sysUserGroupEntity = sysUserGroupService.queryUserGroup(userEntity.getUserId());
                String sysUserGroup = sysUserGroupEntity.getGroups();

                UserEntity userEntity1 = sysUserService.queryByUserName(username);
                SysUserGroupEntity sysUserGroupEntity1 = sysUserGroupService.queryUserGroup(userEntity1.getUserId());
                String tableUserGroup = sysUserGroupEntity1.getGroups();

                boolean equals = sysUserGroup.equals(tableUserGroup);
                if (!equals) {
                    return R.error("您与创建人不在同一分组，您无权限操作");
                }
            }
        }
        boolean b = tableService.deleteTRulers(ids);
        if (b) {
            return R.ok();
        } else {
            return R.error("删除数据失败");
        }
    }

    @RequestMapping("/queryTabOwner")
    @ResponseBody
    public R queryTabOwner() {
        List<String> tabOwner = tableService.queryTabOwner();
        return R.ok().put("tOwner", tabOwner);
    }

    @RequestMapping("/queryTabDbName")
    @ResponseBody
    public R queryTabDbName() {
        List<String> list = tableService.queryTabDbName();
        return R.ok().put("tabDbName", list);
    }


    @RequestMapping("/stop/{tid}")
    @ResponseBody
    public R stopTableRule(@PathVariable("tid") String tid) {
        tableService.stopTableRule(tid);
        return R.ok().put("tid", tid);
    }

    @RequestMapping("/start/{tid}")
    @ResponseBody
    public R startTableRule(@PathVariable("tid") String tid) {
        tableService.startTableRule(tid);
        return R.ok().put("tid", tid);
    }


}
