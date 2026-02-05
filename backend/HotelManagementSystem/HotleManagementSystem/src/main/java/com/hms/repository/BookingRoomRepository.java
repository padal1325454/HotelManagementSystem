package com.hms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hms.models.BookingRoom;
@Repository
public interface BookingRoomRepository extends JpaRepository<BookingRoom, Integer> {

}
