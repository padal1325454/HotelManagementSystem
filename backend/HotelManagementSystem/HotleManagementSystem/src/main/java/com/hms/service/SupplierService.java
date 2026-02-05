package com.hms.service;

import com.hms.models.Supplier;
import com.hms.dto.SupplierDto;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface SupplierService {
    String addSupplier(Supplier supplier);
    List<SupplierDto> getAllSuppliers();
    SupplierDto getSupplierById(Long supplierId);
    String updateSupplier(Long supplierId, Supplier supplier);
    String deleteSupplier(Long supplierId);
    SupplierDto checkSupplierExists(String name, String contactInfo); 
}
