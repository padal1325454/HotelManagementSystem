package com.hms.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hms.models.BookingRoom;
import com.hms.repository.BookingRoomRepository;
import com.hms.service.BookingRoomService;
import com.hms.dto.BookingRoomDto;
import com.hms.exceptions.ResourceNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingRoomServiceImpl implements BookingRoomService {

    @Autowired
    private BookingRoomRepository bookingRoomRepository;

    @Override
    public String addBookingRoom(BookingRoom bookingRoom) {
        bookingRoomRepository.save(bookingRoom);
        return "Booking room added successfully!";
    }

    @Override
    public List<BookingRoomDto> getAllBookingRooms() {
        List<BookingRoom> bookingRooms = bookingRoomRepository.findAll();
        return bookingRooms.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public BookingRoomDto getBookingRoomById(Long bookingRoomId) {
        BookingRoom bookingRoom = bookingRoomRepository.findById(bookingRoomId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking room not found with ID: " + bookingRoomId));
        return mapToDto(bookingRoom);
    }

    @Override
    public String updateBookingRoom(Long bookingRoomId, BookingRoom bookingRoom) {
        BookingRoom existingBookingRoom = bookingRoomRepository.findById(bookingRoomId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking room not found with ID: " + bookingRoomId));

        if (bookingRoom.getBooking() != null) {
            existingBookingRoom.setBooking(bookingRoom.getBooking());
        }
        if (bookingRoom.getRoom() != null) {
            existingBookingRoom.setRoom(bookingRoom.getRoom());
        }

        bookingRoomRepository.save(existingBookingRoom);
        return "Booking room updated successfully!";
    }

    @Override
    public String deleteBookingRoom(Long bookingRoomId) {
        BookingRoom bookingRoom = bookingRoomRepository.findById(bookingRoomId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking room not found with ID: " + bookingRoomId));
        bookingRoomRepository.delete(bookingRoom);
        return "Booking room deleted successfully!";
    }

    private BookingRoomDto mapToDto(BookingRoom bookingRoom) {
        return BookingRoomDto.builder()
                .bookingRoomId(bookingRoom.getBookingRoomId())
                .bookingId(bookingRoom.getBooking().getBookingId())
                .roomId(bookingRoom.getRoom().getRoomId())
                .build();
    }
}
