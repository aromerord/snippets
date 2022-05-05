package com.snippet.exception;

/**
 * Excepción que se produce por pasar parámetros de forma incorrecta. 
 */
public class FieldInvalidException extends BadRequestException{
	
private static final long serialVersionUID = 1L;
	
	public FieldInvalidException(String detail) {
		super(detail);
	}
}
