package com.snippet.config;

import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.Base64Utils;

import com.snippet.dto.UserDto;
import com.snippet.entity.User;

@Configuration
public class ModelMapperConfig {

	@Bean
	public ModelMapper modelMapper() {
		
		Converter<String, byte[]> string2Base64 = context -> context.getSource() == null ? 
				null : Base64Utils.decodeFromString(context.getSource());
		
		Converter<byte[], String> base64ToString = context -> context.getSource() == null ? 
				null : Base64Utils.encodeToString(context.getSource());

		ModelMapper modelMapper = new ModelMapper();

		modelMapper.typeMap(UserDto.class, User.class)
				.addMappings(mapper -> mapper.using(string2Base64).map(UserDto::getImage, User::setImage));
		
		modelMapper.typeMap(User.class, UserDto.class)
			.addMappings(mapper -> mapper.using(base64ToString).map(User::getImage, UserDto::setImage));
		
		modelMapper.typeMap(User.class, UserDto.class)
			.addMappings(mapper -> mapper.skip(UserDto::setPosts));
		
		return modelMapper;
	}



}
