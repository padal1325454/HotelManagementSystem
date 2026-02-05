package com.hms.service;

import com.hms.models.Housekeeping;
import com.hms.dto.HousekeepingDto;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface HousekeepingService {
    String addHousekeeping(Housekeeping housekeeping);
    List<HousekeepingDto> getAllHousekeeping();
    HousekeepingDto getHousekeepingById(Long housekeepingId);
    String updateHousekeeping(Long housekeepingId, Housekeeping housekeeping);
    String deleteHousekeeping(Long housekeepingId);
}
