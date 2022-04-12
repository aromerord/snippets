package com.snippet.exception;

/**
 * Excepción que se produce por un recurso no encontrado.
 */
public class NotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	private static final String DESCRIPTION = "404 Not Found Exception";

	public NotFoundException(String detail) {
		super(DESCRIPTION + " - " + detail);
	}

}
