import type { ComponentProps, ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-[76rem] px-5 sm:px-8", className)} {...props} />;
}

type SectionTone = "canvas" | "surface" | "subtle" | "dark";

const toneClasses: Record<SectionTone, string> = {
  canvas: "bg-canvas",
  surface: "bg-surface",
  subtle: "bg-subtle/60",
  dark: "dark-surface bg-ink-900 text-white",
};

type SectionProps = ComponentProps<"section"> & { tone?: SectionTone; spacing?: "default" | "tight" | "none" };

export function Section({ tone = "canvas", spacing = "default", className, ...props }: SectionProps) {
  return (
    <section
      className={cn(
        "relative",
        toneClasses[tone],
        spacing === "default" && "py-20 sm:py-28 lg:py-32",
        spacing === "tight" && "py-14 sm:py-20",
        className,
      )}
      {...props}
    />
  );
}

export function Eyebrow({ children, className, dark }: { children: ReactNode; className?: string; dark?: boolean }) {
  return (
    <p
      className={cn(
        "font-mono text-xs font-medium uppercase tracking-[0.14em]",
        dark ? "text-signal-300" : "text-brand-600",
        className,
      )}
    >
      {children}
    </p>
  );
}

type SectionHeaderProps = {
  eyebrow?: string;
  heading: string;
  subheading?: ReactNode;
  align?: "left" | "center";
  as?: ElementType;
  dark?: boolean;
  className?: string;
  id?: string;
};

export function SectionHeader({
  eyebrow,
  heading,
  subheading,
  align = "left",
  as: Heading = "h2",
  dark,
  className,
  id,
}: SectionHeaderProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? <Eyebrow dark={dark} className="mb-5">{eyebrow}</Eyebrow> : null}
      <Heading id={id} className={cn("text-h2 font-semibold", dark ? "text-white" : "text-fg")}>
        {heading}
      </Heading>
      {subheading ? (
        <p className={cn("mt-5 text-lead", dark ? "text-white/70" : "text-fg-muted")}>{subheading}</p>
      ) : null}
    </div>
  );
}
