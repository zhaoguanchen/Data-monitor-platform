package com.bitauto.modules.consanguinity.service;

import com.bitauto.common.response.Rs;
import com.bitauto.modules.consanguinity.entity.response.TableLineageVO;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name= "aurora-lineage")
public interface ConsanguintySpringCloudService {
    /**
     * 根据用户名获取该用户权限下的所有库名称
     * @param qualifiedName
     * @return
     */
    @RequestMapping(value="/lineage/table_lineage.json",method = RequestMethod.GET)
    Rs<TableLineageVO> getConsanguinty(@RequestParam(value = "qualifiedName") String qualifiedName, @RequestParam(value = "forwardStep") String forwardStep, @RequestParam(value = "backward") String backward);
}
