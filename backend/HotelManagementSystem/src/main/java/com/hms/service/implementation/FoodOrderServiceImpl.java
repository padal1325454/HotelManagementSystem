package com.hms.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hms.models.FoodOrder;
import com.hms.models.MenuItem;
import com.hms.models.OrderDetails;
import com.hms.repository.BookingRepository;
import com.hms.repository.FoodOrderRepository;
import com.hms.repository.GuestRepository;
import com.hms.repository.MenuItemRepository;
import com.hms.repository.OrderDetailsRepository;
import com.hms.service.FoodOrderService;

import jakarta.transaction.Transactional;

import com.hms.dto.CompleteFoodOrderDto;
import com.hms.dto.FoodOrderDto;
import com.hms.enums.OrderStatus;
import com.hms.exceptions.ResourceNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FoodOrderServiceImpl implements FoodOrderService {

    @Autowired
    private FoodOrderRepository foodOrderRepository;

    @Autowired
    private GuestRepository guestRepo;

    @Autowired
    private BookingRepository bookingRepo;
    @Autowired
    private OrderDetailsRepository orderDetailsRepository;

    @Autowired
    private MenuItemRepository menuItemRepository;

    @Autowired
    private GuestRepository guestRepository;

    @Autowired
    private BookingRepository bookingRepository;


    @Override
    public String addFoodOrder(FoodOrder foodOrder) {
        if (foodOrder.getGuest() == null || foodOrder.getBooking() == null)
            throw new IllegalArgumentException("Guest and Booking are required");

        guestRepo.findById(foodOrder.getGuest().getGuestId())
            .orElseThrow(() -> new ResourceNotFoundException("Invalid Guest"));

        bookingRepo.findById(foodOrder.getBooking().getBookingId())
            .orElseThrow(() -> new ResourceNotFoundException("Invalid Booking"));

        foodOrder.setTotalAmount(0.0); // Start with zero
        foodOrderRepository.save(foodOrder);
        return "Food Order created successfully";
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
        FoodOrder order = foodOrderRepository.findById(orderId)
            .orElseThrow(() -> new ResourceNotFoundException("Food Order not found"));
        
        if (!order.getStatus().equals(OrderStatus.PENDING)) {
            throw new IllegalStateException("Only PENDING orders can be deleted");
        }

        foodOrderRepository.delete(order);
        return "Food Order deleted successfully";
    }
    
    @Override
    public String placeCompleteOrder(CompleteFoodOrderDto dto) {
        if (dto.getGuestId() == null || dto.getBookingId() == null)
            throw new IllegalArgumentException("Guest ID and Booking ID must not be null");

        FoodOrder order = FoodOrder.builder()
            .guest(guestRepository.findById(dto.getGuestId())
                .orElseThrow(() -> new ResourceNotFoundException("Guest not found")))
            .booking(bookingRepository.findById(dto.getBookingId())
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found")))
            .status(dto.getStatus())
            .totalAmount(0.0)
            .build();
        
        foodOrderRepository.save(order);
        
        double total = 0;
        for (CompleteFoodOrderDto.OrderItemDto item : dto.getItems()) {
            MenuItem menu = menuItemRepository.findById(item.getMenuItemId()).orElseThrow();
            total += item.getQuantity() * menu.getPrice();
            orderDetailsRepository.save(OrderDetails.builder()
                .order(order)
                .menuItem(menu)
                .quantity(item.getQuantity())
                .build());
        }

        order.setTotalAmount(total);
        foodOrderRepository.save(order);

        return "Food order placed with " + dto.getItems().size() + " items.";
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
