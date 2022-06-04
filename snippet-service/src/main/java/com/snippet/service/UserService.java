package com.snippet.service;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.snippet.dto.UserDto;

public interface UserService extends UserDetailsService{
	
	/**
	 * Guarda un usuario
	 * @param userDto
	 * @return usuario guardado
	 */
	public UserDto saveUser(UserDto userDto);
	
	/**
	 * Obtener usuario logado. 
	 * @param email
	 * @return usuario obtenido
	 */
	public UserDto findUserByEmail(String email);
	
	/**
	 * Actualizar usuario
	 * @param userDto
	 * @return usuario actualizado
	 */
	public UserDto updateUser(UserDto userDto);

}
