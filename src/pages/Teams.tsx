import { useState } from "react";
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { Card, Badge, Button, Table, Th, Td, Tr, Tabs, PageHeader, StatCard, Avatar, Input, SectionHeader } from "../components/ui";
import { teams, players, matches, teamStats } from "../data/mockData";

export default function Teams({ onNavigate }: { onNavigate: (page: string, id?: string) => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [tab, setTab] = useState("Overview");
  const [search, setSearch] = useState("");
  const [posFilter, setPosFilter] = useState("");

  if (selected) {
    const team = teams.find(t => t.id === selected)!;
    const teamPlayers = players.filter(p => p.teamId === selected);
    const teamMatches = matches.filter(m => m.homeTeamId === selected || m.awayTeamId === selected).slice(0, 5);
    const stats = teamStats[selected as keyof typeof teamStats];

    return (
      <div className="space-y-6">
        <PageHeader
          title={team.name}
          subtitle={`${team.competition} • ${team.season}`}
          breadcrumb={["Teams", team.name]}
          actions={
            <>
              <Button variant="secondary" onClick={() => setSelected(null)}>← Back</Button>
              <Button variant="primary">Edit</Button>
            </>
          }
        />

        {/* Team header card */}
        <Card className="p-5">
          <div className="flex items-start gap-5 flex-wrap">
            <Avatar initials={team.shortName} size="lg" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-3 flex-1 min-w-0">
              <div><p className="text-xs text-muted-foreground">Coach</p><p className="text-sm font-medium">{team.coach}</p></div>
              <div><p className="text-xs text-muted-foreground">Captain</p><p className="text-sm font-medium">{team.captain || "—"}</p></div>
              <div><p className="text-xs text-muted-foreground">Stadium</p><p className="text-sm font-medium">{team.stadium}</p></div>
              <div><p className="text-xs text-muted-foreground">City</p><p className="text-sm font-medium">{team.city}</p></div>
              <div><p className="text-xs text-muted-foreground">Formation</p><p className="text-sm font-medium font-mono">{team.preferredFormation || "—"}</p></div>
              <div><p className="text-xs text-muted-foreground">Playing Style</p><p className="text-sm font-medium">{team.playingStyle || "—"}</p></div>
              <div><p className="text-xs text-muted-foreground">Founded</p><p className="text-sm font-medium font-mono">{team.founded}</p></div>
            </div>
          </div>
        </Card>

        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <StatCard label="Played" value={stats.matchesPlayed} />
            <StatCard label="Wins" value={stats.wins} />
            <StatCard label="Draws" value={stats.draws} />
            <StatCard label="Losses" value={stats.losses} />
            <StatCard label="Goals" value={stats.goalsScored} />
            <StatCard label="Conceded" value={stats.goalsConceded} />
            <StatCard label="GD" value={`+${stats.goalDifference}`} />
            <StatCard label="xG" value={stats.xG} />
            <StatCard label="Possession" value={`${stats.possession}%`} />
            <StatCard label="Pass Acc." value={`${stats.passAccuracy}%`} />
          </div>
        )}

        <Tabs tabs={["Overview", "Players", "Matches", "Charts"]} active={tab} onChange={setTab} />

        {tab === "Overview" && stats && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="p-5">
              <SectionHeader title="Goals Timeline" />
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={stats.goalTimeline} margin={{ top: 4, right: 8, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="week" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 6, fontSize: 12 }} />
                  <Area type="monotone" dataKey="goals" stroke="#2563eb" fill="#eff6ff" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
            <Card className="p-5">
              <SectionHeader title="xG Trend" />
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={stats.xGTrend} margin={{ top: 4, right: 8, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="week" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 6, fontSize: 12 }} />
                  <Line type="monotone" dataKey="xg" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>
        )}

        {tab === "Players" && (
          <Card className="overflow-hidden">
            <Table>
              <thead><tr>
                <Th>Player</Th><Th>Position</Th><Th className="text-center">Apps</Th>
                <Th className="text-center">Min</Th><Th className="text-center">G</Th><Th className="text-center">A</Th>
                <Th className="text-center">Rating</Th>
              </tr></thead>
              <tbody>
                {teamPlayers.map(p => (
                  <Tr key={p.id} onClick={() => onNavigate("players", p.id)}>
                    <Td><div className="flex items-center gap-2">
                      <Avatar initials={`${p.firstName[0]}${p.lastName[0]}`} size="sm" />
                      <div>
                        <div className="font-medium text-sm">{p.firstName} {p.lastName}</div>
                        {p.isCaptain && <Badge variant="muted" >C</Badge>}
                      </div>
                    </div></Td>
                    <Td className="text-xs text-muted-foreground">{p.position}</Td>
                    <Td className="text-center font-mono text-xs">{p.matches}</Td>
                    <Td className="text-center font-mono text-xs">{p.minutes}'</Td>
                    <Td className="text-center font-mono text-xs">{p.goals}</Td>
                    <Td className="text-center font-mono text-xs">{p.assists}</Td>
                    <Td className="text-center font-mono text-xs font-semibold">{p.rating}</Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          </Card>
        )}

        {tab === "Matches" && (
          <Card className="overflow-hidden">
            <Table>
              <thead><tr>
                <Th>Date</Th><Th>Home</Th><Th className="text-center">Score</Th><Th>Away</Th><Th>Venue</Th><Th>Status</Th>
              </tr></thead>
              <tbody>
                {teamMatches.map(m => (
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
          </Card>
        )}

        {tab === "Charts" && (
          <Card className="p-8 text-center"><p className="text-muted-foreground text-sm">Extended charts coming soon</p></Card>
        )}
      </div>
    );
  }

  const filtered = teams.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.city.toLowerCase().includes(search.toLowerCase()) ||
    t.coach.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <PageHeader title="Teams" subtitle={`${teams.length} teams in Betway Premiership 2026/2027`}
        actions={<Button variant="primary">+ New Team</Button>}
      />
      <div className="flex items-center gap-2">
        <Input placeholder="Search teams…" value={search} onChange={e => setSearch(e.target.value)} className="max-w-xs" />
      </div>
      <Card className="overflow-hidden">
        <Table>
          <thead><tr>
            <Th>Team</Th><Th>Coach</Th><Th>Stadium</Th>
            <Th className="text-center">P</Th><Th className="text-center">W</Th><Th className="text-center">D</Th><Th className="text-center">L</Th>
            <Th className="text-center">GF</Th><Th className="text-center">Pts</Th><Th></Th>
          </tr></thead>
          <tbody>
            {filtered.map(t => (
              <Tr key={t.id} onClick={() => setSelected(t.id)}>
                <Td><div className="flex items-center gap-2.5">
                  <Avatar initials={t.shortName} size="sm" />
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.city}</div>
                  </div>
                </div></Td>
                <Td className="text-sm">{t.coach}</Td>
                <Td className="text-xs text-muted-foreground">{t.stadium}</Td>
                <Td className="text-center font-mono text-xs">{t.wins + t.draws + t.losses}</Td>
                <Td className="text-center font-mono text-xs">{t.wins}</Td>
                <Td className="text-center font-mono text-xs">{t.draws}</Td>
                <Td className="text-center font-mono text-xs">{t.losses}</Td>
                <Td className="text-center font-mono text-xs">{t.goalsFor}</Td>
                <Td className="text-center font-mono font-bold">{t.wins * 3 + t.draws}</Td>
                <Td><Button variant="ghost" className="text-xs">View →</Button></Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}
