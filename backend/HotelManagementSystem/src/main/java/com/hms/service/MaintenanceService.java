package com.hms.service;

import com.hms.models.Maintenance;
import com.hms.dto.MaintenanceDto;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface MaintenanceService {
    String addMaintenance(Maintenance maintenance);
    List<MaintenanceDto> getAllMaintenance();
    MaintenanceDto getMaintenanceById(Long maintenanceId);
    String updateMaintenance(Long maintenanceId, Maintenance maintenance);
    String deleteMaintenance(Long maintenanceId);
}
