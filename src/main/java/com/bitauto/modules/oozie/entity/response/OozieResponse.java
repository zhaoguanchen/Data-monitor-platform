package com.bitauto.modules.oozie.entity.response;

import java.io.Serializable;

public class OozieResponse implements Serializable {
    private String jobid;
    private String jobname;
    private String startDate;
    private String endDate;
    private String committer;
    private String quartz;
    private String jobStatus;

    @Override
    public String toString() {
        return "OozieResponse{" +
                "jobid='" + jobid + '\'' +
                ", jobname='" + jobname + '\'' +
                ", startDate='" + startDate + '\'' +
                ", endDate='" + endDate + '\'' +
                ", committer='" + committer + '\'' +
                ", quartz='" + quartz + '\'' +
                ", jobStatus='" + jobStatus + '\'' +
                '}';
    }

    public String getJobid() {
        return jobid;
    }

    public void setJobid(String jobid) {
        this.jobid = jobid;
    }

    public String getJobname() {
        return jobname;
    }

    public void setJobname(String jobname) {
        this.jobname = jobname;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getCommitter() {
        return committer;
    }

    public void setCommitter(String committer) {
        this.committer = committer;
    }

    public String getQuartz() {
        return quartz;
    }

    public void setQuartz(String quartz) {
        this.quartz = quartz;
    }

    public String getJobStatus() {
        return jobStatus;
    }

    public void setJobStatus(String jobStatus) {
        this.jobStatus = jobStatus;
    }

    public OozieResponse() {

    }

    public OozieResponse(String jobid, String jobname, String startDate, String endDate, String committer, String quartz, String jobStatus) {

        this.jobid = jobid;
        this.jobname = jobname;
        this.startDate = startDate;
        this.endDate = endDate;
        this.committer = committer;
        this.quartz = quartz;
        this.jobStatus = jobStatus;
    }
}
