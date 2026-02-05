package com.hms.dto;

import com.hms.enums.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FoodOrderDto {
    private Long orderId;
    private Long guestId;
    private Long bookingId;
    private Double totalAmount;
    private OrderStatus status;
}
