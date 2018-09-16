package com.bitauto.modules.column.controller;

import com.bitauto.common.utils.PageUtils;
import com.bitauto.common.utils.Query;
import com.bitauto.common.utils.R;
import com.bitauto.modules.alarmGroupManager.entity.AlarmGroupEntity;
import com.bitauto.modules.alarmGroupManager.service.AlarmGroupManagerService;
import com.bitauto.modules.alarmgroup.entity.AlarmGroup;
import com.bitauto.modules.alarmgroup.service.AlarmGroupService;
import com.bitauto.modules.column.entity.ColumnRuler;
import com.bitauto.modules.column.entity.response.ResultDataDt;
import com.bitauto.modules.column.service.ColumnService;
import com.bitauto.modules.item.entity.ColumnRelation;
import com.bitauto.modules.item.service.ItemService;
import com.bitauto.modules.sys.entity.SysUserGroupEntity;
import com.bitauto.modules.sys.service.SysUserGroupService;
import com.bitauto.modules.sys.service.SysUserService;
import com.bitauto.modules.table.entity.ItemId;
import com.bitauto.modules.table.entity.ModuleIds;
import com.yiche.bdc.aurora.entity.user.UserEntity;
import org.apache.commons.lang.StringUtils;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("yiche/column")
public class ColumnController {
    @Autowired
    private ColumnService columnService;
    @Autowired
    private ItemService itemService;
    @Autowired
    private SysUserService sysUserService;
    @Autowired
    private AlarmGroupService alarmGroupService;
    @Autowired
    private SysUserGroupService sysUserGroupService;

    @Autowired
    private AlarmGroupManagerService alarmGroupManagerService;

    @RequestMapping("/queryAll")
    @ResponseBody
    public Map queryAllTRuler(@RequestParam Map<String, Object> params) {
        Query query = new Query(params);
        Map map = columnService.queryAllCRulers(query);
        List<ColumnRuler> jobList = (List<ColumnRuler>) map.get("list");

        List<AlarmGroupEntity> alarmGroupEntityList = alarmGroupManagerService.listByTagname(null);
        HashMap<String, AlarmGroupEntity> alarmUniqueidMap = new HashMap<>();
        for (AlarmGroupEntity alarmGroupEntity : alarmGroupEntityList) {
            alarmUniqueidMap.put(alarmGroupEntity.getUniqueId(), alarmGroupEntity);
        }

        for (int i = 0; i < jobList.size(); i++) {
            if (StringUtils.isNotEmpty(jobList.get(i).getAlarmUniqueid()) &&
                    alarmUniqueidMap.containsKey(jobList.get(i).getAlarmUniqueid())) {
                ColumnRuler columnRuler = jobList.get(i);
                columnRuler.setAlarmGroupName(alarmUniqueidMap.get(columnRuler.getAlarmUniqueid()).getGroupName());
                jobList.set(i, columnRuler);
            }
        }

        int total = (int) map.get("total");
        PageUtils pageUtil = new PageUtils(jobList, total, query.getLimit(), query.getPage());
        return R.ok().put("page", pageUtil);
    }

    @RequestMapping(value = "/queryAllCRuler", method = {RequestMethod.POST,
            RequestMethod.GET}, produces = "application/json;charset=UTF-8")
    @ResponseBody
    public ResultDataDt queryAllCRuler() {
        Map maps = new HashMap();
        Map map = columnService.queryAllCRulers(maps);
        List<ColumnRuler> jobList = (List<ColumnRuler>) map.get("list");
        ResultDataDt rd = new ResultDataDt();
        if (jobList.size() != 0) {
            rd.setCode("1");
            rd.setMsg("SUCCESS");
            rd.setData(jobList);
        } else {
            rd.setCode("-1");
            rd.setMsg("获取数据异常");
        }
        return rd;
    }

