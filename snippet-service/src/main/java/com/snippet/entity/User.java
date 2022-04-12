package com.snippet.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.Lob;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@Entity
@Table(name = "USER", indexes = { 
		@Index(columnList = "userId", name="index_userid", unique = true), 
		@Index(columnList = "email", name="index_email", unique = true) })
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User implements Serializable {
	
	private static final long serialVersionUID = 6390526740705101102L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;
	
	@Column(name = "USERID", nullable = false)
	private String userId;
	
	@Column(name = "FIRSNAME", nullable = false, length = 50)
	private String firstName;
	
	@Column(name = "LASTNAME", nullable = false, length = 50)
	private String lastName;
	
	@Column(name = "EMAIL", nullable = false, length = 255)
	private String email;
	
	@Column(name = "PASSWORD", nullable = false)
	private String password;
	
	@Column(name = "IMAGE")
	@Lob
	private byte[] image;
	

}
