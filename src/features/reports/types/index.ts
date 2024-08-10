import { z } from 'zod';
import { booleanPreprocessor, upperPreprocessor } from 'utils/zod';

export enum AIResultType {
  GOOD = 'not detected',
  WARNING = 'detected',
  AI_WARNING = 'ai_warning',
  DANGER = 'danger',
  PENDING = 'pending',
  FAILED = 'failed',
}

export enum PriorityType {
  PREOP = 'PREOP',
  ROUTINE = 'ROUTINE',
  NORMAL = 'NORMAL',
  ASAP = 'ASAP',
  STAT = 'STAT',
  CRITICAL = 'CRITICAL',
  UNKNOWN = 'UNKNOWN',
}

export enum ResultIconType {
  LEVEL_ZERO = '',
  LEVEL_ONE = 'green',
  LEVEL_TWO = 'blue',
  LEVEL_THREE = 'yellow',
  LEVEL_FOUR = 'red',
}

export enum ReportType {
  COMPLETE = 'Complete',
  NOT_COMPLETE = 'Not Complete',
}

export enum ReportStatus {
  NOT_COMPLETE = 'Not Complete',
  PROCESSING = 'Processing',
  IN_REVIEW = 'In Review',
  COMPLETED = 'Complete',
  APPROVED = 'Approved',
}

export interface Report {
  id: number;
  id_subject: string;
  patientId: string;
  gender: string;
  patientFirstName: string;
  patientLastName: string;
  birthDate?: Date;
  ecgs: {
    acquisitionDate: Date;
    scanLocation: string;
    aiResult: AIResultType;
    priority: PriorityType;
    notes: string;
    status: ReportStatus;
    finishedDate?: Date;
    ecgReport: ECGReport;
    summary?: string;
  }[];
}

// export interface Patient {
//   DateofBirth: string;
//   Gender: string;
//   HeightIN: string;
//   PatientId: string;
//   PatientFirstName: string;
//   PatientLastName: string;
//   Race: string;
//   WeightLBS: string;
// }

// export interface AIReportResponse {
//   ecgs: ECGReport[];
//   patient: {
//     DateofBirth: string;
//     Gender: string;
//     HeightIN: string;
//     PatientFirstName: string;
//     PatientID: string;
//     PatientLastName: string;
//     Race: string;
//     WeightLBS: string;
//   };
// }

export interface SearchFilters {
  query?: string;
  scanLocation?: string;
  selectedAIResult?: AIResultType;
  selectedPriorityType?: PriorityType;
  acquisitionFrom: Date | null;
  acquisitionTo: Date | null;
}

export const ECG_DRAG_DROP_LIMIT = 50;

export const MAX_FILE_SIZE = 10;

export const LeadIdSchema = z.union([
  z.literal('I'),
  z.literal('II'),
  z.literal('III'),
  z.literal('aVR'),
  z.literal('aVL'),
  z.literal('aVF'),
  z.literal('V1'),
  z.literal('V2'),
  z.literal('V3'),
  z.literal('V4'),
  z.literal('V5'),
  z.literal('V6'),
  z.literal('V7'),
  z.literal('V8'),
  z.literal('V9'),
  z.literal('V1R'),
  z.literal('V2R'),
  z.literal('V3R'),
  z.literal('V4R'),
  z.literal('V5R'),
  z.literal('V6R'),
  z.string(),
]);

export type LeadId = z.infer<typeof LeadIdSchema>;

export const leadLabels: Array<LeadId> = [
  'I',
  'II',
  'III',
  'aVR',
  'aVL',
  'aVF',
  'V1',
  'V2',
  'V3',
  'V4',
  'V5',
  'V6',
  'V7',
  'V8',
  'V9',
  'V1R',
  'V2R',
  'V3R',
  'V4R',
  'V5R',
  'V6R',
];

