package com.hms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hms.models.Feedback;
@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

}
