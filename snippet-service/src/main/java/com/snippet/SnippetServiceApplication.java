package com.snippet;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class SnippetServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(SnippetServiceApplication.class, args);
	}

}