export const LeadDataSchema = z.object({
  BaselineSway: z.preprocess(booleanPreprocessor, z.boolean().optional()),
  FirstSampleBaseline: z.coerce.number().optional(),
  LeadAmplitudeUnits: z.string(),
  LeadAmplitudeUnitsPerBit: z.coerce.number(),
  LeadByteCountTotal: z.coerce.number().optional(),
  LeadDataCRC32: z.coerce.number().optional(),
  LeadHighLimit: z.coerce.number().optional(),
  LeadID: LeadIdSchema,
  LeadLowLimit: z.coerce.number().optional(),
  LeadOff: z.preprocess(booleanPreprocessor, z.boolean()).optional(),
  LeadOffsetFirstSample: z.coerce.number().optional(),
  LeadSampleCountTotal: z.coerce.number().optional(),
  LeadSampleSize: z.coerce.number().optional(),
  LeadTimeOffset: z.coerce.number().optional(),
  WaveFormData: z.array(z.number()),
  virtual: z.boolean().optional(),
});

export type LeadData = z.infer<typeof LeadDataSchema>;

export const WaveformSchema = z.object({
  ACFilter: z.string().optional(),
  HighPassFilter: z.coerce.number().optional(),
  LeadData: z.array(LeadDataSchema),
  LowPassFilter: z.coerce.number().optional(),
  NumberofLeads: z.coerce.number(),
  SampleBase: z.coerce.number(),
  SampleExponent: z.coerce.number(),
  SampleType: z.string().optional(),
  WaveformStartTime: z.coerce.number().optional(),
  WaveformType: z.string().optional(),
});

export type Waveform = z.infer<typeof WaveformSchema>;

