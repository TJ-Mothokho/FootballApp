import { useState } from "react";
import {
  LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import {
  Card, Badge, Button, Table, Th, Td, Tr, Tabs, PageHeader, StatCard, Avatar,
  Input, Select, SectionHeader, Skeleton
} from "../components/ui";
import { useQuery } from "../hooks/useApi";
import {
  fetchPlayers, fetchPlayer, fetchPlayerStatistics, fetchPlayerMatches, fetchPlayerRatings,
  fetchTeams,
  n, f,
  type PlayerView, type MatchView,
} from "../services/api";
import type { GetPlayerDTO, GetTeamDTO, PlayerStatisticsDTO } from "../imports";

function radarData(s: typeof import("../imports").PlayerStatisticsDTO | null) {
  if (!s) return [];
  return [
    { attr: "Shots", value: Math.min(100, n((s as any).totalShots) * 5) },
    { attr: "Passes", value: Math.min(100, f((s as any).passAccuracy)) },
    { attr: "Chances", value: Math.min(100, n((s as any).chancesCreated) * 8) },
    { attr: "Tackles", value: Math.min(100, n((s as any).tackles) * 5) },
    { attr: "Goals", value: Math.min(100, n((s as any).goals) * 10) },
    { attr: "Assists", value: Math.min(100, n((s as any).assists) * 12) },
  ];
}

function PlayerDetail({ playerId, onBack }: { playerId: string; onBack: () => void }) {
  const [tab, setTab] = useState("Overview");

  const playerDto = useQuery(() => fetchPlayer(playerId), [playerId]);
  const stats = useQuery(() => fetchPlayerStatistics(playerId), [playerId]);
  const matchHistory = useQuery(() => fetchPlayerMatches(playerId), [playerId]);
  const ratings = useQuery(() => fetchPlayerRatings(playerId), [playerId]);

  const p = playerDto.data as GetPlayerDTO | null;
  const s = stats.data;

  const age = p?.dateOfBirth
    ? Math.floor((Date.now() - new Date(p.dateOfBirth).getTime()) / (365.25 * 24 * 60 * 60 * 1000))
    : null;

  const ratingTrend = (ratings.data ?? []).map((r: number, i: number) => ({
    week: `R${i + 1}`,
    rating: f(r),
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title={p ? `${p.firstName} ${p.lastName}` : "Player"}
        subtitle={p ? `${p.team?.name ?? "—"} · ${p.position}` : ""}
        breadcrumb={["Players", p ? `${p.firstName} ${p.lastName}` : "Player"]}
        actions={
          <Button variant="secondary" onClick={onBack}>← Back</Button>
        }
      />

      {/* Player header */}
      <Card className="p-5">
        {playerDto.loading ? <Skeleton className="h-20 w-full" /> : p ? (
          <div className="flex items-start gap-5 flex-wrap">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
              {p.firstName[0]}{p.lastName[0]}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-3 flex-1 min-w-0">
              <div><p className="text-xs text-muted-foreground">Team</p><p className="text-sm font-medium">{p.team?.name ?? "—"}</p></div>
              <div><p className="text-xs text-muted-foreground">Position</p><p className="text-sm font-medium">{p.position}</p></div>
              {age !== null && <div><p className="text-xs text-muted-foreground">Age</p><p className="text-sm font-medium font-mono">{age}</p></div>}
              <div><p className="text-xs text-muted-foreground">Nationality</p><p className="text-sm font-medium">{p.national}</p></div>
              <div><p className="text-xs text-muted-foreground">Shirt #</p><p className="text-sm font-medium font-mono">{n(p.shirtNumber)}</p></div>
              <div><p className="text-xs text-muted-foreground">Captain</p><p className="text-sm font-medium">{p.isCaptain ? "Yes" : "No"}</p></div>
              <div><p className="text-xs text-muted-foreground">Status</p><Badge variant={p.isActive ? "success" : "muted"}>{p.isActive ? "Active" : "Inactive"}</Badge></div>
            </div>
          </div>
        ) : null}
      </Card>

      {/* KPIs */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {stats.loading ? (
          Array.from({ length: 6 }).map((_, i) => <Card key={i} className="p-4"><Skeleton className="h-8 w-full" /></Card>)
        ) : s ? (
          <>
            <StatCard label="Matches" value={n((s as any).matchesPlayed)} />
            <StatCard label="Minutes" value={`${n((s as any).minutesPlayed)}'`} />
            <StatCard label="Goals" value={n((s as any).goals)} />
            <StatCard label="Assists" value={n((s as any).assists)} />
            <StatCard label="Rating" value={f((s as any).averageFotmobRating || (s as any).averageSofascoreRating).toFixed(1)} />
            <StatCard label="Pass Acc." value={`${f((s as any).passAccuracy).toFixed(1)}%`} />
          </>
        ) : (
          Array.from({ length: 6 }).map((_, i) => <StatCard key={i} label="—" value="—" />)
        )}
      </div>

      <Tabs tabs={["Overview", "Match History", "Analytics", "Review"]} active={tab} onChange={setTab} />

      {tab === "Overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="p-5">
            <SectionHeader title="Rating Trend" />
            {ratings.loading ? <Skeleton className="h-[200px] w-full" />
              : ratingTrend.length === 0 ? <p className="text-sm text-muted-foreground py-8 text-center">No rating history</p>
              : (
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={ratingTrend} margin={{ top: 4, right: 8, bottom: 0, left: -20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="week" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 10]} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 6, fontSize: 12 }} />
                    <Line type="monotone" dataKey="rating" stroke="#2563eb" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              )}
          </Card>
          <Card className="p-5">
            <SectionHeader title="Performance Radar" />
            {stats.loading ? <Skeleton className="h-[200px] w-full" /> : (
              <ResponsiveContainer width="100%" height={200}>
                <RadarChart data={radarData(s as any)}>
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis dataKey="attr" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
                  <Radar dataKey="value" stroke="#2563eb" fill="#2563eb" fillOpacity={0.2} strokeWidth={2} />
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 6, fontSize: 12 }} />
                </RadarChart>
              </ResponsiveContainer>
            )}
          </Card>
        </div>
      )}

      {tab === "Match History" && (
        <Card className="overflow-hidden">
          {matchHistory.loading ? (
            <div className="p-5 space-y-2">{Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-8 w-full" />)}</div>
          ) : matchHistory.error ? (
            <p className="text-sm text-muted-foreground text-center py-10">Could not load match history</p>
          ) : (matchHistory.data?.length ?? 0) === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-10">No matches found</p>
          ) : (
            <Table>
              <thead><tr>
                <Th>Date</Th><Th>Home</Th><Th className="text-center">Score</Th><Th>Away</Th><Th>Status</Th>
              </tr></thead>
              <tbody>
                {(matchHistory.data ?? []).map((m: MatchView) => (
                  <Tr key={m.id}>
                    <Td className="font-mono text-xs text-muted-foreground">{m.date}</Td>
                    <Td className="text-sm font-medium">{m.homeTeam}</Td>
                    <Td className="text-center font-mono font-bold">
                      {m.homeGoals !== null ? `${m.homeGoals} – ${m.awayGoals}` : "vs"}
                    </Td>
                    <Td className="text-sm font-medium">{m.awayTeam}</Td>
                    <Td><Badge variant={m.status === "Completed" ? "success" : "muted"}>{m.status}</Badge></Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card>
      )}

      {tab === "Analytics" && s && (
        <Card className="p-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard label="Shots" value={n((s as any).totalShots)} />
            <StatCard label="Shots on Target" value={n((s as any).shotsOnTarget)} />
            <StatCard label="Chances Created" value={n((s as any).chancesCreated)} />
            <StatCard label="Tackles" value={n((s as any).tackles)} />
            <StatCard label="Interceptions" value={n((s as any).interceptions)} />
            <StatCard label="Recoveries" value={n((s as any).recoveries)} />
            <StatCard label="Saves" value={n((s as any).saves)} />
            <StatCard label="Yellow Cards" value={n((s as any).yellowCards)} />
          </div>
        </Card>
      )}

      {tab === "Review" && (
        <Card className="p-6">
          <SectionHeader title="Performance Summary" />
          {p && (
            <div className="prose prose-sm max-w-none">
              <p className="text-sm text-foreground leading-relaxed mb-3">
                <strong>{p.firstName} {p.lastName}</strong> plays as a {p.position} for {p.team?.name ?? "their club"}.
                {s && ` This season they have made ${n((s as any).matchesPlayed)} appearances, contributing ${n((s as any).goals)} goals and ${n((s as any).assists)} assists.`}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Use the Player Match Stats entry to add a detailed analytical review for each match.
              </p>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}

export default function Players({ selectedId, onNavigate }: { selectedId?: string; onNavigate: (page: string, id?: string) => void }) {
  const [selected, setSelected] = useState<string | null>(selectedId ?? null);
  const [search, setSearch] = useState("");
  const [teamFilter, setTeamFilter] = useState("");
  const [posFilter, setPosFilter] = useState("");

  const { data: players, loading, error } = useQuery(fetchPlayers);
  const { data: teams } = useQuery(fetchTeams);

  if (selected) {
    return <PlayerDetail playerId={selected} onBack={() => setSelected(null)} />;
  }

  const filtered = (players ?? []).filter((p: PlayerView) => {
    const matchesSearch = `${p.firstName} ${p.lastName}`.toLowerCase().includes(search.toLowerCase());
    const matchesTeam = !teamFilter || p.teamId === teamFilter;
    const matchesPos = !posFilter || p.position === posFilter;
    return matchesSearch && matchesTeam && matchesPos;
  });

  return (
    <div className="space-y-5">
      <PageHeader title="Players" subtitle={`${(players ?? []).length} registered players`}
        actions={<Button variant="primary">+ New Player</Button>}
      />
      <div className="flex items-center gap-2 flex-wrap">
        <Input placeholder="Search players…" value={search} onChange={e => setSearch(e.target.value)} className="max-w-xs" />
        <Select value={teamFilter} onChange={e => setTeamFilter(e.target.value)} className="max-w-[180px]">
          <option value="">All Teams</option>
          {(teams ?? []).map((t: GetTeamDTO) => <option key={t.id} value={t.id}>{t.shortName ?? t.name}</option>)}
        </Select>
        <Select value={posFilter} onChange={e => setPosFilter(e.target.value)} className="max-w-[140px]">
          <option value="">All Positions</option>
          {["Goalkeeper", "Defender", "Midfielder", "Forward"].map(p => <option key={p} value={p}>{p}</option>)}
        </Select>
      </div>
      <Card className="overflow-hidden">
        {loading ? (
          <div className="p-5 space-y-2">{Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}</div>
        ) : error ? (
          <p className="text-sm text-muted-foreground text-center py-10">Could not load players. Check API connectivity.</p>
        ) : filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-10">No players found</p>
        ) : (
          <Table>
            <thead><tr>
              <Th>Player</Th><Th>Team</Th><Th>Position</Th><Th>National</Th><Th></Th>
            </tr></thead>
            <tbody>
              {filtered.map((p: PlayerView) => (
                <Tr key={p.id} onClick={() => setSelected(p.id)}>
                  <Td><div className="flex items-center gap-2.5">
                    <Avatar initials={`${p.firstName[0]}${p.lastName[0]}`} size="sm" />
                    <div>
                      <div className="font-semibold text-sm">{p.firstName} {p.lastName}</div>
                      {p.shirtNumber > 0 && <div className="text-xs text-muted-foreground font-mono">#{p.shirtNumber}</div>}
                    </div>
                  </div></Td>
                  <Td className="text-sm text-muted-foreground">{p.team}</Td>
                  <Td><Badge variant="muted">{p.position}</Badge></Td>
                  <Td className="text-xs text-muted-foreground">{p.national}</Td>
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
