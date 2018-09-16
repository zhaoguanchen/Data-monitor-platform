package com.bitauto.modules.consanguinity.service;

import com.bitauto.modules.consanguinity.entity.request.ConsanguintyRequest;

import java.io.IOException;
import java.util.Map;

public interface ConsanguintyService {
    Map getConsanguinty(ConsanguintyRequest consanguintyRequest) throws IOException;
}
