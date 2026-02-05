package com.hms.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hms.models.LoyaltyProgram;
import com.hms.repository.LoyaltyProgramRepository;
import com.hms.service.LoyaltyProgramService;
import com.hms.dto.LoyaltyProgramDto;
import com.hms.exceptions.ResourceNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LoyaltyProgramServiceImpl implements LoyaltyProgramService {

    @Autowired
    private LoyaltyProgramRepository loyaltyProgramRepository;

    @Override
    public String addLoyaltyProgram(LoyaltyProgram loyaltyProgram) {
        if (loyaltyProgram.getGuest() == null) {
            return "Guest is mandatory!";
        }
        loyaltyProgramRepository.save(loyaltyProgram);
        return "Loyalty program added successfully!";
    }

    @Override
    public List<LoyaltyProgramDto> getAllLoyaltyPrograms() {
        List<LoyaltyProgram> loyaltyPrograms = loyaltyProgramRepository.findAll();
        return loyaltyPrograms.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public LoyaltyProgramDto getLoyaltyProgramById(Long loyaltyId) {
        LoyaltyProgram loyaltyProgram = loyaltyProgramRepository.findById(loyaltyId)
                .orElseThrow(() -> new ResourceNotFoundException("Loyalty program not found with ID: " + loyaltyId));
        return mapToDto(loyaltyProgram);
    }

    @Override
    public String updateLoyaltyProgram(Long loyaltyId, LoyaltyProgram loyaltyProgram) {
        LoyaltyProgram existingLoyaltyProgram = loyaltyProgramRepository.findById(loyaltyId)
                .orElseThrow(() -> new ResourceNotFoundException("Loyalty program not found with ID: " + loyaltyId));

        if (loyaltyProgram.getGuest() != null) {
            existingLoyaltyProgram.setGuest(loyaltyProgram.getGuest());
        }
        if (loyaltyProgram.getPoints() != null) {
            existingLoyaltyProgram.setPoints(loyaltyProgram.getPoints());
        }
        if (loyaltyProgram.getMembershipLevel() != null) {
            existingLoyaltyProgram.setMembershipLevel(loyaltyProgram.getMembershipLevel());
        }

        loyaltyProgramRepository.save(existingLoyaltyProgram);
        return "Loyalty program updated successfully!";
    }

    @Override
    public String deleteLoyaltyProgram(Long loyaltyId) {
        LoyaltyProgram loyaltyProgram = loyaltyProgramRepository.findById(loyaltyId)
                .orElseThrow(() -> new ResourceNotFoundException("Loyalty program not found with ID: " + loyaltyId));
        loyaltyProgramRepository.delete(loyaltyProgram);
        return "Loyalty program deleted successfully!";
    }

    private LoyaltyProgramDto mapToDto(LoyaltyProgram loyaltyProgram) {
        return LoyaltyProgramDto.builder()
                .loyaltyId(loyaltyProgram.getLoyaltyId())
                .guestId(loyaltyProgram.getGuest().getGuestId())
                .points(loyaltyProgram.getPoints())
                .membershipLevel(loyaltyProgram.getMembershipLevel())
                .build();
    }
}
