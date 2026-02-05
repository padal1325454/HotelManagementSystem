package com.hms.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.models.Booking;
import com.hms.models.Payment;
import com.hms.repository.BookingRepository;
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

    @Autowired
    private BookingRepository bookingRepository;

    @Override
    public String addPayment(Payment payment) {
        if (payment.getBooking() == null || payment.getBooking().getBookingId() == null) {
            return "Booking is mandatory!";
        }
        Booking booking = bookingRepository.findById(payment.getBooking().getBookingId())
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + payment.getBooking().getBookingId()));

        if (payment.getAmount() == null || payment.getAmount() <= 0) {
            return "Amount must be greater than zero!";
        }

        payment.setBooking(booking);
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
    public String updatePayment(Long paymentId, Payment updated) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found with ID: " + paymentId));

        if (updated.getAmount() != null && updated.getAmount() > 0) {
            payment.setAmount(updated.getAmount());
        }
        if (updated.getMethod() != null) {
            payment.setMethod(updated.getMethod());
        }
        if (updated.getStatus() != null) {
            payment.setStatus(updated.getStatus());
        }
        if (updated.getBooking() != null && updated.getBooking().getBookingId() != null) {
            Booking newBooking = bookingRepository.findById(updated.getBooking().getBookingId())
                    .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + updated.getBooking().getBookingId()));
            payment.setBooking(newBooking);
        }

        paymentRepository.save(payment);
        return "Payment updated successfully!";
    }

    @Override
    public String deletePayment(Long id) {
        Payment payment = paymentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Payment not found with ID: " + id));
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
