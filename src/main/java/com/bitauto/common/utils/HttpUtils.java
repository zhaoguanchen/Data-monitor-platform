package com.bitauto.common.utils;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;

/**
 * Created by weiyongxu on 2018/8/14.
 */
public class HttpUtils {
    public static String httpPostWithJSON(String url, String json)
            throws Exception {

        HttpPost httpPost = new HttpPost(url);
        HttpClient client = new DefaultHttpClient();
        String respContent = null;

        // json方式
        StringEntity entity = new StringEntity(json.toString(), "utf-8");// 解决中文乱码问题
        entity.setContentEncoding("UTF-8");
        entity.setContentType("application/json");
        httpPost.setEntity(entity);

        HttpResponse resp = client.execute(httpPost);
        if (resp.getStatusLine().getStatusCode() == 200) {
            HttpEntity he = resp.getEntity();
            respContent = EntityUtils.toString(he, "UTF-8");
        }
        return respContent;
    }

    public static String httpPutWithJSON(String url, String json)
            throws Exception {

        HttpPut httpPut = new HttpPut(url);
        HttpClient client = new DefaultHttpClient();
        String respContent = null;

        // json方式
        StringEntity entity = new StringEntity(json.toString(), "utf-8");// 解决中文乱码问题
        entity.setContentEncoding("UTF-8");
        entity.setContentType("application/json");
        httpPut.setEntity(entity);

        HttpResponse resp = client.execute(httpPut);
        if (resp.getStatusLine().getStatusCode() == 200) {
            HttpEntity he = resp.getEntity();
            respContent = EntityUtils.toString(he, "UTF-8");
        }
        return respContent;
    }

}
