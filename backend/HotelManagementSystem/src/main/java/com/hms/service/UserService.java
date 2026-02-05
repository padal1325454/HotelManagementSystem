package com.hms.service;

import com.hms.dto.UserDto;
import com.hms.models.User;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface UserService {
    String addUser(User user);
    List<UserDto> getAllUsers();
    UserDto getUserById(Long userId);
    String updateUser(Long userId, User user);
    String deleteUser(Long userId);
    UserDto checkUserExists(String email, String password); 
    Boolean checkEmail(String email);
}

