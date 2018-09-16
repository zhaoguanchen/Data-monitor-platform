package com.bitauto.common.message;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.bitauto.common.requestparma.LoginRequest;
import com.bitauto.modules.item.entity.FileRequest;
import com.bitauto.modules.oozie.entity.request.OozieRequest;
import org.apache.http.HeaderIterator;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BufferedHeader;
import org.apache.http.util.EntityUtils;

import java.io.IOException;
import java.text.ParseException;

public class FeedInfo {
    public static String saveDataToInterface(LoginRequest loginRequest, String url) throws IOException {
        String result = "";
        CloseableHttpClient client = HttpClients.createDefault();
        HttpPost httpPost = new HttpPost(url);
        StringEntity se = null;
        httpPost.addHeader("Accept", "*/*");
        se = new StringEntity((JSON.toJSONString(loginRequest)), ContentType.create("application/json", "UTF-8"));
        httpPost.setEntity(se);
        HttpResponse httpResponse = client.execute(httpPost);
        System.out.println(httpResponse.getStatusLine().getStatusCode());
        result = getResponseStr(httpResponse);
        return  result;
    }

    public static String saveDataToInterface(Object obj,String url) throws IOException {
        String result = "";
        CloseableHttpClient client = HttpClients.createDefault();
        HttpPost httpPost = new HttpPost(url);
        StringEntity se = null;
        httpPost.addHeader("Accept", "*/*");
        se = new StringEntity(JSON.toJSONString(obj),ContentType.create("application/json", "UTF-8"));
        httpPost.setEntity(se);
        HttpResponse httpResponse = client.execute(httpPost);
        System.out.println(httpResponse.getStatusLine().getStatusCode());
        result = getResponseStr(httpResponse);
        return result;
    }

    public static String saveDataToInterface(String url) throws IOException {
        String result = "";
        CloseableHttpClient client=HttpClients.createDefault();
        HttpPost httpPost = new HttpPost(url);
        StringEntity se = null;
        httpPost.addHeader("Accept", "*/*");
        se = new StringEntity((JSON.toJSONString("")), ContentType.create("application/json", "UTF-8"));
        httpPost.setEntity(se);
        HttpResponse httpResponse = client.execute(httpPost);
        System.out.println(httpResponse.getStatusLine().getStatusCode());
        result = getResponseStr(httpResponse);
        return result;
    }

    public static String saveDataToInterfaceGet(String url) throws IOException {
        String result = "";
        CloseableHttpClient client = HttpClients.createDefault();
        HttpGet httpGet=new HttpGet(url);
//        HttpClient client = new DefaultHttpClient();
        HttpResponse httpResponse = client.execute(httpGet);
        System.out.println(httpResponse.getStatusLine().getStatusCode());
        HttpEntity entity = httpResponse.getEntity();
        result=EntityUtils.toString(entity,"UTF-8");
//        result = getResponseStr(httpResponse);
        return result;
    }

    private static String getResponseStr(HttpResponse httpResponse) throws IOException {
        HttpEntity entity = httpResponse.getEntity();
        //
        System.out.println("status:" + httpResponse.getStatusLine());
        System.out.println("headers:");
        HeaderIterator iterator = httpResponse.headerIterator();
        while (iterator.hasNext()) {
            BufferedHeader bh = (BufferedHeader) iterator.next();
            if ("Set-Cookie".equals(bh.getName())) {
                System.out.println("\t name : " + bh.getName() + " val : " + bh.getValue());
                System.out.println("\t" + bh.toString());
            }
        }
        String responseString = "";
        if (entity != null) {
            responseString = EntityUtils.toString(entity);
        }
        return responseString;
    }

    public static void main(String[] args) throws IOException, ParseException {
//        JsonRequest js=new JsonRequest(2,3,0,4,100,3,0);
//        RequestMessage message = URIMessage.getRequestMessage(js);
//        LoginRequest loginRequest=new LoginRequest("liuyangyang","yangairui1314/");
//        String tb="detail_lzo";
//        ETLtbRequest etLtbRequest=new ETLtbRequest("detail_lzo");
//        String url="http://192.168.87.236:8765/api/table/detail?tblName=detail_lzo";
//        String url="http://192.168.87.236:8766/ldap/validate?userName=liuyangyang&password=yangairui1314%2F";
//        String login="http://192.168.87.236:8765/api/login?username="+loginRequest.getUserName()+"&password="+loginRequest.getPassword();
//        String s = FeedInfo.saveDataToInterface(loginRequest,login);
//        FileRequest fileRequest=new FileRequest();
//        fileRequest.setAppId("8bd16ea31d264f");
//        fileRequest.setBucket("user_info");
//        fileRequest.setFilePath("test1");
//        fileRequest.setSign("870b8fdcd978786685a8ea394b45aab580c74b85");
//        fileRequest.setFileContent("data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkJCgsKCA0LCgsODg0PEyAVEyUSEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQoODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wgARCAWgBDgDASIAAhEBAxEB/8QAGgAAAwEBAQEAAAAAAAAAAAAAAAECAwQFBv/EABgBAQEBAQEAAAAAAAAAAAAAAAABAgME/9oADAMBAAIQAxAAAAH2AfPaB0AABCTQouDPPXMzw2yXOXMCaGSxgDEFCAaBoKYAAA0DBFAoYgAaAmrQDABMGgGIGANDAAYmCYAACYwQ2mU5pHUUO4dWKkbQW4qqEwpBQmU86GKgASkAOW" );
//        String s = FeedInfo.saveDataToInterface(fileRequest, "http://daqiao.yiche.com/cos/domain/cos/CreateFile");
        String url="http://192.168.87.236:8766/user/userinfo?domainAccount=";
        String url1="http://192.168.87.236:8766/user/userinfo?domainAccount=liuyangyang";
        OozieRequest request=new OozieRequest("output","da_index","heat_all_weight_z");
        String requests="type="+request.getType()+"&hdb="+request.getHdb()+"&htable="+request.getHtable();
        String url2="http://yu.yiche.com/api/v1/lineage/oozie/info?"+requests;
        String  ur="http://yu.yiche.com/api/v1/lineage/oozie/info?type=output&hdb=bdc_index_dm&htable=index_professional_dm_action_leads_day";
        String s = FeedInfo.saveDataToInterface(url2);
        System.out.println("接口获取的数据"+s);
    }

}
