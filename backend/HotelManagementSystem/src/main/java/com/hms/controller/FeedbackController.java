package com.hms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.hms.models.Feedback;
import com.hms.dto.FeedbackDto;
import com.hms.service.FeedbackService;

import java.util.List;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    // Add a new feedback
    @PostMapping
    public ResponseEntity<String> addFeedback(@RequestBody Feedback feedback) {
        String response = feedbackService.addFeedback(feedback);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Get all feedback
    @GetMapping
    public ResponseEntity<List<FeedbackDto>> getAllFeedback() {
        List<FeedbackDto> feedback = feedbackService.getAllFeedback();
        return new ResponseEntity<>(feedback, HttpStatus.OK);
    }

    // Get feedback by ID
    @GetMapping("/{id}")
    public ResponseEntity<FeedbackDto> getFeedbackById(@PathVariable Long id) {
        FeedbackDto feedback = feedbackService.getFeedbackById(id);
        return new ResponseEntity<>(feedback, HttpStatus.OK);
    }

    // Update feedback
    @PutMapping("/{id}/update")
    public ResponseEntity<String> updateFeedback(@PathVariable Long id, @RequestBody Feedback feedback) {
        String response = feedbackService.updateFeedback(id, feedback);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Delete feedback
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<String> deleteFeedback(@PathVariable Long id) {
        String response = feedbackService.deleteFeedback(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
