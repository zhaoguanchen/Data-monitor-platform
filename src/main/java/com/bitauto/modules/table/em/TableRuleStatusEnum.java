package com.bitauto.modules.table.em;

/**
 * Created by weiyongxu on 2018/8/1.
 */
public enum TableRuleStatusEnum {
    PARSING("1"),

    RUNNING("0");

    private String val;

    private TableRuleStatusEnum(String val) {
        this.val = val;
    }

    public String getVal() {
        return val;
    }

    public static TableRuleStatusEnum getStatus(String type)
    {
        TableRuleStatusEnum[] types = TableRuleStatusEnum.values();
        for (TableRuleStatusEnum subType : types) {
            if (subType.val.equalsIgnoreCase(type)) {
                return subType;
            }
        }
        return null;
    }

}