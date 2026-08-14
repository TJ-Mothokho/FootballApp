import { useState } from "react";
import { Card, Badge, Button, Table, Th, Td, Tr, Tabs, PageHeader, StatCard, Avatar, Input, Select, SectionHeader } from "../components/ui";
import { matches, players, teams } from "../data/mockData";

function MatchHeader({ match }: { match: typeof matches[0] }) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 text-right">
          <div className="flex items-center justify-end gap-3">
            <div>
              <p className="font-bold text-lg text-foreground">{match.homeTeam}</p>
              <p className="text-xs text-muted-foreground">Home</p>
            </div>
            <Avatar initials={match.homeTeam.slice(0,2)} size="lg" />
          </div>
        </div>
        <div className="text-center flex-shrink-0 px-4">
          {match.status === "Completed" ? (
            <div className="text-4xl font-bold font-mono text-foreground">{match.homeGoals} – {match.awayGoals}</div>
          ) : (
            <div className="text-2xl font-semibold text-muted-foreground">vs</div>
          )}
          <p className="text-xs text-muted-foreground mt-1">{match.matchweek}</p>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <Avatar initials={match.awayTeam.slice(0,2)} size="lg" />
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
        {match.attendance && <div><span className="block font-medium text-foreground">{match.attendance.toLocaleString()}</span>Attendance</div>}
      </div>
    </Card>
  );
}

export default function Matches({ onNavigate }: { onNavigate: (page: string, id?: string) => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [tab, setTab] = useState("Summary");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  if (selected) {
    const match = matches.find(m => m.id === selected)!;
    const matchPlayers = players.filter(p => p.teamId === match.homeTeamId || p.teamId === match.awayTeamId);

    return (
      <div className="space-y-6">
        <PageHeader
          title={`${match.homeTeam} vs ${match.awayTeam}`}
          subtitle={`${match.competition} · ${match.season}`}
          breadcrumb={["Matches", `MW${match.matchweek}`]}
          actions={
            <>
              <Button variant="secondary" onClick={() => setSelected(null)}>← Back</Button>
              <Button variant="primary" onClick={() => onNavigate("team-match-stats")}>Enter Stats</Button>
            </>
          }
        />

        <MatchHeader match={match} />

        {match.status === "Completed" && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatCard label="Home Possession" value="54%" />
            <StatCard label="Total Shots" value="24" />
            <StatCard label="Shots on Target" value="11" />
            <StatCard label="xG" value="2.8" />
            <StatCard label="Pass Accuracy" value="83%" />
            <StatCard label="Corners" value="7" />
            <StatCard label="Fouls" value="18" />
            <StatCard label="Cards" value="3Y 0R" />
          </div>
        )}

        <Tabs tabs={["Summary", "Team Stats", "Player Stats", "Analysis"]} active={tab} onChange={setTab} />

        {tab === "Summary" && match.status === "Completed" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="p-5">
              <SectionHeader title="Home — Team Performance" />
              <div className="space-y-2">
                {[
                  { label: "Possession", home: 54, away: 46 },
                  { label: "Shots", home: 15, away: 9 },
                  { label: "Shots on Target", home: 7, away: 4 },
                  { label: "Pass Accuracy", home: 85, away: 79 },
                  { label: "Corners", home: 5, away: 2 },
                ].map(stat => (
                  <div key={stat.label}>
                    <div className="flex justify-between text-xs text-muted-foreground mb-0.5">
                      <span className="font-mono">{stat.home}</span>
                      <span>{stat.label}</span>
                      <span className="font-mono">{stat.away}</span>
                    </div>
                    <div className="flex h-1.5 rounded-full overflow-hidden gap-0.5">
                      <div className="bg-primary rounded-l-full" style={{ width: `${stat.home / (stat.home + stat.away) * 100}%` }} />
                      <div className="bg-slate-300 dark:bg-slate-600 rounded-r-full flex-1" />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-5">
              <SectionHeader title="Match Analysis" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                A competitive derby fixture. The home side dominated possession and created more opportunities, eventually converting through clinical finishing. The away team showed resilience but ultimately conceded late set-pieces proved decisive.
              </p>
            </Card>
          </div>
        )}

        {tab === "Player Stats" && (
          <Card className="overflow-hidden">
            <Table>
              <thead><tr>
                <Th>Player</Th><Th>Team</Th><Th className="text-center">Min</Th>
                <Th className="text-center">Rating</Th><Th className="text-center">G</Th><Th className="text-center">A</Th><Th>MOTM</Th>
              </tr></thead>
              <tbody>
                {matchPlayers.slice(0, 8).map(p => (
                  <Tr key={p.id} onClick={() => onNavigate("players", p.id)}>
                    <Td><div className="flex items-center gap-2"><Avatar initials={`${p.firstName[0]}${p.lastName[0]}`} size="sm" />
                      <span className="font-medium text-sm">{p.firstName} {p.lastName}</span></div></Td>
                    <Td className="text-xs text-muted-foreground">{p.team}</Td>
                    <Td className="text-center font-mono text-xs">90'</Td>
                    <Td className="text-center font-mono text-xs font-semibold">{(Math.random() * 2 + 6).toFixed(1)}</Td>
                    <Td className="text-center font-mono text-xs">{Math.random() > 0.8 ? 1 : 0}</Td>
                    <Td className="text-center font-mono text-xs">{Math.random() > 0.8 ? 1 : 0}</Td>
                    <Td>{Math.random() > 0.9 && <Badge variant="blue">MOTM</Badge>}</Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          </Card>
        )}

        {(tab === "Team Stats" || tab === "Analysis") && (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground text-sm">{tab} — enter data via the stats entry forms</p>
            <Button variant="primary" className="mt-4" onClick={() => onNavigate("team-match-stats")}>Enter Team Stats</Button>
          </Card>
        )}
      </div>
    );
  }

  const filtered = matches.filter(m => {
    const matchesSearch = `${m.homeTeam} ${m.awayTeam}`.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || m.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-5">
      <PageHeader title="Matches" subtitle={`${matches.length} matches this season`}
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
        <Table>
          <thead><tr>
            <Th>Date</Th><Th>Home Team</Th><Th className="text-center">Score</Th><Th>Away Team</Th>
            <Th>Venue</Th><Th>Status</Th><Th>MW</Th><Th></Th>
          </tr></thead>
          <tbody>
            {filtered.map(m => (
              <Tr key={m.id} onClick={() => setSelected(m.id)}>
                <Td className="font-mono text-xs text-muted-foreground whitespace-nowrap">{m.date}</Td>
                <Td><div className="flex items-center gap-2"><Avatar initials={m.homeTeam.slice(0,2)} size="sm" /><span className="font-medium text-sm">{m.homeTeam}</span></div></Td>
                <Td className="text-center font-mono font-bold text-sm whitespace-nowrap">
                  {m.homeGoals !== null ? `${m.homeGoals} – ${m.awayGoals}` : "vs"}
                </Td>
                <Td><div className="flex items-center gap-2"><Avatar initials={m.awayTeam.slice(0,2)} size="sm" /><span className="font-medium text-sm">{m.awayTeam}</span></div></Td>
                <Td className="text-xs text-muted-foreground">{m.venue}</Td>
                <Td><Badge variant={m.status === "Completed" ? "success" : "muted"}>{m.status}</Badge></Td>
                <Td className="font-mono text-xs text-muted-foreground">MW{m.matchweek}</Td>
                <Td><Button variant="ghost" className="text-xs">View →</Button></Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}
