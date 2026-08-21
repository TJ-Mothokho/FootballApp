import { useState } from "react";
import {
  Card, Badge, Button, Table, Th, Td, Tr, Tabs, PageHeader, StatCard, Avatar, Input, Select, SectionHeader, Skeleton, Modal, ConfirmDialog, Toast
} from "../components/ui";
import { useQuery } from "../hooks/useApi";
import {
  fetchMatches, fetchMatch, fetchMatchSummary, fetchMatchPlayerStats, fetchMatchTeamStats,
  fetchCompetitions, fetchSeasons, fetchTeams, createMatch, updateMatch, deleteMatch,
  n, f, type MatchView,
} from "../services/api";
import type { GetPlayerMatchStatsDTO, GetTeamMatchStatsDTO, MatchSummaryDTO, GetTeamDTO } from "../imports";

function errorText(error: unknown) {
  return error instanceof Error ? error.message : "The request could not be completed.";
}

function MatchForm({ match, onClose, onSaved }: { match?: MatchView; onClose: () => void; onSaved: (saved: MatchView) => void }) {
  const competitions = useQuery(fetchCompetitions);
  const seasons = useQuery(fetchSeasons);
  const teams = useQuery(fetchTeams);
  const [values, setValues] = useState({
    kickOff: match ? new Date(match.date + "T" + (match.kickOff || "00:00")).toISOString().slice(0, 16) : "",
    venue: match?.venue ?? "",
    referee: match?.referee ?? "",
    attendance: match?.attendance?.toString() ?? "",
    homeGoals: match?.homeGoals?.toString() ?? "0",
    awayGoals: match?.awayGoals?.toString() ?? "0",
    status: match?.status ?? "Upcoming",
    competitionId: match?.competitionId ?? "",
    seasonId: match?.seasonId ?? "",
    homeTeamId: match?.homeTeamId ?? "",
    awayTeamId: match?.awayTeamId ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const set = (field: keyof typeof values, value: string) => setValues(current => ({ ...current, [field]: value }));
  const teamsList = (teams.data ?? []) as GetTeamDTO[];

  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!values.kickOff || !values.venue.trim() || !values.referee.trim()) {
      setMessage("Kick-off, venue, and referee are required.");
      return;
    }
    if (!match && (!values.competitionId || !values.seasonId || !values.homeTeamId || !values.awayTeamId)) {
      setMessage("Competition, season, home team, and away team are required.");
      return;
    }
    if (!match && values.homeTeamId === values.awayTeamId) {
      setMessage("Home and away teams must be different.");
      return;
    }

    setSaving(true);
    setMessage(null);
    try {
      const shared = {
        kickOff: new Date(values.kickOff).toISOString(),
        venue: values.venue.trim(),
        referee: values.referee.trim(),
        attendance: values.attendance === "" ? null : Number(values.attendance) as any,
        homeGoals: Number(values.homeGoals || 0) as any,
        awayGoals: Number(values.awayGoals || 0) as any,
        status: values.status,
      };
      const saved = match
        ? await updateMatch(match.id, shared)
        : await createMatch({ ...shared, homeTeamId: values.homeTeamId, awayTeamId: values.awayTeamId, competitionId: values.competitionId, seasonId: values.seasonId });
      onSaved(saved);
    } catch (error) {
      setMessage(errorText(error));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal title={match ? "Edit Match" : "New Match"} onClose={onClose} maxWidth="max-w-3xl" footer={<><Button variant="secondary" onClick={onClose} disabled={saving}>Cancel</Button><Button variant="primary" onClick={() => document.getElementById("match-form")?.requestSubmit()} disabled={saving}>{saving ? "Saving…" : match ? "Save Changes" : "Create Match"}</Button></>}>
      <form id="match-form" onSubmit={save} className="space-y-5">
        {message && <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{message}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input label="Kick-off *" type="datetime-local" value={values.kickOff} onChange={e => set("kickOff", e.target.value)} required />
          <Select label="Status *" value={values.status} onChange={e => set("status", e.target.value)}>
            <option value="Upcoming">Upcoming</option>
            <option value="Completed">Completed</option>
            <option value="Postponed">Postponed</option>
            <option value="Cancelled">Cancelled</option>
          </Select>
          <Input label="Venue *" value={values.venue} onChange={e => set("venue", e.target.value)} placeholder="Match venue" required />
          <Input label="Referee *" value={values.referee} onChange={e => set("referee", e.target.value)} placeholder="Referee name" required />
          <Input label="Attendance" type="number" min="0" value={values.attendance} onChange={e => set("attendance", e.target.value)} placeholder="Optional" />
          <div className="grid grid-cols-2 gap-2">
            <Input label="Home Goals" type="number" min="0" value={values.homeGoals} onChange={e => set("homeGoals", e.target.value)} />
            <Input label="Away Goals" type="number" min="0" value={values.awayGoals} onChange={e => set("awayGoals", e.target.value)} />
          </div>
        </div>

        {match ? (
          <Card className="bg-muted/30 p-4 text-sm">
            <p className="font-medium text-foreground">{match.homeTeam} vs {match.awayTeam}</p>
            <p className="mt-1 text-xs text-muted-foreground">Competition and participant assignments are retained because the API update contract only accepts match details and score/status values.</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-border pt-5">
            <Select label="Competition *" value={values.competitionId} onChange={e => set("competitionId", e.target.value)} disabled={competitions.loading}>
              <option value="">— Select Competition —</option>
              {(competitions.data ?? []).map(competition => <option key={competition.id} value={competition.id}>{competition.name}</option>)}
            </Select>
            <Select label="Season *" value={values.seasonId} onChange={e => set("seasonId", e.target.value)} disabled={seasons.loading}>
              <option value="">— Select Season —</option>
              {(seasons.data ?? []).map(season => <option key={season.id} value={season.id}>{season.name}</option>)}
            </Select>
            <Select label="Home Team *" value={values.homeTeamId} onChange={e => set("homeTeamId", e.target.value)} disabled={teams.loading}>
              <option value="">— Select Home Team —</option>
              {teamsList.map(team => <option key={team.id} value={team.id}>{team.name}</option>)}
            </Select>
            <Select label="Away Team *" value={values.awayTeamId} onChange={e => set("awayTeamId", e.target.value)} disabled={teams.loading}>
              <option value="">— Select Away Team —</option>
              {teamsList.map(team => <option key={team.id} value={team.id}>{team.name}</option>)}
            </Select>
          </div>
        )}
      </form>
    </Modal>
  );
}

function MatchHeader({ match }: { match: MatchView }) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 text-right"><div className="flex items-center justify-end gap-3"><div><p className="font-bold text-lg text-foreground">{match.homeTeam}</p><p className="text-xs text-muted-foreground">Home</p></div><Avatar initials={match.homeTeam.slice(0, 2)} size="lg" /></div></div>
        <div className="text-center flex-shrink-0 px-4">{match.status === "Completed" && match.homeGoals !== null ? <div className="text-4xl font-bold font-mono text-foreground">{match.homeGoals} – {match.awayGoals}</div> : <div className="text-2xl font-semibold text-muted-foreground">vs</div>}<p className="text-xs text-muted-foreground mt-1">{match.competition}</p></div>
        <div className="flex-1"><div className="flex items-center gap-3"><Avatar initials={match.awayTeam.slice(0, 2)} size="lg" /><div><p className="font-bold text-lg text-foreground">{match.awayTeam}</p><p className="text-xs text-muted-foreground">Away</p></div></div></div>
      </div>
      <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs text-muted-foreground"><div><span className="block font-medium text-foreground">{match.date}</span>Date</div><div><span className="block font-medium text-foreground">{match.kickOff}</span>Kickoff</div><div><span className="block font-medium text-foreground">{match.venue}</span>Venue</div><div><span className="block font-medium text-foreground">{match.referee}</span>Referee</div>{match.attendance !== null && <div><span className="block font-medium text-foreground">{match.attendance?.toLocaleString()}</span>Attendance</div>}</div>
    </Card>
  );
}

