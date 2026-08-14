export const competitions = [
  { id: "c1", name: "Betway Premiership", country: "South Africa", teams: 16, matches: 240, status: "Active", currentSeason: "2026/2027" },
  { id: "c2", name: "Nedbank Cup", country: "South Africa", teams: 32, matches: 62, status: "Active", currentSeason: "2026/2027" },
  { id: "c3", name: "MTN8", country: "South Africa", teams: 8, matches: 7, status: "Completed", currentSeason: "2025/2026" },
];

export const seasons = [
  { id: "s1", name: "2026/2027", competitionId: "c1", competition: "Betway Premiership", status: "Active", matches: 120, teams: 16, startDate: "2026-08-01", endDate: "2027-05-31", isCurrent: true },
  { id: "s2", name: "2025/2026", competitionId: "c1", competition: "Betway Premiership", status: "Completed", matches: 240, teams: 16, startDate: "2025-08-01", endDate: "2026-05-31", isCurrent: false },
  { id: "s3", name: "2024/2025", competitionId: "c1", competition: "Betway Premiership", status: "Completed", matches: 240, teams: 16, startDate: "2024-08-01", endDate: "2025-05-31", isCurrent: false },
];

export const teams = [
  { id: "t1", name: "Orlando Pirates", shortName: "PIR", stadium: "Orlando Stadium", city: "Soweto", coach: "José Riveiro", captain: "Innocent Maela", preferredFormation: "4-2-3-1", playingStyle: "Possession", founded: 1937, competition: "Betway Premiership", season: "2026/2027", wins: 7, draws: 2, losses: 1, goalsFor: 22, goalsAgainst: 9, points: 23 },
  { id: "t2", name: "Mamelodi Sundowns", shortName: "SUN", stadium: "Loftus Versfeld", city: "Pretoria", coach: "Miguel Cardoso", captain: "Rushine De Reuck", preferredFormation: "4-3-3", playingStyle: "High Press", founded: 1970, competition: "Betway Premiership", season: "2026/2027", wins: 7, draws: 1, losses: 2, goalsFor: 19, goalsAgainst: 8, points: 22 },
  { id: "t3", name: "Kaizer Chiefs", shortName: "CHF", stadium: "FNB Stadium", city: "Johannesburg", coach: "Nasreddine Nabi", captain: "Yusuf Maart", preferredFormation: "4-4-2", playingStyle: "Counter Attack", founded: 1970, competition: "Betway Premiership", season: "2026/2027", wins: 5, draws: 3, losses: 2, goalsFor: 16, goalsAgainst: 12, points: 18 },
  { id: "t4", name: "Stellenbosch FC", shortName: "SFC", stadium: "Danie Craven Stadium", city: "Stellenbosch", coach: "Steve Barker", captain: "Junior Mendieta", preferredFormation: "4-3-3", playingStyle: "Pressing", founded: 1994, competition: "Betway Premiership", season: "2026/2027", wins: 5, draws: 2, losses: 3, goalsFor: 14, goalsAgainst: 11, points: 17 },
  { id: "t5", name: "Cape Town City", shortName: "CTC", stadium: "DHL Newlands", city: "Cape Town", coach: "Eric Tinkler", captain: "Thabo Nodada", preferredFormation: "4-2-3-1", playingStyle: "Balanced", founded: 2016, competition: "Betway Premiership", season: "2026/2027", wins: 4, draws: 3, losses: 3, goalsFor: 13, goalsAgainst: 13, points: 15 },
  { id: "t6", name: "SuperSport United", shortName: "SSU", stadium: "Lucas Moripe Stadium", city: "Pretoria", coach: "Gavin Hunt", captain: "Ronwen Williams", preferredFormation: "4-5-1", playingStyle: "Defensive", founded: 1994, competition: "Betway Premiership", season: "2026/2027", wins: 4, draws: 2, losses: 4, goalsFor: 12, goalsAgainst: 14, points: 14 },
  { id: "t7", name: "TS Galaxy", shortName: "GAL", stadium: "Mbombela Stadium", city: "Nelspruit", coach: "Brandon Truter", captain: "Siyanda Xulu", preferredFormation: "4-4-2", playingStyle: "Balanced", founded: 1999, competition: "Betway Premiership", season: "2026/2027", wins: 3, draws: 4, losses: 3, goalsFor: 10, goalsAgainst: 12, points: 13 },
  { id: "t8", name: "Chippa United", shortName: "CPU", stadium: "Nelson Mandela Bay Stadium", city: "Gqeberha", coach: "Morgan Sheppard", captain: "Daniel Akpeyi", preferredFormation: "4-3-3", playingStyle: "Counter", founded: 2010, competition: "Betway Premiership", season: "2026/2027", wins: 2, draws: 3, losses: 5, goalsFor: 9, goalsAgainst: 16, points: 9 },
];

