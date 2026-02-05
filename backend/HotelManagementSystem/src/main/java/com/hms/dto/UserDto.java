package com.hms.dto;

import com.hms.enums.Role;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserDto {
	
	private Long userId;
    private String name;
    private String email;
    //password not allowed to fetch
    private Role role; // ENUM: GUEST, EMPLOYEE, ADMIN
}
