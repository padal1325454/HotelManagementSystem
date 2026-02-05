package com.hms.service;

import com.hms.models.Inventory;
import com.hms.dto.InventoryDto;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface InventoryService {
    String addInventory(Inventory inventory);
    List<InventoryDto> getAllInventory();
    InventoryDto getInventoryById(Long inventoryId);
    String updateInventory(Long inventoryId, Inventory inventory);
    String deleteInventory(Long inventoryId);
}
