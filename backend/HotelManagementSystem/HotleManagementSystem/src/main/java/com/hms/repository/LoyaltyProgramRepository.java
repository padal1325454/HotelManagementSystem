package com.hms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hms.models.LoyaltyProgram;
@Repository
public interface LoyaltyProgramRepository extends JpaRepository<LoyaltyProgram, Integer> {

}
