package com.hms.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RoomTypeDto {
    private Long roomTypeId;
    private String name;
    private String description;
    private Integer maxOccupancy;
}
