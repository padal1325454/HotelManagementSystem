package com.hms.models;

import com.hms.enums.TaskStatus;

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
public class Housekeeping {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long housekeepingId;

    @OneToOne
    @JoinColumn(name = "room_id", nullable = false) // Ensures valid foreign key relationship
    private Room room;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = false) // Many-to-One relationship with Employee
    private Employee employee;

    @Enumerated(EnumType.STRING)
    private TaskStatus status; // ENUM: PENDING, COMPLETED
}
