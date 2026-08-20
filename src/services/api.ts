/**
 * Frontend service layer — wraps the generated SDK (src/imports).
 * Each function extracts `.data` from the Axios response and applies
 * any transformations needed to map API types to view-friendly shapes.
 *
 * DO NOT modify src/imports — treat it as read-only.
 */

import {
  CompetitionApi,
  DashboardApi,
  LeaderboardsApi,
  MatchApi,
  PlayerApi,
  PlayerMatchStatsApi,
  SearchApi,
  SeasonApi,
  TeamApi,
  TeamMatchStatsApi,
  type GetMatchDTO,
  type GetPlayerDTO,
  type GetTeamDTO,
  type StandingDTO,
  type PlayerLeaderDTO,
  type GoalsPerRoundDTO,
  type CreateTeamMatchStatsDTO,
  type CreatePlayerMatchStatsDTO,
  type MatchStats,
  type MatchShots,
  type MatchExpectedGoals,
  type MatchPasses,
  type MatchDiscipline,
  type MatchDefence,
  type MatchDuels,
  type MatchAttackingZones,
  type MatchAnalysis,
  type PlayerStats,
  type PlayerAttack,
  type PlayerPasses,
  type PlayerDefence,
  type PlayerDuels,
  type Goalkeepering,
  type PlayerDiscipline,
  type PlayerAnalysis,
} from "../imports";

// Singleton API instances (no configuration needed — BASE_PATH is baked into base.ts)
const competitionApi = new CompetitionApi();
const dashboardApi = new DashboardApi();
const leaderboardsApi = new LeaderboardsApi();
const matchApi = new MatchApi();
const playerApi = new PlayerApi();
const playerMatchStatsApi = new PlayerMatchStatsApi();
const searchApi = new SearchApi();
const seasonApi = new SeasonApi();
const teamApi = new TeamApi();
const teamMatchStatsApi = new TeamMatchStatsApi();

// ---------------------------------------------------------------------------
// Type helpers
// ---------------------------------------------------------------------------

/** Cast the opaque SDK integer wrapper to a plain number. */
export const n = (v: unknown): number => Number(v) || 0;

/** Cast the opaque SDK float wrapper to a plain number. */
export const f = (v: unknown): number => parseFloat(String(v)) || 0;

// ---------------------------------------------------------------------------
// Normalised view-model types (flat shapes consumed by existing page components)
// ---------------------------------------------------------------------------

export interface MatchView {
  id: string;
  date: string;
  kickOff: string;
  homeTeam: string;
  homeTeamId: string;
  awayTeam: string;
  awayTeamId: string;
  homeGoals: number | null;
  awayGoals: number | null;
  venue: string;
  referee: string;
  attendance: number | null;
  status: string;
  competition: string;
  competitionId: string;
  season: string;
  seasonId: string;
  matchweek: string;
}

export interface PlayerView {
  id: string;
  firstName: string;
  lastName: string;
  position: string;
  team: string;
  teamId: string;
  national: string;
  dateOfBirth: string;
  shirtNumber: number;
  isActive: boolean;
  isCaptain: boolean;
  // aggregated season stats — populated separately via statistics endpoint
  matches: number;
  minutes: number;
  goals: number;
  assists: number;
  rating: number;
}

export interface CompetitionView {
  id: string;
  name: string;
  country: string;
  teams: number;
  matches: number;
  status: string;
  currentSeason: string;
}

export interface SeasonView {
  id: string;
  name: string;
  competitionId: string;
  competition: string;
  status: string;
  matches: number;
  teams: number;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
}

export interface StandingView {
  pos: number;
  teamId: string;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
  form: string[];
}

export interface TopPerformerView {
  name: string;
  team: string;
  stat: number;
  rating: number;
  playerId: string;
}

// ---------------------------------------------------------------------------
// Mappers
// ---------------------------------------------------------------------------

