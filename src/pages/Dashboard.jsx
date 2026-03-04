import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { scans } from "../data/scans";

const severityOrder = ["Critical", "High", "Medium", "Low"];

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredScans = useMemo(() => {
    const term = search.toLowerCase();
    return scans.filter(
      (scan) =>
        scan.name.toLowerCase().includes(term) ||
        scan.type.toLowerCase().includes(term),
    );
  }, [search]);

  const stats = useMemo(() => {
    const counts = {
      Critical: 0,
      High: 0,
      Medium: 0,
      Low: 0,
    };

    scans.forEach((scan) => {
      severityOrder.forEach((level) => {
        counts[level] += scan.vulnerabilities[level.toLowerCase()] ?? 0;
      });
    });

    return severityOrder.map((level) => ({
      level,
      count: counts[level],
      change: level === "Critical" ? "+2%" : "+0.9%",
      trend: level === "Medium" ? "down" : "up",
    }));
  }, []);

  return (
    <div className="space-y-6">
      {/* Org stats bar */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <article
            key={item.level}
            className="rounded-xl border border-border bg-card px-4 py-3"
          >
            <p className="text-xs text-gray-500">{item.level} Severity</p>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-semibold">{item.count}</span>
              <span
                className={`text-xs ${
                  item.trend === "up" ? "text-emerald-500" : "text-red-400"
                }`}
              >
                {item.change}{" "}
                {item.trend === "up" ? "increase than yesterday" : "decrease than yesterday"}
              </span>
            </div>
          </article>
        ))}
      </section>

      {/* Toolbar */}
      <section className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-2">
          <input
            type="text"
            placeholder="Search scans by name or type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
          />
          <button className="hidden whitespace-nowrap rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground/80 hover:bg-background sm:inline-flex">
            Filter
          </button>
          <button className="hidden whitespace-nowrap rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground/80 hover:bg-background sm:inline-flex">
            Columns
          </button>
        </div>
        <button className="whitespace-nowrap rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-teal-500">
          New Scan
        </button>
      </section>

      {/* Scan table */}
      <section className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-border bg-background/60 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">Scan Name</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Progress</th>
                <th className="px-4 py-3">Vulnerability</th>
                <th className="px-4 py-3">Last Scan</th>
              </tr>
            </thead>
            <tbody>
              {filteredScans.map((scan) => (
                <tr
                  key={scan.id}
                  onClick={() => navigate(`/scans/${scan.id}`)}
                  className="cursor-pointer border-t border-border/60 hover:bg-background/60"
                >
                  <td className="px-4 py-3 font-medium">{scan.name}</td>
                  <td className="px-4 py-3 text-xs text-gray-500">
                    {scan.type}
                  </td>
                  <td className="px-4 py-3">
                    <StatusChip status={scan.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-border">
                        <div
                          className={`h-full rounded-full ${
                            scan.status === "Failed"
                              ? "bg-red-500"
                              : "bg-primary"
                          }`}
                          style={{ width: `${scan.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">
                        {scan.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <SeverityPill
                        label="C"
                        colorClass="bg-critical/10 text-critical"
                        value={scan.vulnerabilities.critical}
                      />
                      <SeverityPill
                        label="H"
                        colorClass="bg-high/10 text-high"
                        value={scan.vulnerabilities.high}
                      />
                      <SeverityPill
                        label="M"
                        colorClass="bg-medium/10 text-medium"
                        value={scan.vulnerabilities.medium}
                      />
                      <SeverityPill
                        label="L"
                        colorClass="bg-low/10 text-low"
                        value={scan.vulnerabilities.low}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">
                    {scan.lastScan}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-border px-4 py-2 text-xs text-gray-500">
          Showing {filteredScans.length} of {scans.length} scans
        </div>
      </section>
    </div>
  );
}

function StatusChip({ status }) {
  const colorMap = {
    Completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/40",
    Scheduled: "bg-gray-500/10 text-gray-300 border-gray-500/40",
    Failed: "bg-red-500/10 text-red-400 border-red-500/40",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${colorMap[status]}`}
    >
      {status}
    </span>
  );
}

function SeverityPill({ label, colorClass, value }) {
  return (
    <span
      className={`inline-flex min-w-6 items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${colorClass}`}
    >
      {value}
    </span>
  );
}