import { useState } from "react";
import { Card, Badge, Button, Table, Th, Td, Tr, Tabs, PageHeader, StatCard, Input, Skeleton, ConfirmDialog, Toast } from "../components/ui";
import { FormBadge, Avatar } from "../components/ui";
import { useQuery } from "../hooks/useApi";
import {
  fetchSeasons,
  fetchSeasonStatistics,
  fetchSeasonMatches, deleteSeason,
  n, f,
  type SeasonView,
  type MatchView,
} from "../services/api";
import { SeasonEditor } from "../components/EntityCrudForms";

function SeasonDetail({ season, onBack, onEdit, onDelete }: { season: SeasonView; onBack: () => void; onEdit: () => void; onDelete: () => void }) {
  const [tab, setTab] = useState("Overview");
  const stats = useQuery(() => fetchSeasonStatistics(season.id), [season.id]);
  const seasonMatches = useQuery(() => fetchSeasonMatches(season.id), [season.id]);

  const s = stats.data;

  return (
    <div className="space-y-6">
      <PageHeader
        title={season.name}
        subtitle={season.competition || "Season"}
        breadcrumb={["Seasons", season.name]}
        actions={
          <>
            <Button variant="secondary" onClick={onBack}>← Back</Button>
            <Button variant="secondary" onClick={onEdit}>Edit</Button>
            <Button variant="danger" onClick={onDelete}>Delete</Button>
          </>
        }
      />
      <div className="flex items-center gap-2">
        <Badge variant={season.isCurrent ? "success" : "muted"}>{season.status}</Badge>
        {season.startDate && <span className="text-sm text-muted-foreground font-mono">{season.startDate} → {season.endDate}</span>}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {stats.loading ? (
          Array.from({ length: 5 }).map((_, i) => <Card key={i} className="p-4"><Skeleton className="h-8 w-full" /></Card>)
        ) : (
          <>
            <StatCard label="Matches" value={s ? n(s.matches ?? 0) : "—"} />
            <StatCard label="Completed" value={s ? n(s.completedMatches ?? 0) : "—"} />
            <StatCard label="Teams" value={s ? n(s.teams ?? 0) : "—"} />
            <StatCard label="Goals" value={s ? n(s.goals ?? 0) : "—"} />
            <StatCard label="Avg Goals" value={s ? f(s.averageGoalsPerMatch).toFixed(2) : "—"} />
          </>
        )}
      </div>
      <Tabs tabs={["Overview", "Fixtures", "Results"]} active={tab} onChange={setTab} />

      {tab === "Overview" && (
        <Card className="p-5">
          {stats.loading ? <Skeleton className="h-12 w-full" /> : (
            <p className="text-sm text-muted-foreground">
              Season <strong className="text-foreground">{season.name}</strong> — {season.startDate} to {season.endDate}.
              {s && ` ${n(s.completedMatches ?? 0)} of ${n(s.matches ?? 0)} matches completed.`}
            </p>
          )}
        </Card>
      )}

      {(tab === "Fixtures" || tab === "Results") && (
        <Card className="overflow-hidden">
          {seasonMatches.loading ? (
            <div className="p-5 space-y-2">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-8 w-full" />)}</div>
          ) : seasonMatches.error ? (
            <p className="text-sm text-muted-foreground text-center py-10">Could not load matches</p>
          ) : (
            <Table>
              <thead>
                <tr>
                  <Th>Date</Th><Th>Home</Th><Th className="text-center">Score</Th><Th>Away</Th>
                  <Th>Venue</Th><Th>Status</Th>
                </tr>
              </thead>
              <tbody>
                {(seasonMatches.data ?? [])
                  .filter((m: MatchView) => tab === "Fixtures" ? m.status === "Upcoming" : m.status === "Completed")
                  .map((m: MatchView) => (
                    <Tr key={m.id}>
                      <Td className="font-mono text-xs text-muted-foreground whitespace-nowrap">{m.date}</Td>
                      <Td className="font-medium text-sm">{m.homeTeam}</Td>
                      <Td className="text-center font-mono font-bold">
                        {m.homeGoals !== null ? `${m.homeGoals} – ${m.awayGoals}` : "vs"}
                      </Td>
                      <Td className="font-medium text-sm">{m.awayTeam}</Td>
                      <Td className="text-xs text-muted-foreground">{m.venue}</Td>
                      <Td><Badge variant={m.status === "Completed" ? "success" : "muted"}>{m.status}</Badge></Td>
                    </Tr>
                  ))}
              </tbody>
            </Table>
          )}
        </Card>
      )}
    </div>
  );
}

export default function Seasons({ onNavigate }: { onNavigate: (page: string, id?: string) => void }) {
  const [selected, setSelected] = useState<SeasonView | null>(null);
  const [editing, setEditing] = useState<SeasonView | null | "new">(null);
  const [deleting, setDeleting] = useState(false);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const { data: seasons, loading, error, refetch } = useQuery(fetchSeasons);

  const saved = () => { setEditing(null); setMessage("Season saved successfully."); refetch(); };
  const remove = async () => {
    if (!selected) return;
    setPending(true);
    try { await deleteSeason(selected.id); setDeleting(false); setSelected(null); setMessage("Season deleted successfully."); refetch(); }
    catch (err) { setMessage(err instanceof Error ? err.message : "Delete failed."); }
    finally { setPending(false); }
  };

  if (selected) return <><SeasonDetail season={selected} onBack={() => setSelected(null)} onEdit={() => setEditing(selected)} onDelete={() => setDeleting(true)} />{editing && <SeasonEditor season={editing === "new" ? undefined : editing} onClose={() => setEditing(null)} onSaved={saved} />}{deleting && <ConfirmDialog title="Delete Season" message={`Delete ${selected.name}? This cannot be undone.`} onCancel={() => setDeleting(false)} onConfirm={remove} pending={pending} />}{message && <Toast message={message} type={message.includes("success") ? "success" : "error"} onClose={() => setMessage(null)} />}</>;

  const filtered = (seasons ?? []).filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.competition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      {message && <Toast message={message} type={message.includes("success") ? "success" : "error"} onClose={() => setMessage(null)} />}
      <PageHeader title="Seasons" subtitle="Manage competition seasons"
        actions={<Button variant="primary" onClick={() => setEditing("new")}>+ New Season</Button>}
      />
      <div className="flex items-center gap-2">
        <Input placeholder="Search seasons…" value={search} onChange={e => setSearch(e.target.value)} className="max-w-xs" />
      </div>
      <Card className="overflow-hidden">
        {loading ? (
          <div className="p-5 space-y-2">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}</div>
        ) : error ? (
          <p className="text-sm text-muted-foreground text-center py-10">Could not load seasons. Check API connectivity.</p>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-10">No seasons found</p>
        ) : (
          <Table>
            <thead>
              <tr>
                <Th>Season</Th><Th>Status</Th>
                <Th>Period</Th><Th></Th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(s => (
                <Tr key={s.id} onClick={() => setSelected(s)}>
                  <Td><span className="font-semibold font-mono">{s.name}</span></Td>
                  <Td><Badge variant={s.isCurrent ? "success" : "muted"}>{s.status}</Badge></Td>
                  <Td className="text-xs text-muted-foreground font-mono">
                    {s.startDate} {s.endDate ? `→ ${s.endDate}` : ""}
                  </Td>
                  <Td><Button variant="ghost" className="text-xs">View →</Button></Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
      {editing && <SeasonEditor season={editing === "new" ? undefined : editing} onClose={() => setEditing(null)} onSaved={saved} />}
    </div>
  );
}
