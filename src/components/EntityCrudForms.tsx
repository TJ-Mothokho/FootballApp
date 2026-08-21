import { useState } from "react";
import { Button, Card, Input, Modal, Select } from "./ui";
import {
  createCompetition, updateCompetition, createSeason, updateSeason, createTeam, updateTeam,
  createPlayer, updatePlayer, fetchTeams, type CompetitionView, type SeasonView, type PlayerView,
} from "../services/api";
import { useQuery } from "../hooks/useApi";
import type { GetTeamDTO } from "../imports";

function apiError(error: unknown) {
  return error instanceof Error ? error.message : "The request could not be completed.";
}

function ModalFooter({ formId, saving, label, onClose }: { formId: string; saving: boolean; label: string; onClose: () => void }) {
  return <><Button variant="secondary" onClick={onClose} disabled={saving}>Cancel</Button><Button variant="primary" onClick={() => document.getElementById(formId)?.requestSubmit()} disabled={saving}>{saving ? "Saving…" : label}</Button></>;
}

export function CompetitionEditor({ competition, onClose, onSaved }: { competition?: CompetitionView; onClose: () => void; onSaved: () => void }) {
  const [name, setName] = useState(competition?.name ?? "");
  const [country, setCountry] = useState(competition?.country ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !country.trim()) { setError("Competition name and country are required."); return; }
    setSaving(true); setError(null);
    try {
      if (competition) await updateCompetition(competition.id, { name: name.trim(), country: country.trim() });
      else await createCompetition({ name: name.trim(), country: country.trim() });
      onSaved();
    } catch (err) { setError(apiError(err)); } finally { setSaving(false); }
  };
  return <Modal title={competition ? "Edit Competition" : "New Competition"} onClose={onClose} footer={<ModalFooter formId="competition-editor" saving={saving} label={competition ? "Save Changes" : "Create Competition"} onClose={onClose} />}><form id="competition-editor" onSubmit={save} className="space-y-4">{error && <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}<Input label="Competition Name *" value={name} onChange={event => setName(event.target.value)} placeholder="e.g. Betway Premiership" required /><Input label="Country *" value={country} onChange={event => setCountry(event.target.value)} placeholder="e.g. South Africa" required /></form></Modal>;
}

export function SeasonEditor({ season, onClose, onSaved }: { season?: SeasonView; onClose: () => void; onSaved: () => void }) {
  const [name, setName] = useState(season?.name ?? "");
  const [startDate, setStartDate] = useState(season?.startDate ?? "");
  const [endDate, setEndDate] = useState(season?.endDate ?? "");
  const [isCurrent, setIsCurrent] = useState(season?.isCurrent ?? false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    if ((!season && !name.trim()) || !startDate || !endDate) { setError("Season name, start date, and end date are required."); return; }
    if (endDate < startDate) { setError("End date must be on or after start date."); return; }
    setSaving(true); setError(null);
    try {
      if (season) await updateSeason(season.id, { startDate, endDate, isCurrent });
      else await createSeason({ name: name.trim(), startDate, endDate, isCurrent });
      onSaved();
    } catch (err) { setError(apiError(err)); } finally { setSaving(false); }
  };
  return <Modal title={season ? "Edit Season" : "New Season"} onClose={onClose} footer={<ModalFooter formId="season-editor" saving={saving} label={season ? "Save Changes" : "Create Season"} onClose={onClose} />}><form id="season-editor" onSubmit={save} className="space-y-4">{error && <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}{season ? <Card className="bg-muted/30 p-3 text-sm"><p className="font-medium text-foreground">{season.name}</p><p className="mt-1 text-xs text-muted-foreground">The API update contract does not permit renaming an existing season.</p></Card> : <Input label="Season Name *" value={name} onChange={event => setName(event.target.value)} placeholder="e.g. 2026/2027" required />}<div className="grid grid-cols-1 sm:grid-cols-2 gap-3"><Input label="Start Date *" type="date" value={startDate} onChange={event => setStartDate(event.target.value)} required /><Input label="End Date *" type="date" value={endDate} onChange={event => setEndDate(event.target.value)} required /></div><label className="flex items-center gap-2 text-sm text-foreground"><input type="checkbox" checked={isCurrent} onChange={event => setIsCurrent(event.target.checked)} className="h-4 w-4 rounded border-border text-primary" />Current season</label></form></Modal>;
}

