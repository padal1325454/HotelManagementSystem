package com.hms.dto;

import com.hms.enums.PaymentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InvoiceDto {
    private Long invoiceId;
    private Long bookingId;
    private Double totalAmount;
    private PaymentStatus paymentStatus;
}
