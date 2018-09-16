package com.bitauto.modules.item.entity;

import java.io.Serializable;

    public class FileRequest implements Serializable {
        private String appId;
        private String sign;
        private String bucket;
        private String filePath;
        private String fileContent;

        @Override
        public String toString() {
            return "FileRequest{" +
                    "appId='" + appId + '\'' +
                    ", sign='" + sign + '\'' +
                    ", bucket='" + bucket + '\'' +
                    ", filePath='" + filePath + '\'' +
                    ", fileContent='" + fileContent + '\'' +
                    '}';
        }

        public FileRequest() {
        }

        public String getAppId() {

            return appId;
        }

        public void setAppId(String appId) {
            this.appId = appId;
        }

        public String getSign() {
            return sign;
        }

        public void setSign(String sign) {
            this.sign = sign;
        }

        public String getBucket() {
            return bucket;
        }

        public void setBucket(String bucket) {
            this.bucket = bucket;
        }

        public String getFilePath() {
            return filePath;
        }

        public void setFilePath(String filePath) {
            this.filePath = filePath;
        }

//    public String getFileContent() {
//        return fileContent;
//    }
//
//    public void setFileContent(String fileContent) {
//        this.fileContent = fileContent;
//    }


        public String getFileContent() {
            return fileContent;
        }

        public void setFileContent(String fileContent) {
            this.fileContent = fileContent;
        }

        public FileRequest(String appId, String sign, String bucket, String filePath, String fileContent) {

            this.appId = appId;
            this.sign = sign;
            this.bucket = bucket;
            this.filePath = filePath;
            this.fileContent = fileContent;
        }
    }


