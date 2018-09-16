package com.bitauto.modules.alarm.service;

import com.bitauto.modules.app.entity.UserEntity;
import com.bitauto.modules.column.entity.ColumnRuleBean;
import com.bitauto.modules.table.entity.TableRuleBean;
import com.bitauto.modules.table.entity.TableRuler;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(name= "monitor-data-server")
public interface AlarmService {

    /**
     * 获取所有监测结果的信息
     * @return
     */
    @RequestMapping(value="/resultLog")
    String queryAll(@RequestParam(value = "index") String index, @RequestParam(value = "limit") String limit);

    /**
     * 获取某个表下的所有检测结果
     * @return
     */
    @RequestMapping(value="/resultLog/byTable")
    String queryDetail(@RequestParam(value = "tableName") String tableName, @RequestParam(value = "dataBase") String dataBase, @RequestParam(value = "index") String index, @RequestParam(value = "limit") String limit);

    /**
     * 执行表监控规则
     * @param tableRuleBean
     * @return
     */
    @RequestMapping(value="/run/table")
    String startTRuler(@RequestBody TableRuleBean tableRuleBean);

    @RequestMapping(value="/run/column")
    String startCRuler(@RequestBody ColumnRuleBean columnRuleBean);
}
