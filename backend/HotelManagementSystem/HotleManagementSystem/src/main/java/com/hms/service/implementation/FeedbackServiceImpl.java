package com.hms.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hms.models.Feedback;
import com.hms.repository.FeedbackRepository;
import com.hms.service.FeedbackService;
import com.hms.dto.FeedbackDto;
import com.hms.exceptions.ResourceNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FeedbackServiceImpl implements FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Override
    public String addFeedback(Feedback feedback) {
        if (feedback.getGuest() == null) {
            return "Guest information is mandatory!";
        }
        if (feedback.getBooking() == null) {
            return "Booking information is mandatory!";
        }
        if (feedback.getRating() == null || feedback.getRating() < 1 || feedback.getRating() > 5) {
            return "Rating must be between 1 and 5!";
        }
        feedbackRepository.save(feedback);
        return "Feedback added successfully!";
    }

    @Override
    public List<FeedbackDto> getAllFeedback() {
        List<Feedback> feedbackList = feedbackRepository.findAll();
        return feedbackList.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public FeedbackDto getFeedbackById(Long feedbackId) {
        Feedback feedback = feedbackRepository.findById(feedbackId)
                .orElseThrow(() -> new ResourceNotFoundException("Feedback not found with ID: " + feedbackId));
        return mapToDto(feedback);
    }

    @Override
    public String updateFeedback(Long feedbackId, Feedback feedback) {
        Feedback existingFeedback = feedbackRepository.findById(feedbackId)
                .orElseThrow(() -> new ResourceNotFoundException("Feedback not found with ID: " + feedbackId));

        if (feedback.getGuest() != null) {
            existingFeedback.setGuest(feedback.getGuest());
        }
        if (feedback.getBooking() != null) {
            existingFeedback.setBooking(feedback.getBooking());
        }
        if (feedback.getRating() != null && feedback.getRating() >= 1 && feedback.getRating() <= 5) {
            existingFeedback.setRating(feedback.getRating());
        }
        if (feedback.getComments() != null && !feedback.getComments().isEmpty()) {
            existingFeedback.setComments(feedback.getComments());
        }

        feedbackRepository.save(existingFeedback);
        return "Feedback updated successfully!";
    }

    @Override
    public String deleteFeedback(Long feedbackId) {
        Feedback feedback = feedbackRepository.findById(feedbackId)
                .orElseThrow(() -> new ResourceNotFoundException("Feedback not found with ID: " + feedbackId));
        feedbackRepository.delete(feedback);
        return "Feedback deleted successfully!";
    }

    private FeedbackDto mapToDto(Feedback feedback) {
        return FeedbackDto.builder()
                .feedbackId(feedback.getFeedbackId())
                .guestId(feedback.getGuest().getGuestId())
                .bookingId(feedback.getBooking().getBookingId())
                .rating(feedback.getRating())
                .comments(feedback.getComments())
                .build();
    }
}
