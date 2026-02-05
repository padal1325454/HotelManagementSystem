package com.hms.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hms.models.Guest;
import com.hms.repository.GuestRepository;
import com.hms.repository.UserRepository;
import com.hms.service.GuestService;
import com.hms.dto.GuestDto;
import com.hms.exceptions.ResourceNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GuestServiceImpl implements GuestService {

    @Autowired
    private GuestRepository guestRepository;

    @Override
    public String addGuest(Guest guest) {
        if (guest.getContactInfo() == null || guest.getContactInfo().isEmpty()) {
            return "Contact information is mandatory!";
        }
        guestRepository.save(guest);
        return "Guest added successfully!";
    }

    @Override
    public List<GuestDto> getAllGuests() {
        List<Guest> guests = guestRepository.findAll();
        return guests.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public GuestDto getGuestById(Long guestId) {
        Guest guest = guestRepository.findById(guestId)
                .orElseThrow(() -> new ResourceNotFoundException("Guest not found with ID: " + guestId));
        return mapToDto(guest);
    }

    @Override
    public String updateGuest(Long guestId, Guest guest) {
        Guest existingGuest = guestRepository.findById(guestId)
                .orElseThrow(() -> new ResourceNotFoundException("Guest not found with ID: " + guestId));

        if (guest.getUser() != null) {
            existingGuest.setUser(guest.getUser());
        }
        if (guest.getContactInfo() != null && !guest.getContactInfo().isEmpty()) {
            existingGuest.setContactInfo(guest.getContactInfo());
        }
        if (guest.getAddress() != null && !guest.getAddress().isEmpty()) {
            existingGuest.setAddress(guest.getAddress());
        }

        guestRepository.save(existingGuest);
        return "Guest updated successfully!";
    }

    @Override
    public String deleteGuest(Long guestId) {
        Guest guest = guestRepository.findById(guestId)
                .orElseThrow(() -> new ResourceNotFoundException("Guest not found with ID: " + guestId));
        guestRepository.delete(guest);
        return "Guest deleted successfully!";
    }

    private GuestDto mapToDto(Guest guest) {
    
        return GuestDto.builder()
                .guestId(guest.getGuestId())
                .name(guest.getUser().getName())
                .contactInfo(guest.getContactInfo())
                .address(guest.getAddress())
                .build();
    }
}
