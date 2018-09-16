package com.bitauto.common.utils;

import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.HttpHost;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpDelete;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.conn.routing.HttpRoute;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.impl.conn.PoolingHttpClientConnectionManager;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * HttpClient工具类<br>
 *
 */
public class HttpClientUtils {

    private static PoolingHttpClientConnectionManager manager = null;
    static {
        manager = new PoolingHttpClientConnectionManager();
        manager.setMaxTotal(1000);
        manager.setDefaultMaxPerRoute(20);
        HttpHost localhost = new HttpHost("localhost", 80);
        manager.setMaxPerRoute(new HttpRoute(localhost), 50);
    }

    public static void main(
            String[] args) {
        try {

            long start = System.currentTimeMillis();
            CloseableHttpClient defaultHttpClient = getPoolingHttpClient();
            CloseableHttpResponse execute = defaultHttpClient.execute(HttpClientUtils.getDefaultGet("http://baidu.com"));
            HttpEntity entity = execute.getEntity();
            System.out.println(EntityUtils.toString(entity));
            System.out.println(System.currentTimeMillis() - start);

        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    /**
     * 从连接池中获得连接 <br>
     *
     * @return
     */
    public static CloseableHttpClient getPoolingHttpClient() {
        return HttpClients.custom().setConnectionManager(manager).setConnectionManagerShared(true).build();
    }

    /**
     * 创建httpclient <br>
     * 2015年10月30日:下午10:27:15<br>
     * <br>
     *
     * @return
     */
    @Deprecated
    public static CloseableHttpClient getDefaultHttpClient() {
        CloseableHttpClient client = HttpClients.createDefault();
        return client;
    }

    /**
     * 生成post方法 <br>
     * 2015年10月30日:下午10:28:15<br>
     * <br>
     *
     * @param url
     * @return
     */
    public static HttpPost getDefaultPost(
            String url) {
        HttpPost post = new HttpPost(url);
        //        RequestConfig requestConfig = RequestConfig.custom().setSocketTimeout(5 * 60 * 1000).setConnectTimeout(5000).build();//设置请求和传输超时时间
        //        post.setConfig(requestConfig);
        return post;
    }

    /**
     * 获取delete方法 <br>
     * 2015年12月11日:下午6:11:50<br>
     * <br>
     *
     * @param url
     * @return
     */
    public static HttpDelete getDefaultDelete(
            String url) {
        return new HttpDelete(url);
    }

    /**
     * get put method <br>
     * 2015年12月11日:下午6:29:22<br>
     * <br>
     *
     * @param url
     * @return
     */
    public static HttpPut getDefaultHttpPut(
            String url) {
        return new HttpPut(url);
    }

    /**
     * 生成get方法 <br>
     * 2015年10月30日:下午10:28:58<br>
     * <br>
     *
     * @param url
     * @return
     */
    public static HttpGet getDefaultGet(
            String url) {
        HttpGet httpGet = new HttpGet(url);
        //        RequestConfig requestConfig = RequestConfig.custom().setSocketTimeout(5 * 60 * 1000).setConnectTimeout(5000).build();//设置请求和传输超时时间
        //        httpGet.setConfig(requestConfig);
        return httpGet;
    }

    /**
     * 执行get方法
     *
     * @param url
     * @param param
     * @return
     * @throws Exception
     */
    public static String get(
            String url) throws Exception {
        CloseableHttpClient client = HttpClientUtils.getPoolingHttpClient();
        try {
            HttpGet httpMethod = HttpClientUtils.getDefaultGet(url);
            HttpResponse response = client.execute(httpMethod);
            return EntityUtils.toString(response.getEntity());
        } finally {
            client.close();
        }

    }


    public static String get(
            String url, Map<String, String> params, Integer socketTimeout, Integer connectTimeout) throws Exception {
        CloseableHttpClient client = HttpClientUtils.getPoolingHttpClient();

        RequestConfig.Builder custom = RequestConfig.custom();
        if(socketTimeout != null) {
            custom.setSocketTimeout(socketTimeout);
        }
        if(connectTimeout != null) {
            custom.setConnectTimeout(connectTimeout);
        }
        RequestConfig requestConfig = custom.build();

        try {
            HttpGet httpMethod = HttpClientUtils.getDefaultGet(url);
            httpMethod.setConfig(requestConfig);
            Set<String> keySet = params.keySet();
            for (String key : keySet) {
                httpMethod.setHeader(key, params.get(key));
            }
            HttpResponse response = client.execute(httpMethod);
            return EntityUtils.toString(response.getEntity());
        } finally {
            client.close();
        }

    }

    /**
     * 执行post方法
     *
     * @param url
     * @param param
     * @return
     * @throws IOException
     * @throws ClientProtocolException
     * @throws Exception
     */
    public static String postWithResponseBody(
            String url,
            Map<String, String> param) throws ClientProtocolException, IOException {
        CloseableHttpClient client = HttpClientUtils.getDefaultHttpClient();
        try {
            HttpPost postMethod = HttpClientUtils.getDefaultPost(url);

            Set<String> keySet = param.keySet();
            List<NameValuePair> params = new ArrayList<NameValuePair>();
            for (String key : keySet) {
                params.add(new BasicNameValuePair(key, param.get(key)));
            }

            postMethod.setEntity(new UrlEncodedFormEntity(params));
            HttpResponse response = client.execute(postMethod);
            return EntityUtils.toString(response.getEntity());
        } finally {
            client.close();
        }
    }

    /**
     * 执行post方法
     *
     * @param url
     * @param param
     * @return
     * @throws IOException
     * @throws Exception
     */
    public static HttpResponse postWithResponse(
            String url,
            Map<String, String> param) throws IOException {
        CloseableHttpClient client = HttpClientUtils.getDefaultHttpClient();
        try {
            HttpPost postMethod = HttpClientUtils.getDefaultPost(url);

            Set<String> keySet = param.keySet();
            List<NameValuePair> params = new ArrayList<NameValuePair>();
            for (String key : keySet) {
                params.add(new BasicNameValuePair(key, param.get(key)));
            }

            postMethod.setEntity(new UrlEncodedFormEntity(params));
            HttpResponse response = client.execute(postMethod);
            return response;
        } finally {
            client.close();
        }
    }

    public static String putWithRaw(
            String url,
            String stringJson, Map<String, String> headers) throws IOException {

        CloseableHttpClient client = HttpClientUtils.getDefaultHttpClient();
        try {
            HttpPut putMethod = HttpClientUtils.getDefaultHttpPut(url);

            //设置header
            putMethod.setHeader("Content-Type", "application/json");
            if (headers != null && headers.size() > 0) {
                for (Map.Entry<String, String> entry : headers.entrySet()) {
                    putMethod.setHeader(entry.getKey(),entry.getValue());
                }
            }
            StringEntity stringEntity = new StringEntity(stringJson, "utf-8");
            putMethod.setEntity(stringEntity);
            HttpResponse response = client.execute(putMethod);
            return EntityUtils.toString(response.getEntity());
        } finally {
            client.close();
        }
    }

    /**
     * 获取返回的Location <br>
     * 2015年10月30日:下午11:07:13<br>
     * <br>
     *
     * @param response
     * @return
     */
    public String getLocation(
            HttpResponse response) {
        Header[] headers = response.getHeaders("Location");
        if (headers == null || headers.length == 0) {
            return "";
        } else {
            return headers[0].getValue();
        }
    }

    /**
     * 获取返回码 <br>
     * 2015年10月30日:下午11:06:57<br>
     * <br>
     *
     * @param response
     * @return
     */
    public static int getStatusCode(
            HttpResponse response) {
        return response.getStatusLine().getStatusCode();
    }
}
