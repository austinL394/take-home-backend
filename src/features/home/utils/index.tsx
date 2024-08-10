import { Report, AIResultType, PriorityType, ReportStatus, SubjectData } from '../types';

const computeAiResult = (aiResult: string | undefined, statusReview: string | undefined): AIResultType => {
  if (aiResult === 'Detected') {
    return AIResultType.WARNING;
  } else if (aiResult === 'Not Detected') {
    return AIResultType.GOOD;
  } else
    switch (statusReview) {
      case 'Not Complete':
        return AIResultType.FAILED;
      case 'System: Processing':
        return AIResultType.PENDING;
      default:
        return AIResultType.FAILED;
    }
};

export const patientDataToReportMapper = (subjectData: SubjectData): Report => {
  const { ecgs, subject } = subjectData;

  return {
    id: Math.random(),
    id_subject: subjectData.id_subject,
    patientId: subject.PatientID,
    patientFirstName: subject.PatientFirstName ?? '',
    patientLastName: subject.PatientLastName ?? '',
    gender: initCap(subject.Gender) ?? '',
    birthDate: new Date(subject.DateofBirth),

    ecgs: ecgs
      .map((ecg) => {
        // console.log('@ birthYear', {
        //   dob: patient.DateofBirth,
        //   acd: ecg.AcquisitionDate,
        //   age,
        // });
        const acquisitionDate = new Date(ecg.AcquisitionDate + ' ' + ecg.AcquisitionTime);

        return {
          acquisitionDate: acquisitionDate,
          aiResult: computeAiResult(ecg.models?.low_ef?.result.label, ecg.status_review),
          priority: ecg.Priority as PriorityType,
          status: ecg?.status_review as ReportStatus,
          scanLocation: ecg?.SiteName || '',
          notes: ecg?.notes || '',
          ecgReport: ecg,
          statusReview: ecg?.status_review || '',
          summary: ecg?.summary || '',
        };
      })
      .sort((left, right) => right.acquisitionDate.getTime() - left.acquisitionDate.getTime()),
  };
};

export const initCap = (str: string | undefined): string | undefined => {
  if (!str) {
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
