package com.snippet.exception;

/**
 * Tras hacer login, excepción que se produce al intentar acciones para las cuales no se tienen permisos.
 */
public class ForbiddenException extends RuntimeException { // 403

	private static final long serialVersionUID = 1L;

	public ForbiddenException(String detail) {
		super(detail);
	}

}