export const ECGReportSchema = z.object({
  assessment_p_wave: z.string().optional(),
  assessment_q_wave: z.string().optional(),
  assessment_qrs_complex: z.string().optional(),
  assessment_rhythm: z.string().optional(),
  assessment_st_segments: z.string().optional(),
  assessment_t_wave: z.string().optional(),
  AcquisitionDate: z.string(),
  AcquisitionTime: z.string(),
  AcquisitionDevice: z.string(),
  AcquisitionSoftwareVersion: z.string().optional(),
  AcquisitionTechID: z.string().optional(),
  AnalysisSoftwareVersion: z.string().optional(),
  CartNumber: z.string().optional(),
  DataType: z.string().optional(),
  Diagnosis_processed: z.string().optional(),
  EditDate: z.string().optional(),
  EditTime: z.string().optional(),
  EditorID: z.string().optional(),
  FellowID: z.string().optional(),
  HISStatus: z.string().optional(),
  icon_heart_rate: z
    .enum([
      ResultIconType.LEVEL_TWO,
      ResultIconType.LEVEL_FOUR,
      ResultIconType.LEVEL_ONE,
      ResultIconType.LEVEL_THREE,
      ResultIconType.LEVEL_ZERO,
    ])
    .optional(),
  icon_p_r_t_axis: z
    .enum([
      ResultIconType.LEVEL_TWO,
      ResultIconType.LEVEL_FOUR,
      ResultIconType.LEVEL_ONE,
      ResultIconType.LEVEL_THREE,
      ResultIconType.LEVEL_ZERO,
    ])
    .optional(),
  icon_p_wave: z
    .enum([
      ResultIconType.LEVEL_TWO,
      ResultIconType.LEVEL_FOUR,
      ResultIconType.LEVEL_ONE,
      ResultIconType.LEVEL_THREE,
      ResultIconType.LEVEL_ZERO,
    ])
    .optional(),
  icon_pr_interval: z
    .enum([
      ResultIconType.LEVEL_TWO,
      ResultIconType.LEVEL_FOUR,
      ResultIconType.LEVEL_ONE,
      ResultIconType.LEVEL_THREE,
      ResultIconType.LEVEL_ZERO,
    ])
    .optional(),
  icon_q_wave: z
    .enum([
      ResultIconType.LEVEL_TWO,
      ResultIconType.LEVEL_FOUR,
      ResultIconType.LEVEL_ONE,
      ResultIconType.LEVEL_THREE,
      ResultIconType.LEVEL_ZERO,
    ])
    .optional(),
  icon_qrs_complex: z
    .enum([
      ResultIconType.LEVEL_TWO,
      ResultIconType.LEVEL_FOUR,
      ResultIconType.LEVEL_ONE,
      ResultIconType.LEVEL_THREE,
      ResultIconType.LEVEL_ZERO,
    ])
    .optional(),
  icon_qrs_duration: z
    .enum([
      ResultIconType.LEVEL_TWO,
      ResultIconType.LEVEL_FOUR,
      ResultIconType.LEVEL_ONE,
      ResultIconType.LEVEL_THREE,
      ResultIconType.LEVEL_ZERO,
    ])
    .optional(),
  icon_qt_qtc_interval: z
    .enum([
      ResultIconType.LEVEL_TWO,
      ResultIconType.LEVEL_FOUR,
      ResultIconType.LEVEL_ONE,
      ResultIconType.LEVEL_THREE,
      ResultIconType.LEVEL_ZERO,
    ])
    .optional(),
  icon_rhythm: z
    .enum([
      ResultIconType.LEVEL_TWO,
      ResultIconType.LEVEL_FOUR,
      ResultIconType.LEVEL_ONE,
      ResultIconType.LEVEL_THREE,
      ResultIconType.LEVEL_ZERO,
    ])
    .optional(),
  icon_st_segments: z
    .enum([
      ResultIconType.LEVEL_TWO,
      ResultIconType.LEVEL_FOUR,
      ResultIconType.LEVEL_ONE,
      ResultIconType.LEVEL_THREE,
      ResultIconType.LEVEL_ZERO,
    ])
    .optional(),
  icon_t_wave: z
    .enum([
      ResultIconType.LEVEL_TWO,
      ResultIconType.LEVEL_FOUR,
      ResultIconType.LEVEL_ONE,
      ResultIconType.LEVEL_THREE,
      ResultIconType.LEVEL_ZERO,
    ])
    .optional(),
  JobNumber: z.string().optional(),
  Location: z.string().optional(),
  LocationName: z.string().optional(),
  OrderingMDID: z.string().optional(),
  OverreaderFirstName: z.string().optional(),
  OverreaderLastName: z.string().optional(),
  OverreaderID: z.string().optional(),
  PAxis: z.string().optional(),
  PRInterval: z.string().optional(),
  Priority: z.string().optional(),
  QRSDuration: z.string().optional(),
  QTCorrected: z.string().optional(),
  QTInterval: z.string().optional(),
  RAxis: z.string().optional(),
  RefferingMDID: z.string().optional(),
  RoomID: z.string().optional(),
  Site: z.string().optional(),
  SiteName: z.string().optional(),
  Status: z.string().optional(),
  TAxis: z.string().optional(),
  TestReason: z.string().optional(),
  TestType: z.string().optional(),
  VentricularRate: z.string().optional(),
  Waveform: WaveformSchema,
  XMLSourceVersion: z.string().optional(),
  acquisition_timestamp: z.coerce.number().optional(),

  created_by: z.string().optional(),
  created_timestamp: z.coerce.number().optional(),
  file: z.object({
    hash: z.string(),
    location: z.string(),
  }),
  models: z
    .object({
      low_ef: z
        .object({
          result: z.object({
            label: z.string(),
            raw: z.string(),
          }),
          version: z.string(),
        })
        .optional(),
    })
    .optional(),
  notes: z.string().optional(),
  status_review: z.union([
    z.literal('Complete'),
    z.literal('Not Complete'),
    z.literal('System: Processing'),
    z.literal('Error'),
  ]),
  summary: z.string().optional(),
  updated_by: z.string().optional(),
  updated_timestamp: z.coerce.number().optional(),
});

export type ECGReport = z.infer<typeof ECGReportSchema>;

export const SubjectSchema = z.object({
  AgeUnits: z.preprocess(upperPreprocessor, z.literal('YEARS').optional()),
  DateofBirth: z.string(),
  Gender: z.string().optional(),
  HeightCM: z.string().optional(),
  HeightIN: z.string().optional(),
  PatientAge: z.string().optional(),
  PatientFirstName: z.string().optional(),
  PatientID: z.string(),
  PatientLastName: z.string().optional(),
  Race: z.string().optional(),
  WeightKG: z.string().optional(),
  WeightLBS: z.string().optional(),
});

export type Subject = z.infer<typeof SubjectSchema>;

export const SubjectDataSchema = z.object({
  id_organization: z.string(),
  id_subject: z.string(),
  ecgs: z.array(ECGReportSchema),
  subject: SubjectSchema,
});

export type SubjectData = z.infer<typeof SubjectDataSchema>;

export const SubjectResponseSchema = z.object({
  datetime: z.coerce.date(),
  message: z.string(),
  result: SubjectDataSchema,
  success: z.boolean(),
});

export type SubjectResponse = z.infer<typeof SubjectResponseSchema>;
