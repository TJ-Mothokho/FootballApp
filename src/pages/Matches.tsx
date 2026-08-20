import { useState } from "react";
import {
  Card, Badge, Button, Table, Th, Td, Tr, Tabs, PageHeader, StatCard, Avatar, Input, Select, SectionHeader, Skeleton
} from "../components/ui";
import { useQuery } from "../hooks/useApi";
import {
  fetchMatches, fetchMatch, fetchMatchSummary, fetchMatchPlayerStats, fetchMatchTeamStats,
  n, f,
  type MatchView,
} from "../services/api";
import type { GetPlayerMatchStatsDTO, GetTeamMatchStatsDTO, MatchSummaryDTO } from "../imports";

function MatchHeader({ match }: { match: MatchView }) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 text-right">
          <div className="flex items-center justify-end gap-3">
            <div>
              <p className="font-bold text-lg text-foreground">{match.homeTeam}</p>
              <p className="text-xs text-muted-foreground">Home</p>
            </div>
            <Avatar initials={match.homeTeam.slice(0, 2)} size="lg" />
          </div>
        </div>
        <div className="text-center flex-shrink-0 px-4">
          {match.status === "Completed" && match.homeGoals !== null ? (
            <div className="text-4xl font-bold font-mono text-foreground">{match.homeGoals} – {match.awayGoals}</div>
          ) : (
            <div className="text-2xl font-semibold text-muted-foreground">vs</div>
          )}
          <p className="text-xs text-muted-foreground mt-1">{match.competition}</p>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <Avatar initials={match.awayTeam.slice(0, 2)} size="lg" />
            <div>
              <p className="font-bold text-lg text-foreground">{match.awayTeam}</p>
              <p className="text-xs text-muted-foreground">Away</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs text-muted-foreground">
        <div><span className="block font-medium text-foreground">{match.date}</span>Date</div>
        <div><span className="block font-medium text-foreground">{match.kickOff}</span>Kickoff</div>
        <div><span className="block font-medium text-foreground">{match.venue}</span>Venue</div>
        <div><span className="block font-medium text-foreground">{match.referee}</span>Referee</div>
        {match.attendance !== null && (
          <div><span className="block font-medium text-foreground">{match.attendance?.toLocaleString()}</span>Attendance</div>
        )}
      </div>
    </Card>
  );
}

function StatsBar({ label, home, away }: { label: string; home: number; away: number }) {
  const total = home + away || 1;
  return (
    <div>
      <div className="flex justify-between text-xs text-muted-foreground mb-0.5">
        <span className="font-mono">{home}</span>
        <span>{label}</span>
        <span className="font-mono">{away}</span>
      </div>
      <div className="flex h-1.5 rounded-full overflow-hidden gap-0.5">
        <div className="bg-primary rounded-l-full" style={{ width: `${(home / total) * 100}%` }} />
        <div className="bg-slate-300 dark:bg-slate-600 rounded-r-full flex-1" />
      </div>
    </div>
  );
}

