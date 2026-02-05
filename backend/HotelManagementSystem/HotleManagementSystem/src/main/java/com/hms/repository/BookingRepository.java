package com.hms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hms.models.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer>{

}
