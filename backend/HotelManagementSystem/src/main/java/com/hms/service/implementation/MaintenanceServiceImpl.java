package com.hms.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hms.models.Maintenance;
import com.hms.repository.MaintenanceRepository;
import com.hms.service.MaintenanceService;
import com.hms.dto.MaintenanceDto;
import com.hms.exceptions.ResourceNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MaintenanceServiceImpl implements MaintenanceService {

    @Autowired
    private MaintenanceRepository maintenanceRepository;

    @Override
    public String addMaintenance(Maintenance maintenance) {
        if (maintenance.getRoom() == null) {
            return "Room is mandatory!";
        }
        maintenanceRepository.save(maintenance);
        return "Maintenance added successfully!";
    }

    @Override
    public List<MaintenanceDto> getAllMaintenance() {
        List<Maintenance> maintenances = maintenanceRepository.findAll();
        return maintenances.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public MaintenanceDto getMaintenanceById(Long maintenanceId) {
        Maintenance maintenance = maintenanceRepository.findById(maintenanceId)
                .orElseThrow(() -> new ResourceNotFoundException("Maintenance not found with ID: " + maintenanceId));
        return mapToDto(maintenance);
    }

    @Override
    public String updateMaintenance(Long maintenanceId, Maintenance maintenance) {
        Maintenance existingMaintenance = maintenanceRepository.findById(maintenanceId)
                .orElseThrow(() -> new ResourceNotFoundException("Maintenance not found with ID: " + maintenanceId));

        if (maintenance.getRoom() != null) {
            existingMaintenance.setRoom(maintenance.getRoom());
        }
        if (maintenance.getIssueDescription() != null && !maintenance.getIssueDescription().isEmpty()) {
            existingMaintenance.setIssueDescription(maintenance.getIssueDescription());
        }
        if (maintenance.getStatus() != null) {
            existingMaintenance.setStatus(maintenance.getStatus());
        }

        maintenanceRepository.save(existingMaintenance);
        return "Maintenance updated successfully!";
    }

    @Override
    public String deleteMaintenance(Long maintenanceId) {
        Maintenance maintenance = maintenanceRepository.findById(maintenanceId)
                .orElseThrow(() -> new ResourceNotFoundException("Maintenance not found with ID: " + maintenanceId));
        maintenanceRepository.delete(maintenance);
        return "Maintenance deleted successfully!";
    }

    private MaintenanceDto mapToDto(Maintenance maintenance) {
        return MaintenanceDto.builder()
                .maintenanceId(maintenance.getMaintenanceId())
                .roomId(maintenance.getRoom().getRoomId())
                .issueDescription(maintenance.getIssueDescription())
                .status(maintenance.getStatus())
                .build();
    }
}
