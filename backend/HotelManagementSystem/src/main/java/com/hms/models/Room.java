package com.hms.models;

import com.hms.enums.RoomStatus;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomId;

    @ManyToOne
    @JoinColumn(name = "roomTypeId", nullable = false)
    private RoomType roomType; // Many-to-One relationship with RoomType

    private Double price;

    @Enumerated(EnumType.STRING)
    private RoomStatus status; // ENUM: Available, Occupied, Maintenance, Cleaning
}
