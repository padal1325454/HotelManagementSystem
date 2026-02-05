package com.hms.dto;

import java.time.LocalDate;
import com.hms.enums.BookingStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BookingDto {
    private Long bookingId;
    private String guestName;
    private Long roomId;
    private String roomType; // Add this field
    private LocalDate checkIn;
    private LocalDate checkOut;
    private BookingStatus status;
}
