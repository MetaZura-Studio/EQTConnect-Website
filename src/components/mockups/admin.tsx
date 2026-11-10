import { Settings2, UserRoundPlus } from "lucide-react";
import { cn } from "@/lib/cn";
import { sampleUsers } from "@/content/mock-data";
import { StatusBadge } from "@/components/ui/badge";
import { Avatar, MockFrame, MockPanel } from "@/components/mockups/primitives";

/** Module names only — no specific permission model, SSO or audit capability is implied. */
const modules = ["Shareholder data", "Communications", "Dispatch", "Reporting"];
const accessMatrix: Record<string, boolean[]> = {
  "Ayesha K.": [true, true, true, true],
  "Omar T.": [true, true, false, true],
  "Sara L.": [false, false, true, true],
  "Daniel P.": [false, false, false, true],
};

function Toggle({ on }: { on: boolean }) {
  return (
    <span className={cn("relative inline-block h-3.5 w-6 rounded-full transition-colors", on ? "bg-brand-600" : "bg-line-strong")}>
      <span className={cn("absolute top-0.5 size-2.5 rounded-full bg-white shadow-xs", on ? "left-3" : "left-0.5")} />
    </span>
  );
}

export function AdminMock({ className }: { className?: string }) {
  return (
    <MockFrame
      className={className}
      title="Administration"
      label="Conceptual administration view listing platform users with their assigned area and status, and an illustrative grid of which platform areas each user can access"
      bodyClassName="bg-canvas p-3 sm:p-4"
    >
      <div className="grid gap-3 lg:grid-cols-5">
        <MockPanel
          title="Users"
          action={
            <span className="flex items-center gap-1 rounded-md bg-brand-600 px-2 py-1 text-[0.625rem] font-medium text-white">
              <UserRoundPlus className="size-3" /> Invite
            </span>
          }
          className="lg:col-span-2"
        >
          <ul className="divide-y divide-line">
            {sampleUsers.map((user) => (
              <li key={user.email} className="flex items-center gap-2.5 px-3.5 py-2.5">
                <Avatar name={user.name} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-2xs font-medium">{user.name}</p>
                  <p className="truncate text-[0.625rem] text-fg-subtle">{user.area}</p>
                </div>
                <StatusBadge tone={user.status === "Active" ? "success" : "neutral"}>{user.status}</StatusBadge>
              </li>
            ))}
          </ul>
        </MockPanel>

        <MockPanel
          title="Access by platform area"
          action={<Settings2 className="size-3.5 text-fg-subtle" />}
          className="lg:col-span-3"
        >
          <div className="overflow-hidden">
            <table className="w-full table-fixed text-2xs">
              <thead>
                <tr className="border-b border-line text-[0.625rem] text-fg-subtle">
                  <th className="w-[5.5rem] px-3.5 py-2 text-left font-medium">User</th>
                  {modules.map((module) => (
                    <th key={module} className="px-1 py-2 text-center font-medium">
                      <span className="block truncate">{module}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {sampleUsers.map((user) => (
                  <tr key={user.email}>
                    <td className="truncate px-3.5 py-2.5 font-medium">{user.name}</td>
                    {(accessMatrix[user.name] ?? []).map((on, i) => (
                      <td key={modules[i]} className="px-1 py-2.5 text-center">
                        <Toggle on={on} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="border-t border-line px-3.5 py-2 text-[0.625rem] text-fg-subtle">
            Illustrative only. Available permission options depend on the platform configuration.
          </p>
        </MockPanel>
      </div>
    </MockFrame>
  );
}
