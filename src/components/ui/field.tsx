import type { ComponentProps, ReactNode } from "react";
import { CircleExclamationPoint } from "lucide-react";
import { cn } from "@/lib/cn";

const controlBase =
  "block w-full rounded-xl bg-surface px-3.5 text-[0.9375rem] text-fg shadow-xs ring-1 ring-inset ring-line-strong transition-[box-shadow,background-color] duration-150 placeholder:text-fg-subtle/80 hover:ring-fg-subtle/50 focus:outline-none focus:ring-2 focus:ring-brand-600 aria-[invalid=true]:ring-danger-600 aria-[invalid=true]:focus:ring-danger-600";

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  hint?: ReactNode;
  optional?: boolean;
  className?: string;
  children: (props: { id: string; "aria-invalid": boolean; "aria-describedby"?: string; className: string }) => ReactNode;
};

/** Label + control + hint + error, wired with aria-describedby and aria-invalid. */
export function Field({ id, label, error, hint, optional, className, children }: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  return (
    <div className={className}>
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-fg">
          {label}
        </label>
        {optional ? <span className="text-xs text-fg-subtle">Optional</span> : null}
      </div>
      <div className="mt-2">{children({ id, "aria-invalid": Boolean(error), "aria-describedby": describedBy, className: controlBase })}</div>
      {hint ? (
        <p id={hintId} className="mt-2 text-xs text-fg-subtle">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="mt-2 flex items-center gap-1.5 text-sm text-danger-700">
          <CircleExclamationPoint aria-hidden="true" className="size-4 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function TextInput({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn("h-12", className)} {...props} />;
}

export function TextArea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={cn("min-h-36 resize-y py-3", className)} {...props} />;
}
