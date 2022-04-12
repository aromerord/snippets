package com.snippet.exception;

/**
 * Excepción que se produce por pasar parámetros de forma incorrecta. 
 */
public class FieldInvalidException extends BadRequestException{
	
private static final long serialVersionUID = 1L;
	
	private static final String DESCRIPTION = "El campo pasado por parámetro viene vacío o es incorrecto.";
	
	public FieldInvalidException(String detail) {
		super(DESCRIPTION + " - " + detail);
	}
}
