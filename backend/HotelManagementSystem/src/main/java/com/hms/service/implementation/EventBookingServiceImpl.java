package com.hms.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hms.models.EventBooking;
import com.hms.repository.EventBookingRepository;
import com.hms.service.EventBookingService;
import com.hms.dto.EventBookingDto;
import com.hms.exceptions.ResourceNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EventBookingServiceImpl implements EventBookingService {

    @Autowired
    private EventBookingRepository eventBookingRepository;

    @Override
    public String addEventBooking(EventBooking eventBooking) {
        if (eventBooking.getGuest() == null) {
            return "Guest is mandatory!";
        }
        if (eventBooking.getRoom() == null) {
            return "Room is mandatory!";
        }
        if (eventBooking.getEventDate() == null) {
            return "Event date is mandatory!";
        }
        eventBookingRepository.save(eventBooking);
        return "Event booking added successfully!";
    }

    @Override
    public List<EventBookingDto> getAllEventBookings() {
        List<EventBooking> eventBookings = eventBookingRepository.findAll();
        return eventBookings.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public EventBookingDto getEventBookingById(Long eventId) {
        EventBooking eventBooking = eventBookingRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event booking not found with ID: " + eventId));
        return mapToDto(eventBooking);
    }

    @Override
    public String updateEventBooking(Long eventId, EventBooking eventBooking) {
        EventBooking existingEventBooking = eventBookingRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event booking not found with ID: " + eventId));

        if (eventBooking.getGuest() != null) {
            existingEventBooking.setGuest(eventBooking.getGuest());
        }
        if (eventBooking.getRoom() != null) {
            existingEventBooking.setRoom(eventBooking.getRoom());
        }
        if (eventBooking.getEventDate() != null) {
            existingEventBooking.setEventDate(eventBooking.getEventDate());
        }
        if (eventBooking.getDescription() != null && !eventBooking.getDescription().isEmpty()) {
            existingEventBooking.setDescription(eventBooking.getDescription());
        }

        eventBookingRepository.save(existingEventBooking);
        return "Event booking updated successfully!";
    }

    @Override
    public String deleteEventBooking(Long eventId) {
        EventBooking eventBooking = eventBookingRepository.findById(eventId)
                .orElseThrow(() -> new ResourceNotFoundException("Event booking not found with ID: " + eventId));
        eventBookingRepository.delete(eventBooking);
        return "Event booking deleted successfully!";
    }

    private EventBookingDto mapToDto(EventBooking eventBooking) {
        return EventBookingDto.builder()
                .eventId(eventBooking.getEventId())
                .guestId(eventBooking.getGuest().getGuestId())
                .roomId(eventBooking.getRoom().getRoomId())
                .eventDate(eventBooking.getEventDate())
                .description(eventBooking.getDescription())
                .build();
    }
}
