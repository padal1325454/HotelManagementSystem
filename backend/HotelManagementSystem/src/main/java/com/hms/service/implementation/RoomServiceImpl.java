package com.hms.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hms.models.Room;
import com.hms.repository.RoomRepository;
import com.hms.repository.RoomTypeRepository;
import com.hms.service.RoomService;
import com.hms.dto.RoomDto;
import com.hms.exceptions.ResourceNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoomServiceImpl implements RoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private RoomTypeRepository roomTypeRepository;

    @Override
    public String addRoom(Room room) {
        // Validate RoomType
        if (room.getRoomType() == null || room.getRoomType().getRoomTypeId() == null) {
            throw new IllegalArgumentException("Room type is mandatory!");
        }

        // Fetch the RoomType to ensure it exists in the database
        room.setRoomType(roomTypeRepository.findById(room.getRoomType().getRoomTypeId())
            .orElseThrow(() -> new ResourceNotFoundException("Room type not found!")));

        // Validate Room Price
        if (room.getPrice() == null || room.getPrice() <= 0) {
            throw new IllegalArgumentException("Price must be greater than zero!");
        }

        // Save Room to the repository
        roomRepository.save(room);
        return "Room added successfully!";
    }

    @Override
    public List<RoomDto> getAllRooms() {
        List<Room> rooms = roomRepository.findAll();
        return rooms.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public RoomDto getRoomById(Long roomId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found with ID: " + roomId));
        return mapToDto(room);
    }

    @Override
    public String updateRoom(Long roomId, Room room) {
        Room existingRoom = roomRepository.findById(roomId)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found with ID: " + roomId));

        // Update RoomType if provided
        if (room.getRoomType() != null && room.getRoomType().getRoomTypeId() != null) {
            existingRoom.setRoomType(roomTypeRepository.findById(room.getRoomType().getRoomTypeId())
                .orElseThrow(() -> new ResourceNotFoundException("Room type not found!")));
        }

        // Update other fields
        if (room.getPrice() != null && room.getPrice() > 0) {
            existingRoom.setPrice(room.getPrice());
        }
        if (room.getStatus() != null) {
            existingRoom.setStatus(room.getStatus());
        }

        roomRepository.save(existingRoom);
        return "Room updated successfully!";
    }

    @Override
    public String deleteRoom(Long roomId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found with ID: " + roomId));
        roomRepository.delete(room);
        return "Room deleted successfully!";
    }

    private RoomDto mapToDto(Room room) {
        return RoomDto.builder()
                .roomId(room.getRoomId())
                .roomType(room.getRoomType())
                .price(room.getPrice())
                .status(room.getStatus())
                .build();
    }
}