    @RequestMapping("/insert")
    @ResponseBody
    public R insertTRuler(@RequestBody ColumnRuler columnRuler) {
        ItemId itemId = columnRuler.getItemId();
        ModuleIds moduleId = columnRuler.getModuleId();
        List<String> itemIds = new ArrayList<>();

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
        String mId = UUID.randomUUID().toString().replace("-", "");
        columnRuler.setCid(mId);
        //获取通知接收人邮箱及微信
        String receiver = "";
        if (columnRuler.getAlarmGroup() != null && columnRuler.getAlarmGroup() != "") {
            Map map = new HashMap();
            map.put("itemID", columnRuler.getAlarmGroup());
            if (null != columnRuler.getAlarmGroup() && !"-1".equals(columnRuler.getAlarmGroup())) {
                Map map1 = alarmGroupService.queryAllByGoup(map);
                List<AlarmGroup> alarmGroups = (List<AlarmGroup>) map1.get("list");
                for (AlarmGroup alarmGroup : alarmGroups
                        ) {
                    receiver = receiver + alarmGroup.getEmail() + "|" + alarmGroup.getJobNumber() + ",";
                }
                columnRuler.setCreciever(receiver);
            }
        }
        if (columnRuler.getAlarmman() != null && columnRuler.getAlarmman() != "") {
            if (null != columnRuler.getAlarmman() && "" != columnRuler.getAlarmman()) {
                columnRuler.setCreciever(receiver + "," + columnRuler.getAlarmman());
            }
        }
        if ("".equals(receiver)) {
            columnRuler.setCreciever(receiver);
        }
        boolean b = columnService.insertCRuler(columnRuler);
        ColumnRelation columnRelation = new ColumnRelation();
        for (String itemid : newItemIds) {
            columnRelation.setItemId(Integer.parseInt(itemid));
            columnRelation.setColumnId(mId);
            boolean b1 = itemService.insertColumnRelation(columnRelation);
            if (!b1) {
                return R.error("添加所属项目及模块时异常");
            }
        }
        if (!b) {
            return R.error("添加数据失败");
        }

        return R.ok();
    }

    @RequestMapping("/update")
    @ResponseBody
    public R updateTRuler(@RequestBody ColumnRuler columnRuler) {
        //以下是更新表规则项目关系
        ItemId itemId = columnRuler.getItemId();
        ModuleIds moduleId = columnRuler.getModuleId();
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
        if (columnRuler.getAlarmGroup() != null && columnRuler.getAlarmGroup() != "") {
            Map map = new HashMap();
            map.put("itemID", columnRuler.getAlarmGroup());
            if (null != columnRuler.getAlarmGroup() && !"-1".equals(columnRuler.getAlarmGroup())) {
                Map map1 = alarmGroupService.queryAllByGoup(map);
                List<AlarmGroup> alarmGroups = (List<AlarmGroup>) map1.get("list");
                for (AlarmGroup alarmGroup : alarmGroups
                        ) {
                    receiver = receiver + alarmGroup.getEmail() + "|" + alarmGroup.getJobNumber() + ",";
                }
                columnRuler.setCreciever(receiver);
            }
        }
        if (columnRuler.getAlarmman() != null && columnRuler.getAlarmman() != "") {
            if (null != columnRuler.getAlarmman() && "" != columnRuler.getAlarmman()) {
                columnRuler.setCreciever(receiver + "," + columnRuler.getAlarmman());
            }
        }
        if ("".equals(receiver)) {
            columnRuler.setCreciever(receiver);
        }
        //第一步删除项目关系
        String[] ids = {columnRuler.getCid()};
        ColumnRuler columnRuler1 = columnService.queryCRulerById(columnRuler.getCid());
        String username = columnRuler1.getCowner();
        UserEntity userEntity = (UserEntity) SecurityUtils.getSubject().getPrincipal();
        if (!"admin".equals(userEntity.getUsername())) {

            //获取当前用户组
            SysUserGroupEntity sysUserGroupEntity = sysUserGroupService.queryUserGroup(userEntity.getUserId());

            //根据创建人获取创建人的信息
            UserEntity ownerUser = sysUserService.queryByUserName(username);

            //获取创建人组
            SysUserGroupEntity sysUserGroupEntity1 = sysUserGroupService.queryUserGroup(ownerUser.getUserId());

            //判断用户和创建人是否为同一分组，是则允许更改，不是则不允许
            boolean equals = sysUserGroupEntity.getGroups().equals(sysUserGroupEntity1.getGroups());

            if (ownerUser != null && equals) {
                try {
                    itemService.deleteColumnRelation(ids);
                } catch (Exception e) {
                    e.printStackTrace();
                    return R.error("更新项目及模块时异常,请联系管理员");
                }

                //第二步循环添加项目关系
                ColumnRelation columnRelation = new ColumnRelation();
                for (String itemId1 : newItemIds
                        ) {
                    columnRelation.setItemId(Integer.parseInt(itemId1));
                    columnRelation.setColumnId(columnRuler.getCid());
                    boolean b2 = itemService.insertColumnRelation(columnRelation);
                    if (!b2) {
                        return R.error("更新所属项目及模块时异常");
                    }
                }
                //以下是更新表规则内容
                boolean b = columnService.updateCRuler(columnRuler);
                if (b) {
                    return R.ok();
                } else {
                    return R.error("更新数据失败");
                }
            } else {
                return R.error("该数据不属于您，您无权限操作");
            }
        } else {
            try {
                itemService.deleteColumnRelation(ids);
            } catch (Exception e) {
                e.printStackTrace();
                return R.error("更新项目及模块时异常,请联系管理员");
            }

            //第二步循环添加项目关系
            ColumnRelation columnRelation = new ColumnRelation();
            for (String itemId1 : newItemIds
                    ) {
                columnRelation.setItemId(Integer.parseInt(itemId1));
                columnRelation.setColumnId(columnRuler.getCid());
                boolean b2 = itemService.insertColumnRelation(columnRelation);
                if (!b2) {
                    return R.error("更新所属项目及模块时异常");
                }
            }

            //以下是更新表规则内容
            boolean b = columnService.updateCRuler(columnRuler);
            if (b) {
                return R.ok();
            } else {
                return R.error("更新数据失败");
            }
        }


    }

