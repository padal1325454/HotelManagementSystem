package com.hms.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hms.models.RoomType;
import com.hms.repository.RoomTypeRepository;
import com.hms.service.RoomTypeService;
import com.hms.dto.RoomTypeDto;
import com.hms.exceptions.ResourceNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoomTypeServiceImpl implements RoomTypeService {

    @Autowired
    private RoomTypeRepository roomTypeRepository;

    @Override
    public String addRoomType(RoomType roomType) {
        if (roomType.getName() == null || roomType.getName().isEmpty()) {
            return "Room type name is mandatory!";
        }
        roomTypeRepository.save(roomType);
        return "Room type added successfully!";
    }

    @Override
    public List<RoomTypeDto> getAllRoomTypes() {
        List<RoomType> roomTypes = roomTypeRepository.findAll();
        return roomTypes.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public RoomTypeDto getRoomTypeById(Long roomTypeId) {
        RoomType roomType = roomTypeRepository.findById(roomTypeId)
                .orElseThrow(() -> new ResourceNotFoundException("Room type not found with ID: " + roomTypeId));
        return mapToDto(roomType);
    }

    @Override
    public String updateRoomType(Long roomTypeId, RoomType roomType) {
        RoomType existingRoomType = roomTypeRepository.findById(roomTypeId)
                .orElseThrow(() -> new ResourceNotFoundException("Room type not found with ID: " + roomTypeId));

        if (roomType.getName() != null && !roomType.getName().isEmpty()) {
            existingRoomType.setName(roomType.getName());
        }
        if (roomType.getDescription() != null && !roomType.getDescription().isEmpty()) {
            existingRoomType.setDescription(roomType.getDescription());
        }
        if (roomType.getMaxOccupancy() != null) {
            existingRoomType.setMaxOccupancy(roomType.getMaxOccupancy());
        }

        roomTypeRepository.save(existingRoomType);
        return "Room type updated successfully!";
    }

    @Override
    public String deleteRoomType(Long roomTypeId) {
        RoomType roomType = roomTypeRepository.findById(roomTypeId)
                .orElseThrow(() -> new ResourceNotFoundException("Room type not found with ID: " + roomTypeId));
        roomTypeRepository.delete(roomType);
        return "Room type deleted successfully!";
    }

    private RoomTypeDto mapToDto(RoomType roomType) {
        return RoomTypeDto.builder()
                .roomTypeId(roomType.getRoomTypeId())
                .name(roomType.getName())
                .description(roomType.getDescription())
                .maxOccupancy(roomType.getMaxOccupancy())
                .build();
    }
}
