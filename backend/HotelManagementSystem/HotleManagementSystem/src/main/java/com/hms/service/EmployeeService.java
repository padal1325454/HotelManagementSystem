package com.hms.service;

import com.hms.models.Employee;
import com.hms.dto.EmployeeDto;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface EmployeeService {
    String addEmployee(Employee employee);
    List<EmployeeDto> getAllEmployees();
    EmployeeDto getEmployeeById(Long employeeId);
    String updateEmployee(Long employeeId, Employee employee);
    String deleteEmployee(Long employeeId);
}
