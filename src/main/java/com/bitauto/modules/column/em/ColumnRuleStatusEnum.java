package com.bitauto.modules.column.em;

/**
 * Created by weiyongxu on 2018/8/1.
 */
public enum ColumnRuleStatusEnum {
    PARSING("1"),

    RUNNING("0");

    private String val;

    private ColumnRuleStatusEnum(String val) {
        this.val = val;
    }

    public String getVal() {
        return val;
    }

    public static ColumnRuleStatusEnum getStatus(String type)
    {
        ColumnRuleStatusEnum[] types = ColumnRuleStatusEnum.values();
        for (ColumnRuleStatusEnum subType : types) {
            if (subType.val.equalsIgnoreCase(type)) {
                return subType;
            }
        }
        return null;
    }
}