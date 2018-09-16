package com.bitauto.modules.oozie.controller;

import com.bitauto.common.utils.R;
import com.bitauto.modules.oozie.entity.response.OozieResponse;
import com.bitauto.modules.oozie.service.OozieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/yiche/oozie")
public class OozieController {
    @Autowired
    private OozieService oozieService;
    @RequestMapping("/getInfo")
    @ResponseBody
    public R getInfo(String dbName, String tblName){
        List<OozieResponse> info = oozieService.getInfo(dbName, tblName);
        return R.ok().put("message",info);
    }
}
