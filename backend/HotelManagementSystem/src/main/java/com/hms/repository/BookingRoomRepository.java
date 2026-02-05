package com.hms.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hms.models.Booking;
import com.hms.models.BookingRoom;
@Repository
public interface BookingRoomRepository extends JpaRepository<BookingRoom, Long> {
	List<BookingRoom> findByBooking(Booking booking);
}
