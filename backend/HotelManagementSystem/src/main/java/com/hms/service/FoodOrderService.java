package com.hms.service;

import com.hms.models.FoodOrder;
import com.hms.dto.CompleteFoodOrderDto;
import com.hms.dto.FoodOrderDto;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface FoodOrderService {
    String addFoodOrder(FoodOrder foodOrder);
    List<FoodOrderDto> getAllFoodOrders();
    FoodOrderDto getFoodOrderById(Long orderId);
    String updateFoodOrder(Long orderId, FoodOrder foodOrder);
    String deleteFoodOrder(Long orderId);
    String placeCompleteOrder(CompleteFoodOrderDto orderDto);

}
