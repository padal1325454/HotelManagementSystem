package com.hms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hms.models.Maintenance;
@Repository
public interface MaintenanceRepository extends JpaRepository<Maintenance, Integer> {

}
