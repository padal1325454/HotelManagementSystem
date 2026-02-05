package com.hms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hms.models.Guest;
import com.hms.models.User;
@Repository
public interface GuestRepository extends JpaRepository<Guest, Long> {
	Guest findByUser(User user);
}
