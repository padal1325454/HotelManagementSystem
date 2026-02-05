package com.hms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.hms.models.Booking;
import com.hms.dto.BookingDto;
import com.hms.dto.ExistingGuestBookingRequestDto;
import com.hms.dto.GuestDto;
import com.hms.dto.NewGuestBookingRequest;
import com.hms.service.BookingService;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public ResponseEntity<BookingDto> addBooking(@RequestBody Booking booking) {
        BookingDto response = bookingService.addBooking(booking);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<BookingDto>> getAllBookings() {
        List<BookingDto> bookings = bookingService.getAllBookings();
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookingDto> getBookingById(@PathVariable Long id) {
        BookingDto booking = bookingService.getBookingById(id);
        return new ResponseEntity<>(booking, HttpStatus.OK);
    }

    @PutMapping("/{id}/update")
    public ResponseEntity<BookingDto> updateBooking(@PathVariable Long id, @RequestBody Booking booking) {
        BookingDto response = bookingService.updateBooking(id, booking);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBooking(@PathVariable Long id) {
        String response = bookingService.deleteBooking(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/new-guest-booking")
    public ResponseEntity<BookingDto> createBookingForNewGuest(@RequestBody NewGuestBookingRequest request) {
        BookingDto response = bookingService.createBookingForNewGuest(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    
    @PostMapping("/existing-guest-booking")
    public ResponseEntity<BookingDto> createBookingForExistingGuest(@RequestBody ExistingGuestBookingRequestDto request) {
        BookingDto response = bookingService.createBookingForExistingGuest(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

}