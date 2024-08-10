import { ResultIconType } from 'features/reports/types';
import { z } from 'zod';

export const SignatureSchema = z.object({
  standardAdditionalComment: z.string().min(1, { message: 'Standard additional comment is required' }),
  phoneNumber: z.string().min(1, { message: 'Phone number is required' }),
  emailAddress: z.string().min(1, { message: 'Email address is required' }),
  nameAndTitle: z.string().min(1, { message: 'Name and title is required' }),
  profileImage: z
    .union([z.instanceof(File), z.null()])
    .refine((data) => data !== null, { message: 'Profile image is required' }),
  signatureImage: z
    .union([z.instanceof(File), z.null()])
    .refine((data) => data !== null, { message: 'Signature image is required' }),
});

export const ECGReportSchema = z.object({
  patientDetails: z.object({
    patientName: z.string().min(1, { message: 'Name is required' }),
    patientNumber: z.string().min(1, { message: 'Patient Number is required ' }),
    patientDOB: z.date().nullable(),
  }),
  ecgDetails: z.object({
    statusReview: z.string(),
    reportStatus: z.string(),
    notes: z.string().min(1, { message: 'Notes is required' }),

    testDate: z.string().min(1, { message: 'Test date is required' }),
    referringSite: z.string().min(1, { message: 'Referring site is required' }),

    summary: z.string().min(1, { message: 'Summary is required' }),

    aiResultLevel: z.enum([
      ResultIconType.LEVEL_TWO,
      ResultIconType.LEVEL_FOUR,
      ResultIconType.LEVEL_ONE,
      ResultIconType.LEVEL_THREE,
      ResultIconType.LEVEL_ZERO,
    ]),
    aiResult: z.string().min(1, { message: 'AI Result Note is required' }),

    heartRateLevel: z.enum([
      ResultIconType.LEVEL_TWO,
      ResultIconType.LEVEL_FOUR,
      ResultIconType.LEVEL_ONE,
      ResultIconType.LEVEL_THREE,
      ResultIconType.LEVEL_ZERO,
    ]),
    heartRate: z.string().optional(),

    prIntervalLevel: z.enum([
      ResultIconType.LEVEL_TWO,
      ResultIconType.LEVEL_FOUR,
      ResultIconType.LEVEL_ONE,
      ResultIconType.LEVEL_THREE,
      ResultIconType.LEVEL_ZERO,
    ]),
    prInterval: z.string().optional(),

    qrsDurationLevel: z.enum([
      ResultIconType.LEVEL_TWO,
      ResultIconType.LEVEL_FOUR,
      ResultIconType.LEVEL_ONE,
      ResultIconType.LEVEL_THREE,
      ResultIconType.LEVEL_ZERO,
    ]),
    qrsDuration: z.string().optional(),

    qtQtcLevel: z.enum([
      ResultIconType.LEVEL_TWO,
      ResultIconType.LEVEL_FOUR,
      ResultIconType.LEVEL_ONE,
      ResultIconType.LEVEL_THREE,
      ResultIconType.LEVEL_ZERO,
    ]),
    qtQtc: z.string().optional(),

    prtAxisLevel: z.enum([
      ResultIconType.LEVEL_TWO,
      ResultIconType.LEVEL_FOUR,
      ResultIconType.LEVEL_ONE,
      ResultIconType.LEVEL_THREE,
      ResultIconType.LEVEL_ZERO,
    ]),
    prtAxis: z.string().optional(),

    rhythmLevel: z.enum([
      ResultIconType.LEVEL_TWO,
      ResultIconType.LEVEL_FOUR,
      ResultIconType.LEVEL_ONE,
      ResultIconType.LEVEL_THREE,
      ResultIconType.LEVEL_ZERO,
    ]),
    rhythm: z.string().min(1, { message: 'Rhythm is required' }),

    pWaveLevel: z.enum([
      ResultIconType.LEVEL_TWO,
      ResultIconType.LEVEL_FOUR,
      ResultIconType.LEVEL_ONE,
      ResultIconType.LEVEL_THREE,
      ResultIconType.LEVEL_ZERO,
    ]),
    pWave: z.string().min(1, { message: 'P wave is required' }),

    qWaveLevel: z.enum([
      ResultIconType.LEVEL_TWO,
      ResultIconType.LEVEL_FOUR,
      ResultIconType.LEVEL_ONE,
      ResultIconType.LEVEL_THREE,
      ResultIconType.LEVEL_ZERO,
    ]),
    qWave: z.string().min(1, { message: 'Q wave is required' }),

    qrsComplexLevel: z.enum([
      ResultIconType.LEVEL_TWO,
      ResultIconType.LEVEL_FOUR,
      ResultIconType.LEVEL_ONE,
      ResultIconType.LEVEL_THREE,
      ResultIconType.LEVEL_ZERO,
    ]),
    qrsComplex: z.string().min(1, { message: 'QRS complex is required' }),

    tWaveLevel: z.enum([
      ResultIconType.LEVEL_TWO,
      ResultIconType.LEVEL_FOUR,
      ResultIconType.LEVEL_ONE,
      ResultIconType.LEVEL_THREE,
      ResultIconType.LEVEL_ZERO,
    ]),
    tWave: z.string().min(1, { message: 'T wave is required' }),

    stSegmentsLevel: z.enum([
      ResultIconType.LEVEL_TWO,
      ResultIconType.LEVEL_FOUR,
      ResultIconType.LEVEL_ONE,
      ResultIconType.LEVEL_THREE,
      ResultIconType.LEVEL_ZERO,
    ]),
    stSegments: z.string().min(1, { message: 'ST segments is required' }),
  }),
});

export type ECGReport = z.infer<typeof ECGReportSchema>;
