package com.hms.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hms.models.Housekeeping;
import com.hms.repository.HousekeepingRepository;
import com.hms.service.HousekeepingService;
import com.hms.dto.HousekeepingDto;
import com.hms.exceptions.ResourceNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HousekeepingServiceImpl implements HousekeepingService {

    @Autowired
    private HousekeepingRepository housekeepingRepository;

    @Override
    public String addHousekeeping(Housekeeping housekeeping) {
        housekeepingRepository.save(housekeeping);
        return "Housekeeping task added successfully!";
    }

    @Override
    public List<HousekeepingDto> getAllHousekeeping() {
        List<Housekeeping> housekeepingList = housekeepingRepository.findAll();
        return housekeepingList.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public HousekeepingDto getHousekeepingById(Long housekeepingId) {
        Housekeeping housekeeping = housekeepingRepository.findById(housekeepingId)
                .orElseThrow(() -> new ResourceNotFoundException("Housekeeping task not found with ID: " + housekeepingId));
        return mapToDto(housekeeping);
    }

    @Override
    public String updateHousekeeping(Long housekeepingId, Housekeeping housekeeping) {
        Housekeeping existingHousekeeping = housekeepingRepository.findById(housekeepingId)
                .orElseThrow(() -> new ResourceNotFoundException("Housekeeping task not found with ID: " + housekeepingId));

        if (housekeeping.getRoom() != null) {
            existingHousekeeping.setRoom(housekeeping.getRoom());
        }
        if (housekeeping.getEmployee() != null) {
            existingHousekeeping.setEmployee(housekeeping.getEmployee());
        }
        if (housekeeping.getStatus() != null) {
            existingHousekeeping.setStatus(housekeeping.getStatus());
        }

        housekeepingRepository.save(existingHousekeeping);
        return "Housekeeping task updated successfully!";
    }

    @Override
    public String deleteHousekeeping(Long housekeepingId) {
        Housekeeping housekeeping = housekeepingRepository.findById(housekeepingId)
                .orElseThrow(() -> new ResourceNotFoundException("Housekeeping task not found with ID: " + housekeepingId));
        housekeepingRepository.delete(housekeeping);
        return "Housekeeping task deleted successfully!";
    }

    private HousekeepingDto mapToDto(Housekeeping housekeeping) {
        return HousekeepingDto.builder()
                .housekeepingId(housekeeping.getHousekeepingId())
                .roomId(housekeeping.getRoom().getRoomId())
                .employeeId(housekeeping.getEmployee().getEmployeeId())
                .status(housekeeping.getStatus())
                .build();
    }
}
