package com.hms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.hms.models.OrderDetails;
import com.hms.dto.OrderDetailsDto;
import com.hms.service.OrderDetailsService;

import java.util.List;

@RestController
@RequestMapping("/api/orderdetails")
public class OrderDetailsController {

    @Autowired
    private OrderDetailsService orderDetailsService;

    // Add a new order detail
    @PostMapping
    public ResponseEntity<String> addOrderDetails(@RequestBody OrderDetails orderDetails) {
        String response = orderDetailsService.addOrderDetails(orderDetails);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Get all order details
    @GetMapping
    public ResponseEntity<List<OrderDetailsDto>> getAllOrderDetails() {
        List<OrderDetailsDto> orderDetails = orderDetailsService.getAllOrderDetails();
        return new ResponseEntity<>(orderDetails, HttpStatus.OK);
    }

    // Get order details by ID
    @GetMapping("/{id}")
    public ResponseEntity<OrderDetailsDto> getOrderDetailsById(@PathVariable Long id) {
        OrderDetailsDto orderDetails = orderDetailsService.getOrderDetailsById(id);
        return new ResponseEntity<>(orderDetails, HttpStatus.OK);
    }

    // Update order details
    @PutMapping("/{id}/update")
    public ResponseEntity<String> updateOrderDetails(@PathVariable Long id, @RequestBody OrderDetails orderDetails) {
        String response = orderDetailsService.updateOrderDetails(id, orderDetails);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Delete order details
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<String> deleteOrderDetails(@PathVariable Long id) {
        String response = orderDetailsService.deleteOrderDetails(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
