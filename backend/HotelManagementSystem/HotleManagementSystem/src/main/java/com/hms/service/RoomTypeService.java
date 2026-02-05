package com.hms.service;

import com.hms.models.RoomType;
import com.hms.dto.RoomTypeDto;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface RoomTypeService {
    String addRoomType(RoomType roomType);
    List<RoomTypeDto> getAllRoomTypes();
    RoomTypeDto getRoomTypeById(Long roomTypeId);
    String updateRoomType(Long roomTypeId, RoomType roomType);
    String deleteRoomType(Long roomTypeId);
}
