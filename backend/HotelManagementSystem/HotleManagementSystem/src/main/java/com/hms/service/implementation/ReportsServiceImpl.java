package com.hms.service.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hms.models.Reports;
import com.hms.repository.ReportsRepository;
import com.hms.service.ReportsService;
import com.hms.dto.ReportsDto;
import com.hms.exceptions.ResourceNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReportsServiceImpl implements ReportsService {

    @Autowired
    private ReportsRepository reportsRepository;

    @Override
    public String addReport(Reports report) {
        if (report.getType() == null || report.getType().isEmpty()) {
            return "Report type is mandatory!";
        }
        reportsRepository.save(report);
        return "Report added successfully!";
    }

    @Override
    public List<ReportsDto> getAllReports() {
        List<Reports> reports = reportsRepository.findAll();
        return reports.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public ReportsDto getReportById(Long reportId) {
        Reports report = reportsRepository.findById(reportId)
                .orElseThrow(() -> new ResourceNotFoundException("Report not found with ID: " + reportId));
        return mapToDto(report);
    }

    @Override
    public String updateReport(Long reportId, Reports report) {
        Reports existingReport = reportsRepository.findById(reportId)
                .orElseThrow(() -> new ResourceNotFoundException("Report not found with ID: " + reportId));

        if (report.getType() != null && !report.getType().isEmpty()) {
            existingReport.setType(report.getType());
        }
        if (report.getDate() != null) {
            existingReport.setDate(report.getDate());
        }
        if (report.getDetails() != null && !report.getDetails().isEmpty()) {
            existingReport.setDetails(report.getDetails());
        }

        reportsRepository.save(existingReport);
        return "Report updated successfully!";
    }

    @Override
    public String deleteReport(Long reportId) {
        Reports report = reportsRepository.findById(reportId)
                .orElseThrow(() -> new ResourceNotFoundException("Report not found with ID: " + reportId));
        reportsRepository.delete(report);
        return "Report deleted successfully!";
    }

    private ReportsDto mapToDto(Reports report) {
        return ReportsDto.builder()
                .reportId(report.getReportId())
                .type(report.getType())
                .date(report.getDate())
                .details(report.getDetails())
                .build();
    }
}
