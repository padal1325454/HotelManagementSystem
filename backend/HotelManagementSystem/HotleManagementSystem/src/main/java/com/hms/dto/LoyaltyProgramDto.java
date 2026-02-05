package com.hms.dto;

import com.hms.enums.MembershipLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoyaltyProgramDto {
    private Long loyaltyId;
    private Long guestId;
    private Integer points;
    private MembershipLevel membershipLevel;
}
