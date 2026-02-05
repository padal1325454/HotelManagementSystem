package com.hms.service;

import com.hms.models.Reports;
import com.hms.dto.ReportsDto;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface ReportsService {
    String addReport(Reports report);
    List<ReportsDto> getAllReports();
    ReportsDto getReportById(Long reportId);
    String updateReport(Long reportId, Reports report);
    String deleteReport(Long reportId);
}
