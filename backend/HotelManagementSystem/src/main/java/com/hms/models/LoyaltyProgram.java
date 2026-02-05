package com.hms.models;

import com.hms.enums.MembershipLevel;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoyaltyProgram {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long loyaltyId;

    @ManyToMany
    @JoinTable(
        name = "guest_loyalty_program",
        joinColumns = @JoinColumn(name = "loyalty_program_id"),
        inverseJoinColumns = @JoinColumn(name = "guest_id")
    )
    private List<Guest> guests;

    private Integer points;

    @Enumerated(EnumType.STRING)
    private MembershipLevel membershipLevel; // ENUM: Silver, Gold, Platinum
}
