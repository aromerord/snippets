package com.snippet.dto;

import java.io.Serializable;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto implements Serializable{
	
	private static final long serialVersionUID = 5673076865660576504L;
	
	private Long id;
	private String userId;
	private String firstName;
	private String lastName;
	private String password;
	private String email;
	private String image;
	
}
