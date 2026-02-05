package com.hms.service.implementation;

import com.hms.models.Housekeeping;
import com.hms.dto.HousekeepingDto;
import com.hms.models.Room;
import com.hms.models.Employee;
import com.hms.repository.HousekeepingRepository;
import com.hms.repository.EmployeeRepository;
import com.hms.repository.RoomRepository;
import com.hms.exceptions.ResourceNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HousekeepingServiceImpl implements com.hms.service.HousekeepingService {

    @Autowired
    private HousekeepingRepository housekeepingRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public String addHousekeeping(Housekeeping housekeeping) {
        // Validate the Room
        Room room = roomRepository.findById(housekeeping.getRoom().getRoomId())
                .orElseThrow(() -> new ResourceNotFoundException("Room not found with ID: " + housekeeping.getRoom().getRoomId()));
        housekeeping.setRoom(room);

        // Validate the Employee
        Employee employee = employeeRepository.findById(housekeeping.getEmployee().getEmployeeId())
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with ID: " + housekeeping.getEmployee().getEmployeeId()));
        housekeeping.setEmployee(employee);

        housekeepingRepository.save(housekeeping);
        return "Housekeeping task added successfully!";
    }

    @Override
    public List<HousekeepingDto> getAllHousekeeping() {
        List<Housekeeping> tasks = housekeepingRepository.findAll();

        if (tasks.isEmpty()) {
            throw new ResourceNotFoundException("No housekeeping tasks found.");
        }

        return tasks.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public HousekeepingDto getHousekeepingById(Long housekeepingId) {
        Housekeeping task = housekeepingRepository.findById(housekeepingId)
                .orElseThrow(() -> new ResourceNotFoundException("Housekeeping task not found with ID: " + housekeepingId));
        return mapToDto(task);
    }

    @Override
    public String updateHousekeeping(Long housekeepingId, Housekeeping housekeeping) {
        Housekeeping existingTask = housekeepingRepository.findById(housekeepingId)
                .orElseThrow(() -> new ResourceNotFoundException("Housekeeping task not found with ID: " + housekeepingId));

        // Update the Room
        Room room = roomRepository.findById(housekeeping.getRoom().getRoomId())
                .orElseThrow(() -> new ResourceNotFoundException("Room not found with ID: " + housekeeping.getRoom().getRoomId()));
        existingTask.setRoom(room);

        // Update the Employee
        Employee employee = employeeRepository.findById(housekeeping.getEmployee().getEmployeeId())
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with ID: " + housekeeping.getEmployee().getEmployeeId()));
        existingTask.setEmployee(employee);

        // Update the Task Status
        if (housekeeping.getStatus() != null) {
            existingTask.setStatus(housekeeping.getStatus());
        }

        housekeepingRepository.save(existingTask);
        return "Housekeeping task updated successfully!";
    }

    @Override
    public String deleteHousekeeping(Long housekeepingId) {
        Housekeeping housekeeping = housekeepingRepository.findById(housekeepingId)
                .orElseThrow(() -> new ResourceNotFoundException("Housekeeping task not found with ID: " + housekeepingId));
        housekeepingRepository.delete(housekeeping);
        return "Housekeeping task deleted successfully!";
    }

    // Helper method to convert Entity to DTO
    private HousekeepingDto mapToDto(Housekeeping housekeeping) {
        return HousekeepingDto.builder()
                .housekeepingId(housekeeping.getHousekeepingId())
                .roomId(housekeeping.getRoom().getRoomId())
                .employeeId(housekeeping.getEmployee().getEmployeeId())
                .status(housekeeping.getStatus())
                .build();
    }
}
