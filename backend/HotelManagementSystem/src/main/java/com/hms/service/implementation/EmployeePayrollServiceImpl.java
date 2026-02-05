package com.hms.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hms.models.EmployeePayroll;
import com.hms.repository.EmployeePayrollRepository;
import com.hms.service.EmployeePayrollService;
import com.hms.dto.EmployeePayrollDto;
import com.hms.exceptions.ResourceNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeePayrollServiceImpl implements EmployeePayrollService {

    @Autowired
    private EmployeePayrollRepository employeePayrollRepository;

    @Override
    public String addEmployeePayroll(EmployeePayroll employeePayroll) {
        if (employeePayroll.getEmployee() == null) {
            return "Employee is mandatory!";
        }
        if (employeePayroll.getSalary() == null || employeePayroll.getSalary() <= 0) {
            return "Salary must be greater than zero!";
        }
        employeePayrollRepository.save(employeePayroll);
        return "Employee payroll added successfully!";
    }

    @Override
    public List<EmployeePayrollDto> getAllEmployeePayrolls() {
        List<EmployeePayroll> employeePayrolls = employeePayrollRepository.findAll();
        return employeePayrolls.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public EmployeePayrollDto getEmployeePayrollById(Long payrollId) {
        EmployeePayroll employeePayroll = employeePayrollRepository.findById(payrollId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee payroll not found with ID: " + payrollId));
        return mapToDto(employeePayroll);
    }

    @Override
    public String updateEmployeePayroll(Long payrollId, EmployeePayroll employeePayroll) {
        EmployeePayroll existingEmployeePayroll = employeePayrollRepository.findById(payrollId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee payroll not found with ID: " + payrollId));

        if (employeePayroll.getEmployee() != null) {
            existingEmployeePayroll.setEmployee(employeePayroll.getEmployee());
        }
        if (employeePayroll.getSalary() != null && employeePayroll.getSalary() > 0) {
            existingEmployeePayroll.setSalary(employeePayroll.getSalary());
        }
        if (employeePayroll.getBonus() != null) {
            existingEmployeePayroll.setBonus(employeePayroll.getBonus());
        }
        if (employeePayroll.getDeductions() != null) {
            existingEmployeePayroll.setDeductions(employeePayroll.getDeductions());
        }

        employeePayrollRepository.save(existingEmployeePayroll);
        return "Employee payroll updated successfully!";
    }

    @Override
    public String deleteEmployeePayroll(Long payrollId) {
        EmployeePayroll employeePayroll = employeePayrollRepository.findById(payrollId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee payroll not found with ID: " + payrollId));
        employeePayrollRepository.delete(employeePayroll);
        return "Employee payroll deleted successfully!";
    }

    private EmployeePayrollDto mapToDto(EmployeePayroll employeePayroll) {
        return EmployeePayrollDto.builder()
                .payrollId(employeePayroll.getPayrollId())
                .employeeId(employeePayroll.getEmployee().getEmployeeId())
                .salary(employeePayroll.getSalary())
                .bonus(employeePayroll.getBonus())
                .deductions(employeePayroll.getDeductions())
                .build();
    }
}
