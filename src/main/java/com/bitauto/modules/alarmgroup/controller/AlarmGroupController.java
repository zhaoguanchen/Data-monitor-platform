package com.bitauto.modules.alarmgroup.controller;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.bitauto.common.utils.PageUtils;
import com.bitauto.common.utils.Query;
import com.bitauto.common.utils.R;
import com.bitauto.modules.alarm.entity.AlarmResult;
import com.bitauto.modules.alarm.service.AlarmService;
import com.bitauto.modules.alarmgroup.entity.AlarmGroup;
import com.bitauto.modules.alarmgroup.entity.Groups;
import com.bitauto.modules.alarmgroup.entity.ModuleId;
import com.bitauto.modules.alarmgroup.service.AlarmGroupService;
import com.bitauto.modules.group.service.GroupService;
import com.bitauto.modules.item.entity.ItemBody;
import com.bitauto.modules.oozie.entity.response.OozieResponse;
import com.bitauto.modules.oozie.service.OozieService;

import com.bitauto.modules.sys.entity.SysUserGroupEntity;
import com.bitauto.modules.sys.service.SysUserGroupService;
import com.bitauto.modules.sys.service.SysUserService;
import com.bitauto.modules.table.entity.ModuleIds;
import com.google.gson.Gson;
import com.yiche.bdc.aurora.entity.user.UserEntity;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("alarmgroup")
public class AlarmGroupController {
    @Autowired
    private GroupService groupService;
    @Autowired
    private AlarmGroupService alarmGroupService;
    @Autowired
    private SysUserService sysUserService;
    @Autowired
    private SysUserGroupService sysUserGroupService;

    @RequestMapping("/queryAllGroupName")
    @ResponseBody
    public Map queryAllGroupName() {
        UserEntity userEntity = (UserEntity) SecurityUtils.getSubject().getPrincipal();
        SysUserGroupEntity sysUserGroupEntity = sysUserGroupService.queryUserGroup(userEntity.getUserId());

        String group = sysUserGroupEntity.getGroups();
        List<Integer> itemIds = null;
        try {
            //根据用户分组获取分组所拥有的项目的id
            itemIds = groupService.queryAlarmGroupRelaitonByGroup(group);
        } catch (Exception e) {
            e.printStackTrace();
            return R.error("用户分组信息异常，请联系管理员");
        }
        Map<String, Object> map = new HashMap();
        //非root用户获取其权限下的项目信息
        if (!userEntity.getUsername().equals("root")) {
            if (itemIds != null && itemIds.size() != 0) {
                map.put("itemIds", itemIds);
                List<AlarmGroup> itemName = alarmGroupService.queryAllParentGroupName(map);
                return R.ok().put("itemName", itemName);
            } else {
                return R.ok().put("itemName", null);
            }
        } else {
            //root用户获取所有的项目信息
            List<AlarmGroup> itemName = alarmGroupService.queryAllParentGroupName(map);
            return R.ok().put("itemName", itemName);
        }
    }

    @RequestMapping("/queryAllGroup")
    @ResponseBody
    public Map queryAllGroup(@RequestParam Map<String, Object> map) {
        Query query = new Query(map);
        Map map1 = alarmGroupService.queryAllByGoup(query);
        List<ItemBody> jobList = (List<ItemBody>) map1.get("list");
        int total = (int) map1.get("total");
        PageUtils pageUtil = new PageUtils(jobList, total, query.getLimit(), query.getPage());
        return R.ok().put("page", pageUtil);
    }

    @RequestMapping("/delete")
    @ResponseBody
    public Map updateStatu(@RequestBody String[] ids) {
        UserEntity userEntity = (UserEntity) SecurityUtils.getSubject().getPrincipal();
        for (String id : ids) {
            //根据id获取报警人详细信息
            AlarmGroup alarmGroup = alarmGroupService.queryGroupById(Integer.parseInt(id));

            UserEntity createUser = sysUserService.queryByUserName(alarmGroup.getCreater());
            if (!"root".equals(userEntity.getUsername())) {

                //获取当前用户组
                SysUserGroupEntity sysUserGroupEntity = sysUserGroupService.queryUserGroup(userEntity.getUserId());
                //获取创建人组
                SysUserGroupEntity sysUserGroupEntity1 = sysUserGroupService.queryUserGroup(createUser.getUserId());

                //判断用户和创建人是否为同一分组，是则允许更改，不是则不允许
                boolean equals = sysUserGroupEntity.getGroups().equals(sysUserGroupEntity1.getGroups());

                if (!equals) {
                    return R.error("您与创建人不在同一分组，您无权限操作");
                }
            }
        }
        boolean b = alarmGroupService.delete(ids);
        if (b) {
            return R.ok();
        } else {
            return R.error("删除信息失败，请联系管理员");
        }
    }

    @RequestMapping("/queryAllGroupName/{parentId}")
    @ResponseBody
    public Map queryAllGroupName(@PathVariable("parentId") int parentId) {
        Map map = new HashMap();
        map.put("itemID", parentId + "");
        Map map1 = alarmGroupService.queryAllByGoup(map);
        List<AlarmGroup> itemBody = (List<AlarmGroup>) map1.get("list");
        return R.ok().put("moduleName", itemBody);
    }

