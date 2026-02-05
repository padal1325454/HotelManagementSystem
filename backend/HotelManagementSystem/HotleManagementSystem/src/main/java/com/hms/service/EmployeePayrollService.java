package com.hms.service;

import com.hms.models.EmployeePayroll;
import com.hms.dto.EmployeePayrollDto;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface EmployeePayrollService {
    String addEmployeePayroll(EmployeePayroll employeePayroll);
    List<EmployeePayrollDto> getAllEmployeePayrolls();
    EmployeePayrollDto getEmployeePayrollById(Long payrollId);
    String updateEmployeePayroll(Long payrollId, EmployeePayroll employeePayroll);
    String deleteEmployeePayroll(Long payrollId);
}
