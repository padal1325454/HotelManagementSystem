package com.hms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.hms.models.Supplier;
import com.hms.dto.SupplierDto;
import com.hms.service.SupplierService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/suppliers")
public class SupplierController {

    @Autowired
    private SupplierService supplierService;

    // Add a new supplier
    @PostMapping
    public ResponseEntity<String> addSupplier(@RequestBody Supplier supplier) {
        String response = supplierService.addSupplier(supplier);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Get all suppliers
    @GetMapping
    public ResponseEntity<List<SupplierDto>> getAllSuppliers() {
        List<SupplierDto> suppliers = supplierService.getAllSuppliers();
        return new ResponseEntity<>(suppliers, HttpStatus.OK);
    }

    // Get a supplier by ID
    @GetMapping("/{id}")
    public ResponseEntity<SupplierDto> getSupplierById(@PathVariable Long id) {
        SupplierDto supplier = supplierService.getSupplierById(id);
        return new ResponseEntity<>(supplier, HttpStatus.OK);
    }

    // Update a supplier
    @PutMapping("/{id}/update")
    public ResponseEntity<String> updateSupplier(@PathVariable Long id, @RequestBody Supplier supplier) {
        String response = supplierService.updateSupplier(id, supplier);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Delete a supplier
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<String> deleteSupplier(@PathVariable Long id) {
        String response = supplierService.deleteSupplier(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Check if a supplier exists by name and contact info
    @PostMapping("/check")
    public ResponseEntity<SupplierDto> checkSupplierExists(@RequestBody Map<String, String> details) {
        String name = details.get("name");
        String contactInfo = details.get("contactInfo");
        SupplierDto supplier = supplierService.checkSupplierExists(name, contactInfo);
        return new ResponseEntity<>(supplier, HttpStatus.OK);
    }
}
