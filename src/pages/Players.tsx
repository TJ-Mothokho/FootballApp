import { useState } from "react";
import {
  LineChart, Line, RadarChart, Radar, PolarGrid, PolarAngleAxis, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import {
  Card, Badge, Button, Table, Th, Td, Tr, Tabs, PageHeader, StatCard, Avatar,
  Input, Select, SectionHeader, FormBadge
} from "../components/ui";
import { players, teams, ratingTrend, playerMatchHistory } from "../data/mockData";

const radarData = (p: typeof players[0]) => [
  { attr: "Pace", value: 72 }, { attr: "Shooting", value: p.goals > 5 ? 82 : 65 },
  { attr: "Passing", value: p.assists > 3 ? 78 : 68 }, { attr: "Dribbling", value: 70 },
  { attr: "Defending", value: p.position === "Defender" ? 82 : 45 }, { attr: "Physical", value: 75 },
];

export default function Players({ selectedId, onNavigate }: { selectedId?: string; onNavigate: (page: string, id?: string) => void }) {
  const [selected, setSelected] = useState<string | null>(selectedId || null);
  const [tab, setTab] = useState("Overview");
  const [search, setSearch] = useState("");
  const [teamFilter, setTeamFilter] = useState("");
  const [posFilter, setPosFilter] = useState("");

  if (selected) {
    const player = players.find(p => p.id === selected)!;
    const age = Math.floor((Date.now() - new Date(player.dateOfBirth).getTime()) / (1000 * 60 * 60 * 24 * 365));

    return (
      <div className="space-y-6">
        <PageHeader
          title={`${player.firstName} ${player.lastName}`}
          subtitle={`${player.team} · ${player.position}`}
          breadcrumb={["Players", `${player.firstName} ${player.lastName}`]}
          actions={
            <>
              <Button variant="secondary" onClick={() => setSelected(null)}>← Back</Button>
              <Button variant="primary">Edit</Button>
            </>
          }
        />

        {/* Player header */}
        <Card className="p-5">
          <div className="flex items-start gap-5 flex-wrap">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
              {player.firstName[0]}{player.lastName[0]}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-3 flex-1 min-w-0">
              <div><p className="text-xs text-muted-foreground">Team</p><p className="text-sm font-medium">{player.team}</p></div>
              <div><p className="text-xs text-muted-foreground">Position</p><p className="text-sm font-medium">{player.position}</p></div>
              <div><p className="text-xs text-muted-foreground">Age</p><p className="text-sm font-medium font-mono">{age}</p></div>
              <div><p className="text-xs text-muted-foreground">Nationality</p><p className="text-sm font-medium">{player.national}</p></div>
              <div><p className="text-xs text-muted-foreground">Shirt #</p><p className="text-sm font-medium font-mono">{player.shirtNumber}</p></div>
              <div><p className="text-xs text-muted-foreground">Captain</p><p className="text-sm font-medium">{player.isCaptain ? "Yes" : "No"}</p></div>
              <div><p className="text-xs text-muted-foreground">Status</p><Badge variant={player.isActive ? "success" : "muted"}>{player.isActive ? "Active" : "Inactive"}</Badge></div>
            </div>
          </div>
        </Card>

        {/* KPIs */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          <StatCard label="Matches" value={player.matches} />
          <StatCard label="Minutes" value={`${player.minutes}'`} />
          <StatCard label="Goals" value={player.goals} />
          <StatCard label="Assists" value={player.assists} />
          <StatCard label="Rating" value={player.rating} />
          <StatCard label="xG" value={(player.goals * 0.9).toFixed(1)} />
        </div>

        <Tabs tabs={["Overview", "Match History", "Analytics", "Review"]} active={tab} onChange={setTab} />

        {tab === "Overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="p-5">
              <SectionHeader title="Rating Trend" />
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={ratingTrend} margin={{ top: 4, right: 8, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="week" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                  <YAxis domain={[5, 10]} tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 6, fontSize: 12 }} />
                  <Line type="monotone" dataKey="rating" stroke="#2563eb" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
            <Card className="p-5">
              <SectionHeader title="Performance Radar" />
              <ResponsiveContainer width="100%" height={200}>
                <RadarChart data={radarData(player)}>
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis dataKey="attr" tick={{ fontSize: 10, fill: "var(--muted-foreground)" }} />
                  <Radar dataKey="value" stroke="#2563eb" fill="#2563eb" fillOpacity={0.2} strokeWidth={2} />
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 6, fontSize: 12 }} />
                </RadarChart>
              </ResponsiveContainer>
            </Card>
          </div>
        )}

        {tab === "Match History" && (
          <Card className="overflow-hidden">
            <Table>
              <thead><tr>
                <Th>Date</Th><Th>Opponent</Th><Th>Result</Th>
                <Th className="text-center">Min</Th><Th className="text-center">Rating</Th>
                <Th className="text-center">G</Th><Th className="text-center">A</Th><Th>MOTM</Th>
              </tr></thead>
              <tbody>
                {playerMatchHistory.map(m => (
                  <Tr key={m.matchId}>
                    <Td className="font-mono text-xs text-muted-foreground">{m.date}</Td>
                    <Td className="text-sm font-medium">{m.opponent}</Td>
                    <Td><span className={`font-mono text-xs font-semibold ${m.result.includes("W") ? "text-emerald-600" : m.result.includes("D") ? "text-amber-600" : "text-red-600"}`}>{m.result}</span></Td>
                    <Td className="text-center font-mono text-xs">{m.minutes}'</Td>
                    <Td className="text-center font-mono text-xs font-semibold">{m.rating}</Td>
                    <Td className="text-center font-mono text-xs">{m.goals}</Td>
                    <Td className="text-center font-mono text-xs">{m.assists}</Td>
                    <Td>{m.motm && <Badge variant="blue">MOTM</Badge>}</Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          </Card>
        )}

        {tab === "Analytics" && (
          <Card className="p-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatCard label="xA" value={(player.assists * 0.85).toFixed(1)} />
              <StatCard label="Pass Acc." value="83.1%" />
              <StatCard label="Chances Created" value="22" />
              <StatCard label="Touches" value="412" />
            </div>
          </Card>
        )}

        {tab === "Review" && (
          <Card className="p-6">
            <SectionHeader title="Performance Summary" />
            <div className="prose prose-sm max-w-none">
              <p className="text-sm text-foreground leading-relaxed mb-3">
                <strong>{player.firstName} {player.lastName}</strong> has been one of the standout performers for {player.team} in the 2026/2027 Betway Premiership season. The {player.position.toLowerCase()} has contributed {player.goals} goals and {player.assists} assists in {player.matches} appearances, with an average rating of {player.rating}.
              </p>
              <p className="text-sm text-foreground leading-relaxed mb-3">
                Technically proficient with excellent movement, {player.firstName} consistently creates opportunities both for themselves and teammates. Their work rate off the ball has been particularly noteworthy, pressing effectively and recovering possession in dangerous areas.
              </p>
              <p className="text-sm text-foreground leading-relaxed">
                Areas for development include consistency across all 90 minutes and improving performance in high-pressure away fixtures. Overall, a key asset for {player.team} going forward in the season.
              </p>
            </div>
          </Card>
        )}
      </div>
    );
  }

  const filtered = players.filter(p => {
    const matchesSearch = `${p.firstName} ${p.lastName}`.toLowerCase().includes(search.toLowerCase());
    const matchesTeam = !teamFilter || p.teamId === teamFilter;
    const matchesPos = !posFilter || p.position === posFilter;
    return matchesSearch && matchesTeam && matchesPos;
  });

  return (
    <div className="space-y-5">
      <PageHeader title="Players" subtitle={`${players.length} registered players`}
        actions={<Button variant="primary">+ New Player</Button>}
      />
      <div className="flex items-center gap-2 flex-wrap">
        <Input placeholder="Search players…" value={search} onChange={e => setSearch(e.target.value)} className="max-w-xs" />
        <Select value={teamFilter} onChange={e => setTeamFilter(e.target.value)} className="max-w-[160px]">
          <option value="">All Teams</option>
          {teams.map(t => <option key={t.id} value={t.id}>{t.shortName}</option>)}
        </Select>
        <Select value={posFilter} onChange={e => setPosFilter(e.target.value)} className="max-w-[140px]">
          <option value="">All Positions</option>
          {["Goalkeeper", "Defender", "Midfielder", "Forward"].map(p => <option key={p} value={p}>{p}</option>)}
        </Select>
      </div>
      <Card className="overflow-hidden">
        <Table>
          <thead><tr>
            <Th>Player</Th><Th>Team</Th><Th>Position</Th>
            <Th className="text-center">Apps</Th><Th className="text-center">Min</Th>
            <Th className="text-center">G</Th><Th className="text-center">A</Th><Th className="text-center">Rating</Th><Th></Th>
          </tr></thead>
          <tbody>
            {filtered.map(p => (
              <Tr key={p.id} onClick={() => setSelected(p.id)}>
                <Td><div className="flex items-center gap-2.5">
                  <Avatar initials={`${p.firstName[0]}${p.lastName[0]}`} size="sm" />
                  <div>
                    <div className="font-semibold text-sm">{p.firstName} {p.lastName}</div>
                    <div className="text-xs text-muted-foreground font-mono">#{p.shirtNumber}</div>
                  </div>
                </div></Td>
                <Td className="text-sm text-muted-foreground">{p.team}</Td>
                <Td><Badge variant="muted">{p.position}</Badge></Td>
                <Td className="text-center font-mono text-xs">{p.matches}</Td>
                <Td className="text-center font-mono text-xs">{p.minutes}'</Td>
                <Td className="text-center font-mono text-xs font-semibold">{p.goals}</Td>
                <Td className="text-center font-mono text-xs">{p.assists}</Td>
                <Td className="text-center font-mono text-xs font-semibold text-primary">{p.rating}</Td>
                <Td><Button variant="ghost" className="text-xs">View →</Button></Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}
