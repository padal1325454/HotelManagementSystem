package com.hms.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hms.models.Booking;
import com.hms.repository.BookingRepository;
import com.hms.service.BookingService;
import com.hms.dto.BookingDto;
import com.hms.exceptions.ResourceNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingServiceImpl implements BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Override
    public String addBooking(Booking booking) {
        if (booking.getGuest() == null) {
            return "Guest information is mandatory!";
        }
        if (booking.getCheckIn() == null || booking.getCheckOut() == null) {
            return "Check-in and check-out dates are mandatory!";
        }
        bookingRepository.save(booking);
        return "Booking added successfully!";
    }

    @Override
    public List<BookingDto> getAllBookings() {
        List<Booking> bookings = bookingRepository.findAll();
        return bookings.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public BookingDto getBookingById(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + bookingId));
        return mapToDto(booking);
    }

    @Override
    public String updateBooking(Long bookingId, Booking booking) {
        Booking existingBooking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + bookingId));

        if (booking.getGuest() != null) {
            existingBooking.setGuest(booking.getGuest());
        }
        if (booking.getCheckIn() != null) {
            existingBooking.setCheckIn(booking.getCheckIn());
        }
        if (booking.getCheckOut() != null) {
            existingBooking.setCheckOut(booking.getCheckOut());
        }
        if (booking.getStatus() != null) {
            existingBooking.setStatus(booking.getStatus());
        }

        bookingRepository.save(existingBooking);
        return "Booking updated successfully!";
    }

    @Override
    public String deleteBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + bookingId));
        bookingRepository.delete(booking);
        return "Booking deleted successfully!";
    }

    private BookingDto mapToDto(Booking booking) {
        return BookingDto.builder()
                .bookingId(booking.getBookingId())
                .guestId(booking.getGuest().getGuestId())
                .checkIn(booking.getCheckIn())
                .checkOut(booking.getCheckOut())
                .status(booking.getStatus())
                .build();
    }
}
