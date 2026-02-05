package com.hms.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FeedbackDto {
    private Long feedbackId;
    private Long guestId;
    private Long bookingId;
    private Integer rating; // Between 1 and 5
    private String comments;
}
