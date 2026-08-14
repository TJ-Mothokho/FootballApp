import { useState } from "react";
import { Card, Button, Badge, PageHeader, Toast } from "../components/ui";

const reports = [
  {
    id: "match-review",
    title: "Match Review",
    description: "Comprehensive post-match analysis including team and player performance breakdowns.",
    icon: "⚽",
    lastGenerated: "2026-08-10",
    category: "Match",
  },
  {
    id: "match-preview",
    title: "Match Preview",
    description: "Pre-match analysis covering opponent tendencies, form, and tactical considerations.",
    icon: "📋",
    lastGenerated: "2026-08-09",
    category: "Match",
  },
  {
    id: "team-review",
    title: "Team Review",
    description: "Season-to-date team analysis with statistical trends and key insights.",
    icon: "🏟",
    lastGenerated: "2026-08-07",
    category: "Team",
  },
  {
    id: "player-review",
    title: "Player Review",
    description: "Individual player performance report with ratings, stats and analytical summary.",
    icon: "👤",
    lastGenerated: "2026-08-06",
    category: "Player",
  },
  {
    id: "season-summary",
    title: "Season Summary",
    description: "Full league season wrap-up with standings, awards, and narrative overview.",
    icon: "📊",
    lastGenerated: "2026-06-01",
    category: "Season",
  },
  {
    id: "notebooklm",
    title: "NotebookLM Export",
    description: "Export structured match and player data formatted for AI analysis in NotebookLM.",
    icon: "🤖",
    lastGenerated: "2026-08-10",
    category: "Export",
  },
];

function ReportCard({ report, onGenerate }: { report: typeof reports[0]; onGenerate: (id: string) => void }) {
  const [loading, setLoading] = useState(false);
  const generate = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    onGenerate(report.id);
  };
  return (
    <Card className="p-5 flex flex-col gap-3 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{report.icon}</div>
          <div>
            <h3 className="font-semibold text-foreground font-display">{report.title}</h3>
            <Badge variant="muted">{report.category}</Badge>
          </div>
        </div>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed flex-1">{report.description}</p>
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <span className="text-xs text-muted-foreground font-mono">
          Last: {report.lastGenerated}
        </span>
        <Button variant="primary" onClick={generate} disabled={loading}>
          {loading ? "Generating…" : "Generate"}
        </Button>
      </div>
    </Card>
  );
}

function ReportDetail({ id, onClose }: { id: string; onClose: () => void }) {
  const report = reports.find(r => r.id === id)!;
  return (
    <div className="space-y-5">
      <PageHeader
        title={report.title}
        subtitle={`Generated ${report.lastGenerated}`}
        breadcrumb={["Reports", report.title]}
        actions={
          <>
            <Button variant="secondary" onClick={onClose}>← Back</Button>
            <Button variant="ghost">Copy</Button>
            <Button variant="ghost">Export</Button>
            <Button variant="primary">Regenerate</Button>
          </>
        }
      />
      <Card className="p-6">
        <div className="prose prose-sm max-w-none space-y-4">
          <h3 className="text-base font-semibold text-foreground font-display">Executive Summary</h3>
          <p className="text-sm text-foreground leading-relaxed">
            This {report.title.toLowerCase()} covers the 2026/2027 Betway Premiership season through Matchweek 10. Orlando Pirates lead the standings with 23 points, followed by Mamelodi Sundowns on 22.
          </p>
          <h3 className="text-base font-semibold text-foreground font-display">Key Statistics</h3>
          <p className="text-sm text-foreground leading-relaxed">
            131 goals have been scored across 88 matches this season, averaging 1.49 per match. The top scorer is Peter Shalulile (Mamelodi Sundowns) with 9 goals. Thabo Nodada leads assists with 6. The average match rating across all players stands at 7.1.
          </p>
          <h3 className="text-base font-semibold text-foreground font-display">Tactical Observations</h3>
          <p className="text-sm text-foreground leading-relaxed">
            Home teams have won 38 of 88 matches (43%). Possession-based teams are outperforming counter-attacking sides in early season results. Set pieces have accounted for 22% of all goals.
          </p>
          <h3 className="text-base font-semibold text-foreground font-display">Analyst Commentary</h3>
          <p className="text-sm text-foreground leading-relaxed">
            Orlando Pirates continue to build on their title-winning momentum. José Riveiro's tactical flexibility has been key — the 4-2-3-1 system offers defensive solidity while maintaining attacking threat through Evidence Makgopa's movement in behind. Mamelodi Sundowns remain the benchmark for quality, and the title race will likely be decided in the reverse fixtures between these two sides.
          </p>
        </div>
      </Card>
    </div>
  );
}

export default function Reports() {
  const [generatedId, setGeneratedId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const handleGenerate = (id: string) => {
    setToast(`${reports.find(r => r.id === id)?.title} generated`);
    setGeneratedId(id);
  };

  if (generatedId) return (
    <>
      {toast && <Toast message={toast} type="success" onClose={() => setToast(null)} />}
      <ReportDetail id={generatedId} onClose={() => setGeneratedId(null)} />
    </>
  );

  return (
    <div className="space-y-5">
      {toast && <Toast message={toast} type="success" onClose={() => setToast(null)} />}
      <PageHeader title="Reports" subtitle="Generate analysis and export structured data" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map(r => (
          <ReportCard key={r.id} report={r} onGenerate={handleGenerate} />
        ))}
      </div>
    </div>
  );
}
