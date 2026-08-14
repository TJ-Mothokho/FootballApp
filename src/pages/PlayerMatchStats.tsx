import { useState } from "react";
import { Card, Button, Select, FormSection, StatInput, Textarea, Toast, PageHeader, Input } from "../components/ui";
import { matches, players, teams } from "../data/mockData";

const defaultStats = {
  // General
  minutesPlayed: "", rating: "",
  started: true, isCaptain: false, isManOfTheMatch: false, wasSubstitutedOn: false, wasSubstitutedOff: false,
  // Attack
  goals: "", shots: "", shotsOnTarget: "", xG: "", chancesCreated: "", assists: "",
  // Passing
  passesCompleted: "", passesAttempted: "", keyPasses: "", crossesCompleted: "", longBalls: "",
  // Defending
  tackles: "", interceptions: "", clearances: "", blocks: "",
  // Duels
  groundDuelsWon: "", groundDuelsTotal: "", aerialDuelsWon: "", aerialDuelsTotal: "",
  // Discipline
  foulsCommitted: "", foulsSuffered: "", yellowCards: "", redCards: "",
  // GK only
  gkSaves: "", gkGoalsConceded: "", gkXGOT: "", gkHighClaims: "", gkSweeper: "",
  // Analysis
  analystNotes: "", performanceSummary: "",
};

const allPlayers = players;
const TOTAL = allPlayers.length;