function StatsBar({ label, home, away }: { label: string; home: number; away: number }) {
  const total = home + away || 1;
  return <div><div className="flex justify-between text-xs text-muted-foreground mb-0.5"><span className="font-mono">{home}</span><span>{label}</span><span className="font-mono">{away}</span></div><div className="flex h-1.5 rounded-full overflow-hidden gap-0.5"><div className="bg-primary rounded-l-full" style={{ width: `${(home / total) * 100}%` }} /><div className="bg-slate-300 dark:bg-slate-600 rounded-r-full flex-1" /></div></div>;
}

function MatchDetail({ matchId, onBack, onNavigate, onEdit, onDelete }: { matchId: string; onBack: () => void; onNavigate: (page: string, id?: string) => void; onEdit: (match: MatchView) => void; onDelete: (match: MatchView) => void }) {
  const [tab, setTab] = useState("Summary");
  const match = useQuery(() => fetchMatch(matchId), [matchId]);
  const summary = useQuery(() => fetchMatchSummary(matchId), [matchId]);
  const playerStats = useQuery(() => fetchMatchPlayerStats(matchId), [matchId]);
  const teamStats = useQuery(() => fetchMatchTeamStats(matchId), [matchId]);
  const m = match.data;
  const sm = summary.data as MatchSummaryDTO | null;
  const homeStats = (teamStats.data ?? []).find((stats: GetTeamMatchStatsDTO) => stats.isHome);
  const awayStats = (teamStats.data ?? []).find((stats: GetTeamMatchStatsDTO) => !stats.isHome);

  return <div className="space-y-6">
    <PageHeader title={m ? `${m.homeTeam} vs ${m.awayTeam}` : "Match"} subtitle={m ? `${m.competition} · ${m.season}` : ""} breadcrumb={["Matches", "Match Detail"]} actions={<><Button variant="secondary" onClick={onBack}>← Back</Button>{m && <Button variant="secondary" onClick={() => onEdit(m)}>Edit</Button>}{m && <Button variant="danger" onClick={() => onDelete(m)}>Delete</Button>}<Button variant="primary" onClick={() => onNavigate("team-match-stats", matchId)}>Enter Team Stats</Button></>} />
    {match.loading ? <Skeleton className="h-40 w-full rounded-lg" /> : m ? <MatchHeader match={m} /> : null}
    {!teamStats.loading && (homeStats || awayStats) && <div className="grid grid-cols-2 sm:grid-cols-4 gap-3"><StatCard label="Home Possession" value={`${n(homeStats?.matchStats?.possession ?? 0)}%`} /><StatCard label="Home Shots" value={n(homeStats?.matchShots?.totalShots ?? 0)} /><StatCard label="Away Shots" value={n(awayStats?.matchShots?.totalShots ?? 0)} /><StatCard label="Home xG" value={f(homeStats?.matchExpectedGoals?.xg ?? 0).toFixed(2)} /><StatCard label="Home Passes" value={n(homeStats?.matchPasses?.passes ?? 0)} /><StatCard label="Away Passes" value={n(awayStats?.matchPasses?.passes ?? 0)} /><StatCard label="Home Yellow" value={n(homeStats?.matchDiscipline?.yellowCards ?? 0)} /><StatCard label="Away Yellow" value={n(awayStats?.matchDiscipline?.yellowCards ?? 0)} /></div>}
    <Tabs tabs={["Summary", "Team Stats", "Player Stats", "Analysis"]} active={tab} onChange={setTab} />
    {tab === "Summary" && <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">{homeStats && awayStats ? <Card className="p-5"><SectionHeader title="Match Stats" /><div className="space-y-3"><StatsBar label="Possession %" home={n(homeStats.matchStats?.possession ?? 0)} away={n(awayStats.matchStats?.possession ?? 0)} /><StatsBar label="Shots" home={n(homeStats.matchShots?.totalShots ?? 0)} away={n(awayStats.matchShots?.totalShots ?? 0)} /><StatsBar label="Shots on Target" home={n(homeStats.matchShots?.shotsOnTarget ?? 0)} away={n(awayStats.matchShots?.shotsOnTarget ?? 0)} /><StatsBar label="Corners" home={n(homeStats.matchStats?.corners ?? 0)} away={n(awayStats.matchStats?.corners ?? 0)} /><StatsBar label="Accurate Passes" home={n(homeStats.matchPasses?.accuratePasses ?? 0)} away={n(awayStats.matchPasses?.accuratePasses ?? 0)} /></div></Card> : <Card className="p-5"><p className="text-sm text-muted-foreground">{teamStats.loading ? "Loading team stats…" : "No team stats entered yet. Use the Team Match Stats form to add data."}</p></Card>}<Card className="p-5"><SectionHeader title="Match Analysis" />{sm?.homeTeamStats?.matchAnalysis ? <div className="space-y-2">{sm.homeTeamStats.matchAnalysis.tacticalNotes && <p className="text-sm text-foreground leading-relaxed">{sm.homeTeamStats.matchAnalysis.tacticalNotes}</p>}{sm.homeTeamStats.matchAnalysis.analystNotes && <p className="text-sm text-muted-foreground leading-relaxed">{sm.homeTeamStats.matchAnalysis.analystNotes}</p>}</div> : <p className="text-sm text-muted-foreground">No match analysis entered yet.</p>}</Card></div>}
    {tab === "Team Stats" && <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">{teamStats.loading ? <Skeleton className="h-64 w-full col-span-2 rounded-lg" /> : !homeStats && !awayStats ? <Card className="p-8 text-center col-span-2"><p className="text-muted-foreground text-sm">No team stats available for this match.</p><Button variant="primary" className="mt-4" onClick={() => onNavigate("team-match-stats", matchId)}>Enter Team Stats</Button></Card> : [homeStats, awayStats].map((stats, index) => stats && <Card key={index} className="p-5"><SectionHeader title={stats.isHome ? (m?.homeTeam ?? "Home") : (m?.awayTeam ?? "Away")} /><div className="space-y-1.5 text-sm"><div className="flex justify-between"><span className="text-muted-foreground">Formation</span><span className="font-mono">{stats.formation}</span></div><div className="flex justify-between"><span className="text-muted-foreground">Goals</span><span className="font-mono">{n(stats.matchStats?.teamGoals ?? 0)}</span></div><div className="flex justify-between"><span className="text-muted-foreground">Possession</span><span className="font-mono">{n(stats.matchStats?.possession ?? 0)}%</span></div><div className="flex justify-between"><span className="text-muted-foreground">Shots</span><span className="font-mono">{n(stats.matchShots?.totalShots ?? 0)}</span></div><div className="flex justify-between"><span className="text-muted-foreground">xG</span><span className="font-mono">{f(stats.matchExpectedGoals?.xg ?? 0).toFixed(2)}</span></div><div className="flex justify-between"><span className="text-muted-foreground">Passes</span><span className="font-mono">{n(stats.matchPasses?.passes ?? 0)}</span></div></div></Card>)}</div>}
    {tab === "Player Stats" && <Card className="overflow-hidden">{playerStats.loading ? <div className="p-5 space-y-2">{Array.from({ length: 6 }).map((_, index) => <Skeleton key={index} className="h-8 w-full" />)}</div> : (playerStats.data?.length ?? 0) === 0 ? <div className="p-8 text-center"><p className="text-muted-foreground text-sm">No player stats entered yet.</p><Button variant="primary" className="mt-4" onClick={() => onNavigate("player-match-stats", matchId)}>Enter Player Stats</Button></div> : <Table><thead><tr><Th>Player</Th><Th>Team</Th><Th className="text-center">Min</Th><Th className="text-center">Rating</Th><Th className="text-center">G</Th><Th className="text-center">A</Th><Th>MOTM</Th></tr></thead><tbody>{(playerStats.data ?? []).map((stats: GetPlayerMatchStatsDTO) => <Tr key={stats.id}><Td><div className="flex items-center gap-2"><Avatar initials={`${stats.player.firstName[0]}${stats.player.lastName[0]}`} size="sm" /><span className="font-medium text-sm">{stats.player.firstName} {stats.player.lastName}</span></div></Td><Td className="text-xs text-muted-foreground">{stats.team.name}</Td><Td className="text-center font-mono text-xs">{n(stats.playerStats?.minutesPlayed ?? 0)}'</Td><Td className="text-center font-mono text-xs font-semibold">{f(stats.playerStats?.fotmobRating ?? stats.playerStats?.sofascoreRating ?? 0).toFixed(1)}</Td><Td className="text-center font-mono text-xs">{n(stats.playerAttack?.goals ?? 0)}</Td><Td className="text-center font-mono text-xs">{n(stats.playerPasses?.assists ?? 0)}</Td><Td>{stats.isManOfTheMatch && <Badge variant="blue">MOTM</Badge>}</Td></Tr>)}</tbody></Table>}</Card>}
    {tab === "Analysis" && <Card className="p-6"><SectionHeader title="Match Analysis" />{sm ? <div className="space-y-4">{sm.homeTeamStats?.matchAnalysis?.tacticalNotes && <div><p className="text-xs font-semibold text-muted-foreground mb-1">Home Team Tactical Notes</p><p className="text-sm text-foreground leading-relaxed">{sm.homeTeamStats.matchAnalysis.tacticalNotes}</p></div>}{sm.awayTeamStats?.matchAnalysis?.tacticalNotes && <div><p className="text-xs font-semibold text-muted-foreground mb-1">Away Team Tactical Notes</p><p className="text-sm text-foreground leading-relaxed">{sm.awayTeamStats.matchAnalysis.tacticalNotes}</p></div>}{!sm.homeTeamStats?.matchAnalysis?.tacticalNotes && !sm.awayTeamStats?.matchAnalysis?.tacticalNotes && <p className="text-sm text-muted-foreground">No analysis entered yet.</p>}</div> : summary.loading ? <Skeleton className="h-24 w-full" /> : <p className="text-sm text-muted-foreground">Enter team stats to add match analysis.</p>}</Card>}
  </div>;
}

export default function Matches({ onNavigate }: { onNavigate: (page: string, id?: string) => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [editing, setEditing] = useState<MatchView | null | "new">(null);
  const [deleting, setDeleting] = useState<MatchView | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [deletingPending, setDeletingPending] = useState(false);
  const { data: matches, loading, error, refetch } = useQuery(fetchMatches);

  const remove = async () => {
    if (!deleting) return;
    setDeletingPending(true);
    try {
      await deleteMatch(deleting.id);
      setDeleting(null);
      setSelected(null);
      setMessage("Match deleted successfully.");
      refetch();
    } catch (error) {
      setMessage(errorText(error));
    } finally {
      setDeletingPending(false);
    }
  };

  const saved = (match: MatchView) => {
    setEditing(null);
    setMessage("Match saved successfully.");
    refetch();
    if (!selected) setSelected(match.id);
  };

  if (selected) return <><MatchDetail matchId={selected} onBack={() => setSelected(null)} onNavigate={onNavigate} onEdit={setEditing} onDelete={setDeleting} />{editing && <MatchForm match={editing === "new" ? undefined : editing} onClose={() => setEditing(null)} onSaved={saved} />}{deleting && <ConfirmDialog title="Delete Match" message={`Delete ${deleting.homeTeam} vs ${deleting.awayTeam}? This cannot be undone.`} onCancel={() => setDeleting(null)} onConfirm={remove} pending={deletingPending} />}{message && <Toast message={message} type="success" onClose={() => setMessage(null)} />}</>;

  const filtered = (matches ?? []).filter((match: MatchView) => `${match.homeTeam} ${match.awayTeam}`.toLowerCase().includes(search.toLowerCase()) && (!statusFilter || match.status === statusFilter));
  return <div className="space-y-5">{message && <Toast message={message} type={message.includes("success") ? "success" : "error"} onClose={() => setMessage(null)} />}<PageHeader title="Matches" subtitle={`${(matches ?? []).length} matches`} actions={<Button variant="primary" onClick={() => setEditing("new")}>+ New Match</Button>} /><div className="flex items-center gap-2 flex-wrap"><Input placeholder="Search matches…" value={search} onChange={event => setSearch(event.target.value)} className="max-w-xs" /><Select value={statusFilter} onChange={event => setStatusFilter(event.target.value)} className="max-w-[140px]"><option value="">All Status</option><option value="Completed">Completed</option><option value="Upcoming">Upcoming</option><option value="Postponed">Postponed</option><option value="Cancelled">Cancelled</option></Select></div><Card className="overflow-hidden">{loading ? <div className="p-5 space-y-2">{Array.from({ length: 8 }).map((_, index) => <Skeleton key={index} className="h-10 w-full" />)}</div> : error ? <p className="text-sm text-muted-foreground text-center py-10">Could not load matches. Check API connectivity.</p> : filtered.length === 0 ? <p className="text-sm text-muted-foreground text-center py-10">No matches found</p> : <Table><thead><tr><Th>Date</Th><Th>Home Team</Th><Th className="text-center">Score</Th><Th>Away Team</Th><Th>Venue</Th><Th>Status</Th><Th></Th></tr></thead><tbody>{filtered.map((match: MatchView) => <Tr key={match.id} onClick={() => setSelected(match.id)}><Td className="font-mono text-xs text-muted-foreground whitespace-nowrap">{match.date}</Td><Td><div className="flex items-center gap-2"><Avatar initials={match.homeTeam.slice(0, 2)} size="sm" /><span className="font-medium text-sm">{match.homeTeam}</span></div></Td><Td className="text-center font-mono font-bold text-sm whitespace-nowrap">{match.homeGoals !== null ? `${match.homeGoals} – ${match.awayGoals}` : "vs"}</Td><Td><div className="flex items-center gap-2"><Avatar initials={match.awayTeam.slice(0, 2)} size="sm" /><span className="font-medium text-sm">{match.awayTeam}</span></div></Td><Td className="text-xs text-muted-foreground">{match.venue}</Td><Td><Badge variant={match.status === "Completed" ? "success" : "muted"}>{match.status}</Badge></Td><Td><Button variant="ghost" className="text-xs" onClick={() => setSelected(match.id)}>View →</Button></Td></Tr>)}</tbody></Table>}</Card>{editing && <MatchForm match={editing === "new" ? undefined : editing} onClose={() => setEditing(null)} onSaved={saved} />}{deleting && <ConfirmDialog title="Delete Match" message={`Delete ${deleting.homeTeam} vs ${deleting.awayTeam}? This cannot be undone.`} onCancel={() => setDeleting(null)} onConfirm={remove} pending={deletingPending} />}</div>;
}
