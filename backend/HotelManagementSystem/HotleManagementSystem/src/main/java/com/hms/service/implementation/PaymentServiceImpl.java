package com.hms.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hms.models.Payment;
import com.hms.repository.PaymentRepository;
import com.hms.service.PaymentService;
import com.hms.dto.PaymentDto;
import com.hms.exceptions.ResourceNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Override
    public String addPayment(Payment payment) {
        if (payment.getBooking() == null) {
            return "Booking is mandatory!";
        }
        if (payment.getAmount() == null || payment.getAmount() <= 0) {
            return "Amount must be greater than zero!";
        }
        paymentRepository.save(payment);
        return "Payment added successfully!";
    }

    @Override
    public List<PaymentDto> getAllPayments() {
        List<Payment> payments = paymentRepository.findAll();
        return payments.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public PaymentDto getPaymentById(Long paymentId) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found with ID: " + paymentId));
        return mapToDto(payment);
    }

    @Override
    public String updatePayment(Long paymentId, Payment payment) {
        Payment existingPayment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found with ID: " + paymentId));

        if (payment.getBooking() != null) {
            existingPayment.setBooking(payment.getBooking());
        }
        if (payment.getAmount() != null && payment.getAmount() > 0) {
            existingPayment.setAmount(payment.getAmount());
        }
        if (payment.getMethod() != null) {
            existingPayment.setMethod(payment.getMethod());
        }
        if (payment.getStatus() != null) {
            existingPayment.setStatus(payment.getStatus());
        }

        paymentRepository.save(existingPayment);
        return "Payment updated successfully!";
    }

    @Override
    public String deletePayment(Long paymentId) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found with ID: " + paymentId));
        paymentRepository.delete(payment);
        return "Payment deleted successfully!";
    }

    private PaymentDto mapToDto(Payment payment) {
        return PaymentDto.builder()
                .paymentId(payment.getPaymentId())
                .bookingId(payment.getBooking().getBookingId())
                .amount(payment.getAmount())
                .method(payment.getMethod())
                .status(payment.getStatus())
                .build();
    }
}
