import { z } from "zod";

/** Recommended inquiry fields — subject to business confirmation. Shared by client and server. */
export const contactFieldsSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name.").max(120, "Name must be 120 characters or fewer."),
  workEmail: z
    .string()
    .trim()
    .min(1, "Enter your work email.")
    .max(254, "Email must be 254 characters or fewer.")
    .pipe(z.email("Enter a valid email address, like name@company.com.")),
  company: z.string().trim().min(2, "Enter your company name.").max(160, "Company name must be 160 characters or fewer."),
  jobTitle: z.string().trim().min(2, "Enter your job title.").max(120, "Job title must be 120 characters or fewer."),
  phone: z
    .string()
    .trim()
    .max(25, "Phone number must be 25 characters or fewer.")
    .refine((value) => value === "" || /^\+?[\d\s().-]{7,25}$/.test(value), "Enter a valid phone number, or leave this blank.")
    .optional()
    .default(""),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more (at least 10 characters).")
    .max(2000, "Message must be 2,000 characters or fewer."),
});

/** Anti-spam metadata sent alongside the fields. */
export const contactMetaSchema = z.object({
  /** Honeypot: hidden from people, must stay empty. */
  website: z.string().max(0).optional().default(""),
  /** Epoch ms when the form was first rendered. */
  startedAt: z.number().int().positive(),
  turnstileToken: z.string().max(2048).optional(),
});

export const contactSubmissionSchema = contactFieldsSchema.extend(contactMetaSchema.shape);

export type ContactFields = z.input<typeof contactFieldsSchema>;
export type ContactInquiry = z.output<typeof contactFieldsSchema>;
export type ContactSubmission = z.input<typeof contactSubmissionSchema>;

export const MESSAGE_MAX_LENGTH = 2000;

export type ContactApiResponse =
  | { ok: true }
  | {
      ok: false;
      code: "invalid" | "rate_limited" | "verification_failed" | "not_configured" | "delivery_failed" | "bad_request";
      message: string;
      fieldErrors?: Partial<Record<keyof ContactFields, string>>;
    };
