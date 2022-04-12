package com.snippet.exception;

/**
 * Excepción por una petición mal construida, faltan campos, etc. 
 */
public class BadRequestException extends RuntimeException{
	
	private static final long serialVersionUID = 1L;
	
	private static final String DESCRIPTION = "400 Bad Request Exception";
	
	public BadRequestException(String detail) {
		super(DESCRIPTION + " - " + detail);
	}

}
