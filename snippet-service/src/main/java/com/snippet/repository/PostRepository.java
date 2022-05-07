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
	
	@Query(value="SELECT * FROM post p WHERE p.exposure = :exposure ORDER BY created_at LIMIT 20", 
			nativeQuery = true)
	public List<Post> recentPosts(@Param("exposure") String exposure);
	
	public Post findPostByPostId(String postId);
}
