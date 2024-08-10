import { useState, useEffect } from 'react';

import { DropdownAction } from 'components/DropdownMenu';
import { MainLayout } from 'components/Layout/MainLayout';

import { ToolBar } from './components/reports/ToolBar';

import { patientDataToReportMapper } from './utils';

import { Report, SearchFilters } from './types';
import { useSubjects } from './api';
import { useNavigate } from 'react-router-dom';

export const Reports = () => {
  const navigate = useNavigate();

  const [reports, setReports] = useState<Array<Report>>([]);
  const [filters, setFilters] = useState<SearchFilters>(() => {
    const savedFilters = localStorage.getItem('filters');
    return savedFilters
      ? JSON.parse(savedFilters)
      : {
          query: '',
          acquisitionFrom: null,
          acquisitionTo: null,
        };
  });
  const { data } = useSubjects(filters);

  useEffect(() => {
    if (data) setReports(data.result.map(patientDataToReportMapper));
  }, [data]);

  useEffect(() => {
    localStorage.setItem('filters', JSON.stringify(filters));
  }, [filters]);

  const onOpenReport = (report: Report, selectedECGIdx: number) => {
    navigate(`/reports/${report.id_subject}/ecg/${report.ecgs[selectedECGIdx].ecgReport.file.hash}`);
  };

  const handleDownloadPDF = () => {};

  const handleMarkIncomplete = () => {};

  const reportRowClickDropDownActions: DropdownAction[] = [
    {
      title: 'Print',
      action: onOpenReport,
    },
    {
      title: 'Download PDF',
      action: handleDownloadPDF,
    },
    {
      title: 'Mark Incomplete',
      action: handleMarkIncomplete,
    },
  ];

  return (
    <MainLayout>
      {/* <ToolBar filters={filters} onChangeFilters={setFilters} reports={reports} /> */}
      {/* /?      <ReportView reports={reports} reportDropdownAction={reportRowClickDropDownActions} onOpenReport={onOpenReport} /> */}
    </MainLayout>
  );
};
