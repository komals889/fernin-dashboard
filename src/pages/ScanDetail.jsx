import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { scans } from "../data/scans";

const steps = ["Spidering", "Mapping", "Testing", "Validating", "Reporting"];

const activityLog = [
  "[09:00:00] I'll begin a systematic penetration test on helpdesk.democorp.com. Let me start with reconnaissance and enumeration",
  "[09:01:00] Good! target is online. Now let me perform port scanning to identify running services",
  "[09:02:00] Excellent reconnaissance results - helpdesk.democorp.com: Apache httpd 2.4.65 on port 80 (web server). Let me probe the web server on target first to understand its structure",
  '[09:03:00] Great! I found a login page for a Help Desk Platform. I can see a useful comment: "TODO: Delete the testing account (test:test)". Let me test this credential.',
  "[09:04:00] The POST method is not allowed on /password/test. Let me check what the JavaScript does - it posts to '#', which means the current page.",
  "[09:06:00] Great! I can access the dashboard using the 'X-UserId: 10032' header. This suggests an **IDOR vulnerability** - I can access any user's dashboard by changing the X-UserId header.",
];

const findings = [
  {
    id: 1,
    severity: "Critical",
    time: "10:45:20",
    title: "SQL Injection in Authentication Endpoint",
    path: "/api/users/profile",
    description:
      "Time-based blind SQL injection confirmed on user-controlled input during authentication flow. Exploitation allows database-level access.",
  },
  {
    id: 2,
    severity: "High",
    time: "10:45:20",
    title: "Unauthorized Access to User Metadata",
    path: "/api/auth/login",
    description:
      "Authenticated low-privilege user was able to access metadata of other users. Access control checks were missing.",
  },
  {
    id: 3,
    severity: "Medium",
    time: "10:45:20",
    title: "Broken Authentication Rate Limiting",
    path: "/api/search",
    description:
      "No effective rate limiting detected on login attempts. Automated brute-force attempts possible.",
  },
];

