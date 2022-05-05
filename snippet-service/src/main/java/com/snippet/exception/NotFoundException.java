package com.snippet.exception;

/**
 * Excepción que se produce por un recurso no encontrado.
 */
public class NotFoundException extends RuntimeException { // 404

	private static final long serialVersionUID = 1L;

	public NotFoundException(String detail) {
		super(detail);
	}

}
