package com.hms.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.models.FoodOrder;
import com.hms.models.MenuItem;
import com.hms.models.OrderDetails;
import com.hms.repository.FoodOrderRepository;
import com.hms.repository.MenuItemRepository;
import com.hms.repository.OrderDetailsRepository;
import com.hms.service.OrderDetailsService;
import com.hms.dto.OrderDetailsDto;
import com.hms.exceptions.ResourceNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderDetailsServiceImpl implements OrderDetailsService {

    @Autowired
    private OrderDetailsRepository orderDetailsRepository;

    @Autowired
    private MenuItemRepository menuItemRepository;
    
    @Autowired
    private FoodOrderRepository foodOrderRepository;

    @Override
    public String addOrderDetails(OrderDetails orderDetails) {
        if (orderDetails.getQuantity() <= 0) throw new IllegalArgumentException("Quantity must be greater than 0");

        MenuItem item = menuItemRepository.findById(orderDetails.getMenuItem().getMenuItemId())
                .orElseThrow(() -> new ResourceNotFoundException("Menu Item not found"));

        double lineTotal = item.getPrice() * orderDetails.getQuantity();

        FoodOrder order = orderDetails.getOrder();
        order.setTotalAmount(order.getTotalAmount() + lineTotal); // cumulative addition
        foodOrderRepository.save(order); // update total

        orderDetailsRepository.save(orderDetails);
        return "Order item added and total updated!";
    }


    @Override
    public List<OrderDetailsDto> getAllOrderDetails() {
        List<OrderDetails> orderDetailsList = orderDetailsRepository.findAll();
        return orderDetailsList.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public OrderDetailsDto getOrderDetailsById(Long orderDetailId) {
        OrderDetails orderDetails = orderDetailsRepository.findById(orderDetailId)
                .orElseThrow(() -> new ResourceNotFoundException("Order details not found with ID: " + orderDetailId));
        return mapToDto(orderDetails);
    }

    @Override
    public String updateOrderDetails(Long orderDetailId, OrderDetails orderDetails) {
        OrderDetails existingOrderDetails = orderDetailsRepository.findById(orderDetailId)
                .orElseThrow(() -> new ResourceNotFoundException("Order details not found with ID: " + orderDetailId));

        if (orderDetails.getOrder() != null) {
            existingOrderDetails.setOrder(orderDetails.getOrder());
        }
        if (orderDetails.getMenuItem() != null) {
            existingOrderDetails.setMenuItem(orderDetails.getMenuItem());
        }
        if (orderDetails.getQuantity() != null) {
            existingOrderDetails.setQuantity(orderDetails.getQuantity());
        }

        orderDetailsRepository.save(existingOrderDetails);
        return "Order details updated successfully!";
    }

    @Override
    public String deleteOrderDetails(Long orderDetailId) {
        OrderDetails orderDetails = orderDetailsRepository.findById(orderDetailId)
                .orElseThrow(() -> new ResourceNotFoundException("Order details not found with ID: " + orderDetailId));
        orderDetailsRepository.delete(orderDetails);
        return "Order details deleted successfully!";
    }

    private OrderDetailsDto mapToDto(OrderDetails orderDetails) {
        return OrderDetailsDto.builder()
                .orderDetailId(orderDetails.getOrderDetailId())
                .orderId(orderDetails.getOrder().getOrderId())
                .menuItemId(orderDetails.getMenuItem().getMenuItemId())
                .quantity(orderDetails.getQuantity())
                .build();
    }
}
