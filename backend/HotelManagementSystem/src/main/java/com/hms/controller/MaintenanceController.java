package com.hms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.hms.models.Maintenance;
import com.hms.dto.MaintenanceDto;
import com.hms.service.MaintenanceService;

import java.util.List;

@RestController
@RequestMapping("/api/maintenance")
public class MaintenanceController {

    @Autowired
    private MaintenanceService maintenanceService;

    // Add a new maintenance
    @PostMapping
    public ResponseEntity<String> addMaintenance(@RequestBody Maintenance maintenance) {
        String response = maintenanceService.addMaintenance(maintenance);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Get all maintenance
    @GetMapping
    public ResponseEntity<List<MaintenanceDto>> getAllMaintenance() {
        List<MaintenanceDto> maintenances = maintenanceService.getAllMaintenance();
        return new ResponseEntity<>(maintenances, HttpStatus.OK);
    }

    // Get maintenance by ID
    @GetMapping("/{id}")
    public ResponseEntity<MaintenanceDto> getMaintenanceById(@PathVariable Long id) {
        MaintenanceDto maintenance = maintenanceService.getMaintenanceById(id);
        return new ResponseEntity<>(maintenance, HttpStatus.OK);
    }

    // Update maintenance
    @PutMapping("/{id}/update")
    public ResponseEntity<String> updateMaintenance(@PathVariable Long id, @RequestBody Maintenance maintenance) {
        String response = maintenanceService.updateMaintenance(id, maintenance);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Delete maintenance
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<String> deleteMaintenance(@PathVariable Long id) {
        String response = maintenanceService.deleteMaintenance(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
