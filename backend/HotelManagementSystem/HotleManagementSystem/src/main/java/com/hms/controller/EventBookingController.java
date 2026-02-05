package com.hms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.hms.models.EventBooking;
import com.hms.dto.EventBookingDto;
import com.hms.service.EventBookingService;

import java.util.List;

@RestController
@RequestMapping("/api/eventbookings")
public class EventBookingController {

    @Autowired
    private EventBookingService eventBookingService;

    // Add a new event booking
    @PostMapping
    public ResponseEntity<String> addEventBooking(@RequestBody EventBooking eventBooking) {
        String response = eventBookingService.addEventBooking(eventBooking);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Get all event bookings
    @GetMapping
    public ResponseEntity<List<EventBookingDto>> getAllEventBookings() {
        List<EventBookingDto> eventBookings = eventBookingService.getAllEventBookings();
        return new ResponseEntity<>(eventBookings, HttpStatus.OK);
    }

    // Get an event booking by ID
    @GetMapping("/{id}")
    public ResponseEntity<EventBookingDto> getEventBookingById(@PathVariable Long id) {
        EventBookingDto eventBooking = eventBookingService.getEventBookingById(id);
        return new ResponseEntity<>(eventBooking, HttpStatus.OK);
    }

    // Update an event booking
    @PutMapping("/{id}/update")
    public ResponseEntity<String> updateEventBooking(@PathVariable Long id, @RequestBody EventBooking eventBooking) {
        String response = eventBookingService.updateEventBooking(id, eventBooking);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Delete an event booking
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<String> deleteEventBooking(@PathVariable Long id) {
        String response = eventBookingService.deleteEventBooking(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
