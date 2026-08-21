import { type ReactNode, useState, useRef, useEffect } from "react";

// Card
export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-card border border-border rounded-lg shadow-sm ${className}`}>
      {children}
    </div>
  );
}

// Badge
type BadgeVariant = "default" | "success" | "warning" | "danger" | "muted" | "blue";
const badgeStyles: Record<BadgeVariant, string> = {
  default: "bg-accent text-accent-foreground",
  success: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
  warning: "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  danger: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400",
  muted: "bg-muted text-muted-foreground",
  blue: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
};
export function Badge({ children, variant = "default" }: { children: ReactNode; variant?: BadgeVariant }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${badgeStyles[variant]}`}>
      {children}
    </span>
  );
}

// FormResult badge (W/D/L)
export function FormBadge({ result }: { result: string }) {
  const colors = { W: "bg-emerald-500 text-white", D: "bg-slate-400 text-white", L: "bg-red-500 text-white" };
  return (
    <span className={`inline-flex items-center justify-center w-5 h-5 rounded text-[10px] font-bold ${colors[result as keyof typeof colors] || "bg-muted text-muted-foreground"}`}>
      {result}
    </span>
  );
}

// Stat card
export function StatCard({ label, value, sub, trend }: { label: string; value: string | number; sub?: string; trend?: "up" | "down" | "neutral" }) {
  return (
    <Card className="p-4">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</p>
      <p className="mt-1.5 text-2xl font-semibold text-foreground font-display">{value}</p>
      {sub && (
        <p className={`mt-0.5 text-xs ${trend === "up" ? "text-emerald-600" : trend === "down" ? "text-red-500" : "text-muted-foreground"}`}>
          {sub}
        </p>
      )}
    </Card>
  );
}

