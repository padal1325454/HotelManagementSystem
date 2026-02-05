package com.hms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.hms.models.User;
import com.hms.dto.UserDto;
import com.hms.service.UserService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Add a new user
    @PostMapping
    public ResponseEntity<String> addUser(@RequestBody User user) {
        String response = userService.addUser(user);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Get all users
    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDto> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    // Get a user by ID
    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id) {
        UserDto user = userService.getUserById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    // Update a user
    @PutMapping("/{id}/update")
    public ResponseEntity<String> updateUser(@PathVariable Long id, @RequestBody User user) {
        String response = userService.updateUser(id, user);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Delete a user
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        String response = userService.deleteUser(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Check if a user exists by email and password
    @PostMapping("/check")
    public ResponseEntity<UserDto> checkUserExists(@RequestBody Map<String, String> credentials) {
        String email = credentials.get("email");
        String password = credentials.get("password");
        UserDto user = userService.checkUserExists(email, password);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
    
    // Check if a email exists
    @PostMapping("/check/email")
    public ResponseEntity<Boolean> checkEmail(@PathVariable String email) {
        Boolean user = userService.checkEmail(email);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
    
    
}