function MatchDetail({ matchId, onBack, onNavigate }: { matchId: string; onBack: () => void; onNavigate: (page: string, id?: string) => void }) {
  const [tab, setTab] = useState("Summary");

  const match = useQuery(() => fetchMatch(matchId), [matchId]);
  const summary = useQuery(() => fetchMatchSummary(matchId), [matchId]);
  const playerStats = useQuery(() => fetchMatchPlayerStats(matchId), [matchId]);
  const teamStats = useQuery(() => fetchMatchTeamStats(matchId), [matchId]);

  const m = match.data;
  const sm = summary.data as MatchSummaryDTO | null;

  const homeStats = (teamStats.data ?? []).find((ts: GetTeamMatchStatsDTO) => ts.isHome);
  const awayStats = (teamStats.data ?? []).find((ts: GetTeamMatchStatsDTO) => !ts.isHome);

  return (
    <div className="space-y-6">
      <PageHeader
        title={m ? `${m.homeTeam} vs ${m.awayTeam}` : "Match"}
        subtitle={m ? `${m.competition} · ${m.season}` : ""}
        breadcrumb={["Matches", "Match Detail"]}
        actions={
          <>
            <Button variant="secondary" onClick={onBack}>← Back</Button>
            <Button variant="primary" onClick={() => onNavigate("team-match-stats")}>Enter Stats</Button>
          </>
        }
      />

      {match.loading ? <Skeleton className="h-40 w-full rounded-lg" /> : m ? <MatchHeader match={m} /> : null}

      {/* Summary KPIs from team stats */}
      {!teamStats.loading && (homeStats || awayStats) && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard label="Home Possession" value={`${n(homeStats?.matchStats?.possession ?? 0)}%`} />
          <StatCard label="Home Shots" value={n(homeStats?.matchShots?.totalShots ?? 0)} />
          <StatCard label="Away Shots" value={n(awayStats?.matchShots?.totalShots ?? 0)} />
          <StatCard label="Home xG" value={f(homeStats?.matchExpectedGoals?.xg ?? 0).toFixed(2)} />
          <StatCard label="Home Passes" value={n(homeStats?.matchPasses?.passes ?? 0)} />
          <StatCard label="Away Passes" value={n(awayStats?.matchPasses?.passes ?? 0)} />
          <StatCard label="Home Yellow" value={n(homeStats?.matchDiscipline?.yellowCards ?? 0)} />
          <StatCard label="Away Yellow" value={n(awayStats?.matchDiscipline?.yellowCards ?? 0)} />
        </div>
      )}

      <Tabs tabs={["Summary", "Team Stats", "Player Stats", "Analysis"]} active={tab} onChange={setTab} />

      {tab === "Summary" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {homeStats && awayStats ? (
            <Card className="p-5">
              <SectionHeader title="Match Stats" />
              <div className="space-y-3">
                <StatsBar label="Possession %" home={n(homeStats.matchStats?.possession ?? 0)} away={n(awayStats.matchStats?.possession ?? 0)} />
                <StatsBar label="Shots" home={n(homeStats.matchShots?.totalShots ?? 0)} away={n(awayStats.matchShots?.totalShots ?? 0)} />
                <StatsBar label="Shots on Target" home={n(homeStats.matchShots?.shotsOnTarget ?? 0)} away={n(awayStats.matchShots?.shotsOnTarget ?? 0)} />
                <StatsBar label="Corners" home={n(homeStats.matchStats?.corners ?? 0)} away={n(awayStats.matchStats?.corners ?? 0)} />
                <StatsBar label="Accurate Passes" home={n(homeStats.matchPasses?.accuratePasses ?? 0)} away={n(awayStats.matchPasses?.accuratePasses ?? 0)} />
              </div>
            </Card>
          ) : (
            <Card className="p-5">
              <p className="text-sm text-muted-foreground">
                {teamStats.loading ? "Loading team stats…" : "No team stats entered yet. Use the Team Match Stats form to add data."}
              </p>
            </Card>
          )}
          <Card className="p-5">
            <SectionHeader title="Match Analysis" />
            {sm?.homeTeamStats?.matchAnalysis ? (
              <div className="space-y-2">
                {sm.homeTeamStats.matchAnalysis.tacticalNotes && (
                  <p className="text-sm text-foreground leading-relaxed">{sm.homeTeamStats.matchAnalysis.tacticalNotes}</p>
                )}
                {sm.homeTeamStats.matchAnalysis.analystNotes && (
                  <p className="text-sm text-muted-foreground leading-relaxed">{sm.homeTeamStats.matchAnalysis.analystNotes}</p>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No match analysis entered yet.</p>
            )}
          </Card>
        </div>
      )}

      {tab === "Team Stats" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {teamStats.loading ? (
            <Skeleton className="h-64 w-full col-span-2 rounded-lg" />
          ) : !homeStats && !awayStats ? (
            <Card className="p-8 text-center col-span-2">
              <p className="text-muted-foreground text-sm">No team stats available for this match.</p>
              <Button variant="primary" className="mt-4" onClick={() => onNavigate("team-match-stats")}>Enter Team Stats</Button>
            </Card>
          ) : [homeStats, awayStats].map((ts, idx) => ts && (
            <Card key={idx} className="p-5">
              <SectionHeader title={ts.isHome ? (m?.homeTeam ?? "Home") : (m?.awayTeam ?? "Away")} />
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Formation</span><span className="font-mono">{ts.formation}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Goals</span><span className="font-mono">{n(ts.matchStats?.teamGoals ?? 0)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Possession</span><span className="font-mono">{n(ts.matchStats?.possession ?? 0)}%</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Shots</span><span className="font-mono">{n(ts.matchShots?.totalShots ?? 0)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">On Target</span><span className="font-mono">{n(ts.matchShots?.shotsOnTarget ?? 0)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">xG</span><span className="font-mono">{f(ts.matchExpectedGoals?.xg ?? 0).toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Passes</span><span className="font-mono">{n(ts.matchPasses?.passes ?? 0)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Tackles</span><span className="font-mono">{n(ts.matchDefence?.tackles ?? 0)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Yellow Cards</span><span className="font-mono">{n(ts.matchDiscipline?.yellowCards ?? 0)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Red Cards</span><span className="font-mono">{n(ts.matchDiscipline?.redCards ?? 0)}</span></div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === "Player Stats" && (
        <Card className="overflow-hidden">
          {playerStats.loading ? (
            <div className="p-5 space-y-2">{Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-8 w-full" />)}</div>
          ) : (playerStats.data?.length ?? 0) === 0 ? (
            <div className="p-8 text-center">
              <p className="text-muted-foreground text-sm">No player stats entered yet.</p>
              <Button variant="primary" className="mt-4" onClick={() => onNavigate("player-match-stats")}>Enter Player Stats</Button>
            </div>
          ) : (
            <Table>
              <thead><tr>
                <Th>Player</Th><Th>Team</Th><Th className="text-center">Min</Th>
                <Th className="text-center">Rating</Th><Th className="text-center">G</Th><Th className="text-center">A</Th><Th>MOTM</Th>
              </tr></thead>
              <tbody>
                {(playerStats.data ?? []).map((ps: GetPlayerMatchStatsDTO) => (
                  <Tr key={ps.id}>
                    <Td><div className="flex items-center gap-2">
                      <Avatar initials={`${ps.player.firstName[0]}${ps.player.lastName[0]}`} size="sm" />
                      <span className="font-medium text-sm">{ps.player.firstName} {ps.player.lastName}</span>
                    </div></Td>
                    <Td className="text-xs text-muted-foreground">{ps.team.name}</Td>
                    <Td className="text-center font-mono text-xs">{n(ps.playerStats?.minutesPlayed ?? 0)}'</Td>
                    <Td className="text-center font-mono text-xs font-semibold">{f(ps.playerStats?.fotmobRating ?? ps.playerStats?.sofascoreRating ?? 0).toFixed(1)}</Td>
                    <Td className="text-center font-mono text-xs">{n(ps.playerAttack?.goals ?? 0)}</Td>
                    <Td className="text-center font-mono text-xs">{n(ps.playerPasses?.assists ?? 0)}</Td>
                    <Td>{ps.isManOfTheMatch && <Badge variant="blue">MOTM</Badge>}</Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card>
      )}

      {tab === "Analysis" && (
        <Card className="p-6">
          <SectionHeader title="Match Analysis" />
          {sm ? (
            <div className="space-y-4">
              {sm.homeTeamStats?.matchAnalysis?.tacticalNotes && (
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1">Home Team Tactical Notes</p>
                  <p className="text-sm text-foreground leading-relaxed">{sm.homeTeamStats.matchAnalysis.tacticalNotes}</p>
                </div>
              )}
              {sm.awayTeamStats?.matchAnalysis?.tacticalNotes && (
                <div>
                  <p className="text-xs font-semibold text-muted-foreground mb-1">Away Team Tactical Notes</p>
                  <p className="text-sm text-foreground leading-relaxed">{sm.awayTeamStats.matchAnalysis.tacticalNotes}</p>
                </div>
              )}
              {!sm.homeTeamStats?.matchAnalysis?.tacticalNotes && !sm.awayTeamStats?.matchAnalysis?.tacticalNotes && (
                <p className="text-sm text-muted-foreground">No analysis entered yet.</p>
              )}
            </div>
          ) : summary.loading ? <Skeleton className="h-24 w-full" /> : (
            <p className="text-sm text-muted-foreground">Enter team stats to add match analysis.</p>
          )}
        </Card>
      )}
    </div>
  );
}

export default function Matches({ onNavigate }: { onNavigate: (page: string, id?: string) => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const { data: matches, loading, error } = useQuery(fetchMatches);

  if (selected) {
    return <MatchDetail matchId={selected} onBack={() => setSelected(null)} onNavigate={onNavigate} />;
  }

  const filtered = (matches ?? []).filter((m: MatchView) => {
    const matchesSearch = `${m.homeTeam} ${m.awayTeam}`.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || m.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-5">
      <PageHeader title="Matches" subtitle={`${(matches ?? []).length} matches`}
        actions={<Button variant="primary">+ New Match</Button>}
      />
      <div className="flex items-center gap-2 flex-wrap">
        <Input placeholder="Search matches…" value={search} onChange={e => setSearch(e.target.value)} className="max-w-xs" />
        <Select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="max-w-[140px]">
          <option value="">All Status</option>
          <option value="Completed">Completed</option>
          <option value="Upcoming">Upcoming</option>
        </Select>
      </div>
      <Card className="overflow-hidden">
        {loading ? (
          <div className="p-5 space-y-2">{Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}</div>
        ) : error ? (
          <p className="text-sm text-muted-foreground text-center py-10">Could not load matches. Check API connectivity.</p>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-10">No matches found</p>
        ) : (
          <Table>
            <thead><tr>
              <Th>Date</Th><Th>Home Team</Th><Th className="text-center">Score</Th><Th>Away Team</Th>
              <Th>Venue</Th><Th>Status</Th><Th></Th>
            </tr></thead>
            <tbody>
              {filtered.map((m: MatchView) => (
                <Tr key={m.id} onClick={() => setSelected(m.id)}>
                  <Td className="font-mono text-xs text-muted-foreground whitespace-nowrap">{m.date}</Td>
                  <Td><div className="flex items-center gap-2">
                    <Avatar initials={m.homeTeam.slice(0, 2)} size="sm" />
                    <span className="font-medium text-sm">{m.homeTeam}</span>
                  </div></Td>
                  <Td className="text-center font-mono font-bold text-sm whitespace-nowrap">
                    {m.homeGoals !== null ? `${m.homeGoals} – ${m.awayGoals}` : "vs"}
                  </Td>
                  <Td><div className="flex items-center gap-2">
                    <Avatar initials={m.awayTeam.slice(0, 2)} size="sm" />
                    <span className="font-medium text-sm">{m.awayTeam}</span>
                  </div></Td>
                  <Td className="text-xs text-muted-foreground">{m.venue}</Td>
                  <Td><Badge variant={m.status === "Completed" ? "success" : "muted"}>{m.status}</Badge></Td>
                  <Td><Button variant="ghost" className="text-xs">View →</Button></Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </div>
  );
}
