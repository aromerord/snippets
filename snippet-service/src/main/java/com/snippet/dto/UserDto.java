package com.snippet.dto;

import java.io.Serializable;
import java.util.List;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto implements Serializable {
	
	private static final long serialVersionUID = 5673076865660576504L;
	
	private Long id;
	private String userId;
	private String firstName;
	private String lastName;
	private String password;
	private String email;
	private String image;
	private List<PostDto> posts;
	
}
