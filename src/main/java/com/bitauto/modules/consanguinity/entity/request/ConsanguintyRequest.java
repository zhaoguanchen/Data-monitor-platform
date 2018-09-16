package com.bitauto.modules.consanguinity.entity.request;

public class ConsanguintyRequest {
    private String qualifiedName;
    private String forwardStep;
    private String backward;

    @Override
    public String toString() {
        return "ConsanguintyRequest{" +
                "qualifiedName='" + qualifiedName + '\'' +
                ", forwardStep='" + forwardStep + '\'' +
                ", backward='" + backward + '\'' +
                '}';
    }

    public String getQualifiedName() {
        return qualifiedName;
    }

    public void setQualifiedName(String qualifiedName) {
        this.qualifiedName = qualifiedName;
    }

    public String getForwardStep() {
        return forwardStep;
    }

    public void setForwardStep(String forwardStep) {
        this.forwardStep = forwardStep;
    }

    public String getBackward() {
        return backward;
    }

    public void setBackward(String backward) {
        this.backward = backward;
    }

    public ConsanguintyRequest() {

    }

    public ConsanguintyRequest(String qualifiedName, String forwardStep, String backward) {

        this.qualifiedName = qualifiedName;
        this.forwardStep = forwardStep;
        this.backward = backward;
    }
}
