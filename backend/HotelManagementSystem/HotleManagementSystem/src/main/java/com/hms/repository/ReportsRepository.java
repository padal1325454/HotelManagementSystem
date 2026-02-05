package com.hms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hms.models.Reports;
@Repository
public interface ReportsRepository extends JpaRepository<Reports, Integer> {

}
