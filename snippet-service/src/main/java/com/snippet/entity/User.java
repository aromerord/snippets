package com.snippet.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "USER", indexes = { 
		@Index(columnList = "user_id", name="index_user_id", unique = true), 
		@Index(columnList = "email", name="index_email", unique = true) })
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User implements Serializable {
	
	private static final long serialVersionUID = 6390526740705101102L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;
	
	@Column(name = "USER_ID", nullable = false)
	private String userId;
	
	@Column(name = "FIRST_NAME", nullable = true, length = 50)
	private String firstName;
	
	@Column(name = "LAST_NAME", nullable = false, length = 50)
	private String lastName;
	
	@Column(name = "EMAIL", nullable = false, length = 255)
	private String email;
	
	@Column(name = "PASSWORD", nullable = false)
	private String password;
	
	@Column(name = "IMAGE")
	@Lob
	private byte[] image;
	
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "user", fetch = FetchType.LAZY)
	private List<Post> posts;
	

}
