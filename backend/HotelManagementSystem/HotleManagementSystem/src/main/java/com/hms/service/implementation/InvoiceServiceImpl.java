package com.hms.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hms.models.Invoice;
import com.hms.repository.InvoiceRepository;
import com.hms.service.InvoiceService;
import com.hms.dto.InvoiceDto;
import com.hms.exceptions.ResourceNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InvoiceServiceImpl implements InvoiceService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    @Override
    public String addInvoice(Invoice invoice) {
        if (invoice.getBooking() == null) {
            return "Booking is mandatory!";
        }
        if (invoice.getTotalAmount() == null || invoice.getTotalAmount() <= 0) {
            return "Total amount must be greater than zero!";
        }
        invoiceRepository.save(invoice);
        return "Invoice added successfully!";
    }

    @Override
    public List<InvoiceDto> getAllInvoices() {
        List<Invoice> invoices = invoiceRepository.findAll();
        return invoices.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public InvoiceDto getInvoiceById(Long invoiceId) {
        Invoice invoice = invoiceRepository.findById(invoiceId)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not found with ID: " + invoiceId));
        return mapToDto(invoice);
    }

    @Override
    public String updateInvoice(Long invoiceId, Invoice invoice) {
        Invoice existingInvoice = invoiceRepository.findById(invoiceId)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not found with ID: " + invoiceId));

        if (invoice.getBooking() != null) {
            existingInvoice.setBooking(invoice.getBooking());
        }
        if (invoice.getTotalAmount() != null && invoice.getTotalAmount() > 0) {
            existingInvoice.setTotalAmount(invoice.getTotalAmount());
        }
        if (invoice.getPaymentStatus() != null) {
            existingInvoice.setPaymentStatus(invoice.getPaymentStatus());
        }

        invoiceRepository.save(existingInvoice);
        return "Invoice updated successfully!";
    }

    @Override
    public String deleteInvoice(Long invoiceId) {
        Invoice invoice = invoiceRepository.findById(invoiceId)
                .orElseThrow(() -> new ResourceNotFoundException("Invoice not found with ID: " + invoiceId));
        invoiceRepository.delete(invoice);
        return "Invoice deleted successfully!";
    }

    private InvoiceDto mapToDto(Invoice invoice) {
        return InvoiceDto.builder()
                .invoiceId(invoice.getInvoiceId())
                .bookingId(invoice.getBooking().getBookingId())
                .totalAmount(invoice.getTotalAmount())
                .paymentStatus(invoice.getPaymentStatus())
                .build();
    }
}