export function mapMatch(m: GetMatchDTO): MatchView {
  const dt = new Date(m.kickOff);
  const isValid = !isNaN(dt.getTime());
  const homeGoalsVal = n(m.homeGoals);
  const awayGoalsVal = n(m.awayGoals);
  return {
    id: m.id,
    date: isValid ? dt.toISOString().slice(0, 10) : m.kickOff,
    kickOff: isValid ? dt.toTimeString().slice(0, 5) : "",
    homeTeam: m.homeTeam?.name ?? "",
    homeTeamId: m.homeTeam?.id ?? "",
    awayTeam: m.awayTeam?.name ?? "",
    awayTeamId: m.awayTeam?.id ?? "",
    homeGoals: m.status === "Upcoming" ? null : homeGoalsVal,
    awayGoals: m.status === "Upcoming" ? null : awayGoalsVal,
    venue: m.venue ?? "",
    referee: m.referee ?? "",
    attendance: m.attendance != null ? n(m.attendance) : null,
    status: m.status ?? "",
    competition: m.competition?.name ?? "",
    competitionId: m.competition?.id ?? "",
    season: m.season?.name ?? "",
    seasonId: m.season?.id ?? "",
    matchweek: "",
  };
}

export function mapPlayer(p: GetPlayerDTO): PlayerView {
  return {
    id: p.id,
    firstName: p.firstName,
    lastName: p.lastName,
    position: p.position,
    team: p.team?.name ?? "—",
    teamId: p.team?.id ?? "",
    national: p.national ?? "",
    dateOfBirth: p.dateOfBirth ?? "",
    shirtNumber: n(p.shirtNumber),
    isActive: p.isActive,
    isCaptain: p.isCaptain,
    matches: 0,
    minutes: 0,
    goals: 0,
    assists: 0,
    rating: 0,
  };
}

export function mapStanding(s: StandingDTO): StandingView {
  return {
    pos: n(s.position),
    teamId: s.teamId,
    team: s.teamName,
    played: n(s.played),
    won: n(s.wins),
    drawn: n(s.draws),
    lost: n(s.losses),
    gf: n(s.goalsFor),
    ga: n(s.goalsAgainst),
    gd: n(s.goalDifference),
    points: n(s.points),
    form: [],
  };
}

export function mapLeader(l: PlayerLeaderDTO): TopPerformerView {
  return {
    playerId: l.playerId,
    name: `${l.firstName} ${l.lastName}`,
    team: l.teamName,
    stat: n(l.total),
    rating: f(l.averageRating),
  };
}

export function mapGoalsPerRound(g: GoalsPerRoundDTO): { week: string; goals: number } {
  const d = new Date(g.date);
  const label = !isNaN(d.getTime())
    ? d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" })
    : g.date;
  return { week: label, goals: n(g.goals) };
}

// ---------------------------------------------------------------------------
// Dashboard services
// ---------------------------------------------------------------------------

export const fetchDashboardOverview = () =>
  dashboardApi.apiDashboardOverviewGet().then(r => r.data);

export const fetchGoalsPerRound = () =>
  dashboardApi.apiDashboardGoalsPerRoundGet().then(r => r.data.map(mapGoalsPerRound));

export const fetchFormTable = () =>
  dashboardApi.apiDashboardFormTableGet().then(r => r.data.map(mapStanding));

export const fetchRecentMatches = () =>
  dashboardApi.apiDashboardRecentMatchesGet().then(r => r.data.map(mapMatch));

export const fetchUpcomingFixtures = () =>
  dashboardApi.apiDashboardUpcomingFixturesGet().then(r => r.data.map(mapMatch));

export const fetchDashboardTopScorers = () =>
  dashboardApi.apiDashboardTopScorersGet().then(r => r.data.map(mapLeader));

export const fetchDashboardTopAssists = () =>
  dashboardApi.apiDashboardTopAssistsGet().then(r => r.data.map(mapLeader));

export const fetchDashboardTopRated = () =>
  dashboardApi.apiDashboardTopRatedGet().then(r => r.data.map(mapLeader));

