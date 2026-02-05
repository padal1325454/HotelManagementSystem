package com.hms.dto;

import java.time.LocalDate;
import com.hms.enums.BookingStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookingDto {
    private Long bookingId;
    private Long guestId;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private BookingStatus status;
}
