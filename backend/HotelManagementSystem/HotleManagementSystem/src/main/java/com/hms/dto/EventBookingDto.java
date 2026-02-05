package com.hms.dto;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EventBookingDto {
    private Long eventId;
    private Long guestId;
    private Long roomId;
    private LocalDate eventDate;
    private String description;
}
