package com.hms.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EmployeePayrollDto {
    private Long payrollId;
    private Long employeeId;
    private Double salary;
    private Double bonus;
    private Double deductions;
}
