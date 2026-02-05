package com.hms.service;

import com.hms.models.Booking;
import com.hms.dto.BookingDto;
import com.hms.dto.ExistingGuestBookingRequestDto;
import com.hms.dto.GuestDto;
import com.hms.dto.NewGuestBookingRequest;

import java.util.List;

public interface BookingService {
    BookingDto addBooking(Booking booking);
    List<BookingDto> getAllBookings();
    BookingDto getBookingById(Long bookingId);
    BookingDto updateBooking(Long bookingId, Booking booking);
    String deleteBooking(Long bookingId);
    BookingDto createBookingForNewGuest(NewGuestBookingRequest request);
    GuestDto getGuestByEmail(String email);
	BookingDto createBookingForExistingGuest(ExistingGuestBookingRequestDto request);
}