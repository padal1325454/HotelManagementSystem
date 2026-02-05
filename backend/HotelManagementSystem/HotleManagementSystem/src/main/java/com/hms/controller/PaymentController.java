package com.hms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.hms.models.Payment;
import com.hms.dto.PaymentDto;
import com.hms.service.PaymentService;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    // Add a new payment
    @PostMapping
    public ResponseEntity<String> addPayment(@RequestBody Payment payment) {
        String response = paymentService.addPayment(payment);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Get all payments
    @GetMapping
    public ResponseEntity<List<PaymentDto>> getAllPayments() {
        List<PaymentDto> payments = paymentService.getAllPayments();
        return new ResponseEntity<>(payments, HttpStatus.OK);
    }

    // Get a payment by ID
    @GetMapping("/{id}")
    public ResponseEntity<PaymentDto> getPaymentById(@PathVariable Long id) {
        PaymentDto payment = paymentService.getPaymentById(id);
        return new ResponseEntity<>(payment, HttpStatus.OK);
    }

    // Update a payment
    @PutMapping("/{id}/update")
    public ResponseEntity<String> updatePayment(@PathVariable Long id, @RequestBody Payment payment) {
        String response = paymentService.updatePayment(id, payment);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Delete a payment
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<String> deletePayment(@PathVariable Long id) {
        String response = paymentService.deletePayment(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
