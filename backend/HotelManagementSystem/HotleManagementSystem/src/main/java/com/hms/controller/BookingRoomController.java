package com.hms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.hms.models.BookingRoom;
import com.hms.dto.BookingRoomDto;
import com.hms.service.BookingRoomService;

import java.util.List;

@RestController
@RequestMapping("/api/bookingrooms")
public class BookingRoomController {

    @Autowired
    private BookingRoomService bookingRoomService;

    // Add a new booking room
    @PostMapping
    public ResponseEntity<String> addBookingRoom(@RequestBody BookingRoom bookingRoom) {
        String response = bookingRoomService.addBookingRoom(bookingRoom);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Get all booking rooms
    @GetMapping
    public ResponseEntity<List<BookingRoomDto>> getAllBookingRooms() {
        List<BookingRoomDto> bookingRooms = bookingRoomService.getAllBookingRooms();
        return new ResponseEntity<>(bookingRooms, HttpStatus.OK);
    }

    // Get a booking room by ID
    @GetMapping("/{id}")
    public ResponseEntity<BookingRoomDto> getBookingRoomById(@PathVariable Long id) {
        BookingRoomDto bookingRoom = bookingRoomService.getBookingRoomById(id);
        return new ResponseEntity<>(bookingRoom, HttpStatus.OK);
    }

    // Update a booking room
    @PutMapping("/{id}/update")
    public ResponseEntity<String> updateBookingRoom(@PathVariable Long id, @RequestBody BookingRoom bookingRoom) {
        String response = bookingRoomService.updateBookingRoom(id, bookingRoom);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Delete a booking room
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<String> deleteBookingRoom(@PathVariable Long id) {
        String response = bookingRoomService.deleteBookingRoom(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
