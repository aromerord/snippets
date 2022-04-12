package com.snippet.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.snippet.dto.UserDto;
import com.snippet.service.UserService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@RequestMapping("/users")
public class UserController {

	@Autowired
	private UserService userService;

	/**
	 * Obtener usuario logado.
	 * 
	 * @return Usuario obtenido
	 */
	@ApiOperation(value = "Obtener usuario por el id.", response = UserDto.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "La solicitud ha tenido éxito."),
			@ApiResponse(code = 400, message = "El servidor no pudo interpretar la solicitud."),
			@ApiResponse(code = 404, message = "Recurso no encontrado."),
			@ApiResponse(code = 500, message = "Error interno del servidor."), })
	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<UserDto> findUser() {	
		
		/* Con la clase SecurityContextHolder se obtiene el email del contexto de la
		 aplicación una vez se ha logado el usuario */
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String email = authentication.getPrincipal().toString();
		
		return new ResponseEntity<>(userService.findUserByEmail(email), HttpStatus.OK);
	}
	
	/**
	 * Crear usuario
	 * 
	 * @param userDto Objeto con los datos del usuario a crear
	 * @return Objeto con el usuario creado
	 */
	@ApiOperation(value = "Crear usuario.", response = UserDto.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "La solicitud ha tenido éxito."),
			@ApiResponse(code = 400, message = "El servidor no pudo interpretar la solicitud."),
			@ApiResponse(code = 404, message = "Recurso no encontrado."),
			@ApiResponse(code = 500, message = "Error interno del servidor."), })
	@PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<UserDto> saveUser(@RequestBody UserDto userDto) {
		return new ResponseEntity<>(userService.saveUser(userDto), HttpStatus.CREATED);
	}

}