export default function ScanDetail() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("activity");

  const scan = useMemo(
    () => scans.find((s) => s.id === id) ?? scans[0],
    [id],
  );

  const progress = scan.progress ?? 0;

  return (
    <div className="flex h-full flex-col gap-4">
      {/* Header with progress + controls */}
      <section className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          {/* Circular indicator (simple version) */}
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-4 border-primary/30">
            <span className="text-xs font-medium">
              {progress}
              <span className="text-[10px] text-gray-500">%</span>
            </span>
          </div>
          <div>
            <p className="text-xs text-gray-500">Scan · Private Asset</p>
            <h2 className="text-lg font-semibold">{scan.name}</h2>
            <p className="mt-1 text-xs text-gray-500">
              0 In Progress · Greybox · {scan.lastScan}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button className="rounded-lg bg-primary px-4 py-2 text-xs font-medium text-white hover:bg-teal-500">
            New Scan
          </button>
          <button className="rounded-lg border border-border bg-background px-4 py-2 text-xs font-medium hover:bg-background/80">
            Export Report
          </button>
          <button className="rounded-lg border border-red-500/60 bg-red-500/10 px-4 py-2 text-xs font-medium text-red-400 hover:bg-red-500/20">
            Stop Scan
          </button>
        </div>
      </section>

      {/* Stepper + metadata */}
      <section className="grid gap-4 rounded-xl border border-border bg-card p-4 lg:grid-cols-[2fr,3fr]">
        <div>
          <div className="text-xs font-medium text-gray-500">
            0 In Progress
          </div>
          <ol className="mt-3 flex flex-wrap gap-2 text-xs">
            {steps.map((step, index) => {
              const isActive = index === 0;
              return (
                <li
                  key={step}
                  className={`flex items-center gap-2 rounded-full border px-3 py-1 ${
                    isActive
                      ? "border-primary/60 bg-primary/10 text-primary"
                      : "border-border bg-background text-gray-400"
                  }`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  {step}
                </li>
              );
            })}
          </ol>
        </div>

        <dl className="grid grid-cols-2 gap-3 text-xs md:grid-cols-3">
          <MetaItem label="Scan Type" value="Grey Box" />
          <MetaItem label="Target" value="google.com" />
          <MetaItem label="Started at" value="Nov 22, 09:00 AM" />
          <MetaItem label="Credentials" value="2 Active" />
          <MetaItem label="Files" value="Control.pdf" />
          <MetaItem label="Checklist" value="40 / 35" />
        </dl>
      </section>

      {/* Console + findings */}
      <section className="grid flex-1 gap-4 rounded-xl border border-border bg-card p-4 xl:grid-cols-[3fr,2fr]">
        {/* Live console */}
        <div className="flex flex-col rounded-lg border border-border bg-background/60">
          <header className="flex items-center justify-between border-b border-border px-4 py-2 text-xs">
            <div className="font-medium">Live Scan Console</div>
            <span className="text-[10px] text-emerald-400">Running...</span>
          </header>

          <div className="flex border-b border-border text-xs">
            <button
              onClick={() => setActiveTab("activity")}
              className={`flex-1 px-4 py-2 text-left ${
                activeTab === "activity"
                  ? "border-b-2 border-primary text-primary"
                  : "text-gray-500"
              }`}
            >
              Activity Log
            </button>
            <button
              onClick={() => setActiveTab("verification")}
              className={`flex-1 px-4 py-2 text-left ${
                activeTab === "verification"
                  ? "border-b-2 border-primary text-primary"
                  : "text-gray-500"
              }`}
            >
              Verification Loops
            </button>
          </div>

          <div className="flex-1 space-y-1 overflow-auto bg-black px-4 py-3 text-[11px] font-mono text-gray-200">
            {(activeTab === "activity" ? activityLog : activityLog.slice(2)).map(
              (line, index) => (
                <pre key={index} className="whitespace-pre-wrap">
                  {line}
                </pre>
              ),
            )}
          </div>
        </div>

        {/* Findings */}
        <div className="flex flex-col">
          <header className="mb-2 flex items-center justify-between text-xs">
            <div className="font-medium">Finding Log</div>
          </header>

          <div className="flex-1 space-y-3 overflow-auto">
            {findings.map((finding) => (
              <article
                key={finding.id}
                className="rounded-lg border border-border bg-background/60 p-3 text-xs"
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <SeverityBadge severity={finding.severity} />
                  <span className="text-[10px] text-gray-500">
                    {finding.time}
                  </span>
                </div>
                <h3 className="text-sm font-medium">{finding.title}</h3>
                <p className="mt-1 text-[11px] text-primary">
                  {finding.path}
                </p>
                <p className="mt-1 text-[11px] text-gray-400">
                  {finding.description}
                </p>
              </article>
            ))}
          </div>

          <footer className="mt-3 grid grid-cols-2 gap-2 rounded-lg border border-border bg-background/80 p-3 text-[10px] text-gray-500 sm:grid-cols-4">
            <MetaItem label="Sub-agents" value="4" />
            <MetaItem label="Parallel Executions" value="8" />
            <MetaItem label="Operations" value="120" />
            <div className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-critical" /> 5
              <span className="h-1.5 w-1.5 rounded-full bg-high" /> 3
              <span className="h-1.5 w-1.5 rounded-full bg-medium" /> 2
              <span className="h-1.5 w-1.5 rounded-full bg-low" /> 1
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
}

function MetaItem({ label, value }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-wide text-gray-500">
        {label}
      </dt>
      <dd className="mt-0.5 text-xs font-medium text-foreground/90">
        {value}
      </dd>
    </div>
  );
}

function SeverityBadge({ severity }) {
  const map = {
    Critical: "bg-critical/10 text-critical",
    High: "bg-high/10 text-high",
    Medium: "bg-medium/10 text-medium",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${map[severity]}`}
    >
      {severity}
    </span>
  );
}
