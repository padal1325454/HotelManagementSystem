package com.hms.dto;

import com.hms.enums.MaintenanceStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MaintenanceDto {
    private Long maintenanceId;
    private Long roomId;
    private String issueDescription;
    private MaintenanceStatus status;
}
