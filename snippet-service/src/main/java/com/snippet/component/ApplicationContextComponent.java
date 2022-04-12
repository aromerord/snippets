package com.snippet.component;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

@Component
public class ApplicationContextComponent implements ApplicationContextAware {

	private static ApplicationContext CONTEXT;

	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		CONTEXT = applicationContext;
	}

	/**
	 * Método para acceder a cualquier bean de la aplicación (controllers, services, etc) 
	 * desde clases en las que no se puede usar la inyección de dependencias porque no son beans.
	 * 
	 * @param beanName
	 * @return
	 */
	public static Object getBean(String beanName) {
		return CONTEXT.getBean(beanName);
	}
	

}
