package com.hms.dto;

import com.hms.enums.PaymentMethod;
import com.hms.enums.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaymentDto {
    private Long paymentId;
    private Long bookingId;
    private Double amount;
    private PaymentMethod method;
    private PaymentStatus status;
}
