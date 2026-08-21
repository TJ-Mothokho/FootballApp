import { useState } from "react";
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import {
  Card, Badge, Button, Table, Th, Td, Tr, Tabs, PageHeader, StatCard, Avatar, Input, SectionHeader, Skeleton, ConfirmDialog, Toast
} from "../components/ui";
import { useQuery } from "../hooks/useApi";
import {
  fetchTeams, fetchTeam, fetchTeamStatistics, fetchTeamPlayers, fetchTeamMatches,
  fetchTeamTopScorers, fetchTeamTopAssists, fetchTeamMostMinutes, fetchTeamMostPasses, deleteTeam,
  n, f,
  type PlayerView, type MatchView, type TopPerformerView,
} from "../services/api";
import type { GetTeamDTO } from "../imports";
import { TeamEditor } from "../components/EntityCrudForms";

function TeamDetail({ teamId, onBack, onNavigate, onEdit, onDelete }: { teamId: string; onBack: () => void; onNavigate: (page: string, id?: string) => void; onEdit: (team: GetTeamDTO) => void; onDelete: (team: GetTeamDTO) => void }) {
  const [tab, setTab] = useState("Overview");

  const team = useQuery(() => fetchTeam(teamId), [teamId]);
  const stats = useQuery(() => fetchTeamStatistics(teamId), [teamId]);
  const players = useQuery(() => fetchTeamPlayers(teamId), [teamId]);
  const teamMatches = useQuery(() => fetchTeamMatches(teamId), [teamId]);
  const topScorers = useQuery(() => fetchTeamTopScorers(teamId), [teamId]);
  const topAssists = useQuery(() => fetchTeamTopAssists(teamId), [teamId]);
  const mostMinutes = useQuery(() => fetchTeamMostMinutes(teamId), [teamId]);
  const mostPasses = useQuery(() => fetchTeamMostPasses(teamId), [teamId]);

  const t = team.data;
  const s = stats.data;

  return (
    <div className="space-y-6">
      <PageHeader
        title={t?.name ?? "Team"}
        subtitle={t ? `${t.city ?? ""} · ${t.preferredFormation ?? ""}` : ""}
        breadcrumb={["Teams", t?.name ?? "Team"]}
        actions={<><Button variant="secondary" onClick={onBack}>← Back</Button>{t && <Button variant="secondary" onClick={() => onEdit(t)}>Edit</Button>}{t && <Button variant="danger" onClick={() => onDelete(t)}>Delete</Button>}</>}
      />

      {/* Team header card */}
      <Card className="p-5">
        {team.loading ? <Skeleton className="h-20 w-full" /> : t ? (
          <div className="flex items-start gap-5 flex-wrap">
            <Avatar initials={t.shortName?.slice(0, 2) ?? t.name.slice(0, 2)} size="lg" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-3 flex-1 min-w-0">
              <div><p className="text-xs text-muted-foreground">Coach</p><p className="text-sm font-medium">{t.coach}</p></div>
              <div><p className="text-xs text-muted-foreground">Captain</p><p className="text-sm font-medium">{t.captain ? `${t.captain.firstName} ${t.captain.lastName}` : "—"}</p></div>
              <div><p className="text-xs text-muted-foreground">Stadium</p><p className="text-sm font-medium">{t.stadium}</p></div>
              <div><p className="text-xs text-muted-foreground">City</p><p className="text-sm font-medium">{t.city}</p></div>
              <div><p className="text-xs text-muted-foreground">Formation</p><p className="text-sm font-medium font-mono">{t.preferredFormation ?? "—"}</p></div>
              <div><p className="text-xs text-muted-foreground">Playing Style</p><p className="text-sm font-medium">{t.playingStyle ?? "—"}</p></div>
              <div><p className="text-xs text-muted-foreground">Founded</p><p className="text-sm font-medium font-mono">{n(t.foundedYear) || "—"}</p></div>
            </div>
          </div>
        ) : null}
      </Card>

      {/* Stats KPIs */}
      {stats.loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">{Array.from({ length: 10 }).map((_, i) => <Card key={i} className="p-4"><Skeleton className="h-8 w-full" /></Card>)}</div>
      ) : s ? (
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <StatCard label="Played" value={n(s.matchesPlayed ?? 0)} />
          <StatCard label="Wins" value={n(s.wins ?? 0)} />
          <StatCard label="Draws" value={n(s.draws ?? 0)} />
          <StatCard label="Losses" value={n(s.losses ?? 0)} />
          <StatCard label="Goals" value={n(s.goalsScored ?? 0)} />
          <StatCard label="Conceded" value={n(s.goalsConceded ?? 0)} />
          <StatCard label="GD" value={n(s.goalDifference ?? 0) >= 0 ? `+${n(s.goalDifference ?? 0)}` : n(s.goalDifference ?? 0)} />
          <StatCard label="xG" value={f(s.averageXG ?? 0).toFixed(1)} />
          <StatCard label="Possession" value={`${f(s.averagePossession ?? 0).toFixed(1)}%`} />
          <StatCard label="Pass Acc." value={`${f(s.passAccuracy ?? 0).toFixed(1)}%`} />
        </div>
      ) : null}

      <Tabs tabs={["Overview", "Players", "Matches", "Leaders"]} active={tab} onChange={setTab} />

      {tab === "Overview" && s && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="p-5">
            <SectionHeader title="Key Statistics" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Total Shots</span><span className="font-mono">{n(s.totalShots ?? 0)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shots on Target</span><span className="font-mono">{n(s.shotsOnTarget ?? 0)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shot Accuracy</span><span className="font-mono">{f(s.shotAccuracy ?? 0).toFixed(1)}%</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Clean Sheets</span><span className="font-mono">{n(s.cleanSheets ?? 0)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Corners</span><span className="font-mono">{n(s.corners ?? 0)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Tackles</span><span className="font-mono">{n(s.tackles ?? 0)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Yellow Cards</span><span className="font-mono">{n(s.yellowCards ?? 0)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Red Cards</span><span className="font-mono">{n(s.redCards ?? 0)}</span></div>
            </div>
          </Card>
          <Card className="p-5">
            <SectionHeader title="Form" />
            {s.lastFiveResults && s.lastFiveResults.length > 0 ? (
              <div className="flex items-center gap-1.5 mt-2">
                {s.lastFiveResults.map((r: string, i: number) => (
                  <div key={i} className={`w-8 h-8 rounded-md flex items-center justify-center text-sm font-bold text-white ${r === "W" ? "bg-emerald-500" : r === "D" ? "bg-slate-400" : "bg-red-500"}`}>{r}</div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No form data available</p>
            )}
            {s.topScorer && (
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">Team Leaders</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Top Scorer</span><span className="font-medium">{s.topScorer} ({n(s.topScorerGoals ?? 0)} G)</span></div>
                  {s.topAssistProvider && <div className="flex justify-between"><span className="text-muted-foreground">Top Assists</span><span className="font-medium">{s.topAssistProvider} ({n(s.topAssists ?? 0)} A)</span></div>}
                  {s.highestRatedPlayer && <div className="flex justify-between"><span className="text-muted-foreground">Highest Rated</span><span className="font-medium">{s.highestRatedPlayer} ({f(s.highestAverageRating ?? 0).toFixed(1)})</span></div>}
                </div>
              </div>
            )}
          </Card>
        </div>
      )}

      {tab === "Players" && (
        <Card className="overflow-hidden">
          {players.loading ? (
            <div className="p-5 space-y-2">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-8 w-full" />)}</div>
          ) : players.error ? (
            <p className="text-sm text-muted-foreground text-center py-10">Could not load players</p>
          ) : (players.data?.length ?? 0) === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-10">No players found</p>
          ) : (
            <Table>
              <thead><tr>
                <Th>Player</Th><Th>Position</Th><Th>National</Th>
              </tr></thead>
              <tbody>
                {(players.data ?? []).map((p: PlayerView) => (
                  <Tr key={p.id} onClick={() => onNavigate("players", p.id)}>
                    <Td><div className="flex items-center gap-2">
                      <Avatar initials={`${p.firstName[0]}${p.lastName[0]}`} size="sm" />
                      <div>
                        <div className="font-medium text-sm">{p.firstName} {p.lastName}</div>
                        {p.isCaptain && <Badge variant="muted">C</Badge>}
                      </div>
                    </div></Td>
                    <Td className="text-xs text-muted-foreground">{p.position}</Td>
                    <Td className="text-xs text-muted-foreground">{p.national}</Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card>
      )}

      {tab === "Matches" && (
        <Card className="overflow-hidden">
          {teamMatches.loading ? (
            <div className="p-5 space-y-2">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-8 w-full" />)}</div>
          ) : teamMatches.error ? (
            <p className="text-sm text-muted-foreground text-center py-10">Could not load matches</p>
          ) : (
            <Table>
              <thead><tr>
                <Th>Date</Th><Th>Home</Th><Th className="text-center">Score</Th><Th>Away</Th><Th>Venue</Th><Th>Status</Th>
              </tr></thead>
              <tbody>
                {(teamMatches.data ?? []).map((m: MatchView) => (
                  <Tr key={m.id} onClick={() => onNavigate("match-detail", m.id)}>
                    <Td className="font-mono text-xs text-muted-foreground">{m.date}</Td>
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

      {tab === "Leaders" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Top Scorers", data: topScorers.data, loading: topScorers.loading, statLabel: "Goals" },
            { label: "Top Assists", data: topAssists.data, loading: topAssists.loading, statLabel: "Assists" },
            { label: "Most Minutes", data: mostMinutes.data, loading: mostMinutes.loading, statLabel: "Minutes" },
            { label: "Most Passes", data: mostPasses.data, loading: mostPasses.loading, statLabel: "Passes" },
          ].map(({ label, data, loading: l, statLabel }) => (
            <Card key={label} className="overflow-hidden">
              <div className="px-5 pt-4 pb-2"><SectionHeader title={label} /></div>
              {l ? <div className="p-5 space-y-2">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-6 w-full" />)}</div>
                : (data?.length ?? 0) === 0 ? <p className="text-sm text-muted-foreground text-center py-6">No data</p>
                : (
                  <Table>
                    <thead><tr><Th>#</Th><Th>Player</Th><Th className="text-center">{statLabel}</Th></tr></thead>
                    <tbody>
                      {(data ?? []).slice(0, 5).map((p: TopPerformerView, i: number) => (
                        <Tr key={p.playerId}>
                          <Td className="font-mono text-xs text-muted-foreground">{i + 1}</Td>
                          <Td><span className="text-sm font-medium">{p.name}</span></Td>
                          <Td className="text-center font-mono font-bold text-primary">{p.stat}</Td>
                        </Tr>
                      ))}
                    </tbody>
                  </Table>
                )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Teams({ onNavigate }: { onNavigate: (page: string, id?: string) => void }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editing, setEditing] = useState<GetTeamDTO | null | "new">(null);
  const [deleting, setDeleting] = useState<GetTeamDTO | null>(null);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const { data: teams, loading, error, refetch } = useQuery(fetchTeams);

  const saved = () => { setEditing(null); setMessage("Team saved successfully."); refetch(); };
  const remove = async () => {
    if (!deleting) return;
    setPending(true);
    try { await deleteTeam(deleting.id); setDeleting(null); setSelectedId(null); setMessage("Team deleted successfully."); refetch(); }
    catch (err) { setMessage(err instanceof Error ? err.message : "Delete failed."); }
    finally { setPending(false); }
  };

  if (selectedId) return <><TeamDetail teamId={selectedId} onBack={() => setSelectedId(null)} onNavigate={onNavigate} onEdit={setEditing} onDelete={setDeleting} />{editing && <TeamEditor team={editing === "new" ? undefined : editing} onClose={() => setEditing(null)} onSaved={saved} />}{deleting && <ConfirmDialog title="Delete Team" message={`Delete ${deleting.name}? This cannot be undone.`} onCancel={() => setDeleting(null)} onConfirm={remove} pending={pending} />}{message && <Toast message={message} type={message.includes("success") ? "success" : "error"} onClose={() => setMessage(null)} />}</>;

  const filtered = (teams ?? []).filter((t: GetTeamDTO) =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    (t.city ?? "").toLowerCase().includes(search.toLowerCase()) ||
    (t.coach ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      {message && <Toast message={message} type={message.includes("success") ? "success" : "error"} onClose={() => setMessage(null)} />}
      <PageHeader title="Teams" subtitle={`${(teams ?? []).length} teams`}
        actions={<Button variant="primary" onClick={() => setEditing("new")}>+ New Team</Button>}
      />
      <div className="flex items-center gap-2">
        <Input placeholder="Search teams…" value={search} onChange={e => setSearch(e.target.value)} className="max-w-xs" />
      </div>
      <Card className="overflow-hidden">
        {loading ? (
          <div className="p-5 space-y-2">{Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}</div>
        ) : error ? (
          <p className="text-sm text-muted-foreground text-center py-10">Could not load teams. Check API connectivity.</p>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-10">No teams found</p>
        ) : (
          <Table>
            <thead><tr>
              <Th>Team</Th><Th>Coach</Th><Th>Stadium</Th><Th>Formation</Th><Th></Th>
            </tr></thead>
            <tbody>
              {filtered.map((t: GetTeamDTO) => (
                <Tr key={t.id} onClick={() => setSelectedId(t.id)}>
                  <Td><div className="flex items-center gap-2.5">
                    <Avatar initials={(t.shortName ?? t.name).slice(0, 2)} size="sm" />
                    <div>
                      <div className="font-semibold text-sm">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.city}</div>
                    </div>
                  </div></Td>
                  <Td className="text-sm">{t.coach}</Td>
                  <Td className="text-xs text-muted-foreground">{t.stadium}</Td>
                  <Td className="font-mono text-xs">{t.preferredFormation ?? "—"}</Td>
                  <Td><Button variant="ghost" className="text-xs">View →</Button></Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
      {editing && <TeamEditor team={editing === "new" ? undefined : editing} onClose={() => setEditing(null)} onSaved={saved} />}
    </div>
  );
}
