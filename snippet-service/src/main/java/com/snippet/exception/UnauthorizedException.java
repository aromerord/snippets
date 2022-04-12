package com.snippet.exception;

/**
 * Excepción que se produce si no se tiene derecho a acceder a un recurso por no
 * estar loggeado en la aplicación
 */
public class UnauthorizedException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	private static final String DESCRIPTION = "401 Unauthorized Exception";

	public UnauthorizedException(String detail) {
		super(DESCRIPTION + " - " + detail);
	}

}
