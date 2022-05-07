package com.snippet.dto;

import java.io.Serializable;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostDto implements Serializable {
	
	private static final long serialVersionUID = 5013019344491824323L;
	
	private Long id;
	private String postId;
	private String title;
	private String description;
	private String content;
	private Date createdAt;
	private UserDto user;
	private String exposure;

}
