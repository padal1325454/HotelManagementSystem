package com.hms.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hms.models.Supplier;
import com.hms.repository.SupplierRepository;
import com.hms.service.SupplierService;
import com.hms.dto.SupplierDto;
import com.hms.exceptions.ResourceNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SupplierServiceImpl implements SupplierService {

    @Autowired
    private SupplierRepository supplierRepository;

    @Override
    public String addSupplier(Supplier supplier) {
        if (supplier.getName() == null || supplier.getName().isEmpty()) {
            return "Supplier name is mandatory!";
        }
        if (supplier.getContactInfo() == null || supplier.getContactInfo().isEmpty()) {
            return "Contact information is mandatory!";
        }
        Supplier existingSupplier = supplierRepository.findByNameAndContactInfo(supplier.getName(), supplier.getContactInfo());
        if (existingSupplier != null) {
            return "Supplier with name " + supplier.getName() + " and contact info " + supplier.getContactInfo() + " already exists!";
        }
        supplierRepository.save(supplier);
        return "Supplier added successfully!";
    }

    @Override
    public List<SupplierDto> getAllSuppliers() {
        List<Supplier> suppliers = supplierRepository.findAll();
        return suppliers.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public SupplierDto getSupplierById(Long supplierId) {
        Supplier supplier = supplierRepository.findById(supplierId)
                .orElseThrow(() -> new ResourceNotFoundException("Supplier not found with ID: " + supplierId));
        return mapToDto(supplier);
    }

    @Override
    public String updateSupplier(Long supplierId, Supplier supplier) {
        Supplier existingSupplier = supplierRepository.findById(supplierId)
                .orElseThrow(() -> new ResourceNotFoundException("Supplier not found with ID: " + supplierId));

        if (supplier.getName() != null && !supplier.getName().isEmpty()) {
            existingSupplier.setName(supplier.getName());
        }
        if (supplier.getContactInfo() != null && !supplier.getContactInfo().isEmpty()) {
            existingSupplier.setContactInfo(supplier.getContactInfo());
        }
        if (supplier.getAddress() != null && !supplier.getAddress().isEmpty()) {
            existingSupplier.setAddress(supplier.getAddress());
        }

        supplierRepository.save(existingSupplier);
        return "Supplier updated successfully!";
    }

    @Override
    public String deleteSupplier(Long supplierId) {
        Supplier supplier = supplierRepository.findById(supplierId)
                .orElseThrow(() -> new ResourceNotFoundException("Supplier not found with ID: " + supplierId));
        supplierRepository.delete(supplier);
        return "Supplier deleted successfully!";
    }

    @Override
    public SupplierDto checkSupplierExists(String name, String contactInfo) {
        Supplier supplier = supplierRepository.findByNameAndContactInfo(name, contactInfo);
        return mapToDto(supplier);
    }

    private SupplierDto mapToDto(Supplier supplier) {
        return SupplierDto.builder()
                .supplierId(supplier.getSupplierId())
                .name(supplier.getName())
                .contactInfo(supplier.getContactInfo())
                .address(supplier.getAddress())
                .build();
    }
}
