package com.snippet.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.snippet.component.ApplicationContextComponent;
import com.snippet.constant.SecurityConstant;
import com.snippet.dto.UserDto;
import com.snippet.service.UserService;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

/**
 * La clase UsernamePasswordAuthenticationFilter proporciona un filtro que va a
 * controlar la autenticación a partir de un usuario y una contraseña. El
 * objetivo es adaptarla al funcionamiento de JWT.
 */
public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter {

	// Clase de Spring Security encargada de gestionar la autenticación
	private AuthenticationManager authenticationManager;

	public AuthenticationFilter(AuthenticationManager authenticationManager) {
		this.authenticationManager = authenticationManager;
	}

	/*
	 * Método que se ejecuta cuando el usuario intenta autenticarse.
	 */
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		try {
			// Se lee de la petición de entrada los datos del nombre de usuario y contraseña.
			UserDto userDto = new ObjectMapper().readValue(request.getInputStream(), UserDto.class);
			
			// Se llama al método authenticate pasando el usuario y contraseña recibida
			return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userDto.getEmail(),
					userDto.getPassword(), new ArrayList<>()));
			
		} catch (IOException io) {
			throw new RuntimeException(io);
		}
	}

	/*
	 * Método que se ejecuta en el caso de que la autenticación resulte exitosa. En
	 * ese momento se genera un token JWT, estableciendo la fecha de expiración, etc
	 */
	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {

		String username = ((User) authResult.getPrincipal()).getUsername(); // email

		String token = Jwts.builder().setSubject(username)  // token
				.setExpiration(new Date(System.currentTimeMillis() + SecurityConstant.EXPIRATION_DATE))
				.signWith(SignatureAlgorithm.HS512, SecurityConstant.TOKEN_SECRET).compact();
		
		// Se añade el token al header de la petición
		response.addHeader(SecurityConstant.HEADER_STRING, SecurityConstant.TOKEN_PREFIX + token);
		
		// Se añade tambien al header el id público del usuario
		UserService userService = (UserService) ApplicationContextComponent.getBean("userServiceImpl");
		UserDto userDto = userService.findUserByEmail(username);
		response.addHeader("UserId", userDto.getUserId());
	}

}
