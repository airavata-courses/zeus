package com.abharatha.JavaSpringBoot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories("com.abharatha.JavaSpringBoot.dao")
public class JavaSpringBootApplication {

	public static void main(String[] args) {
		SpringApplication.run(JavaSpringBootApplication.class, args);
	}

}
