package com.snippet.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Component
public class ApplicationPropertiesComponent {
	
	@Autowired
	private Environment environment;
	
	/**
	 * Obtiene el tokenSecret del application.properties
	 * @return tokenSecret
	 */
	public String getTokenSecret() {
		return environment.getProperty("tokenSecret");
	}

}
