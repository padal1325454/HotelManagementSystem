package com.hms.service;

import com.hms.models.LoyaltyProgram;
import com.hms.dto.LoyaltyProgramDto;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface LoyaltyProgramService {
    String addLoyaltyProgram(LoyaltyProgram loyaltyProgram);
    List<LoyaltyProgramDto> getAllLoyaltyPrograms();
    LoyaltyProgramDto getLoyaltyProgramById(Long loyaltyId);
    String updateLoyaltyProgram(Long loyaltyId, LoyaltyProgram loyaltyProgram);
    String deleteLoyaltyProgram(Long loyaltyId);
}
