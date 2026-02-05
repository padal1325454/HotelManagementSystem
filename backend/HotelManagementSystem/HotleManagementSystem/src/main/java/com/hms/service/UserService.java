package com.hms.service;

import com.hms.dto.UserDto;
import com.hms.models.User;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface UserService {
    String addUser(User user);
    List<UserDto> getAllUsers();
    UserDto getUserById(int userId);
    String updateUser(int userId, User user);
    String deleteUser(int userId);
    boolean checkUserExists(String email, String password); 
}

