import { useState } from "react";
import { Card, Badge, Button, Table, Th, Td, Tr, Tabs, PageHeader, StatCard, Avatar, Input } from "../components/ui";
import { competitions, standings } from "../data/mockData";
import { FormBadge } from "../components/ui";

export default function Competitions({ onNavigate }: { onNavigate: (page: string, id?: string) => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [tab, setTab] = useState("Overview");
  const [search, setSearch] = useState("");

  if (selected) {
    const comp = competitions.find(c => c.id === selected)!;
    return (
      <div className="space-y-6">
        <PageHeader
          title={comp.name}
          subtitle={`${comp.country} • ${comp.currentSeason}`}
          breadcrumb={["Competitions", comp.name]}
          actions={
            <>
              <Button variant="secondary" onClick={() => setSelected(null)}>← Back</Button>
              <Button variant="primary">Edit</Button>
            </>
          }
        />
        {/* Header stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard label="Teams" value={comp.teams} />
          <StatCard label="Matches" value={comp.matches} />
          <StatCard label="Current Season" value={comp.currentSeason} />
          <StatCard label="Status" value={comp.status} />
        </div>
        <Tabs tabs={["Overview", "Standings", "Fixtures", "Results", "Statistics", "Top Scorers"]} active={tab} onChange={setTab} />
        {tab === "Overview" && (
          <Card className="p-5">
            <p className="text-sm text-muted-foreground">Overview for <strong className="text-foreground">{comp.name}</strong> — {comp.currentSeason}. This is the premier football competition in {comp.country}.</p>
          </Card>
        )}
        {tab === "Standings" && (
          <Card className="overflow-hidden">
            <Table>
              <thead>
                <tr>
                  <Th>#</Th><Th>Team</Th><Th className="text-center">P</Th><Th className="text-center">W</Th>
                  <Th className="text-center">D</Th><Th className="text-center">L</Th><Th className="text-center">GD</Th>
                  <Th className="text-center font-bold">Pts</Th><Th>Form</Th>
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
        {(tab === "Fixtures" || tab === "Results" || tab === "Statistics" || tab === "Top Scorers") && (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground text-sm">{tab} data for {comp.name}</p>
          </Card>
        )}
      </div>
    );
  }

  const filtered = competitions.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <PageHeader
        title="Competitions"
        subtitle="Manage and view all competitions"
        actions={<Button variant="primary" onClick={() => {}}>+ New Competition</Button>}
      />
      <div className="flex items-center gap-2">
        <Input placeholder="Search competitions…" value={search} onChange={e => setSearch(e.target.value)} className="max-w-xs" />
      </div>
      <Card className="overflow-hidden">
        <Table>
          <thead>
            <tr>
              <Th>Competition</Th>
              <Th>Country</Th>
              <Th>Current Season</Th>
              <Th className="text-center">Teams</Th>
              <Th className="text-center">Matches</Th>
              <Th>Status</Th>
              <Th></Th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <Tr key={c.id} onClick={() => setSelected(c.id)}>
                <Td><div className="flex items-center gap-2"><Avatar initials={c.name.slice(0,2)} size="sm" /><span className="font-medium">{c.name}</span></div></Td>
                <Td className="text-muted-foreground text-xs">{c.country}</Td>
                <Td className="font-mono text-xs">{c.currentSeason}</Td>
                <Td className="text-center font-mono text-xs">{c.teams}</Td>
                <Td className="text-center font-mono text-xs">{c.matches}</Td>
                <Td><Badge variant={c.status === "Active" ? "success" : "muted"}>{c.status}</Badge></Td>
                <Td><Button variant="ghost" className="text-xs">View →</Button></Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}
