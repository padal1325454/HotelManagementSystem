package com.hms.service;

import com.hms.models.Feedback;
import com.hms.dto.FeedbackDto;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface FeedbackService {
    String addFeedback(Feedback feedback);
    List<FeedbackDto> getAllFeedback();
    FeedbackDto getFeedbackById(Long feedbackId);
    String updateFeedback(Long feedbackId, Feedback feedback);
    String deleteFeedback(Long feedbackId);
}
