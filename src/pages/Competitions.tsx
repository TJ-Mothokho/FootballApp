import { useState } from "react";
import { Card, Badge, Button, Table, Th, Td, Tr, Tabs, PageHeader, StatCard, Avatar, Input, Skeleton, ConfirmDialog, Toast } from "../components/ui";
import { FormBadge } from "../components/ui";
import { useQuery } from "../hooks/useApi";
import {
  fetchCompetitions,
  fetchCompetitionStandings,
  fetchCompetitionStatistics,
  fetchCompetitionFixtures,
  fetchCompetitionResults,
  fetchCompetitionTopScorers, deleteCompetition,
  n, f,
  type StandingView,
  type MatchView,
  type TopPerformerView,
} from "../services/api";
import { CompetitionEditor } from "../components/EntityCrudForms";

function CompetitionDetail({ id, name, country, currentSeason, onBack, onEdit, onDelete }: {
  id: string; name: string; country: string; currentSeason: string; onBack: () => void; onEdit: () => void; onDelete: () => void;
}) {
  const [tab, setTab] = useState("Overview");
  const stats = useQuery(() => fetchCompetitionStatistics(id), [id]);
  const standings = useQuery(() => fetchCompetitionStandings(id), [id]);
  const fixtures = useQuery(() => fetchCompetitionFixtures(id), [id]);
  const results = useQuery(() => fetchCompetitionResults(id), [id]);
  const topScorers = useQuery(() => fetchCompetitionTopScorers(id), [id]);

  const s = stats.data;
  const teamsCount = standings.data?.length ?? (s ? n(s.matches) : 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title={name}
        subtitle={`${country} • ${currentSeason}`}
        breadcrumb={["Competitions", name]}
        actions={
          <>
            <Button variant="secondary" onClick={onBack}>← Back</Button>
            <Button variant="secondary" onClick={onEdit}>Edit</Button>
            <Button variant="danger" onClick={onDelete}>Delete</Button>
          </>
        }
      />
      {/* Header stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.loading ? (
          Array.from({ length: 4 }).map((_, i) => <Card key={i} className="p-4"><Skeleton className="h-8 w-full" /></Card>)
        ) : (
          <>
            <StatCard label="Teams" value={teamsCount} />
            <StatCard label="Total Matches" value={s ? n(s.matches) : "—"} />
            <StatCard label="Completed" value={s ? n(s.completedMatches) : "—"} />
            <StatCard label="Goals" value={s ? n(s.goals) : "—"} />
          </>
        )}
      </div>
      <Tabs
        tabs={["Overview", "Standings", "Fixtures", "Results", "Statistics", "Top Scorers"]}
        active={tab}
        onChange={setTab}
      />

      {tab === "Overview" && (
        <Card className="p-5">
          {stats.loading ? <Skeleton className="h-16 w-full" /> : (
            <>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">{name}</strong> — {country} • {currentSeason}
              </p>
              {s && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <StatCard label="Avg Goals / Match" value={f(s.averageGoalsPerMatch).toFixed(2)} />
                  <StatCard label="Upcoming" value={n(s.upcomingMatches)} />
                </div>
              )}
            </>
          )}
        </Card>
      )}

      {tab === "Standings" && (
        <Card className="overflow-hidden">
          {standings.loading ? (
            <div className="p-5 space-y-2">{Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-8 w-full" />)}</div>
          ) : standings.error ? (
            <p className="text-sm text-muted-foreground text-center py-10">Could not load standings</p>
          ) : (standings.data?.length ?? 0) === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-10">No standings data available yet</p>
          ) : (
            <Table>
              <thead>
                <tr>
                  <Th>#</Th><Th>Team</Th><Th className="text-center">P</Th>
                  <Th className="text-center">W</Th><Th className="text-center">D</Th><Th className="text-center">L</Th>
                  <Th className="text-center">GF</Th><Th className="text-center">GA</Th>
                  <Th className="text-center">GD</Th><Th className="text-center font-bold">Pts</Th><Th>Form</Th>
                </tr>
              </thead>
              <tbody>
                {(standings.data ?? []).map((row: StandingView) => (
                  <Tr key={row.teamId}>
                    <Td className="text-muted-foreground font-mono text-xs">{row.pos}</Td>
                    <Td><div className="flex items-center gap-2"><Avatar initials={row.team.slice(0, 2)} size="sm" /><span className="font-medium">{row.team}</span></div></Td>
                    <Td className="text-center font-mono text-xs">{row.played}</Td>
                    <Td className="text-center font-mono text-xs">{row.won}</Td>
                    <Td className="text-center font-mono text-xs">{row.drawn}</Td>
                    <Td className="text-center font-mono text-xs">{row.lost}</Td>
                    <Td className="text-center font-mono text-xs">{row.gf}</Td>
                    <Td className="text-center font-mono text-xs">{row.ga}</Td>
                    <Td className="text-center font-mono text-xs">{row.gd > 0 ? `+${row.gd}` : row.gd}</Td>
                    <Td className="text-center font-mono font-bold">{row.points}</Td>
                    <Td><div className="flex items-center gap-0.5">{row.form.map((r, i) => <FormBadge key={i} result={r} />)}</div></Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card>
      )}

      {tab === "Fixtures" && (
        <Card className="overflow-hidden">
          {fixtures.loading ? <div className="p-5 space-y-2">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-8 w-full" />)}</div>
            : fixtures.error ? <p className="text-sm text-muted-foreground text-center py-10">Could not load fixtures</p>
            : (fixtures.data?.length ?? 0) === 0 ? <p className="text-sm text-muted-foreground text-center py-10">No upcoming fixtures</p>
            : (
              <Table>
                <thead><tr><Th>Date</Th><Th>Home</Th><Th className="text-center">vs</Th><Th>Away</Th><Th>Venue</Th></tr></thead>
                <tbody>
                  {(fixtures.data ?? []).map((m: MatchView) => (
                    <Tr key={m.id}>
                      <Td className="font-mono text-xs text-muted-foreground whitespace-nowrap">{m.date} {m.kickOff}</Td>
                      <Td className="font-medium text-sm">{m.homeTeam}</Td>
                      <Td className="text-center text-muted-foreground text-xs">vs</Td>
                      <Td className="font-medium text-sm">{m.awayTeam}</Td>
                      <Td className="text-xs text-muted-foreground">{m.venue}</Td>
                    </Tr>
                  ))}
                </tbody>
              </Table>
            )}
        </Card>
      )}

      {tab === "Results" && (
        <Card className="overflow-hidden">
          {results.loading ? <div className="p-5 space-y-2">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-8 w-full" />)}</div>
            : results.error ? <p className="text-sm text-muted-foreground text-center py-10">Could not load results</p>
            : (results.data?.length ?? 0) === 0 ? <p className="text-sm text-muted-foreground text-center py-10">No results yet</p>
            : (
              <Table>
                <thead><tr><Th>Date</Th><Th>Home</Th><Th className="text-center">Score</Th><Th>Away</Th><Th>Status</Th></tr></thead>
                <tbody>
                  {(results.data ?? []).map((m: MatchView) => (
                    <Tr key={m.id}>
                      <Td className="font-mono text-xs text-muted-foreground whitespace-nowrap">{m.date}</Td>
                      <Td className="font-medium text-sm">{m.homeTeam}</Td>
                      <Td className="text-center font-mono font-bold">{m.homeGoals} – {m.awayGoals}</Td>
                      <Td className="font-medium text-sm">{m.awayTeam}</Td>
                      <Td><Badge variant="success">FT</Badge></Td>
                    </Tr>
                  ))}
                </tbody>
              </Table>
            )}
        </Card>
      )}

      {tab === "Top Scorers" && (
        <Card className="overflow-hidden">
          {topScorers.loading ? <div className="p-5 space-y-2">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-8 w-full" />)}</div>
            : topScorers.error ? <p className="text-sm text-muted-foreground text-center py-10">Could not load top scorers</p>
            : (topScorers.data?.length ?? 0) === 0 ? <p className="text-sm text-muted-foreground text-center py-10">No data yet</p>
            : (
              <Table>
                <thead><tr><Th>#</Th><Th>Player</Th><Th>Team</Th><Th className="text-center">Goals</Th></tr></thead>
                <tbody>
                  {(topScorers.data ?? []).map((p: TopPerformerView, i: number) => (
                    <Tr key={p.playerId}>
                      <Td className="font-mono text-xs text-muted-foreground">{i + 1}</Td>
                      <Td><div className="flex items-center gap-2"><Avatar initials={p.name.slice(0, 2)} size="sm" /><span className="font-medium">{p.name}</span></div></Td>
                      <Td className="text-sm text-muted-foreground">{p.team}</Td>
                      <Td className="text-center font-mono font-bold text-primary">{p.stat}</Td>
                    </Tr>
                  ))}
                </tbody>
              </Table>
            )}
        </Card>
      )}

      {tab === "Statistics" && (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground text-sm">Detailed statistics for {name} — use the API endpoint directly for full breakdowns.</p>
        </Card>
      )}
    </div>
  );
}

export default function Competitions({ onNavigate }: { onNavigate: (page: string, id?: string) => void }) {
  const [selected, setSelected] = useState<{ id: string; name: string; country: string; currentSeason: string } | null>(null);
  const [editing, setEditing] = useState<CompetitionView | null | "new">(null);
  const [deleting, setDeleting] = useState(false);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const { data: comps, loading, error, refetch } = useQuery(fetchCompetitions);

  const remove = async () => {
    if (!selected) return;
    setPending(true);
    try {
      await deleteCompetition(selected.id);
      setDeleting(false);
      setSelected(null);
      setMessage("Competition deleted successfully.");
      refetch();
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Delete failed.");
    } finally { setPending(false); }
  };

  const saved = () => {
    setEditing(null);
    setMessage("Competition saved successfully.");
    refetch();
  };

  if (selected) {
    const selectedView = { ...selected, teams: 0, matches: 0, status: "Active" } as CompetitionView;
    return <><CompetitionDetail id={selected.id} name={selected.name} country={selected.country} currentSeason={selected.currentSeason} onBack={() => setSelected(null)} onEdit={() => setEditing(selectedView)} onDelete={() => setDeleting(true)} />{editing && <CompetitionEditor competition={editing === "new" ? undefined : editing} onClose={() => setEditing(null)} onSaved={saved} />}{deleting && <ConfirmDialog title="Delete Competition" message={`Delete ${selected.name}? This cannot be undone.`} onCancel={() => setDeleting(false)} onConfirm={remove} pending={pending} />}{message && <Toast message={message} type={message.includes("success") ? "success" : "error"} onClose={() => setMessage(null)} />}</>;
  }

  const filtered = (comps ?? []).filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      {message && <Toast message={message} type={message.includes("success") ? "success" : "error"} onClose={() => setMessage(null)} />}
      <PageHeader
        title="Competitions"
        subtitle="Manage and view all competitions"
        actions={<Button variant="primary" onClick={() => setEditing("new")}>+ New Competition</Button>}
      />
      <div className="flex items-center gap-2">
        <Input placeholder="Search competitions…" value={search} onChange={e => setSearch(e.target.value)} className="max-w-xs" />
      </div>
      <Card className="overflow-hidden">
        {loading ? (
          <div className="p-5 space-y-2">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}</div>
        ) : error ? (
          <p className="text-sm text-muted-foreground text-center py-10">Could not load competitions. Check API connectivity.</p>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-10">No competitions found</p>
        ) : (
          <Table>
            <thead>
              <tr>
                <Th>Competition</Th>
                <Th>Country</Th>
                <Th>Current Season</Th>
                <Th className="text-center">Matches</Th>
                <Th>Status</Th>
                <Th></Th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <Tr key={c.id} onClick={() => setSelected({ id: c.id, name: c.name, country: c.country, currentSeason: c.currentSeason })}>
                  <Td><div className="flex items-center gap-2"><Avatar initials={c.name.slice(0, 2)} size="sm" /><span className="font-medium">{c.name}</span></div></Td>
                  <Td className="text-muted-foreground text-xs">{c.country}</Td>
                  <Td className="font-mono text-xs">{c.currentSeason}</Td>
                  <Td className="text-center font-mono text-xs">{c.matches}</Td>
                  <Td><Badge variant={c.status === "Active" ? "success" : "muted"}>{c.status}</Badge></Td>
                  <Td><Button variant="ghost" className="text-xs">View →</Button></Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
      {editing && <CompetitionEditor competition={editing === "new" ? undefined : editing} onClose={() => setEditing(null)} onSaved={saved} />}
    </div>
  );
}
