package com.hms.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hms.models.Inventory;
import com.hms.models.Supplier;
import com.hms.repository.InventoryRepository;
import com.hms.repository.SupplierRepository;
import com.hms.service.InventoryService;
import com.hms.dto.InventoryDto;
import com.hms.exceptions.ResourceNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InventoryServiceImpl implements InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;
    @Autowired
    private SupplierRepository supplierRepository;

    @Override
    public String addInventory(InventoryDto inventoryDto) {
        if (inventoryDto.getItemName() == null || inventoryDto.getItemName().isEmpty()) {
            return "Item name is mandatory!";
        }
        if (inventoryDto.getSupplierId() == null) {
            throw new ResourceNotFoundException("Supplier is required for inventory items!");
        }

        Supplier supplier = supplierRepository.findById(inventoryDto.getSupplierId())
                .orElseThrow(() -> new ResourceNotFoundException("Supplier not found with ID: " + inventoryDto.getSupplierId()));

        Inventory inventory = Inventory.builder()
                .itemName(inventoryDto.getItemName())
                .quantity(inventoryDto.getQuantity())
                .supplier(supplier)
                .build();

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
    public String updateInventory(Long inventoryId, InventoryDto inventoryDto) {
        Inventory existingInventory = inventoryRepository.findById(inventoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Inventory item not found with ID: " + inventoryId));

        if (inventoryDto.getItemName() != null && !inventoryDto.getItemName().isEmpty()) {
            existingInventory.setItemName(inventoryDto.getItemName());
        }
        if (inventoryDto.getQuantity() != null) {
            existingInventory.setQuantity(inventoryDto.getQuantity());
        }
        if (inventoryDto.getSupplierId() != null) {
            Supplier supplier = supplierRepository.findById(inventoryDto.getSupplierId())
                    .orElseThrow(() -> new ResourceNotFoundException("Supplier not found with ID: " + inventoryDto.getSupplierId()));
            existingInventory.setSupplier(supplier);
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
            .supplierId(inventory.getSupplier() != null ? inventory.getSupplier().getSupplierId() : null)
            .build();
    }

}