export const players = [
  { id: "p1", firstName: "Evidence", lastName: "Makgopa", position: "Forward", team: "Orlando Pirates", teamId: "t1", national: "South Africa", dateOfBirth: "2001-02-02", shirtNumber: 9, matches: 10, minutes: 840, goals: 8, assists: 2, rating: 7.8, isActive: true, isCaptain: false },
  { id: "p2", firstName: "Innocent", lastName: "Maela", position: "Defender", team: "Orlando Pirates", teamId: "t1", national: "South Africa", dateOfBirth: "1992-09-09", shirtNumber: 5, matches: 10, minutes: 900, goals: 0, assists: 1, rating: 7.2, isActive: true, isCaptain: true },
  { id: "p3", firstName: "Sipho", lastName: "Chaine", position: "Goalkeeper", team: "Orlando Pirates", teamId: "t1", national: "South Africa", dateOfBirth: "1997-03-18", shirtNumber: 1, matches: 10, minutes: 900, goals: 0, assists: 0, rating: 7.4, isActive: true, isCaptain: false },
  { id: "p4", firstName: "Zakhele", lastName: "Lepasa", position: "Forward", team: "Orlando Pirates", teamId: "t1", national: "South Africa", dateOfBirth: "1997-07-28", shirtNumber: 10, matches: 9, minutes: 720, goals: 4, assists: 3, rating: 7.5, isActive: true, isCaptain: false },
  { id: "p5", firstName: "Peter", lastName: "Shalulile", position: "Forward", team: "Mamelodi Sundowns", teamId: "t2", national: "Namibia", dateOfBirth: "1993-10-20", shirtNumber: 10, matches: 10, minutes: 870, goals: 9, assists: 4, rating: 8.1, isActive: true, isCaptain: false },
  { id: "p6", firstName: "Rushine", lastName: "De Reuck", position: "Defender", team: "Mamelodi Sundowns", teamId: "t2", national: "South Africa", dateOfBirth: "1997-10-08", shirtNumber: 6, matches: 10, minutes: 900, goals: 1, assists: 0, rating: 7.3, isActive: true, isCaptain: true },
  { id: "p7", firstName: "Yusuf", lastName: "Maart", position: "Midfielder", team: "Kaizer Chiefs", teamId: "t3", national: "South Africa", dateOfBirth: "1996-05-19", shirtNumber: 8, matches: 10, minutes: 890, goals: 2, assists: 5, rating: 7.6, isActive: true, isCaptain: true },
  { id: "p8", firstName: "Thabo", lastName: "Nodada", position: "Midfielder", team: "Cape Town City", teamId: "t5", national: "South Africa", dateOfBirth: "1997-07-28", shirtNumber: 6, matches: 10, minutes: 860, goals: 1, assists: 6, rating: 7.7, isActive: true, isCaptain: true },
];

