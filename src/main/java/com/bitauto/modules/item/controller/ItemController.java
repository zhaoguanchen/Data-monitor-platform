package com.bitauto.modules.item.controller;

import com.bitauto.common.utils.PageUtils;
import com.bitauto.common.utils.Query;
import com.bitauto.common.utils.R;
import com.bitauto.modules.group.service.GroupService;
import com.bitauto.modules.item.entity.ItemBody;
import com.bitauto.modules.item.service.ItemService;

import com.bitauto.modules.sys.entity.SysUserGroupEntity;
import com.bitauto.modules.sys.service.SysUserGroupService;
import com.bitauto.modules.sys.service.SysUserService;
import com.bitauto.modules.table.entity.ModuleIds;
import com.bitauto.modules.table.entity.TableRuler;
import com.yiche.bdc.aurora.entity.user.UserEntity;
import org.apache.shiro.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/item")
public class ItemController {
    @Autowired
    private ItemService itemService;
    @Autowired
    private GroupService groupService;
    @Autowired
    private SysUserService sysUserService;
    @Autowired
    private SysUserGroupService sysUserGroupService;

    @RequestMapping("/queryAllItem")
    @ResponseBody
    public Map queryAllItem(@RequestParam Map<String, Object> map) {
        Query query = new Query(map);
        Map map1 = itemService.queryAllItems(query);
        List<ItemBody> jobList = (List<ItemBody>) map1.get("list");
        int total = (int) map1.get("total");
        PageUtils pageUtil = new PageUtils(jobList, total, query.getLimit(), query.getPage());
        return R.ok().put("page", pageUtil);
    }

    @RequestMapping("/queryAllItemName")
    @ResponseBody
    public Map queryAllItemName() {
        UserEntity userEntity = (UserEntity) SecurityUtils.getSubject().getPrincipal();
        SysUserGroupEntity sysUserGroupEntity = sysUserGroupService.queryUserGroup(userEntity.getUserId());
        String group = sysUserGroupEntity.getGroups();
        List<Integer> itemIds = null;
        try {
            //根据用户分组获取分组所拥有的项目的id
            itemIds = groupService.queryGroupItemByGroup(group);
        } catch (Exception e) {
            e.printStackTrace();
            return R.error("用户分组信息异常，请联系管理员");
        }
        Map<String, Object> map = new HashMap();
        //非root用户获取其权限下的项目信息
        if (!userEntity.getUsername().equals("root")) {
            if (itemIds != null && itemIds.size() != 0) {
                map.put("itemIds", itemIds);
                List<ItemBody> itemName = itemService.queryAllItemName(map);
                return R.ok().put("itemName", itemName);
            } else {
                return R.ok().put("itemName", null);
            }
        } else {
            //root用户获取所有的项目信息
            List<ItemBody> itemName = itemService.queryAllItemName(map);
            return R.ok().put("itemName", itemName);
        }


    }

    @RequestMapping("/queryAllModuleName/{parentId}")
    @ResponseBody
    public Map queryAllModuleName(@PathVariable("parentId") int parentId) {
        List<ItemBody> itemBody = itemService.queryAllModuleName(parentId);
        return R.ok().put("moduleName", itemBody);
    }

    @RequestMapping("/queryItemByItemId/{itemid}")
    @ResponseBody
    public Map queryItemByItemId(@PathVariable("itemid") int itemid) {
        ItemBody itemBody = itemService.queryItemByItemId(itemid);
        ItemBody itemBody1 = itemService.queryItemByItemId(itemBody.getParentId());
        itemBody.setItemName(itemBody1.getName());
        return R.ok().put("itemBody", itemBody);
    }

    @RequestMapping("/insert")
    @ResponseBody
    public Map insertItem(@RequestBody ItemBody itemBody) {
        List<String> itemIds = new ArrayList<>();
        ModuleIds moduleId = itemBody.getModuleId();
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
        Set set = new HashSet();
        List<String> newItemIds = new ArrayList();
        set.addAll(itemIds);
        newItemIds.addAll(set);
        for (String name : newItemIds) {
            itemBody.setName(name);
            boolean b = itemService.insertModuleList(itemBody);
            if (!b) {
                return R.error("添加信息失败，请联系管理员");
            }
        }
        return R.ok();
    }

