package com.snippet.service;

import java.util.List;

import com.snippet.dto.PostDto;

public interface PostService {
	
	/**
	 * Lista de posts públicos
	 * @return Lista de posts públicos
	 */
	public List<PostDto> findAllPosts();
	
	/**
	 * Lista de posts del usuario
	 * 
	 * @return Lista de posts
	 */
	public List<PostDto> findAllPostsByUser();
	
	/**
	 * Últimos posts
	 * @return Lista de últimos posts
	 */
	public List<PostDto> recentPosts(); 
	
	/**
	 * Obtener post por el postId
	 * @param postId
	 * @return
	 */
	public PostDto findPostByPostId(String postId);
	
	/**
	 * Guardar post.
	 *
	 * @param Post post a guardar
	 * @return post guardado
	 */
	public PostDto savePost(PostDto post);
	
	/**
	 * Actualizar post.
	 *
	 * @param Post post a actualizar
	 * @return post actualizado
	 */
	public PostDto updatePost(PostDto post);
	
	/**
	 * Eliminar post.
	 *
	 * @param id del post a eliminar
	 */
	public void deletePostByPostId(String postId);
	
	

}
