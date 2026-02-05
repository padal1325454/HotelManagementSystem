package com.hms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.hms.models.Booking;
import com.hms.dto.BookingDto;
import com.hms.service.BookingService;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    // Add a new booking
    @PostMapping
    public ResponseEntity<String> addBooking(@RequestBody Booking booking) {
        String response = bookingService.addBooking(booking);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Get all bookings
    @GetMapping
    public ResponseEntity<List<BookingDto>> getAllBookings() {
        List<BookingDto> bookings = bookingService.getAllBookings();
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }

    // Get a booking by ID
    @GetMapping("/{id}")
    public ResponseEntity<BookingDto> getBookingById(@PathVariable Long id) {
        BookingDto booking = bookingService.getBookingById(id);
        return new ResponseEntity<>(booking, HttpStatus.OK);
    }

    // Update a booking
    @PutMapping("/{id}/update")
    public ResponseEntity<String> updateBooking(@PathVariable Long id, @RequestBody Booking booking) {
        String response = bookingService.updateBooking(id, booking);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Delete a booking
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<String> deleteBooking(@PathVariable Long id) {
        String response = bookingService.deleteBooking(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
