package com.hms.service;

import com.hms.models.EventBooking;
import com.hms.dto.EventBookingDto;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface EventBookingService {
    String addEventBooking(EventBooking eventBooking);
    List<EventBookingDto> getAllEventBookings();
    EventBookingDto getEventBookingById(Long eventId);
    String updateEventBooking(Long eventId, EventBooking eventBooking);
    String deleteEventBooking(Long eventId);
}
