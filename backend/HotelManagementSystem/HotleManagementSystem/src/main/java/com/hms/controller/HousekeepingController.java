package com.hms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.hms.models.Housekeeping;
import com.hms.dto.HousekeepingDto;
import com.hms.service.HousekeepingService;

import java.util.List;

@RestController
@RequestMapping("/api/housekeeping")
public class HousekeepingController {

    @Autowired
    private HousekeepingService housekeepingService;

    // Add a new housekeeping task
    @PostMapping
    public ResponseEntity<String> addHousekeeping(@RequestBody Housekeeping housekeeping) {
        String response = housekeepingService.addHousekeeping(housekeeping);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Get all housekeeping tasks
    @GetMapping
    public ResponseEntity<List<HousekeepingDto>> getAllHousekeeping() {
        List<HousekeepingDto> housekeeping = housekeepingService.getAllHousekeeping();
        return new ResponseEntity<>(housekeeping, HttpStatus.OK);
    }

    // Get housekeeping task by ID
    @GetMapping("/{id}")
    public ResponseEntity<HousekeepingDto> getHousekeepingById(@PathVariable Long id) {
        HousekeepingDto housekeeping = housekeepingService.getHousekeepingById(id);
        return new ResponseEntity<>(housekeeping, HttpStatus.OK);
    }

    // Update housekeeping task
    @PutMapping("/{id}/update")
    public ResponseEntity<String> updateHousekeeping(@PathVariable Long id, @RequestBody Housekeeping housekeeping) {
        String response = housekeepingService.updateHousekeeping(id, housekeeping);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Delete housekeeping task
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<String> deleteHousekeeping(@PathVariable Long id) {
        String response = housekeepingService.deleteHousekeeping(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
