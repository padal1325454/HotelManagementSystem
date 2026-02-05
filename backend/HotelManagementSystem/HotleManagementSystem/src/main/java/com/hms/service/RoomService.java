package com.hms.service;

import com.hms.models.Room;
import com.hms.dto.RoomDto;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface RoomService {
    String addRoom(Room room);
    List<RoomDto> getAllRooms();
    RoomDto getRoomById(Long roomId);
    String updateRoom(Long roomId, Room room);
    String deleteRoom(Long roomId);
}
