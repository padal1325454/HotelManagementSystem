package com.hms.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hms.models.Inventory;
import com.hms.repository.InventoryRepository;
import com.hms.service.InventoryService;
import com.hms.dto.InventoryDto;
import com.hms.exceptions.ResourceNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InventoryServiceImpl implements InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    @Override
    public String addInventory(Inventory inventory) {
        if (inventory.getItemName() == null || inventory.getItemName().isEmpty()) {
            return "Item name is mandatory!";
        }
        inventoryRepository.save(inventory);
        return "Inventory item added successfully!";
    }

    @Override
    public List<InventoryDto> getAllInventory() {
        List<Inventory> inventoryList = inventoryRepository.findAll();
        return inventoryList.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public InventoryDto getInventoryById(Long inventoryId) {
        Inventory inventory = inventoryRepository.findById(inventoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Inventory item not found with ID: " + inventoryId));
        return mapToDto(inventory);
    }

    @Override
    public String updateInventory(Long inventoryId, Inventory inventory) {
        Inventory existingInventory = inventoryRepository.findById(inventoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Inventory item not found with ID: " + inventoryId));

        if (inventory.getItemName() != null && !inventory.getItemName().isEmpty()) {
            existingInventory.setItemName(inventory.getItemName());
        }
        if (inventory.getQuantity() != null) {
            existingInventory.setQuantity(inventory.getQuantity());
        }
        if (inventory.getSupplier() != null) {
            existingInventory.setSupplier(inventory.getSupplier());
        }

        inventoryRepository.save(existingInventory);
        return "Inventory item updated successfully!";
    }

    @Override
    public String deleteInventory(Long inventoryId) {
        Inventory inventory = inventoryRepository.findById(inventoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Inventory item not found with ID: " + inventoryId));
        inventoryRepository.delete(inventory);
        return "Inventory item deleted successfully!";
    }

    private InventoryDto mapToDto(Inventory inventory) {
        return InventoryDto.builder()
                .inventoryId(inventory.getInventoryId())
                .itemName(inventory.getItemName())
                .quantity(inventory.getQuantity())
                .supplierId(inventory.getSupplier().getSupplierId())
                .build();
    }
}
