package com.hms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.hms.models.LoyaltyProgram;
import com.hms.dto.LoyaltyProgramDto;
import com.hms.service.LoyaltyProgramService;

import java.util.List;

@RestController
@RequestMapping("/api/loyaltyprograms")
public class LoyaltyProgramController {

    @Autowired
    private LoyaltyProgramService loyaltyProgramService;

    // Add a new loyalty program
    @PostMapping
    public ResponseEntity<String> addLoyaltyProgram(@RequestBody LoyaltyProgram loyaltyProgram) {
        String response = loyaltyProgramService.addLoyaltyProgram(loyaltyProgram);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Get all loyalty programs
    @GetMapping
    public ResponseEntity<List<LoyaltyProgramDto>> getAllLoyaltyPrograms() {
        List<LoyaltyProgramDto> loyaltyPrograms = loyaltyProgramService.getAllLoyaltyPrograms();
        return new ResponseEntity<>(loyaltyPrograms, HttpStatus.OK);
    }

    // Get loyalty program by ID
    @GetMapping("/{id}")
    public ResponseEntity<LoyaltyProgramDto> getLoyaltyProgramById(@PathVariable Long id) {
        LoyaltyProgramDto loyaltyProgram = loyaltyProgramService.getLoyaltyProgramById(id);
        return new ResponseEntity<>(loyaltyProgram, HttpStatus.OK);
    }

    // Update loyalty program
    @PutMapping("/{id}/update")
    public ResponseEntity<String> updateLoyaltyProgram(@PathVariable Long id, @RequestBody LoyaltyProgram loyaltyProgram) {
        String response = loyaltyProgramService.updateLoyaltyProgram(id, loyaltyProgram);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Delete loyalty program
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<String> deleteLoyaltyProgram(@PathVariable Long id) {
        String response = loyaltyProgramService.deleteLoyaltyProgram(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
