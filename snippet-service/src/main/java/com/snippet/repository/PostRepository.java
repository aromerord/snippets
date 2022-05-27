package com.snippet.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.snippet.entity.Post;

@Repository
public interface PostRepository extends CrudRepository<Post, Long>{
	
	public List<Post> findAllPostByUserEmailOrderByCreatedAtDesc(String email);
	
	/**
	 * Obtener todos los posts públicos
	 * @param exposure
	 * @return Lista de posts públicos
	 */
	@Query(value="SELECT * FROM post p WHERE p.exposure = :exposure ORDER BY created_at", 
			nativeQuery = true)
	public List<Post> findAllPublicPosts(@Param("exposure") String exposure);
	
	/**
	 * Obtener los últimos 20 posts
	 * @param exposure
	 * @return Lista con los últimos 20 posts
	 */
	@Query(value="SELECT * FROM post p WHERE p.exposure = :exposure ORDER BY created_at LIMIT 20", 
			nativeQuery = true)
	public List<Post> recentPosts(@Param("exposure") String exposure);
	
	/**
	 * Obtener post por el postId
	 * @param postId
	 * @return post obtenido
	 */
	public Post findPostByPostId(String postId);
	
	/**
	 * Eliminar post por el postId
	 * @param postId
	 */
	public void deletePostByPostId(String postId);
}
