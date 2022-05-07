package com.snippet.service.impl;

import java.util.Collections;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.snippet.dto.PostDto;
import com.snippet.dto.UserDto;
import com.snippet.entity.Post;
import com.snippet.exception.BadRequestException;
import com.snippet.exception.ForbiddenException;
import com.snippet.exception.NotFoundException;
import com.snippet.repository.PostRepository;
import com.snippet.service.PostService;
import com.snippet.service.UserService;

@Service
public class PostServiceImpl implements PostService{
	
	@Autowired
	private PostRepository postRepository;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private ModelMapper mapper;
	
	@Override
	public List<PostDto> recentPosts() {
		List<Post> posts = postRepository.recentPosts("PUBLIC");
		if(posts != null) {
			return posts.stream().map(post -> mapper.map(post, PostDto.class))
					.collect(Collectors.toList());
		}
		return Collections.emptyList();
	}
	
	@Override
	public List<PostDto> findAllPostsByUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String email = authentication.getPrincipal().toString();
		List<Post> posts = (List<Post>) postRepository.findAllPostByUserEmailOrderByCreatedAtDesc(email);
		return posts.stream().map(post -> mapper.map(post, PostDto.class))
				.collect(Collectors.toList());
	}
	
	@Override
	public PostDto findPostByPostId(String postId) {
		Post post = postRepository.findPostByPostId(postId);
		if(post == null) {
			throw new NotFoundException("El post con id " + postId + " no existe en la base de datos");
		} else {
			if(post.getExposure().equals("PRIVATE")) {
				Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
				String email = authentication.getPrincipal().toString();
				UserDto user = userService.findUserByEmail(email);
				if(user.getId() != post.getUser().getId()) {
					throw new ForbiddenException("El usuario no tiene permisos para acceder al post");
				}
			}
			return mapper.map(post, PostDto.class);
		}
	}
	
	@Override
	public PostDto savePost(PostDto postDto) {
		
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String email = authentication.getPrincipal().toString();
		UserDto userDto = userService.findUserByEmail(email);
		postDto.setUser(userDto);
		postDto.setPostId(UUID.randomUUID().toString());
		PostDto savedPostDto = null;
		try {
			Post post = postRepository.save(mapper.map(postDto, Post.class));
			savedPostDto = mapper.map(post, PostDto.class);
		} catch (Exception e) {
			throw new BadRequestException("Los datos del post a guardar no son correctos.");
		}
		return savedPostDto;
	}
	
	@Override
	public PostDto updatePost(PostDto postDto) {
		PostDto updatedPostDto = null;

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String email = authentication.getPrincipal().toString();
		UserDto userDto = userService.findUserByEmail(email);

		Post post = postRepository.findById(postDto.getId()).orElseThrow(
				() -> new NotFoundException("El registro con id: " + postDto.getId() + " no existe en la base de datos."));

		if (userDto.getId() != post.getId()) {
			throw new ForbiddenException("El usuario no tiene permisos para eliminar el post");
		}

		try {
			post.setPostId(postDto.getPostId());
			post.setTitle(postDto.getTitle());
			post.setContent(postDto.getContent());
			post.setExposure(postDto.getExposure());
			
			Post postSaved = postRepository.save(post);
			updatedPostDto = mapper.map(postSaved, PostDto.class);

		} catch (Exception e) {
			throw new BadRequestException("Los datos del post a actualizar no son correctos.");
		}
		return updatedPostDto;
	}

	@Override
	public void deletePostById(Long id) {
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			String email = authentication.getPrincipal().toString();
			UserDto userDto = userService.findUserByEmail(email);
			
			Post post = postRepository.findById(id).orElseThrow(
					() -> new NotFoundException("El registro con id: " + id + " no existe en la base de datos."));
			
			if(userDto.getId() != post.getId()) {
				throw new ForbiddenException("El usuario no tiene permisos para eliminar el post");
			}
			
			postRepository.deleteById(id);
		} catch (Exception e) {
			throw new NotFoundException("El registro con id: " + id + " no existe en la base de datos.");
		}
		
	}


	
	
	
	
	
	
	



}
