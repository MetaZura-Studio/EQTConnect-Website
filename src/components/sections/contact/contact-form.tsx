"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck, CircleExclamationPoint, LoaderCircle } from "lucide-react";
import { contactFieldsSchema, MESSAGE_MAX_LENGTH, type ContactApiResponse, type ContactFields, type ContactInquiry } from "@/lib/contact/schema";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { Field, TextArea, TextInput } from "@/components/ui/field";
import { PendingNote } from "@/components/ui/pending";
import { Turnstile } from "@/components/sections/contact/turnstile";

type SubmitState =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string; notConfigured?: boolean };

const fields: { name: keyof ContactFields; label: string; type?: string; autoComplete: string; optional?: boolean; span?: boolean }[] = [
  { name: "fullName", label: "Full name", autoComplete: "name" },
  { name: "workEmail", label: "Work email", type: "email", autoComplete: "email" },
  { name: "company", label: "Company name", autoComplete: "organization" },
  { name: "jobTitle", label: "Job title", autoComplete: "organization-title" },
  { name: "phone", label: "Phone number", type: "tel", autoComplete: "tel", optional: true, span: true },
];

export function ContactForm({ deliveryConfigured, turnstileSiteKey }: { deliveryConfigured: boolean; turnstileSiteKey?: string }) {
  const [state, setState] = useState<SubmitState>({ kind: "idle" });
  const [turnstileToken, setTurnstileToken] = useState<string>();
  const startedAt = useRef(0);
  const honeypot = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    control,
    reset,
    formState: { errors },
  } = useForm<ContactFields, unknown, ContactInquiry>({
    resolver: zodResolver(contactFieldsSchema),
    mode: "onTouched",
    defaultValues: { fullName: "", workEmail: "", company: "", jobTitle: "", phone: "", message: "" },
  });

  const messageLength = useWatch({ control, name: "message" })?.length ?? 0;

  useEffect(() => {
    if (state.kind === "success" || state.kind === "error") statusRef.current?.focus();
  }, [state]);

  async function onValid(values: ContactInquiry) {
    if (turnstileSiteKey && !turnstileToken) {
      setState({ kind: "error", message: "Please complete the verification check before sending." });
      return;
    }
    setState({ kind: "submitting" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website: honeypot.current?.value ?? "", startedAt: startedAt.current, turnstileToken }),
      });
      const body = (await response.json().catch(() => null)) as ContactApiResponse | null;
      if (response.ok && body?.ok) {
        setState({ kind: "success" });
        reset();
        return;
      }
      if (body && !body.ok) {
        if (body.fieldErrors) {
          const entries = Object.entries(body.fieldErrors) as [keyof ContactFields, string][];
          entries.forEach(([name, message]) => setError(name, { message }));
          if (entries[0]) setFocus(entries[0][0]);
        }
        setState({ kind: "error", message: body.message, notConfigured: body.code === "not_configured" });
        return;
      }
      setState({ kind: "error", message: "Something went wrong. Your details have not been sent — please try again." });
    } catch {
      setState({ kind: "error", message: "We couldn't reach the server. Check your connection — your details have not been sent." });
    }
  }

  if (state.kind === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-2xl bg-success-50 p-8 outline-none ring-1 ring-success-600/20">
        <CircleCheck aria-hidden="true" className="size-8 text-success-600" />
        <h2 className="mt-5 text-h3 font-semibold">Thank you — your request has been sent.</h2>
        <p className="mt-3 text-fg-muted">The EQTConnect team has received your details.</p>
        <Button variant="secondary" className="mt-6" onClick={() => setState({ kind: "idle" })}>
          Send another request
        </Button>
      </div>
    );
  }

  const submitting = state.kind === "submitting";

  return (
    <form className="relative" noValidate onSubmit={(event) => handleSubmit(onValid, (errs) => setFocus(Object.keys(errs)[0] as keyof ContactFields))(event)} aria-describedby="form-required-note">
      {!deliveryConfigured ? (
        <PendingNote title="Online submissions are not active yet" className="mb-8">
          A delivery integration has not been configured for this environment, so requests can&apos;t be sent from this form.
          Submitting will show an error and nothing will be stored or sent.
        </PendingNote>
      ) : null}

      <p id="form-required-note" className="mb-6 text-sm text-fg-subtle">
        All fields are required unless marked optional.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        {fields.map((field) => (
          <Field
            key={field.name}
            id={`contact-${field.name}`}
            label={field.label}
            optional={field.optional}
            error={errors[field.name]?.message}
            className={field.span ? "sm:col-span-2" : undefined}
          >
            {(props) => (
              <TextInput
                {...props}
                {...register(field.name)}
                type={field.type ?? "text"}
                autoComplete={field.autoComplete}
                inputMode={field.type === "tel" ? "tel" : undefined}
                aria-required={!field.optional}
              />
            )}
          </Field>
        ))}

        <Field
          id="contact-message"
          label="How can we help?"
          error={errors.message?.message}
          hint={
            <span className="flex justify-between gap-4">
              <span>Tell us about your AGM and shareholder communication requirements.</span>
              <span className={cn("tabular shrink-0", messageLength > MESSAGE_MAX_LENGTH && "text-danger-700")}>
                {messageLength}/{MESSAGE_MAX_LENGTH}
              </span>
            </span>
          }
          className="sm:col-span-2"
        >
          {(props) => <TextArea {...props} {...register("message")} aria-required rows={5} />}
        </Field>
      </div>

      {/* Honeypot: visually hidden and skipped by assistive tech; real users leave it empty. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-website">Website</label>
        <input ref={honeypot} id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      {turnstileSiteKey ? (
        <div className="mt-6">
          <Turnstile siteKey={turnstileSiteKey} onToken={setTurnstileToken} />
        </div>
      ) : null}

      {state.kind === "error" ? (
        <div
          ref={statusRef}
          tabIndex={-1}
          role="alert"
          className="mt-8 flex gap-3 rounded-xl bg-danger-50 p-4 text-sm text-danger-700 outline-none ring-1 ring-danger-600/20"
        >
          <CircleExclamationPoint aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          <p>{state.message}</p>
        </div>
      ) : null}

      <div className="mt-8 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-fg-subtle">We only ask for the details needed to respond to your request.</p>
        <Button type="submit" size="lg" disabled={submitting} aria-disabled={submitting} className="sm:min-w-44">
          {submitting ? (
            <>
              <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
              Sending…
            </>
          ) : (
            "Request a demo"
          )}
        </Button>
      </div>
      <p className="sr-only" role="status" aria-live="polite">
        {submitting ? "Sending your request" : ""}
      </p>
    </form>
  );
}