    @RequestMapping("/update")
    @ResponseBody
    public Map updateItem(@RequestBody ItemBody itemBody) {
        UserEntity userEntity = (UserEntity) SecurityUtils.getSubject().getPrincipal();


        if (!"root".equals(userEntity.getUsername())) {

            //获取当前用户组
            SysUserGroupEntity sysUserGroupEntity = sysUserGroupService.queryUserGroup(userEntity.getUserId());
            //根据项目id获取该项目的创建人
            ItemBody itemBody1 = itemService.queryItemByItemId(itemBody.getId());
            //根据创建人获取创建人的信息
            UserEntity createUser = sysUserService.queryByUserName(itemBody1.getCreater());
            //获取创建人组
            SysUserGroupEntity sysUserGroupEntity1 = sysUserGroupService.queryUserGroup(createUser.getUserId());


            if (sysUserGroupEntity.getGroups().equals(sysUserGroupEntity1.getGroups())) {//判断用户和创建人是否为同一分组，是则允许更改，不是则不允许
                boolean b = itemService.updateItem(itemBody);
                if (b) {
                    return R.ok();
                } else {
                    return R.error("更新信息失败，请联系管理员");
                }
            } else {
                return R.error("您与创建人不在同一分组，您无权限操作");
            }
        } else {
            boolean b = itemService.updateItem(itemBody);
            if (b) {
                return R.ok();
            } else {
                return R.error("更新信息失败，请联系管理员");
            }
        }


    }

    @RequestMapping("/delete")
    @ResponseBody
    public Map updateStatu(@RequestBody String[] ids) {
        UserEntity userEntity = (UserEntity) SecurityUtils.getSubject().getPrincipal();
        for (String id : ids) {


            if (!"root".equals(userEntity.getUsername())) {


                //获取当前用户组
                SysUserGroupEntity sysUserGroupEntity = sysUserGroupService.queryUserGroup(userEntity.getUserId());

                //根据项目id获取该项目的创建人
                ItemBody itemBody = itemService.queryItemByItemId(Integer.parseInt(id));

                //根据创建人获取创建人的信息
                UserEntity createUser = sysUserService.queryByUserName(itemBody.getCreater());
                //获取创建人组
                SysUserGroupEntity sysUserGroupEntity1 = sysUserGroupService.queryUserGroup(createUser.getUserId());

                //判断用户和创建人是否为同一分组，是则允许更改，不是则不允许
                boolean equals = sysUserGroupEntity.getGroups().equals(sysUserGroupEntity1.getGroups());
                if (!equals) {
                    return R.error("您与创建人不在同一分组，您无权限操作");
                }
            }
        }
        boolean b = itemService.updateStatu(ids);
        if (b) {
            return R.ok();
        } else {
            return R.error("删除信息失败，请联系管理员");
        }
    }

    @RequestMapping("/getAllItemT")
    @ResponseBody
    public R getAllItemT() {
        List<ItemBody> allItemT = itemService.getAllItemT();
        return R.ok().put("allItemT", allItemT);
    }

    @RequestMapping("/getAllModuleT/{id}")
    @ResponseBody
    public R getAllModuleT(@PathVariable("id") int id) {
        List<ItemBody> allModuleT = itemService.getAllModuleT(id);
        return R.ok().put("allModuleT", allModuleT);
    }

    @RequestMapping("/getAllItemC")
    @ResponseBody
    public R getAllItemC() {
        List<ItemBody> allItemC = itemService.getAllItemC();
        return R.ok().put("allItemC", allItemC);
    }

    @RequestMapping("/getAllModuleC/{id}")
    @ResponseBody
    public R getAllModuleC(@PathVariable("id") int id) {
        List<ItemBody> allModuleC = itemService.getAllModuleC(id);
        return R.ok().put("allModuleC", allModuleC);
    }
}
