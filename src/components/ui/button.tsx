import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "inverse" | "inverse-outline";
type Size = "sm" | "md" | "lg";

const base =
  "group relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-[-0.01em] transition-[background-color,color,box-shadow,transform] duration-200 ease-out disabled:pointer-events-none disabled:opacity-60 active:translate-y-px";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-800 text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_1px_2px_rgb(17_24_39/0.2),0_4px_12px_-4px_rgb(76_29_149/0.45)] hover:bg-brand-700 active:bg-brand-900",
  secondary: "bg-surface text-fg ring-1 ring-line-strong shadow-xs hover:bg-subtle hover:ring-fg-subtle/40",
  ghost: "text-fg hover:bg-subtle",
  inverse: "bg-white text-brand-900 shadow-sm hover:bg-brand-50",
  "inverse-outline": "text-white ring-1 ring-white/25 hover:bg-white/10 hover:ring-white/40",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-12 px-6 text-base",
};

type StyleProps = { variant?: Variant; size?: Size; withArrow?: boolean };

export function buttonClasses({ variant = "primary", size = "md" }: StyleProps = {}, className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

function Arrow() {
  return (
    <ArrowRight
      aria-hidden="true"
      className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
      strokeWidth={2}
    />
  );
}

type ButtonLinkProps = StyleProps & Omit<ComponentProps<typeof Link>, "className"> & { className?: string; children: ReactNode };

export function ButtonLink({ variant, size, withArrow, className, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonClasses({ variant, size }, className)} {...props}>
      {children}
      {withArrow ? <Arrow /> : null}
    </Link>
  );
}

type ButtonProps = StyleProps & ComponentProps<"button">;

export function Button({ variant, size, withArrow, className, children, type = "button", ...props }: ButtonProps) {
  return (
    <button type={type} className={buttonClasses({ variant, size }, className)} {...props}>
      {children}
      {withArrow ? <Arrow /> : null}
    </button>
  );
}