export const matches = [
  { id: "m1", date: "2026-08-10", kickOff: "15:00", homeTeam: "Orlando Pirates", homeTeamId: "t1", awayTeam: "Kaizer Chiefs", awayTeamId: "t3", homeGoals: 2, awayGoals: 1, venue: "Orlando Stadium", referee: "Victor Gomes", attendance: 32000, status: "Completed", competition: "Betway Premiership", season: "2026/2027", matchweek: 1 },
  { id: "m2", date: "2026-08-10", kickOff: "17:30", homeTeam: "Mamelodi Sundowns", homeTeamId: "t2", awayTeam: "Stellenbosch FC", awayTeamId: "t4", homeGoals: 3, awayGoals: 0, venue: "Loftus Versfeld", referee: "Jelly Chavani", attendance: 28000, status: "Completed", competition: "Betway Premiership", season: "2026/2027", matchweek: 1 },
  { id: "m3", date: "2026-08-17", kickOff: "15:00", homeTeam: "Kaizer Chiefs", homeTeamId: "t3", awayTeam: "Mamelodi Sundowns", awayTeamId: "t2", homeGoals: 1, awayGoals: 2, venue: "FNB Stadium", referee: "Abongile Tom", attendance: 65000, status: "Completed", competition: "Betway Premiership", season: "2026/2027", matchweek: 2 },
  { id: "m4", date: "2026-08-17", kickOff: "15:00", homeTeam: "Stellenbosch FC", homeTeamId: "t4", awayTeam: "Cape Town City", awayTeamId: "t5", homeGoals: 1, awayGoals: 1, venue: "Danie Craven Stadium", referee: "Victor Gomes", attendance: 8000, status: "Completed", competition: "Betway Premiership", season: "2026/2027", matchweek: 2 },
  { id: "m5", date: "2026-08-24", kickOff: "15:00", homeTeam: "Orlando Pirates", homeTeamId: "t1", awayTeam: "SuperSport United", awayTeamId: "t6", homeGoals: 3, awayGoals: 1, venue: "Orlando Stadium", referee: "Jelly Chavani", attendance: 25000, status: "Completed", competition: "Betway Premiership", season: "2026/2027", matchweek: 3 },
  { id: "m6", date: "2026-09-14", kickOff: "15:00", homeTeam: "Mamelodi Sundowns", homeTeamId: "t2", awayTeam: "Orlando Pirates", awayTeamId: "t1", homeGoals: null, awayGoals: null, venue: "Loftus Versfeld", referee: "Victor Gomes", attendance: null, status: "Upcoming", competition: "Betway Premiership", season: "2026/2027", matchweek: 4 },
  { id: "m7", date: "2026-09-14", kickOff: "17:30", homeTeam: "Cape Town City", homeTeamId: "t5", awayTeam: "Kaizer Chiefs", awayTeamId: "t3", homeGoals: null, awayGoals: null, venue: "DHL Newlands", referee: "Abongile Tom", attendance: null, status: "Upcoming", competition: "Betway Premiership", season: "2026/2027", matchweek: 4 },
  { id: "m8", date: "2026-09-21", kickOff: "15:00", homeTeam: "Kaizer Chiefs", homeTeamId: "t3", awayTeam: "Orlando Pirates", awayTeamId: "t1", homeGoals: null, awayGoals: null, venue: "FNB Stadium", referee: "Jelly Chavani", attendance: null, status: "Upcoming", competition: "Betway Premiership", season: "2026/2027", matchweek: 5 },
];

export const goalsPerMatchweek = [
  { week: "MW1", goals: 14 },
  { week: "MW2", goals: 11 },
  { week: "MW3", goals: 16 },
  { week: "MW4", goals: 9 },
  { week: "MW5", goals: 13 },
  { week: "MW6", goals: 15 },
  { week: "MW7", goals: 12 },
  { week: "MW8", goals: 17 },
  { week: "MW9", goals: 10 },
  { week: "MW10", goals: 14 },
];

export const resultDistribution = [
  { name: "Home Wins", value: 38, color: "#2563eb" },
  { name: "Draws", value: 22, color: "#64748b" },
  { name: "Away Wins", value: 28, color: "#10b981" },
];

export const topScoringTeams = [
  { team: "Orlando Pirates", goals: 22 },
  { team: "Mamelodi Sundowns", goals: 19 },
  { team: "Kaizer Chiefs", goals: 16 },
  { team: "Stellenbosch FC", goals: 14 },
  { team: "Cape Town City", goals: 13 },
  { team: "SuperSport United", goals: 12 },
];

export const standings = [
  { pos: 1, team: "Orlando Pirates", played: 10, won: 7, drawn: 2, lost: 1, gf: 22, ga: 9, gd: 13, points: 23, form: ["W","W","D","W","W"] },
  { pos: 2, team: "Mamelodi Sundowns", played: 10, won: 7, drawn: 1, lost: 2, gf: 19, ga: 8, gd: 11, points: 22, form: ["W","L","W","W","D"] },
  { pos: 3, team: "Kaizer Chiefs", played: 10, won: 5, drawn: 3, lost: 2, gf: 16, ga: 12, gd: 4, points: 18, form: ["L","W","D","W","D"] },
  { pos: 4, team: "Stellenbosch FC", played: 10, won: 5, drawn: 2, lost: 3, gf: 14, ga: 11, gd: 3, points: 17, form: ["W","L","W","D","L"] },
  { pos: 5, team: "Cape Town City", played: 10, won: 4, drawn: 3, lost: 3, gf: 13, ga: 13, gd: 0, points: 15, form: ["D","W","L","D","W"] },
  { pos: 6, team: "SuperSport United", played: 10, won: 4, drawn: 2, lost: 4, gf: 12, ga: 14, gd: -2, points: 14, form: ["W","L","L","W","D"] },
  { pos: 7, team: "TS Galaxy", played: 10, won: 3, drawn: 4, lost: 3, gf: 10, ga: 12, gd: -2, points: 13, form: ["D","D","W","L","D"] },
  { pos: 8, team: "Chippa United", played: 10, won: 2, drawn: 3, lost: 5, gf: 9, ga: 16, gd: -7, points: 9, form: ["L","D","L","W","L"] },
];

