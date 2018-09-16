package com.bitauto.modules.oozie.service;

import com.bitauto.modules.oozie.entity.request.OozieRequest;
import com.bitauto.modules.oozie.entity.response.OozieResponse;

import java.util.List;

public interface OozieService {
    List<OozieResponse> getInfo(String dbName, String tblName);
}
