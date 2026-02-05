package com.hms.dto;

import com.hms.models.RoomType;
import com.hms.enums.RoomStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RoomDto {
    private Long roomId;
    private RoomType roomType;
    private Double price;
    private RoomStatus status;
}