export const topPerformers = {
  topScorer: { name: "Peter Shalulile", team: "Mamelodi Sundowns", goals: 9, position: "Forward" },
  topAssists: { name: "Thabo Nodada", team: "Cape Town City", assists: 6, position: "Midfielder" },
  highestRated: { name: "Peter Shalulile", team: "Mamelodi Sundowns", rating: 8.1, position: "Forward" },
  mostMinutes: { name: "Innocent Maela", team: "Orlando Pirates", minutes: 900, position: "Defender" },
  mostPasses: { name: "Rushine De Reuck", team: "Mamelodi Sundowns", passes: 712, position: "Defender" },
};

export const teamStats = {
  t1: {
    matchesPlayed: 10, wins: 7, draws: 2, losses: 1,
    goalsScored: 22, goalsConceded: 9, goalDifference: 13,
    xG: 18.4, possession: 54.2, passAccuracy: 83.1,
    totalShots: 142, shotsOnTarget: 68, cleanSheets: 4,
    goalTimeline: [
      { week: "MW1", goals: 3 }, { week: "MW2", goals: 2 }, { week: "MW3", goals: 4 },
      { week: "MW4", goals: 1 }, { week: "MW5", goals: 3 }, { week: "MW6", goals: 2 },
      { week: "MW7", goals: 2 }, { week: "MW8", goals: 2 }, { week: "MW9", goals: 1 }, { week: "MW10", goals: 2 },
    ],
    xGTrend: [
      { week: "MW1", xg: 2.1 }, { week: "MW2", xg: 1.8 }, { week: "MW3", xg: 2.4 },
      { week: "MW4", xg: 1.2 }, { week: "MW5", xg: 2.8 }, { week: "MW6", xg: 1.9 },
      { week: "MW7", xg: 2.0 }, { week: "MW8", xg: 2.2 }, { week: "MW9", xg: 1.5 }, { week: "MW10", xg: 2.1 },
    ],
  }
};

export const playerMatchHistory = [
  { matchId: "m1", date: "2026-08-10", opponent: "Kaizer Chiefs", result: "2-1 W", minutes: 90, rating: 8.2, goals: 2, assists: 0, motm: true },
  { matchId: "m2", date: "2026-08-03", opponent: "SuperSport United", result: "1-0 W", minutes: 78, rating: 7.4, goals: 1, assists: 0, motm: false },
  { matchId: "m3", date: "2026-07-27", opponent: "Stellenbosch FC", result: "2-2 D", minutes: 90, rating: 7.0, goals: 1, assists: 1, motm: false },
  { matchId: "m4", date: "2026-07-20", opponent: "TS Galaxy", result: "3-0 W", minutes: 67, rating: 7.6, goals: 1, assists: 0, motm: false },
  { matchId: "m5", date: "2026-07-13", opponent: "Chippa United", result: "2-1 W", minutes: 90, rating: 7.9, goals: 1, assists: 1, motm: true },
];

export const ratingTrend = [
  { week: "MW1", rating: 8.2 }, { week: "MW2", rating: 7.4 }, { week: "MW3", rating: 7.0 },
  { week: "MW4", rating: 7.6 }, { week: "MW5", rating: 7.9 }, { week: "MW6", rating: 6.8 },
  { week: "MW7", rating: 7.5 }, { week: "MW8", rating: 8.0 }, { week: "MW9", rating: 7.2 }, { week: "MW10", rating: 7.8 },
];

export const notifications = [
  { id: "n1", text: "Match data entered: Pirates vs Chiefs", time: "2h ago", read: false },
  { id: "n2", text: "Player stats pending for MW3", time: "5h ago", read: false },
  { id: "n3", text: "Season report generated", time: "1d ago", read: true },
];
