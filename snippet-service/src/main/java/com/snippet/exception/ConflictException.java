package com.snippet.exception;

/**
 * Excepción al dar de alta registros o campos (Por ejemplo un email) que ya existen
 */
public class ConflictException extends BadRequestException { // 409

	private static final long serialVersionUID = 1L;

	public ConflictException(String detail) {
		super(detail);
	}

}
