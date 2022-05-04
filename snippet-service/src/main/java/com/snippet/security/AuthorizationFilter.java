package com.snippet.security;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import com.snippet.constant.SecurityConstant;

import io.jsonwebtoken.Jwts;

/**
 * Una vez autenticado el usuario, otro paso que debe realizarse es comprobar
 * que cada petición que llegue al servidor tenga definido el token en la
 * cabecera de la petición.
 * 
 * Si existe el token, se debe validar para saber si se permite seguir con el
 * proceso de la petición o si debe rechazarse. Para ello se sobreescribe el
 * filtro BasicAuthenticationFilter, que es el encargado de validar los datos
 * del usuario cuando llega una petición de entrada.
 */
public class AuthorizationFilter extends BasicAuthenticationFilter {

	public AuthorizationFilter(AuthenticationManager authenticationManager) {
		super(authenticationManager);
	}

	/*
	 * Método que ejecuta cada vez que se recibe una petición.
	 */
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		
		// Se extrae el token y se comprueba si tiene el prefijo Bearer.
		String header = request.getHeader(SecurityConstant.AUTHORIZATION);
		
		// Si el token no existe o no fue generado por JWT, se termina el procesamiento
		if (header == null || !header.startsWith(SecurityConstant.BEARER)) {
			// y se continua con el flujo de Spring llamando a este método
			chain.doFilter(request, response);
			return;
		}
		
		/* Si el token existe y ha sido generado por la aplicación, se obtienen los
		 datos de autenticación a partir del token*/
		UsernamePasswordAuthenticationToken authenticationToken = getAuthentication(request);
		
		// Se añade al contexto de seguridad y se continua con el flujo
		SecurityContextHolder.getContext().setAuthentication(authenticationToken);
		chain.doFilter(request, response);
	}

	/**
	 * Método que se encarga de recoger el token y obtener el objeto de
	 * autorización.
	 * 
	 * @param request
	 * @return
	 */
	private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
		
		// Se obtiene el token de la request
		String token = request.getHeader(SecurityConstant.AUTHORIZATION);
		
		if (token != null) {
			String user = Jwts.parser().setSigningKey(SecurityConstant.TOKEN_SECRET) // Revisa la key del token
					.parseClaimsJws(token.replace(SecurityConstant.BEARER, ""))
					.getBody().getSubject();
			if (user != null) {
				return new UsernamePasswordAuthenticationToken(user, null, new ArrayList<>());
			}
			return null;
		}
		return null;
	}

}
