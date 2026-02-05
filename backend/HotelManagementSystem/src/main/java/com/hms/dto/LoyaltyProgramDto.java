package com.hms.dto;

import com.hms.enums.MembershipLevel;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class LoyaltyProgramDto {
    private Long loyaltyId;
    private List<Long> guestIds; // Update to include guestIds
    private Integer points;
    private MembershipLevel membershipLevel;
}
