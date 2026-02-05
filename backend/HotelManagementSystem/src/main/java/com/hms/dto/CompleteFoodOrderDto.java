package com.hms.dto;

import com.hms.enums.OrderStatus;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompleteFoodOrderDto {
    private Long guestId;
    private Long bookingId;
    private OrderStatus status;
    private List<OrderItemDto> items;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class OrderItemDto {
        private Long menuItemId;
        private Integer quantity;
    }
}
