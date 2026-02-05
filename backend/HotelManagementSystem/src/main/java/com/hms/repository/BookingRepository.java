package com.hms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hms.models.Booking;
import com.hms.models.Guest;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long>{
	Booking findByGuest_User_Email(String email);
}