// Button
type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
const btnStyles: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-blue-700",
  secondary: "bg-secondary text-secondary-foreground hover:bg-slate-200 dark:hover:bg-slate-700",
  ghost: "bg-transparent text-foreground hover:bg-muted",
  danger: "bg-red-600 text-white hover:bg-red-700",
};
export function Button({
  children, variant = "secondary", className = "", onClick, type = "button", disabled = false
}: {
  children: ReactNode; variant?: ButtonVariant; className?: string; onClick?: () => void; type?: "button" | "submit" | "reset"; disabled?: boolean;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${btnStyles[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${className}`}
    >
      {children}
    </button>
  );
}

// Modal
export function Modal({ title, children, onClose, footer, maxWidth = "max-w-xl" }: {
  title: string; children: ReactNode; onClose: () => void; footer?: ReactNode; maxWidth?: string;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/30 p-4" onMouseDown={onClose}>
      <div className={`w-full ${maxWidth} max-h-[90vh] overflow-hidden rounded-xl border border-border bg-card shadow-2xl`} onMouseDown={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={title}>
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-display text-base font-semibold text-foreground">{title}</h2>
          <button onClick={onClose} className="rounded-md px-2 py-1 text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Close dialog">✕</button>
        </div>
        <div className="max-h-[calc(90vh-132px)] overflow-y-auto p-5">{children}</div>
        {footer && <div className="flex items-center justify-end gap-2 border-t border-border bg-muted/30 px-5 py-3">{footer}</div>}
      </div>
    </div>
  );
}

export function ConfirmDialog({ title, message, confirmLabel = "Delete", onCancel, onConfirm, pending = false }: {
  title: string; message: string; confirmLabel?: string; onCancel: () => void; onConfirm: () => void; pending?: boolean;
}) {
  return (
    <Modal title={title} onClose={onCancel} maxWidth="max-w-md" footer={<><Button variant="secondary" onClick={onCancel} disabled={pending}>Cancel</Button><Button variant="danger" onClick={onConfirm} disabled={pending}>{pending ? "Working…" : confirmLabel}</Button></>}>
      <p className="text-sm leading-relaxed text-muted-foreground">{message}</p>
    </Modal>
  );
}

// Input
export function Input({ label, className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <label className="text-xs font-medium text-muted-foreground">{label}</label>}
      <input
        {...props}
        className="px-3 py-1.5 text-sm bg-card border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition"
      />
    </div>
  );
}

// Select
export function Select({ label, children, className = "", ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { label?: string }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <label className="text-xs font-medium text-muted-foreground">{label}</label>}
      <select
        {...props}
        className="px-3 py-1.5 text-sm bg-card border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition appearance-none"
      >
        {children}
      </select>
    </div>
  );
}

// Textarea
export function Textarea({ label, className = "", ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <label className="text-xs font-medium text-muted-foreground">{label}</label>}
      <textarea
        {...props}
        className="px-3 py-2 text-sm bg-card border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition resize-none"
      />
    </div>
  );
}

// Table components
export function Table({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">{children}</table>
    </div>
  );
}
export function Th({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <th className={`px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide border-b border-border whitespace-nowrap ${className}`}>
      {children}
    </th>
  );
}
export function Td({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <td className={`px-4 py-2.5 text-foreground border-b border-border ${className}`}>
      {children}
    </td>
  );
}
export function Tr({ children, onClick, className = "" }: { children: ReactNode; onClick?: () => void; className?: string }) {
  return (
    <tr
      onClick={onClick}
      className={`transition-colors ${onClick ? "cursor-pointer hover:bg-muted" : "hover:bg-muted/40"} ${className}`}
    >
      {children}
    </tr>
  );
}

// Tabs
export function Tabs({ tabs, active, onChange }: { tabs: string[]; active: string; onChange: (t: string) => void }) {
  return (
    <div className="flex gap-0 border-b border-border">
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
            active === tab
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

// Section header
export function SectionHeader({ title, actions }: { title: string; actions?: ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-base font-semibold text-foreground font-display">{title}</h2>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

// Avatar placeholder
export function Avatar({ initials, size = "md", color = "blue" }: { initials: string; size?: "sm" | "md" | "lg"; color?: string }) {
  const sizes = { sm: "w-6 h-6 text-xs", md: "w-8 h-8 text-sm", lg: "w-12 h-12 text-lg" };
  const colors = ["bg-blue-500", "bg-emerald-500", "bg-violet-500", "bg-amber-500", "bg-rose-500"];
  const colorIdx = initials.charCodeAt(0) % colors.length;
  return (
    <div className={`${sizes[size]} ${colors[colorIdx]} rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0`}>
      {initials.slice(0, 2).toUpperCase()}
    </div>
  );
}

// Toast
export function Toast({ message, type = "success", onClose }: { message: string; type?: "success" | "error" | "info"; onClose: () => void }) {
  const styles = {
    success: "bg-emerald-600 text-white",
    error: "bg-red-600 text-white",
    info: "bg-primary text-primary-foreground",
  };
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg shadow-lg text-sm font-medium flex items-center gap-2 ${styles[type]}`}>
      {message}
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">✕</button>
    </div>
  );
}

// Number input for stats
export function StatInput({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <input
        type="number"
        min={0}
        {...props}
        className="px-2 py-1.5 text-sm bg-card border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition w-full font-mono"
      />
    </div>
  );
}

// Section card for forms
export function FormSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card className="p-5">
      <h3 className="text-sm font-semibold text-foreground mb-4 pb-2 border-b border-border font-display">{title}</h3>
      {children}
    </Card>
  );
}

// Dropdown menu
export function DropdownMenu({ trigger, items }: {
  trigger: ReactNode;
  items: { label: string; onClick: () => void; danger?: boolean }[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  return (
    <div className="relative" ref={ref}>
      <div onClick={() => setOpen(!open)} className="cursor-pointer">{trigger}</div>
      {open && (
        <div className="absolute right-0 mt-1 w-44 bg-card border border-border rounded-lg shadow-lg z-50 py-1">
          {items.map(item => (
            <button key={item.label} onClick={() => { item.onClick(); setOpen(false); }}
              className={`w-full text-left px-3 py-2 text-sm transition-colors hover:bg-muted ${item.danger ? "text-red-600" : "text-foreground"}`}>
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Empty state
export function EmptyState({ icon, title, description }: { icon: string; title: string; description?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-sm font-semibold text-foreground mb-1">{title}</h3>
      {description && <p className="text-sm text-muted-foreground max-w-xs">{description}</p>}
    </div>
  );
}

// Loading skeleton
export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`bg-muted animate-pulse rounded ${className}`} />;
}

// Page header
export function PageHeader({ title, subtitle, breadcrumb, actions }: {
  title: string; subtitle?: string; breadcrumb?: string[]; actions?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        {breadcrumb && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
            {breadcrumb.map((crumb, i) => (
              <span key={crumb} className="flex items-center gap-1.5">
                {i > 0 && <span>/</span>}
                <span className={i === breadcrumb.length - 1 ? "text-foreground font-medium" : ""}>{crumb}</span>
              </span>
            ))}
          </div>
        )}
        <h1 className="text-xl font-bold text-foreground font-display">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
    </div>
  );
}
