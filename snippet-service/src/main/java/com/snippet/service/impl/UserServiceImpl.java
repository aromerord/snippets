package com.snippet.service.impl;

import java.util.ArrayList;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.snippet.dto.UserDto;
import com.snippet.entity.User;
import com.snippet.exception.ConflictException;
import com.snippet.repository.UserRepository;
import com.snippet.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
	private ModelMapper mapper;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User user = userRepository.findByEmail(email);
		if (user == null) {
			throw new UsernameNotFoundException(email);
		}
		return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
				new ArrayList<>());
	}

	@Override
	public UserDto findUserByEmail(String email) {
		User user = userRepository.findByEmail(email);
		if (user == null) {
			throw new UsernameNotFoundException(email);
		}
		return mapper.map(user, UserDto.class);
	}

	@Override
	public UserDto saveUser(UserDto userDto) {

		if (userRepository.findByEmail(userDto.getEmail()) != null) {
			throw new ConflictException("El email ya está registrado.");
		}

		UUID userId = UUID.randomUUID();
		userDto.setUserId(userId.toString());
		userDto.setPassword(bCryptPasswordEncoder.encode(userDto.getPassword()));

		UserDto savedUserDto = null;
		User user = userRepository.save(mapper.map(userDto, User.class));
		savedUserDto = mapper.map(user, UserDto.class);
		return savedUserDto;
	}

}
