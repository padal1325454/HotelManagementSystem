package com.hms.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderDetailsDto {
    private Long orderDetailId;
    private Long orderId;
    private Long menuItemId;
    private Integer quantity;
}
