package com.bitauto;

import com.yiche.bdc.aurora.entity.user.UserEntity;
import org.apache.commons.lang.builder.ToStringBuilder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.bitauto.common.utils.RedisUtils;


@RunWith(SpringRunner.class)
@SpringBootTest
public class RedisTest {
	@Autowired
	private RedisUtils redisUtils;

	@Test
	public void contextLoads() {
		UserEntity user = new UserEntity();
		user.setEmail("qqq@qq.com");
		redisUtils.set("user", user);

		System.out.println(ToStringBuilder.reflectionToString(redisUtils.get("user", UserEntity.class)));
	}

	@Test
	public void setRedisUtils(){
		String a="qwer";
		String b="q";
		String c="a";

		int i = a.indexOf(b);
		int i1 = a.indexOf(c);
		System.out.println(i);
		System.out.println(i1);
	}

}
