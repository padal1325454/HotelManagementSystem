package com.hms.dto;

import java.time.LocalDate;

import com.hms.enums.BookingStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NewGuestBookingRequest {
    private String guestName;
    private String guestEmail;
    private String contactInfo;
    private String address;
    private BookingStatus status;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private Long roomId;
}


