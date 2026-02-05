package com.hms.service;

import com.hms.models.BookingRoom;
import com.hms.dto.BookingRoomDto;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface BookingRoomService {
    String addBookingRoom(BookingRoom bookingRoom);
    List<BookingRoomDto> getAllBookingRooms();
    BookingRoomDto getBookingRoomById(Long bookingRoomId);
    String updateBookingRoom(Long bookingRoomId, BookingRoom bookingRoom);
    String deleteBookingRoom(Long bookingRoomId);
}