// Result distribution — computed from completed matches
export const fetchResultDistribution = () =>
  matchApi.apiMatchCompletedGet().then(r => {
    const matches = r.data;
    let homeWins = 0, draws = 0, awayWins = 0;
    matches.forEach(m => {
      const hg = n(m.homeGoals);
      const ag = n(m.awayGoals);
      if (hg > ag) homeWins++;
      else if (hg < ag) awayWins++;
      else draws++;
    });
    return [
      { name: "Home Wins", value: homeWins, color: "#2563eb" },
      { name: "Draws", value: draws, color: "#64748b" },
      { name: "Away Wins", value: awayWins, color: "#10b981" },
    ];
  });

// ---------------------------------------------------------------------------
// Competition services
// ---------------------------------------------------------------------------

export const fetchCompetitions = () =>
  competitionApi.apiCompetitionAllGet().then(r =>
    r.data.map(c => ({
      id: c.id,
      name: c.name,
      country: c.country,
      teams: c.seasons?.reduce((acc, s) => acc, 0) ?? 0,
      matches: c.matches?.length ?? 0,
      status: "Active",
      currentSeason: c.seasons?.[0]?.name ?? "—",
    } as CompetitionView))
  );

export const fetchCompetition = (id: string) =>
  competitionApi.apiCompetitionIdGet(id).then(r => r.data);

export const fetchCompetitionStandings = (id: string, seasonId?: string) =>
  competitionApi.apiCompetitionIdStandingsGet(id, seasonId).then(r => r.data.map(mapStanding));

export const fetchCompetitionStatistics = (id: string) =>
  competitionApi.apiCompetitionIdStatisticsGet(id).then(r => r.data);

export const fetchCompetitionTopScorers = (id: string) =>
  competitionApi.apiCompetitionIdTopScorersGet(id).then(r => r.data.map(mapLeader));

export const fetchCompetitionFixtures = (id: string) =>
  competitionApi.apiCompetitionIdFixturesGet(id).then(r => r.data.map(mapMatch));

export const fetchCompetitionResults = (id: string) =>
  competitionApi.apiCompetitionIdResultsGet(id).then(r => r.data.map(mapMatch));

// ---------------------------------------------------------------------------
// Season services
// ---------------------------------------------------------------------------

export const fetchSeasons = () =>
  seasonApi.apiSeasonAllGet().then(r =>
    r.data.map(s => ({
      id: s.id,
      name: s.name,
      competitionId: "",
      competition: "—",
      status: s.isCurrent ? "Active" : "Completed",
      matches: 0,
      teams: 0,
      startDate: s.startDate?.slice(0, 10) ?? "",
      endDate: s.endDate?.slice(0, 10) ?? "",
      isCurrent: s.isCurrent,
    } as SeasonView))
  );

export const fetchSeasonStatistics = (id: string) =>
  seasonApi.apiSeasonIdStatisticsGet(id).then(r => r.data);

export const fetchSeasonMatches = (id: string) =>
  seasonApi.apiSeasonIdMatchesGet(id).then(r => r.data.map(mapMatch));

export const fetchSeasonTeams = (id: string) =>
  seasonApi.apiSeasonIdTeamsGet(id).then(r => r.data);

export const fetchSeasonPlayers = (id: string) =>
  seasonApi.apiSeasonIdPlayersGet(id).then(r => r.data.map(mapPlayer));

// ---------------------------------------------------------------------------
// Team services
// ---------------------------------------------------------------------------

export const fetchTeams = () =>
  teamApi.apiTeamAllGet().then(r => r.data);

export const fetchTeam = (id: string) =>
  teamApi.apiTeamIdGet(id).then(r => r.data);

export const fetchTeamStatistics = (id: string) =>
  teamApi.apiTeamIdStatisticsGet(id).then(r => r.data);

export const fetchTeamPlayers = (id: string) =>
  teamApi.apiTeamIdPlayersGet(id).then(r => r.data.map(mapPlayer));

export const fetchTeamMatches = (id: string) =>
  teamApi.apiTeamIdMatchesGet(id).then(r => r.data.map(mapMatch));

