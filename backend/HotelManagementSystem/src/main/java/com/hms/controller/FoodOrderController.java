package com.hms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.hms.models.FoodOrder;
import com.hms.dto.CompleteFoodOrderDto;
import com.hms.dto.FoodOrderDto;
import com.hms.service.FoodOrderService;

import java.util.List;

@RestController
@RequestMapping("/api/foodorders")
public class FoodOrderController {

    @Autowired
    private FoodOrderService foodOrderService;

    // Add a new food order
    @PostMapping
    public ResponseEntity<String> addFoodOrder(@RequestBody FoodOrder foodOrder) {
        String response = foodOrderService.addFoodOrder(foodOrder);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Get all food orders
    @GetMapping
    public ResponseEntity<List<FoodOrderDto>> getAllFoodOrders() {
        List<FoodOrderDto> foodOrders = foodOrderService.getAllFoodOrders();
        return new ResponseEntity<>(foodOrders, HttpStatus.OK);
    }
    
    @PostMapping("/complete")
    public ResponseEntity<String> placeCompleteOrder(@RequestBody CompleteFoodOrderDto orderDto) {
        String response = foodOrderService.placeCompleteOrder(orderDto);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    
    // Get a food order by ID
    @GetMapping("/{id}")
    public ResponseEntity<FoodOrderDto> getFoodOrderById(@PathVariable Long id) {
        FoodOrderDto foodOrder = foodOrderService.getFoodOrderById(id);
        return new ResponseEntity<>(foodOrder, HttpStatus.OK);
    }

    // Update a food order
    @PutMapping("/{id}/update")
    public ResponseEntity<String> updateFoodOrder(@PathVariable Long id, @RequestBody FoodOrder foodOrder) {
        String response = foodOrderService.updateFoodOrder(id, foodOrder);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Delete a food order
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<String> deleteFoodOrder(@PathVariable Long id) {
        String response = foodOrderService.deleteFoodOrder(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