export default function PlayerMatchStats({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [stats, setStats] = useState(defaultStats);
  const [matchId, setMatchId] = useState(matches[0].id);
  const [teamId, setTeamId] = useState(teams[0].id);
  const [playerId, setPlayerId] = useState(allPlayers[0].id);
  const [playerIdx, setPlayerIdx] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const s = (field: keyof typeof stats) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setStats(prev => ({ ...prev, [field]: e.target.value }));

  const toggle = (field: "started" | "isCaptain" | "isManOfTheMatch" | "wasSubstitutedOn" | "wasSubstitutedOff") =>
    setStats(prev => ({ ...prev, [field]: !prev[field] }));

  const teamPlayers = allPlayers.filter(p => p.teamId === teamId);
  const currentPlayer = allPlayers.find(p => p.id === playerId) || allPlayers[0];
  const isGK = currentPlayer.position === "Goalkeeper";

  const save = async (next?: boolean) => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 500));
    setSaving(false);
    if (next) {
      const nextIdx = Math.min(playerIdx + 1, teamPlayers.length - 1);
      setPlayerIdx(nextIdx);
      setPlayerId(teamPlayers[nextIdx]?.id || playerId);
      setStats(defaultStats);
      setToast("Saved — next player loaded");
    } else {
      setToast("Player match stats saved");
    }
  };

  const CheckBox = ({ field, label }: { field: "started" | "isCaptain" | "isManOfTheMatch" | "wasSubstitutedOn" | "wasSubstitutedOff"; label: string }) => (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <input type="checkbox" checked={stats[field] as boolean} onChange={() => toggle(field)}
        className="w-4 h-4 rounded border-border text-primary focus:ring-ring" />
      <span className="text-sm text-foreground">{label}</span>
    </label>
  );

  return (
    <div className="min-h-screen">
      {toast && <Toast message={toast} type="success" onClose={() => setToast(null)} />}

      <PageHeader
        title="Player Match Stats"
        subtitle={`Player ${playerIdx + 1} of ${teamPlayers.length}`}
        breadcrumb={["Player Match Stats"]}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="secondary" disabled={playerIdx === 0} onClick={() => {
              const prev = Math.max(0, playerIdx - 1);
              setPlayerIdx(prev); setPlayerId(teamPlayers[prev]?.id || playerId); setStats(defaultStats);
            }}>← Prev</Button>
            <Button variant="secondary" disabled={playerIdx >= teamPlayers.length - 1} onClick={() => {
              const next = Math.min(teamPlayers.length - 1, playerIdx + 1);
              setPlayerIdx(next); setPlayerId(teamPlayers[next]?.id || playerId); setStats(defaultStats);
            }}>Next →</Button>
          </div>
        }
      />

      {/* Progress bar */}
      <div className="mb-5">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
          <span>{currentPlayer.firstName} {currentPlayer.lastName} · {currentPlayer.position}</span>
          <span>{playerIdx + 1} / {teamPlayers.length}</span>
        </div>
        <div className="h-1 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary transition-all" style={{ width: `${((playerIdx + 1) / teamPlayers.length) * 100}%` }} />
        </div>
      </div>

      {/* Context */}
      <Card className="p-4 mb-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Select label="Match" value={matchId} onChange={e => setMatchId(e.target.value)}>
            {matches.map(m => <option key={m.id} value={m.id}>{m.homeTeam} vs {m.awayTeam} ({m.date})</option>)}
          </Select>
          <Select label="Team" value={teamId} onChange={e => { setTeamId(e.target.value); setPlayerIdx(0); }}>
            {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </Select>
          <Select label="Player" value={playerId} onChange={e => { setPlayerId(e.target.value); }}>
            {teamPlayers.map(p => <option key={p.id} value={p.id}>{p.firstName} {p.lastName} ({p.position})</option>)}
          </Select>
        </div>
      </Card>

      <div className="space-y-4 pb-24">
        {/* Player Status */}
        <FormSection title="Player Status">
          <div className="flex flex-wrap gap-4">
            <CheckBox field="started" label="Started" />
            <CheckBox field="isCaptain" label="Captain" />
            <CheckBox field="isManOfTheMatch" label="Man of the Match" />
            <CheckBox field="wasSubstitutedOn" label="Subbed On" />
            <CheckBox field="wasSubstitutedOff" label="Subbed Off" />
          </div>
        </FormSection>

        {/* General */}
        <FormSection title="General">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-md">
            <StatInput label="Minutes Played" value={stats.minutesPlayed} onChange={s("minutesPlayed")} />
            <StatInput label="Rating (1–10)" value={stats.rating} onChange={s("rating")} step="0.1" max={10} />
          </div>
        </FormSection>

        {/* Attack */}
        <FormSection title="Attack">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            <StatInput label="Goals" value={stats.goals} onChange={s("goals")} />
            <StatInput label="Assists" value={stats.assists} onChange={s("assists")} />
            <StatInput label="Shots" value={stats.shots} onChange={s("shots")} />
            <StatInput label="On Target" value={stats.shotsOnTarget} onChange={s("shotsOnTarget")} />
            <StatInput label="xG" value={stats.xG} onChange={s("xG")} />
            <StatInput label="Chances Created" value={stats.chancesCreated} onChange={s("chancesCreated")} />
          </div>
        </FormSection>

        {/* Passing */}
        <FormSection title="Passing">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatInput label="Passes Completed" value={stats.passesCompleted} onChange={s("passesCompleted")} />
            <StatInput label="Passes Attempted" value={stats.passesAttempted} onChange={s("passesAttempted")} />
            <StatInput label="Key Passes" value={stats.keyPasses} onChange={s("keyPasses")} />
            <StatInput label="Crosses Completed" value={stats.crossesCompleted} onChange={s("crossesCompleted")} />
          </div>
        </FormSection>

        {/* Defending */}
        <FormSection title="Defending">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatInput label="Tackles" value={stats.tackles} onChange={s("tackles")} />
            <StatInput label="Interceptions" value={stats.interceptions} onChange={s("interceptions")} />
            <StatInput label="Clearances" value={stats.clearances} onChange={s("clearances")} />
            <StatInput label="Blocks" value={stats.blocks} onChange={s("blocks")} />
          </div>
        </FormSection>

        {/* Duels */}
        <FormSection title="Duels">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatInput label="Ground Duels Won" value={stats.groundDuelsWon} onChange={s("groundDuelsWon")} />
            <StatInput label="Ground Duels Total" value={stats.groundDuelsTotal} onChange={s("groundDuelsTotal")} />
            <StatInput label="Aerial Duels Won" value={stats.aerialDuelsWon} onChange={s("aerialDuelsWon")} />
            <StatInput label="Aerial Duels Total" value={stats.aerialDuelsTotal} onChange={s("aerialDuelsTotal")} />
          </div>
        </FormSection>

        {/* Discipline */}
        <FormSection title="Discipline">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xs">
            <StatInput label="Fouls Committed" value={stats.foulsCommitted} onChange={s("foulsCommitted")} />
            <StatInput label="Fouls Suffered" value={stats.foulsSuffered} onChange={s("foulsSuffered")} />
            <StatInput label="Yellow Cards" value={stats.yellowCards} onChange={s("yellowCards")} />
            <StatInput label="Red Cards" value={stats.redCards} onChange={s("redCards")} />
          </div>
        </FormSection>

        {/* GK Only */}
        {isGK && (
          <FormSection title="Goalkeeping">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <StatInput label="Saves" value={stats.gkSaves} onChange={s("gkSaves")} />
              <StatInput label="Goals Conceded" value={stats.gkGoalsConceded} onChange={s("gkGoalsConceded")} />
              <StatInput label="xGOT Faced" value={stats.gkXGOT} onChange={s("gkXGOT")} />
              <StatInput label="High Claims" value={stats.gkHighClaims} onChange={s("gkHighClaims")} />
              <StatInput label="Acted as Sweeper" value={stats.gkSweeper} onChange={s("gkSweeper")} />
            </div>
          </FormSection>
        )}

        {/* Analyst Notes */}
        <FormSection title="Analyst Notes">
          <div className="space-y-3">
            <Textarea label="Performance Summary" value={stats.performanceSummary} onChange={s("performanceSummary")}
              placeholder="Overall performance assessment, key contributions, tactical role…" rows={4} />
            <Textarea label="Analyst Notes" value={stats.analystNotes} onChange={s("analystNotes")}
              placeholder="Observations, positional notes, development areas…" rows={3} />
          </div>
        </FormSection>
      </div>

      {/* Sticky action bar */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-card/90 backdrop-blur-sm px-6 py-3 flex items-center justify-between z-40">
        <div className="text-xs text-muted-foreground">
          Player <span className="font-semibold text-foreground">{playerIdx + 1}</span> of <span className="font-semibold text-foreground">{teamPlayers.length}</span>
          {" · "}{currentPlayer.firstName} {currentPlayer.lastName} · {currentPlayer.position}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => onNavigate("matches")}>Cancel</Button>
          <Button variant="secondary" onClick={() => save(true)} disabled={saving || playerIdx >= teamPlayers.length - 1}>
            Save &amp; Next Player
          </Button>
          <Button variant="primary" onClick={() => save(false)} disabled={saving}>
            {saving ? "Saving…" : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}
