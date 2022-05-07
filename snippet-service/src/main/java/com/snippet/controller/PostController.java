package com.snippet.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.snippet.dto.PostDto;
import com.snippet.service.PostService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@RestController
@RequestMapping("/posts")
public class PostController {
	
	@Autowired
	private PostService postService;
	
	@ApiOperation(value = "Obtener los últimos posts públicos", response = PostDto.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "La solicitud ha tenido éxito."),
			@ApiResponse(code = 400, message = "El servidor no pudo interpretar la solicitud."),
			@ApiResponse(code = 404, message = "Recurso no encontrado."),
			@ApiResponse(code = 500, message = "Error interno del servidor."), })
	@GetMapping
	public ResponseEntity<List<PostDto>> recentPosts() {
		return new ResponseEntity<>(postService.recentPosts(), HttpStatus.OK);
	}

	@ApiOperation(value = "Obtener todos los posts de un usuario", response = PostDto.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "La solicitud ha tenido éxito."),
			@ApiResponse(code = 400, message = "El servidor no pudo interpretar la solicitud."),
			@ApiResponse(code = 404, message = "Recurso no encontrado."),
			@ApiResponse(code = 500, message = "Error interno del servidor."), })
	@GetMapping("/postsByUser")
	public ResponseEntity<List<PostDto>> findAllPostsByUser() {
		return new ResponseEntity<>(postService.findAllPostsByUser(), HttpStatus.OK);
	}
	
	@ApiOperation(value = "Obtener post por el postId", response = PostDto.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "La solicitud ha tenido éxito."),
			@ApiResponse(code = 400, message = "El servidor no pudo interpretar la solicitud."),
			@ApiResponse(code = 404, message = "Recurso no encontrado."),
			@ApiResponse(code = 500, message = "Error interno del servidor."), })
	@GetMapping("/{postId}")
	public ResponseEntity<PostDto> findPostByPostId(@PathVariable String postId) {
		return new ResponseEntity<>(postService.findPostByPostId(postId), HttpStatus.OK);
	}

	@ApiOperation(value = "Crear post", response = PostDto.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "La solicitud ha tenido éxito."),
			@ApiResponse(code = 400, message = "El servidor no pudo interpretar la solicitud."),
			@ApiResponse(code = 404, message = "Recurso no encontrado."),
			@ApiResponse(code = 500, message = "Error interno del servidor."), })
	@PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<PostDto> savePost(@RequestBody PostDto postDto) {
		return new ResponseEntity<>(postService.savePost(postDto), HttpStatus.CREATED);
	}
	
	@ApiOperation(value = "Actualizar post", response = PostDto.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "La solicitud ha tenido éxito."),
			@ApiResponse(code = 400, message = "El servidor no pudo interpretar la solicitud."),
			@ApiResponse(code = 404, message = "Recurso no encontrado."),
			@ApiResponse(code = 500, message = "Error interno del servidor."), })
	@PutMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<PostDto> updatePost(@RequestBody PostDto postDto) {
		return new ResponseEntity<>(postService.updatePost(postDto), HttpStatus.OK);
	}
	
	@ApiOperation(value = "Eliminar post", response = Void.class)
	@ApiResponses(value = { @ApiResponse(code = 200, message = "La solicitud ha tenido éxito."),
			@ApiResponse(code = 400, message = "El servidor no pudo interpretar la solicitud."),
			@ApiResponse(code = 404, message = "Recurso no encontrado."),
			@ApiResponse(code = 500, message = "Error interno del servidor."), })
	@DeleteMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Void> deletePostById(@PathVariable Long id) {
			postService.deletePostById(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
	


	

}
