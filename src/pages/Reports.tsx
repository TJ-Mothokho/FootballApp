import { Card, PageHeader, SectionHeader, Table, Th, Td, Tr, Avatar, Skeleton, StatCard } from "../components/ui";
import { useQuery } from "../hooks/useApi";
import {
  fetchDashboardOverview, fetchLeaderboardGoals, fetchLeaderboardAssists, fetchLeaderboardRatings, fetchLeaderboardPasses,
  n, type TopPerformerView,
} from "../services/api";

function LeaderboardCard({ title, valueLabel, query }: { title: string; valueLabel: string; query: { data: TopPerformerView[] | null; loading: boolean; error: string | null } }) {
  return <Card className="overflow-hidden"><div className="px-5 pt-5"><SectionHeader title={title} /></div>{query.loading ? <div className="px-5 pb-5 space-y-2">{Array.from({ length: 5 }).map((_, index) => <Skeleton key={index} className="h-8 w-full" />)}</div> : query.error ? <p className="px-5 pb-6 text-center text-sm text-muted-foreground">Could not load this report.</p> : (query.data?.length ?? 0) === 0 ? <p className="px-5 pb-6 text-center text-sm text-muted-foreground">No report data is available yet.</p> : <Table><thead><tr><Th>#</Th><Th>Player</Th><Th>Team</Th><Th className="text-center">{valueLabel}</Th></tr></thead><tbody>{(query.data ?? []).slice(0, 10).map((player, index) => <Tr key={player.playerId}><Td className="font-mono text-xs text-muted-foreground">{index + 1}</Td><Td><div className="flex items-center gap-2"><Avatar initials={player.name.slice(0, 2)} size="sm" /><span className="font-medium text-sm">{player.name}</span></div></Td><Td className="text-xs text-muted-foreground">{player.team}</Td><Td className="text-center font-mono font-semibold text-primary">{valueLabel === "Rating" ? player.rating.toFixed(1) : player.stat}</Td></Tr>)}</tbody></Table>}</Card>;
}

export default function Reports() {
  const overview = useQuery(fetchDashboardOverview);
  const goals = useQuery(fetchLeaderboardGoals);
  const assists = useQuery(fetchLeaderboardAssists);
  const ratings = useQuery(fetchLeaderboardRatings);
  const passes = useQuery(fetchLeaderboardPasses);

  return <div className="space-y-5"><PageHeader title="Reports" subtitle="Live leaderboards and competition-wide performance summaries" />{overview.loading ? <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">{Array.from({ length: 4 }).map((_, index) => <Card key={index} className="p-4"><Skeleton className="h-10 w-full" /></Card>)}</div> : <div className="grid grid-cols-2 sm:grid-cols-4 gap-3"><StatCard label="Competitions" value={overview.data ? n(overview.data.competitions) : "—"} /><StatCard label="Matches" value={overview.data ? n(overview.data.matches) : "—"} /><StatCard label="Goals" value={overview.data ? n(overview.data.goals) : "—"} /><StatCard label="Players" value={overview.data ? n(overview.data.players) : "—"} /></div>}<Card className="border-blue-100 bg-blue-50/40 p-4 dark:border-blue-900 dark:bg-blue-950/20"><p className="text-sm font-medium text-foreground">Live API reports</p><p className="mt-1 text-sm text-muted-foreground">The available API provides performance leaderboards and dashboard metrics. Narrative report generation and file exports are not exposed by the backend, so this page presents verified live data instead of simulated reports.</p></Card><div className="grid grid-cols-1 lg:grid-cols-2 gap-4"><LeaderboardCard title="Goals Leaders" valueLabel="Goals" query={goals} /><LeaderboardCard title="Assist Leaders" valueLabel="Assists" query={assists} /><LeaderboardCard title="Highest Rated" valueLabel="Rating" query={ratings} /><LeaderboardCard title="Pass Leaders" valueLabel="Passes" query={passes} /></div></div>;
}
