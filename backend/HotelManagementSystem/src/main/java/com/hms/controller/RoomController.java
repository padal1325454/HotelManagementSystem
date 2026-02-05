package com.hms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.hms.models.Room;
import com.hms.dto.RoomDto;
import com.hms.service.RoomService;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    // Add a new room
    @PostMapping
    public ResponseEntity<String> addRoom(@RequestBody Room room) {
        String response = roomService.addRoom(room);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Get all rooms
    @GetMapping
    public ResponseEntity<List<RoomDto>> getAllRooms() {
        List<RoomDto> rooms = roomService.getAllRooms();
        return new ResponseEntity<>(rooms, HttpStatus.OK);
    }

    // Get a room by ID
    @GetMapping("/{id}")
    public ResponseEntity<RoomDto> getRoomById(@PathVariable Long id) {
        RoomDto room = roomService.getRoomById(id);
        return new ResponseEntity<>(room, HttpStatus.OK);
    }

    // Update a room
    @PutMapping("/{id}/update")
    public ResponseEntity<String> updateRoom(@PathVariable Long id, @RequestBody Room room) {
        String response = roomService.updateRoom(id, room);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Delete a room
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<String> deleteRoom(@PathVariable Long id) {
        String response = roomService.deleteRoom(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
