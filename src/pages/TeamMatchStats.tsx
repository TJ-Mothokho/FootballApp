import { useEffect, useState } from "react";
import { Card, Button, Select, FormSection, StatInput, Textarea, Toast, PageHeader, Input } from "../components/ui";
import { useQuery } from "../hooks/useApi";
import { fetchMatches, fetchTeamMatchStats, createTeamMatchStats, updateTeamMatchStats, deleteTeamMatchStats, n } from "../services/api";
import type { MatchView } from "../services/api";
import type { GetTeamMatchStatsDTO } from "../imports";

const defaultStats = {
  formation: "4-2-3-1", playingStyle: "Possession",
  goals: "", shotsOnTarget: "", shotsOffTarget: "", blockedShots: "", hitWoodwork: "", totalShots: "",
  xG: "", bigChancesCreated: "", bigChancesMissed: "", corners: "",
  possession: "", touchesInOppBox: "", successfulDribbles: "", dribblesAttempted: "",
  passesCompleted: "", passesAttempted: "", longBallsCompleted: "", crossesCompleted: "",
  tackles: "", interceptions: "", blocks: "", clearances: "", keeperSaves: "",
  foulsCommitted: "", yellowCards: "", redCards: "",
  duelsWon: "", groundDuelsWon: "", aerialDuelsWon: "",
  centerAttack: "", leftAttack: "", rightAttack: "",
  xgot: "",
  tacticalNotes: "", analystNotes: "",
};

const p = (s: string) => s ? parseFloat(s) : undefined;
const i = (s: string) => s ? parseInt(s, 10) : undefined;

