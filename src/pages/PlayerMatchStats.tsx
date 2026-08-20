import { useState, useEffect } from "react";
import { Card, Button, Select, FormSection, StatInput, Textarea, Toast, PageHeader } from "../components/ui";
import { useQuery } from "../hooks/useApi";
import {
  fetchMatches, fetchTeams, fetchTeamPlayers, createPlayerMatchStats, n
} from "../services/api";
import type { MatchView, PlayerView } from "../services/api";
import type { GetTeamDTO } from "../imports";

const defaultStats = {
  minutesPlayed: "", fotmobRating: "", sofascoreRating: "",
  started: true, isCaptain: false, isManOfTheMatch: false, wasSubstitutedOn: false, wasSubstitutedOff: false,
  goals: "", shots: "", shotsOnTarget: "", xG: "", xGOT: "", chancesCreated: "", assists: "", xa: "",
  touches: "", passesCompleted: "", passesAttempted: "", keyPasses: "", crossesCompleted: "", crossesAttempted: "", longBalls: "", longBallsAttempted: "",
  defensiveContributions: "", tackles: "", interceptions: "", clearances: "", blocks: "", recoveries: "", headedClearances: "", dribbledPast: "",
  duelsWon: "", duelsLost: "", groundDuelsWon: "", totalGroundDuels: "", aerialDuelsWon: "", totalAerialDuels: "",
  foulsCommitted: "", foulsSuffered: "", yellowCards: "", redCards: "",
  gkSaves: "", gkGoalsConceded: "", gkXGOT: "", gkHighClaims: "", gkSweeper: "", gkGoalsPrevented: "",
  gkLongBalls: "", gkAccurateLongBalls: "", gkPasses: "", gkAccuratePasses: "",
  performanceSummary: "", analystNotes: "",
};

const pf = (s: string) => s ? parseFloat(s) : undefined;
const pi = (s: string) => s ? parseInt(s, 10) : undefined;

