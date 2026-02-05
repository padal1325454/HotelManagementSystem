package com.hms.service;

import com.hms.models.OrderDetails;
import com.hms.dto.OrderDetailsDto;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface OrderDetailsService {
    String addOrderDetails(OrderDetails orderDetails);
    List<OrderDetailsDto> getAllOrderDetails();
    OrderDetailsDto getOrderDetailsById(Long orderDetailId);
    String updateOrderDetails(Long orderDetailId, OrderDetails orderDetails);
    String deleteOrderDetails(Long orderDetailId);
}
