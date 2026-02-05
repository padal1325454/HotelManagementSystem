package com.hms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.hms.models.Guest;
import com.hms.dto.GuestDto;
import com.hms.service.GuestService;

import java.util.List;

@RestController
@RequestMapping("/api/guests")
public class GuestController {

    @Autowired
    private GuestService guestService;

    // Add a new guest
    @PostMapping
    public ResponseEntity<String> addGuest(@RequestBody Guest guest) {
        String response = guestService.addGuest(guest);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Get all guests
    @GetMapping
    public ResponseEntity<List<GuestDto>> getAllGuests() {
        List<GuestDto> guests = guestService.getAllGuests();
        return new ResponseEntity<>(guests, HttpStatus.OK);
    }

    // Get a guest by ID
    @GetMapping("/{id}")
    public ResponseEntity<GuestDto> getGuestById(@PathVariable Long id) {
        GuestDto guest = guestService.getGuestById(id);
        return new ResponseEntity<>(guest, HttpStatus.OK);
    }

    // Update a guest
    @PutMapping("/{id}/update")
    public ResponseEntity<String> updateGuest(@PathVariable Long id, @RequestBody Guest guest) {
        String response = guestService.updateGuest(id, guest);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Delete a guest
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<String> deleteGuest(@PathVariable Long id) {
        String response = guestService.deleteGuest(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
