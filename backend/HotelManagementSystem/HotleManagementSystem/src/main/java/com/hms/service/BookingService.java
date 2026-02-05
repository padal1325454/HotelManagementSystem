package com.hms.service;

import com.hms.models.Booking;
import com.hms.dto.BookingDto;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface BookingService {
    String addBooking(Booking booking);
    List<BookingDto> getAllBookings();
    BookingDto getBookingById(Long bookingId);
    String updateBooking(Long bookingId, Booking booking);
    String deleteBooking(Long bookingId);
}
