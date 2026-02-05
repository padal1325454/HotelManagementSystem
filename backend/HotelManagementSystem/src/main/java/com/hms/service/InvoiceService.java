package com.hms.service;

import com.hms.models.Invoice;
import com.hms.dto.InvoiceDto;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface InvoiceService {
    String addInvoice(Invoice invoice);
    List<InvoiceDto> getAllInvoices();
    InvoiceDto getInvoiceById(Long invoiceId);
    String updateInvoice(Long invoiceId, Invoice invoice);
    String deleteInvoice(Long invoiceId);
}
