package com.snippet.exception;

/**
 * Excepción al dar de alta registros o campos (Por ejemplo un email) que ya existen
 */
public class ConflictException extends BadRequestException {

	private static final long serialVersionUID = 1L;

	private static final String DESCRIPTION = "409 Conflict Exception";

	public ConflictException(String detail) {
		super(DESCRIPTION + " - " + detail);
	}

}
