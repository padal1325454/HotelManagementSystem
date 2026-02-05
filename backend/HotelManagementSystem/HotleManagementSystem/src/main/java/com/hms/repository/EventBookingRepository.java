package com.hms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hms.models.EventBooking;
@Repository
public interface EventBookingRepository extends JpaRepository<EventBooking, Integer> {

}