export function TeamEditor({ team, onClose, onSaved }: { team?: GetTeamDTO; onClose: () => void; onSaved: () => void }) {
  const [values, setValues] = useState({ name: team?.name ?? "", shortName: team?.shortName ?? "", stadium: team?.stadium ?? "", city: team?.city ?? "", foundedYear: team ? String(Number(team.foundedYear) || "") : "", coach: team?.coach ?? "", preferredFormation: team?.preferredFormation ?? "", playingStyle: team?.playingStyle ?? "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const set = (field: keyof typeof values, value: string) => setValues(current => ({ ...current, [field]: value }));
  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!values.name.trim() || !values.shortName.trim() || !values.stadium.trim() || !values.city.trim() || !values.foundedYear || !values.coach.trim()) { setError("Name, short name, stadium, city, founded year, and coach are required."); return; }
    setSaving(true); setError(null);
    const dto = { name: values.name.trim(), shortName: values.shortName.trim(), stadium: values.stadium.trim(), city: values.city.trim(), foundedYear: Number(values.foundedYear) as any, coach: values.coach.trim(), captain: team?.captain?.id ?? null, preferredFormation: values.preferredFormation.trim() || null, playingStyle: values.playingStyle.trim() || null };
    try {
      if (team) await updateTeam(team.id, dto); else await createTeam(dto);
      onSaved();
    } catch (err) { setError(apiError(err)); } finally { setSaving(false); }
  };
  return <Modal title={team ? "Edit Team" : "New Team"} onClose={onClose} footer={<ModalFooter formId="team-editor" saving={saving} label={team ? "Save Changes" : "Create Team"} onClose={onClose} />}><form id="team-editor" onSubmit={save} className="space-y-4">{error && <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}<div className="grid grid-cols-1 sm:grid-cols-2 gap-3"><Input label="Team Name *" value={values.name} onChange={event => set("name", event.target.value)} required /><Input label="Short Name *" value={values.shortName} onChange={event => set("shortName", event.target.value)} required /><Input label="Stadium *" value={values.stadium} onChange={event => set("stadium", event.target.value)} required /><Input label="City *" value={values.city} onChange={event => set("city", event.target.value)} required /><Input label="Founded Year *" type="number" min="1800" max="2100" value={values.foundedYear} onChange={event => set("foundedYear", event.target.value)} required /><Input label="Coach *" value={values.coach} onChange={event => set("coach", event.target.value)} required /><Input label="Preferred Formation" value={values.preferredFormation} onChange={event => set("preferredFormation", event.target.value)} placeholder="e.g. 4-2-3-1" /><Input label="Playing Style" value={values.playingStyle} onChange={event => set("playingStyle", event.target.value)} placeholder="e.g. Possession" /></div>{team?.captain && <p className="text-xs text-muted-foreground">The current captain, {team.captain.firstName} {team.captain.lastName}, is preserved. Set captaincy from the player editor if required.</p>}</form></Modal>;
}

export function PlayerEditor({ player, onClose, onSaved }: { player?: PlayerView; onClose: () => void; onSaved: () => void }) {
  const teams = useQuery(fetchTeams);
  const [values, setValues] = useState({ firstName: player?.firstName ?? "", lastName: player?.lastName ?? "", position: player?.position ?? "", alternativePositions: "", shirtNumber: player ? String(player.shirtNumber) : "", dateOfBirth: player?.dateOfBirth?.slice(0, 10) ?? "", national: player?.national ?? "", teamId: player?.teamId ?? "", isActive: player?.isActive ?? true, isCaptain: player?.isCaptain ?? false });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const set = (field: keyof typeof values, value: string | boolean) => setValues(current => ({ ...current, [field]: value }));
  const save = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!values.firstName.trim() || !values.lastName.trim() || !values.position.trim() || !values.shirtNumber) { setError("First name, last name, position, and shirt number are required."); return; }
    if (!player && (!values.dateOfBirth || !values.national.trim())) { setError("Date of birth and nationality are required when creating a player."); return; }
    setSaving(true); setError(null);
    const alternatives = values.alternativePositions.split(",").map(item => item.trim()).filter(Boolean);
    try {
      if (player) await updatePlayer(player.id, { firstName: values.firstName.trim(), lastName: values.lastName.trim(), position: values.position.trim(), alternativePositions: alternatives.length ? alternatives : null, shirtNumber: Number(values.shirtNumber) as any, isCaptain: values.isCaptain, isActive: values.isActive, teamId: values.teamId || null });
      else await createPlayer({ firstName: values.firstName.trim(), lastName: values.lastName.trim(), position: values.position.trim(), alternativePositions: alternatives.length ? alternatives : null, shirtNumber: Number(values.shirtNumber) as any, dateOfBirth: values.dateOfBirth, national: values.national.trim(), isActive: values.isActive, teamId: values.teamId || null, isCaptain: values.isCaptain });
      onSaved();
    } catch (err) { setError(apiError(err)); } finally { setSaving(false); }
  };
  return <Modal title={player ? "Edit Player" : "New Player"} onClose={onClose} footer={<ModalFooter formId="player-editor" saving={saving} label={player ? "Save Changes" : "Create Player"} onClose={onClose} />}><form id="player-editor" onSubmit={save} className="space-y-4">{error && <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}<div className="grid grid-cols-1 sm:grid-cols-2 gap-3"><Input label="First Name *" value={values.firstName} onChange={event => set("firstName", event.target.value)} required /><Input label="Last Name *" value={values.lastName} onChange={event => set("lastName", event.target.value)} required /><Input label="Position *" value={values.position} onChange={event => set("position", event.target.value)} placeholder="e.g. Midfielder" required /><Input label="Alternative Positions" value={values.alternativePositions} onChange={event => set("alternativePositions", event.target.value)} placeholder="Comma-separated" /><Input label="Shirt Number *" type="number" min="1" value={values.shirtNumber} onChange={event => set("shirtNumber", event.target.value)} required /><Select label="Team" value={values.teamId} onChange={event => set("teamId", event.target.value)} disabled={teams.loading}><option value="">— No Team Assigned —</option>{((teams.data ?? []) as GetTeamDTO[]).map(team => <option key={team.id} value={team.id}>{team.name}</option>)}</Select>{player ? <Card className="sm:col-span-2 bg-muted/30 p-3 text-xs text-muted-foreground">Nationality and date of birth are preserved because the API update contract does not expose these fields.</Card> : <><Input label="Date of Birth *" type="date" value={values.dateOfBirth} onChange={event => set("dateOfBirth", event.target.value)} required /><Input label="Nationality *" value={values.national} onChange={event => set("national", event.target.value)} required /></>}</div><div className="flex flex-wrap gap-4"><label className="flex items-center gap-2 text-sm text-foreground"><input type="checkbox" checked={values.isActive} onChange={event => set("isActive", event.target.checked)} className="h-4 w-4 rounded border-border text-primary" />Active</label><label className="flex items-center gap-2 text-sm text-foreground"><input type="checkbox" checked={values.isCaptain} onChange={event => set("isCaptain", event.target.checked)} className="h-4 w-4 rounded border-border text-primary" />Captain</label></div></form></Modal>;
}
