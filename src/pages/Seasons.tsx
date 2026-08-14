import { useState } from "react";
import { Card, Badge, Button, Table, Th, Td, Tr, Tabs, PageHeader, StatCard, Input } from "../components/ui";
import { seasons, standings } from "../data/mockData";
import { FormBadge, Avatar } from "../components/ui";

export default function Seasons({ onNavigate }: { onNavigate: (page: string, id?: string) => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [tab, setTab] = useState("Overview");
  const [search, setSearch] = useState("");

  if (selected) {
    const season = seasons.find(s => s.id === selected)!;
    return (
      <div className="space-y-6">
        <PageHeader
          title={season.name}
          subtitle={season.competition}
          breadcrumb={["Seasons", season.name]}
          actions={
            <>
              <Button variant="secondary" onClick={() => setSelected(null)}>← Back</Button>
              <Button variant="primary">Edit</Button>
            </>
          }
        />
        <div className="flex items-center gap-2">
          <Badge variant={season.isCurrent ? "success" : "muted"}>{season.status}</Badge>
          <span className="text-sm text-muted-foreground">{season.startDate} → {season.endDate}</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <StatCard label="Matches" value={season.matches} />
          <StatCard label="Teams" value={season.teams} />
          <StatCard label="Players" value="382" />
          <StatCard label="Goals" value="131" />
          <StatCard label="Avg Goals" value="1.49" />
        </div>
        <Tabs tabs={["Overview", "Fixtures", "Results", "Standings", "Statistics"]} active={tab} onChange={setTab} />
        {tab === "Standings" && (
          <Card className="overflow-hidden">
            <Table>
              <thead>
                <tr>
                  <Th>#</Th><Th>Team</Th><Th className="text-center">P</Th><Th className="text-center">W</Th>
                  <Th className="text-center">D</Th><Th className="text-center">L</Th>
                  <Th className="text-center">GD</Th><Th className="text-center font-bold">Pts</Th><Th>Form</Th>
                </tr>
              </thead>
              <tbody>
                {standings.map(row => (
                  <Tr key={row.pos}>
                    <Td className="text-muted-foreground font-mono text-xs">{row.pos}</Td>
                    <Td><div className="flex items-center gap-2"><Avatar initials={row.team.slice(0,2)} size="sm" /><span className="font-medium">{row.team}</span></div></Td>
                    <Td className="text-center font-mono text-xs">{row.played}</Td>
                    <Td className="text-center font-mono text-xs">{row.won}</Td>
                    <Td className="text-center font-mono text-xs">{row.drawn}</Td>
                    <Td className="text-center font-mono text-xs">{row.lost}</Td>
                    <Td className="text-center font-mono text-xs">{row.gd > 0 ? `+${row.gd}` : row.gd}</Td>
                    <Td className="text-center font-mono font-bold">{row.points}</Td>
                    <Td><div className="flex items-center gap-0.5">{row.form.map((r,i) => <FormBadge key={i} result={r} />)}</div></Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          </Card>
        )}
        {tab !== "Standings" && (
          <Card className="p-8 text-center"><p className="text-muted-foreground text-sm">{tab} for {season.name}</p></Card>
        )}
      </div>
    );
  }

  const filtered = seasons.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.competition.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <PageHeader title="Seasons" subtitle="Manage competition seasons"
        actions={<Button variant="primary">+ New Season</Button>}
      />
      <div className="flex items-center gap-2">
        <Input placeholder="Search seasons…" value={search} onChange={e => setSearch(e.target.value)} className="max-w-xs" />
      </div>
      <Card className="overflow-hidden">
        <Table>
          <thead>
            <tr>
              <Th>Season</Th><Th>Competition</Th><Th>Status</Th>
              <Th className="text-center">Matches</Th><Th className="text-center">Teams</Th>
              <Th>Period</Th><Th></Th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <Tr key={s.id} onClick={() => setSelected(s.id)}>
                <Td><span className="font-semibold font-mono">{s.name}</span></Td>
                <Td className="text-sm">{s.competition}</Td>
                <Td><Badge variant={s.isCurrent ? "success" : "muted"}>{s.status}</Badge></Td>
                <Td className="text-center font-mono text-xs">{s.matches}</Td>
                <Td className="text-center font-mono text-xs">{s.teams}</Td>
                <Td className="text-xs text-muted-foreground font-mono">{s.startDate} → {s.endDate}</Td>
                <Td><Button variant="ghost" className="text-xs">View →</Button></Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}