export const fetchTeamForm = (id: string) =>
  teamApi.apiTeamIdFormGet(id).then(r => r.data as string[]);

export const fetchTeamTopScorers = (id: string) =>
  teamApi.apiTeamIdTopScorersGet(id).then(r => r.data.map(mapLeader));

export const fetchTeamTopAssists = (id: string) =>
  teamApi.apiTeamIdTopAssistsGet(id).then(r => r.data.map(mapLeader));

export const fetchTeamMostMinutes = (id: string) =>
  teamApi.apiTeamIdMostMinutesGet(id).then(r => r.data.map(mapLeader));

export const fetchTeamMostPasses = (id: string) =>
  teamApi.apiTeamIdMostPassesGet(id).then(r => r.data.map(mapLeader));

// ---------------------------------------------------------------------------
// Player services
// ---------------------------------------------------------------------------

export const fetchPlayers = () =>
  playerApi.apiPlayerAllGet().then(r => r.data.map(mapPlayer));

export const fetchPlayer = (id: string) =>
  playerApi.apiPlayerIdGet(id).then(r => r.data);

export const fetchPlayerStatistics = (id: string) =>
  playerApi.apiPlayerIdStatisticsGet(id).then(r => r.data);

export const fetchPlayerMatches = (id: string) =>
  playerApi.apiPlayerIdMatchesGet(id).then(r => r.data.map(mapMatch));

export const fetchPlayerRatings = (id: string) =>
  playerApi.apiPlayerIdRatingsGet(id).then(r => r.data as number[]);

// ---------------------------------------------------------------------------
// Match services
// ---------------------------------------------------------------------------

export const fetchMatches = () =>
  matchApi.apiMatchAllGet().then(r => r.data.map(mapMatch));

export const fetchMatch = (id: string) =>
  matchApi.apiMatchIdGet(id).then(r => mapMatch(r.data));

export const fetchMatchSummary = (id: string) =>
  matchApi.apiMatchIdSummaryGet(id).then(r => r.data);

export const fetchMatchPlayerStats = (id: string) =>
  matchApi.apiMatchIdPlayerStatsGet(id).then(r => r.data);

export const fetchMatchTeamStats = (id: string) =>
  matchApi.apiMatchIdTeamStatsGet(id).then(r => r.data);

export const fetchMatchWorkspace = (id: string) =>
  matchApi.apiMatchIdWorkspaceGet(id).then(r => r.data);

// ---------------------------------------------------------------------------
// Team Match Stats submission
// ---------------------------------------------------------------------------

export const createTeamMatchStats = (dto: CreateTeamMatchStatsDTO) =>
  teamMatchStatsApi.apiTeamMatchStatsCreatePost(dto).then(r => r.data);

// ---------------------------------------------------------------------------
// Player Match Stats submission
// ---------------------------------------------------------------------------

export const createPlayerMatchStats = (dto: CreatePlayerMatchStatsDTO) =>
  playerMatchStatsApi.apiPlayerMatchStatsCreatePost(dto).then(r => r.data);

// ---------------------------------------------------------------------------
// Search
// ---------------------------------------------------------------------------

export const searchAll = (q: string) =>
  searchApi.apiSearchGet(q).then(r => r.data);

// ---------------------------------------------------------------------------
// Leaderboards
// ---------------------------------------------------------------------------

export const fetchLeaderboardGoals = () =>
  leaderboardsApi.apiLeaderboardsGoalsGet().then(r => r.data.map(mapLeader));

export const fetchLeaderboardAssists = () =>
  leaderboardsApi.apiLeaderboardsAssistsGet().then(r => r.data.map(mapLeader));

export const fetchLeaderboardRatings = () =>
  leaderboardsApi.apiLeaderboardsRatingsGet().then(r => r.data.map(mapLeader));

export const fetchLeaderboardPasses = () =>
  leaderboardsApi.apiLeaderboardsPassesGet().then(r => r.data.map(mapLeader));