export default function TeamMatchStats({ onNavigate, initialMatchId }: { onNavigate: (page: string, id?: string) => void; initialMatchId?: string }) {
  const [stats, setStats] = useState(defaultStats);
  const [matchId, setMatchId] = useState(initialMatchId ?? "");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [teamId, setTeamId] = useState("");
  const [isHome, setIsHome] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [saving, setSaving] = useState(false);

  const { data: matches, loading: matchesLoading } = useQuery(fetchMatches);
  const entries = useQuery(fetchTeamMatchStats);

  const s = (field: keyof typeof stats) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setStats(prev => ({ ...prev, [field]: e.target.value }));

  const save = async (next?: boolean) => {
    if (!matchId || !teamId) {
      setToastType("error");
      setToast("Please select a match and team");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        matchId,
        teamId,
        isHome,
        formation: stats.formation,
        playingStyle: stats.playingStyle,
        matchStats: {
          teamGoals: i(stats.goals) as any,
          oppositionGoals: undefined,
          possession: i(stats.possession) as any,
          corners: i(stats.corners) as any,
          bigChances: i(stats.bigChancesCreated) as any,
          bigChancesMissed: i(stats.bigChancesMissed) as any,
        },
        matchShots: {
          totalShots: i(stats.totalShots) as any,
          shotsOnTarget: i(stats.shotsOnTarget) as any,
          shotsOffTarget: i(stats.shotsOffTarget) as any,
          blockedShots: i(stats.blockedShots) as any,
          hitWoodwork: i(stats.hitWoodwork) as any,
          shotsInsideBox: undefined,
          shotsOutsideBox: undefined,
        },
        matchExpectedGoals: {
          xg: p(stats.xG) as any,
          xgot: p(stats.xgot) as any,
          openPlayXG: undefined,
          setPlayXG: undefined,
          nonPenaltyXG: undefined,
        },
        matchPasses: {
          passes: i(stats.passesCompleted) as any,
          accuratePasses: i(stats.passesCompleted) as any,
          ownHalf: undefined,
          oppositionHalf: undefined,
          accurateLongBalls: i(stats.longBallsCompleted) as any,
          accurateLongBallsPercentage: undefined,
          accurateCrosses: i(stats.crossesCompleted) as any,
          accurateCrossesPercentage: undefined,
          throws: undefined,
          touchesInOppositionBox: i(stats.touchesInOppBox) as any,
          offsides: undefined,
        },
        matchDiscipline: {
          foulsCommitted: i(stats.foulsCommitted) as any,
          yellowCards: i(stats.yellowCards) as any,
          redCards: i(stats.redCards) as any,
        },
        matchDefence: {
          tackles: i(stats.tackles) as any,
          interceptions: i(stats.interceptions) as any,
          blocks: i(stats.blocks) as any,
          clearances: i(stats.clearances) as any,
          keeperSaves: i(stats.keeperSaves) as any,
        },
        matchDuels: {
          duelsWon: i(stats.duelsWon) as any,
          groundDuelsWon: i(stats.groundDuelsWon) as any,
          groundDuelsWonPercentage: undefined,
          aerialDuelsWon: i(stats.aerialDuelsWon) as any,
          aerialDuelsWonPercentage: undefined,
          successfulDribbles: i(stats.successfulDribbles) as any,
          successfulDribblesPercentage: undefined,
        },
        matchAttackingZones: {
          centerAttack: i(stats.centerAttack) as any,
          leftAttack: i(stats.leftAttack) as any,
          rightAttack: i(stats.rightAttack) as any,
        },
        matchAnalysis: (stats.tacticalNotes || stats.analystNotes) ? {
          tacticalNotes: stats.tacticalNotes || undefined,
          analystNotes: stats.analystNotes || undefined,
        } : null,
      };
      if (editingId) {
        await updateTeamMatchStats(editingId, {
          isHome: payload.isHome, formation: payload.formation, playingStyle: payload.playingStyle,
          matchStats: payload.matchStats, matchShots: payload.matchShots, matchExpectedGoals: payload.matchExpectedGoals,
          matchPasses: payload.matchPasses, matchDiscipline: payload.matchDiscipline, matchDefence: payload.matchDefence,
          matchDuels: payload.matchDuels, matchAttackingZones: payload.matchAttackingZones, matchAnalysis: payload.matchAnalysis,
        });
      } else {
        await createTeamMatchStats(payload);
      }
      entries.refetch();
      setToastType("success");
      setToast(editingId ? "Team match stats updated successfully" : next ? "Saved — reset for next team" : "Team match stats saved successfully");
      if (next || editingId) { setStats(defaultStats); setTeamId(""); setEditingId(null); }
    } catch (err) {
      setToastType("error");
      const msg = err instanceof Error ? err.message : "Save failed";
      setToast(`Error: ${msg}`);
    } finally {
      setSaving(false);
    }
  };

  const selectedMatch = (matches ?? []).find((m: MatchView) => m.id === matchId);
  const matchTeams = selectedMatch ? [
    { id: selectedMatch.homeTeamId, name: selectedMatch.homeTeam, isHome: true },
    { id: selectedMatch.awayTeamId, name: selectedMatch.awayTeam, isHome: false },
  ].filter(team => team.id) : [];
  const currentEntries = (entries.data ?? []).filter((entry: GetTeamMatchStatsDTO) => entry.match?.id === matchId);

  useEffect(() => {
    if (initialMatchId) setMatchId(initialMatchId);
  }, [initialMatchId]);

  useEffect(() => {
    if (!selectedMatch || editingId) return;
    const selectedTeam = matchTeams.find(team => team.id === teamId);
    if (!selectedTeam) {
      setTeamId(selectedMatch.homeTeamId);
      setIsHome(true);
    }
  }, [selectedMatch, teamId, editingId]);

  const chooseMatch = (id: string) => {
    setMatchId(id);
    setTeamId("");
    setEditingId(null);
  };

  const chooseTeam = (id: string) => {
    setTeamId(id);
    const matchTeam = matchTeams.find(team => team.id === id);
    if (matchTeam) setIsHome(matchTeam.isHome);
  };

  const editEntry = (entry: GetTeamMatchStatsDTO) => {
    setEditingId(entry.id);
    setMatchId(entry.match.id);
    setTeamId(entry.team.id);
    setIsHome(entry.isHome);
    const statsValue = entry.matchStats ?? {};
    const shots = entry.matchShots ?? {};
    const expected = entry.matchExpectedGoals ?? {};
    const passes = entry.matchPasses ?? {};
    const defence = entry.matchDefence ?? {};
    const duels = entry.matchDuels ?? {};
    const discipline = entry.matchDiscipline ?? {};
    const zones = entry.matchAttackingZones ?? {};
    setStats({
      formation: entry.formation ?? "", playingStyle: entry.playingStyle ?? "",
      goals: String(n(statsValue.teamGoals)), shotsOnTarget: String(n(shots.shotsOnTarget)), shotsOffTarget: String(n(shots.shotsOffTarget)), blockedShots: String(n(shots.blockedShots)), hitWoodwork: String(n(shots.hitWoodwork)), totalShots: String(n(shots.totalShots)),
      xG: String(n(expected.xg)), bigChancesCreated: String(n(statsValue.bigChances)), bigChancesMissed: String(n(statsValue.bigChancesMissed)), corners: String(n(statsValue.corners)),
      possession: String(n(statsValue.possession)), touchesInOppBox: String(n(passes.touchesInOppositionBox)), successfulDribbles: String(n(duels.successfulDribbles)), dribblesAttempted: "",
      passesCompleted: String(n(passes.accuratePasses)), passesAttempted: String(n(passes.passes)), longBallsCompleted: String(n(passes.accurateLongBalls)), crossesCompleted: String(n(passes.accurateCrosses)),
      tackles: String(n(defence.tackles)), interceptions: String(n(defence.interceptions)), blocks: String(n(defence.blocks)), clearances: String(n(defence.clearances)), keeperSaves: String(n(defence.keeperSaves)),
      foulsCommitted: String(n(discipline.foulsCommitted)), yellowCards: String(n(discipline.yellowCards)), redCards: String(n(discipline.redCards)),
      duelsWon: String(n(duels.duelsWon)), groundDuelsWon: String(n(duels.groundDuelsWon)), aerialDuelsWon: String(n(duels.aerialDuelsWon)),
      centerAttack: String(n(zones.centerAttack)), leftAttack: String(n(zones.leftAttack)), rightAttack: String(n(zones.rightAttack)), xgot: String(n(expected.xgot)),
      tacticalNotes: entry.matchAnalysis?.tacticalNotes ?? "", analystNotes: entry.matchAnalysis?.analystNotes ?? "",
    });
  };

  const removeEntry = async (id: string) => {
    setSaving(true);
    try {
      await deleteTeamMatchStats(id);
      setToastType("success");
      setToast("Team match stats deleted successfully");
      if (editingId === id) { setEditingId(null); setStats(defaultStats); }
      entries.refetch();
    } catch (error) {
      setToastType("error");
      setToast(error instanceof Error ? error.message : "Delete failed");
    } finally {
      setSaving(false);
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen">
      {toast && <Toast message={toast} type={toastType} onClose={() => setToast(null)} />}

      <PageHeader
        title="Team Match Stats"
        subtitle="Enter structured team statistics for a match"
        breadcrumb={["Team Match Stats"]}
      />

      {/* Context selector */}
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
          <Input label="Home / Away" value={isHome ? "Home" : "Away"} readOnly />
        </div>
        {selectedMatch && (
          <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
            <span className="font-medium text-foreground">{selectedMatch.homeTeam}</span>
            {" vs "}
            <span className="font-medium text-foreground">{selectedMatch.awayTeam}</span>
            {" · "}{selectedMatch.date}{" · "}{selectedMatch.venue}
          </div>
        )}
      </Card>

      {selectedMatch && !entries.loading && currentEntries.length > 0 && (
        <Card className="p-4 mb-5">
          <div className="flex items-center justify-between gap-3 mb-3"><div><p className="text-sm font-semibold text-foreground">Existing Team Entries</p><p className="text-xs text-muted-foreground">Edit or remove an existing home or away record before entering a replacement.</p></div></div>
          <div className="flex flex-wrap gap-2">{currentEntries.map((entry: GetTeamMatchStatsDTO) => <div key={entry.id} className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm"><span className="font-medium text-foreground">{entry.team.name}</span><span className="text-xs text-muted-foreground">{entry.isHome ? "Home" : "Away"} · {entry.formation}</span><Button variant="ghost" className="text-xs" onClick={() => editEntry(entry)}>Edit</Button><Button variant="danger" className="text-xs" onClick={() => setDeletingId(entry.id)}>Delete</Button></div>)}</div>
        </Card>
      )}
      {deletingId && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/30 p-4"><Card className="w-full max-w-sm p-5 shadow-xl"><h2 className="font-semibold text-foreground">Delete team stats?</h2><p className="mt-2 text-sm text-muted-foreground">This team match statistics record will be permanently removed.</p><div className="mt-5 flex justify-end gap-2"><Button variant="secondary" onClick={() => setDeletingId(null)} disabled={saving}>Cancel</Button><Button variant="danger" onClick={() => removeEntry(deletingId)} disabled={saving}>{saving ? "Deleting…" : "Delete"}</Button></div></Card></div>}

      <div className="space-y-4 pb-24">
        <FormSection title="General">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input label="Formation" value={stats.formation} onChange={s("formation")} placeholder="e.g. 4-2-3-1" />
            <Select label="Playing Style" value={stats.playingStyle} onChange={s("playingStyle")}>
              {["Possession", "Counter Attack", "High Press", "Defensive", "Direct Play"].map(v =>
                <option key={v} value={v}>{v}</option>)}
            </Select>
          </div>
        </FormSection>

        <FormSection title="Attack">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
            <StatInput label="Goals" value={stats.goals} onChange={s("goals")} />
            <StatInput label="Total Shots" value={stats.totalShots} onChange={s("totalShots")} />
            <StatInput label="On Target" value={stats.shotsOnTarget} onChange={s("shotsOnTarget")} />
            <StatInput label="Off Target" value={stats.shotsOffTarget} onChange={s("shotsOffTarget")} />
            <StatInput label="Blocked" value={stats.blockedShots} onChange={s("blockedShots")} />
            <StatInput label="Woodwork" value={stats.hitWoodwork} onChange={s("hitWoodwork")} />
            <StatInput label="xG" value={stats.xG} onChange={s("xG")} />
            <StatInput label="xGOT" value={stats.xgot} onChange={s("xgot")} />
            <StatInput label="Big Chances Created" value={stats.bigChancesCreated} onChange={s("bigChancesCreated")} />
            <StatInput label="Big Chances Missed" value={stats.bigChancesMissed} onChange={s("bigChancesMissed")} />
            <StatInput label="Corners" value={stats.corners} onChange={s("corners")} />
          </div>
        </FormSection>

        <FormSection title="Possession">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatInput label="Possession %" value={stats.possession} onChange={s("possession")} />
            <StatInput label="Touches in Opp Box" value={stats.touchesInOppBox} onChange={s("touchesInOppBox")} />
            <StatInput label="Successful Dribbles" value={stats.successfulDribbles} onChange={s("successfulDribbles")} />
            <StatInput label="Dribbles Attempted" value={stats.dribblesAttempted} onChange={s("dribblesAttempted")} />
          </div>
        </FormSection>

        <FormSection title="Passing">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <StatInput label="Passes Completed" value={stats.passesCompleted} onChange={s("passesCompleted")} />
            <StatInput label="Passes Attempted" value={stats.passesAttempted} onChange={s("passesAttempted")} />
            <StatInput label="Long Balls Completed" value={stats.longBallsCompleted} onChange={s("longBallsCompleted")} />
            <StatInput label="Crosses Completed" value={stats.crossesCompleted} onChange={s("crossesCompleted")} />
          </div>
        </FormSection>

        <FormSection title="Defending">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <StatInput label="Tackles" value={stats.tackles} onChange={s("tackles")} />
            <StatInput label="Interceptions" value={stats.interceptions} onChange={s("interceptions")} />
            <StatInput label="Blocks" value={stats.blocks} onChange={s("blocks")} />
            <StatInput label="Clearances" value={stats.clearances} onChange={s("clearances")} />
            <StatInput label="Keeper Saves" value={stats.keeperSaves} onChange={s("keeperSaves")} />
          </div>
        </FormSection>

        <FormSection title="Duels">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-sm">
            <StatInput label="Duels Won" value={stats.duelsWon} onChange={s("duelsWon")} />
            <StatInput label="Ground Duels Won" value={stats.groundDuelsWon} onChange={s("groundDuelsWon")} />
            <StatInput label="Aerial Duels Won" value={stats.aerialDuelsWon} onChange={s("aerialDuelsWon")} />
          </div>
        </FormSection>

        <FormSection title="Attacking Zones">
          <div className="grid grid-cols-3 gap-3 max-w-xs">
            <StatInput label="Left Attack" value={stats.leftAttack} onChange={s("leftAttack")} />
            <StatInput label="Center Attack" value={stats.centerAttack} onChange={s("centerAttack")} />
            <StatInput label="Right Attack" value={stats.rightAttack} onChange={s("rightAttack")} />
          </div>
        </FormSection>

        <FormSection title="Discipline">
          <div className="grid grid-cols-3 gap-3 max-w-sm">
            <StatInput label="Fouls" value={stats.foulsCommitted} onChange={s("foulsCommitted")} />
            <StatInput label="Yellow Cards" value={stats.yellowCards} onChange={s("yellowCards")} />
            <StatInput label="Red Cards" value={stats.redCards} onChange={s("redCards")} />
          </div>
        </FormSection>

        <FormSection title="Match Analysis">
          <div className="space-y-3">
            <Textarea label="Tactical Notes" value={stats.tacticalNotes} onChange={s("tacticalNotes")}
              placeholder="Tactical notes, formation analysis, key moments…" rows={4} />
            <Textarea label="Analyst Notes" value={stats.analystNotes} onChange={s("analystNotes")}
              placeholder="Additional observations, injuries, substitution notes…" rows={3} />
          </div>
        </FormSection>
      </div>

      {/* Sticky action bar */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-card/90 backdrop-blur-sm px-6 py-3 flex items-center justify-between z-40">
        <div className="text-xs text-muted-foreground">
          {selectedMatch ? `${selectedMatch.homeTeam} vs ${selectedMatch.awayTeam} · ${isHome ? "Home" : "Away"}` : "Select a match to begin"}
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
