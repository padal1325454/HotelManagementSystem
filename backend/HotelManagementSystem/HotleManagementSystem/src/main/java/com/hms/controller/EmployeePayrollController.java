package com.hms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.hms.models.EmployeePayroll;
import com.hms.dto.EmployeePayrollDto;
import com.hms.service.EmployeePayrollService;

import java.util.List;

@RestController
@RequestMapping("/api/employeepayrolls")
public class EmployeePayrollController {

    @Autowired
    private EmployeePayrollService employeePayrollService;

    // Add a new employee payroll
    @PostMapping
    public ResponseEntity<String> addEmployeePayroll(@RequestBody EmployeePayroll employeePayroll) {
        String response = employeePayrollService.addEmployeePayroll(employeePayroll);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Get all employee payrolls
    @GetMapping
    public ResponseEntity<List<EmployeePayrollDto>> getAllEmployeePayrolls() {
        List<EmployeePayrollDto> employeePayrolls = employeePayrollService.getAllEmployeePayrolls();
        return new ResponseEntity<>(employeePayrolls, HttpStatus.OK);
    }

    // Get an employee payroll by ID
    @GetMapping("/{id}")
    public ResponseEntity<EmployeePayrollDto> getEmployeePayrollById(@PathVariable Long id) {
        EmployeePayrollDto employeePayroll = employeePayrollService.getEmployeePayrollById(id);
        return new ResponseEntity<>(employeePayroll, HttpStatus.OK);
    }

    // Update an employee payroll
    @PutMapping("/{id}/update")
    public ResponseEntity<String> updateEmployeePayroll(@PathVariable Long id, @RequestBody EmployeePayroll employeePayroll) {
        String response = employeePayrollService.updateEmployeePayroll(id, employeePayroll);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Delete an employee payroll
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<String> deleteEmployeePayroll(@PathVariable Long id) {
        String response = employeePayrollService.deleteEmployeePayroll(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
