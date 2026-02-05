package com.hms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.hms.models.Reports;
import com.hms.dto.ReportsDto;
import com.hms.service.ReportsService;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class ReportsController {

    @Autowired
    private ReportsService reportsService;

    // Add a new report
    @PostMapping
    public ResponseEntity<String> addReport(@RequestBody Reports report) {
        String response = reportsService.addReport(report);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Get all reports
    @GetMapping
    public ResponseEntity<List<ReportsDto>> getAllReports() {
        List<ReportsDto> reports = reportsService.getAllReports();
        return new ResponseEntity<>(reports, HttpStatus.OK);
    }

    // Get a report by ID
    @GetMapping("/{id}")
    public ResponseEntity<ReportsDto> getReportById(@PathVariable Long id) {
        ReportsDto report = reportsService.getReportById(id);
        return new ResponseEntity<>(report, HttpStatus.OK);
    }

    // Update a report
    @PutMapping("/{id}/update")
    public ResponseEntity<String> updateReport(@PathVariable Long id, @RequestBody Reports report) {
        String response = reportsService.updateReport(id, report);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Delete a report
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<String> deleteReport(@PathVariable Long id) {
        String response = reportsService.deleteReport(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
