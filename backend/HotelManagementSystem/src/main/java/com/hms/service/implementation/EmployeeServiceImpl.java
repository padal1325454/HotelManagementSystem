package com.hms.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hms.models.Employee;
import com.hms.repository.EmployeeRepository;
import com.hms.service.EmployeeService;
import com.hms.dto.EmployeeDto;
import com.hms.exceptions.ResourceNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public String addEmployee(Employee employee) {
        if (employee.getUser() == null) {
            return "User information is mandatory!";
        }
        if (employee.getSalary() == null || employee.getSalary() <= 0) {
            return "Salary must be greater than zero!";
        }
        employeeRepository.save(employee);
        return "Employee added successfully!";
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with ID: " + employeeId));
        return mapToDto(employee);
    }

    @Override
    public String updateEmployee(Long employeeId, Employee employee) {
        Employee existingEmployee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with ID: " + employeeId));

        if (employee.getUser() != null) {
            existingEmployee.setUser(employee.getUser());
        }
        if (employee.getDepartment() != null) {
            existingEmployee.setDepartment(employee.getDepartment());
        }
        if (employee.getSalary() != null && employee.getSalary() > 0) {
            existingEmployee.setSalary(employee.getSalary());
        }

        employeeRepository.save(existingEmployee);
        return "Employee updated successfully!";
    }

    @Override
    public String deleteEmployee(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with ID: " + employeeId));
        employeeRepository.delete(employee);
        return "Employee deleted successfully!";
    }

    private EmployeeDto mapToDto(Employee employee) {
        return EmployeeDto.builder()
                .employeeId(employee.getEmployeeId())
                .userId(employee.getUser().getUserId())
                .department(employee.getDepartment())
                .salary(employee.getSalary())
                .build();
    }
}
