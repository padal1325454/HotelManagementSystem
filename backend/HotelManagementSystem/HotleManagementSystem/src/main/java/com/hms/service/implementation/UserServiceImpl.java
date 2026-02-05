package com.hms.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hms.models.User;
import com.hms.repository.UserRepository;
import com.hms.service.UserService;
import com.hms.dto.UserDto;
import com.hms.exceptions.ResourceNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public String addUser(User user) {
        if (user.getName() == null || user.getName().isEmpty()) {
            return "User name is mandatory!";
        }
        if (user.getEmail() == null || user.getEmail().isEmpty()) {
            return "Email is mandatory!";
        }
        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            return "Password is mandatory!";
        }
        User existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser != null) {
            return "User with email " + user.getEmail() + " already exists!";
        }
        userRepository.save(user);
        return "User added successfully!";
    }

    @Override
    public List<UserDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public UserDto getUserById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));
        return mapToDto(user);
    }

    @Override
    public String updateUser(Long userId, User user) {
        User existingUser = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));

        if (user.getName() != null && !user.getName().isEmpty()) {
            existingUser.setName(user.getName());
        }
        if (user.getEmail() != null && !user.getEmail().isEmpty()) {
            existingUser.setEmail(user.getEmail());
        }
        if (user.getRole() != null) {
            existingUser.setRole(user.getRole());
        }

        userRepository.save(existingUser);
        return "User updated successfully!";
    }

    @Override
    public String deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));
        userRepository.delete(user);
        return "User deleted successfully!";
    }

    @Override
    public UserDto checkUserExists(String email, String password) {
        User user = userRepository.findByEmailAndPassword(email, password);
        return mapToDto(user);
    }

    private UserDto mapToDto(User user) {
        return UserDto.builder()
                .userId(user.getUserId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }
}