export default function PlayerMatchStats({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [stats, setStats] = useState(defaultStats);
  const [matchId, setMatchId] = useState("");
  const [teamId, setTeamId] = useState("");
  const [playerId, setPlayerId] = useState("");
  const [playerIdx, setPlayerIdx] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [saving, setSaving] = useState(false);

  const { data: matches, loading: matchesLoading } = useQuery(fetchMatches);
  const { data: teams, loading: teamsLoading } = useQuery(fetchTeams);
  const { data: teamPlayers, loading: playersLoading } = useQuery(
    () => teamId ? fetchTeamPlayers(teamId) : Promise.resolve([]),
    [teamId]
  );

  useEffect(() => {
    if (teamPlayers && teamPlayers.length > 0) {
      setPlayerId(teamPlayers[0].id);
      setPlayerIdx(0);
    }
  }, [teamPlayers]);

  const s = (field: keyof typeof stats) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setStats(prev => ({ ...prev, [field]: e.target.value }));

  const toggle = (field: "started" | "isCaptain" | "isManOfTheMatch" | "wasSubstitutedOn" | "wasSubstitutedOff") =>
    setStats(prev => ({ ...prev, [field]: !prev[field] }));

  const currentPlayer = (teamPlayers ?? []).find((p: PlayerView) => p.id === playerId) || (teamPlayers ?? [])[0];
  const isGK = currentPlayer?.position === "Goalkeeper";

  const save = async (next?: boolean) => {
    if (!matchId || !teamId || !playerId) {
      setToastType("error");
      setToast("Please select match, team, and player");
      return;
    }
    setSaving(true);
    try {
      await createPlayerMatchStats({
        matchId,
        playerId,
        teamId,
        started: stats.started,
        wasSubstitutedOn: stats.wasSubstitutedOn,
        wasSubstitutedOff: stats.wasSubstitutedOff,
        isCaptain: stats.isCaptain,
        isManOfTheMatch: stats.isManOfTheMatch,
        analysis: (stats.performanceSummary || stats.analystNotes) ? {
          performanceSummary: stats.performanceSummary || undefined,
          analystNotes: stats.analystNotes || undefined,
        } : null,
        playerStats: {
          minutesPlayed: pi(stats.minutesPlayed) as any,
          fotmobRating: pf(stats.fotmobRating) as any,
          sofascoreRating: pf(stats.sofascoreRating) as any,
        },
        playerAttack: {
          goals: pi(stats.goals) as any,
          xg: pf(stats.xG) as any,
          xgot: pf(stats.xGOT) as any,
          totalShots: pi(stats.shots) as any,
          shotsOnTarget: pi(stats.shotsOnTarget) as any,
          touchesInOppositionBox: undefined,
          bigChancesMissed: undefined,
          successfulDribbles: undefined,
          dribblesAttempted: undefined,
        },
        playerPasses: {
          touches: pi(stats.touches) as any,
          accuratePasses: pi(stats.passesCompleted) as any,
          passesAttempted: pi(stats.passesAttempted) as any,
          assists: pi(stats.assists) as any,
          xa: pf(stats.xa) as any,
          chancesCreated: pi(stats.chancesCreated) as any,
          passesIntoFinalThird: undefined,
          accurateCrosses: pi(stats.crossesCompleted) as any,
          crossesAttempted: pi(stats.crossesAttempted) as any,
          accurateLongBalls: pi(stats.longBalls) as any,
          longBallsAttempted: pi(stats.longBallsAttempted) as any,
        },
        playerDefence: {
          defensiveContributions: pi(stats.defensiveContributions) as any,
          tackles: pi(stats.tackles) as any,
          interceptions: pi(stats.interceptions) as any,
          blocks: pi(stats.blocks) as any,
          recoveries: pi(stats.recoveries) as any,
          clearance: pi(stats.clearances) as any,
          headedClearances: pi(stats.headedClearances) as any,
          dribbledPast: pi(stats.dribbledPast) as any,
        },
        playerDuels: {
          duelsWon: pi(stats.duelsWon) as any,
          duelsLost: pi(stats.duelsLost) as any,
          groundDuelsWon: pi(stats.groundDuelsWon) as any,
          totalGroundDuels: pi(stats.totalGroundDuels) as any,
          aerialDuelsWon: pi(stats.aerialDuelsWon) as any,
          totalAerialDuels: pi(stats.totalAerialDuels) as any,
        },
        goalkeepering: {
          saves: pi(stats.gkSaves) as any,
          goalsConceded: pi(stats.gkGoalsConceded) as any,
          facedxGOT: pf(stats.gkXGOT) as any,
          goalsPrevented: pf(stats.gkGoalsPrevented) as any,
          actedAsSweeper: pi(stats.gkSweeper) as any,
          highClaim: pi(stats.gkHighClaims) as any,
          longBalls: pi(stats.gkLongBalls) as any,
          accurateLongBalls: pi(stats.gkAccurateLongBalls) as any,
          passes: pi(stats.gkPasses) as any,
          accuratePasses: pi(stats.gkAccuratePasses) as any,
        },
        playerDiscipline: {
          yellowCards: pi(stats.yellowCards) as any,
          redCards: pi(stats.redCards) as any,
          foulsCommitted: pi(stats.foulsCommitted) as any,
          wasFouled: pi(stats.foulsSuffered) as any,
        },
      });
      setToastType("success");
      if (next && teamPlayers && playerIdx < teamPlayers.length - 1) {
        const nextIdx = playerIdx + 1;
        setPlayerIdx(nextIdx);
        setPlayerId(teamPlayers[nextIdx].id);
        setStats(defaultStats);
        setToast("Saved — next player loaded");
      } else {
        setToast("Player match stats saved");
        if (next) setStats(defaultStats);
      }
    } catch (err) {
      setToastType("error");
      const msg = err instanceof Error ? err.message : "Save failed";
      setToast(`Error: ${msg}`);
    } finally {
      setSaving(false);
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
      {toast && <Toast message={toast} type={toastType} onClose={() => setToast(null)} />}

      <PageHeader
        title="Player Match Stats"
        subtitle={teamPlayers && teamPlayers.length > 0 ? `Player ${playerIdx + 1} of ${teamPlayers.length}` : "Select a team to begin"}
        breadcrumb={["Player Match Stats"]}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="secondary" disabled={playerIdx === 0 || !teamPlayers?.length}
              onClick={() => {
                const prev = Math.max(0, playerIdx - 1);
                setPlayerIdx(prev);
                setPlayerId((teamPlayers ?? [])[prev]?.id ?? "");
                setStats(defaultStats);
              }}>← Prev</Button>
            <Button variant="secondary" disabled={!teamPlayers?.length || playerIdx >= (teamPlayers?.length ?? 0) - 1}
              onClick={() => {
                const next = Math.min((teamPlayers?.length ?? 1) - 1, playerIdx + 1);
                setPlayerIdx(next);
                setPlayerId((teamPlayers ?? [])[next]?.id ?? "");
                setStats(defaultStats);
              }}>Next →</Button>
          </div>
        }
      />

      {/* Progress bar */}
      {teamPlayers && teamPlayers.length > 0 && (
        <div className="mb-5">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
            <span>{currentPlayer?.firstName} {currentPlayer?.lastName} · {currentPlayer?.position}</span>
            <span>{playerIdx + 1} / {teamPlayers.length}</span>
          </div>
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all" style={{ width: `${((playerIdx + 1) / teamPlayers.length) * 100}%` }} />
          </div>
        </div>
      )}

      {/* Context */}
      <Card className="p-4 mb-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Select label="Match" value={matchId} onChange={e => setMatchId(e.target.value)} disabled={matchesLoading}>
            <option value="">— Select Match —</option>
            {(matches ?? []).map((m: MatchView) => (
              <option key={m.id} value={m.id}>{m.homeTeam} vs {m.awayTeam} ({m.date})</option>
            ))}
          </Select>
          <Select label="Team" value={teamId} onChange={e => { setTeamId(e.target.value); setPlayerIdx(0); setPlayerId(""); }} disabled={teamsLoading}>
            <option value="">— Select Team —</option>
            {(teams ?? []).map((t: GetTeamDTO) => <option key={t.id} value={t.id}>{t.name}</option>)}
          </Select>
          <Select label="Player" value={playerId} onChange={e => setPlayerId(e.target.value)} disabled={playersLoading || !teamId}>
            <option value="">— Select Player —</option>
            {(teamPlayers ?? []).map((p: PlayerView) => (
              <option key={p.id} value={p.id}>{p.firstName} {p.lastName} ({p.position})</option>
            ))}
          </Select>
        </div>
      </Card>

      <div className="space-y-4 pb-24">
        <FormSection title="Player Status">
          <div className="flex flex-wrap gap-4">
            <CheckBox field="started" label="Started" />
            <CheckBox field="isCaptain" label="Captain" />
            <CheckBox field="isManOfTheMatch" label="Man of the Match" />
            <CheckBox field="wasSubstitutedOn" label="Subbed On" />
            <CheckBox field="wasSubstitutedOff" label="Subbed Off" />
          </div>
        </FormSection>

        <FormSection title="General">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-sm">
            <StatInput label="Minutes Played" value={stats.minutesPlayed} onChange={s("minutesPlayed")} />
            <StatInput label="Fotmob Rating" value={stats.fotmobRating} onChange={s("fotmobRating")} step="0.1" max={10} />
            <StatInput label="Sofa Rating" value={stats.sofascoreRating} onChange={s("sofascoreRating")} step="0.1" max={10} />
          </div>
        </FormSection>

        <FormSection title="Attack">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            <StatInput label="Goals" value={stats.goals} onChange={s("goals")} />
            <StatInput label="Assists" value={stats.assists} onChange={s("assists")} />
            <StatInput label="Shots" value={stats.shots} onChange={s("shots")} />
            <StatInput label="On Target" value={stats.shotsOnTarget} onChange={s("shotsOnTarget")} />
            <StatInput label="xG" value={stats.xG} onChange={s("xG")} />
            <StatInput label="xGOT" value={stats.xGOT} onChange={s("xGOT")} />
            <StatInput label="xA" value={stats.xa} onChange={s("xa")} />
            <StatInput label="Chances Created" value={stats.chancesCreated} onChange={s("chancesCreated")} />
          </div>
        </FormSection>

        <FormSection title="Passing">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatInput label="Touches" value={stats.touches} onChange={s("touches")} />
            <StatInput label="Passes Completed" value={stats.passesCompleted} onChange={s("passesCompleted")} />
            <StatInput label="Passes Attempted" value={stats.passesAttempted} onChange={s("passesAttempted")} />
            <StatInput label="Crosses Completed" value={stats.crossesCompleted} onChange={s("crossesCompleted")} />
            <StatInput label="Crosses Attempted" value={stats.crossesAttempted} onChange={s("crossesAttempted")} />
            <StatInput label="Long Balls" value={stats.longBalls} onChange={s("longBalls")} />
            <StatInput label="Long Balls Attempted" value={stats.longBallsAttempted} onChange={s("longBallsAttempted")} />
          </div>
        </FormSection>

        <FormSection title="Defending">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatInput label="Defensive Contributions" value={stats.defensiveContributions} onChange={s("defensiveContributions")} />
            <StatInput label="Tackles" value={stats.tackles} onChange={s("tackles")} />
            <StatInput label="Interceptions" value={stats.interceptions} onChange={s("interceptions")} />
            <StatInput label="Clearances" value={stats.clearances} onChange={s("clearances")} />
            <StatInput label="Blocks" value={stats.blocks} onChange={s("blocks")} />
            <StatInput label="Recoveries" value={stats.recoveries} onChange={s("recoveries")} />
            <StatInput label="Headed Clearances" value={stats.headedClearances} onChange={s("headedClearances")} />
            <StatInput label="Dribbled Past" value={stats.dribbledPast} onChange={s("dribbledPast")} />
          </div>
        </FormSection>

        <FormSection title="Duels">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatInput label="Duels Won" value={stats.duelsWon} onChange={s("duelsWon")} />
            <StatInput label="Duels Lost" value={stats.duelsLost} onChange={s("duelsLost")} />
            <StatInput label="Ground Duels Won" value={stats.groundDuelsWon} onChange={s("groundDuelsWon")} />
            <StatInput label="Ground Duels Total" value={stats.totalGroundDuels} onChange={s("totalGroundDuels")} />
            <StatInput label="Aerial Duels Won" value={stats.aerialDuelsWon} onChange={s("aerialDuelsWon")} />
            <StatInput label="Aerial Duels Total" value={stats.totalAerialDuels} onChange={s("totalAerialDuels")} />
          </div>
        </FormSection>

        <FormSection title="Discipline">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xs">
            <StatInput label="Fouls Committed" value={stats.foulsCommitted} onChange={s("foulsCommitted")} />
            <StatInput label="Fouls Suffered" value={stats.foulsSuffered} onChange={s("foulsSuffered")} />
            <StatInput label="Yellow Cards" value={stats.yellowCards} onChange={s("yellowCards")} />
            <StatInput label="Red Cards" value={stats.redCards} onChange={s("redCards")} />
          </div>
        </FormSection>

        {isGK && (
          <FormSection title="Goalkeeping">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <StatInput label="Saves" value={stats.gkSaves} onChange={s("gkSaves")} />
              <StatInput label="Goals Conceded" value={stats.gkGoalsConceded} onChange={s("gkGoalsConceded")} />
              <StatInput label="xGOT Faced" value={stats.gkXGOT} onChange={s("gkXGOT")} />
              <StatInput label="Goals Prevented" value={stats.gkGoalsPrevented} onChange={s("gkGoalsPrevented")} />
              <StatInput label="High Claims" value={stats.gkHighClaims} onChange={s("gkHighClaims")} />
              <StatInput label="Acted as Sweeper" value={stats.gkSweeper} onChange={s("gkSweeper")} />
              <StatInput label="Long Balls" value={stats.gkLongBalls} onChange={s("gkLongBalls")} />
              <StatInput label="Accurate Long Balls" value={stats.gkAccurateLongBalls} onChange={s("gkAccurateLongBalls")} />
              <StatInput label="Passes" value={stats.gkPasses} onChange={s("gkPasses")} />
              <StatInput label="Accurate Passes" value={stats.gkAccuratePasses} onChange={s("gkAccuratePasses")} />
            </div>
          </FormSection>
        )}

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
          {currentPlayer
            ? <>Player <span className="font-semibold text-foreground">{playerIdx + 1}</span> of <span className="font-semibold text-foreground">{(teamPlayers ?? []).length}</span> · {currentPlayer.firstName} {currentPlayer.lastName} · {currentPlayer.position}</>
            : "Select a match, team, and player"}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={() => onNavigate("matches")}>Cancel</Button>
          <Button variant="secondary" onClick={() => save(true)} disabled={saving || playerIdx >= (teamPlayers?.length ?? 1) - 1}>
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
