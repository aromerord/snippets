package com.snippet.exception;

/**
 * Excepción que se produce si no se tiene derecho a acceder a un recurso por no
 * estar loggeado en la aplicación
 */
public class UnauthorizedException extends RuntimeException { // 401

	private static final long serialVersionUID = 1L;

	public UnauthorizedException(String detail) {
		super(detail);
	}

}