    @RequestMapping("/queryById")
    @ResponseBody
    public R queryTRulerById(String jobId) {
        ColumnRuler columnRuler = columnService.queryCRulerById(jobId);
        if (columnRuler != null) {
            return R.ok().put("column", columnRuler);
        }
        return R.error("未知异常，请联系管理员");
    }

    @RequestMapping("/delete")
    @ResponseBody
    public R deleteTRulers(@RequestBody String[] ids) {
        UserEntity userEntity = (UserEntity) SecurityUtils.getSubject().getPrincipal();
        for (String id : ids) {
            ColumnRuler columnRuler1 = columnService.queryCRulerById(id);
            String username = columnRuler1.getCowner();
            if (!"admin".equals(userEntity.getUsername())) {

                //获取当前用户组
                SysUserGroupEntity sysUserGroupEntity = sysUserGroupService.queryUserGroup(userEntity.getUserId());
                //根据创建人获取创建人的信息
                UserEntity ownerUser = sysUserService.queryByUserName(username);
                //获取创建人组
                SysUserGroupEntity sysUserGroupEntity1 = sysUserGroupService.queryUserGroup(ownerUser.getUserId());
                //判断用户和创建人是否为同一分组，是则允许更改，不是则不允许
                boolean equals = sysUserGroupEntity.getGroups().equals(sysUserGroupEntity1.getGroups());

                if (!equals) {
                    return R.error("部分数据不属于您，您无权限操作");
                }
            }

        }
        boolean b = columnService.deleteCRulers(ids);
        if (b) {
            return R.ok();
        } else {
            return R.error("删除数据失败");
        }
    }

    @RequestMapping("/queryCOwner")
    @ResponseBody
    public R queryCOwner() {
        List<String> tabOwner = columnService.queryCOwner();
        return R.ok().put("cOwner", tabOwner);
    }

    @RequestMapping("/queryCDbName")
    @ResponseBody
    public R queryCDbName() {
        List<String> list = columnService.queryCDbName();
        return R.ok().put("cDbName", list);
    }

    @RequestMapping("/stop/{cid}")
    @ResponseBody
    public R stopTableRule(@PathVariable("cid") String cid) {
        columnService.stopColumnRule(cid);
        return R.ok().put("cid", cid);
    }

    @RequestMapping("/start/{cid}")
    @ResponseBody
    public R startTableRule(@PathVariable("cid") String cid) {
        columnService.startColumnRule(cid);
        return R.ok().put("cid", cid);
    }


}
