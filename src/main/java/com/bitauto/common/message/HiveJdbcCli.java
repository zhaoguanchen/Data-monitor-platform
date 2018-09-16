package com.bitauto.common.message;

import org.apache.log4j.Logger;

import java.sql.*;

/**
 * Hive的JavaApi
 *
 * 启动hive的远程服务接口命令行执行：hive --service hiveserver >/dev/null 2>/dev/null &
 *
 * @author 吖大哥
 *
 */
public class HiveJdbcCli {
    private static String driverName = "org.apache.hive.jdbc.HiveDriver";
    private static String url = "jdbc:hive2://192.168.15.47:10000/default";
    private static String user = "liuming1";
    private static String password = "";
    private static String sql = "";
    private static ResultSet res;
    private static final Logger log = Logger.getLogger(HiveJdbcCli.class);

    public static void main(String[] args) throws ClassNotFoundException, SQLException {
        int i = showCreateTable("default", "detail_temp");
        System.out.println(i);
    }

    public static int showCreateTable(String dbName,String tableName) throws SQLException, ClassNotFoundException {
        Connection conn=getConn();
        Statement stmt = conn.createStatement();
        sql="show create table "+dbName+"."+tableName;
        System.out.println("Running:" + sql);
        res = stmt.executeQuery(sql);

        int columnCount=0;
        while (res.next()) {
            System.out.println("执行“regular hive query”运行结果:"+res.getString(1));
            String a=res.getString(1);
            columnCount++;
//            int i = a.indexOf(")");
//            if(i>0){
//                break;
//            }


        }
        //            System.out.println("count ------>" + res.getString(1)+columnCount);
        conn.close();
        return columnCount-1;
    }

    private static Connection getConn() throws ClassNotFoundException,
            SQLException {
        Class.forName(driverName);
        Connection conn = DriverManager.getConnection(url, user, password);
        return conn;
    }

}