package com.hms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.hms.models.Inventory;
import com.hms.dto.InventoryDto;
import com.hms.service.InventoryService;

import java.util.List;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    // Add a new inventory item
    @PostMapping
    public ResponseEntity<String> addInventory(@RequestBody InventoryDto inventory) {
        String response = inventoryService.addInventory(inventory);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Get all inventory items
    @GetMapping
    public ResponseEntity<List<InventoryDto>> getAllInventory() {
        List<InventoryDto> inventory = inventoryService.getAllInventory();
        return new ResponseEntity<>(inventory, HttpStatus.OK);
    }

    // Get an inventory item by ID
    @GetMapping("/{id}")
    public ResponseEntity<InventoryDto> getInventoryById(@PathVariable Long id) {
        InventoryDto inventory = inventoryService.getInventoryById(id);
        return new ResponseEntity<>(inventory, HttpStatus.OK);
    }

    // Update an inventory item
    @PutMapping("/{id}/update")
    public ResponseEntity<String> updateInventory(@PathVariable Long id, @RequestBody InventoryDto inventory) {
        String response = inventoryService.updateInventory(id, inventory);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    // Delete an inventory item
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<String> deleteInventory(@PathVariable Long id) {
        String response = inventoryService.deleteInventory(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
