import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import {
  Card, StatCard, Badge, FormBadge, SectionHeader, Avatar, Button, Table, Th, Td, Tr, Skeleton
} from "../components/ui";
import { useQuery } from "../hooks/useApi";
import {
  fetchDashboardOverview,
  fetchGoalsPerRound,
  fetchFormTable,
  fetchRecentMatches,
  fetchUpcomingFixtures,
  fetchDashboardTopScorers,
  fetchDashboardTopAssists,
  fetchDashboardTopRated,
  fetchResultDistribution,
  n,
  type MatchView,
  type StandingView,
  type TopPerformerView,
} from "../services/api";

function TopPerformerCard({ label, name, team, stat }: { label: string; name: string; team: string; stat: string }) {
  return (
    <Card className="p-4">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">{label}</p>
      <div className="flex items-center gap-3">
        <Avatar initials={name.split(" ").map(nn => nn[0]).join("")} size="md" />
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
  const overview = useQuery(fetchDashboardOverview);
  const goalsChart = useQuery(fetchGoalsPerRound);
  const standings = useQuery(fetchFormTable);
  const recentMatches = useQuery(fetchRecentMatches);
  const upcoming = useQuery(fetchUpcomingFixtures);
  const topScorers = useQuery(fetchDashboardTopScorers);
  const topAssists = useQuery(fetchDashboardTopAssists);
  const topRated = useQuery(fetchDashboardTopRated);
  const distribution = useQuery(fetchResultDistribution);

  const ov = overview.data;

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
        {overview.loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="p-4"><Skeleton className="h-8 w-16 mb-1" /><Skeleton className="h-3 w-20" /></Card>
          ))
        ) : (
          <>
            <StatCard label="Matches Played" value={ov ? n(ov.completedMatches) : "—"} />
            <StatCard label="Goals" value={ov ? n(ov.goals) : "—"} />
            <StatCard label="Avg Goals / Match"
              value={ov && n(ov.completedMatches) > 0
                ? (n(ov.goals) / n(ov.completedMatches)).toFixed(2)
                : "—"} />
            <StatCard label="Teams" value={ov ? n(ov.teams) : "—"} />
            <StatCard label="Players" value={ov ? n(ov.players) : "—"} />
            <StatCard label="Upcoming" value={ov ? n(ov.upcomingMatches) : "—"} sub="fixtures remaining" />
          </>
        )}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Goals by Round */}
        <Card className="p-5 lg:col-span-2">
          <SectionHeader title="Goals by Round" />
          {goalsChart.loading ? (
            <Skeleton className="h-[220px] w-full" />
          ) : goalsChart.error ? (
            <p className="text-sm text-muted-foreground py-8 text-center">Could not load chart data</p>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={goalsChart.data ?? []} margin={{ top: 4, right: 8, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="week" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 6, fontSize: 12 }} cursor={{ stroke: "var(--border)" }} />
                <Line type="monotone" dataKey="goals" stroke={CHART_COLORS.primary} strokeWidth={2} dot={{ r: 3, fill: CHART_COLORS.primary }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Card>

        {/* Result Distribution */}
        <Card className="p-5">
          <SectionHeader title="Result Distribution" />
          {distribution.loading ? (
            <Skeleton className="h-[180px] w-full" />
          ) : distribution.error || !distribution.data ? (
            <p className="text-sm text-muted-foreground py-8 text-center">No data</p>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={distribution.data} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                    {distribution.data.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 6, fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col gap-1.5 mt-2">
                {distribution.data.map(d => (
                  <div key={d.name} className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: d.color }} />
                      <span className="text-muted-foreground">{d.name}</span>
                    </span>
                    <span className="font-medium font-mono text-foreground">{d.value}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </Card>
      </div>

      {/* Standings */}
      <Card className="overflow-hidden">
        <div className="px-5 pt-5 pb-3">
          <SectionHeader title="League Standings" actions={
            <Button variant="ghost" onClick={() => onNavigate("competitions")} className="text-xs">View all</Button>
          } />
        </div>
        {standings.loading ? (
          <div className="px-5 pb-4 space-y-2">
            {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-8 w-full" />)}
          </div>
        ) : standings.error ? (
          <p className="text-sm text-muted-foreground text-center py-8">Could not load standings</p>
        ) : (standings.data?.length ?? 0) === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">No standings data available</p>
        ) : (
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
              {(standings.data ?? []).map((row: StandingView) => (
                <Tr key={row.teamId} onClick={() => onNavigate("teams")}>
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
        )}
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
          {recentMatches.loading ? (
            <div className="px-5 pb-4 space-y-2">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-8 w-full" />)}</div>
          ) : (recentMatches.data?.length ?? 0) === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">No recent matches</p>
          ) : (
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
                {(recentMatches.data ?? []).map((m: MatchView) => (
                  <Tr key={m.id} onClick={() => onNavigate("match-detail", m.id)}>
                    <Td className="text-xs text-muted-foreground font-mono whitespace-nowrap">{m.date}</Td>
                    <Td><span className="text-xs">{m.homeTeam} vs {m.awayTeam}</span></Td>
                    <Td className="text-center font-mono font-bold text-sm whitespace-nowrap">
                      {m.homeGoals !== null ? `${m.homeGoals} – ${m.awayGoals}` : "vs"}
                    </Td>
                    <Td><Badge variant={m.status === "Completed" ? "success" : "muted"}>
                      {m.status === "Completed" ? "FT" : m.status}
                    </Badge></Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card>

        {/* Upcoming fixtures */}
        <Card className="overflow-hidden">
          <div className="px-5 pt-5 pb-3">
            <SectionHeader title="Upcoming Fixtures" actions={
              <Button variant="ghost" onClick={() => onNavigate("matches")} className="text-xs">View all</Button>
            } />
          </div>
          {upcoming.loading ? (
            <div className="px-5 pb-4 space-y-2">{Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}</div>
          ) : (upcoming.data?.length ?? 0) === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">No upcoming fixtures</p>
          ) : (
            <div className="divide-y divide-border">
              {(upcoming.data ?? []).map((m: MatchView) => (
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
                  <Badge variant="muted">{m.season}</Badge>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Top Performers */}
      <div>
        <SectionHeader title="Top Performers" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {topScorers.loading || topAssists.loading || topRated.loading ? (
            Array.from({ length: 5 }).map((_, i) => <Card key={i} className="p-4"><Skeleton className="h-16 w-full" /></Card>)
          ) : (
            <>
              {(topScorers.data ?? []).slice(0, 1).map((p: TopPerformerView) => (
                <TopPerformerCard key="ts" label="Top Scorer" name={p.name} team={p.team} stat={`${p.stat} G`} />
              ))}
              {(topAssists.data ?? []).slice(0, 1).map((p: TopPerformerView) => (
                <TopPerformerCard key="ta" label="Top Assists" name={p.name} team={p.team} stat={`${p.stat} A`} />
              ))}
              {(topRated.data ?? []).slice(0, 1).map((p: TopPerformerView) => (
                <TopPerformerCard key="tr" label="Highest Rated" name={p.name} team={p.team} stat={p.rating.toFixed(1)} />
              ))}
              {(topScorers.data ?? []).slice(1, 2).map((p: TopPerformerView) => (
                <TopPerformerCard key="mm" label="2nd Top Scorer" name={p.name} team={p.team} stat={`${p.stat} G`} />
              ))}
              {(topAssists.data ?? []).slice(1, 2).map((p: TopPerformerView) => (
                <TopPerformerCard key="mp" label="2nd Most Assists" name={p.name} team={p.team} stat={`${p.stat} A`} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
