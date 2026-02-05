package com.hms.controller;

import com.hms.models.Housekeeping;
import com.hms.dto.HousekeepingDto;
import com.hms.service.HousekeepingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/housekeeping")
public class HousekeepingController {

    @Autowired
    private HousekeepingService housekeepingService;

    // Create a new housekeeping task
    @PostMapping
    public ResponseEntity<String> addHousekeeping(@RequestBody Housekeeping housekeeping) {
        String result = housekeepingService.addHousekeeping(housekeeping);
        return ResponseEntity.ok(result);
    }

    // Get all housekeeping tasks
    @GetMapping
    public ResponseEntity<List<HousekeepingDto>> getAllHousekeeping() {
        List<HousekeepingDto> tasks = housekeepingService.getAllHousekeeping();
        return ResponseEntity.ok(tasks);
    }

    // Get a specific housekeeping task by ID
    @GetMapping("/{id}")
    public ResponseEntity<HousekeepingDto> getHousekeepingById(@PathVariable Long id) {
        HousekeepingDto task = housekeepingService.getHousekeepingById(id);
        return ResponseEntity.ok(task);
    }

    // Update an existing housekeeping task
    @PutMapping("/{id}/update")
    public ResponseEntity<String> updateHousekeeping(@PathVariable Long id, @RequestBody Housekeeping housekeeping) {
        String result = housekeepingService.updateHousekeeping(id, housekeeping);
        return ResponseEntity.ok(result);
    }

    // Delete a housekeeping task
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<String> deleteHousekeeping(@PathVariable Long id) {
        String result = housekeepingService.deleteHousekeeping(id);
        return ResponseEntity.ok(result);
    }
}
