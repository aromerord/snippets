package com.snippet.exception;

/**
 * Tras hacer login, excepción que se produce al intentar acciones para las cuales no se tienen permisos.
 */
public class ForbiddenException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	private static final String DESCRIPTION = "403 Forbidden Exception";

	public ForbiddenException(String detail) {
		super(DESCRIPTION + " - " + detail);
	}

}
