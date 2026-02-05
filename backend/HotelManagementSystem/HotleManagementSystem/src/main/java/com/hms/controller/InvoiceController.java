package com.hms.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.hms.models.Invoice;
import com.hms.dto.InvoiceDto;
import com.hms.service.InvoiceService;

import java.util.List;

@RestController
@RequestMapping("/api/invoices")
public class InvoiceController {

    @Autowired
    private InvoiceService invoiceService;

    // Add a new invoice
    @PostMapping
    public ResponseEntity<String> addInvoice(@RequestBody Invoice invoice) {
        String response = invoiceService.addInvoice(invoice);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // Get all invoices
    @GetMapping
    public ResponseEntity<List<InvoiceDto>> getAllInvoices() {
        List<InvoiceDto> invoices = invoiceService.getAllInvoices();
        return new ResponseEntity<>(invoices, HttpStatus.OK);
    }

    // Get an invoice by ID
    @GetMapping("/{id}")
    public ResponseEntity<InvoiceDto> getInvoiceById(@PathVariable Long id) {
        InvoiceDto invoice = invoiceService.getInvoiceById(id);
        return new ResponseEntity<>(invoice, HttpStatus.OK);
    }

    // Update an invoice
    @PutMapping("/{id}/update")
    public ResponseEntity<String> updateInvoice(@PathVariable Long id, @RequestBody Invoice invoice) {
        String response = invoiceService.updateInvoice(id, invoice);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Delete an invoice
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<String> deleteInvoice(@PathVariable Long id) {
        String response = invoiceService.deleteInvoice(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
