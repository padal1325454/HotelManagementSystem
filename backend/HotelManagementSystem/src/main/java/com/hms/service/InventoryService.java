package com.hms.service;

import com.hms.models.Inventory;
import com.hms.dto.InventoryDto;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface InventoryService {
    List<InventoryDto> getAllInventory();
    InventoryDto getInventoryById(Long inventoryId);
    String deleteInventory(Long inventoryId);
	String addInventory(InventoryDto inventoryDto);
	String updateInventory(Long inventoryId, InventoryDto inventoryDto);
}
