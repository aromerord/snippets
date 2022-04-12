package com.snippet.security;

import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.snippet.service.UserService;

@EnableWebSecurity
public class WebSecurity extends WebSecurityConfigurerAdapter {
	
	private UserService userService;
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	public WebSecurity(UserService userService, BCryptPasswordEncoder bCryptPasswordEncoder) {
		this.userService = userService;
		this.bCryptPasswordEncoder = bCryptPasswordEncoder;
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable().authorizeRequests()
		.antMatchers(HttpMethod.POST, "/users").permitAll() // Rutas públicas	
		.anyRequest().authenticated() // El resto requiere autenticación
		.and()
		.addFilter(getAuthenticationFilter()) // Filtro de autenticación
		.addFilter(new AuthorizationFilter(authenticationManager())) // Filtro de autorización
		.sessionManagement()
		// Evita que se creen variables de sesión en el servidor, ya que se usa JWT
		.sessionCreationPolicy(SessionCreationPolicy.STATELESS); 
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userService).passwordEncoder(bCryptPasswordEncoder);
	}
	
	/**
	 * Filtro de autenticación con ruta de login personalizada.
	 * @return filtro con la nueva ruta
	 * @throws Exception
	 */
	public AuthenticationFilter getAuthenticationFilter() throws Exception {
		AuthenticationFilter filter = new AuthenticationFilter(authenticationManager());
		filter.setFilterProcessesUrl("/users/login");
		return filter;
	}
	
	
	
	
}