    @RequestMapping("/queryAlarmGroupById/{alarmid}")
    @ResponseBody
    public Map queryItemByItemId(@PathVariable("alarmid") int itemid) {
        AlarmGroup alarmGroup = alarmGroupService.queryGroupById(itemid);
        AlarmGroup alarmGroup1 = alarmGroupService.queryGroupById(alarmGroup.getParentId());
        alarmGroup.setGroupName(alarmGroup1.getName());
        return R.ok().put("alarmGroup", alarmGroup);
    }

    @RequestMapping("/update")
    @ResponseBody
    public Map updateItem(@RequestBody AlarmGroup alarmGroup) {
        UserEntity userEntity = (UserEntity) SecurityUtils.getSubject().getPrincipal();
        //根据项目id获取该项目的创建人
        AlarmGroup alarmGroup1 = alarmGroupService.queryGroupById(alarmGroup.getId());
        if (!"root".equals(userEntity.getUsername())) {

            //根据创建人获取创建人的详细信息
            UserEntity createUser = sysUserService.queryByUserName(alarmGroup1.getCreater());

            //获取当前用户组
            SysUserGroupEntity sysUserGroupEntity = sysUserGroupService.queryUserGroup(userEntity.getUserId());
            //获取创建人组
            SysUserGroupEntity sysUserGroupEntity1 = sysUserGroupService.queryUserGroup(createUser.getUserId());

            //判断用户和创建人是否为同一分组，是则允许更改，不是则不允许
            boolean equals = sysUserGroupEntity.getGroups().equals(sysUserGroupEntity1.getGroups());



            if (equals) {//判断用户和创建人是否为同一分组，是则允许更改，不是则不允许
                boolean b = alarmGroupService.updateGroup(alarmGroup);
                if (b) {
                    return R.ok();
                } else {
                    return R.error("更新信息失败，请联系管理员");
                }
            } else {
                return R.error("您与创建人不在同一分组，您无权限操作");
            }
        } else {
            boolean b = alarmGroupService.updateGroup(alarmGroup);
            if (b) {
                return R.ok();
            } else {
                return R.error("更新信息失败，请联系管理员");
            }
        }
    }

    @RequestMapping("/insert")
    @ResponseBody
    public Map insertItem(@RequestBody AlarmGroup alarmGroup) {
        List<Groups> itemIds = new ArrayList<>();
        ModuleId moduleId = alarmGroup.getModuleId();
        if (!StringUtils.isEmpty(moduleId.getA())) {
            itemIds.add(moduleId.getA());
        }
        if (!StringUtils.isEmpty(moduleId.getA1())) {
            itemIds.add(moduleId.getA1());
        }
        if (!StringUtils.isEmpty(moduleId.getA2())) {
            itemIds.add(moduleId.getA2());
        }
        if (!StringUtils.isEmpty(moduleId.getA3())) {
            itemIds.add(moduleId.getA3());
        }
        if (!StringUtils.isEmpty(moduleId.getA4())) {
            itemIds.add(moduleId.getA4());
        }
        if (!StringUtils.isEmpty(moduleId.getA5())) {
            itemIds.add(moduleId.getA5());
        }
        if (!StringUtils.isEmpty(moduleId.getA6())) {
            itemIds.add(moduleId.getA6());
        }
        if (!StringUtils.isEmpty(moduleId.getA7())) {
            itemIds.add(moduleId.getA7());
        }
        if (!StringUtils.isEmpty(moduleId.getA8())) {
            itemIds.add(moduleId.getA8());
        }
        if (!StringUtils.isEmpty(moduleId.getA9())) {
            itemIds.add(moduleId.getA9());
        }
        if (!StringUtils.isEmpty(moduleId.getA10())) {
            itemIds.add(moduleId.getA10());
        }
        if (!StringUtils.isEmpty(moduleId.getA11())) {
            itemIds.add(moduleId.getA11());
        }
        if (!StringUtils.isEmpty(moduleId.getA12())) {
            itemIds.add(moduleId.getA12());
        }
        if (!StringUtils.isEmpty(moduleId.getA13())) {
            itemIds.add(moduleId.getA13());
        }
        if (!StringUtils.isEmpty(moduleId.getA14())) {
            itemIds.add(moduleId.getA14());
        }
        if (!StringUtils.isEmpty(moduleId.getA15())) {
            itemIds.add(moduleId.getA15());
        }
        if (!StringUtils.isEmpty(moduleId.getA16())) {
            itemIds.add(moduleId.getA16());
        }
        if (!StringUtils.isEmpty(moduleId.getA17())) {
            itemIds.add(moduleId.getA17());
        }
        if (!StringUtils.isEmpty(moduleId.getA18())) {
            itemIds.add(moduleId.getA18());
        }
        if (!StringUtils.isEmpty(moduleId.getA19())) {
            itemIds.add(moduleId.getA19());
        }

        for (Groups groups : itemIds) {
            alarmGroup.setName(groups.getName());
            alarmGroup.setEmail(groups.getEmail());
            alarmGroup.setJobNumber(Integer.parseInt(groups.getJobNumber()));
            boolean b = alarmGroupService.insertGroup(alarmGroup);
            if (!b) {
                return R.error("添加信息失败，请联系管理员");
            }
        }
        return R.ok();
    }
}
