package com.hms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.hms.models.RoomType;
import com.hms.dto.RoomTypeDto;
import com.hms.service.RoomTypeService;

import java.util.List;

@RestController
@RequestMapping("/api/roomtypes")
public class RoomTypeController {

    @Autowired
    private RoomTypeService roomTypeService;

    // Add a new room type
    @PostMapping
    public ResponseEntity<String> addRoomType(@RequestBody RoomType roomType) {
        String response = roomTypeService.addRoomType(roomType);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Get all room types
    @GetMapping
    public ResponseEntity<List<RoomTypeDto>> getAllRoomTypes() {
        List<RoomTypeDto> roomTypes = roomTypeService.getAllRoomTypes();
        return new ResponseEntity<>(roomTypes, HttpStatus.OK);
    }

    // Get a room type by ID
    @GetMapping("/{id}")
    public ResponseEntity<RoomTypeDto> getRoomTypeById(@PathVariable Long id) {
        RoomTypeDto roomType = roomTypeService.getRoomTypeById(id);
        return new ResponseEntity<>(roomType, HttpStatus.OK);
    }

    // Update a room type
    @PutMapping("/{id}/update")
    public ResponseEntity<String> updateRoomType(@PathVariable Long id, @RequestBody RoomType roomType) {
        String response = roomTypeService.updateRoomType(id, roomType);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Delete a room type
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<String> deleteRoomType(@PathVariable Long id) {
        String response = roomTypeService.deleteRoomType(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
