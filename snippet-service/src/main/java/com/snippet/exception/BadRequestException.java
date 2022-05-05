package com.snippet.exception;

/**
 * Excepción por una petición mal construida, faltan campos, etc. 
 */
public class BadRequestException extends RuntimeException{ // 400
	
	private static final long serialVersionUID = 1L;
	
	public BadRequestException(String detail) {
		super(detail);
	}

}
