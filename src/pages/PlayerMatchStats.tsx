import { useState, useEffect } from "react";
import { Card, Button, Select, FormSection, StatInput, Textarea, Toast, PageHeader } from "../components/ui";
import { useQuery } from "../hooks/useApi";
import {
  fetchMatches, fetchTeamPlayers, fetchPlayerMatchStats, createPlayerMatchStats, updatePlayerMatchStats, deletePlayerMatchStats, n
} from "../services/api";
import type { MatchView, PlayerView } from "../services/api";
import type { GetPlayerMatchStatsDTO } from "../imports";

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

export default function PlayerMatchStats({ onNavigate, initialMatchId }: { onNavigate: (page: string, id?: string) => void; initialMatchId?: string }) {
  const [stats, setStats] = useState(defaultStats);
  const [matchId, setMatchId] = useState(initialMatchId ?? "");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [teamId, setTeamId] = useState("");
  const [playerId, setPlayerId] = useState("");
  const [playerIdx, setPlayerIdx] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [saving, setSaving] = useState(false);

  const { data: matches, loading: matchesLoading } = useQuery(fetchMatches);
  const entries = useQuery(fetchPlayerMatchStats);
  const { data: teamPlayers, loading: playersLoading } = useQuery(
    () => teamId ? fetchTeamPlayers(teamId) : Promise.resolve([]),
    [teamId]
  );

  useEffect(() => {
    if (teamPlayers && teamPlayers.length > 0 && !teamPlayers.some(player => player.id === playerId)) {
      setPlayerId(teamPlayers[0].id);
      setPlayerIdx(0);
    }
  }, [teamPlayers, playerId]);

  const s = (field: keyof typeof stats) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setStats(prev => ({ ...prev, [field]: e.target.value }));

  const toggle = (field: "started" | "isCaptain" | "isManOfTheMatch" | "wasSubstitutedOn" | "wasSubstitutedOff") =>
    setStats(prev => ({ ...prev, [field]: !prev[field] }));

  const selectedMatch = (matches ?? []).find((match: MatchView) => match.id === matchId);
  const matchTeams = selectedMatch ? [
    { id: selectedMatch.homeTeamId, name: selectedMatch.homeTeam, isHome: true },
    { id: selectedMatch.awayTeamId, name: selectedMatch.awayTeam, isHome: false },
  ].filter(team => team.id) : [];
  const currentEntries = (entries.data ?? []).filter((entry: GetPlayerMatchStatsDTO) => entry.match?.id === matchId);
  const currentPlayer = (teamPlayers ?? []).find((p: PlayerView) => p.id === playerId) || (teamPlayers ?? [])[0];
  const isGK = currentPlayer?.position === "Goalkeeper";

  useEffect(() => {
    if (initialMatchId) setMatchId(initialMatchId);
  }, [initialMatchId]);

  useEffect(() => {
    if (!selectedMatch || editingId) return;
    if (!matchTeams.some(team => team.id === teamId)) {
      setTeamId(selectedMatch.homeTeamId);
      setPlayerId("");
      setPlayerIdx(0);
    }
  }, [selectedMatch, teamId, editingId]);

  const chooseMatch = (id: string) => {
    setMatchId(id);
    setTeamId("");
    setPlayerId("");
    setPlayerIdx(0);
    setEditingId(null);
  };

  const chooseTeam = (id: string) => {
    setTeamId(id);
    setPlayerId("");
    setPlayerIdx(0);
  };

  const editEntry = (entry: GetPlayerMatchStatsDTO) => {
    setEditingId(entry.id);
    setMatchId(entry.match.id);
    setTeamId(entry.team.id);
    setPlayerId(entry.player.id);
    setPlayerIdx(0);
    const general = entry.playerStats ?? {};
    const attack = entry.playerAttack ?? {};
    const passes = entry.playerPasses ?? {};
    const defence = entry.playerDefence ?? {};
    const duels = entry.playerDuels ?? {};
    const discipline = entry.playerDiscipline ?? {};
    const goalkeepering = entry.goalkeepering ?? {};
    setStats({
      minutesPlayed: String(n(general.minutesPlayed)), fotmobRating: String(n(general.fotmobRating)), sofascoreRating: String(n(general.sofascoreRating)),
      started: entry.started, isCaptain: entry.isCaptain, isManOfTheMatch: entry.isManOfTheMatch, wasSubstitutedOn: entry.wasSubstitutedOn, wasSubstitutedOff: entry.wasSubstitutedOff,
      goals: String(n(attack.goals)), shots: String(n(attack.totalShots)), shotsOnTarget: String(n(attack.shotsOnTarget)), xG: String(n(attack.xg)), xGOT: String(n(attack.xgot)), chancesCreated: String(n(passes.chancesCreated)), assists: String(n(passes.assists)), xa: String(n(passes.xa)),
      touches: String(n(passes.touches)), passesCompleted: String(n(passes.accuratePasses)), passesAttempted: String(n(passes.passesAttempted)), keyPasses: "", crossesCompleted: String(n(passes.accurateCrosses)), crossesAttempted: String(n(passes.crossesAttempted)), longBalls: String(n(passes.accurateLongBalls)), longBallsAttempted: String(n(passes.longBallsAttempted)),
      defensiveContributions: String(n(defence.defensiveContributions)), tackles: String(n(defence.tackles)), interceptions: String(n(defence.interceptions)), clearances: String(n(defence.clearance)), blocks: String(n(defence.blocks)), recoveries: String(n(defence.recoveries)), headedClearances: String(n(defence.headedClearances)), dribbledPast: String(n(defence.dribbledPast)),
      duelsWon: String(n(duels.duelsWon)), duelsLost: String(n(duels.duelsLost)), groundDuelsWon: String(n(duels.groundDuelsWon)), totalGroundDuels: String(n(duels.totalGroundDuels)), aerialDuelsWon: String(n(duels.aerialDuelsWon)), totalAerialDuels: String(n(duels.totalAerialDuels)),
      foulsCommitted: String(n(discipline.foulsCommitted)), foulsSuffered: String(n(discipline.wasFouled)), yellowCards: String(n(discipline.yellowCards)), redCards: String(n(discipline.redCards)),
      gkSaves: String(n(goalkeepering.saves)), gkGoalsConceded: String(n(goalkeepering.goalsConceded)), gkXGOT: String(n(goalkeepering.facedxGOT)), gkHighClaims: String(n(goalkeepering.highClaim)), gkSweeper: String(n(goalkeepering.actedAsSweeper)), gkGoalsPrevented: String(n(goalkeepering.goalsPrevented)),
      gkLongBalls: String(n(goalkeepering.longBalls)), gkAccurateLongBalls: String(n(goalkeepering.accurateLongBalls)), gkPasses: String(n(goalkeepering.passes)), gkAccuratePasses: String(n(goalkeepering.accuratePasses)),
      performanceSummary: entry.analysis?.performanceSummary ?? "", analystNotes: entry.analysis?.analystNotes ?? "",
    });
  };

  const removeEntry = async (id: string) => {
    setSaving(true);
    try {
      await deletePlayerMatchStats(id);
      entries.refetch();
      if (editingId === id) { setEditingId(null); setStats(defaultStats); }
      setToastType("success");
      setToast("Player match stats deleted successfully");
    } catch (error) {
      setToastType("error");
      setToast(error instanceof Error ? error.message : "Delete failed");
    } finally {
      setSaving(false);
      setDeletingId(null);
    }
  };

  const save = async (next?: boolean) => {
    if (!matchId || !teamId || !playerId) {
      setToastType("error");
      setToast("Please select match, team, and player");
      return;
    }
    setSaving(true);
    try {
      const payload = {
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
      };
      if (editingId) {
        await updatePlayerMatchStats(editingId, {
          started: payload.started, wasSubstitutedOn: payload.wasSubstitutedOn, wasSubstitutedOff: payload.wasSubstitutedOff,
          isCaptain: payload.isCaptain, isManOfTheMatch: payload.isManOfTheMatch, analysis: payload.analysis,
          playerStats: payload.playerStats, playerAttack: payload.playerAttack, playerPasses: payload.playerPasses,
          playerDefence: payload.playerDefence, playerDuels: payload.playerDuels, goalkeepering: payload.goalkeepering,
          playerDiscipline: payload.playerDiscipline,
        });
      } else {
        await createPlayerMatchStats(payload);
      }
      entries.refetch();
      setToastType("success");
      if (editingId) {
        setEditingId(null);
        setStats(defaultStats);
        setToast("Player match stats updated successfully");
      } else if (next && teamPlayers && playerIdx < teamPlayers.length - 1) {
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
          <Select label="Match" value={matchId} onChange={e => chooseMatch(e.target.value)} disabled={matchesLoading}>
            <option value="">— Select Match —</option>
            {(matches ?? []).map((m: MatchView) => (
              <option key={m.id} value={m.id}>{m.homeTeam} vs {m.awayTeam} ({m.date})</option>
            ))}
          </Select>
          <Select label="Team" value={teamId} onChange={e => chooseTeam(e.target.value)} disabled={!selectedMatch}>
            <option value="">— Select a Match First —</option>
            {matchTeams.map(team => <option key={team.id} value={team.id}>{team.name} ({team.isHome ? "Home" : "Away"})</option>)}
          </Select>
          <Select label="Player" value={playerId} onChange={e => setPlayerId(e.target.value)} disabled={playersLoading || !teamId}>
            <option value="">— Select Player —</option>
            {(teamPlayers ?? []).map((p: PlayerView) => (
              <option key={p.id} value={p.id}>{p.firstName} {p.lastName} ({p.position})</option>
            ))}
          </Select>
        </div>
      </Card>

      {selectedMatch && !entries.loading && currentEntries.length > 0 && (
        <Card className="p-4 mb-5">
          <p className="text-sm font-semibold text-foreground">Existing Player Entries</p>
          <p className="mt-1 text-xs text-muted-foreground">Manage the records already attached to this match before adding a replacement.</p>
          <div className="mt-3 flex flex-wrap gap-2">{currentEntries.map((entry: GetPlayerMatchStatsDTO) => <div key={entry.id} className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm"><span className="font-medium text-foreground">{entry.player.firstName} {entry.player.lastName}</span><span className="text-xs text-muted-foreground">{entry.team.name}</span><Button variant="ghost" className="text-xs" onClick={() => editEntry(entry)}>Edit</Button><Button variant="danger" className="text-xs" onClick={() => setDeletingId(entry.id)}>Delete</Button></div>)}</div>
        </Card>
      )}
      {deletingId && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/30 p-4"><Card className="w-full max-w-sm p-5 shadow-xl"><h2 className="font-semibold text-foreground">Delete player stats?</h2><p className="mt-2 text-sm text-muted-foreground">This player match statistics record will be permanently removed.</p><div className="mt-5 flex justify-end gap-2"><Button variant="secondary" onClick={() => setDeletingId(null)} disabled={saving}>Cancel</Button><Button variant="danger" onClick={() => removeEntry(deletingId)} disabled={saving}>{saving ? "Deleting…" : "Delete"}</Button></div></Card></div>}

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
          <Button variant="secondary" onClick={() => save(true)} disabled={saving || !!editingId || playerIdx >= (teamPlayers?.length ?? 1) - 1}>
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
