package com.hms.service;

import com.hms.models.Guest;
import com.hms.dto.GuestDto;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface GuestService {
    String addGuest(Guest guest);
    List<GuestDto> getAllGuests();
    GuestDto getGuestById(Long guestId);
    String updateGuest(Long guestId, Guest guest);
    String deleteGuest(Long guestId);
}
