
package com.hms.dto;

import com.hms.enums.Department;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EmployeeDto {
    private Long employeeId;
    private Long userId;
    private String employeeName; // Added field for proper mapping
    private Department department;
    private Double salary;
}

