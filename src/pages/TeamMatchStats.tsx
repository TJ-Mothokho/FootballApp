import { useState } from "react";
import { Card, Button, Select, FormSection, StatInput, Textarea, Toast, PageHeader, Input } from "../components/ui";
import { matches, teams } from "../data/mockData";

const defaultStats = {
  // General
  formation: "4-2-3-1", playingStyle: "Possession",
  // Attack
  goals: "", shots: "", shotsOnTarget: "", shotsOffTarget: "", blockedShots: "", hitWoodwork: "",
  xG: "", bigChancesCreated: "", bigChancesMissed: "", corners: "",
  // Possession
  possession: "", touchesInOppBox: "", successfulDribbles: "", dribblesAttempted: "",
  // Passing
  passesCompleted: "", passesAttempted: "", longBallsCompleted: "", crossesCompleted: "",
  // Defending
  tackles: "", interceptions: "", blocks: "", clearances: "",
  // Discipline
  foulsCommitted: "", yellowCards: "", redCards: "",
  // GK
  saves: "", goalsConceded: "", highClaims: "", actedAsSweeper: "",
  // Analysis
  matchNotes: "", tacticalSummary: "",
};

export default function TeamMatchStats({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [stats, setStats] = useState(defaultStats);
  const [matchId, setMatchId] = useState(matches[0].id);
  const [teamId, setTeamId] = useState(teams[0].id);
  const [isHome, setIsHome] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const s = (field: keyof typeof stats) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setStats(prev => ({ ...prev, [field]: e.target.value }));

  const save = async (next?: boolean) => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 600));
    setSaving(false);
    setToast(next ? "Saved — moving to next team" : "Team match stats saved successfully");
    if (next) setStats(defaultStats);
  };

  const selectedMatch = matches.find(m => m.id === matchId)!;

  return (
    <div className="min-h-screen">
      {toast && <Toast message={toast} type="success" onClose={() => setToast(null)} />}

      <PageHeader
        title="Team Match Stats"
        subtitle="Enter structured team statistics for a match"
        breadcrumb={["Team Match Stats"]}
      />

      {/* Context selector */}
      <Card className="p-4 mb-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Select label="Match" value={matchId} onChange={e => setMatchId(e.target.value)}>
            {matches.map(m => (
              <option key={m.id} value={m.id}>{m.homeTeam} vs {m.awayTeam} ({m.date})</option>
            ))}
          </Select>
          <Select label="Team" value={teamId} onChange={e => setTeamId(e.target.value)}>
            {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </Select>
          <Select label="Home / Away" value={isHome ? "home" : "away"} onChange={e => setIsHome(e.target.value === "home")}>
            <option value="home">Home</option>
            <option value="away">Away</option>
          </Select>
        </div>
        <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
          <span className="font-medium text-foreground">{selectedMatch.homeTeam}</span> vs <span className="font-medium text-foreground">{selectedMatch.awayTeam}</span>
          {" · "}{selectedMatch.date}{" · "}{selectedMatch.venue}
        </div>
      </Card>

      <div className="space-y-4 pb-24">
        {/* General */}
        <FormSection title="General">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input label="Formation" value={stats.formation} onChange={s("formation")} placeholder="e.g. 4-2-3-1" />
            <Select label="Playing Style" value={stats.playingStyle} onChange={s("playingStyle")}>
              {["Possession", "Counter Attack", "High Press", "Defensive", "Direct Play"].map(v =>
                <option key={v} value={v}>{v}</option>)}
            </Select>
          </div>
        </FormSection>

        {/* Attack */}
        <FormSection title="Attack">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
            <StatInput label="Goals" value={stats.goals} onChange={s("goals")} />
            <StatInput label="Shots" value={stats.shots} onChange={s("shots")} />
            <StatInput label="On Target" value={stats.shotsOnTarget} onChange={s("shotsOnTarget")} />
            <StatInput label="Off Target" value={stats.shotsOffTarget} onChange={s("shotsOffTarget")} />
            <StatInput label="Blocked" value={stats.blockedShots} onChange={s("blockedShots")} />
            <StatInput label="Woodwork" value={stats.hitWoodwork} onChange={s("hitWoodwork")} />
            <StatInput label="xG" value={stats.xG} onChange={s("xG")} />
            <StatInput label="Big Chances Created" value={stats.bigChancesCreated} onChange={s("bigChancesCreated")} />
            <StatInput label="Big Chances Missed" value={stats.bigChancesMissed} onChange={s("bigChancesMissed")} />
            <StatInput label="Corners" value={stats.corners} onChange={s("corners")} />
          </div>
        </FormSection>

        {/* Possession */}
        <FormSection title="Possession">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatInput label="Possession %" value={stats.possession} onChange={s("possession")} />
            <StatInput label="Touches in Opp Box" value={stats.touchesInOppBox} onChange={s("touchesInOppBox")} />
            <StatInput label="Successful Dribbles" value={stats.successfulDribbles} onChange={s("successfulDribbles")} />
            <StatInput label="Dribbles Attempted" value={stats.dribblesAttempted} onChange={s("dribblesAttempted")} />
          </div>
        </FormSection>

        {/* Passing */}
        <FormSection title="Passing">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatInput label="Passes Completed" value={stats.passesCompleted} onChange={s("passesCompleted")} />
            <StatInput label="Passes Attempted" value={stats.passesAttempted} onChange={s("passesAttempted")} />
            <StatInput label="Long Balls Completed" value={stats.longBallsCompleted} onChange={s("longBallsCompleted")} />
            <StatInput label="Crosses Completed" value={stats.crossesCompleted} onChange={s("crossesCompleted")} />
          </div>
        </FormSection>

        {/* Defending */}
        <FormSection title="Defending">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatInput label="Tackles" value={stats.tackles} onChange={s("tackles")} />
            <StatInput label="Interceptions" value={stats.interceptions} onChange={s("interceptions")} />
            <StatInput label="Blocks" value={stats.blocks} onChange={s("blocks")} />
            <StatInput label="Clearances" value={stats.clearances} onChange={s("clearances")} />
          </div>
        </FormSection>

        {/* Discipline */}
        <FormSection title="Discipline">
          <div className="grid grid-cols-3 gap-3 max-w-sm">
            <StatInput label="Fouls" value={stats.foulsCommitted} onChange={s("foulsCommitted")} />
            <StatInput label="Yellow Cards" value={stats.yellowCards} onChange={s("yellowCards")} />
            <StatInput label="Red Cards" value={stats.redCards} onChange={s("redCards")} />
          </div>
        </FormSection>

        {/* Goalkeeping */}
        <FormSection title="Goalkeeping">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatInput label="Saves" value={stats.saves} onChange={s("saves")} />
            <StatInput label="Goals Conceded" value={stats.goalsConceded} onChange={s("goalsConceded")} />
            <StatInput label="High Claims" value={stats.highClaims} onChange={s("highClaims")} />
            <StatInput label="Acted as Sweeper" value={stats.actedAsSweeper} onChange={s("actedAsSweeper")} />
          </div>
        </FormSection>

        {/* Match Analysis */}
        <FormSection title="Match Analysis">
          <div className="space-y-3">
            <Textarea label="Tactical Summary" value={stats.tacticalSummary} onChange={s("tacticalSummary")}
              placeholder="Tactical notes, formation analysis, key moments…" rows={4} />
            <Textarea label="Match Notes" value={stats.matchNotes} onChange={s("matchNotes")}
              placeholder="Additional observations, injuries, substitution notes…" rows={3} />
          </div>
        </FormSection>
      </div>

      {/* Sticky action bar */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-card/90 backdrop-blur-sm px-6 py-3 flex items-center justify-between z-40">
        <div className="text-xs text-muted-foreground">
          {selectedMatch.homeTeam} vs {selectedMatch.awayTeam} · {isHome ? "Home" : "Away"}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => onNavigate("matches")}>Cancel</Button>
          <Button variant="secondary" onClick={() => save(true)} disabled={saving}>Save &amp; Next</Button>
          <Button variant="primary" onClick={() => save(false)} disabled={saving}>
            {saving ? "Saving…" : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
}
