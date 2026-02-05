package com.hms.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hms.models.FoodOrder;
import com.hms.repository.FoodOrderRepository;
import com.hms.service.FoodOrderService;
import com.hms.dto.FoodOrderDto;
import com.hms.exceptions.ResourceNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FoodOrderServiceImpl implements FoodOrderService {

    @Autowired
    private FoodOrderRepository foodOrderRepository;

    @Override
    public String addFoodOrder(FoodOrder foodOrder) {
        foodOrderRepository.save(foodOrder);
        return "Food order added successfully!";
    }

    @Override
    public List<FoodOrderDto> getAllFoodOrders() {
        List<FoodOrder> foodOrders = foodOrderRepository.findAll();
        return foodOrders.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public FoodOrderDto getFoodOrderById(Long orderId) {
        FoodOrder foodOrder = foodOrderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Food order not found with ID: " + orderId));
        return mapToDto(foodOrder);
    }

    @Override
    public String updateFoodOrder(Long orderId, FoodOrder foodOrder) {
        FoodOrder existingFoodOrder = foodOrderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Food order not found with ID: " + orderId));

        if (foodOrder.getGuest() != null) {
            existingFoodOrder.setGuest(foodOrder.getGuest());
        }
        if (foodOrder.getBooking() != null) {
            existingFoodOrder.setBooking(foodOrder.getBooking());
        }
        if (foodOrder.getTotalAmount() != null && foodOrder.getTotalAmount() > 0) {
            existingFoodOrder.setTotalAmount(foodOrder.getTotalAmount());
        }
        if (foodOrder.getStatus() != null) {
            existingFoodOrder.setStatus(foodOrder.getStatus());
        }

        foodOrderRepository.save(existingFoodOrder);
        return "Food order updated successfully!";
    }

    @Override
    public String deleteFoodOrder(Long orderId) {
        FoodOrder foodOrder = foodOrderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Food order not found with ID: " + orderId));
        foodOrderRepository.delete(foodOrder);
        return "Food order deleted successfully!";
    }

    private FoodOrderDto mapToDto(FoodOrder foodOrder) {
        return FoodOrderDto.builder()
                .orderId(foodOrder.getOrderId())
                .guestId(foodOrder.getGuest().getGuestId())
                .bookingId(foodOrder.getBooking().getBookingId())
                .totalAmount(foodOrder.getTotalAmount())
                .status(foodOrder.getStatus())
                .build();
    }
}
