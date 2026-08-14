import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import {
  Card, StatCard, Badge, FormBadge, SectionHeader, Avatar, Button, Table, Th, Td, Tr
} from "../components/ui";
import {
  goalsPerMatchweek, resultDistribution, topScoringTeams, standings, topPerformers, matches
} from "../data/mockData";

function TopPerformerCard({ label, name, team, stat, icon }: { label: string; name: string; team: string; stat: string; icon: string }) {
  return (
    <Card className="p-4">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">{label}</p>
      <div className="flex items-center gap-3">
        <Avatar initials={name.split(" ").map(n => n[0]).join("")} size="md" />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">{name}</p>
          <p className="text-xs text-muted-foreground truncate">{team}</p>
        </div>
        <div className="ml-auto text-right">
          <p className="text-lg font-bold text-primary font-mono">{stat}</p>
        </div>
      </div>
    </Card>
  );
}

const CHART_COLORS = { primary: "#2563eb", neutral: "#94a3b8", success: "#10b981" };

export default function Dashboard({ onNavigate }: { onNavigate: (page: string, id?: string) => void }) {
  const recentMatches = matches.filter(m => m.status === "Completed").slice(0, 5);
  const upcoming = matches.filter(m => m.status === "Upcoming").slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Quick actions */}
      <div className="flex items-center gap-2 flex-wrap">
        <Button variant="primary" onClick={() => onNavigate("matches")}>
          <span>+</span> New Match
        </Button>
        <Button variant="secondary" onClick={() => onNavigate("team-match-stats")}>
          <span>+</span> Team Match Stats
        </Button>
        <Button variant="secondary" onClick={() => onNavigate("player-match-stats")}>
          <span>+</span> Player Match Stats
        </Button>
      </div>

      {/* Overview KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard label="Matches Played" value="88" sub="of 240 total" />
        <StatCard label="Goals" value="131" sub="Season total" trend="up" />
        <StatCard label="Avg Goals / Match" value="1.49" sub="+0.12 vs last season" trend="up" />
        <StatCard label="Teams" value="16" sub="Betway Premiership" />
        <StatCard label="Players" value="382" />
        <StatCard label="Current Matchweek" value="MW10" sub="4 matches pending" />
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Goals by Matchweek */}
        <Card className="p-5 lg:col-span-2">
          <SectionHeader title="Goals by Matchweek" />
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={goalsPerMatchweek} margin={{ top: 4, right: 8, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 6, fontSize: 12 }}
                cursor={{ stroke: "var(--border)" }}
              />
              <Line type="monotone" dataKey="goals" stroke={CHART_COLORS.primary} strokeWidth={2} dot={{ r: 3, fill: CHART_COLORS.primary }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Result Distribution */}
        <Card className="p-5">
          <SectionHeader title="Result Distribution" />
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={resultDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                {resultDistribution.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 6, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-1.5 mt-2">
            {resultDistribution.map(d => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: d.color }} />
                  <span className="text-muted-foreground">{d.name}</span>
                </span>
                <span className="font-medium font-mono text-foreground">{d.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Top Scoring Teams */}
      <Card className="p-5">
        <SectionHeader title="Top Scoring Teams" />
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={topScoringTeams} layout="vertical" margin={{ top: 0, right: 16, bottom: 0, left: 100 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="team" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} width={95} />
            <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 6, fontSize: 12 }} />
            <Bar dataKey="goals" fill={CHART_COLORS.primary} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Standings */}
      <Card className="overflow-hidden">
        <div className="px-5 pt-5 pb-3">
          <SectionHeader title="League Standings" actions={
            <Button variant="ghost" onClick={() => onNavigate("competitions")} className="text-xs">View all</Button>
          } />
        </div>
        <Table>
          <thead>
            <tr>
              <Th className="w-8">#</Th>
              <Th>Team</Th>
              <Th className="text-center">P</Th>
              <Th className="text-center">W</Th>
              <Th className="text-center">D</Th>
              <Th className="text-center">L</Th>
              <Th className="text-center">GF</Th>
              <Th className="text-center">GA</Th>
              <Th className="text-center">GD</Th>
              <Th className="text-center font-bold">Pts</Th>
              <Th>Form</Th>
            </tr>
          </thead>
          <tbody>
            {standings.map(row => (
              <Tr key={row.pos} onClick={() => onNavigate("teams")}>
                <Td className="text-muted-foreground font-mono text-xs">{row.pos}</Td>
                <Td>
                  <div className="flex items-center gap-2">
                    <Avatar initials={row.team.slice(0, 2)} size="sm" />
                    <span className="font-medium">{row.team}</span>
                  </div>
                </Td>
                <Td className="text-center font-mono text-xs">{row.played}</Td>
                <Td className="text-center font-mono text-xs">{row.won}</Td>
                <Td className="text-center font-mono text-xs">{row.drawn}</Td>
                <Td className="text-center font-mono text-xs">{row.lost}</Td>
                <Td className="text-center font-mono text-xs">{row.gf}</Td>
                <Td className="text-center font-mono text-xs">{row.ga}</Td>
                <Td className="text-center font-mono text-xs">{row.gd > 0 ? `+${row.gd}` : row.gd}</Td>
                <Td className="text-center font-mono font-bold">{row.points}</Td>
                <Td>
                  <div className="flex items-center gap-0.5">
                    {row.form.map((r, i) => <FormBadge key={i} result={r} />)}
                  </div>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent matches */}
        <Card className="overflow-hidden">
          <div className="px-5 pt-5 pb-3">
            <SectionHeader title="Recent Matches" actions={
              <Button variant="ghost" onClick={() => onNavigate("matches")} className="text-xs">View all</Button>
            } />
          </div>
          <Table>
            <thead>
              <tr>
                <Th>Date</Th>
                <Th>Match</Th>
                <Th className="text-center">Score</Th>
                <Th>Status</Th>
              </tr>
            </thead>
            <tbody>
              {recentMatches.map(m => (
                <Tr key={m.id} onClick={() => onNavigate("match-detail", m.id)}>
                  <Td className="text-xs text-muted-foreground font-mono whitespace-nowrap">{m.date}</Td>
                  <Td>
                    <span className="text-xs">{m.homeTeam} vs {m.awayTeam}</span>
                  </Td>
                  <Td className="text-center font-mono font-bold text-sm whitespace-nowrap">
                    {m.homeGoals} – {m.awayGoals}
                  </Td>
                  <Td><Badge variant="success">FT</Badge></Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </Card>

        {/* Upcoming fixtures */}
        <Card className="overflow-hidden">
          <div className="px-5 pt-5 pb-3">
            <SectionHeader title="Upcoming Fixtures" actions={
              <Button variant="ghost" onClick={() => onNavigate("matches")} className="text-xs">View all</Button>
            } />
          </div>
          <div className="divide-y divide-border">
            {upcoming.map(m => (
              <div key={m.id} className="px-5 py-3 flex items-center gap-3 hover:bg-muted/40 transition-colors cursor-pointer" onClick={() => onNavigate("match-detail", m.id)}>
                <div className="text-xs text-muted-foreground font-mono w-20 flex-shrink-0">
                  <div>{m.date}</div>
                  <div className="text-[10px]">{m.kickOff}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Avatar initials={m.homeTeam.slice(0, 2)} size="sm" />
                    <span className="truncate">{m.homeTeam}</span>
                    <span className="text-muted-foreground text-xs">vs</span>
                    <Avatar initials={m.awayTeam.slice(0, 2)} size="sm" />
                    <span className="truncate">{m.awayTeam}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{m.venue}</div>
                </div>
                <Badge variant="muted">{m.matchweek}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Top Performers */}
      <div>
        <SectionHeader title="Top Performers" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <TopPerformerCard label="Top Scorer" name={topPerformers.topScorer.name} team={topPerformers.topScorer.team} stat={`${topPerformers.topScorer.goals} G`} icon="⚽" />
          <TopPerformerCard label="Top Assists" name={topPerformers.topAssists.name} team={topPerformers.topAssists.team} stat={`${topPerformers.topAssists.assists} A`} icon="🎯" />
          <TopPerformerCard label="Highest Rated" name={topPerformers.highestRated.name} team={topPerformers.highestRated.team} stat={`${topPerformers.highestRated.rating}`} icon="⭐" />
          <TopPerformerCard label="Most Minutes" name={topPerformers.mostMinutes.name} team={topPerformers.mostMinutes.team} stat={`${topPerformers.mostMinutes.minutes}'`} icon="⏱" />
          <TopPerformerCard label="Most Passes" name={topPerformers.mostPasses.name} team={topPerformers.mostPasses.team} stat={`${topPerformers.mostPasses.passes}`} icon="🔄" />
        </div>
      </div>
    </div>
  );
}
