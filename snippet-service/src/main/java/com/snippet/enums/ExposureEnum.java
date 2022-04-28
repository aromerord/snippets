package com.snippet.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ExposureEnum {

	PUBLIC(1, "public"), 
	PRIVATE(2, "private"); 
	
	private int id;
	private String value;

}
