package com.snippet.exception;

/**
 * Excepción por una cabecera mal formada.
 */
public class MalformedHeaderException extends BadRequestException {
	
	private static final long serialVersionUID = 1L;

	public MalformedHeaderException(String detail) {
		super(detail);
		
	}

}
