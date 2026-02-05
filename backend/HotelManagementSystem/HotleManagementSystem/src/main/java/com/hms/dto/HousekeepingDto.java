package com.hms.dto;

import com.hms.enums.TaskStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HousekeepingDto {
    private Long housekeepingId;
    private Long roomId;
    private Long employeeId;
    private TaskStatus status;
}
