package com.hms.service;

import com.hms.models.Payment;
import com.hms.dto.PaymentDto;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface PaymentService {
    String addPayment(Payment payment);
    List<PaymentDto> getAllPayments();
    PaymentDto getPaymentById(Long paymentId);
    String updatePayment(Long paymentId, Payment payment);
    String deletePayment(Long paymentId);
}
