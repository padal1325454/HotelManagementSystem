package com.hms.service;

import com.hms.models.Housekeeping;
import com.hms.dto.HousekeepingDto;

import java.util.List;

public interface HousekeepingService {
    String addHousekeeping(Housekeeping housekeeping); // Adds a housekeeping task

    List<HousekeepingDto> getAllHousekeeping(); // Fetches all housekeeping tasks

    HousekeepingDto getHousekeepingById(Long housekeepingId); // Fetches a specific housekeeping task

    String updateHousekeeping(Long housekeepingId, Housekeeping housekeeping); // Updates a housekeeping task

    String deleteHousekeeping(Long housekeepingId); // Deletes a housekeeping task
}
