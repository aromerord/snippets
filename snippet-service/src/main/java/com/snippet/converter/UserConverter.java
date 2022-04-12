package com.snippet.converter;

import org.springframework.util.Base64Utils;

import com.snippet.dto.UserDto;
import com.snippet.entity.User;

public class UserConverter {
	
	/**
	 * Mappea de UserDto a User
	 * @param userDto
	 * @return
	 */
	public static User userDto2User(UserDto userDto) {
		User user = new User();
		user.setId(userDto.getId());
		user.setUserId(userDto.getUserId());
		user.setFirstName(userDto.getFirstName());
		user.setLastName(userDto.getLastName());
		user.setEmail(userDto.getEmail());
		user.setPassword(userDto.getPassword());
		if(userDto.getImage() != null) {
			byte[]image = Base64Utils.decodeFromString(userDto.getImage());
			user.setImage(image);
		} else {
			user.setImage(null);
		}
		return user;
	}
	
	
	/**
	 * Mappea de User a UserDto
	 * @param user
	 * @return
	 */
	public static UserDto user2UserDto(User user) {
		UserDto userDto = new UserDto();
		userDto.setId(user.getId());
		userDto.setUserId(user.getUserId());
		userDto.setFirstName(user.getFirstName());
		userDto.setLastName(user.getLastName());
		userDto.setEmail(user.getEmail());
		userDto.setPassword(user.getPassword());
		if(user.getImage() != null) {
			String image = Base64Utils.encodeToString(user.getImage());
			userDto.setImage(image);
		} else {
			userDto.setImage(null);
		}
		return userDto;
	}

}
